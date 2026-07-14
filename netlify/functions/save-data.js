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
    console.log('📦 Guardando datos...');

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
      body: JSON.stringify({ error: 'Error: ' + error.message })
    };
  }
};