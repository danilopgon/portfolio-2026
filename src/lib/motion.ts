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
 * Art direction: Editorial, quiet and expensive — slow, contained motion,
 * `expo.out` easing (long, no overshoot), subtle fades over hard cuts.
 *
 * Two latency-sensitive surfaces intentionally do NOT consume these tokens
 * for duration: the Hero H1 entrance (mobile LCP element) and the Navbar
 * mobile menu (direct-input tap response). Both keep short, locally-scoped
 * duration constants — see `sdd/premium-motion-system/scope-decisions`.
 */

export type MotionDuration = { s: number; ms: number }
export type MotionEase = { gsap: string; css: string }

export const dur: Record<'snap' | 'base' | 'slow', MotionDuration> = {
  snap: { s: 0.9, ms: 900 },
  base: { s: 1.2, ms: 1200 },
  slow: { s: 1.8, ms: 1800 },
}

export const ease: Record<'snap' | 'linear', MotionEase> = {
  snap: { gsap: 'expo.out', css: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  linear: { gsap: 'none', css: 'linear' },
}
