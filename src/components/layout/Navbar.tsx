'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const links = [
  { href: '/#about', label: 'Sobre mí' },
  { href: '/#skills', label: 'Servicios' },
  { href: '/#projects', label: 'Trabajo' },
  { href: '/#contact', label: 'Contacto' },
]

export default function Navbar() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLAnchorElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.4 }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const menu = menuRef.current
    const overlay = overlayRef.current
    if (!menu || !overlay) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (open) {
        gsap.set(menu, { display: 'flex' })
        gsap.fromTo(menu, { yPercent: -100 }, { yPercent: 0, duration: 0.35, ease: 'power3.out' })
        gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'none' })
        gsap.fromTo(
          itemsRef.current,
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.06, ease: 'power2.out', delay: 0.1 }
        )
      } else {
        gsap.to(menu, {
          yPercent: -100,
          duration: 0.28,
          ease: 'power3.in',
          onComplete: () => gsap.set(menu, { display: 'none' }),
        })
        gsap.to(overlay, { opacity: 0, duration: 0.2, ease: 'none' })
      }
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      if (open) {
        gsap.set(menu, { display: 'flex', yPercent: 0 })
        gsap.set(overlay, { opacity: 1 })
        gsap.set(itemsRef.current, { opacity: 1, x: 0 })
      } else {
        gsap.set(menu, { display: 'none' })
        gsap.set(overlay, { opacity: 0 })
      }
    })

    return () => mm.revert()
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <>
      <nav
        aria-label="Navegación principal"
        className="fixed top-0 left-0 right-0 z-[999] flex justify-between items-stretch h-11 border-b border-border bg-black/90 backdrop-blur-sm"
      >
        <div className="px-5 flex items-center border-r border-border shrink-0">
          <Link href="/" aria-label="Dani López González — inicio" onClick={closeMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 480.72 570"
              className="h-5 w-auto fill-cream"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M272.09,388.45l2.28,115.33,110.69-2.19q-21.36,43.57-51.21,59.73t-67.13,16.9q-30.42.6-54.79-12.41l2.9,147a375.68,375.68,0,0,0,54.6,2.81q108.69-2.15,174.62-80.13l1.26,63.89,111.35-2.2L550.47,383Z"
                transform="translate(-75.94 -145.65)"
              />
              <path
                d="M466.76,214Q385,145.66,242.69,145.65H228.22V276.34q43,1.5,72.17,12,34,12.27,52.56,45.05a102.93,102.93,0,0,1,5,10.26H540.38Q522.7,260.81,466.76,214Z"
                transform="translate(-75.94 -145.65)"
              />
              <polygon points="175.12 437.81 175.12 131.34 171.32 131.34 171.32 0 0 0 0 569.15 171.32 569.15 171.32 437.81 175.12 437.81" />
            </svg>
          </Link>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-stretch overflow-x-auto">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={active === href.slice(2) ? 'page' : undefined}
              className={`flex items-center px-4 text-[11px] tracking-[0.22em] uppercase border-l border-border transition-colors whitespace-nowrap
                ${active === href.slice(2) ? 'text-coral' : 'text-muted hover:text-cream hover:bg-faint'}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center ml-auto md:ml-0">
          {/* Disponible badge */}
          <div className="flex items-center gap-2 px-4 md:px-5 border-l border-border h-full text-[10px] tracking-[0.15em] uppercase text-muted shrink-0">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
            />
            <span>Disponible</span>
          </div>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-11 h-11 border-l border-border shrink-0 group"
          >
            <span
              className={`block w-4 h-px bg-cream transition-transform duration-200 origin-center ${open ? 'translate-y-[6.5px] rotate-45' : ''}`}
            />
            <span
              className={`block w-4 h-px bg-cream transition-opacity duration-200 ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-4 h-px bg-cream transition-transform duration-200 origin-center ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        ref={overlayRef}
        onClick={closeMenu}
        aria-hidden="true"
        className="fixed inset-0 z-[997] bg-black/60 md:hidden"
        style={{ opacity: 0, display: open ? 'block' : 'none' }}
      />

      {/* Mobile menu panel */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-label="Menú de navegación"
        className="fixed top-11 left-0 right-0 z-[998] flex-col border-b border-border bg-black/95 backdrop-blur-sm md:hidden"
        style={{ display: 'none' }}
      >
        {links.map(({ href, label }, i) => (
          <Link
            key={href}
            href={href}
            ref={(el) => {
              if (el) itemsRef.current[i] = el
            }}
            aria-current={active === href.slice(2) ? 'page' : undefined}
            onClick={closeMenu}
            className={`flex items-center px-6 h-12 text-[11px] tracking-[0.22em] uppercase border-b border-border transition-colors
              ${active === href.slice(2) ? 'text-coral border-l-2 border-l-coral pl-[22px]' : 'text-muted hover:text-cream hover:bg-faint'}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  )
}
