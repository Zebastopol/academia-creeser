import { useState, useEffect, useMemo } from 'react';
import { bookingService } from '../services/bookingService';
import { DAY_LABELS, MONTH_NAMES } from '../constants/bookingConstants';

/**
 * Hook para gestionar el calendario de agendamiento.
 * Genera la grilla mensual y precarga los slots disponibles.
 *
 * @param {{ location: string|null, classId: number|null, userId: number|null }} params
 */
export const useBookingCalendar = ({ location, classId, userId }) => {
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const filtersReady = Boolean(location && classId);

  const calendarGrid = useMemo(() => {
    const { year, month } = currentDate;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    let startOffset = firstDay.getDay();
    startOffset = startOffset === 0 ? 6 : startOffset - 1;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const cells = [];

    for (let i = startOffset - 1; i >= 0; i--) {
      cells.push({
        day: prevMonthLastDay - i,
        date: null,
        isCurrentMonth: false,
        isToday: false,
        isPast: true,
      });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({
        day: d,
        date: dateStr,
        isCurrentMonth: true,
        isToday: date.getTime() === today.getTime(),
        isPast: date < today,
      });
    }

    let nextDay = 1;
    while (cells.length % 7 !== 0) {
      cells.push({
        day: nextDay++,
        date: null,
        isCurrentMonth: false,
        isToday: false,
        isPast: false,
      });
    }

    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }
    return weeks;
  }, [currentDate]);

  useEffect(() => {
    if (!filtersReady) {
      setSlots([]);
      return;
    }

    let cancelled = false;
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const data = await bookingService.getMonthSlots({
          year: currentDate.year,
          month: currentDate.month,
          location,
          classId,
          userId,
        });
        if (!cancelled) setSlots(data);
      } catch (err) {
        console.error('Error fetching slots:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchSlots();
    return () => { cancelled = true; };
  }, [currentDate, location, classId, userId, filtersReady]);

  const slotsMap = useMemo(() => {
    const map = {};
    slots.forEach(slot => {
      if (!map[slot.date]) map[slot.date] = [];
      map[slot.date].push(slot);
    });
    return map;
  }, [slots]);

  const selectedDateSlots = selectedDate ? (slotsMap[selectedDate] || []) : [];

  const monthLabel = `${MONTH_NAMES[currentDate.month]} ${currentDate.year}`;

  const canGoPrev = (() => {
    const now = new Date();
    return currentDate.year > now.getFullYear() ||
      (currentDate.year === now.getFullYear() && currentDate.month > now.getMonth());
  })();

  const goToNextMonth = () => {
    setCurrentDate(prev => {
      const next = new Date(prev.year, prev.month + 1, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
    setSelectedDate(null);
  };

  const goToPrevMonth = () => {
    if (!canGoPrev) return;
    setCurrentDate(prev => {
      const prevDate = new Date(prev.year, prev.month - 1, 1);
      return { year: prevDate.getFullYear(), month: prevDate.getMonth() };
    });
    setSelectedDate(null);
  };

  return {
    currentDate,
    calendarGrid,
    slotsMap,
    selectedDate,
    setSelectedDate,
    selectedDateSlots,
    monthLabel,
    dayLabels: DAY_LABELS,
    goToNextMonth,
    goToPrevMonth,
    canGoPrev,
    loading,
    filtersReady,
  };
};
