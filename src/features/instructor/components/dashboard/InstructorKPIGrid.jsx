import PropTypes from 'prop-types';
import { FaUsers, FaChalkboardTeacher, FaCheckCircle, FaCalendarCheck } from 'react-icons/fa';

const KPI_CONFIG = [
  { key: 'totalStudents',          label: 'Alumnos Activos',        icon: FaUsers,              color: 'bg-blue-50 text-blue-600' },
  { key: 'totalClasses',           label: 'Clases Asignadas',       icon: FaChalkboardTeacher,  color: 'bg-green-50 text-green-600' },
  { key: 'monthAttendanceRate',    label: 'Asistencia Mensual',     icon: FaCheckCircle,        color: 'bg-yellow-50 text-yellow-600', suffix: '%' },
  { key: 'totalBookingsThisMonth', label: 'Reservas del Mes',       icon: FaCalendarCheck,      color: 'bg-purple-50 text-purple-600' },
];

/**
 * @param {{ kpis: object }} props
 */
const InstructorKPIGrid = ({ kpis }) => {
  if (!kpis) return null;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {KPI_CONFIG.map(({ key, label, icon: Icon, color, suffix }) => (
        <div key={key} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${color}`}>
            <Icon size={22} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {kpis[key]}{suffix || ''}
            </p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

InstructorKPIGrid.propTypes = {
  kpis: PropTypes.object,
};

export default InstructorKPIGrid;
