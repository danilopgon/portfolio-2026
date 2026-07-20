/**
 * Motion token source of truth.
 *
 * Every GSAP tween and CSS transition/animation in animated components
 * MUST reference these tokens instead of inline numeric/ease literals.
 * Each token exports every representation it needs: `.s`/`.ms` for
 * durations (seconds for GSAP, milliseconds for CSS custom properties),
 * `.gsap`/`.css` for eases (GSAP's algorithmic ease string vs. its closest
 * cubic-bezier approximation, since CSS cannot express GSAP's eases
 * directly).
 *
 * Art direction: Brutalist Swiss snap — hard cuts, no fades, no inertia.
 */

export type MotionDuration = { s: number; ms: number }
export type MotionEase = { gsap: string; css: string }

export const dur: Record<'snap' | 'base' | 'slow', MotionDuration> = {
  snap: { s: 0.25, ms: 250 },
  base: { s: 0.4, ms: 400 },
  slow: { s: 0.6, ms: 600 },
}

export const ease: Record<'snap' | 'punch' | 'linear', MotionEase> = {
  snap: { gsap: 'power4.out', css: 'cubic-bezier(0.165, 0.84, 0.44, 1)' },
  punch: { gsap: 'back.out(1.4)', css: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
  linear: { gsap: 'none', css: 'linear' },
}
