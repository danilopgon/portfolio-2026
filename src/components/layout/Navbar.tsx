'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useLanguage } from '@/lib/i18n/context'
export default function Navbar() {
  const { locale, setLocale, t } = useLanguage()
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLAnchorElement[]>([])
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const wasOpenRef = useRef(false)

  const links = [
    { href: '/#about', label: t.nav.about },
    { href: '/#skills', label: t.nav.skills },
    { href: '/#projects', label: t.nav.projects },
    { href: '/#experience', label: t.nav.experience },
    { href: '/#contact', label: t.nav.contact },
  ]

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))

    const onScroll = () => {
      // Edge case: at the very bottom of the page → last section wins
      const atBottom =
        window.innerHeight + Math.round(window.scrollY) >= document.body.scrollHeight - 2
      if (atBottom) {
        setActive(sections[sections.length - 1]?.id ?? '')
        return
      }

      // Active section = last one whose top has entered the first 100px below the viewport top.
      // Using a small fixed threshold prevents the next section from stealing active state
      // when the current section is shorter than a percentage-based trigger would require.
      let current = ''
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 100) {
          current = section.id
        }
      }
      if (current) setActive(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
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
          onComplete: () => {
            gsap.set(menu, { display: 'none' })
          },
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

  // Focus management: focus first item on open, restore to hamburger on close
  useEffect(() => {
    if (open) {
      wasOpenRef.current = true
      const timer = setTimeout(() => itemsRef.current[0]?.focus(), 50)
      return () => clearTimeout(timer)
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false
      hamburgerRef.current?.focus()
    }
  }, [open])

  // Tab trap inside mobile menu
  useEffect(() => {
    if (!open) return
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusable = itemsRef.current.filter(Boolean)
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
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

  const toggleLocale = () => setLocale(locale === 'es' ? 'en' : 'es')

  return (
    <>
      <nav
        aria-label={t.nav.mainNav}
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
        <div className="hidden lg:flex items-stretch overflow-x-auto">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setActive(href.slice(2))}
              aria-current={active === href.slice(2) ? 'page' : undefined}
              className={`flex items-center px-4 text-[13px] tracking-[0.22em] uppercase border-l border-border transition-colors whitespace-nowrap
                ${active === href.slice(2) ? 'text-coral' : 'text-muted hover:text-cream hover:bg-faint'}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center ml-auto lg:ml-0">
          {/* Disponible badge */}
          <div className="flex items-center gap-2 px-4 lg:px-5 border-l border-border h-full text-[12px] tracking-[0.15em] uppercase text-muted shrink-0">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
            />
            <span>{t.nav.available}</span>
          </div>

          {/* Language switcher */}
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={t.nav.langLabel}
            className="flex items-center px-3 lg:px-4 border-l border-border h-full text-[12px] tracking-[0.15em] uppercase text-muted hover:text-cream transition-colors shrink-0"
          >
            {t.nav.lang}
          </button>

          {/* Hamburger — mobile only */}
          <button
            ref={hamburgerRef}
            type="button"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-11 h-11 border-l border-border shrink-0 group"
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
        className="fixed inset-0 z-[997] bg-black/60 lg:hidden"
        style={{ opacity: 0, display: open ? 'block' : 'none' }}
      />

      {/* Mobile menu panel */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.mobileMenu}
        className="fixed top-11 left-0 right-0 z-[998] flex-col border-b border-border bg-black/95 backdrop-blur-sm lg:hidden"
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
            onClick={() => {
              setActive(href.slice(2))
              closeMenu()
            }}
            className={`flex items-center px-6 h-12 text-[13px] tracking-[0.22em] uppercase border-b border-border transition-colors
              ${active === href.slice(2) ? 'text-coral border-l-2 border-l-coral pl-[22px]' : 'text-muted hover:text-cream hover:bg-faint'}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  )
}
