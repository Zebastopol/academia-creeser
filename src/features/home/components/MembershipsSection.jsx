import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../../../shared/components/atoms/SectionHeading'
import MembershipCard from './MembershipCard'
import { useMemberships } from '../../memberships/hooks/useMemberships'

const MembershipsSection = () => {
  const { memberships, loading } = useMemberships()
  const [isAnnual, setIsAnnual] = useState(false)

  if (loading) {
    return (
      <section className="snap-section flex items-center justify-center" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="loading-spinner" />
      </section>
    )
  }

  return (
    <section className="snap-section flex items-start" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container-custom py-20 md:py-12">
        <SectionHeading
          title="Planes de Membresía"
          subtitle="Elige el plan que mejor se adapte a tus objetivos y estilo de vida"
          inverse
        />

        {/* Toggle mensual / anual */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span
            className="text-sm font-medium"
            style={{ color: isAnnual ? 'var(--color-text-faint)' : 'var(--color-text)' }}
          >
            Mensual
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-7 rounded-full transition-colors duration-300"
            style={{ backgroundColor: isAnnual ? 'var(--color-primary)' : 'var(--color-surface-offset)' }}
            role="switch"
            aria-checked={isAnnual}
            aria-label="Cambiar entre precio mensual y anual"
          >
            <motion.span
              className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md"
              animate={{ x: isAnnual ? 28 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          <span
            className="text-sm font-medium"
            style={{ color: isAnnual ? 'var(--color-text)' : 'var(--color-text-faint)' }}
          >
            Anual
            <span
              className="ml-1 text-xs font-bold"
              style={{ color: 'var(--color-accent)' }}
            >
              -20%
            </span>
          </span>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {memberships.map((plan, index) => (
              <MembershipCard
                key={plan.id}
                plan={plan}
                index={index}
                isAnnual={isAnnual}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default MembershipsSection
