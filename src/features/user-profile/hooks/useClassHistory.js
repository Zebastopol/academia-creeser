import { useState, useEffect, useCallback } from 'react';
import { profileService } from '../services/profileService';
import { HISTORY_FILTERS } from '../constants/profileConstants';

/**
 * Hook para el historial de clases con filtrado y paginación.
 * @param {number|null} userId
 */
export const useClassHistory = (userId) => {
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(HISTORY_FILTERS.ALL);

  useEffect(() => {
    if (!userId) { setLoading(false); return; }

    let cancelled = false;
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await profileService.getClassHistory(userId);
        if (!cancelled) setHistory(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetch();
    return () => { cancelled = true; };
  }, [userId]);

  useEffect(() => {
    if (filter === HISTORY_FILTERS.ALL) {
      setFiltered(history);
    } else {
      setFiltered(history.filter(b => b.status === filter));
    }
  }, [history, filter]);

  const changeFilter = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  return { history: filtered, allHistory: history, loading, error, filter, changeFilter };
};
