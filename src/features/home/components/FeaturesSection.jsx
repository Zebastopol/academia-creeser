import { useRef, useEffect } from 'react'
import { FaCalendar, FaStar, FaTrophy, FaUsers } from 'react-icons/fa'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../../../shared/components/atoms/SectionHeading'
import { useCounterAnimation } from '../../../shared/hooks/useScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    icon: <FaUsers />,
    title: 'Instructores Certificados',
    description: 'Maestros con más de 20 años de experiencia y certificaciones internacionales.',
    stat: '20+',
    statLabel: 'años de experiencia',
    featured: true,
  },
  {
    icon: <FaTrophy />,
    title: 'Resultados Comprobados',
    description: 'Campeonatos ganados por nuestros alumnos a nivel nacional.',
    stat: '50+',
    statLabel: 'campeonatos ganados',
  },
  {
    icon: <FaCalendar />,
    title: 'Horarios Flexibles',
    description: 'Clases todos los días con horarios adaptados a tu rutina.',
    stat: '6',
    statLabel: 'días a la semana',
  },
  {
    icon: <FaStar />,
    title: '92% Retención',
    description: 'Nuestros alumnos continúan año tras año gracias al ambiente y los resultados.',
    stat: '92%',
    statLabel: 'retención de alumnos',
  },
]

const FeaturesSection = () => {
  const sectionRef = useRef(null)
  const counterRef = useRef(null)

  useCounterAnimation(counterRef, 350, {
    suffix: '+',
    scroller: '.page-scroll-container',
  })

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll('.feature-card')
    const scroller = document.querySelector('.page-scroll-container')

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          ...(scroller && { scroller }),
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    return () => ScrollTrigger.getAll().forEach(t => {
      if (t.trigger === sectionRef.current) t.kill()
    })
  }, [])

  const featured = FEATURES.find(f => f.featured)
  const rest = FEATURES.filter(f => !f.featured)

  return (
    <section
      ref={sectionRef}
      className="snap-section flex items-start"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className="container-custom py-20 md:py-12">
        <SectionHeading
          title="¿Por Qué Elegir Creeser?"
          subtitle="Somos más que un club deportivo, somos una familia comprometida con tu desarrollo"
          inverse
        />

        {/* Asymmetric layout: featured full-width + sidebar column */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-12">
          {/* Featured card — spans 3 columns */}
          {featured && (
            <div
              className="feature-card lg:col-span-3 p-8 md:p-10 rounded-2xl flex flex-col justify-between"
              style={{ backgroundColor: 'var(--color-surface-offset)' }}
            >
              <div>
                <span className="text-2xl mb-4 block" style={{ color: 'var(--color-primary)' }}>
                  {featured.icon}
                </span>
                <h3
                  className="font-bold mb-3"
                  style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text)' }}
                >
                  {featured.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-base)' }}>
                  {featured.description}
                </p>
              </div>
              <div className="mt-8 flex items-baseline gap-2">
                <span
                  className="font-display font-black"
                  style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-accent)' }}
                >
                  {featured.stat}
                </span>
                <span
                  className="text-sm uppercase tracking-wider"
                  style={{ color: 'var(--color-text-faint)' }}
                >
                  {featured.statLabel}
                </span>
              </div>
            </div>
          )}

          {/* Side column — spans 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {rest.map((feature) => (
              <div
                key={feature.title}
                className="feature-card p-6 rounded-2xl flex items-start gap-4"
                style={{ backgroundColor: 'var(--color-surface-offset)' }}
              >
                <span className="text-xl shrink-0 mt-1" style={{ color: 'var(--color-primary)' }}>
                  {feature.icon}
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3
                      className="font-bold"
                      style={{ color: 'var(--color-text)', fontSize: 'var(--text-base)' }}
                    >
                      {feature.title}
                    </h3>
                    <span
                      className="font-display font-black"
                      style={{ fontSize: 'var(--text-xl)', color: 'var(--color-accent)' }}
                    >
                      {feature.stat}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <span
            ref={counterRef}
            className="font-display font-black"
            style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-accent)' }}
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
