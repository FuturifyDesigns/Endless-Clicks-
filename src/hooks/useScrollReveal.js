import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Fade/slide cards in on scroll down, reverse (unreveal) on scroll up.
 */
export function useScrollReveal(scopeRef, selector = '.reveal-card', deps = []) {
  useGSAP(
    () => {
      const items = gsap.utils.toArray(selector)
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'top 35%',
              toggleActions: 'play reverse play reverse',
            },
          },
        )
      })
    },
    { scope: scopeRef, dependencies: deps, revertOnUpdate: true },
  )
}
