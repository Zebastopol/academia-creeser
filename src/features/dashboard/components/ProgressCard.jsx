import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAchievements } from '../../user-profile/hooks/useAchievements';

const ProgressCard = ({ user }) => {
  const { stats, loading } = useAchievements(user?.id, user?.belt);

  const beltProgress = stats?.beltProgress ?? 0;
  const attendance = stats?.attendancePercent ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="card p-6"
    >
      <h2 className="text-xl font-bold mb-4">Tu Progreso</h2>
      {loading ? (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-dynamic-main" />
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Cinturón Actual</span>
              <span className="font-semibold text-gray-900">{user?.belt || 'Sin cinturón'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-700"
                style={{ width: `${beltProgress}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Asistencia General</span>
              <span className="font-semibold text-gray-900">{attendance}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-700"
                style={{ width: `${attendance}%` }}
              />
            </div>
          </div>
          {stats?.currentStreak > 0 && (
            <p className="text-xs text-gray-500 text-right">
              Racha actual: <span className="font-semibold text-primary-600">{stats.currentStreak} semanas</span>
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};

ProgressCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    belt: PropTypes.string,
  }),
};

export default ProgressCard;
