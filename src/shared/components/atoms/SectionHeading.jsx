import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.4 },
  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
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
}) => (
  <motion.div
    {...fadeInUp}
    className={cn(
      'mt-2 mb-8',
      centered ? 'text-center' : 'text-left',
      className
    )}
    {...props}
  >
    <h2
      className="font-bold font-display mb-2"
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
          fontSize: 'var(--text-base)',
          color: inverse
            ? 'var(--color-text-muted)'
            : 'var(--color-text-muted, #6a647a)',
        }}
      >
        {subtitle}
      </p>
    )}
  </motion.div>
)

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  centered: PropTypes.bool,
  inverse: PropTypes.bool,
  className: PropTypes.string,
}

export default SectionHeading
