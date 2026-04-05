import PropTypes from 'prop-types';
import { FaUsers, FaChartLine, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

/**
 * @param {{ cls: object, onSelect: function, isSelected: boolean }} props
 */
const MyClassCard = ({ cls, onSelect, isSelected }) => {
  return (
    <div
      onClick={() => onSelect(cls.id)}
      className={`relative p-5 bg-white rounded-xl border-2 shadow-sm cursor-pointer transition-all hover:shadow-md
        ${isSelected ? 'border-primary-500 ring-2 ring-primary-100' : 'border-gray-100 hover:border-primary-200'}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{cls.name}</h3>
          <p className="text-sm text-gray-500">{cls.ageGroup}</p>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-primary-700 bg-primary-50 rounded-full">
          <FaUsers size={10} />
          <span>{cls.studentCount}</span>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        {cls.schedules.map((s, idx) => (
          <div key={idx} className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <FaClock size={10} /> {s.day} {s.time}
            </span>
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt size={10} /> {s.location}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 text-xs text-gray-500">
        <FaChartLine size={10} />
        <span>Asistencia promedio: <strong className="text-gray-900">{cls.avgAttendance}%</strong></span>
      </div>
    </div>
  );
};

MyClassCard.propTypes = {
  cls: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default MyClassCard;
