import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { adminService } from '../services/adminService';
import { FILTER_DEFAULTS } from '../constants/adminConstants';

export const useAdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ ...FILTER_DEFAULTS });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllBookings(filters);
      setBookings(data);
    } catch (err) {
      toast.error('Error al cargar reservas');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  const openEdit = (booking) => { setSelectedBooking(booking); setIsEditOpen(true); };
  const openCancel = (booking) => { setSelectedBooking(booking); setIsCancelOpen(true); };
  const closeAll = () => { setSelectedBooking(null); setIsEditOpen(false); setIsCancelOpen(false); };

  const updateBooking = async (data) => {
    if (!selectedBooking) return;
    try {
      await adminService.updateBooking(selectedBooking.id, data);
      toast.success('Reserva actualizada');
      closeAll();
      await fetchBookings();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const cancelBooking = async () => {
    if (!selectedBooking) return;
    try {
      await adminService.cancelBookingAdmin(selectedBooking.id);
      toast.success('Reserva cancelada');
      closeAll();
      await fetchBookings();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return {
    bookings, loading, filters, updateFilter,
    selectedBooking, isEditOpen, isCancelOpen,
    openEdit, openCancel, closeAll,
    updateBooking, cancelBooking,
  };
};
