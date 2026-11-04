/** Safe entrance motion — transform only, never leaves content invisible. */
export const enter = {
  y: 18,
  duration: 0.55,
  ease: 'power2.out',
  clearProps: 'transform',
}

export const enterStagger = {
  ...enter,
  stagger: 0.06,
}
