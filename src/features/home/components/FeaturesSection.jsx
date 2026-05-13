import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCalendar, FaStar, FaTrophy, FaUsers } from 'react-icons/fa'
import SectionHeading from '../../../shared/components/atoms/SectionHeading'
import CTAButton from '../../../shared/components/atoms/CTAButton'
import { useCounterAnimation } from '../../../shared/hooks/useScrollTrigger'
import { cn } from '../../../shared/utils/cn'

const AUTOPLAY_INTERVAL = 5000

const FEATURES = [
  {
    id: 'plataforma',
    icon: <FaUsers />,
    title: 'Plataforma Marcial Avanzada',
    description:
      'Refuerza y practica las técnicas aprendidas a través de nuestra plataforma de entrenamiento.',
    stat: '50/50 presencial - virtual',
    statLabel: 'plataforma',
    image:  '../../../public/photos/sec_list_01.webp',
  },
  {
    id: 'comunidad',
    icon: <FaUsers />,
    title: 'Únete a nuestra comunidad Creeser',
    description:
      'Ven y sé parte, comparte tus progresos, conoce nuevos amigos y disfruta de nuestras actividades.',
    stat: 'comunidad+',
    statLabel: 'Más que un equipo, una familia',
    image:
      '../../../public/photos/AF_002.webp',
  },
  {
    id: 'horarios',
    icon: <FaCalendar />,
    title: 'Horarios Flexibles',
    description:
      'Clases de Lunes a Sábado con horarios adaptados a tu rutina.',
    stat: '6',
    statLabel: 'días a la semana',
    image:
      '../../../public/photos/bg_team.webp',
  },
  {
    id: 'deportivo',
    icon: <FaStar />,
    title: 'Deportivo y divertido',
    description:
      'Aprende y disfruta del Taekwondo con nosotros, no solo en el dojang, también en el deporte y la vida.',
    stat: 'vida sana+',
    statLabel: 'Deporte Marcial y Vida Sana',
    image:
      '../../../public/photos/equipo_2.webp',
  },
]

const FeaturesSection = () => {
  const counterRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHoveringHero, setIsHoveringHero] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useCounterAnimation(counterRef, 350, {
    suffix: '+',
    scroller: '.page-scroll-container',
  })

  useEffect(() => {
    FEATURES.forEach((f) => {
      const img = new Image()
      img.src = f.image
    })
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % FEATURES.length)
  }, [])

  useEffect(() => {
    if (isHoveringHero || reducedMotion) return
    const timer = setInterval(next, AUTOPLAY_INTERVAL)
    return () => clearInterval(timer)
  }, [isHoveringHero, next, reducedMotion])

  const activeItem = FEATURES[activeIndex]
  const inactiveItems = []
  for (let i = 1; i < FEATURES.length; i++) {
    inactiveItems.push(FEATURES[(activeIndex + i) % FEATURES.length])
  }

  return (
    <section
      className="snap-section flex items-start"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className="container-custom py-12 md:py-8">
        <SectionHeading
          title="¿Por Qué Elegir Creeser?"
          subtitle="Somos más que un club deportivo, somos una familia comprometida con tu desarrollo"
          inverse
        />

        <div className="flex flex-col gap-6 mt-12">
          {/* Hero Card — 65% (wrapper siempre montado) */}
          <div
            className={`
              relative
              w-full
              min-h-[420px] lg:min-h-[480px]
              overflow-hidden rounded-xl
              border border-white/10 bg-surface-2
              shadow-lg
            `}
            onMouseEnter={() => setIsHoveringHero(true)}
            onMouseLeave={() => setIsHoveringHero(false)}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeItem.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.35 }}
              >
                <img
                  src={activeItem.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="relative z-10 flex flex-col justify-between h-full p-8">
                  <div>
                    <span
                      className={`
                        inline-flex items-center gap-2
                        px-3 py-1
                        mb-4
                        text-xs font-semibold uppercase tracking-wider
                        bg-primary-600/20 text-accent-400
                        rounded-full
                      `}
                    >
                      {activeItem.icon}
                      {activeItem.stat} {activeItem.statLabel}
                    </span>
                    <h3
                      className="font-bold mb-3"
                      style={{
                        fontSize: 'var(--text-xl)',
                        color: 'var(--color-text)',
                      }}
                    >
                      {activeItem.title}
                    </h3>
                    <p
                      className="max-w-lg"
                      style={{
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--text-base)',
                      }}
                    >
                      {activeItem.description}
                    </p>
                  </div>
                  <div className="mt-8">
                    <CTAButton to="/registro" size="md" shimmer>
                      Comienza Ahora
                    </CTAButton>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Small Cards Row */}
          <div
            className={`
              flex flex-row
              w-full
              gap-4
              overflow-x-auto
              snap-x snap-mandatory
              pb-2
            `}
          >
            {inactiveItems.map((item) => {
              const originalIndex = FEATURES.findIndex(
                (f) => f.id === item.id
              )

              return (
                <div
                  key={item.id}
                  className={`
                    relative
                    flex-1 min-w-[200px]
                    overflow-hidden rounded-xl
                    border border-white/[0.08] bg-surface
                    p-4
                    cursor-pointer
                    snap-start
                    hover:border-white/20
                    transition-colors
                  `}
                  onClick={() => setActiveIndex(originalIndex)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveIndex(originalIndex)
                    }
                  }}
                >
                  <span
                    className={`
                      inline-flex items-center gap-1.5
                      mb-2
                      text-xs font-semibold uppercase tracking-wider
                      text-accent-400
                    `}
                  >
                  <h4
                    className="text-sm font-medium mb-1"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {item.title}
                  </h4>
                  </span>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Barra de progreso — bajo el bento-grid */}
        <div className="w-full h-0.5 mt-8 bg-white/[0.08] rounded-full overflow-hidden">
          {!reducedMotion && (
            <motion.div
              key={activeIndex}
              className="h-full bg-accent-400 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: isHoveringHero ? undefined : '100%' }}
              transition={{
                duration: isHoveringHero ? 0 : AUTOPLAY_INTERVAL / 1000,
                ease: 'linear',
              }}
            />
          )}
        </div>

        {/* Dots internos del carrusel */}
        <div className="flex items-center justify-center gap-3 mt-4">
          {FEATURES.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(i)}
              aria-label={`Ver: ${item.title}`}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all duration-300',
                i === activeIndex
                  ? 'bg-accent-400 scale-125'
                  : 'bg-white/20 hover:bg-white/40'
              )}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="flex items-center justify-center gap-2 mt-12">
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
          <span
            className="text-sm uppercase tracking-wider"
            style={{ color: 'var(--color-text)' }}
          >
            Alumnos activos
          </span>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
