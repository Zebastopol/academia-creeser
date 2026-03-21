import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaMapMarkerAlt } from 'react-icons/fa';
import { useClasses } from '../features/classes/hooks/useClasses';
import { academiaInfo } from '../shared/data/mockData';
import ClassCard from '../features/home/components/ClassCard';
import SectionHeading from '../shared/components/atoms/SectionHeading';
import SEO from '../shared/components/common/SEO';
import Button from '../shared/components/atoms/Button';

const LOCATIONS = ['Todas', ...academiaInfo.locations.map(l => l.name)];

const Classes = () => {
  const { classes, loading, error } = useClasses();
  const [activeLocation, setActiveLocation] = useState('Todas');

  const filteredClasses = useMemo(() => {
    if (activeLocation === 'Todas') return classes;
    return classes.filter(c =>
      c.schedules.some(s => s.location === activeLocation)
    );
  }, [classes, activeLocation]);

  return (
    <main className="min-h-screen">
      <SEO
        title="Nuestras Clases"
        description="Descubre los programas de Taekwondo de Academia Creeser para todas las edades: Baby, Kids, Cadetes y Adultos."
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-black text-white mb-4"
          >
            Nuestros Programas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto"
          >
            Clases diseñadas para cada etapa de desarrollo, desde los 3 años hasta adultos.
            Metodología comprensiva que forma personas, no solo deportistas.
          </motion.p>
        </div>
      </section>

      {/* Filtros + Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          {/* Filtro por sede */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            <FaFilter className="text-gray-400 mr-2" />
            {LOCATIONS.map(loc => (
              <button
                key={loc}
                onClick={() => setActiveLocation(loc)}
                className={`
                  flex items-center gap-2
                  px-5 py-2.5
                  text-sm font-semibold
                  rounded-full border-2 transition-all duration-300
                  ${activeLocation === loc
                    ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-600/20'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300 hover:text-primary-600'
                  }
                `}
              >
                {loc !== 'Todas' && <FaMapMarkerAlt className="text-xs" />}
                {loc}
              </button>
            ))}
          </motion.div>

          {/* Estado de carga */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-center text-red-500 py-12">
              Error al cargar las clases. Intenta de nuevo más tarde.
            </p>
          )}

          {/* Grid de clases */}
          {!loading && !error && (
            <>
              {filteredClasses.length === 0 ? (
                <p className="text-center text-gray-500 py-12 text-lg">
                  No hay clases disponibles en la sede seleccionada.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredClasses.map((classItem, index) => (
                    <ClassCard key={classItem.id} classItem={classItem} index={index} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Metodología */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                Nuestra Metodología
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {academiaInfo.description}
              </p>
              <div className="space-y-4">
                {academiaInfo.values.slice(0, 3).map((value, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-gray-900">{value.name}</h4>
                      <p className="text-sm text-gray-500">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&q=80"
                alt="Metodología Creeser"
                className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                <p className="text-sm font-medium text-gray-600">Nuestro lema</p>
                <p className="text-xl font-display font-bold gradient-text">
                  "Creer, Crecer y Ser"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
            Agenda tu clase de prueba gratuita y descubre por qué somos la academia con sentido.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/registro" className="bg-white text-primary-700 hover:bg-gray-100" size="lg">
              Inscríbete Ahora
            </Button>
            <Button to="/contacto" variant="outline" className="border-white text-white hover:bg-white/10" size="lg">
              Contáctanos
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Classes;
