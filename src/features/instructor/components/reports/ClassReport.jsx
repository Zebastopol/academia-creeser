import PropTypes from 'prop-types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const PIE_COLORS = ['#f3f4f6', '#fef08a', '#86efac', '#93c5fd', '#fca5a5', '#1f2937', '#374151'];

/**
 * @param {{ report: object }} props
 */
const ClassReport = ({ report }) => {
  if (!report) return null;

  const { className, ageGroup, totalStudents, attendanceRate, attendanceByMonth, beltDistribution, studentRanking } = report;

  const beltData = Object.entries(beltDistribution).map(([name, value]) => ({ name, value }));
  const monthData = attendanceByMonth.map((m) => ({ ...m, label: m.month }));

  return (
    <div className="space-y-6">
      {/* Class Header */}
      <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{className}</h3>
          <p className="text-sm text-gray-500">{ageGroup}</p>
        </div>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-xl font-bold text-primary-600">{totalStudents}</p>
            <p className="text-xs text-gray-500">Alumnos</p>
          </div>
          <div>
            <p className="text-xl font-bold text-green-600">{attendanceRate}%</p>
            <p className="text-xs text-gray-500">Asistencia</p>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{report.totalRecords}</p>
            <p className="text-xs text-gray-500">Registros</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Attendance by Month */}
        {monthData.length > 0 && (
          <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Asistencia Mensual</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="present" fill="#22c55e" name="Presente" stackId="a" />
                <Bar dataKey="late" fill="#eab308" name="Atraso" stackId="a" />
                <Bar dataKey="absent" fill="#ef4444" name="Ausente" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Belt Distribution */}
        {beltData.length > 0 && (
          <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Distribución de Cinturones</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={beltData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {beltData.map((_, idx) => (
                    <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Student Ranking */}
      {studentRanking.length > 0 && (
        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Ranking de Asistencia</h4>
          <div className="space-y-2">
            {studentRanking.map((s, idx) => (
              <div key={s.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 text-xs font-bold text-gray-500 bg-gray-100 rounded-full">
                    {idx + 1}
                  </span>
                  <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.belt || 'Sin cinturón'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${s.rate >= 80 ? 'bg-green-500' : s.rate >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${s.rate}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-10 text-right">{s.rate}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

ClassReport.propTypes = {
  report: PropTypes.object,
};

export default ClassReport;
