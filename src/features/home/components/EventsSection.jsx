import { FaArrowRight } from 'react-icons/fa';
import SectionHeading from '../../../shared/components/atoms/SectionHeading';
import EventCard from './EventCard';
import Button from '../../../shared/components/atoms/Button';
import { useEvents } from '../../events/hooks/useEvents';

const EventsSection = () => {
  const { events, loading } = useEvents(4);

  if (loading) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <SectionHeading
          title="Próximos Eventos"
          subtitle="Participa en nuestros eventos especiales y seminarios"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            to="/eventos"
            variant="primary"
            className="inline-flex items-center space-x-2"
          >
            <span>Ver Todos los Eventos</span>
            <FaArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
