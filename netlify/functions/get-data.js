const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  try {
    console.log('📥 Intentando obtener datos del store...');
    const siteID = process.env.SITE_ID;
    const token = process.env.NETLIFY_AUTH_TOKEN;

    if (!siteID || !token) {
      console.error('❌ Faltan siteID o token');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Faltan variables de entorno SITE_ID o NETLIFY_AUTH_TOKEN' })
      };
    }

    const store = getStore('academy-data', {
      siteID: siteID,
      token: token
    });
    console.log('✅ Store obtenido correctamente');

    const data = await store.get('data', { type: 'json' });
    console.log('📄 Datos obtenidos:', data ? '✅ existen' : '❌ vacíos');

    return {
      statusCode: 200,
      body: JSON.stringify(data || {})
    };
  } catch (error) {
    console.error('❌ Error en get-data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener los datos: ' + error.message })
    };
  }
};