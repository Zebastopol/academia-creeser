import { FaCreditCard, FaUniversity, FaQuestionCircle } from 'react-icons/fa';
import DataTable from '../../../shared/components/molecules/DataTable';
import StatusBadge from '../../../shared/components/molecules/StatusBadge';
import useCheckoutHistory from '../hooks/useCheckoutHistory';

const METHOD_ICONS = {
  transfer: <FaUniversity className="text-blue-500" />,
  card: <FaCreditCard className="text-purple-500" />,
};

const METHOD_LABELS = {
  transfer: 'Transferencia',
  card: 'Tarjeta',
};

const COLUMNS = [
  {
    key: 'monthLabel',
    label: 'Mes',
    sortable: true,
    render: (val, row) => (
      <span className="font-medium text-gray-900">
        {val} {row.year}
      </span>
    ),
  },
  {
    key: 'amount',
    label: 'Monto',
    sortable: true,
    render: (val) => (
      <span className="font-semibold text-gray-800">
        ${val.toLocaleString('es-CL')}
      </span>
    ),
  },
  {
    key: 'method',
    label: 'Método',
    render: (val) => (
      <span className="flex items-center gap-1.5 text-sm">
        {METHOD_ICONS[val] || <FaQuestionCircle className="text-gray-300" />}
        {METHOD_LABELS[val] || 'Desconocido'}
      </span>
    ),
  },
  {
    key: 'status',
    label: 'Estado',
    render: (val) => <StatusBadge status={val} />,
  },
  {
    key: 'paidAt',
    label: 'Fecha',
    sortable: true,
    render: (val) =>
      val
        ? new Date(val).toLocaleDateString('es-CL', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        : '—',
  },
];

const CheckoutHistoryList = () => {
  const { payments, loading } = useCheckoutHistory();

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Historial de Pagos</h3>
      <DataTable
        columns={COLUMNS}
        data={payments}
        searchable={false}
        pageSize={6}
        emptyMessage="Aún no tienes pagos registrados."
      />
    </div>
  );
};

export default CheckoutHistoryList;
