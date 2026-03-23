import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../auth/context/AuthContext';
import { profileService } from '../services/profileService';

/**
 * Hook para gestión del formulario de datos personales.
 * Maneja el estado del form, validaciones y submit.
 */
export const useProfile = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(() => ({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthDate: user?.birthDate || '',
    emergencyContactName: user?.emergencyContact?.name || '',
    emergencyContactPhone: user?.emergencyContact?.phone || '',
  }));

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      birthDate: user?.birthDate || '',
      emergencyContactName: user?.emergencyContact?.name || '',
      emergencyContactPhone: user?.emergencyContact?.phone || '',
    });
  }, [user]);

  const validate = useCallback(() => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'El nombre es obligatorio';
    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido';
    }
    if (formData.phone && !/^\+?56\s?9\s?\d{4}\s?\d{4}$/.test(formData.phone.replace(/\s+/g, ' ').trim())) {
      errors.phone = 'Formato: +56 9 XXXX XXXX';
    }
    return errors;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      toast.error(Object.values(errors)[0]);
      return { success: false, errors };
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        birthDate: formData.birthDate,
        emergencyContact: {
          name: formData.emergencyContactName.trim(),
          phone: formData.emergencyContactPhone.trim(),
        },
      };
      await profileService.updatePersonalInfo(user.id, payload);
      await updateProfile(payload);
      toast.success('Perfil actualizado correctamente');
      return { success: true };
    } catch (err) {
      toast.error(err.message || 'Error al actualizar el perfil');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [formData, user, validate, updateProfile]);

  return {
    formData,
    loading,
    handleChange,
    handleSubmit,
    resetForm,
    validate,
  };
};
