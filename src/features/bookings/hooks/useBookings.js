import { useState, useEffect } from 'react';
import { bookingService } from '../services/bookingService';

export const useBookings = (userId) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await bookingService.getUserBookings(userId);
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  const createBooking = async (bookingData) => {
    try {
      const newBooking = await bookingService.createBooking({ ...bookingData, userId });
      setBookings(prev => [...prev, newBooking]);
      return { success: true, booking: newBooking };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return { bookings, loading, error, createBooking };
};
