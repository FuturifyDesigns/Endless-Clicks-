import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/** Soft batch reveal — enter on scroll down, ease out on leave-back. */
export function useScrollReveal(scopeRef, selector = '.reveal-card', deps = []) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const items = gsap.utils.toArray(selector)
        if (!items.length) return
        gsap.set(items, { autoAlpha: 0, y: 28 })
        ScrollTrigger.batch(items, {
          start: 'top 92%',
          once: false,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.07,
              ease: 'power2.out',
              overwrite: 'auto',
            }),
          onLeaveBack: (batch) =>
            gsap.to(batch, {
              autoAlpha: 0,
              y: 18,
              duration: 0.3,
              overwrite: 'auto',
            }),
        })
      })
      return () => mm.revert()
    },
    { scope: scopeRef, dependencies: deps },
  )
}
