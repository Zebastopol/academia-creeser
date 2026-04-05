import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/adminService';

export const useAdminDashboard = () => {
  const [kpis, setKpis] = useState(null);
  const [marketing, setMarketing] = useState(null);
  const [revenue, setRevenue] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [kpiData, marketingData, revenueData, contactData] = await Promise.all([
        adminService.getDashboardKPIs(),
        adminService.getMarketingMetrics(),
        adminService.getRevenueData(),
        adminService.getContactSubmissions(),
      ]);
      setKpis(kpiData);
      setMarketing(marketingData);
      setRevenue(revenueData);
      setContacts(contactData);
    } catch (err) {
      console.error('Error loading dashboard:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  return { kpis, marketing, revenue, contacts, loading, refresh: fetchAll };
};
