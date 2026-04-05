import { useState, useCallback } from 'react';
import { adminService } from '../services/adminService';

export const useAdminReports = () => {
  const [attendanceReport, setAttendanceReport] = useState(null);
  const [popularityReport, setPopularityReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    classId: 'all',
    location: 'all',
    dateRange: { start: '', end: '' },
  });

  const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
  const updateDateRange = (field, value) => setFilters((prev) => ({
    ...prev,
    dateRange: { ...prev.dateRange, [field]: value },
  }));

  const generateReports = useCallback(async () => {
    setLoading(true);
    try {
      const [att, pop] = await Promise.all([
        adminService.getAttendanceReport(filters),
        adminService.getPopularityReport(filters),
      ]);
      setAttendanceReport(att);
      setPopularityReport(pop);
    } catch (err) {
      console.error('Error generating reports:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  return {
    attendanceReport, popularityReport, loading, filters,
    updateFilter, updateDateRange, generateReports,
  };
};
