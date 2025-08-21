/**
 * API Serverless para Netlify (VERSIÓN DE DEPURACIÓN)
 * Su único objetivo es mostrar el contenido del objeto 'event'.
 */
export default async function handler(event, context) {
  
  // Este código simplemente devuelve todo lo que Netlify le envía a la función.
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Este es el objeto 'event' que recibió la función:",
      eventObject: event,
      nota: "Por favor, copiá y pegá todo este texto en la respuesta."
    }, null, 2) // el 'null, 2' es para que el JSON se vea bonito y legible
  };

}
