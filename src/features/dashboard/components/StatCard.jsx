import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const COLOR_MAP = {
  primary: { bg: 'oklch(0.45 0.15 305 / 0.12)', icon: 'var(--color-primary)' },
  accent:  { bg: 'oklch(0.75 0.14 190 / 0.12)', icon: 'var(--color-accent)' },
  gold:    { bg: 'rgba(251, 191, 36, 0.12)',     icon: '#f59e0b' },
  green:   { bg: 'rgba(52, 211, 153, 0.12)',     icon: '#34d399' },
  blue:    { bg: 'rgba(59, 130, 246, 0.12)',      icon: '#3b82f6' },
}

/**
 * @param {{ icon: React.ReactNode, label: string, value: string|number, color: string, index: number }} props
 */
const StatCard = ({ icon, label, value, color = 'primary', index }) => {
  const valueRef = useRef(null)
  const colors = COLOR_MAP[color] || COLOR_MAP.primary

  useEffect(() => {
    if (!valueRef.current) return

    const numericPart = String(value).replace(/[^0-9.]/g, '')
    const suffix = String(value).replace(/[0-9.]/g, '')
    const target = parseFloat(numericPart)

    if (isNaN(target)) {
      valueRef.current.textContent = value
      return
    }

    const obj = { val: 0 }
    const anim = gsap.to(obj, {
      val: target,
      duration: 1.5,
      delay: index * 0.15,
      ease: 'power2.out',
      onUpdate: () => {
        if (valueRef.current) {
          valueRef.current.textContent = Math.round(obj.val) + suffix
        }
      },
    })

    return () => anim.kill()
  }, [value, index])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card p-6 h-full flex flex-col"
    >
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
        style={{ backgroundColor: colors.bg, color: colors.icon }}
      >
        {icon}
      </div>
      <div
        ref={valueRef}
        className="stat-value mb-1 mt-auto"
        style={{ color: 'var(--color-text)' }}
      >
        0
      </div>
      <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
        {label}
      </div>
    </motion.div>
  )
}

export default StatCard
