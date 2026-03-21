import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';
import { useEvents } from '../features/events/hooks/useEvents';
import EventCard from '../features/home/components/EventCard';
import SEO from '../shared/components/common/SEO';
import Button from '../shared/components/atoms/Button';

const Events = () => {
  const { events, loading, error } = useEvents();

  return (
    <main className="min-h-screen">
      <SEO
        title="Eventos"
        description="Calendario de seminarios, competencias, encuentros y actividades especiales de la Academia Creeser."
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-accent/90 via-accent to-red-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-400 rounded-full -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6"
          >
            <FaCalendarAlt />
            <span>Calendario de actividades</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-black text-white mb-4"
          >
            Próximos Eventos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto"
          >
            Seminarios, encuentros inter-academias, celebraciones y más.
            Actividades que fortalecen nuestra comunidad.
          </motion.p>
        </div>
      </section>

      {/* Listado de Eventos */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          {loading && (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
            </div>
          )}

          {error && (
            <p className="text-center text-red-500 py-12">
              Error al cargar los eventos. Intenta de nuevo más tarde.
            </p>
          )}

          {!loading && !error && (
            <>
              {events.length === 0 ? (
                <div className="text-center py-20">
                  <FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">No hay eventos próximos</h3>
                  <p className="text-gray-500 mb-8">
                    Estamos preparando nuevas actividades. ¡Mantente atento a nuestras redes!
                  </p>
                  <Button to="/contacto" variant="primary">
                    Contáctanos para más info
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {events.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            ¿Quieres participar?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Síguenos en Instagram para enterarte de todos nuestros eventos y novedades.
          </p>
          <a
            href="https://www.instagram.com/creesertkd/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            Síguenos en Instagram
          </a>
        </div>
      </section>
    </main>
  );
};

export default Events;
