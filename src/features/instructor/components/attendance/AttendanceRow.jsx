import PropTypes from 'prop-types';
import { FaCheck, FaTimes, FaClock } from 'react-icons/fa';

const STATUS_BUTTONS = [
  { value: 'present', label: 'Presente', icon: FaCheck,  activeClass: 'bg-green-600 text-white', hoverClass: 'hover:bg-green-100 text-green-600' },
  { value: 'late',    label: 'Atraso',   icon: FaClock,  activeClass: 'bg-yellow-500 text-white', hoverClass: 'hover:bg-yellow-100 text-yellow-600' },
  { value: 'absent',  label: 'Ausente',  icon: FaTimes,  activeClass: 'bg-red-600 text-white',   hoverClass: 'hover:bg-red-100 text-red-600' },
];

/**
 * @param {{ student: object, onStatusChange: function }} props
 */
const AttendanceRow = ({ student, onStatusChange }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-3">
        <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="text-sm font-medium text-gray-900">{student.name}</p>
          <p className="text-xs text-gray-500">{student.belt || 'Sin cinturón'}</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {STATUS_BUTTONS.map(({ value, label, icon: Icon, activeClass, hoverClass }) => (
          <button
            key={value}
            onClick={() => onStatusChange(student.userId, value)}
            title={label}
            className={`flex items-center justify-center w-9 h-9 rounded-lg text-sm transition-colors
              ${student.status === value ? activeClass : `bg-white border border-gray-200 ${hoverClass}`}`}
          >
            <Icon size={14} />
          </button>
        ))}
      </div>
    </div>
  );
};

AttendanceRow.propTypes = {
  student: PropTypes.object.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default AttendanceRow;
