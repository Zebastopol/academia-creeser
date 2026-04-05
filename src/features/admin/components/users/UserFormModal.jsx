import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../shared/components/molecules/Modal';
import Button from '../../../../shared/components/atoms/Button';
import { adminService } from '../../services/adminService';

/**
 * @param {{ isOpen: boolean, onClose: function, onSave: function, user?: object|null }} props
 */
const UserFormModal = ({ isOpen, onClose, onSave, user = null }) => {
  const classOptions = adminService.getClassOptions();
  const isEdit = !!user;

  const emptyForm = {
    name: '', email: '', password: '', role: 'member', phone: '',
    birthDate: '', belt: 'Cinturón Blanco', membership: '1 vez por semana',
    status: 'active', classIds: [],
    emergencyContact: { name: '', phone: '' },
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        role: user.role || 'member',
        phone: user.phone || '',
        birthDate: user.birthDate || '',
        belt: user.belt || 'Cinturón Blanco',
        membership: user.membership || '1 vez por semana',
        status: user.status || 'active',
        classIds: user.classIds || [],
        emergencyContact: user.emergencyContact || { name: '', phone: '' },
      });
    } else {
      setForm(emptyForm);
    }
  }, [user, isOpen]);

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleEmergencyChange = (field, value) =>
    setForm((prev) => ({ ...prev, emergencyContact: { ...prev.emergencyContact, [field]: value } }));

  const toggleClass = (id) => {
    setForm((prev) => ({
      ...prev,
      classIds: prev.classIds.includes(id) ? prev.classIds.filter((c) => c !== id) : [...prev.classIds, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form };
    if (isEdit && !data.password) delete data.password;
    onSave(data);
  };

  const inputCls = 'w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Editar Usuario' : 'Nuevo Usuario'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Nombre completo</label>
            <input value={form.name} onChange={(e) => handleChange('name', e.target.value)} required className={inputCls} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} required className={inputCls} />
          </div>
          {!isEdit && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Contraseña</label>
              <input type="password" value={form.password} onChange={(e) => handleChange('password', e.target.value)} required className={inputCls} />
            </div>
          )}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Rol</label>
            <select value={form.role} onChange={(e) => handleChange('role', e.target.value)} className={inputCls}>
              <option value="member">Alumno</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Teléfono</label>
            <input value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Fecha de nacimiento</label>
            <input type="date" value={form.birthDate} onChange={(e) => handleChange('birthDate', e.target.value)} className={inputCls} />
          </div>
        </div>

        {form.role === 'member' && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Cinturón</label>
                <select value={form.belt} onChange={(e) => handleChange('belt', e.target.value)} className={inputCls}>
                  {['Cinturón Blanco','Cinturón Amarillo','Cinturón Verde','Cinturón Azul','Cinturón Rojo','Cinturón Negro 1er Dan','Cinturón Negro 2do Dan','Cinturón Negro 3er Dan'].map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Plan</label>
                <select value={form.membership || ''} onChange={(e) => handleChange('membership', e.target.value)} className={inputCls}>
                  <option value="1 vez por semana">1 vez por semana</option>
                  <option value="2 veces por semana">2 veces por semana</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Clases inscritas</label>
              <div className="flex flex-wrap gap-2">
                {classOptions.map((c) => (
                  <button key={c.id} type="button" onClick={() => toggleClass(c.id)}
                    className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${form.classIds.includes(c.id) ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-300 hover:border-primary-400'}`}>
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Contacto Emergencia</label>
                <input value={form.emergencyContact.name} onChange={(e) => handleEmergencyChange('name', e.target.value)} placeholder="Nombre" className={inputCls} />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Tel. Emergencia</label>
                <input value={form.emergencyContact.phone} onChange={(e) => handleEmergencyChange('phone', e.target.value)} placeholder="Teléfono" className={inputCls} />
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} type="button">Cancelar</Button>
          <Button variant="primary" type="submit">{isEdit ? 'Guardar Cambios' : 'Crear Usuario'}</Button>
        </div>
      </form>
    </Modal>
  );
};

UserFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default UserFormModal;
