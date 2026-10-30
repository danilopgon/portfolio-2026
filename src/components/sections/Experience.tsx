'use client'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import BalancedChips from '@/components/ui/BalancedChips'
import type { Experience as ExperienceEntry } from '@/lib/experience'
import { useLanguage } from '@/lib/i18n/context'
import type { Locale } from '@/lib/i18n/translations'

export default function Experience({
  experiencesByLocale,
}: {
  experiencesByLocale: Record<Locale, ExperienceEntry[]>
}) {
  const { locale, t } = useLanguage()
  const experiences = experiencesByLocale[locale]

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-b border-border"
    >
      <SectionHeader id="experience-heading" title={t.experience.title} number="05" />

      <RevealOnScroll className="experience-card">
        <div className="px-6 py-10 md:px-16 md:py-14">
          {/* The source of the whole section, as the command that fetches it:
              every role below comes from the Markdown this returns. */}
          <p className="font-mono text-[15px] mb-10 break-all">
            <span aria-hidden="true" className="text-muted select-none">
              ${' '}
            </span>
            <a
              href="/career.md"
              type="text/markdown"
              className="text-cream underline decoration-border underline-offset-4 hover:decoration-coral focus-visible:decoration-coral transition-colors"
            >
              <span className="sr-only">{t.experience.fullCareerMd}: </span>
              curl danilopgon.com/career.md
            </a>
            <span
              aria-hidden="true"
              className="caret inline-block w-[0.6em] h-[1.1em] ml-2 align-text-bottom bg-coral"
            />
          </p>
          {/*
            Chronological rail. Entries stack top (most recent) to bottom, so
            time reads down a single axis instead of across two columns —
            which also frees each role to have as many highlights as it needs
            without leaving its neighbour with dead space.
          */}
          <div className="relative border-l border-border">
            <ol aria-label={t.experience.title}>
              {experiences.map(
                ({ slug, role, company, period, description, stack, current }, i) => (
                  <li
                    key={slug}
                    className={`relative pl-6 md:pl-12 py-10 md:py-12 ${i > 0 ? 'border-t border-border' : ''}`}
                  >
                    {/* Timeline node — filled for the role still in progress */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-[52px] md:top-[60px] -translate-x-1/2 w-[9px] h-[9px] ${
                        current ? 'bg-coral' : 'bg-black border border-[var(--dim)]'
                      }`}
                    />

                    <div className="grid gap-5 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:gap-12">
                      {/* Meta */}
                      <div className="flex flex-col gap-1.5">
                        <p className="text-[15px] text-muted">
                          <span className="sr-only">{t.experience.period}: </span>
                          {period}
                          {current && <span className="sr-only"> ({t.experience.current})</span>}
                        </p>
                        <p className="font-bebas text-[32px] leading-none text-cream">{role}</p>
                        <p className="text-[17px] text-[var(--dim)]">{company}</p>
                      </div>

                      {/* Highlights + stack */}
                      <div className="flex flex-col gap-5">
                        <ul
                          className="flex flex-col gap-2.5 max-w-[68ch] list-disc pl-5 marker:text-coral"
                          aria-label={`${company}, ${t.experience.highlights}`}
                        >
                          {description.map((line) => (
                            <li key={line} className="text-[17px] leading-[1.55] text-[var(--dim)]">
                              {line}
                            </li>
                          ))}
                        </ul>

                        <BalancedChips
                          as="ul"
                          aria-label={`${company}, ${t.experience.technologies}`}
                          className="flex flex-wrap gap-1.5"
                        >
                          {stack.map((tag) => (
                            <li
                              key={tag}
                              className="text-[14px] px-2 py-0.5 border border-border text-[var(--dim)]"
                            >
                              {tag}
                            </li>
                          ))}
                        </BalancedChips>
                      </div>
                    </div>
                  </li>
                )
              )}
            </ol>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
