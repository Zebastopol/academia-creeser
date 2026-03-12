import { useState, useEffect } from 'react';
import { eventService } from '../services/eventService';

export const useEvents = (limit) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getEvents(limit);
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [limit]);

  return { events, loading, error };
};
