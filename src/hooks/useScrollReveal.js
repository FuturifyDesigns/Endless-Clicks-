import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Smooth fade-up on enter; gentle reverse only when scrolling back past the card.
 * Avoids double-animation glitches by skipping already-animated / above-fold items carefully.
 */
export function useScrollReveal(scopeRef, selector = '.reveal-card', deps = []) {
  useGSAP(
    () => {
      const items = gsap.utils.toArray(selector)
      if (!items.length) return

      gsap.set(items, { autoAlpha: 0, y: 28 })

      ScrollTrigger.batch(items, {
        start: 'top 90%',
        end: 'top 10%',
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: 'power2.out',
            overwrite: 'auto',
          }),
        onLeaveBack: (batch) =>
          gsap.to(batch, {
            autoAlpha: 0,
            y: 20,
            duration: 0.35,
            stagger: 0.03,
            ease: 'power1.in',
            overwrite: 'auto',
          }),
      })
    },
    { scope: scopeRef, dependencies: deps },
  )
}
