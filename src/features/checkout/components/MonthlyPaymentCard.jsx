import PropTypes from 'prop-types';
import { FaCheck, FaExclamationTriangle, FaClock } from 'react-icons/fa';

const STATUS_CONFIG = {
  paid:    { icon: FaCheck,                bg: 'bg-green-50 border-green-200', iconColor: 'text-green-500', label: 'Pagado' },
  pending: { icon: FaClock,                bg: 'bg-yellow-50 border-yellow-200', iconColor: 'text-yellow-500', label: 'Pendiente' },
  overdue: { icon: FaExclamationTriangle,  bg: 'bg-red-50 border-red-200',    iconColor: 'text-red-500',    label: 'Vencido' },
  none:    { icon: FaClock,                bg: 'bg-gray-50 border-gray-200',  iconColor: 'text-gray-300',   label: 'Sin info' },
};

/**
 * @param {{ data: object, isSelected: boolean, isCurrent: boolean, onClick: function }} props
 */
const MonthlyPaymentCard = ({ data, isSelected, isCurrent, onClick }) => {
  const cfg = STATUS_CONFIG[data.status] || STATUS_CONFIG.none;
  const Icon = cfg.icon;

  const formatCLP = (val) =>
    val ? `$${val.toLocaleString('es-CL')}` : '';

  return (
    <button
      type="button"
      onClick={() => onClick(data.month)}
      className={`
        relative flex flex-col items-center
        w-full
        p-4 gap-2
        text-center
        border-2 rounded-xl
        transition-all duration-200
        ${cfg.bg}
        ${isSelected ? 'ring-2 ring-primary ring-offset-2 scale-[1.02]' : 'hover:scale-[1.01]'}
        ${isCurrent ? 'shadow-md' : ''}
      `}
    >
      {isCurrent && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-bold bg-primary text-white rounded-full">
          Actual
        </span>
      )}

      <Icon className={`text-xl ${cfg.iconColor}`} />

      <span className="text-sm font-semibold text-gray-800">{data.label}</span>

      {data.amount > 0 && (
        <span className="text-xs font-medium text-gray-500">{formatCLP(data.amount)}</span>
      )}

      <span className={`text-[10px] font-medium ${cfg.iconColor}`}>{cfg.label}</span>
    </button>
  );
};

MonthlyPaymentCard.propTypes = {
  data: PropTypes.shape({
    month: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    amount: PropTypes.number,
  }).isRequired,
  isSelected: PropTypes.bool,
  isCurrent: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default MonthlyPaymentCard;
