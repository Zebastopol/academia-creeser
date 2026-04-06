import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import { getPaymentHistory } from '../services/checkoutService';

const useCheckoutHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    const data = getPaymentHistory(user.id);
    setPayments(data);
    setLoading(false);
  }, [user?.id]);

  return { payments, loading };
};

export default useCheckoutHistory;
