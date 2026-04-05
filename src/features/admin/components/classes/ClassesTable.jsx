import PropTypes from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DataTable from '../../../../shared/components/molecules/DataTable';
import Button from '../../../../shared/components/atoms/Button';

/**
 * @param {{ classes: Array, onEdit: function, onDelete: function, onCreate: function }} props
 */
const ClassesTable = ({ classes, onEdit, onDelete, onCreate }) => {
  const columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'ageGroup', label: 'Grupo Etario' },
    {
      key: 'schedules',
      label: 'Horarios',
      sortable: false,
      render: (val) => (
        <div className="space-y-0.5">
          {(val || []).map((s, i) => (
            <p key={i} className="text-xs text-gray-500">{s.day} {s.time} - {s.location}</p>
          ))}
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Precio',
      render: (val) => `$${(val || 0).toLocaleString('es-CL')}`,
    },
  ];

  const headerActions = (
    <Button variant="primary" size="sm" onClick={onCreate}>+ Nueva Clase</Button>
  );

  const actions = (row) => (
    <div className="flex items-center gap-1">
      <button onClick={() => onEdit(row)} className="p-2 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-primary-600" title="Editar">
        <FaEdit size={14} />
      </button>
      <button onClick={() => onDelete(row)} className="p-2 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-red-600" title="Eliminar">
        <FaTrash size={14} />
      </button>
    </div>
  );

  return (
    <DataTable
      columns={columns}
      data={classes}
      searchPlaceholder="Buscar clase..."
      headerActions={headerActions}
      actions={actions}
      emptyMessage="No hay clases registradas."
    />
  );
};

ClassesTable.propTypes = {
  classes: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default ClassesTable;
