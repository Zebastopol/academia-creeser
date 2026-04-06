import PropTypes from 'prop-types';
import { FaIdCard, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Button from '../../../shared/components/atoms/Button';
import StatusBadge from '../../../shared/components/molecules/StatusBadge';
import { getCurrentMonthPaymentStatus } from '../services/checkoutService';
import { MONTH_LABELS } from '../constants/checkoutConstants';

const STATUS_MESSAGES = {
  paid: 'Tu mensualidad está al día',
  pending: 'Tienes un pago pendiente este mes',
  overdue: 'Tu mensualidad está vencida',
  none: 'Sin información de pago',
};

/**
 * @param {{ userId: number, membership: string }} props
 */
const MembershipBlock = ({ userId, membership }) => {
  const currentMonth = new Date().getMonth();
  const { status, amount } = getCurrentMonthPaymentStatus(userId);

  const formatCLP = (val) =>
    val ? `$${val.toLocaleString('es-CL')}` : '$0';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-lg">
          <FaIdCard className="text-lg" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Membresía</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Plan activo</span>
          <span className="text-sm font-medium text-gray-900">
            {membership || 'Sin plan'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{MONTH_LABELS[currentMonth]}</span>
          <StatusBadge status={status === 'none' ? 'pending' : status} />
        </div>

        {amount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Monto</span>
            <span className="text-sm font-bold text-gray-900">{formatCLP(amount)}</span>
          </div>
        )}

        <p className="text-xs text-gray-400">{STATUS_MESSAGES[status]}</p>
      </div>

      <Button
        to="/pagos"
        variant="primary"
        className="w-full mt-4 flex items-center justify-center gap-2"
      >
        Ir a Pagos <FaArrowRight className="text-xs" />
      </Button>
    </motion.div>
  );
};

MembershipBlock.propTypes = {
  userId: PropTypes.number.isRequired,
  membership: PropTypes.string,
};

export default MembershipBlock;
