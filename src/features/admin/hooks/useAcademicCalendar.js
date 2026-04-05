import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/adminService';

export const useAcademicCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchEvents = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const data = await adminService.getAcademicEvents(filters);
      setEvents(data);
    } catch (err) {
      console.error('Error loading calendar events:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const openCreate = () => {
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const openEdit = (event) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedEvent(null);
    setIsFormOpen(false);
  };

  const saveEvent = async (data) => {
    if (selectedEvent) {
      await adminService.updateAcademicEvent(selectedEvent.id, data);
    } else {
      await adminService.createAcademicEvent(data);
    }
    closeForm();
    await fetchEvents();
  };

  const deleteEvent = async (id) => {
    await adminService.deleteAcademicEvent(id);
    await fetchEvents();
  };

  const calendarEvents = events.map((e) => ({
    id: e.id,
    title: e.title,
    start: new Date(e.startDate),
    end: new Date(e.endDate + 'T23:59:59'),
    resource: e,
  }));

  return {
    events, calendarEvents, loading,
    selectedEvent, isFormOpen,
    openCreate, openEdit, closeForm,
    saveEvent, deleteEvent, fetchEvents,
  };
};
