import { useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const SCROLLER = '.page-scroll-container'

/**
 * Sets up GSAP ScrollTrigger for all .snap-section elements
 * and returns helpers for programmatic navigation.
 * @param {{ onSectionChange?: (index: number) => void }} [options]
 * @returns {{ scrollToSection: (index: number) => void }}
 */
export function useScrollSetup(options = {}) {
  const triggersRef = useRef([])
  const onSectionChange = options.onSectionChange

  const scrollToSection = useCallback((index) => {
    const container = document.querySelector(SCROLLER)
    if (!container) return

    const sections = container.querySelectorAll(
      '.snap-section, .snap-section--tall, .snap-section--footer'
    )
    const target = sections[index]
    if (!target) return

    gsap.to(container, {
      scrollTo: { y: target, offsetY: 0 },
      duration: 0.7,
      ease: 'power2.inOut',
    })
  }, [])

  useEffect(() => {
    if (!onSectionChange) return

    const container = document.querySelector(SCROLLER)
    if (!container) return

    const sections = container.querySelectorAll(
      '.snap-section, .snap-section--tall, .snap-section--footer'
    )

    sections.forEach((section, i) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        scroller: container,
        start: 'top top',
        end: 'bottom top',
        onEnter: () => onSectionChange(i),
        onEnterBack: () => onSectionChange(i),
      })
      triggersRef.current.push(trigger)
    })

    return () => {
      triggersRef.current.forEach(t => t.kill())
      triggersRef.current = []
    }
  }, [onSectionChange])

  return { scrollToSection }
}

/**
 * Animates a number from 0 to target when element enters viewport.
 * @param {React.RefObject} ref - Element ref that displays the number
 * @param {number} target - Target number
 * @param {{ duration?: number, suffix?: string, scroller?: string }} [options]
 */
export function useCounterAnimation(ref, target, options = {}) {
  useEffect(() => {
    if (!ref.current) return

    const obj = { val: 0 }
    const scroller = options.scroller
      ? document.querySelector(options.scroller)
      : undefined

    const anim = gsap.to(obj, {
      val: target,
      duration: options.duration || 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        ...(scroller && { scroller }),
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.val) + (options.suffix || '')
        }
      },
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [target])
}
