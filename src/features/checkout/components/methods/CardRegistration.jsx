import { useState } from 'react';
import { FaCreditCard, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CardRegistration = () => {
  const [form, setForm] = useState({
    cardNumber: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info('Inscripción de tarjeta simulada. La pasarela real se integrará próximamente.');
  };

  const inputClass =
    'w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-gray-600 mb-2">
        Registra tu tarjeta para el pago automático mensual.
      </p>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Número de tarjeta</label>
        <div className="relative">
          <input
            type="text"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className={inputClass}
          />
          <FaCreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Nombre en la tarjeta</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Como aparece en la tarjeta"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Vencimiento</label>
          <input
            type="text"
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            placeholder="MM/AA"
            maxLength={5}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">CVV</label>
          <input
            type="text"
            name="cvv"
            value={form.cvv}
            onChange={handleChange}
            placeholder="123"
            maxLength={4}
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
      >
        <FaLock className="text-xs" /> Inscribir Tarjeta
      </button>

      <p className="text-[10px] text-gray-400 text-center">
        Esta es una simulación. Ningún dato será procesado realmente.
      </p>
    </form>
  );
};

export default CardRegistration;
