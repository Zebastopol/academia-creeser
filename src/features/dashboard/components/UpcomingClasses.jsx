import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCalendar } from 'react-icons/fa'
import BookingItem from './BookingItem'
import Button from '../../../shared/components/atoms/Button'

const UpcomingClasses = ({ classes }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="card p-6 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
          Próximas Clases
        </h2>
        <Link
          to="/agendar"
          className="font-medium transition-colors"
          style={{ color: 'var(--color-primary)' }}
        >
          Agendar Nueva
        </Link>
      </div>

      {classes.length > 0 ? (
        <div className="space-y-4">
          {classes.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FaCalendar className="text-6xl mx-auto mb-4" style={{ color: 'var(--color-text-faint)' }} />
          <p className="mb-4" style={{ color: 'var(--color-text-muted)' }}>
            No tienes clases agendadas
          </p>
          <Button to="/agendar" variant="primary">
            Agendar Primera Clase
          </Button>
        </div>
      )}
    </motion.div>
  )
}

export default UpcomingClasses
