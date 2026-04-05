import PropTypes from 'prop-types';
import { FaCheckCircle } from 'react-icons/fa';

/**
 * @param {{ students: Array, loading: boolean }} props
 */
const ClassStudentsPreview = ({ students, loading }) => {
  if (loading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <p className="text-sm text-gray-400">Cargando alumnos...</p>
      </div>
    );
  }

  if (!students || students.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <p className="text-sm text-gray-400">Selecciona una clase para ver los alumnos inscritos.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 font-display mb-4">
        Alumnos Inscritos ({students.length})
      </h3>
      <div className="space-y-3">
        {students.map((s) => (
          <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
            <div className="flex items-center gap-3">
              <img src={s.avatar} alt={s.name} className="w-9 h-9 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium text-gray-900">{s.name}</p>
                <p className="text-xs text-gray-500">{s.belt || 'Sin cinturón'}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <FaCheckCircle
                size={12}
                className={s.attendanceRate >= 80 ? 'text-green-500' : s.attendanceRate >= 50 ? 'text-yellow-500' : 'text-red-500'}
              />
              <span className="font-medium text-gray-700">{s.attendanceRate}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ClassStudentsPreview.propTypes = {
  students: PropTypes.array,
  loading: PropTypes.bool,
};

export default ClassStudentsPreview;
