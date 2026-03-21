import PropTypes from 'prop-types';
import Button from '../../../shared/components/atoms/Button';

const SUBJECT_OPTIONS = [
  { value: '', label: 'Selecciona un asunto' },
  { value: 'clase-prueba', label: 'Agendar clase de prueba' },
  { value: 'informacion', label: 'Información general' },
  { value: 'inscripcion', label: 'Inscripción / Matrícula' },
  { value: 'horarios', label: 'Consulta de horarios' },
  { value: 'otro', label: 'Otro' },
];

const INPUT_BASE = 'block w-full px-4 py-3 text-gray-900 bg-white border rounded-lg transition-all duration-200 outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500';

/**
 * @param {{ formData: object, errors: object, isLoading: boolean, onChange: function, onSubmit: function }} props
 */
const ContactForm = ({ formData, errors, isLoading, onChange, onSubmit }) => {
  const fieldClass = (name) =>
    `${INPUT_BASE} ${errors[name] ? 'border-red-400 focus:ring-red-400' : 'border-gray-200'}`;

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre completo *
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          className={fieldClass('name')}
          placeholder="Tu nombre"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      {/* Email y Teléfono */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico *
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className={fieldClass('email')}
            placeholder="ejemplo@correo.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono (opcional)
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            className={fieldClass('phone')}
            placeholder="+56 9 1234 5678"
          />
        </div>
      </div>

      {/* Asunto */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Asunto *
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={onChange}
          className={fieldClass('subject')}
        >
          {SUBJECT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={onChange}
          className={fieldClass('message')}
          placeholder="Escribe tu mensaje aquí..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
      </div>

      <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
        Enviar Mensaje
      </Button>
    </form>
  );
};

ContactForm.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
