import { motion } from 'framer-motion'
import CTAButton from '../../../shared/components/atoms/CTAButton'
import { FaCheck, FaMinus } from 'react-icons/fa'

/**
 * @param {{ plan: object, index: number, isAnnual: boolean }} props
 */
const MembershipCard = ({ plan, index, isAnnual }) => {
  const monthlyPrice = plan.price
  const annualPrice = Math.round(monthlyPrice * 12 * 0.8)
  const displayPrice = isAnnual ? annualPrice : monthlyPrice
  const promoPrice = plan.promoPrice
    ? (isAnnual ? Math.round(plan.promoPrice * 12 * 0.8) : plan.promoPrice)
    : null
  const finalPrice = promoPrice ?? displayPrice
  const period = isAnnual ? 'año' : plan.period

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="relative flex flex-col h-full rounded-2xl p-8"
      style={{
        backgroundColor: 'var(--color-surface-offset)',
        border: plan.popular ? '1px solid var(--color-primary)' : '1px solid transparent',
      }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span
            className="px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full text-white"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Más Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h3
          className="font-bold mb-3"
          style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text)' }}
        >
          {plan.name}
        </h3>
        <div className="flex flex-col items-center gap-1">
          {promoPrice && (
            <span
              className="text-sm line-through"
              style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-faint)' }}
            >
              ${displayPrice.toLocaleString()}
            </span>
          )}
          <div className="flex items-baseline gap-1">
            <motion.span
              key={finalPrice}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-black"
              style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-text)' }}
            >
              ${finalPrice.toLocaleString()}
            </motion.span>
            <span className="text-sm" style={{ color: 'var(--color-text-faint)' }}>
              /{period}
            </span>
          </div>
        </div>
      </div>

      {/* Features list */}
      <ul className="space-y-3 mb-8 flex-grow">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <FaCheck
              className="shrink-0 mt-0.5"
              style={{ color: 'var(--color-accent)' }}
            />
            <span style={{ color: 'var(--color-text-muted)' }}>{feature}</span>
          </li>
        ))}
        {plan.excluded?.map((feature, idx) => (
          <li key={`ex-${idx}`} className="flex items-start gap-2 text-sm">
            <FaMinus
              className="shrink-0 mt-0.5"
              style={{ color: 'var(--color-text-faint)' }}
            />
            <span style={{ color: 'var(--color-text-faint)' }}>{feature}</span>
          </li>
        ))}
      </ul>

      {plan.promoNote && (
        <p
          className="text-center text-xs mb-4"
          style={{ color: 'var(--color-text-faint)' }}
        >
          *{plan.promoNote}
        </p>
      )}

      {/* CTA-3 — differentiated by plan */}
      <CTAButton
        to="/registro"
        variant={plan.popular ? 'plan-highlight' : 'outline'}
        size="md"
        glow={plan.popular}
        className="w-full"
      >
        {plan.popular ? 'Suscríbete ahora' : 'Suscríbete'}
      </CTAButton>
    </motion.div>
  )
}

export default MembershipCard
