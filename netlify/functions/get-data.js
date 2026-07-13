const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  try {
    console.log('📥 Obteniendo datos del store...');
    const store = getStore('academy-data');
    const data = await store.get('data', { type: 'json' });
    console.log('📄 Datos:', data ? 'existen' : 'vacíos');

    return {
      statusCode: 200,
      body: JSON.stringify(data || {})
    };
  } catch (error) {
    console.error('❌ Error en get-data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};