'use client'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import { getDev, getFoundations } from '@/lib/skills'
import { useLanguage } from '@/lib/i18n/context'

export default function Skills() {
  const { locale, t } = useLanguage()
  const dev = getDev(locale)
  const foundations = getFoundations(locale)

  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-b border-border">
      <SectionHeader id="skills-heading" title={t.skills.title} number="02" />

      {/* Row 1: Desarrollo — 2 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
        {dev.map(({ n, name, desc }, i) => (
          <RevealOnScroll
            key={n}
            delay={i * 80}
            className={`skill-card px-6 py-8 md:px-8 md:py-10 relative overflow-hidden group hover:bg-faint transition-colors
              ${i === 0 ? 'border-b border-border md:border-b-0 md:border-r' : ''}`}
          >
            <span className="absolute top-[-10px] right-4 font-bebas text-[80px] text-faint leading-none pointer-events-none group-hover:text-coral transition-colors">
              {n}
            </span>
            <div className="w-6 h-0.5 bg-coral mb-4 transition-all duration-300 group-hover:w-10" />
            <h3 className="text-[13px] font-medium tracking-[0.08em] uppercase text-cream mb-2.5">
              {name}
            </h3>
            <p className="text-[14px] text-[var(--dim)] leading-[1.65]">{desc}</p>
          </RevealOnScroll>
        ))}
      </div>

      {/* Row 2: Foundations — 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {foundations.map(({ n, name, desc }, i) => (
          <RevealOnScroll
            key={n}
            delay={i * 80}
            className={`skill-card px-6 py-8 md:px-8 md:py-10 relative overflow-hidden group hover:bg-faint transition-colors
              ${i < 2 ? 'border-b border-border md:border-b-0 md:border-r' : ''}`}
          >
            <span className="absolute top-[-10px] right-4 font-bebas text-[80px] text-faint leading-none pointer-events-none group-hover:text-coral transition-colors">
              {n}
            </span>
            <div className="w-6 h-0.5 bg-coral mb-4 transition-all duration-300 group-hover:w-10" />
            <h3 className="text-[13px] font-medium tracking-[0.08em] uppercase text-cream mb-2.5">
              {name}
            </h3>
            <p className="text-[14px] text-[var(--dim)] leading-[1.65]">{desc}</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
