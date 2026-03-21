import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { events, academiaInfo } from '../shared/data/mockData';
import Button from '../shared/components/atoms/Button';
import SEO from '../shared/components/common/SEO';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTag, FaChevronLeft, FaPhone, FaEnvelope } from 'react-icons/fa';

const EventDetail = () => {
  const { id } = useParams();
  const event = events.find(e => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Evento no encontrado</h1>
          <p className="text-gray-600 mb-8">El evento que buscas no existe o ha sido eliminado.</p>
          <Button to="/eventos" variant="primary">Volver a Eventos</Button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString('es-CL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="min-h-screen pb-20">
      <SEO title={event.title} description={event.description} />

      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-black/30 to-transparent" />

        <div className="absolute top-24 left-0 right-0">
          <div className="container-custom">
            <Link
              to="/eventos"
              className="inline-flex items-center text-white bg-black/30 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/50 transition-all"
            >
              <FaChevronLeft className="mr-2" /> Volver a Eventos
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 py-12">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-accent text-white rounded-full text-sm font-bold mb-4">
                <FaTag className="text-xs" />
                {event.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-black text-gray-900">
                {event.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="container-custom mt-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Info principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Detalles del evento */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-creeser">
                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                  <FaCalendarAlt />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Fecha</p>
                  <p className="font-bold text-gray-900 text-sm capitalize">{formattedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-creeser">
                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                  <FaClock />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Horario</p>
                  <p className="font-bold text-gray-900 text-sm">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-creeser">
                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Lugar</p>
                  <p className="font-bold text-gray-900 text-sm">{event.location}</p>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sobre el evento</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {event.description}
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="bg-white p-8 rounded-creeser border border-gray-100 shadow-soft sticky top-24 space-y-6">
              <h3 className="text-xl font-bold text-gray-900">¿Te interesa participar?</h3>
              <p className="text-gray-600 text-sm">
                Contáctanos para reservar tu lugar o resolver cualquier duda sobre este evento.
              </p>

              <div className="space-y-3">
                <a
                  href={`tel:${academiaInfo.contact.phone}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaPhone className="text-primary-600" />
                  <span className="text-sm font-medium text-gray-700">{academiaInfo.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${academiaInfo.contact.email}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaEnvelope className="text-primary-600" />
                  <span className="text-sm font-medium text-gray-700">{academiaInfo.contact.email}</span>
                </a>
              </div>

              <Button to="/contacto" className="w-full" variant="primary">
                Escríbenos
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default EventDetail;
