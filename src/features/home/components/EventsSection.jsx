import SectionHeading from '../../../shared/components/atoms/SectionHeading'
import EventCard from './EventCard'
import CTAButton from '../../../shared/components/atoms/CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import { useEvents } from '../../events/hooks/useEvents'
import { images } from '../../../data/imageMap'

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
    <section className="snap-section relative flex items-start overflow-hidden grain-overlay">
      {/* Fondo con capa */}
      <div className="absolute inset-0 z-0">
        <img
          src={images.events.equipo}
          alt="Equipo Academia Creeser"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          loading="lazy"
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(to bottom, oklch(0.08 0.04 305 / 0.90), oklch(0.08 0.04 305 / 0.60) 60%, oklch(0.08 0.04 305 / 0.94))',
          }}
        />
      </div>
      <div className="container-custom relative z-20 py-12 md:py-8">
        <SectionHeading
          title="Próximos Eventos"
          subtitle="Participa en nuestras actividades especiales y seminarios"
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
