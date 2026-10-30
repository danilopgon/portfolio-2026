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
  'bg-transparent border-b border-muted py-3 px-2 text-[14px] text-cream placeholder:text-muted outline-none focus:border-coral transition-colors font-mono w-full'

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
        number="06"
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
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" />
                    <path d="m3 6 9 7 9-7" />
                  </svg>
                ),
                text: 'contacto@danilopgon.com',
                href: 'mailto:contacto@danilopgon.com',
              },
              {
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1" />
                  </svg>
                ),
                text: '+34 685 014 718',
                href: 'tel:+34685014718',
              },
              {
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                ),
                text: t.contact.location,
                href: undefined,
              },
            ].map(({ icon, text, href }) => {
              const cls =
                'flex items-center gap-3 text-[14px] text-muted hover:text-cream transition-colors group'
              const inner = (
                <>
                  <span className="w-7 h-7 border border-border flex items-center justify-center group-hover:bg-coral group-hover:border-coral group-hover:text-black transition-colors shrink-0">
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
              className="mt-2 bg-coral text-black font-mono text-[15px] font-medium px-6 py-3.5 border border-coral hover:bg-cream hover:border-cream transition-colors flex justify-between items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? t.contact.submitting : t.contact.submit}</span>
            </button>
          </form>
        </RevealOnScroll>
      </div>
    </section>
  )
}
