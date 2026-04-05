import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { adminService } from '../../services/adminService';
import StatusBadge from '../../../../shared/components/molecules/StatusBadge';

/**
 * @param {{ userId: number }} props
 */
const StudentMetrics = ({ userId }) => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    if (!userId) return;
    adminService.getStudentMetrics(userId).then(setMetrics);
  }, [userId]);

  if (!metrics) return <p className="text-sm text-gray-400">Cargando métricas...</p>;

  const items = [
    { label: 'Clases Agendadas', value: metrics.confirmedBookings },
    { label: 'Horas Acumuladas', value: metrics.totalHours },
    { label: 'Cancelaciones', value: metrics.cancelledBookings },
    { label: 'Asistencia', value: `${metrics.attendanceRate}%` },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {items.map((it) => (
          <div key={it.label} className="p-3 rounded-lg bg-gray-50">
            <p className="text-xs text-gray-500">{it.label}</p>
            <p className="text-lg font-bold text-gray-900">{it.value}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Estado de asistencia:</span>
        <StatusBadge status={metrics.attendanceRate >= 80 ? 'active' : metrics.attendanceRate >= 50 ? 'pending' : 'suspended'}
          label={metrics.attendanceRate >= 80 ? 'Excelente' : metrics.attendanceRate >= 50 ? 'Regular' : 'Bajo'} />
      </div>
    </div>
  );
};

StudentMetrics.propTypes = {
  userId: PropTypes.number,
};

export default StudentMetrics;
