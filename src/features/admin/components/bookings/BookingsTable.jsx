import PropTypes from 'prop-types';
import { FaEdit, FaBan } from 'react-icons/fa';
import DataTable from '../../../../shared/components/molecules/DataTable';
import StatusBadge from '../../../../shared/components/molecules/StatusBadge';
import { adminService } from '../../services/adminService';

/**
 * @param {{ bookings: Array, onEdit: function, onCancel: function, filters: object, onFilterChange: function }} props
 */
const BookingsTable = ({ bookings, onEdit, onCancel, filters, onFilterChange }) => {
  const classOptions = adminService.getClassOptions();

  const columns = [
    { key: 'userName', label: 'Alumno' },
    { key: 'className', label: 'Clase' },
    {
      key: 'date',
      label: 'Fecha',
      render: (val) => val ? new Date(val).toLocaleDateString('es-CL') : '—',
    },
    { key: 'time', label: 'Hora' },
    { key: 'location', label: 'Sede' },
    {
      key: 'status',
      label: 'Estado',
      render: (val) => <StatusBadge status={val} />,
    },
  ];

  const headerActions = (
    <div className="flex items-center gap-2">
      <select
        value={filters.status}
        onChange={(e) => onFilterChange('status', e.target.value)}
        className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white"
      >
        <option value="all">Todos los estados</option>
        <option value="confirmed">Confirmadas</option>
        <option value="cancelled">Canceladas</option>
      </select>
      <select
        value={filters.classId}
        onChange={(e) => onFilterChange('classId', e.target.value)}
        className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white"
      >
        <option value="all">Todas las clases</option>
        {classOptions.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
    </div>
  );

  const actions = (row) => (
    <div className="flex items-center gap-1">
      <button onClick={() => onEdit(row)} className="p-2 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-primary-600" title="Editar">
        <FaEdit size={14} />
      </button>
      {row.status !== 'cancelled' && (
        <button onClick={() => onCancel(row)} className="p-2 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-red-600" title="Cancelar">
          <FaBan size={14} />
        </button>
      )}
    </div>
  );

  return (
    <DataTable
      columns={columns}
      data={bookings}
      searchPlaceholder="Buscar por alumno o clase..."
      headerActions={headerActions}
      actions={actions}
      emptyMessage="No hay reservas para mostrar."
    />
  );
};

BookingsTable.propTypes = {
  bookings: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default BookingsTable;
