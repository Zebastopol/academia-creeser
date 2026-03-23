import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaFire, FaChartLine, FaPercent, FaMedal } from 'react-icons/fa';
import { useAuth } from '../../auth/context/AuthContext';
import { useAchievements } from '../hooks/useAchievements';
import { cn } from '../../../shared/utils/cn';

const ProgressBar = ({ label, value, max, color, suffix = '%' }) => {
  const percent = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-gray-600 font-medium">{label}</span>
        <span className="font-bold text-gray-900">{value}{suffix}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn('h-2.5 rounded-full', color)}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  suffix: PropTypes.string,
};

const StatMini = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100 text-primary-600">
      {icon}
    </div>
    <div>
      <p className="text-xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  </div>
);

StatMini.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const ProgressOverview = () => {
  const { user } = useAuth();
  const { stats, loading } = useAchievements(user?.id, user?.belt);

  if (loading || !stats) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dynamic-main" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="space-y-6"
    >
      {/* Mini stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatMini icon={<FaChartLine />} label="Clases totales" value={stats.totalClasses} />
        <StatMini icon={<FaPercent />} label="Asistencia" value={`${stats.attendancePercent}%`} />
        <StatMini icon={<FaFire />} label="Racha actual" value={`${stats.currentStreak} sem`} />
        <StatMini icon={<FaMedal />} label="Cinturón" value={stats.beltName?.replace('Cinturón ', '') || '—'} />
      </div>

      {/* Progress bars */}
      <div className="space-y-5 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <ProgressBar
          label="Progreso de cinturón"
          value={stats.beltProgress}
          max={100}
          color="bg-primary-600"
        />
        <ProgressBar
          label="Asistencia general"
          value={stats.attendancePercent}
          max={100}
          color="bg-green-500"
        />
        {stats.nextBelt && (
          <p className="text-xs text-gray-400 text-right">
            Siguiente nivel: <span className="font-semibold text-gray-600">{stats.nextBelt}</span>
          </p>
        )}
      </div>
    </motion.div>
  );
};

ProgressOverview.propTypes = {};

export default ProgressOverview;
