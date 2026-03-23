import PropTypes from 'prop-types';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { cn } from '../../../shared/utils/cn';

const STATUS_STYLES = {
  confirmed: { label: 'Confirmada', classes: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Cancelada',  classes: 'bg-red-100 text-red-700' },
  pending:   { label: 'Pendiente',  classes: 'bg-yellow-100 text-yellow-700' },
};

/**
 * @param {{ booking: object }} props
 */
const ClassHistoryItem = ({ booking }) => {
  const statusInfo = STATUS_STYLES[booking.status] || STATUS_STYLES.confirmed;
  const dateLabel = new Date(booking.date + 'T12:00:00').toLocaleDateString('es-CL', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-4 min-w-0">
        <div className={cn(
          'flex items-center justify-center shrink-0 w-10 h-10 rounded-lg text-sm font-bold',
          booking.status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-primary-100 text-primary-600'
        )}>
          {booking.className?.charAt(0) || '?'}
        </div>
        <div className="min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{booking.className}</h4>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-0.5 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <FaClock className="text-gray-400" />
              {dateLabel} &middot; {booking.time}
            </span>
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-gray-400" />
              {booking.location}
            </span>
          </div>
        </div>
      </div>
      <span className={cn('shrink-0 px-3 py-1 text-xs font-medium rounded-full', statusInfo.classes)}>
        {statusInfo.label}
      </span>
    </div>
  );
};

ClassHistoryItem.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    className: PropTypes.string,
    date: PropTypes.string.isRequired,
    time: PropTypes.string,
    location: PropTypes.string,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default ClassHistoryItem;
