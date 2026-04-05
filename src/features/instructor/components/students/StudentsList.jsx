import PropTypes from 'prop-types';
import { FaEye } from 'react-icons/fa';
import DataTable from '../../../../shared/components/molecules/DataTable';
import StatusBadge from '../../../../shared/components/molecules/StatusBadge';
import Button from '../../../../shared/components/atoms/Button';

const COLUMNS = [
  {
    key: 'name',
    label: 'Alumno',
    render: (row) => (
      <div className="flex items-center gap-3">
        <img src={row.avatar} alt={row.name} className="w-8 h-8 rounded-full object-cover" />
        <div>
          <p className="text-sm font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500">{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'belt',
    label: 'Cinturón',
    render: (row) => <span className="text-sm">{row.belt || 'Sin cinturón'}</span>,
  },
  {
    key: 'membership',
    label: 'Plan',
    render: (row) => <span className="text-sm text-gray-600">{row.membership || '—'}</span>,
  },
  {
    key: 'attendanceRate',
    label: 'Asistencia',
    sortable: true,
    render: (row) => (
      <StatusBadge
        status={row.attendanceRate >= 80 ? 'active' : row.attendanceRate >= 50 ? 'pending' : 'suspended'}
        label={`${row.attendanceRate}%`}
      />
    ),
  },
  {
    key: 'status',
    label: 'Estado',
    render: (row) => <StatusBadge status={row.status} />,
  },
];

/**
 * @param {{ students: Array, onViewStudent: function, classOptions: Array, selectedClassId: string, onChangeClass: function }} props
 */
const StudentsList = ({ students, onViewStudent, classOptions, selectedClassId, onChangeClass }) => {
  const actions = [
    {
      icon: <FaEye />,
      label: 'Ver Detalle',
      onClick: (row) => onViewStudent(row.id),
      className: 'text-primary-600 hover:text-primary-800',
    },
  ];

  const headerActions = (
    <div className="flex items-center gap-3">
      <select
        value={selectedClassId}
        onChange={(e) => onChangeClass(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      >
        {classOptions.map((c) => (
          <option key={c.id} value={String(c.id)}>{c.name} ({c.ageGroup})</option>
        ))}
      </select>
    </div>
  );

  return (
    <DataTable
      columns={COLUMNS}
      data={students}
      searchable
      pageSize={10}
      actions={actions}
      headerActions={headerActions}
      emptyMessage="No hay alumnos inscritos en esta clase."
    />
  );
};

StudentsList.propTypes = {
  students: PropTypes.array.isRequired,
  onViewStudent: PropTypes.func.isRequired,
  classOptions: PropTypes.array.isRequired,
  selectedClassId: PropTypes.string.isRequired,
  onChangeClass: PropTypes.func.isRequired,
};

export default StudentsList;
