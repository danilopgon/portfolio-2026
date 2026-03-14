'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { Label } from '@/components/ui/Label'

const inputClass = 'bg-transparent border-b border-[#2a2a28] pb-2 text-[12px] text-[#f0ede8] placeholder:text-[#2a2a28] outline-none focus:border-[#f55033] transition-colors font-mono w-full'

export default function Contact() {
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
      if (res.ok) {
        toast.success('Mensaje enviado.', { description: 'Te escribo pronto.' })
        ;(e.target as HTMLFormElement).reset()
      } else {
        toast.error('Error al enviar.', { description: 'Prueba por email directamente.' })
      }
    } catch {
      toast.error('Error de red.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="border-b border-[#2a2a28]">
      <div className="flex justify-between items-center px-16 py-5 border-b border-[#2a2a28]">
        <span className="text-[8px] tracking-[0.3em] uppercase text-[#4a4a47] before:content-['//'] before:text-[#f55033] before:mr-2">Contacto</span>
        <span className="font-bebas text-[11px] text-[#2a2a28] tracking-[0.1em]">04</span>
      </div>

      <div className="grid grid-cols-2">
        <RevealOnScroll className="px-16 py-16 flex flex-col border-r border-[#2a2a28]">
          <h2 className="font-bebas text-[clamp(48px,6vw,80px)] leading-[0.9] text-[#f0ede8] mb-6">
            Hable<span className="text-[#f55033]">mos.</span>
          </h2>
          <p className="text-[11px] text-[#4a4a47] leading-[1.7] mb-10 max-w-xs">
            Proyectos, colaboraciones, ideas a medio terminar. Si tiene sentido construirlo, aquí estoy.
          </p>
          <div className="mt-auto flex flex-col gap-3">
            {[
              { icon: '✉', text: 'contacto@danilopgon.com', href: 'mailto:contacto@danilopgon.com' },
              { icon: '☎', text: '+34 685 014 718',          href: 'tel:+34685014718' },
            ].map(({ icon, text, href }) => (
              <a key={text} href={href}
                className="flex items-center gap-3 text-[10px] text-[#4a4a47] hover:text-[#f0ede8] transition-colors group">
                <span className="w-7 h-7 border border-[#2a2a28] flex items-center justify-center group-hover:bg-[#f55033] group-hover:border-[#f55033] group-hover:text-[#0c0c0b] transition-all">
                  {icon}
                </span>
                {text}
              </a>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="px-16 py-16" delay={100}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nombre</Label>
              <input id="name" name="name" type="text" placeholder="Tu nombre" required className={inputClass} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <input id="email" name="email" type="email" placeholder="tu@email.com" required className={inputClass} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Mensaje</Label>
              <textarea id="message" name="message" placeholder="Cuéntame..." required rows={4}
                className={`${inputClass} resize-none`} />
            </div>
            <button type="submit" disabled={sending}
              className="mt-2 bg-[#f55033] text-[#0c0c0b] font-mono text-[9px] font-medium tracking-[0.22em] uppercase px-6 py-3.5 border border-[#f55033] hover:bg-[#f0ede8] hover:border-[#f0ede8] transition-colors flex justify-between items-center disabled:opacity-50 disabled:cursor-not-allowed">
              <span>{sending ? 'Enviando...' : 'Enviar mensaje'}</span>
              <span>→</span>
            </button>
          </form>
        </RevealOnScroll>
      </div>
    </section>
  )
}
