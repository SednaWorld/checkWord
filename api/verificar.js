/**
 * API Serverless para Netlify que verifica si una palabra existe.
 */
// 1. La firma de la función cambia a (event, context)
export default async function handler(event, context) {
  
  // 2. Obtenemos 'word' de event.queryStringParameters
  const word = event.queryStringParameters.word;

  if (!word || typeof word !== 'string') {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Parámetro 'word' no encontrado o inválido." })
    };
  }

  const palabraLimpia = word.trim().toLowerCase();

  try {
    const wiktionaryURL = `https://es.wiktionary.org/api/rest_v1/page/definition/${palabraLimpia}`;
    const apiResponse = await fetch(wiktionaryURL);
    const existe = apiResponse.ok;

    // 3. La respuesta se retorna como un objeto con statusCode y body
    return {
      statusCode: 200,
      body: JSON.stringify({
        palabra: palabraLimpia,
        existe: existe,
        fuente: "Wiktionary"
      })
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno al conectar con el servicio de diccionario." })
    };
  }
}
