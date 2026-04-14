import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

/**
 * @param {{
 *   title: string,
 *   subtitle?: string,
 *   centered?: boolean,
 *   inverse?: boolean,
 *   className?: string,
 * }} props
 */
const SectionHeading = ({
  title,
  subtitle,
  centered = true,
  className,
  inverse = false,
  ...props
}) => {
  return (
    <motion.div
      {...fadeInUp}
      className={cn(
        'mb-16',
        centered ? 'text-center' : 'text-left',
        className
      )}
      {...props}
    >
      <h2
        className="font-bold font-display mb-4"
        style={{
          fontSize: 'var(--text-2xl)',
          color: inverse ? 'var(--color-text)' : 'var(--color-text, #1e1a26)',
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn('max-w-3xl', centered && 'mx-auto')}
          style={{
            fontSize: 'var(--text-lg)',
            color: inverse ? 'var(--color-text-muted)' : 'var(--color-text-muted, #6a647a)',
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default SectionHeading
