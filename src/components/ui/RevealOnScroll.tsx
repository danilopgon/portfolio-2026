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

const CLIP_HIDDEN = 'inset(0% 100% 0% 0%)'
const CLIP_VISIBLE = 'inset(0% 0% 0% 0%)'

export default function RevealOnScroll({ children, className, delay = 0 }: Props) {
  // `variant` is reserved for a future hard-cut treatment; the wipe is the
  // only implemented variant today, per D3 (default and only shipped value).
  const ref = useRef<HTMLDivElement>(null)

  const full = useCallback(() => {
    const el = ref.current
    if (!el) return

    gsap.fromTo(
      el,
      { clipPath: CLIP_HIDDEN },
      {
        clipPath: CLIP_VISIBLE,
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
    gsap.set(el, { clipPath: 'none' })
  }, [])

  useMotionMedia(full, reduced)

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
