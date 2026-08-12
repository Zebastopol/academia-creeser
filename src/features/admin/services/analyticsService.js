/**
 * Servicio de métricas de tráfico web.
 *
 * Consume la Serverless Function /api/traffic-metrics que a su vez consulta
 * la Vercel Web Analytics API. La credencial (VERCEL_TOKEN) nunca se expone
 * al cliente.
 */

const TRAFFIC_ENDPOINT = '/api/traffic-metrics'

/**
 * @typedef {Object} TrafficMetrics
 * @property {{ visitors: number, pageviews: number }} totals
 * @property {Array<{ path: string, views: number }>} topPages
 * @property {Array<{ source: string, visitors: number }>} topReferrers
 * @property {Array<{ type: string, visitors: number }>} devices
 * @property {'24h'|'7d'|'30d'} range
 * @property {'vercel_analytics'|'not_configured'|'error'} source
 * @property {string} [message]
 */

const buildEmpty = (range) => ({
  totals: { visitors: 0, pageviews: 0 },
  topPages: [],
  topReferrers: [],
  devices: [],
  range,
  source: 'error',
})

export const analyticsService = {
  /**
   * @param {'24h'|'7d'|'30d'} [range='7d']
   * @returns {Promise<TrafficMetrics>}
   */
  async getTrafficMetrics(range = '7d') {
    try {
      const response = await fetch(`${TRAFFIC_ENDPOINT}?range=${range}`)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.json()
    } catch {
      return buildEmpty(range)
    }
  },
}
