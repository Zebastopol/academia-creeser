import PropTypes from 'prop-types';
import { FaCheckDouble, FaSave } from 'react-icons/fa';
import AttendanceRow from './AttendanceRow';
import Button from '../../../../shared/components/atoms/Button';

/**
 * @param {{ students: Array, loading: boolean, saving: boolean, onStatusChange: function, onMarkAllPresent: function, onSave: function }} props
 */
const AttendanceSheet = ({ students, loading, saving, onStatusChange, onMarkAllPresent, onSave }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!students || students.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <p className="text-sm text-gray-400">No hay alumnos inscritos en esta clase.</p>
      </div>
    );
  }

  const markedCount = students.filter((s) => s.status).length;

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 font-display">
          Planilla de Asistencia ({students.length} alumnos)
        </h3>
        <button
          onClick={onMarkAllPresent}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
        >
          <FaCheckDouble size={12} />
          Todos Presentes
        </button>
      </div>

      <div className="space-y-2">
        {students.map((s) => (
          <AttendanceRow
            key={s.userId}
            student={s}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          {markedCount} de {students.length} marcados
        </p>
        <Button
          onClick={onSave}
          disabled={saving || markedCount === 0}
          className="bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
        >
          <FaSave className="mr-2" size={14} />
          {saving ? 'Guardando...' : 'Guardar Asistencia'}
        </Button>
      </div>
    </div>
  );
};

AttendanceSheet.propTypes = {
  students: PropTypes.array,
  loading: PropTypes.bool,
  saving: PropTypes.bool,
  onStatusChange: PropTypes.func.isRequired,
  onMarkAllPresent: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AttendanceSheet;
