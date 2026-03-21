import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaInstagram, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useContactForm } from '../features/contact/hooks/useContactForm';
import ContactForm from '../features/contact/components/ContactForm';
import { academiaInfo } from '../shared/data/mockData';
import SEO from '../shared/components/common/SEO';

const CONTACT_ITEMS = [
  {
    icon: <FaPhone />,
    label: 'Teléfono',
    value: academiaInfo.contact.phone,
    href: `tel:${academiaInfo.contact.phone}`,
  },
  {
    icon: <FaEnvelope />,
    label: 'Email',
    value: academiaInfo.contact.email,
    href: `mailto:${academiaInfo.contact.email}`,
  },
  {
    icon: <FaInstagram />,
    label: 'Instagram',
    value: academiaInfo.contact.instagram,
    href: academiaInfo.contact.instagramUrl,
    external: true,
  },
  {
    icon: <FaClock />,
    label: 'Disponibilidad',
    value: academiaInfo.contact.availability,
  },
];

const Contact = () => {
  const { formData, errors, isLoading, handleChange, handleSubmit } = useContactForm();

  return (
    <main className="min-h-screen">
      <SEO
        title="Contacto"
        description="¿Tienes dudas? Escríbenos o visita nuestras sedes en La Reina y Ñuñoa. Estamos aquí para ayudarte."
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-400 rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-black text-white mb-4"
          >
            Contáctanos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto"
          >
            ¿Tienes dudas sobre nuestras clases, horarios o precios?
            Estamos aquí para ayudarte.
          </motion.p>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-white p-8 rounded-2xl border border-gray-100 shadow-soft"
            >
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                Envíanos un mensaje
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Completa el formulario y te responderemos lo antes posible.
              </p>
              <ContactForm
                formData={formData}
                errors={errors}
                isLoading={isLoading}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </motion.div>

            {/* Panel de información */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Datos de contacto */}
              <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Información de contacto</h3>
                {CONTACT_ITEMS.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                          className="text-sm font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sedes */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Nuestras Sedes</h3>
                <div className="space-y-4">
                  {academiaInfo.locations.map((loc, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-gray-900">Sede {loc.name}</p>
                        <p className="text-sm text-gray-500">{loc.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instagram CTA */}
              <a
                href={academiaInfo.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl text-white text-center hover:shadow-lg transition-shadow"
              >
                <FaInstagram className="text-3xl mx-auto mb-3" />
                <p className="font-bold text-lg">Síguenos en Instagram</p>
                <p className="text-sm text-white/80">{academiaInfo.contact.instagram}</p>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
