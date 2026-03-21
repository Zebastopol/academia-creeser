import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaChevronDown, FaUsers, FaCalendarCheck, FaMedal, FaHandshake } from 'react-icons/fa';
import { useMemberships } from '../features/memberships/hooks/useMemberships';
import MembershipCard from '../features/home/components/MembershipCard';
import SEO from '../shared/components/common/SEO';
import Button from '../shared/components/atoms/Button';

const BENEFITS = [
  { icon: <FaCalendarCheck className="text-2xl" />, title: "Clase de prueba gratis", description: "Ven a conocernos sin compromiso antes de inscribirte." },
  { icon: <FaUsers className="text-2xl" />, title: "Descuento familiar 20%", description: "Inscribe a más de un integrante de tu familia y ahorra." },
  { icon: <FaMedal className="text-2xl" />, title: "Acceso a eventos", description: "Participa en encuentros, seminarios y celebraciones del club." },
  { icon: <FaHandshake className="text-2xl" />, title: "Seguimiento personalizado", description: "El profesor Rodrigo acompaña el progreso de cada alumno." },
];

const MEMBERSHIP_FAQ = [
  { q: "¿Cuándo se paga la mensualidad?", a: "La mensualidad se paga los primeros 5 días de cada mes. Si pagas en ese período, accedes al precio promocional en el plan de 2 veces por semana." },
  { q: "¿La matrícula es obligatoria?", a: "Sí, la matrícula anual de $12.000 es un pago único que cubre el año completo y es requisito para la inscripción." },
  { q: "¿Puedo cambiar de plan?", a: "Por supuesto. Puedes cambiar entre el plan de 1 vez y 2 veces por semana al inicio de cada mes." },
  { q: "¿Qué pasa si falto a una clase?", a: "Las clases no son recuperables de forma automática, pero puedes coordinar con el profesor para buscar una alternativa dentro del mismo mes." },
  { q: "¿Puedo congelar mi membresía?", a: "Sí, consulta directamente con la academia para evaluar opciones de congelamiento temporal." },
];

const Memberships = () => {
  const { memberships, loading, error } = useMemberships();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <main className="min-h-screen">
      <SEO
        title="Membresías"
        description="Conoce los planes de membresía de Academia Creeser. Opciones flexibles para todos los presupuestos con descuentos familiares."
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-950 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400 rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-black text-white mb-4"
          >
            Planes de Membresía
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Elige el plan que mejor se ajuste a tu rutina.
            Todos incluyen nuestra metodología comprensiva y acompañamiento personalizado.
          </motion.p>
        </div>
      </section>

      {/* Planes */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          {loading && (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
            </div>
          )}

          {error && (
            <p className="text-center text-red-500 py-12">
              Error al cargar los planes. Intenta de nuevo más tarde.
            </p>
          )}

          {!loading && !error && (
            <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8 max-w-3xl mx-auto">
              {memberships.map((plan, index) => (
                <div key={plan.id} className="w-full md:w-1/2">
                  <MembershipCard plan={plan} index={index} />
                </div>
              ))}
            </div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-gray-500 mt-8"
          >
            Matrícula anual: $12.000 (pago único). Todos los precios en pesos chilenos.
          </motion.p>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Beneficios de ser parte de Creeser
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Más que una academia, somos una comunidad que acompaña el crecimiento integral.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 bg-white rounded-xl border border-gray-100 shadow-soft"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-500">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ de Membresías */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Preguntas sobre los planes
            </h2>
          </div>
          <div className="space-y-3">
            {MEMBERSHIP_FAQ.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex items-center justify-between w-full p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{item.q}</span>
                  <FaChevronDown
                    className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-gray-600 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            ¿Tienes más dudas?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
            Escríbenos y te ayudamos a elegir el plan perfecto para ti o tu familia.
          </p>
          <Button to="/contacto" className="bg-white text-primary-700 hover:bg-gray-100" size="lg">
            Contáctanos
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Memberships;
