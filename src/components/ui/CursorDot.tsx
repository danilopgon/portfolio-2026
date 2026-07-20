'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useMotionMedia } from '@/lib/motion/useMotionMedia'

export default function CursorDot() {
  const ref = useRef<HTMLDivElement>(null)
  // Seed a server-safe value so the first client render matches the SSR
  // markup. useMotionMedia flips it after mount and on live OS preference
  // changes, so the dot mounts/unmounts without a hydration mismatch.
  const [reduced, setReduced] = useState(false)

  useMotionMedia(
    useCallback(() => setReduced(false), []),
    useCallback(() => setReduced(true), [])
  )

  // Attach pointer listeners from an effect keyed on `reduced` so that when the
  // user turns reduced motion back off, the dot — remounted by the state change
  // above — gets its listeners reattached instead of staying inert until reload.
  useEffect(() => {
    if (reduced) return
    // Guard the first commit, where `reduced` is still the server-safe `false`
    // before useMotionMedia has run: a reduced-motion user must never get
    // listeners attached, even transiently.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
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
      gsap.to(dot, {
        scale: 3,
        opacity: 0.4,
        duration: 0.15,
        ease: 'power2.out',
        overwrite: true,
      })
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
  }, [reduced])

  if (reduced) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hidden [@media(pointer:fine)]:block [@media(pointer:fine)]:fixed top-0 left-0 w-1.5 h-1.5 bg-coral rounded-full pointer-events-none z-[9999]"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  )
}
