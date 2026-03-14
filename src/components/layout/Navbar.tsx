'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const links = [
  { href: '#about',    label: 'Sobre mí' },
  { href: '#skills',   label: 'Servicios' },
  { href: '#projects', label: 'Trabajo' },
  { href: '#contact',  label: 'Contacto' },
]

export default function Navbar() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.4 }
    )
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] flex justify-between items-stretch h-11 border-b border-border bg-black/90 backdrop-blur-sm">
      <div className="px-5 flex items-center border-r border-border shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480.72 570" className="h-5 w-auto fill-cream">
          <path d="M272.09,388.45l2.28,115.33,110.69-2.19q-21.36,43.57-51.21,59.73t-67.13,16.9q-30.42.6-54.79-12.41l2.9,147a375.68,375.68,0,0,0,54.6,2.81q108.69-2.15,174.62-80.13l1.26,63.89,111.35-2.2L550.47,383Z" transform="translate(-75.94 -145.65)" />
          <path d="M466.76,214Q385,145.66,242.69,145.65H228.22V276.34q43,1.5,72.17,12,34,12.27,52.56,45.05a102.93,102.93,0,0,1,5,10.26H540.38Q522.7,260.81,466.76,214Z" transform="translate(-75.94 -145.65)" />
          <polygon points="175.12 437.81 175.12 131.34 171.32 131.34 171.32 0 0 0 0 569.15 171.32 569.15 171.32 437.81 175.12 437.81" />
        </svg>
      </div>

      {/* Links — ocultos en móvil */}
      <div className="hidden md:flex items-stretch overflow-x-auto">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center px-4 text-[9px] tracking-[0.22em] uppercase border-l border-border transition-colors whitespace-nowrap
              ${active === href.slice(1) ? 'text-coral' : 'text-muted hover:text-cream hover:bg-faint'}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 px-4 md:px-5 border-l border-border text-[8px] tracking-[0.15em] uppercase text-muted ml-auto md:ml-0 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span>Disponible</span>
      </div>
    </nav>
  )
}
