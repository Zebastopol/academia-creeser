import { useState, useEffect } from 'react';
import { marketingService } from '../../home/services/marketingService';

export const useMemberships = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const data = await marketingService.getMemberships();
        setMemberships(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberships();
  }, []);

  return { memberships, loading, error };
};
