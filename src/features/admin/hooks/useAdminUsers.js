import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { adminService } from '../services/adminService';
import { FILTER_DEFAULTS } from '../constants/adminConstants';

export const useAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ ...FILTER_DEFAULTS });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminService.getUsers(filters);
      setUsers(data);
    } catch (err) {
      toast.error('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  const openCreate = () => { setSelectedUser(null); setIsFormOpen(true); };
  const openEdit = (user) => { setSelectedUser(user); setIsFormOpen(true); };
  const openDetail = (user) => { setSelectedUser(user); setIsDetailOpen(true); };
  const openDelete = (user) => { setSelectedUser(user); setIsDeleteOpen(true); };

  const closeAll = () => {
    setSelectedUser(null);
    setIsFormOpen(false);
    setIsDetailOpen(false);
    setIsDeleteOpen(false);
  };

  const saveUser = async (data) => {
    try {
      if (selectedUser) {
        await adminService.updateUser(selectedUser.id, data);
        toast.success('Usuario actualizado');
      } else {
        await adminService.createUser(data);
        toast.success('Usuario creado');
      }
      closeAll();
      await fetchUsers();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const toggleStatus = async (id) => {
    try {
      await adminService.toggleUserStatus(id);
      toast.success('Estado actualizado');
      await fetchUsers();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return {
    users, loading, filters, updateFilter,
    selectedUser, isFormOpen, isDetailOpen, isDeleteOpen,
    openCreate, openEdit, openDetail, openDelete, closeAll,
    saveUser, toggleStatus, fetchUsers,
  };
};
