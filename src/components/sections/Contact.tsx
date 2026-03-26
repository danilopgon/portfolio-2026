'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { Label } from '@/components/ui/Label'
import { contactSchema, type ContactFormData } from '@/lib/schemas/contact'

const inputClass =
  'bg-transparent border-b border-border py-2 px-2 text-[12px] text-cream placeholder:text-[#555] outline-none focus:border-coral transition-colors font-mono w-full'

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  async function onSubmit(data: ContactFormData) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
      if (res.ok) {
        toast.success('Mensaje enviado.', { description: 'Te escribo pronto.' })
        reset()
      } else {
        toast.error('Error al enviar.', { description: 'Prueba por email directamente.' })
      }
    } catch {
      toast.error('Error de red.')
    }
  }

  return (
    <section id="contact" className="border-b border-border">
      <div className="flex justify-between items-center px-6 py-4 md:px-16 md:py-5 border-b border-border">
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted before:content-['//'] before:text-coral before:mr-2">
          Contacto
        </span>
        <span className="font-bebas text-[11px] text-border tracking-[0.1em]">04</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <RevealOnScroll className="px-6 py-10 md:px-16 md:py-16 flex flex-col border-b border-border lg:border-b-0 lg:border-r">
          <h2 className="font-bebas text-[clamp(48px,6vw,80px)] leading-[0.9] text-cream mb-6">
            Hablemos.
          </h2>
          <p className="text-[11px] text-[#a0a0a0] leading-[1.7] mb-10 max-w-xs">
            Proyectos, colaboraciones, ideas a medio terminar. Si tiene sentido, lo construimos.
          </p>
          <div className="mt-auto flex flex-col gap-3">
            {[
              {
                icon: '✉',
                text: 'contacto@danilopgon.com',
                href: 'mailto:contacto@danilopgon.com',
              },
              { icon: '☎', text: '+34 685 014 718', href: 'tel:+34685014718' },
              { icon: '◎', text: 'Cuenca, España', href: undefined },
            ].map(({ icon, text, href }) => {
              const cls =
                'flex items-center gap-3 text-[10px] text-muted hover:text-cream transition-colors group'
              const inner = (
                <>
                  <span className="w-7 h-7 border border-border flex items-center justify-center group-hover:bg-coral group-hover:border-coral group-hover:text-black transition-all shrink-0">
                    {icon}
                  </span>
                  {text}
                </>
              )
              return href ? (
                <a key={text} href={href} className={cls}>
                  {inner}
                </a>
              ) : (
                <span key={text} className={cls}>
                  {inner}
                </span>
              )
            })}
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="px-6 py-10 md:px-16 md:py-16" delay={100}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nombre</Label>
              <input
                id="name"
                type="text"
                placeholder="Tu nombre"
                {...register('name')}
                className={inputClass}
              />
              {errors.name && <span className="text-[10px] text-coral">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                {...register('email')}
                className={inputClass}
              />
              {errors.email && (
                <span className="text-[10px] text-coral">{errors.email.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Mensaje</Label>
              <textarea
                id="message"
                placeholder="Cuéntame..."
                rows={4}
                {...register('message')}
                className={`${inputClass} resize-none`}
              />
              {errors.message && (
                <span className="text-[10px] text-coral">{errors.message.message}</span>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 bg-coral text-black font-mono text-[11px] font-medium tracking-[0.22em] uppercase px-6 py-3.5 border border-coral hover:bg-cream hover:border-cream transition-colors flex justify-between items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? 'Enviando...' : 'Enviar mensaje'}</span>
              <span>→</span>
            </button>
          </form>
        </RevealOnScroll>
      </div>
    </section>
  )
}
