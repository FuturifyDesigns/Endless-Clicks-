/** Safe entrance — transform only, never opacity/clip that can stick. */
export const enter = {
  y: 16,
  duration: 0.5,
  ease: 'power2.out',
  clearProps: 'transform',
}

export const enterStagger = {
  ...enter,
  stagger: 0.06,
}
