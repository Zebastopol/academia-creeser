import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaTrophy } from 'react-icons/fa';

const QuickActions = () => {
  const actions = [
    {
      to: "/agendar",
      icon: <FaCalendar className="text-primary-600" />,
      label: "Agendar Clase",
      bg: "bg-primary-50 hover:bg-primary-100"
    },
    {
      to: "/perfil",
      icon: <FaUser className="text-gray-600" />,
      label: "Mi Perfil",
      bg: "bg-gray-50 hover:bg-gray-100"
    },
    {
      to: "/membresias",
      icon: <FaTrophy className="text-gold-600" />,
      label: "Mejorar Plan",
      bg: "bg-gold-50 hover:bg-gold-100"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="card p-6"
    >
      <h2 className="text-xl font-bold mb-4">Acciones Rápidas</h2>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.to}
            className={`block p-3 rounded-lg transition-colors ${action.bg}`}
          >
            <div className="flex items-center space-x-3">
              {action.icon}
              <span className="font-medium text-gray-900">{action.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;
