import SectionHeading from '../../../shared/components/atoms/SectionHeading'
import EventCard from './EventCard'
import CTAButton from '../../../shared/components/atoms/CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import { useEvents } from '../../events/hooks/useEvents'

const EventsSection = () => {
  const { events, loading } = useEvents(4)

  if (loading) {
    return (
      <section className="snap-section flex items-center justify-center" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="loading-spinner" />
      </section>
    )
  }

  return (
    <section className="snap-section flex items-start" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container-custom py-20 md:py-12">
        <SectionHeading
          title="Próximos Eventos"
          subtitle="Participa en nuestros eventos especiales y seminarios"
          inverse
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <CTAButton to="/eventos" variant="ghost" size="md">
            Ver Todos los Eventos <FaArrowRight className="text-sm" />
          </CTAButton>
        </div>
      </div>
    </section>
  )
}

export default EventsSection
