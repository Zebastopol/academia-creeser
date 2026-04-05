import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../shared/components/molecules/Modal';
import Button from '../../../../shared/components/atoms/Button';
import { PROGRESS_CATEGORIES } from '../../constants/instructorConstants';

/**
 * @param {{ isOpen: boolean, onClose: function, onSave: function, saving: boolean, classOptions: Array, studentOptions: Array, defaultClassId: string, defaultStudentId: string }} props
 */
const ProgressNoteForm = ({ isOpen, onClose, onSave, saving, classOptions, studentOptions, defaultClassId, defaultStudentId }) => {
  const [form, setForm] = useState({
    classId: '',
    studentId: '',
    category: 'general',
    content: '',
    beltAtTime: '',
  });

  useEffect(() => {
    if (isOpen) {
      setForm({
        classId: defaultClassId || (classOptions[0] ? String(classOptions[0].id) : ''),
        studentId: defaultStudentId || (studentOptions[0] ? String(studentOptions[0].id) : ''),
        category: 'general',
        content: '',
        beltAtTime: '',
      });
    }
  }, [isOpen, defaultClassId, defaultStudentId, classOptions, studentOptions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.content.trim()) return;
    onSave({
      classId: Number(form.classId),
      studentId: Number(form.studentId),
      category: form.category,
      content: form.content.trim(),
      beltAtTime: form.beltAtTime || undefined,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nueva Nota de Progreso" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-xs font-medium text-gray-600">Clase</label>
            <select
              value={form.classId}
              onChange={(e) => setForm((p) => ({ ...p, classId: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              {classOptions.map((c) => (
                <option key={c.id} value={String(c.id)}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-xs font-medium text-gray-600">Alumno</label>
            <select
              value={form.studentId}
              onChange={(e) => setForm((p) => ({ ...p, studentId: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              {studentOptions.map((s) => (
                <option key={s.id} value={String(s.id)}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 text-xs font-medium text-gray-600">Categoría</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(PROGRESS_CATEGORIES).map(([key, { label, color }]) => (
              <button
                key={key}
                type="button"
                onClick={() => setForm((p) => ({ ...p, category: key }))}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors
                  ${form.category === key ? color : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 text-xs font-medium text-gray-600">Cinturón actual del alumno (opcional)</label>
          <input
            type="text"
            value={form.beltAtTime}
            onChange={(e) => setForm((p) => ({ ...p, beltAtTime: e.target.value }))}
            placeholder="Ej: Cinturón Amarillo"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-xs font-medium text-gray-600">Nota</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
            rows={4}
            placeholder="Escribe tu observación sobre el progreso del alumno..."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" onClick={onClose} className="bg-gray-100 text-gray-700 hover:bg-gray-200">
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={saving || !form.content.trim()}
            className="bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar Nota'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

ProgressNoteForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  classOptions: PropTypes.array.isRequired,
  studentOptions: PropTypes.array.isRequired,
  defaultClassId: PropTypes.string,
  defaultStudentId: PropTypes.string,
};

export default ProgressNoteForm;
