import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar, FaCalendar, FaUsers, FaTrophy } from 'react-icons/fa';
import Hero from '../components/common/Hero';
import { classes, memberships, testimonials, events } from '../data/mockData';

const Home = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="section-title">¿Por Qué Elegir Creeser?</h2>
            <p className="section-subtitle">
              Somos más que un club deportivo, somos una familia comprometida con tu desarrollo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaUsers className="text-4xl" />,
                title: "Instructores Certificados",
                description: "Maestros con más de 20 años de experiencia y certificaciones internacionales"
              },
              {
                icon: <FaTrophy className="text-4xl" />,
                title: "Resultados Comprobados",
                description: "Más de 50 campeonatos ganados por nuestros alumnos a nivel nacional"
              },
              {
                icon: <FaCalendar className="text-4xl" />,
                title: "Horarios Flexibles",
                description: "Clases todos los días con horarios adaptados a tu rutina"
              },
              {
                icon: <FaStar className="text-4xl" />,
                title: "Instalaciones Modernas",
                description: "Equipamiento de última generación y espacios amplios y seguros"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="card p-8 text-center group"
              >
                <div className="inline-block p-4 bg-primary-100 text-primary-600 rounded-full mb-4 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="section-title">Nuestras Clases</h2>
            <p className="section-subtitle">
              Programas diseñados para cada edad y nivel de experiencia
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {classes.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="card overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={classItem.image}
                    alt={classItem.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-3 py-1 bg-primary-600 text-white text-xs rounded-full">
                      {classItem.ageGroup}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{classItem.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {classItem.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">{classItem.duration}</span>
                    <span className="text-lg font-bold text-primary-600">
                      ${classItem.price.toLocaleString()}
                    </span>
                  </div>
                  <Link
                    to={`/clases/${classItem.id}`}
                    className="block text-center btn-primary w-full"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeInUp}
            className="text-center mt-12"
          >
            <Link to="/clases" className="btn-secondary inline-flex items-center space-x-2">
              <span>Ver Todas las Clases</span>
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Memberships Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Planes de Membresía
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a tus objetivos y estilo de vida
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {memberships.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative bg-white text-gray-900 rounded-2xl p-8 ${
                  plan.popular ? 'ring-4 ring-gold-400 transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-gold-400 text-gray-900 text-sm font-bold rounded-full">
                      MÁS POPULAR
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">${plan.price.toLocaleString()}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/registro"
                  className={`block text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Comenzar Ahora
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="section-title">Lo Que Dicen Nuestros Alumnos</h2>
            <p className="section-subtitle">
              Historias reales de transformación y éxito
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="card p-6"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-gold-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="section-title">Próximos Eventos</h2>
            <p className="section-subtitle">
              Participa en nuestros eventos especiales y seminarios
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {events.slice(0, 4).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="card overflow-hidden"
              >
                <div className="relative h-40">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-accent-600 text-white text-xs rounded-full">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold mb-2 line-clamp-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    📅 {new Date(event.date).toLocaleDateString('es-CL')}
                  </p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <Link
                    to={`/eventos/${event.id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1"
                  >
                    <span>Más información</span>
                    <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeInUp}
            className="text-center mt-12"
          >
            <Link to="/eventos" className="btn-primary inline-flex items-center space-x-2">
              <span>Ver Todos los Eventos</span>
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container-custom text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              ¿Listo para Comenzar tu Viaje?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Únete a cientos de personas que ya están transformando sus vidas con Taekwondo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/registro" className="btn-accent bg-white text-primary-600 hover:bg-gray-100">
                Únete Ahora
              </Link>
              <Link to="/contacto" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600">
                Contáctanos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
