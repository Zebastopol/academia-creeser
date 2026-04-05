import PropTypes from 'prop-types';
import { FaUsers, FaUserCheck, FaChalkboardTeacher, FaCalendarCheck, FaMoneyBillWave, FaEnvelope } from 'react-icons/fa';
import AdminKPICard from './AdminKPICard';

const formatCLP = (n) => `$${n.toLocaleString('es-CL')}`;

/**
 * @param {{ kpis: object }} props
 */
const AdminKPIGrid = ({ kpis }) => {
  if (!kpis) return null;

  const cards = [
    { title: 'Total Usuarios',      value: kpis.totalUsers,     icon: <FaUsers size={20} />,             color: 'blue' },
    { title: 'Alumnos Activos',     value: kpis.activeMembers,  icon: <FaUserCheck size={20} />,         color: 'green' },
    { title: 'Clases Activas',      value: kpis.totalClasses,   icon: <FaChalkboardTeacher size={20} />, color: 'purple' },
    { title: 'Reservas del Mes',    value: kpis.monthBookings,  icon: <FaCalendarCheck size={20} />,     color: 'cyan',   subtitle: `${kpis.totalBookings} totales` },
    { title: 'Ingresos del Mes',    value: formatCLP(kpis.monthRevenue), icon: <FaMoneyBillWave size={20} />, color: 'amber', subtitle: `Proyectado: ${formatCLP(kpis.projectedRevenue)}` },
    { title: 'Contactos Pendientes',value: kpis.pendingContacts, icon: <FaEnvelope size={20} />,          color: 'red' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <AdminKPICard key={c.title} {...c} />
      ))}
    </div>
  );
};

AdminKPIGrid.propTypes = {
  kpis: PropTypes.object,
};

export default AdminKPIGrid;
