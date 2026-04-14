import { useState, useCallback } from 'react'
import { cn } from '../../utils/cn'
import { useScrollSetup } from '../../hooks/useScrollTrigger'

const SECTION_LABELS = [
  'Inicio',
  '¿Por qué Creeser?',
  'Nuestras Clases',
  'Planes',
  'Testimonios',
  'Eventos',
  'Únete',
  'Contacto',
]

/**
 * Navegación lateral por dots sincronizada con scroll snap sections.
 * Solo se renderiza en la página Home.
 */
const SectionNavDots = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSectionChange = useCallback((index) => {
    setActiveIndex(index)
  }, [])

  const { scrollToSection } = useScrollSetup({
    onSectionChange: handleSectionChange,
  })

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3"
      aria-label="Navegación por secciones"
    >
      {SECTION_LABELS.map((label, i) => (
        <button
          key={label}
          onClick={() => scrollToSection(i)}
          className="group flex items-center gap-2"
          aria-label={`Ir a ${label}`}
          aria-current={activeIndex === i ? 'true' : 'false'}
        >
          <span
            className={cn(
              'text-xs font-medium transition-all duration-300',
              'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0',
              activeIndex === i
                ? 'text-primary-400'
                : 'text-white/60'
            )}
          >
            {label}
          </span>
          <span
            className={cn(
              'block rounded-full transition-all duration-300',
              activeIndex === i
                ? 'w-3 h-3 bg-primary-500 shadow-glow-primary'
                : 'w-2 h-2 bg-white/40 group-hover:bg-white/70'
            )}
          />
        </button>
      ))}
    </nav>
  )
}

export default SectionNavDots
