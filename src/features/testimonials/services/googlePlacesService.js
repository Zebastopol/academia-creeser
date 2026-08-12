/**
 * Servicio para obtener reseñas de Google Places.
 *
 * Llama a la Vercel Serverless Function /api/reviews que actúa como proxy
 * seguro para la Google Places API (la API key nunca se expone al cliente).
 *
 * Incluye fallback a datos locales cuando la API no está configurada.
 */
import { testimonials as fallbackTestimonials } from '../../../shared/data/publicData'

const REVIEWS_ENDPOINT = '/api/reviews'

/**
 * Obtiene reseñas de Google Places o retorna datos locales como fallback.
 * @returns {Promise<{ reviews: Array, rating: number, totalReviews: number, source: string }>}
 */
export const googlePlacesService = {
  async getReviews() {
    try {
      const response = await fetch(REVIEWS_ENDPOINT)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()

      if (data.source === 'not_configured' || !data.reviews?.length) {
        return {
          reviews: fallbackTestimonials,
          rating: 5,
          totalReviews: fallbackTestimonials.length,
          source: 'fallback',
        }
      }

      return data
    } catch {
      return {
        reviews: fallbackTestimonials,
        rating: 5,
        totalReviews: fallbackTestimonials.length,
        source: 'fallback',
      }
    }
  },
}
