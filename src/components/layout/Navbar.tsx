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
      <div className="font-bebas text-xl tracking-[0.12em] text-cream px-6 flex items-center border-r border-border">
        DLG<span className="text-coral">_</span>
      </div>
      <div className="flex items-stretch">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center px-4 text-[9px] tracking-[0.22em] uppercase border-l border-border transition-colors
              ${active === href.slice(1) ? 'text-coral' : 'text-muted hover:text-cream hover:bg-faint'}`}
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2 px-5 border-l border-border text-[8px] tracking-[0.15em] uppercase text-muted">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        Disponible
      </div>
    </nav>
  )
}
