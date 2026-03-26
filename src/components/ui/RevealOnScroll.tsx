'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = { children: React.ReactNode; className?: string; delay?: number }

export default function RevealOnScroll({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(el, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        delay: delay / 1000,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    })

    return () => mm.revert()
  }, [delay])

  return <div ref={ref} className={className}>{children}</div>
}
