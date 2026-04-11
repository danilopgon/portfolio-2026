'use client'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import { getExperiences } from '@/lib/experience'
import { useLanguage } from '@/lib/i18n/context'

export default function Experience() {
  const { locale, t } = useLanguage()
  const experiences = getExperiences(locale)

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-b border-border min-h-[55vh] flex flex-col"
    >
      <SectionHeader id="experience-heading" title={t.experience.title} number="04" />

      <RevealOnScroll className="experience-card flex-1 flex items-center">
        <div className="p-6 md:p-10 lg:px-16 w-full">
          {/* Terminal body */}
          <div className="bg-dark border border-border">
            {/* Command line — decorative, hidden from screen readers */}
            <div
              aria-hidden="true"
              className="flex items-center gap-1.5 text-[13px] px-6 md:px-8 py-4 border-b border-border"
            >
              <span className="text-coral select-none">$</span>
              <span className="text-muted">cat</span>
              <span className="text-cream">experience.log</span>
              <span className="terminal-cursor inline-block w-[7px] h-[13px] bg-coral ml-0.5 align-text-bottom" />
            </div>

            {/* Split pane output */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {experiences.map(
                ({ slug, filename, role, company, period, description, stack }, i) => (
                  <div
                    key={slug}
                    className={`px-6 md:px-8 py-6 md:py-8 flex flex-col gap-3 ${i === 0 ? 'border-b md:border-b-0 md:border-r border-border' : ''}`}
                  >
                    {/* Filename separator — decorative */}
                    <div aria-hidden="true" className="text-[12px] text-border select-none">
                      --- {filename}
                    </div>

                    {/* Role & company */}
                    <div className="flex flex-col gap-0.5">
                      <p className="text-[14px] text-cream font-medium tracking-[0.04em]">{role}</p>
                      <p className="text-[13px] text-muted">
                        <span aria-hidden="true" className="text-coral select-none">
                          @{' '}
                        </span>
                        {company}
                      </p>
                      <p className="text-[12px] text-muted tracking-[0.08em]">
                        <span className="sr-only">{t.experience.period}: </span>
                        {period}
                      </p>
                    </div>

                    {/* Description lines */}
                    <ul
                      className="flex flex-col gap-1.5"
                      aria-label={`${company} — ${t.experience.highlights}`}
                    >
                      {description.map((line) => (
                        <li key={line} className="text-[13px] text-[var(--dim)] flex gap-2">
                          <span aria-hidden="true" className="text-border select-none shrink-0">
                            {'>'}
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Stack tags */}
                    <ul
                      aria-label={`${company} — ${t.experience.technologies}`}
                      className="flex flex-wrap gap-1.5 pt-1"
                    >
                      {stack.map((tag) => (
                        <li
                          key={tag}
                          className="text-[12px] px-1.5 py-0.5 border border-faint text-muted tracking-[0.1em]"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
