import PropTypes from 'prop-types';
import { FaClock, FaCheck, FaLock, FaBan } from 'react-icons/fa';
import { cn } from '../../../shared/utils/cn';
import { SLOT_STATUS } from '../constants/bookingConstants';

const STATUS_CONFIG = {
  [SLOT_STATUS.AVAILABLE]: {
    label: 'Disponible',
    icon: FaClock,
    containerClass: 'border-gray-200 bg-white hover:border-dynamic-main/40 cursor-pointer',
    badgeClass: 'bg-green-100 text-green-700',
  },
  [SLOT_STATUS.BOOKED]: {
    label: 'Reservado',
    icon: FaCheck,
    containerClass: 'border-green-200 bg-green-50 cursor-default',
    badgeClass: 'bg-green-200 text-green-800',
  },
  [SLOT_STATUS.FULL]: {
    label: 'Sin cupo',
    icon: FaLock,
    containerClass: 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60',
    badgeClass: 'bg-red-100 text-red-600',
  },
  [SLOT_STATUS.PAST]: {
    label: 'Pasado',
    icon: FaBan,
    containerClass: 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-40',
    badgeClass: 'bg-gray-100 text-gray-400',
  },
};

const SELECTED_CLASS = 'border-dynamic-main bg-dynamic-main text-white shadow-lg shadow-dynamic-main/20 cursor-pointer';

/**
 * @param {{
 *   slot: object,
 *   isSelected: boolean,
 *   onClick: Function
 * }} props
 */
const SlotCard = ({ slot, isSelected, onClick }) => {
  const config = STATUS_CONFIG[slot.status] || STATUS_CONFIG[SLOT_STATUS.AVAILABLE];
  const Icon = config.icon;
  const isInteractive = slot.status === SLOT_STATUS.AVAILABLE;

  return (
    <button
      type="button"
      disabled={!isInteractive && !isSelected}
      onClick={() => (isInteractive || isSelected) && onClick(slot)}
      className={cn(
        'flex items-center justify-between',
        'w-full p-4',
        'border-2 rounded-creeser transition-all duration-200',
        isSelected ? SELECTED_CLASS : config.containerClass,
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          'flex items-center justify-center',
          'w-10 h-10 rounded-full',
          isSelected ? 'bg-white/20' : 'bg-dynamic-main/10 text-dynamic-main',
        )}>
          <Icon />
        </div>
        <div className="text-left">
          <p className={cn('font-bold', isSelected && 'text-white')}>{slot.className}</p>
          <p className={cn('text-sm', isSelected ? 'text-white/80' : 'text-gray-500')}>
            {slot.dayName} &bull; {slot.time}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className={cn(
          'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
          isSelected ? 'bg-white text-dynamic-main' : config.badgeClass,
        )}>
          {isSelected ? 'Seleccionado' : config.label}
        </span>
        {slot.status === SLOT_STATUS.AVAILABLE && !isSelected && (
          <span className="text-xs text-gray-400">
            {slot.capacity - slot.enrolled} cupos
          </span>
        )}
      </div>
    </button>
  );
};

SlotCard.propTypes = {
  slot: PropTypes.shape({
    id: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    dayName: PropTypes.string.isRequired,
    enrolled: PropTypes.number.isRequired,
    capacity: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

SlotCard.defaultProps = {
  isSelected: false,
  onClick: () => {},
};

export default SlotCard;
