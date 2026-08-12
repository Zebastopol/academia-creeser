/**
 * Vercel Serverless Function — Google Places Reviews Proxy
 *
 * Consulta las reseñas de Google Places para la Academia Creeser
 * y las cachea para evitar llamadas excesivas a la API.
 *
 * Variables de entorno requeridas en Vercel:
 * - GOOGLE_PLACES_API_KEY: Clave de API de Google Cloud
 * - GOOGLE_PLACES_PLACE_ID: ID del lugar en Google Maps
 *
 * Endpoint: GET /api/reviews
 * Respuesta: { reviews: [...], rating: number, totalReviews: number }
 */

let cachedData = null
let cacheTimestamp = 0
const CACHE_DURATION_MS = 6 * 60 * 60 * 1000 // 6 horas

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate')

  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID

  if (!apiKey || !placeId) {
    return res.status(200).json({
      reviews: [],
      rating: 0,
      totalReviews: 0,
      source: 'not_configured',
      message: 'Google Places API no configurada. Configure GOOGLE_PLACES_API_KEY y GOOGLE_PLACES_PLACE_ID en Vercel.',
    })
  }

  const now = Date.now()
  if (cachedData && now - cacheTimestamp < CACHE_DURATION_MS) {
    return res.status(200).json({ ...cachedData, source: 'cache' })
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&language=es&key=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.status !== 'OK') {
      console.error('[Google Places] Error:', data.status, data.error_message)
      return res.status(502).json({
        error: 'Error al consultar Google Places',
        details: data.status,
      })
    }

    const result = {
      reviews: (data.result.reviews || []).map((r) => ({
        id: `gp-${r.time}`,
        name: r.author_name,
        role: 'Reseña de Google',
        image: r.profile_photo_url || '',
        rating: r.rating,
        text: r.text,
        date: new Date(r.time * 1000).toISOString().split('T')[0],
        relativeTime: r.relative_time_description,
      })),
      rating: data.result.rating || 0,
      totalReviews: data.result.user_ratings_total || 0,
      source: 'google_places',
    }

    cachedData = result
    cacheTimestamp = now

    return res.status(200).json(result)
  } catch (error) {
    console.error('[Google Places] Fetch error:', error.message)
    return res.status(502).json({ error: 'Error de conexión con Google Places' })
  }
}
