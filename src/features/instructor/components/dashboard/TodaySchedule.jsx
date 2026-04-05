import PropTypes from 'prop-types';
import { FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

/**
 * @param {{ classes: Array }} props
 */
const TodaySchedule = ({ classes }) => {
  if (!classes || classes.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 font-display mb-4">Clases de Hoy</h3>
        <p className="text-sm text-gray-400">No tienes clases programadas para hoy.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 font-display mb-4">
        Clases de Hoy ({classes.length})
      </h3>
      <div className="space-y-3">
        {classes.map((cls, idx) => (
          <div
            key={`${cls.classId}-${idx}`}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-primary-50 transition-colors"
          >
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-900">{cls.className}</p>
              <p className="text-xs text-gray-500">{cls.ageGroup}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <FaClock size={10} /> {cls.time}
                </span>
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt size={10} /> {cls.location}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-primary-700 bg-primary-100 rounded-full">
              <FaUsers size={10} />
              <span>{cls.studentCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TodaySchedule.propTypes = {
  classes: PropTypes.array,
};

export default TodaySchedule;
