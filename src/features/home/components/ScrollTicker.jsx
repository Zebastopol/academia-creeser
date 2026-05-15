import { useRef , useLayoutEffect , useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, motionValue } from 'framer-motion'

const LINES = [
  { text: 'Taekwondo WT', reverse: true },
  { text: 'Creeser',      reverse: false  },
  { text: 'Creer',        reverse: true },
  { text: 'Crecer',       reverse: false  },
  { text: 'Ser',          reverse: true },
]

const REPEAT = 7  // repeticiones para cubrir pantallas anchas

const LineTicker = ({ text, offset, reverse }) => {
  const baseOffset = reverse ? 150 : -600
  const x = useTransform(offset, (v) => `${v * 0.11 + baseOffset}px`)

  return (
    <div className="overflow-hidden py-0 px-0">
      <motion.div className="flex items-center w-max h-min --space-1" style={{ x }}>
        {Array.from({ length: REPEAT }).map((_, idx) => (
          <div key={`${text}-${idx}`} className="flex items-center py-0">
            <span
              className="font-display font-black uppercase whitespace-nowrap px-10"
              style={{ marginTop: '--space-1',marginBottom: '--space-1',fontSize: 'var(--text-2xl)',color: 'var(--color-text)',opacity: 0.9 }}
            >
              {text}
            </span>
            <span
              className="font-display font-black uppercase whitespace-nowrap px-10"
              style={{ marginTop: '--space-1',marginBottom: '--space-1',fontSize: 'var(--text-2xl)',WebkitTextStroke: '1.5px var(--color-primary)',color: 'transparent' }}
            >
              {text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

const ScrollTicker = () => {
  const reducedMotion   = useReducedMotion()
  const containerRef    = useRef(null)
  const [ready, setReady] = useState(false)

  // ← CLAVE: apuntar al mismo contenedor que usa useMotionScroll
  useLayoutEffect(() => {
    containerRef.current = document.querySelector('.page-scroll-container')
    if (containerRef.current) setReady(true)
  }, [])

  const { scrollY } = useScroll({
    container: ready ? containerRef : undefined,
    layoutEffect: false,   // ← evita bug en producción con refs diferidas [web:37]
  })

  const invertScroll = useTransform(scrollY, (v) => v * -1)
  const fixedOffset  = motionValue(0)

  return (
    
    <div className="w-full overflow-hidden py-0 select-none"
      style={{ backgroundColor: 'var(--color-surface)' }}>
      {LINES.map((line) => (
        <LineTicker
          key={line.text}
          text={line.text}
          reverse={line.reverse}
          offset={
            reducedMotion 
            ? fixedOffset
            : line.reverse 
            ? invertScroll
            : scrollY
          }
        />
      ))}
    </div>
  )
}

export default ScrollTicker

