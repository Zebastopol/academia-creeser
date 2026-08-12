import { useState, useEffect, useCallback } from 'react'
import { analyticsService } from '../services/analyticsService'

/**
 * Hook para consumir métricas de tráfico web desde Vercel Analytics.
 *
 * @param {'24h'|'7d'|'30d'} [initialRange='7d']
 * @returns {{
 *   metrics: import('../services/analyticsService').TrafficMetrics|null,
 *   loading: boolean,
 *   error: string|null,
 *   range: '24h'|'7d'|'30d',
 *   setRange: (r: '24h'|'7d'|'30d') => void,
 *   refetch: () => void
 * }}
 */
export const useTrafficMetrics = (initialRange = '7d') => {
  const [range, setRange] = useState(initialRange)
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMetrics = useCallback(async (r) => {
    setLoading(true)
    setError(null)
    try {
      const data = await analyticsService.getTrafficMetrics(r)
      setMetrics(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMetrics(range)
  }, [range, fetchMetrics])

  return {
    metrics,
    loading,
    error,
    range,
    setRange,
    refetch: () => fetchMetrics(range),
  }
}
