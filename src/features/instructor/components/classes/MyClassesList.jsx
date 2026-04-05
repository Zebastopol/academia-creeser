import PropTypes from 'prop-types';
import MyClassCard from './MyClassCard';

/**
 * @param {{ classes: Array, selectedClassId: number|null, onSelectClass: function }} props
 */
const MyClassesList = ({ classes, selectedClassId, onSelectClass }) => {
  if (!classes || classes.length === 0) {
    return <p className="text-sm text-gray-400">No tienes clases asignadas.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {classes.map((cls) => (
        <MyClassCard
          key={cls.id}
          cls={cls}
          onSelect={onSelectClass}
          isSelected={selectedClassId === cls.id}
        />
      ))}
    </div>
  );
};

MyClassesList.propTypes = {
  classes: PropTypes.array.isRequired,
  selectedClassId: PropTypes.number,
  onSelectClass: PropTypes.func.isRequired,
};

export default MyClassesList;
