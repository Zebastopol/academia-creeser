import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { adminService } from '../services/adminService';

export const useAdminClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchClasses = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const data = await adminService.getClasses(filters);
      setClasses(data);
    } catch (err) {
      toast.error('Error al cargar clases');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchClasses(); }, [fetchClasses]);

  const openCreate = () => { setSelectedClass(null); setIsFormOpen(true); };
  const openEdit = (cls) => { setSelectedClass(cls); setIsFormOpen(true); };
  const openDelete = (cls) => { setSelectedClass(cls); setIsDeleteOpen(true); };
  const closeAll = () => { setSelectedClass(null); setIsFormOpen(false); setIsDeleteOpen(false); };

  const saveClass = async (data) => {
    try {
      if (selectedClass) {
        await adminService.updateClass(selectedClass.id, data);
        toast.success('Clase actualizada');
      } else {
        await adminService.createClass(data);
        toast.success('Clase creada');
      }
      closeAll();
      await fetchClasses();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteClass = async () => {
    if (!selectedClass) return;
    try {
      await adminService.deleteClass(selectedClass.id);
      toast.success('Clase eliminada');
      closeAll();
      await fetchClasses();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return {
    classes, loading, selectedClass,
    isFormOpen, isDeleteOpen,
    openCreate, openEdit, openDelete, closeAll,
    saveClass, deleteClass,
  };
};
