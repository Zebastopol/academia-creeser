import PropTypes from 'prop-types';
import { cn } from '../../../shared/utils/cn';

/**
 * @param {{
 *   day: number,
 *   date: string|null,
 *   isCurrentMonth: boolean,
 *   isToday: boolean,
 *   isPast: boolean,
 *   hasSlots: boolean,
 *   slotCount: number,
 *   isSelected: boolean,
 *   onClick: Function
 * }} props
 */
const CalendarCell = ({ day, date, isCurrentMonth, isToday, isPast, hasSlots, slotCount, isSelected, onClick }) => {
  const isClickable = isCurrentMonth && !isPast && hasSlots;

  return (
    <button
      type="button"
      disabled={!isClickable}
      onClick={() => isClickable && onClick(date)}
      className={cn(
        'relative flex flex-col items-center justify-center',
        'w-full aspect-square',
        'text-sm font-medium',
        'rounded-lg transition-all duration-200',
        !isCurrentMonth && 'text-gray-300 cursor-default',
        isCurrentMonth && isPast && 'text-gray-400 cursor-default',
        isCurrentMonth && !isPast && !hasSlots && 'text-gray-500 cursor-default',
        isClickable && 'hover:bg-dynamic-main/10 cursor-pointer',
        isToday && 'ring-2 ring-dynamic-main ring-offset-1',
        isSelected && 'bg-dynamic-main text-white shadow-md shadow-dynamic-main/20',
        isSelected && 'hover:bg-dynamic-dark',
      )}
      aria-label={date ? `${day} - ${slotCount} horarios disponibles` : undefined}
    >
      <span className={cn(isSelected && 'font-bold')}>{day}</span>
      {hasSlots && isCurrentMonth && !isPast && (
        <span className={cn(
          'absolute bottom-1',
          'w-1.5 h-1.5 rounded-full',
          isSelected ? 'bg-white' : 'bg-dynamic-main',
        )} />
      )}
    </button>
  );
};

CalendarCell.propTypes = {
  day: PropTypes.number.isRequired,
  date: PropTypes.string,
  isCurrentMonth: PropTypes.bool.isRequired,
  isToday: PropTypes.bool.isRequired,
  isPast: PropTypes.bool.isRequired,
  hasSlots: PropTypes.bool,
  slotCount: PropTypes.number,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

CalendarCell.defaultProps = {
  date: null,
  hasSlots: false,
  slotCount: 0,
  isSelected: false,
  onClick: () => {},
};

export default CalendarCell;
