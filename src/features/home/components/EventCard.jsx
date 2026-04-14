import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const STATUS_STYLES = {
  open: { label: 'Inscripciones abiertas', color: 'var(--color-success, #34d399)' },
  soon: { label: 'Pronto', color: 'var(--color-warning, #fbbf24)' },
  closed: { label: 'Cerrado', color: 'var(--color-text-faint)' },
}

function getEventStatus(event) {
  const eventDate = new Date(event.date)
  const now = new Date()
  const daysUntil = (eventDate - now) / (1000 * 60 * 60 * 24)
  if (daysUntil < 0) return 'closed'
  if (daysUntil < 7) return 'soon'
  return 'open'
}

/**
 * @param {{ event: object, index: number }} props
 */
const EventCard = ({ event, index }) => {
  const status = getEventStatus(event)
  const { label, color } = STATUS_STYLES[status]
  const eventDate = new Date(event.date)
  const day = eventDate.getDate()
  const month = eventDate.toLocaleDateString('es-CL', { month: 'short' }).toUpperCase()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ backgroundColor: 'var(--color-surface-offset)' }}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          width={400}
          height={160}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Date badge */}
        <div
          className="absolute bottom-3 left-3 flex flex-col items-center px-3 py-2 rounded-lg"
          style={{ backgroundColor: 'var(--color-surface-offset)' }}
        >
          <span
            className="font-display font-black leading-none"
            style={{ fontSize: 'var(--text-xl)', color: 'var(--color-accent)' }}
          >
            {day}
          </span>
          <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
            {month}
          </span>
        </div>

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span
            className="px-2.5 py-1 text-xs font-semibold rounded-full"
            style={{ backgroundColor: color, color: '#0a080c' }}
          >
            {label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        <h3
          className="font-bold mb-2 line-clamp-2"
          style={{ color: 'var(--color-text)', fontSize: 'var(--text-base)' }}
        >
          {event.title}
        </h3>
        <p className="text-sm line-clamp-2 flex-grow" style={{ color: 'var(--color-text-muted)' }}>
          {event.description}
        </p>

        {/* Hover reveal: button */}
        <div className="overflow-hidden max-h-0 group-hover:max-h-16 transition-all duration-500">
          <Link
            to={`/eventos/${event.id}`}
            className="inline-block mt-3 text-sm font-semibold transition-colors"
            style={{ color: 'var(--color-accent)' }}
          >
            Ver detalle →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default EventCard
