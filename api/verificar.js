export default async function handler(request, response) {
  const { word } = request.query;

  if (!word || typeof word !== 'string') {
    return response.status(400).json({ error: "Parámetro 'word' no encontrado o inválido." });
  }

  const palabraLimpia = word.trim().toLowerCase();

  try {
    const wiktionaryURL = `https://es.wiktionary.org/api/rest_v1/page/definition/${palabraLimpia}`;
    const apiResponse = await fetch(wiktionaryURL);

    const existe = apiResponse.ok;
    
    response.status(200).json({
      palabra: palabraLimpia,
      existe: existe,
      fuente: "Wiktionary"
    });

  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error interno al conectar con el servicio de diccionario." });
  }
}