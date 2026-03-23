import { useState, useEffect, useCallback } from 'react';
import { bookingService } from '../services/bookingService';
import { SESSION_STORAGE_KEY } from '../constants/bookingConstants';

/**
 * Hook para gestión de reservas con selección múltiple y persistencia de sesión.
 * @param {number|null} userId
 */
export const useBookings = (userId) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selections, setSelections] = useState(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(selections));
  }, [selections]);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await bookingService.getUserBookings(userId);
        if (!cancelled) setBookings(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchBookings();
    return () => { cancelled = true; };
  }, [userId]);

  const addSelection = useCallback((slot) => {
    setSelections(prev => {
      if (prev.some(s => s.slotId === slot.id)) return prev;
      return [...prev, {
        slotId: slot.id,
        classId: slot.classId,
        className: slot.className,
        location: slot.location,
        day: slot.dayName,
        time: slot.time,
        date: slot.date,
      }];
    });
  }, []);

  const removeSelection = useCallback((slotId) => {
    setSelections(prev => prev.filter(s => s.slotId !== slotId));
  }, []);

  const clearSelections = useCallback(() => {
    setSelections([]);
  }, []);

  const toggleSelection = useCallback((slot) => {
    setSelections(prev => {
      const exists = prev.some(s => s.slotId === slot.id);
      if (exists) return prev.filter(s => s.slotId !== slot.id);
      return [...prev, {
        slotId: slot.id,
        classId: slot.classId,
        className: slot.className,
        location: slot.location,
        day: slot.dayName,
        time: slot.time,
        date: slot.date,
      }];
    });
  }, []);

  const isSlotSelected = useCallback((slotId) => {
    return selections.some(s => s.slotId === slotId);
  }, [selections]);

  const confirmSelections = async () => {
    if (!userId || selections.length === 0) {
      return { success: false, error: 'No hay selecciones para confirmar' };
    }
    try {
      const newBookings = await bookingService.createMultipleBookings(userId, selections);
      setBookings(prev => [...prev, ...newBookings]);
      clearSelections();
      return { success: true, bookings: newBookings };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const result = await bookingService.cancelBooking(bookingId, userId);
      if (result.success) {
        setBookings(prev => prev.filter(b => b.id !== bookingId));
      }
      return result;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const createBooking = async (bookingData) => {
    try {
      const newBooking = await bookingService.createBooking({ ...bookingData, userId });
      setBookings(prev => [...prev, newBooking]);
      return { success: true, booking: newBooking };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    bookings,
    loading,
    error,
    selections,
    addSelection,
    removeSelection,
    clearSelections,
    toggleSelection,
    isSlotSelected,
    confirmSelections,
    cancelBooking,
    createBooking,
  };
};
