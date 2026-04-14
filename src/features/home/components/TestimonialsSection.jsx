import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar } from 'react-icons/fa'
import SectionHeading from '../../../shared/components/atoms/SectionHeading'
import { useTestimonials } from '../../testimonials/hooks/useTestimonials'

const AUTOPLAY_INTERVAL = 2500

const TestimonialsSection = () => {
  const { testimonials, loading } = useTestimonials()
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const total = testimonials?.length || 0

  const next = useCallback(() => {
    if (total > 0) setCurrent((prev) => (prev + 1) % total)
  }, [total])

  useEffect(() => {
    if (paused || total === 0) return
    const timer = setInterval(next, AUTOPLAY_INTERVAL)
    return () => clearInterval(timer)
  }, [paused, next, total])

  if (loading || total === 0) {
    return (
      <section className="snap-section--tall flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="loading-spinner" />
      </section>
    )
  }

  const t = testimonials[current]

  return (
    <section
      className="snap-section--tall flex items-start"
      style={{ backgroundColor: 'var(--color-bg)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container-custom py-20 md:py-12">
        <SectionHeading
          title="Lo Que Dicen Nuestros Alumnos"
          subtitle="Historias reales de transformación y éxito"
          inverse
        />

        {/* Carousel */}
        <div className="max-w-2xl mx-auto text-center mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Avatar + info */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-16 h-16 rounded-full object-cover border-2"
                  style={{ borderColor: 'var(--color-primary)' }}
                  width={64}
                  height={64}
                  loading="lazy"
                />
                <div className="text-left">
                  <h4 className="font-bold" style={{ color: 'var(--color-text)' }}>
                    {t.name}
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--color-text-faint)' }}>
                    {t.role}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <FaStar key={i} className="text-gold-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="font-accent italic leading-relaxed"
                style={{
                  fontSize: 'var(--text-xl)',
                  color: 'var(--color-text-muted)',
                }}
              >
                &ldquo;{t.text}&rdquo;
              </blockquote>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-10" role="tablist" aria-label="Testimonios">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                role="tab"
                aria-selected={i === current}
                aria-label={`Testimonio ${i + 1}`}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === current ? 'var(--color-primary)' : 'var(--color-surface-offset)',
                  transform: i === current ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
