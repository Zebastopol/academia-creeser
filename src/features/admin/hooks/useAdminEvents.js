import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { adminService } from '../services/adminService';

export const useAdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchEvents = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const data = await adminService.getEvents(filters);
      setEvents(data);
    } catch (err) {
      toast.error('Error al cargar eventos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const openCreate = () => { setSelectedEvent(null); setIsFormOpen(true); };
  const openEdit = (evt) => { setSelectedEvent(evt); setIsFormOpen(true); };
  const openDelete = (evt) => { setSelectedEvent(evt); setIsDeleteOpen(true); };
  const closeAll = () => { setSelectedEvent(null); setIsFormOpen(false); setIsDeleteOpen(false); };

  const saveEvent = async (data) => {
    try {
      if (selectedEvent) {
        await adminService.updateEvent(selectedEvent.id, data);
        toast.success('Evento actualizado');
      } else {
        await adminService.createEvent(data);
        toast.success('Evento creado');
      }
      closeAll();
      await fetchEvents();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteEvent = async () => {
    if (!selectedEvent) return;
    try {
      await adminService.deleteEvent(selectedEvent.id);
      toast.success('Evento eliminado');
      closeAll();
      await fetchEvents();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return {
    events, loading, selectedEvent,
    isFormOpen, isDeleteOpen,
    openCreate, openEdit, openDelete, closeAll,
    saveEvent, deleteEvent,
  };
};
