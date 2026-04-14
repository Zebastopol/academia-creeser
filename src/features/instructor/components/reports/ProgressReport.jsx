import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaTrophy } from 'react-icons/fa';
import { ACHIEVEMENTS_CATALOG } from '../../../user-profile/constants/profileConstants';
import { PROGRESS_CATEGORIES } from '../../constants/instructorConstants';

/**
 * @param {{ report: object }} props
 */
const ProgressReport = ({ report }) => {
  if (!report) return null;

  const { student, attendanceRate, totalRecords, attendanceByMonth, notes } = report;

  return (
    <div className="space-y-6">
      {/* Student Header */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
        <img src={student.avatar} alt={student.name} className="w-14 h-14 rounded-full object-cover" />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
          <p className="text-sm text-gray-500">{student.belt || 'Sin cinturón'}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xl font-bold text-primary-600">{attendanceRate}%</p>
            <p className="text-xs text-gray-500">Asistencia</p>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{totalRecords}</p>
            <p className="text-xs text-gray-500">Sesiones</p>
          </div>
        </div>
      </div>

      {/* Attendance Chart */}
      {attendanceByMonth.length > 0 && (
        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Evolución de Asistencia</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={attendanceByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Line type="monotone" dataKey="rate" stroke="#714790" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Achievements */}
      {student.achievements && student.achievements.length > 0 && (
        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <FaTrophy className="text-yellow-500" /> Logros Desbloqueados
          </h4>
          <div className="flex flex-wrap gap-2">
            {student.achievements.map((achId) => {
              const ach = ACHIEVEMENTS_CATALOG.find((a) => a.id === achId);
              if (!ach) return null;
              return (
                <span key={achId} className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-yellow-50 text-yellow-800 rounded-full border border-yellow-200">
                  <span>{ach.icon}</span> {ach.name}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Notes Timeline */}
      {notes.length > 0 && (
        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Notas de Progreso</h4>
          <div className="space-y-3">
            {notes.map((note) => {
              const cat = PROGRESS_CATEGORIES[note.category];
              return (
                <div key={note.id} className="relative pl-6 pb-3 border-l-2 border-gray-200 last:border-l-0">
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-primary-500" />
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-400">{note.date}</span>
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${cat?.color || 'bg-gray-100 text-gray-800'}`}>
                      {cat?.label || note.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{note.content}</p>
                  {note.beltAtTime && (
                    <p className="text-xs text-gray-400 mt-1">Cinturón al momento: {note.beltAtTime}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

ProgressReport.propTypes = {
  report: PropTypes.object,
};

export default ProgressReport;
