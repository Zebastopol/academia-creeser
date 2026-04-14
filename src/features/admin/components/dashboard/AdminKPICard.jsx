import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const COLOR_MAP = {
  blue:   'bg-primary-50 text-primary-600',
  green:  'bg-green-50 text-green-600',
  purple: 'bg-purple-50 text-purple-600',
  amber:  'bg-amber-50 text-amber-600',
  red:    'bg-red-50 text-red-600',
  cyan:   'bg-cyan-50 text-cyan-600',
};

/**
 * @param {{ title: string, value: string|number, icon: React.ReactNode, color?: string, subtitle?: string }} props
 */
const AdminKPICard = ({ title, value, icon, color = 'blue', subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-xl shadow-soft"
  >
    <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${COLOR_MAP[color] || COLOR_MAP.blue}`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
    </div>
  </motion.div>
);

AdminKPICard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string,
  subtitle: PropTypes.string,
};

export default AdminKPICard;
