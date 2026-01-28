import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-800/80 to-accent-900/90 z-10" />
        <img
          src="https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1920&q=80"
          alt="Taekwondo Training"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-accent-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium">
              🥋 Más de 20 años formando campeones
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-6 leading-tight"
          >
            Descubre el Poder del
            <span className="block bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Taekwondo
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
          >
            Únete a la familia Creeser y transforma tu vida a través de la disciplina, 
            el respeto y la excelencia del arte marcial coreano.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-8 mb-10"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-1">500+</div>
              <div className="text-sm text-gray-300">Alumnos Activos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-1">20+</div>
              <div className="text-sm text-gray-300">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-1">50+</div>
              <div className="text-sm text-gray-300">Campeonatos Ganados</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/registro"
              className="btn-accent text-lg px-8 py-4 group"
            >
              Únete Ahora
              <span className="ml-2 group-hover:ml-3 transition-all duration-300">→</span>
            </Link>
            <Link
              to="/clases"
              className="btn-secondary text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary-600"
            >
              Ver Clases
            </Link>
            <button className="flex items-center space-x-2 text-white hover:text-gold-400 transition-colors duration-300 group">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                <FaPlay className="ml-1" />
              </div>
              <span className="font-medium">Ver Video</span>
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm"
          >
            <div className="flex items-center space-x-2">
              <span className="text-gold-400">✓</span>
              <span>Instructores Certificados</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gold-400">✓</span>
              <span>Instalaciones Modernas</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gold-400">✓</span>
              <span>Clases para Todas las Edades</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
