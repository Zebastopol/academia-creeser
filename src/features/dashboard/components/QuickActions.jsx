import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCalendar, FaUser, FaTrophy } from 'react-icons/fa'

const ACTIONS = [
  {
    to: '/agendar',
    icon: <FaCalendar />,
    label: 'Agendar Clase',
    iconColor: 'var(--color-primary)',
    bg: 'oklch(0.45 0.15 305 / 0.08)',
  },
  {
    to: '/perfil',
    icon: <FaUser />,
    label: 'Mi Perfil',
    iconColor: 'var(--color-text-muted)',
    bg: 'var(--color-surface-2)',
  },
  {
    to: '/membresias',
    icon: <FaTrophy />,
    label: 'Mejorar Plan',
    iconColor: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.08)',
  },
]

const QuickActions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="card p-6"
    >
      <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
        Acciones Rápidas
      </h2>
      <div className="space-y-3">
        {ACTIONS.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:translate-x-1"
            style={{ backgroundColor: action.bg }}
          >
            <span style={{ color: action.iconColor }}>{action.icon}</span>
            <span className="font-medium" style={{ color: 'var(--color-text)' }}>
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

export default QuickActions
