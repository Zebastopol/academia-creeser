import { useState, useEffect } from 'react'
import { googlePlacesService } from '../services/googlePlacesService'

/**
 * Hook que obtiene testimonios/reseñas.
 * Intenta cargar desde Google Places API; si no está configurada,
 * retorna los testimonios locales como fallback.
 *
 * @returns {{ testimonials: Array, rating: number, totalReviews: number, source: string, loading: boolean, error: string|null }}
 */
export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [meta, setMeta] = useState({ rating: 0, totalReviews: 0, source: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await googlePlacesService.getReviews()
        setTestimonials(data.reviews)
        setMeta({
          rating: data.rating,
          totalReviews: data.totalReviews,
          source: data.source,
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return { testimonials, ...meta, loading, error }
}
