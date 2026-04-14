import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'
import CTAButton from '../../../shared/components/atoms/CTAButton'
import { academiaInfo } from '../../../shared/data/mockData'
import { useCounterAnimation, scrollToSection } from '../../../shared/hooks/useScrollTrigger'

const Hero = () => {
  const counterRef = useRef(null)

  useCounterAnimation(counterRef, 350, {
    suffix: '+',
    scroller: '.page-scroll-container',
  })

  return (
    <section className="snap-section relative flex items-start justify-center overflow-hidden grain-overlay">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(to bottom, oklch(0.08 0.04 305 / 0.85), oklch(0.08 0.04 305 / 0.5) 50%, oklch(0.08 0.04 305 / 0.9))',
          }}
        />
        <img
          src="/portada_1920_small_650.webp"
          alt="Práctica de Taekwondo en la Academia Creeser"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          loading="eager"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container-custom text-center px-4 pt-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center max-w-3xl mx-auto"
        >
          {/* Tagline badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block px-5 py-2 mb-8
              text-sm font-semibold uppercase tracking-widest
              bg-primary-600/20 backdrop-blur-md border border-primary-400/30 rounded-full"
            style={{ color: 'var(--color-text)' }}
          >
            {academiaInfo.tagline}
          </motion.span>

          {/* Headline */}
          <h1
            className="mb-4 font-display font-black leading-none"
            style={{ fontSize: 'var(--text-hero)', color: 'var(--color-text)' }}
          >
            {academiaInfo.name}
          </h1>
          <p
            className="font-display font-black leading-none mb-6"
            style={{ fontSize: 'var(--text-3xl)' }}
          >
            <span style={{ color: 'var(--color-hero-creer)' }}>Creer</span>
            {', '}
            <span style={{ color: 'var(--color-primary-active)' }}>Crecer</span>
            {' y '}
            <span style={{ color: 'var(--color-accent)' }}>Ser</span>
          </p>

          {/* Subheadline */}
          <p
            className="max-w-xl mb-10 leading-relaxed"
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-text-muted)',
            }}
          >
            {academiaInfo.description}
          </p>

          {/* CTA-1 + Secondary */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <CTAButton to="/agendar" variant="primary" size="lg" shimmer glow>
              Agenda tu 1ª clase gratis
            </CTAButton>
            <CTAButton to="/clases" variant="outline" size="lg">
              Ver Clases
            </CTAButton>
          </div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex items-center gap-2"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <span
              ref={counterRef}
              className="font-display font-black"
              style={{
                fontSize: 'var(--text-2xl)',
                color: 'var(--color-accent)',
              }}
            >
              0
            </span>
            <span className="text-sm uppercase tracking-wider">
              Alumnos activos
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection(1)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce"
        style={{ color: 'var(--color-text-faint)' }}
        aria-label="Ir a la siguiente sección"
      >
        <span className="text-xs uppercase tracking-widest">Descubre más</span>
        <FaChevronDown className="text-lg" />
      </button>
    </section>
  )
}

export default Hero
