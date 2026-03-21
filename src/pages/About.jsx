import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaQuoteLeft } from 'react-icons/fa';
import { academiaInfo, instructor } from '../shared/data/mockData';
import SEO from '../shared/components/common/SEO';
import Button from '../shared/components/atoms/Button';

const VALUE_ICONS = ['🤝', '💎', '🔥', '🧘', '🦁'];

const About = () => {
  return (
    <main className="min-h-screen">
      <SEO
        title="Nosotros"
        description={`Conoce la historia, misión, valores e instructor de ${academiaInfo.name}. Deporte con sentido.`}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-primary-900 via-primary-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gold-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-black text-white mb-4"
          >
            Sobre Nosotros
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto"
          >
            {academiaInfo.tagline} — Más que una academia de Taekwondo,
            somos un espacio donde creer, crecer y ser son una realidad.
          </motion.p>
        </div>
      </section>

      {/* Historia */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                Nuestra Historia
              </h2>
              <div className="relative pl-6 border-l-4 border-primary-600">
                <FaQuoteLeft className="absolute -left-4 -top-1 text-primary-600 bg-white p-1 text-2xl" />
                <p className="text-gray-600 text-lg leading-relaxed italic">
                  {academiaInfo.description}
                </p>
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
                alt="Academia Creeser"
                className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-soft"
            >
              <div className="w-14 h-14 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">Misión</h3>
              <p className="text-gray-600 leading-relaxed">{academiaInfo.mission}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-soft"
            >
              <div className="w-14 h-14 rounded-full bg-gold-400/20 text-gold-600 flex items-center justify-center mb-6">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">Visión</h3>
              <p className="text-gray-600 leading-relaxed">{academiaInfo.vision}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Los pilares del Taekwondo que guían todo lo que hacemos en Creeser.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {academiaInfo.values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="text-center p-6 bg-white rounded-xl border border-gray-100 shadow-soft hover:shadow-lg transition-shadow"
              >
                <span className="text-4xl mb-4 block">{VALUE_ICONS[idx]}</span>
                <h4 className="font-bold text-gray-900 mb-2">{value.name}</h4>
                <p className="text-sm text-gray-500">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-primary-950">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative mx-auto lg:mx-0"
            >
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-72 h-72 lg:w-80 lg:h-80 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-gold-400 text-gray-900 px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                {instructor.rank}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-2">
                {instructor.role}
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                {instructor.name}
              </h2>
              <p className="text-gray-400 mb-2">
                <span className="text-white font-medium">Especialidad:</span> {instructor.specialty}
              </p>
              <p className="text-gray-400 mb-6">
                <span className="text-white font-medium">Experiencia:</span> {instructor.experience}
              </p>
              <ul className="space-y-3">
                {instructor.background.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-gold-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sedes */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Nuestras Sedes
            </h2>
            <p className="text-gray-600 text-lg">
              Dos ubicaciones en Santiago para estar más cerca de ti.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {academiaInfo.locations.map((loc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-100 shadow-soft"
              >
                <div className="w-14 h-14 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Sede {loc.name}</h4>
                  <p className="text-gray-500">{loc.address}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-accent via-accent-hover to-red-700">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            ¿Quieres ser parte de la familia Creeser?
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
            Tu primera clase es gratis. Ven a conocernos y descubre lo que el Taekwondo puede hacer por ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/registro" className="bg-white text-accent hover:bg-gray-100" size="lg">
              Inscríbete Ahora
            </Button>
            <Button to="/contacto" variant="outline" className="border-white text-white hover:bg-white/10" size="lg">
              Agenda tu clase gratis
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
