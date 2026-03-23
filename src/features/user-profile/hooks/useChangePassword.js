import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../auth/context/AuthContext';
import { profileService } from '../services/profileService';
import { PASSWORD_RULES } from '../constants/profileConstants';

/**
 * Hook para el flujo de cambio de contraseña.
 */
export const useChangePassword = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  }, []);

  /**
   * Evalúa la fortaleza de la contraseña nueva en tiempo real.
   * @returns {{ score: number, checks: Array<{ label: string, passed: boolean }> }}
   */
  const getStrength = useCallback(() => {
    const pw = formData.newPassword;
    const checks = [
      { label: `Mínimo ${PASSWORD_RULES.minLength} caracteres`, passed: pw.length >= PASSWORD_RULES.minLength },
      { label: 'Una letra mayúscula', passed: /[A-Z]/.test(pw) },
      { label: 'Un número', passed: /\d/.test(pw) },
    ];
    const score = checks.filter(c => c.passed).length;
    return { score, checks, total: checks.length };
  }, [formData.newPassword]);

  const validate = useCallback(() => {
    const errors = {};
    if (!formData.currentPassword) errors.currentPassword = 'Ingresa tu contraseña actual';
    if (!formData.newPassword) {
      errors.newPassword = 'Ingresa la nueva contraseña';
    }
    if (formData.newPassword && formData.newPassword === formData.currentPassword) {
      errors.newPassword = 'La nueva contraseña debe ser diferente';
    }
    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
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
      await profileService.changePassword(user.id, formData.currentPassword, formData.newPassword);
      toast.success('Contraseña actualizada correctamente');
      resetForm();
      return { success: true };
    } catch (err) {
      toast.error(err.message || 'Error al cambiar la contraseña');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [formData, user, validate, resetForm]);

  return {
    formData,
    loading,
    handleChange,
    handleSubmit,
    resetForm,
    getStrength,
  };
};
