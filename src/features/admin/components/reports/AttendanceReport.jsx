import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = { present: '#22c55e', late: '#f59e0b', absent: '#ef4444' };
const LABELS = { present: 'Presente', late: 'Atraso', absent: 'Ausente' };

/**
 * @param {{ report: object|null }} props
 */
const AttendanceReport = ({ report }) => {
  if (!report) return null;

  const pieData = [
    { name: 'Presente', value: report.present, color: COLORS.present },
    { name: 'Atraso', value: report.late, color: COLORS.late },
    { name: 'Ausente', value: report.absent, color: COLORS.absent },
  ].filter((d) => d.value > 0);

  const byClassData = Object.entries(report.byClass).map(([name, data]) => ({
    name,
    Presente: data.present,
    Atraso: data.late,
    Ausente: data.absent,
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="p-4 text-center bg-white border border-gray-100 rounded-xl">
          <p className="text-2xl font-bold text-gray-900">{report.total}</p>
          <p className="text-xs text-gray-500">Total Registros</p>
        </div>
        <div className="p-4 text-center bg-white border border-gray-100 rounded-xl">
          <p className="text-2xl font-bold text-green-600">{report.attendanceRate}%</p>
          <p className="text-xs text-gray-500">Asistencia</p>
        </div>
        <div className="p-4 text-center bg-white border border-gray-100 rounded-xl">
          <p className="text-2xl font-bold text-green-600">{report.present}</p>
          <p className="text-xs text-gray-500">Presentes</p>
        </div>
        <div className="p-4 text-center bg-white border border-gray-100 rounded-xl">
          <p className="text-2xl font-bold text-red-600">{report.absent}</p>
          <p className="text-xs text-gray-500">Ausentes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pie Chart */}
        <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-soft">
          <h4 className="mb-4 text-sm font-bold text-gray-900">Distribución de Asistencia</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* By Class Chart */}
        {byClassData.length > 0 && (
          <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-soft">
            <h4 className="mb-4 text-sm font-bold text-gray-900">Asistencia por Clase</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={byClassData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Presente" fill={COLORS.present} stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Atraso" fill={COLORS.late} stackId="a" />
                <Bar dataKey="Ausente" fill={COLORS.absent} stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

AttendanceReport.propTypes = {
  report: PropTypes.object,
};

export default AttendanceReport;
