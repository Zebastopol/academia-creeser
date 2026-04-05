import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const CLASS_COLORS = ['#0c92eb', '#7cc8fb', '#015da4', '#36adf7'];
const LOCATION_COLORS = ['#E31E24', '#f59e0b'];

/**
 * @param {{ report: object|null }} props
 */
const PopularityReport = ({ report }) => {
  if (!report) return null;

  const byClassData = Object.entries(report.byClass).map(([name, count]) => ({ name, reservas: count }));
  const byLocationData = Object.entries(report.byLocation).map(([name, count]) => ({ name, value: count }));
  const byMonthData = Object.entries(report.byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, count]) => ({ name: month, reservas: count }));

  return (
    <div className="space-y-6">
      <div className="p-4 text-center bg-white border border-gray-100 rounded-xl">
        <p className="text-3xl font-bold text-primary-600">{report.total}</p>
        <p className="text-sm text-gray-500">Total Reservas Confirmadas</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* By Class */}
        <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-soft">
          <h4 className="mb-4 text-sm font-bold text-gray-900">Popularidad por Clase</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={byClassData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="reservas" radius={[4, 4, 0, 0]}>
                {byClassData.map((_, idx) => (
                  <Cell key={idx} fill={CLASS_COLORS[idx % CLASS_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* By Location */}
        <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-soft">
          <h4 className="mb-4 text-sm font-bold text-gray-900">Distribución por Sede</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={byLocationData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {byLocationData.map((_, idx) => (
                  <Cell key={idx} fill={LOCATION_COLORS[idx % LOCATION_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* By Month Timeline */}
      {byMonthData.length > 0 && (
        <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-soft">
          <h4 className="mb-4 text-sm font-bold text-gray-900">Reservas por Mes</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={byMonthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" fontSize={11} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="reservas" fill="#0c92eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

PopularityReport.propTypes = {
  report: PropTypes.object,
};

export default PopularityReport;
