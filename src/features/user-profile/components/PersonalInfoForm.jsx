import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaSave, FaUndo } from 'react-icons/fa';
import Button from '../../../shared/components/atoms/Button';
import { useProfile } from '../hooks/useProfile';

const FIELD_BASE = 'w-full px-4 py-3 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors';

/**
 * Formulario de edición de datos personales.
 */
const PersonalInfoForm = () => {
  const { formData, loading, handleChange, handleSubmit, resetForm } = useProfile();

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block mb-1.5 text-sm font-medium text-gray-700">
            Nombre completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={FIELD_BASE}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={FIELD_BASE}
            required
          />
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="phone" className="block mb-1.5 text-sm font-medium text-gray-700">
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+56 9 1234 5678"
            className={FIELD_BASE}
          />
        </div>

        {/* Fecha de nacimiento */}
        <div>
          <label htmlFor="birthDate" className="block mb-1.5 text-sm font-medium text-gray-700">
            Fecha de nacimiento
          </label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            className={FIELD_BASE}
          />
        </div>

        {/* Nombre del tutor */}
        <div>
          <label htmlFor="tutorName" className="block mb-1.5 text-sm font-medium text-gray-700">
            Nombre del tutor o apoderado
          </label>
          <input
            id="tutorName"
            name="tutorName"
            type="text"
            value={formData.tutorName}
            onChange={handleChange}
            placeholder="Opcional — solo menores de edad"
            className={FIELD_BASE}
          />
        </div>
      </div>

      {/* Contacto de emergencia */}
      <fieldset className="border border-gray-200 rounded-lg p-5">
        <legend className="px-2 text-sm font-semibold text-gray-700">Contacto de emergencia</legend>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="emergencyContactName" className="block mb-1.5 text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="emergencyContactName"
              name="emergencyContactName"
              type="text"
              value={formData.emergencyContactName}
              onChange={handleChange}
              className={FIELD_BASE}
            />
          </div>
          <div>
            <label htmlFor="emergencyContactPhone" className="block mb-1.5 text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              id="emergencyContactPhone"
              name="emergencyContactPhone"
              type="tel"
              value={formData.emergencyContactPhone}
              onChange={handleChange}
              placeholder="+56 9 1234 5678"
              className={FIELD_BASE}
            />
          </div>
        </div>
      </fieldset>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={resetForm}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          <FaUndo className="text-xs" />
          Descartar
        </button>
        <Button type="submit" isLoading={loading} className="gap-2">
          <FaSave />
          Guardar cambios
        </Button>
      </div>
    </motion.form>
  );
};

PersonalInfoForm.propTypes = {};

export default PersonalInfoForm;
