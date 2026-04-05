import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../shared/components/molecules/Modal';
import Button from '../../../../shared/components/atoms/Button';

/**
 * @param {{ isOpen: boolean, onClose: function, onSave: function, booking?: object|null }} props
 */
const BookingEditModal = ({ isOpen, onClose, onSave, booking = null }) => {
  const [form, setForm] = useState({ date: '', time: '', location: '', status: 'confirmed' });

  useEffect(() => {
    if (booking) {
      setForm({
        date: booking.date || '',
        time: booking.time || '',
        location: booking.location || '',
        status: booking.status || 'confirmed',
      });
    }
  }, [booking, isOpen]);

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => { e.preventDefault(); onSave(form); };

  const inputCls = 'w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Reserva" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {booking && (
          <div className="p-3 rounded-lg bg-gray-50">
            <p className="text-sm font-medium text-gray-900">{booking.userName} - {booking.className}</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Fecha</label>
            <input type="date" value={form.date} onChange={(e) => handleChange('date', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Hora</label>
            <input value={form.time} onChange={(e) => handleChange('time', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Sede</label>
            <select value={form.location} onChange={(e) => handleChange('location', e.target.value)} className={inputCls}>
              <option value="La Reina">La Reina</option>
              <option value="Ñuñoa">Ñuñoa</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Estado</label>
            <select value={form.status} onChange={(e) => handleChange('status', e.target.value)} className={inputCls}>
              <option value="confirmed">Confirmada</option>
              <option value="cancelled">Cancelada</option>
              <option value="pending">Pendiente</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} type="button">Cancelar</Button>
          <Button variant="primary" type="submit">Guardar Cambios</Button>
        </div>
      </form>
    </Modal>
  );
};

BookingEditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  booking: PropTypes.object,
};

export default BookingEditModal;
