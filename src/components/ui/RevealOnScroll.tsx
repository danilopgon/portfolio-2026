'use client'
import { useCallback, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { dur, ease } from '@/lib/motion'
import { useMotionMedia } from '@/lib/motion/useMotionMedia'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: 'wipe' | 'cut'
}

// Editorial reveal: opacity + y + blur, no clip-path. Per the "Per-line
// editorial reveals" family (mask-reveal-up), a hard-edged clip-path cut
// belongs to the kinetic/brutalist families, not this one.
const OFFSET_Y = 30
const BLUR_HIDDEN = 'blur(6px)'
const BLUR_VISIBLE = 'blur(0px)'

export default function RevealOnScroll({ children, className, delay = 0 }: Props) {
  // `variant` is reserved for a future alternate treatment; the editorial
  // fade is the only implemented variant today (default and only shipped
  // value) — it replaces the earlier clip-path wipe per the art-direction
  // pivot to "Editorial, quiet and expensive".
  const ref = useRef<HTMLDivElement>(null)

  const full = useCallback(() => {
    const el = ref.current
    if (!el) return

    gsap.fromTo(
      el,
      { opacity: 0, y: OFFSET_Y, filter: BLUR_HIDDEN },
      {
        opacity: 1,
        y: 0,
        filter: BLUR_VISIBLE,
        duration: dur.base.s,
        delay: delay / 1000,
        ease: ease.snap.gsap,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [delay])

  const reduced = useCallback(() => {
    const el = ref.current
    if (!el) return
    gsap.set(el, { opacity: 1, y: 0, filter: BLUR_VISIBLE })
  }, [])

  useMotionMedia(full, reduced)

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
