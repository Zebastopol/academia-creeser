/**
 * Servicio de reseñas de Google Places.
 *
 * Consume la Serverless Function /api/reviews (que llama a Places API New v1
 * con field mask acotado a 5 campos). El cliente NUNCA ve la API key.
 *
 * Shape estable de cada reseña:
 *   { rating: number, text: string, date: string, authorName: string, authorPhoto: string }
 *
 * Fallback: si la API no está configurada o falla, retorna los testimonios
 * locales (publicData.testimonials) mapeados al mismo shape.
 */
import { testimonials as fallbackTestimonials } from '../../../shared/data/publicData'

const REVIEWS_ENDPOINT = '/api/reviews'

/**
 * Mapea el shape legacy de mockData al shape estándar de reseñas.
 */
const mapFallback = (t) => ({
  rating: t.rating,
  text: t.text,
  date: t.date,
  authorName: t.name,
  authorPhoto: t.image || '',
})

const buildFallback = () => ({
  reviews: fallbackTestimonials.map(mapFallback),
  rating: 5,
  totalReviews: fallbackTestimonials.length,
  source: 'fallback',
})

export const googlePlacesService = {
  /**
   * @returns {Promise<{ reviews: Array<{ rating:number, text:string, date:string, authorName:string, authorPhoto:string }>, rating:number, totalReviews:number, source:string }>}
   */
  async getReviews() {
    try {
      const response = await fetch(REVIEWS_ENDPOINT)

      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const data = await response.json()

      if (data.source === 'not_configured' || !data.reviews?.length) {
        return buildFallback()
      }

      return data
    } catch {
      return buildFallback()
    }
  },
}
