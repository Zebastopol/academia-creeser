import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '../../../shared/components/atoms/SectionHeading'
import CTAButton from '../../../shared/components/atoms/CTAButton'
import ClassCard from './ClassCard'
import { useClasses } from '../../classes/hooks/useClasses'

const ClassesSection = () => {
  const { classes, loading } = useClasses()
  const [activeFilter, setActiveFilter] = useState('Todos')

  const categories = useMemo(() => {
    if (!classes?.length) return ['Todos']
    const unique = [...new Set(classes.map(c => c.ageGroup))]
    return ['Todos', ...unique]
  }, [classes])

  const filtered = useMemo(() => {
    if (!classes) return []
    if (activeFilter === 'Todos') return classes
    return classes.filter(c => c.ageGroup === activeFilter)
  }, [classes, activeFilter])

  if (loading) {
    return (
      <section className="snap-section--tall flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="loading-spinner" />
      </section>
    )
  }

  return (
    <section className="snap-section--tall" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-custom py-20 md:py-12">
        <SectionHeading
          title="Nuestras Clases"
          subtitle="Programas diseñados para cada edad y nivel de experiencia"
          inverse
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="px-5 py-2 text-sm font-medium rounded-full transition-all duration-300"
              style={{
                backgroundColor: activeFilter === cat ? 'var(--color-primary)' : 'var(--color-surface-offset)',
                color: activeFilter === cat ? '#fff' : 'var(--color-text-muted)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid with animated reorder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((classItem) => (
              <motion.div
                key={classItem.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ClassCard classItem={classItem} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA-2 */}
        <div className="text-center mt-14">
          <CTAButton to="/registro" variant="outline" size="md">
            Regístrate y crea tu cuenta gratis
          </CTAButton>
        </div>
      </div>
    </section>
  )
}

export default ClassesSection
