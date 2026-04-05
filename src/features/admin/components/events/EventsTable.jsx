import PropTypes from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DataTable from '../../../../shared/components/molecules/DataTable';
import Button from '../../../../shared/components/atoms/Button';

/**
 * @param {{ events: Array, onEdit: function, onDelete: function, onCreate: function }} props
 */
const EventsTable = ({ events, onEdit, onDelete, onCreate }) => {
  const columns = [
    { key: 'title', label: 'Título' },
    { key: 'category', label: 'Categoría' },
    {
      key: 'date',
      label: 'Fecha',
      render: (val) => val ? new Date(val).toLocaleDateString('es-CL') : '—',
    },
    { key: 'time', label: 'Hora' },
    { key: 'location', label: 'Ubicación' },
  ];

  const headerActions = (
    <Button variant="primary" size="sm" onClick={onCreate}>+ Nuevo Evento</Button>
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
      data={events}
      searchPlaceholder="Buscar evento..."
      headerActions={headerActions}
      actions={actions}
      emptyMessage="No hay eventos registrados."
    />
  );
};

EventsTable.propTypes = {
  events: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default EventsTable;
