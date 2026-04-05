import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../shared/components/molecules/Modal';
import Button from '../../../../shared/components/atoms/Button';
import { CALENDAR_EVENT_TYPES } from '../../constants/adminConstants';
import { adminService } from '../../services/adminService';

/**
 * @param {{ isOpen: boolean, onClose: function, onSave: function, event?: object|null }} props
 */
const CalendarEventForm = ({ isOpen, onClose, onSave, event = null }) => {
  const classOptions = adminService.getClassOptions();
  const isEdit = !!event;

  const [form, setForm] = useState({
    title: '', type: 'event', startDate: '', endDate: '',
    classIds: [], location: '', description: '', color: '#0c92eb',
  });

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || '',
        type: event.type || 'event',
        startDate: event.startDate || '',
        endDate: event.endDate || '',
        classIds: event.classIds || [],
        location: event.location || '',
        description: event.description || '',
        color: event.color || '#0c92eb',
      });
    } else {
      setForm({ title: '', type: 'event', startDate: '', endDate: '', classIds: [], location: '', description: '', color: '#0c92eb' });
    }
  }, [event, isOpen]);

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleClass = (id) => {
    setForm((prev) => ({
      ...prev,
      classIds: prev.classIds.includes(id)
        ? prev.classIds.filter((c) => c !== id)
        : [...prev.classIds, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  const inputCls = 'w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Editar Evento' : 'Nuevo Evento Académico'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Título</label>
          <input value={form.title} onChange={(e) => handleChange('title', e.target.value)} required className={inputCls} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Tipo</label>
            <select value={form.type} onChange={(e) => { handleChange('type', e.target.value); handleChange('color', CALENDAR_EVENT_TYPES[e.target.value]?.color || '#0c92eb'); }} className={inputCls}>
              {Object.entries(CALENDAR_EVENT_TYPES).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Ubicación</label>
            <input value={form.location} onChange={(e) => handleChange('location', e.target.value)} className={inputCls} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Fecha Inicio</label>
            <input type="date" value={form.startDate} onChange={(e) => handleChange('startDate', e.target.value)} required className={inputCls} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Fecha Fin</label>
            <input type="date" value={form.endDate} onChange={(e) => handleChange('endDate', e.target.value)} required className={inputCls} />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Secciones</label>
          <div className="flex flex-wrap gap-2">
            {classOptions.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => toggleClass(c.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors
                  ${form.classIds.includes(c.id) ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-300 hover:border-primary-400'}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Descripción</label>
          <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} rows={3} className={inputCls} />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} type="button">Cancelar</Button>
          <Button variant="primary" type="submit">{isEdit ? 'Guardar Cambios' : 'Crear Evento'}</Button>
        </div>
      </form>
    </Modal>
  );
};

CalendarEventForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  event: PropTypes.object,
};

export default CalendarEventForm;
