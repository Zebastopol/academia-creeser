import PropTypes from 'prop-types'
import { FaChartLine, FaEye, FaUsers, FaMobileAlt, FaExternalLinkAlt, FaInfoCircle, FaSyncAlt } from 'react-icons/fa'
import { useTrafficMetrics } from '../../hooks/useTrafficMetrics'

const RANGE_OPTIONS = [
  { id: '24h', label: 'Últimas 24h' },
  { id: '7d', label: '7 días' },
  { id: '30d', label: '30 días' },
]

const formatNumber = (n) => new Intl.NumberFormat('es-CL').format(n || 0)

const shortenPath = (path) => {
  if (!path) return '/'
  if (path.length <= 40) return path
  return path.slice(0, 37) + '...'
}

const KPICard = ({ icon: Icon, label, value, iconBg }) => (
  <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-soft">
    <div className="flex items-start gap-3">
      <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${iconBg}`}>
        <Icon className="text-white" size={16} />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{formatNumber(value)}</p>
      </div>
    </div>
  </div>
)

KPICard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  iconBg: PropTypes.string.isRequired,
}

const ListSection = ({ title, icon: Icon, items, emptyLabel, renderItem }) => (
  <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-soft">
    <div className="flex items-center gap-2 mb-4">
      <Icon className="text-gray-400" size={14} />
      <h3 className="text-sm font-bold text-gray-900">{title}</h3>
    </div>
    {items.length === 0 ? (
      <p className="py-6 text-xs text-center text-gray-400">{emptyLabel}</p>
    ) : (
      <ul className="space-y-2.5">{items.map(renderItem)}</ul>
    )}
  </div>
)

ListSection.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  items: PropTypes.array.isRequired,
  emptyLabel: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
}

/**
 * Panel de métricas de tráfico web (Vercel Analytics).
 * Sustituye a los gráficos mock de tráfico en el dashboard admin.
 */
const TrafficDashboard = () => {
  const { metrics, loading, range, setRange, refetch } = useTrafficMetrics('7d')

  if (loading && !metrics) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-3 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Cargando métricas de tráfico...</p>
        </div>
      </div>
    )
  }

  const isConfigured = metrics?.source === 'vercel_analytics'
  const totals = metrics?.totals || { visitors: 0, pageviews: 0 }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
            <FaChartLine className="text-primary" />
            Tráfico Web
          </h3>
          <p className="text-xs text-gray-500">
            Datos de Vercel Analytics · Actualización cada 5 minutos
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
            {RANGE_OPTIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setRange(r.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  range === r.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <button
            onClick={refetch}
            disabled={loading}
            aria-label="Actualizar métricas"
            className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 disabled:opacity-50 transition-colors"
          >
            <FaSyncAlt size={12} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Estado no configurado */}
      {!isConfigured && (
        <div className="flex items-start gap-3 p-3 text-xs text-amber-800 bg-amber-50 rounded-lg border border-amber-200">
          <FaInfoCircle className="flex-shrink-0 mt-0.5" size={14} />
          <div>
            <p className="font-semibold">Métricas no disponibles todavía</p>
            <p className="mt-1">
              {metrics?.message ||
                'Configure VERCEL_TOKEN y VERCEL_PROJECT_ID en Vercel para ver datos reales.'}
            </p>
          </div>
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <KPICard
          icon={FaUsers}
          label="Usuarios únicos"
          value={totals.visitors}
          iconBg="bg-primary"
        />
        <KPICard
          icon={FaEye}
          label="Páginas vistas"
          value={totals.pageviews}
          iconBg="bg-indigo-500"
        />
      </div>

      {/* Detalle */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ListSection
          title="Páginas más visitadas"
          icon={FaEye}
          items={metrics?.topPages || []}
          emptyLabel="Sin datos en el rango seleccionado"
          renderItem={(p) => (
            <li key={p.path} className="flex items-center justify-between text-xs">
              <span className="font-mono text-gray-700 truncate" title={p.path}>
                {shortenPath(p.path)}
              </span>
              <span className="font-semibold text-gray-900 ml-2">
                {formatNumber(p.views)}
              </span>
            </li>
          )}
        />
        <ListSection
          title="Fuentes de tráfico"
          icon={FaExternalLinkAlt}
          items={metrics?.topReferrers || []}
          emptyLabel="Sin datos en el rango seleccionado"
          renderItem={(r) => (
            <li key={r.source} className="flex items-center justify-between text-xs">
              <span className="text-gray-700 truncate" title={r.source}>
                {r.source}
              </span>
              <span className="font-semibold text-gray-900 ml-2">
                {formatNumber(r.visitors)}
              </span>
            </li>
          )}
        />
        <ListSection
          title="Dispositivos"
          icon={FaMobileAlt}
          items={metrics?.devices || []}
          emptyLabel="Sin datos en el rango seleccionado"
          renderItem={(d) => (
            <li key={d.type} className="flex items-center justify-between text-xs">
              <span className="capitalize text-gray-700">{d.type}</span>
              <span className="font-semibold text-gray-900 ml-2">
                {formatNumber(d.visitors)}
              </span>
            </li>
          )}
        />
      </div>
    </div>
  )
}

export default TrafficDashboard
