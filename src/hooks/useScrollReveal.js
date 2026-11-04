import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Safe scroll motion: transform only, play once, always leave content readable.
 */
export function useScrollReveal(scopeRef, selector = '.reveal-card', deps = []) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const items = gsap.utils.toArray(selector)
        items.forEach((el) => {
          gsap.from(el, {
            y: 24,
            duration: 0.55,
            ease: 'power2.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              once: true,
            },
          })
        })
      })
      return () => mm.revert()
    },
    { scope: scopeRef, dependencies: deps },
  )
}
