import { motion } from 'framer-motion'
import { useAchievements } from '../../user-profile/hooks/useAchievements'

const ProgressCard = ({ user }) => {
  const { stats, loading } = useAchievements(user?.id, user?.belt)

  const beltProgress = stats?.beltProgress ?? 0
  const attendance = stats?.attendancePercent ?? 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="card p-6"
    >
      <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
        Tu Progreso
      </h2>
      {loading ? (
        <div className="flex justify-center py-6">
          <div className="loading-spinner" style={{ width: 24, height: 24 }} />
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span style={{ color: 'var(--color-text-muted)' }}>Cinturón Actual</span>
              <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
                {user?.belt || 'Sin cinturón'}
              </span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--color-surface-offset)' }}>
              <div
                className="h-2 rounded-full transition-all duration-700"
                style={{ width: `${beltProgress}%`, backgroundColor: 'var(--color-primary)' }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span style={{ color: 'var(--color-text-muted)' }}>Asistencia General</span>
              <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
                {attendance}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--color-surface-offset)' }}>
              <div
                className="h-2 rounded-full transition-all duration-700"
                style={{ width: `${attendance}%`, backgroundColor: 'var(--color-accent)' }}
              />
            </div>
          </div>
          {stats?.currentStreak > 0 && (
            <p className="text-xs text-right" style={{ color: 'var(--color-text-faint)' }}>
              Racha actual:{' '}
              <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>
                {stats.currentStreak} semanas
              </span>
            </p>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default ProgressCard
