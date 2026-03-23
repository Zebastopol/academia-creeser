import { useState, useEffect } from 'react';
import { profileService } from '../services/profileService';

/**
 * Hook para logros y estadísticas de progreso del usuario.
 * @param {number|null} userId
 * @param {string} [userBelt]
 */
export const useAchievements = (userId, userBelt) => {
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) { setLoading(false); return; }

    let cancelled = false;
    const fetch = async () => {
      try {
        setLoading(true);
        const [achvData, statsData] = await Promise.all([
          profileService.getAchievements(userId),
          profileService.getProgressStats(userId, userBelt),
        ]);
        if (!cancelled) {
          setAchievements(achvData);
          setStats(statsData);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetch();
    return () => { cancelled = true; };
  }, [userId, userBelt]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return { achievements, stats, loading, error, unlockedCount };
};
