import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import CTAButton from '../../../shared/components/atoms/CTAButton'
import { toast } from 'react-toastify'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

const CTASection = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('¡Gracias! Te contactaremos pronto.')
    setForm({ name: '', email: '', phone: '' })
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section
      className="snap-section relative flex items-start grain-overlay overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, oklch(0.45 0.15 305 / 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 container-custom py-20 md:py-12 text-center">
        <motion.div {...fadeInUp} className="max-w-2xl mx-auto">
          {/* Headline */}
          <h2
            className="font-display font-black mb-4"
            style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-text)' }}
          >
            El primer paso es el más importante
          </h2>
          <p
            className="mb-10 max-w-lg mx-auto"
            style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)' }}
          >
            Únete a cientos de personas que ya están transformando sus vidas a través del Taekwondo
          </p>

          {/* Mini form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-10">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
                className="w-full px-4 py-3 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--color-surface-offset)',
                  color: 'var(--color-text)',
                  borderColor: 'transparent',
                }}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
                className="w-full px-4 py-3 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--color-surface-offset)',
                  color: 'var(--color-text)',
                }}
              />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+56 9 1234 5678"
                className="w-full px-4 py-3 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--color-surface-offset)',
                  color: 'var(--color-text)',
                }}
              />
            </div>

            {/* 3 CTAs in visual hierarchy */}
            <div className="flex flex-col gap-3 mt-6">
              <CTAButton type="submit" variant="primary" size="lg" shimmer glow className="w-full">
                Agenda tu 1ª clase gratis
              </CTAButton>
              <CTAButton to="/registro" variant="outline" size="md" className="w-full">
                Crea tu cuenta gratis
              </CTAButton>
              <CTAButton to="/membresias" variant="ghost" size="sm" className="w-full">
                Ver planes y suscribirte <FaArrowRight className="text-xs" />
              </CTAButton>
            </div>
          </form>

          {/* Social proof */}
          <p className="text-sm" style={{ color: 'var(--color-text-faint)' }}>
            Más de <strong style={{ color: 'var(--color-accent)' }}>350 alumnos</strong> ya comenzaron su camino
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
