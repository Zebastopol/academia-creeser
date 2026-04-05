import PropTypes from 'prop-types';

const ORDERED_DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

const CLASS_COLORS = {
  'Baby Taekwondo': 'bg-pink-100 text-pink-800 border-pink-200',
  'Kids':           'bg-blue-100 text-blue-800 border-blue-200',
  'Cadetes':        'bg-green-100 text-green-800 border-green-200',
  'Adultos':        'bg-purple-100 text-purple-800 border-purple-200',
};

/**
 * @param {{ schedule: object }} props
 */
const WeeklyCalendar = ({ schedule }) => {
  if (!schedule || Object.keys(schedule).length === 0) return null;

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 font-display mb-4">Horario Semanal</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
        {ORDERED_DAYS.map((day) => (
          <div key={day} className="space-y-2">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">
              {day}
            </h4>
            {schedule[day] && schedule[day].length > 0 ? (
              schedule[day].map((item, idx) => {
                const colorClass = CLASS_COLORS[item.className] || 'bg-gray-100 text-gray-800 border-gray-200';
                return (
                  <div
                    key={`${item.classId}-${idx}`}
                    className={`p-2 rounded-lg border text-center ${colorClass}`}
                  >
                    <p className="text-xs font-semibold">{item.className}</p>
                    <p className="text-[10px] mt-0.5">{item.time}</p>
                    <p className="text-[10px] opacity-75">{item.location}</p>
                  </div>
                );
              })
            ) : (
              <div className="p-2 text-center">
                <p className="text-xs text-gray-300">—</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

WeeklyCalendar.propTypes = {
  schedule: PropTypes.object,
};

export default WeeklyCalendar;
