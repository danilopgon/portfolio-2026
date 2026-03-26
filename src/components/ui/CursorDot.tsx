'use client'
import { useEffect, useRef } from 'react'

export default function CursorDot() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = ref.current
    if (!dot) return
    const move = (e: MouseEvent) => {
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }
    const grow = () => {
      dot.style.transform = 'translate(-50%,-50%) scale(3)'
      dot.style.opacity = '0.4'
    }
    const shrink = () => {
      dot.style.transform = 'translate(-50%,-50%) scale(1)'
      dot.style.opacity = '1'
    }
    document.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,[data-cursor],.project-card,.skill-card').forEach((el) => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })
    return () => document.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={ref}
      className="fixed w-1.5 h-1.5 bg-coral rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[transform,opacity] duration-75"
    />
  )
}
