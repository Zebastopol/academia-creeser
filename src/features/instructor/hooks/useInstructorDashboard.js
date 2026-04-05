import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import { instructorService } from '../services/instructorService';

const useInstructorDashboard = () => {
  const { user } = useAuth();
  const [kpis, setKpis] = useState(null);
  const [todayClasses, setTodayClasses] = useState([]);
  const [weekSchedule, setWeekSchedule] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const instructorId = user.id;

    const fetchAll = async () => {
      setLoading(true);
      try {
        const [kpiData, today, week] = await Promise.all([
          instructorService.getInstructorKPIs(instructorId),
          instructorService.getTodayClasses(instructorId),
          instructorService.getWeekSchedule(instructorId),
        ]);
        setKpis(kpiData);
        setTodayClasses(today);
        setWeekSchedule(week);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [user]);

  return { kpis, todayClasses, weekSchedule, loading };
};

export default useInstructorDashboard;
