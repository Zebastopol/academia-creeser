import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import { getAnnualPayments, getMonthDetail } from '../services/checkoutService';

/**
 * @param {number} [year=2026]
 */
const useCheckout = (year = 2026) => {
  const { user } = useAuth();
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthDetail, setMonthDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    const data = getAnnualPayments(user.id, year);
    setMonths(data.months);

    const currentMonth = new Date().getMonth() + 1;
    const activeMonth = data.months.find((m) => m.month === currentMonth);
    if (activeMonth && activeMonth.status !== 'none') {
      setSelectedMonth(activeMonth.month);
    }
    setLoading(false);
  }, [user?.id, year]);

  useEffect(() => {
    if (!user?.id || !selectedMonth) {
      setMonthDetail(null);
      return;
    }
    const detail = getMonthDetail(user.id, selectedMonth, year, user);
    setMonthDetail(detail);
  }, [user, selectedMonth, year]);

  const selectMonth = useCallback((month) => {
    setSelectedMonth((prev) => (prev === month ? null : month));
  }, []);

  return {
    months,
    selectedMonth,
    monthDetail,
    loading,
    selectMonth,
    user,
  };
};

export default useCheckout;
