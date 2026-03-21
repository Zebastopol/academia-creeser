import { useState } from 'react';
import { toast } from 'react-toastify';

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

/**
 * Hook para gestionar el formulario de contacto.
 * Maneja validación, envío simulado y reseteo.
 * @returns {{ formData, errors, isLoading, handleChange, handleSubmit }}
 */
export const useContactForm = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Correo inválido';
    }
    if (!formData.subject) newErrors.subject = 'Selecciona un asunto';
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      toast.success('¡Mensaje enviado! Te responderemos pronto.');
      setFormData(INITIAL_STATE);
      setErrors({});
    } catch {
      toast.error('Error al enviar el mensaje. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, errors, isLoading, handleChange, handleSubmit };
};
