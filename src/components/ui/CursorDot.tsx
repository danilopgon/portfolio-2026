'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CursorDot() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = ref.current
    if (!dot) return

    // Use GSAP quickSetter for transform — no layout recalculation
    const setX = gsap.quickSetter(dot, 'x', 'px')
    const setY = gsap.quickSetter(dot, 'y', 'px')

    const move = (e: MouseEvent) => {
      setX(e.clientX)
      setY(e.clientY)
    }

    const grow = () => {
      gsap.to(dot, { scale: 3, opacity: 0.4, duration: 0.15, ease: 'power2.out', overwrite: true })
    }
    const shrink = () => {
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2, ease: 'power2.out', overwrite: true })
    }

    const interactives = document.querySelectorAll(
      'a, button, [data-cursor], .project-card, .skill-card, .experience-card'
    )

    document.addEventListener('mousemove', move)
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      document.removeEventListener('mousemove', move)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
      })
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hidden [@media(pointer:fine)]:block [@media(pointer:fine)]:fixed top-0 left-0 w-1.5 h-1.5 bg-coral rounded-full pointer-events-none z-[9999]"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  )
}
