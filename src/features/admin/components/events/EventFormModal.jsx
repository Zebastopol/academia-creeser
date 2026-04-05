import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../shared/components/molecules/Modal';
import Button from '../../../../shared/components/atoms/Button';

/**
 * @param {{ isOpen: boolean, onClose: function, onSave: function, event?: object|null }} props
 */
const EventFormModal = ({ isOpen, onClose, onSave, event = null }) => {
  const isEdit = !!event;
  const emptyForm = { title: '', description: '', date: '', time: '', location: '', category: 'Evento', image: '' };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || '', description: event.description || '',
        date: event.date || '', time: event.time || '',
        location: event.location || '', category: event.category || 'Evento',
        image: event.image || '',
      });
    } else {
      setForm(emptyForm);
    }
  }, [event, isOpen]);

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => { e.preventDefault(); onSave(form); };

  const inputCls = 'w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Editar Evento' : 'Nuevo Evento'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Título</label>
          <input value={form.title} onChange={(e) => handleChange('title', e.target.value)} required className={inputCls} />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Descripción</label>
          <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} rows={3} className={inputCls} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Fecha</label>
            <input type="date" value={form.date} onChange={(e) => handleChange('date', e.target.value)} required className={inputCls} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Hora</label>
            <input value={form.time} onChange={(e) => handleChange('time', e.target.value)} placeholder="ej: 10:00 - 14:00" className={inputCls} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Ubicación</label>
            <input value={form.location} onChange={(e) => handleChange('location', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Categoría</label>
            <select value={form.category} onChange={(e) => handleChange('category', e.target.value)} className={inputCls}>
              {['Celebración', 'Encuentro', 'Competencia', 'Seminario', 'Evento'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} type="button">Cancelar</Button>
          <Button variant="primary" type="submit">{isEdit ? 'Guardar Cambios' : 'Crear Evento'}</Button>
        </div>
      </form>
    </Modal>
  );
};

EventFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  event: PropTypes.object,
};

export default EventFormModal;
