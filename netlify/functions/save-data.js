const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const newData = JSON.parse(event.body);
    console.log('📦 Datos recibidos para guardar:', JSON.stringify(newData, null, 2));

    // Obtener siteID y token de las variables de entorno
    const siteID = process.env.SITE_ID;
    const token = process.env.NETLIFY_AUTH_TOKEN;

    if (!siteID || !token) {
      console.error('❌ Faltan siteID o token');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Faltan variables de entorno SITE_ID o NETLIFY_AUTH_TOKEN' })
      };
    }

    // Crear el store con parámetros manuales
    const store = getStore('academy-data', {
      siteID: siteID,
      token: token
    });
    console.log('✅ Store obtenido correctamente');

    await store.set('data', newData);
    console.log('✅ Datos guardados correctamente');

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('❌ Error en save-data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error general: ' + error.message })
    };
  }
};