/**
 * Vercel Serverless Function — Google Places Reviews Proxy
 *
 * Consulta reseñas del Place ID de Academia Creeser usando la
 * Places API (New) v1, con field mask acotado a EXACTAMENTE 5 campos:
 *   - reviews.rating              (calificación)
 *   - reviews.text                (opinión)
 *   - reviews.publishTime         (fecha)
 *   - reviews.authorAttribution.displayName (nombre)
 *   - reviews.authorAttribution.photoUri    (foto)
 *
 * NUNCA se solicita: link a la reseña, idioma, respuesta del propietario,
 * fotos adjuntas ni reviewSummary (IA).
 *
 * Variables de entorno server-side (Vercel):
 *   - GOOGLE_PLACES_API_KEY
 *   - GOOGLE_PLACES_ID
 *
 * Endpoint: GET /api/reviews
 * Respuesta: { reviews: [{ rating, text, date, authorName, authorPhoto }], rating, totalReviews, source }
 */

let cachedData = null
let cacheTimestamp = 0
const CACHE_DURATION_MS = 6 * 60 * 60 * 1000 // 6 horas — reviews cambian poco

const FIELD_MASK = [
  'rating',
  'userRatingCount',
  'reviews.rating',
  'reviews.text',
  'reviews.publishTime',
  'reviews.authorAttribution.displayName',
  'reviews.authorAttribution.photoUri',
].join(',')

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400')

  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACES_ID

  if (!apiKey || !placeId) {
    return res.status(200).json({
      reviews: [],
      rating: 0,
      totalReviews: 0,
      source: 'not_configured',
      message: 'GOOGLE_PLACES_API_KEY y/o GOOGLE_PLACES_ID no configuradas en Vercel.',
    })
  }

  const now = Date.now()
  if (cachedData && now - cacheTimestamp < CACHE_DURATION_MS) {
    return res.status(200).json({ ...cachedData, source: 'cache' })
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=es`

    const response = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': FIELD_MASK,
      },
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('[Google Places] HTTP', response.status, errText)
      return res.status(502).json({ error: 'Google Places API error', status: response.status })
    }

    const data = await response.json()

    const rawReviews = Array.isArray(data.reviews) ? data.reviews : []
    const reviews = rawReviews
      .map((r) => {
        const author = r.authorAttribution || {}
        const text = typeof r.text === 'object' ? r.text?.text : r.text
        return {
          rating: r.rating ?? null,
          text: text || '',
          date: r.publishTime || null,
          authorName: author.displayName || 'Anónimo',
          authorPhoto: author.photoUri || '',
        }
      })
      .filter((r) => r.rating != null && r.text)

    const result = {
      reviews,
      rating: data.rating || 0,
      totalReviews: data.userRatingCount || 0,
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
