'use client'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import { Label } from '@/components/ui/Label'
import { makeContactSchema, type ContactFormData } from '@/lib/schemas/contact'
import { useLanguage } from '@/lib/i18n/context'

const inputClass =
  'bg-transparent border-b border-border py-2 px-2 text-[14px] text-cream placeholder:text-[#777] outline-none focus:border-coral transition-colors font-mono w-full'

export default function Contact() {
  const { locale, t } = useLanguage()
  const schema = useMemo(() => makeContactSchema(t.validation), [t.validation])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    reset()
  }, [locale, reset])

  async function onSubmit(data: ContactFormData) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
      if (res.ok) {
        toast.success(t.contact.successTitle, { description: t.contact.successDesc })
        reset()
      } else {
        toast.error(t.contact.errorTitle, { description: t.contact.errorDesc })
      }
    } catch {
      toast.error(t.contact.errorNetwork)
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-b border-border">
      <SectionHeader
        id="contact-heading"
        title={t.contact.title}
        number="05"
        numberClass="text-[15px]"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <RevealOnScroll className="px-6 py-10 md:px-16 md:py-16 flex flex-col border-b border-border lg:border-b-0 lg:border-r">
          <p className="font-bebas text-[clamp(48px,6vw,80px)] leading-[0.9] text-cream mb-6">
            {t.contact.heading}
          </p>
          <p className="text-[15px] text-[var(--dim)] leading-[1.7] mb-10 max-w-xs">
            {t.contact.description}
          </p>
          <div className="mt-auto flex flex-col gap-3">
            {[
              {
                icon: '✉',
                text: 'contacto@danilopgon.com',
                href: 'mailto:contacto@danilopgon.com',
              },
              { icon: '☎', text: '+34 685 014 718', href: 'tel:+34685014718' },
              { icon: '◎', text: t.contact.location, href: undefined },
            ].map(({ icon, text, href }) => {
              const cls =
                'flex items-center gap-3 text-[14px] text-muted hover:text-cream transition-colors group'
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
              <Label htmlFor="name">{t.contact.name}</Label>
              <input
                id="name"
                type="text"
                placeholder={t.contact.namePlaceholder}
                {...register('name')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={inputClass}
              />
              {errors.name && (
                <span id="name-error" role="alert" className="text-[14px] text-coral">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{t.contact.email}</Label>
              <input
                id="email"
                type="email"
                placeholder={t.contact.emailPlaceholder}
                {...register('email')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={inputClass}
              />
              {errors.email && (
                <span id="email-error" role="alert" className="text-[14px] text-coral">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="message">{t.contact.message}</Label>
              <textarea
                id="message"
                placeholder={t.contact.messagePlaceholder}
                rows={4}
                {...register('message')}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`${inputClass} resize-none`}
              />
              {errors.message && (
                <span id="message-error" role="alert" className="text-[14px] text-coral">
                  {errors.message.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 bg-coral text-black font-mono text-[15px] font-medium tracking-[0.22em] uppercase px-6 py-3.5 border border-coral hover:bg-cream hover:border-cream transition-colors flex justify-between items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? t.contact.submitting : t.contact.submit}</span>
              <span aria-hidden="true">→</span>
            </button>
          </form>
        </RevealOnScroll>
      </div>
    </section>
  )
}
