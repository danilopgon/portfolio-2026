'use client'

import { useEffect } from 'react'
import gsap from 'gsap'

/**
 * Shared `prefers-reduced-motion` contract for animated components.
 *
 * Wraps `gsap.matchMedia()`: runs `full` when the user has no motion
 * preference (or is undecided), runs `reduced` when they prefer reduced
 * motion, and reverts all GSAP context created inside `full` when the
 * component unmounts or the matched query changes.
 */
export function useMotionMedia(
  full: (context: gsap.Context) => void | (() => void),
  reduced: () => void
): void {
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', full)
    mm.add('(prefers-reduced-motion: reduce)', reduced)

    return () => mm.revert()
  }, [full, reduced])
}
