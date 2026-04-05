import PropTypes from 'prop-types';
import { FaTimes, FaTrophy, FaStickyNote } from 'react-icons/fa';
import Modal from '../../../../shared/components/molecules/Modal';
import StatusBadge from '../../../../shared/components/molecules/StatusBadge';
import { ACHIEVEMENTS_CATALOG } from '../../../user-profile/constants/profileConstants';
import { PROGRESS_CATEGORIES } from '../../constants/instructorConstants';

/**
 * @param {{ student: object, isOpen: boolean, onClose: function, loading: boolean }} props
 */
const StudentProgressCard = ({ student, isOpen, onClose, loading }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={student ? `Detalle: ${student.name}` : 'Cargando...'} size="lg">
      {loading || !student ? (
        <p className="text-sm text-gray-400">Cargando información del alumno...</p>
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <img src={student.avatar} alt={student.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
              <p className="text-sm text-gray-500">{student.belt || 'Sin cinturón'}</p>
              <p className="text-xs text-gray-400">{student.email}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-gray-50 text-center">
              <p className="text-xl font-bold text-gray-900">{student.confirmedBookings}</p>
              <p className="text-xs text-gray-500">Clases Agendadas</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 text-center">
              <p className="text-xl font-bold text-gray-900">{student.attendanceRate}%</p>
              <p className="text-xs text-gray-500">Asistencia</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 text-center">
              <p className="text-xl font-bold text-gray-900">{student.totalAttendance}</p>
              <p className="text-xs text-gray-500">Sesiones</p>
            </div>
          </div>

          {/* Achievements */}
          {student.achievements && student.achievements.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaTrophy className="text-yellow-500" /> Logros
              </h4>
              <div className="flex flex-wrap gap-2">
                {student.achievements.map((achId) => {
                  const ach = ACHIEVEMENTS_CATALOG.find((a) => a.id === achId);
                  if (!ach) return null;
                  return (
                    <span key={achId} className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-50 text-yellow-800 rounded-full">
                      <span>{ach.icon}</span> {ach.name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Notes */}
          {student.notes && student.notes.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaStickyNote className="text-blue-500" /> Notas de Progreso
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {student.notes.map((note) => {
                  const cat = PROGRESS_CATEGORIES[note.category];
                  return (
                    <div key={note.id} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${cat?.color || 'bg-gray-100 text-gray-800'}`}>
                          {cat?.label || note.category}
                        </span>
                        <span className="text-xs text-gray-400">{note.date}</span>
                      </div>
                      <p className="text-sm text-gray-700">{note.content}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

StudentProgressCard.propTypes = {
  student: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default StudentProgressCard;
