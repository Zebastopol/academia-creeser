import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Modal from '../../../../shared/components/molecules/Modal';
import Button from '../../../../shared/components/atoms/Button';

/**
 * @param {{ isOpen: boolean, onClose: function, onSave: function, classData?: object|null }} props
 */
const ClassFormModal = ({ isOpen, onClose, onSave, classData = null }) => {
  const isEdit = !!classData;
  const emptyForm = {
    name: '', ageGroup: '', description: '', methodology: '',
    image: '', price: 30000, schedules: [{ location: '', day: '', time: '' }],
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (classData) {
      setForm({
        name: classData.name || '',
        ageGroup: classData.ageGroup || '',
        description: classData.description || '',
        methodology: classData.methodology || '',
        image: classData.image || '',
        price: classData.price || 30000,
        schedules: classData.schedules?.length ? classData.schedules.map((s) => ({ ...s })) : [{ location: '', day: '', time: '' }],
      });
    } else {
      setForm(emptyForm);
    }
  }, [classData, isOpen]);

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleScheduleChange = (idx, field, value) => {
    setForm((prev) => {
      const schedules = [...prev.schedules];
      schedules[idx] = { ...schedules[idx], [field]: value };
      return { ...prev, schedules };
    });
  };

  const addSchedule = () => setForm((prev) => ({ ...prev, schedules: [...prev.schedules, { location: '', day: '', time: '' }] }));

  const removeSchedule = (idx) => {
    if (form.schedules.length <= 1) return;
    setForm((prev) => ({ ...prev, schedules: prev.schedules.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, price: Number(form.price) });
  };

  const inputCls = 'w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Editar Clase' : 'Nueva Clase'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Nombre</label>
            <input value={form.name} onChange={(e) => handleChange('name', e.target.value)} required className={inputCls} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Grupo Etario</label>
            <input value={form.ageGroup} onChange={(e) => handleChange('ageGroup', e.target.value)} placeholder="ej: 8 - 14 años" className={inputCls} />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Descripción</label>
          <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} rows={2} className={inputCls} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Metodología</label>
            <input value={form.methodology} onChange={(e) => handleChange('methodology', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Precio ($CLP)</label>
            <input type="number" value={form.price} onChange={(e) => handleChange('price', e.target.value)} className={inputCls} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Horarios</label>
            <button type="button" onClick={addSchedule} className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700">
              <FaPlus size={10} /> Agregar
            </button>
          </div>
          <div className="space-y-2">
            {form.schedules.map((s, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <select value={s.location} onChange={(e) => handleScheduleChange(idx, 'location', e.target.value)} className={`${inputCls} flex-1`}>
                  <option value="">Sede</option>
                  <option value="La Reina">La Reina</option>
                  <option value="Ñuñoa">Ñuñoa</option>
                </select>
                <select value={s.day} onChange={(e) => handleScheduleChange(idx, 'day', e.target.value)} className={`${inputCls} flex-1`}>
                  <option value="">Día</option>
                  {['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <input value={s.time} onChange={(e) => handleScheduleChange(idx, 'time', e.target.value)} placeholder="ej: 18:00 a 19:00" className={`${inputCls} flex-1`} />
                {form.schedules.length > 1 && (
                  <button type="button" onClick={() => removeSchedule(idx)} className="p-2 text-red-400 hover:text-red-600">
                    <FaTrash size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} type="button">Cancelar</Button>
          <Button variant="primary" type="submit">{isEdit ? 'Guardar Cambios' : 'Crear Clase'}</Button>
        </div>
      </form>
    </Modal>
  );
};

ClassFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  classData: PropTypes.object,
};

export default ClassFormModal;
