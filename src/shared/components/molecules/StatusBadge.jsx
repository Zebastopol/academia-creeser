import PropTypes from 'prop-types';

const STATUS_STYLES = {
  active:    'bg-green-100 text-green-800',
  inactive:  'bg-gray-100 text-gray-800',
  suspended: 'bg-red-100 text-red-800',
  confirmed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
  pending:   'bg-yellow-100 text-yellow-800',
  present:   'bg-green-100 text-green-800',
  absent:    'bg-red-100 text-red-800',
  late:      'bg-yellow-100 text-yellow-800',
  new:       'bg-blue-100 text-blue-800',
  read:      'bg-yellow-100 text-yellow-800',
  replied:   'bg-green-100 text-green-800',
  paid:      'bg-green-100 text-green-800',
  overdue:   'bg-red-100 text-red-800',
};

const STATUS_LABELS = {
  active: 'Activo', inactive: 'Inactivo', suspended: 'Suspendido',
  confirmed: 'Confirmada', cancelled: 'Cancelada', pending: 'Pendiente',
  present: 'Presente', absent: 'Ausente', late: 'Atraso',
  new: 'Nuevo', read: 'Leído', replied: 'Respondido',
  paid: 'Pagado', overdue: 'Vencido',
};

/**
 * @param {{ status: string, label?: string, className?: string }} props
 */
const StatusBadge = ({ status, label, className = '' }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${STATUS_STYLES[status] || 'bg-gray-100 text-gray-800'} ${className}`}>
    {label || STATUS_LABELS[status] || status}
  </span>
);

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default StatusBadge;
