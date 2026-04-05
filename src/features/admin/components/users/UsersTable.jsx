import PropTypes from 'prop-types';
import { FaEdit, FaEye, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import DataTable from '../../../../shared/components/molecules/DataTable';
import StatusBadge from '../../../../shared/components/molecules/StatusBadge';
import Button from '../../../../shared/components/atoms/Button';

const ROLE_LABELS = { admin: 'Admin', instructor: 'Instructor', member: 'Alumno' };

/**
 * @param {{ users: Array, onEdit: function, onView: function, onToggleStatus: function, onCreate: function, filters: object, onFilterChange: function }} props
 */
const UsersTable = ({ users, onEdit, onView, onToggleStatus, onCreate, filters, onFilterChange }) => {
  const columns = [
    {
      key: 'name',
      label: 'Usuario',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <img src={row.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
          <div>
            <p className="text-sm font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Rol',
      render: (val) => <span className="text-sm text-gray-600">{ROLE_LABELS[val] || val}</span>,
    },
    { key: 'phone', label: 'Teléfono' },
    {
      key: 'status',
      label: 'Estado',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'joinDate',
      label: 'Inscripción',
      render: (val) => val ? new Date(val).toLocaleDateString('es-CL') : '—',
    },
  ];

  const headerActions = (
    <div className="flex items-center gap-2">
      <select
        value={filters.role}
        onChange={(e) => onFilterChange('role', e.target.value)}
        className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white"
      >
        <option value="all">Todos los roles</option>
        <option value="member">Alumnos</option>
        <option value="instructor">Instructores</option>
        <option value="admin">Admins</option>
      </select>
      <select
        value={filters.status}
        onChange={(e) => onFilterChange('status', e.target.value)}
        className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white"
      >
        <option value="all">Todos los estados</option>
        <option value="active">Activos</option>
        <option value="inactive">Inactivos</option>
        <option value="suspended">Suspendidos</option>
      </select>
      <Button variant="primary" size="sm" onClick={onCreate}>+ Nuevo Usuario</Button>
    </div>
  );

  const actions = (row) => (
    <div className="flex items-center gap-1">
      <button onClick={() => onView(row)} className="p-2 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-primary-600" title="Ver detalle">
        <FaEye size={14} />
      </button>
      <button onClick={() => onEdit(row)} className="p-2 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-primary-600" title="Editar">
        <FaEdit size={14} />
      </button>
      <button onClick={() => onToggleStatus(row.id)} className="p-2 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-amber-600" title="Cambiar estado">
        {row.status === 'active' ? <FaToggleOn size={14} className="text-green-500" /> : <FaToggleOff size={14} />}
      </button>
    </div>
  );

  return (
    <DataTable
      columns={columns}
      data={users}
      searchPlaceholder="Buscar usuario..."
      headerActions={headerActions}
      actions={actions}
      emptyMessage="No se encontraron usuarios."
    />
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  onToggleStatus: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default UsersTable;
