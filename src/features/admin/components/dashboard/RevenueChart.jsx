import PropTypes from 'prop-types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const MONTH_LABELS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const formatCLP = (v) => `$${(v / 1000).toFixed(0)}k`;

/**
 * @param {{ revenue: Array }} props
 */
const RevenueChart = ({ revenue }) => {
  if (!revenue || revenue.length === 0) return null;

  const data = revenue.map((r) => ({
    name: MONTH_LABELS[r.month - 1],
    'Ingresos': r.revenue,
    'Proyectado': r.projected,
    'Alumnos': r.totalStudents,
  }));

  return (
    <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-soft">
      <h3 className="mb-4 text-base font-bold text-gray-900">Ingresos Mensuales 2026</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#714790" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#714790" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" fontSize={12} />
          <YAxis tickFormatter={formatCLP} fontSize={12} />
          <Tooltip formatter={(val) => `$${val.toLocaleString('es-CL')}`} />
          <Legend />
          <Area type="monotone" dataKey="Proyectado" stroke="#f59e0b" fill="url(#colorProjected)" strokeDasharray="5 5" />
          <Area type="monotone" dataKey="Ingresos" stroke="#714790" fill="url(#colorRevenue)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-4 text-center">
        {revenue.filter((r) => r.revenue > 0).slice(-3).map((r) => (
          <div key={`${r.year}-${r.month}`} className="p-3 rounded-lg bg-gray-50">
            <p className="text-xs text-gray-500">{MONTH_LABELS[r.month - 1]}</p>
            <p className="text-sm font-bold text-gray-900">${r.revenue.toLocaleString('es-CL')}</p>
            <p className="text-xs text-gray-400">{r.totalStudents} alumnos</p>
          </div>
        ))}
      </div>
    </div>
  );
};

RevenueChart.propTypes = {
  revenue: PropTypes.array,
};

export default RevenueChart;
