import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const SCROLLER = '.page-scroll-container'

/**
 * Sets up GSAP ScrollTrigger for all .snap-section elements
 * and returns helpers for programmatic navigation.
 * @param {{ onSectionChange?: (index: number) => void }} [options]
 */
export function useScrollSetup(options = {}) {
  const triggersRef = useRef([])

  useEffect(() => {
    const container = document.querySelector(SCROLLER)
    if (!container) return

    const sections = container.querySelectorAll('.snap-section, .snap-section--tall, .snap-section--footer')

    sections.forEach((section, i) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        scroller: container,
        start: 'top top',
        end: 'bottom top',
        onEnter: () => options.onSectionChange?.(i),
        onEnterBack: () => options.onSectionChange?.(i),
      })
      triggersRef.current.push(trigger)
    })

    return () => {
      triggersRef.current.forEach(t => t.kill())
      triggersRef.current = []
    }
  }, [])

  return { scrollToSection }
}

/**
 * Smoothly scrolls to a snap-section by index.
 * @param {number} index
 */
export function scrollToSection(index) {
  const container = document.querySelector(SCROLLER)
  if (!container) return

  const sections = container.querySelectorAll('.snap-section, .snap-section--tall, .snap-section--footer')
  const target = sections[index]
  if (!target) return

  gsap.to(container, {
    scrollTo: { y: target, offsetY: 0 },
    duration: 0.9,
    ease: 'power3.inOut',
  })
}

/**
 * Creates a GSAP animation that triggers when an element enters the viewport.
 * Works with or without a scroll container.
 * @param {React.RefObject} ref - Element ref to animate
 * @param {gsap.TweenVars} fromVars - Starting state
 * @param {gsap.TweenVars} toVars - Ending state
 * @param {{ scroller?: string | Element }} [options]
 */
export function useRevealAnimation(ref, fromVars, toVars, options = {}) {
  useEffect(() => {
    if (!ref.current) return

    const scroller = options.scroller
      ? document.querySelector(options.scroller)
      : undefined

    const anim = gsap.fromTo(ref.current, fromVars, {
      ...toVars,
      scrollTrigger: {
        trigger: ref.current,
        ...(scroller && { scroller }),
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])
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
