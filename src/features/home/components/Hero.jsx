import { motion } from 'framer-motion';
import Button from '../../../shared/components/atoms/Button';
import { academiaInfo } from '../../../shared/data/mockData';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-dynamic-main/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1920&q=80"
          alt="Taekwondo Academia Creeser"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container-custom text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center w-full h-full" // Añadido para centrar el contenido
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-1.5 bg-dynamic-main/20 backdrop-blur-md border border-dynamic-main/30 rounded-full text-dynamic-light text-sm font-bold uppercase tracking-wider">
              ✨ {academiaInfo.tagline}
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-tight text-center">
            {academiaInfo.name}
            <span className="block text-dynamic-main mt-2">
              Creer, Crecer y Ser
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed text-center">
            {academiaInfo.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              to="/registro"
              className="bg-dynamic-main hover:bg-dynamic-dark text-white px-8 py-4 text-lg shadow-xl shadow-dynamic-main/20"
            >
              Comenzar Ahora
            </Button>
            <Button
              to="/clases"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
            >
              Ver Clases
            </Button>
          </div>
        </motion.div>

  
      </div>
    </section>
  );
};

export default Hero;
