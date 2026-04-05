import PropTypes from 'prop-types';

/**
 * @param {{ classOptions: Array, selectedClassId: string, onChangeClass: function, selectedDate: string, onChangeDate: function }} props
 */
const AttendanceDatePicker = ({ classOptions, selectedClassId, onChangeClass, selectedDate, onChangeDate }) => {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label className="block mb-1 text-xs font-medium text-gray-600">Clase</label>
        <select
          value={selectedClassId}
          onChange={(e) => onChangeClass(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          {classOptions.map((c) => (
            <option key={c.id} value={String(c.id)}>{c.name} ({c.ageGroup})</option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label className="block mb-1 text-xs font-medium text-gray-600">Fecha</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onChangeDate(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
    </div>
  );
};

AttendanceDatePicker.propTypes = {
  classOptions: PropTypes.array.isRequired,
  selectedClassId: PropTypes.string.isRequired,
  onChangeClass: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
  onChangeDate: PropTypes.func.isRequired,
};

export default AttendanceDatePicker;
