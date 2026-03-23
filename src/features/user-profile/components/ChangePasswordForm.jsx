import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaLock, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';
import Button from '../../../shared/components/atoms/Button';
import { useChangePassword } from '../hooks/useChangePassword';
import { cn } from '../../../shared/utils/cn';

const FIELD_BASE = 'w-full px-4 py-3 pr-12 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors';

const PasswordInput = ({ id, name, label, value, onChange, placeholder }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="block mb-1.5 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={FIELD_BASE}
          autoComplete="off"
        />
        <button
          type="button"
          onClick={() => setVisible(v => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {visible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

const ChangePasswordForm = () => {
  const { formData, loading, handleChange, handleSubmit, getStrength } = useChangePassword();
  const { checks, score, total } = getStrength();

  const strengthPercent = total > 0 ? Math.round((score / total) * 100) : 0;
  const strengthColor = strengthPercent >= 100
    ? 'bg-green-500'
    : strengthPercent >= 66
      ? 'bg-yellow-500'
      : 'bg-red-500';

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg"
    >
      <PasswordInput
        id="currentPassword"
        name="currentPassword"
        label="Contraseña actual"
        value={formData.currentPassword}
        onChange={handleChange}
        placeholder="Ingresa tu contraseña actual"
      />

      <PasswordInput
        id="newPassword"
        name="newPassword"
        label="Nueva contraseña"
        value={formData.newPassword}
        onChange={handleChange}
        placeholder="Ingresa la nueva contraseña"
      />

      {/* Strength indicator */}
      {formData.newPassword && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-gray-400 text-sm" />
            <span className="text-xs font-medium text-gray-500">Seguridad de la contraseña</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className={cn('h-1.5 rounded-full transition-all duration-300', strengthColor)}
              style={{ width: `${strengthPercent}%` }}
            />
          </div>
          <ul className="space-y-1">
            {checks.map(check => (
              <li key={check.label} className={cn('flex items-center gap-2 text-xs', check.passed ? 'text-green-600' : 'text-gray-400')}>
                <span>{check.passed ? '✓' : '○'}</span>
                {check.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirmar nueva contraseña"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Repite la nueva contraseña"
      />

      {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
        <p className="text-xs text-red-500">Las contraseñas no coinciden</p>
      )}

      <div className="pt-2">
        <Button type="submit" isLoading={loading} className="gap-2">
          <FaLock className="text-sm" />
          Cambiar contraseña
        </Button>
      </div>
    </motion.form>
  );
};

ChangePasswordForm.propTypes = {};

export default ChangePasswordForm;
