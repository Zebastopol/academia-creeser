import PropTypes from 'prop-types';
import Modal from '../../../../shared/components/molecules/Modal';
import StatusBadge from '../../../../shared/components/molecules/StatusBadge';
import StudentMetrics from '../dashboard/StudentMetrics';

/**
 * @param {{ isOpen: boolean, onClose: function, user: object|null }} props
 */
const UserDetailDrawer = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  const roleLabels = { admin: 'Administrador', instructor: 'Instructor', member: 'Alumno' };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Detalle: ${user.name}`} size="lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-200" />
          <div>
            <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <StatusBadge status={user.status} />
              <span className="text-xs text-gray-400 px-2 py-0.5 bg-gray-100 rounded-full">{roleLabels[user.role]}</span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-gray-50">
            <p className="text-xs text-gray-500">Teléfono</p>
            <p className="text-sm font-medium text-gray-900">{user.phone || '—'}</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-50">
            <p className="text-xs text-gray-500">Fecha de Nacimiento</p>
            <p className="text-sm font-medium text-gray-900">{user.birthDate ? new Date(user.birthDate).toLocaleDateString('es-CL') : '—'}</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-50">
            <p className="text-xs text-gray-500">Fecha Inscripción</p>
            <p className="text-sm font-medium text-gray-900">{user.joinDate ? new Date(user.joinDate).toLocaleDateString('es-CL') : '—'}</p>
          </div>
          {user.role === 'member' && (
            <>
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500">Cinturón</p>
                <p className="text-sm font-medium text-gray-900">{user.belt || '—'}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500">Plan</p>
                <p className="text-sm font-medium text-gray-900">{user.membership || '—'}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500">Contacto Emergencia</p>
                <p className="text-sm font-medium text-gray-900">{user.emergencyContact?.name || '—'}</p>
                <p className="text-xs text-gray-400">{user.emergencyContact?.phone || ''}</p>
              </div>
            </>
          )}
        </div>

        {/* Student Metrics */}
        {user.role === 'member' && (
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-700">Métricas del Alumno</h4>
            <StudentMetrics userId={user.id} />
          </div>
        )}

        {/* Achievements */}
        {user.role === 'member' && user.achievements?.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-gray-700">Logros</h4>
            <div className="flex flex-wrap gap-2">
              {user.achievements.map((a) => (
                <span key={a} className="px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-700 rounded-full">{a}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

UserDetailDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default UserDetailDrawer;
