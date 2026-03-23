import PropTypes from 'prop-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { cn } from '../../../shared/utils/cn';

/**
 * @param {{ monthLabel: string, onPrev: Function, onNext: Function, canGoPrev: boolean }} props
 */
const CalendarHeader = ({ monthLabel, onPrev, onNext, canGoPrev }) => (
  <div className="flex items-center justify-between mb-4 px-1">
    <button
      type="button"
      onClick={onPrev}
      disabled={!canGoPrev}
      className={cn(
        'flex items-center justify-center',
        'w-10 h-10',
        'rounded-full transition-colors',
        canGoPrev
          ? 'text-gray-700 hover:bg-gray-100'
          : 'text-gray-300 cursor-not-allowed',
      )}
      aria-label="Mes anterior"
    >
      <FaChevronLeft />
    </button>
    <h3 className="text-xl font-bold text-gray-900 font-display">
      {monthLabel}
    </h3>
    <button
      type="button"
      onClick={onNext}
      className="flex items-center justify-center w-10 h-10 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
      aria-label="Mes siguiente"
    >
      <FaChevronRight />
    </button>
  </div>
);

CalendarHeader.propTypes = {
  monthLabel: PropTypes.string.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  canGoPrev: PropTypes.bool.isRequired,
};

export default CalendarHeader;
