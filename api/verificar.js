/**
 * API Serverless para Netlify (versión final y correcta).
 * Usa el formato de respuesta estándar 'new Response()'.
 */
export default async function handler(event, context) {

  const word = event.queryStringParameters?.word;

  // Si 'word' no se encuentra, devolvemos un error 400
  if (!word || typeof word !== 'string') {
    const errorResponse = { error: "Parámetro 'word' no encontrado o inválido." };
    return new Response(JSON.stringify(errorResponse), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const palabraLimpia = word.trim().toLowerCase();

  try {
    const wiktionaryURL = `https://es.wiktionary.org/api/rest_v1/page/definition/${palabraLimpia}`;
    const apiResponse = await fetch(wiktionaryURL);
    const existe = apiResponse.ok;

    const successResponse = {
      palabra: palabraLimpia,
      existe: existe,
      fuente: "Wiktionary"
    };
    
    // Devolvemos una respuesta exitosa 200
    return new Response(JSON.stringify(successResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error(error);
    const fatalErrorResponse = { error: "Error interno al conectar con el servicio de diccionario." };
    
    // Devolvemos un error 500
    return new Response(JSON.stringify(fatalErrorResponse), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
