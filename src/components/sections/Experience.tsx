'use client'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import { getExperiences } from '@/lib/experience'
import { useLanguage } from '@/lib/i18n/context'

export default function Experience() {
  const { locale, t } = useLanguage()
  const experiences = getExperiences(locale)

  return (
    <section id="experience" aria-labelledby="experience-heading" className="border-b border-border">
      <SectionHeader id="experience-heading" title={t.experience.title} number="05" />

      <RevealOnScroll className="experience-card">
        <div className="p-6 md:p-10 lg:px-16">
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

            {/*
              Chronological rail. Entries stack top (most recent) to bottom, so
              time reads down a single axis instead of across two columns —
              which also frees each role to have as many highlights as it needs
              without leaving its neighbour with dead space.
            */}
            <div className="px-6 md:px-8 py-2 md:py-4">
              <div className="relative border-l border-border">
                <ol aria-label={t.experience.title}>
                  {experiences.map(
                    ({ slug, filename, role, company, period, description, stack, current }, i) => (
                      <li
                        key={slug}
                        className={`relative pl-6 md:pl-10 py-7 md:py-9 ${i > 0 ? 'border-t border-border' : ''}`}
                      >
                        {/* Timeline node — filled for the role still in progress */}
                        <span
                          aria-hidden="true"
                          className={`absolute left-0 top-[34px] md:top-[42px] -translate-x-1/2 w-[7px] h-[7px] ${
                            current ? 'bg-coral' : 'bg-dark border border-border'
                          }`}
                        />

                        <div className="grid gap-4 md:grid-cols-[minmax(0,200px)_minmax(0,1fr)] md:gap-10">
                          {/* Meta */}
                          <div className="flex flex-col gap-0.5 md:gap-1">
                            <p className="text-[12px] text-muted tracking-[0.08em]">
                              <span className="sr-only">{t.experience.period}: </span>
                              {period}
                              {current && <span className="sr-only"> ({t.experience.current})</span>}
                            </p>
                            <p className="text-[14px] text-cream font-medium tracking-[0.04em]">
                              {role}
                            </p>
                            <p className="text-[13px] text-muted">
                              <span aria-hidden="true" className="text-coral select-none">
                                @{' '}
                              </span>
                              {company}
                            </p>
                            <p
                              aria-hidden="true"
                              className="text-[12px] text-[var(--dim)] select-none mt-1 md:mt-2"
                            >
                              --- {filename}
                            </p>
                          </div>

                          {/* Highlights + stack */}
                          <div className="flex flex-col gap-4">
                            <ul
                              className="flex flex-col gap-1.5 max-w-[68ch]"
                              aria-label={`${company}, ${t.experience.highlights}`}
                            >
                              {description.map((line) => (
                                <li key={line} className="text-[13px] text-[var(--dim)] flex gap-2">
                                  <span
                                    aria-hidden="true"
                                    className="text-[var(--dim)] select-none shrink-0"
                                  >
                                    {'>'}
                                  </span>
                                  <span>{line}</span>
                                </li>
                              ))}
                            </ul>

                            <ul
                              aria-label={`${company}, ${t.experience.technologies}`}
                              className="flex flex-wrap gap-1.5"
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
                        </div>
                      </li>
                    )
                  )}
                </ol>

                {/* Rail terminator */}
                <div aria-hidden="true" className="relative pl-6 md:pl-10 pb-1 select-none">
                  <span className="absolute left-0 bottom-[9px] w-2 h-px bg-border" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
