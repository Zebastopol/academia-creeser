import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

const VARIANTS = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-500 shadow-glow-primary focus:ring-primary-400',
  outline:
    'border border-accent-400 text-accent-400 bg-transparent hover:bg-accent-400 hover:text-white focus:ring-accent-400',
  ghost:
    'text-accent-400 bg-transparent hover:underline underline-offset-4 focus:ring-accent-400',
  'plan-highlight':
    'bg-primary-600 text-white hover:bg-primary-500 shadow-glow-primary ring-1 ring-primary-400/30 focus:ring-primary-400',
}

const SIZES = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
}

/**
 * CTA Button — componente reutilizable para llamadas a la acción.
 * @param {{
 *   children: React.ReactNode,
 *   variant?: 'primary' | 'outline' | 'ghost' | 'plan-highlight',
 *   size?: 'sm' | 'md' | 'lg',
 *   shimmer?: boolean,
 *   glow?: boolean,
 *   to?: string,
 *   href?: string,
 *   onClick?: Function,
 *   className?: string,
 *   type?: string,
 *   disabled?: boolean,
 * }} props
 */
const CTAButton = ({
  children,
  variant = 'primary',
  size = 'md',
  shimmer = false,
  glow = false,
  to,
  href,
  onClick,
  className,
  type = 'button',
  disabled = false,
  ...rest
}) => {
  const classes = cn(
    'relative inline-flex items-center justify-center',
    'font-semibold',
    'rounded-full',
    'transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'transform hover:-translate-y-0.5',
    'overflow-hidden',
    VARIANTS[variant] || VARIANTS.primary,
    SIZES[size] || SIZES.md,
    glow && 'shadow-glow-primary',
    className
  )

  const inner = (
    <>
      {shimmer && (
        <span
          className="absolute inset-0 shimmer-effect pointer-events-none"
          aria-hidden="true"
        />
      )}
      <span className="relative z-10 flex items-center gap-inherit">
        {children}
      </span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {inner}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {inner}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...rest}
    >
      {inner}
    </button>
  )
}

export default CTAButton
