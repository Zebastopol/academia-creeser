import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAuth } from '../../auth/context/AuthContext';
import { useAchievements } from '../hooks/useAchievements';
import AchievementCard from './AchievementCard';

const AchievementsGrid = () => {
  const { user } = useAuth();
  const { achievements, unlockedCount, loading } = useAchievements(user?.id, user?.belt);

  if (loading) {
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
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <span className="font-bold text-gray-900">{unlockedCount}</span> de {achievements.length} logros desbloqueados
        </p>
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div
            className="bg-gold-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${achievements.length > 0 ? (unlockedCount / achievements.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {achievements.map(a => (
          <AchievementCard key={a.id} achievement={a} />
        ))}
      </div>
    </motion.div>
  );
};

AchievementsGrid.propTypes = {};

export default AchievementsGrid;
