import { motion } from 'framer-motion';
import Button from '../../../shared/components/atoms/Button';

const CTASection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
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
            <Button
              to="/registro"
              variant="accent"
              className="bg-white text-primary-600 hover:bg-gray-100"
            >
              Únete Ahora
            </Button>
            <Button
              to="/contacto"
              variant="secondary"
              className="border-white text-white hover:bg-white hover:text-primary-600"
            >
              Contáctanos
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
