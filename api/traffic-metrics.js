/**
 * Vercel Serverless Function — Traffic Metrics Proxy
 *
 * Consulta la Web Analytics API de Vercel y expone KPIs al frontend admin.
 * La credencial (VERCEL_TOKEN) NUNCA llega al bundle del cliente.
 *
 * Variables de entorno server-side (Vercel):
 *   - VERCEL_TOKEN       (Personal / Team Access Token con scope analytics:read)
 *   - VERCEL_PROJECT_ID  (ID del proyecto en Vercel)
 *   - VERCEL_TEAM_ID     (opcional; si el proyecto pertenece a un team)
 *
 * Query params:
 *   - range: '24h' | '7d' | '30d' (default 7d)
 *
 * Endpoint: GET /api/traffic-metrics?range=7d
 * Respuesta: {
 *   totals: { visitors: number, pageviews: number },
 *   topPages: [{ path: string, views: number }],
 *   topReferrers: [{ source: string, visitors: number }],
 *   devices: [{ type: string, visitors: number }],
 *   range: string,
 *   source: 'vercel_analytics' | 'not_configured'
 * }
 */

const RANGE_TO_HOURS = {
  '24h': 24,
  '7d': 24 * 7,
  '30d': 24 * 30,
}

const VERCEL_API_BASE = 'https://api.vercel.com'

/**
 * Realiza una consulta a la Web Analytics API de Vercel.
 * @param {string} type - Tipo de query: 'timeseries' | 'top-pages' | 'top-referrers' | 'devices'
 * @param {{ token: string, projectId: string, teamId?: string, from: number, to: number }} params
 */
async function queryVercelAnalytics(type, { token, projectId, teamId, from, to }) {
  const qs = new URLSearchParams({
    projectId,
    from: String(from),
    to: String(to),
  })
  if (teamId) qs.set('teamId', teamId)

  const endpointMap = {
    'timeseries': `/v1/analytics/timeseries?${qs.toString()}`,
    'top-pages': `/v1/analytics/paths?${qs.toString()}`,
    'top-referrers': `/v1/analytics/referrers?${qs.toString()}`,
    'devices': `/v1/analytics/devices?${qs.toString()}`,
  }

  const url = `${VERCEL_API_BASE}${endpointMap[type]}`
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`Vercel Analytics ${type} HTTP ${response.status}: ${errText.slice(0, 200)}`)
  }

  return response.json()
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')

  const token = process.env.VERCEL_TOKEN
  const projectId = process.env.VERCEL_PROJECT_ID
  const teamId = process.env.VERCEL_TEAM_ID || undefined

  const range = ['24h', '7d', '30d'].includes(req.query?.range) ? req.query.range : '7d'
  const hours = RANGE_TO_HOURS[range]
  const to = Date.now()
  const from = to - hours * 60 * 60 * 1000

  if (!token || !projectId) {
    return res.status(200).json({
      totals: { visitors: 0, pageviews: 0 },
      topPages: [],
      topReferrers: [],
      devices: [],
      range,
      source: 'not_configured',
      message: 'VERCEL_TOKEN y/o VERCEL_PROJECT_ID no configuradas en Vercel.',
    })
  }

  try {
    const params = { token, projectId, teamId, from, to }

    const [timeseries, pages, referrers, devices] = await Promise.allSettled([
      queryVercelAnalytics('timeseries', params),
      queryVercelAnalytics('top-pages', params),
      queryVercelAnalytics('top-referrers', params),
      queryVercelAnalytics('devices', params),
    ])

    const totals = (() => {
      if (timeseries.status !== 'fulfilled') return { visitors: 0, pageviews: 0 }
      const arr = timeseries.value?.data || timeseries.value?.series || []
      let visitors = 0
      let pageviews = 0
      for (const row of arr) {
        visitors += row.visitors || row.uniques || 0
        pageviews += row.pageviews || row.views || 0
      }
      return { visitors, pageviews }
    })()

    const topPages = (() => {
      if (pages.status !== 'fulfilled') return []
      const arr = pages.value?.data || pages.value?.paths || []
      return arr.slice(0, 5).map((p) => ({
        path: p.path || p.name || '',
        views: p.pageviews || p.views || p.count || 0,
      }))
    })()

    const topReferrers = (() => {
      if (referrers.status !== 'fulfilled') return []
      const arr = referrers.value?.data || referrers.value?.referrers || []
      return arr.slice(0, 5).map((r) => ({
        source: r.referrer || r.source || r.name || 'Directo',
        visitors: r.visitors || r.count || 0,
      }))
    })()

    const deviceStats = (() => {
      if (devices.status !== 'fulfilled') return []
      const arr = devices.value?.data || devices.value?.devices || []
      return arr.map((d) => ({
        type: d.device || d.type || d.name || 'desconocido',
        visitors: d.visitors || d.count || 0,
      }))
    })()

    return res.status(200).json({
      totals,
      topPages,
      topReferrers,
      devices: deviceStats,
      range,
      source: 'vercel_analytics',
    })
  } catch (error) {
    console.error('[Traffic Metrics] Error:', error.message)
    return res.status(200).json({
      totals: { visitors: 0, pageviews: 0 },
      topPages: [],
      topReferrers: [],
      devices: [],
      range,
      source: 'error',
      message: error.message,
    })
  }
}
