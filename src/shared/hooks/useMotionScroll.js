import { useLayoutEffect, useRef, useState } from 'react'
import { useScroll, useTransform } from 'framer-motion'

const SCROLLER = '.page-scroll-container'

/**
 * Retorna un valor de Framer Motion transformado según el scroll de un elemento.
 * @param {number[] | string[]} inputRange - Rango de scrollYProgress. Ej: [0, 1]
 * @param {number[] | string[]} outputRange - Valores de salida. Ej: ['blur(0px)', 'blur(10px)']
 * @param {{ container?: string }} [options]
 * @returns {{ ref: React.RefObject<HTMLElement | null>, value: import('framer-motion').MotionValue<number | string> }}
 */
export function useMotionScroll(inputRange, outputRange, options = {}) {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const [containerReady, setContainerReady] = useState(false)

  useLayoutEffect(() => {
    if (typeof document === 'undefined') return
    const element = document.querySelector(options.container ?? SCROLLER)
    if (element) {
      containerRef.current = element
      setContainerReady(true)
    }
  }, [options.container])

  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerReady ? containerRef : undefined,
    offset: ['start start', 'end start'],
    layoutEffect: false,
  })

  const value = useTransform(scrollYProgress, inputRange, outputRange)

  return { ref, value }
}

