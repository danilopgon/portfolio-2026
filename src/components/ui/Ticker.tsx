'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface TickerProps {
  children: React.ReactNode
  speed?: number // px per second
  className?: string
}

export default function Ticker({ children, speed = 80, className }: TickerProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [copies, setCopies] = useState(4) // safe default

  // After fonts load, calculate the minimum copies needed to always fill the viewport
  useEffect(() => {
    const measure = measureRef.current
    if (!measure) return

    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        const copyWidth = measure.getBoundingClientRect().width
        if (copyWidth <= 0) return
        // Track must cover viewport width *after* a full loop reset (at xPos = -copyWidth)
        // At that point we show [copyWidth, copyWidth + viewportWidth] of the track.
        // Track total = copies * copyWidth, so: copies * copyWidth > copyWidth + viewportWidth
        // → copies > 1 + viewportWidth / copyWidth
        const needed = Math.ceil(window.innerWidth / copyWidth) + 2
        setCopies(Math.max(4, needed))
      })
    })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    const measure = measureRef.current
    if (!track || !measure) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let copyWidth = 0
    let xPos = 0

    const tick = (_time: number, deltaTime: number) => {
      xPos -= speed * (deltaTime / 1000)
      if (xPos <= -copyWidth) xPos += copyWidth
      track.style.transform = `translateX(${xPos}px)`
    }

    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        copyWidth = measure.getBoundingClientRect().width
        if (copyWidth <= 0) return
        xPos = 0
        gsap.ticker.add(tick)
      })
    })

    return () => {
      gsap.ticker.remove(tick)
    }
  }, [speed, copies])

  return (
    <div className={`overflow-hidden ${className ?? ''}`} aria-hidden="true">
      <div ref={trackRef} style={{ display: 'flex', willChange: 'transform' }}>
        <div ref={measureRef} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {children}
        </div>
        {Array.from({ length: copies - 1 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}
