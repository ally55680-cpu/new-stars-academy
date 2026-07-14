const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  try {
    console.log('📥 Obteniendo datos...');

    const siteID = process.env.SITE_ID;
    const token = process.env.NETLIFY_ACCESS_TOKEN;

    if (!siteID || !token) {
      throw new Error('No se encontraron SITE_ID o NETLIFY_ACCESS_TOKEN');
    }

    const store = getStore({
      name: 'academy-data',
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
      body: JSON.stringify({ error: 'Error: ' + error.message })
    };
  }
};