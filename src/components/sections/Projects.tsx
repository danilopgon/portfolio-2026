'use client'
import Image from 'next/image'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import BalancedChips from '@/components/ui/BalancedChips'
import DitherImage from '@/components/ui/DitherImage'
import { getProjects } from '@/lib/projects'
import { useLanguage } from '@/lib/i18n/context'

export default function Projects() {
  const { locale, t } = useLanguage()
  const projects = getProjects(locale)

  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-b border-border">
      <SectionHeader id="projects-heading" title={t.projects.title} number="03" />

      {/* Bento grid: columna grande izquierda + 2 apiladas derecha en desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {projects.map(({ slug, name, description, tags, gradient, image, url }, i) => {
          const isLeftCol = i % 2 === 0
          const isTopRow = i < 2
          const isLastMobile = i === projects.length - 1
          const borderCls = [
            'border-border',
            !isLastMobile ? 'border-b' : '',
            isTopRow ? 'lg:border-b' : 'lg:border-b-0',
            isLeftCol ? 'lg:border-r' : '',
          ]
            .filter(Boolean)
            .join(' ')

          const Wrapper = url ? 'a' : 'div'
          const wrapperProps = url
            ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
            : {}

          return (
            <RevealOnScroll
              key={slug}
              delay={i * 80}
              className={`project-card group overflow-hidden flex flex-col ${borderCls} ${url ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <Wrapper className="flex flex-col flex-1" {...wrapperProps}>
                {/* Thumb */}
                <div className="relative overflow-hidden h-[300px] lg:h-[380px]">
                  {image ? (
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${gradient} transition-transform duration-500 group-hover:scale-[1.03]`}
                    />
                  )}
                  {/* The same loupe as the hero: the capture stays sharp and
                      prints as a dither only under the pointer. */}
                  {image && <DitherImage src={image} hostSelector=".project-card" radius={120} />}
                  {/* hover line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </div>
                {/* Info */}
                <div className="flex justify-between items-start px-6 py-8 md:px-10 border-t border-border shrink-0">
                  <div>
                    <h3 className="font-bebas font-normal text-[40px] text-cream mb-3 leading-none">
                      {name}
                    </h3>
                    <p className="text-[17px] text-[var(--dim)] mb-4 leading-[1.6] pr-6 max-w-[60ch]">
                      {description}
                    </p>
                    <BalancedChips className="flex flex-wrap gap-1">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[14px] px-2 py-0.5 border border-border text-[var(--dim)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </BalancedChips>
                  </div>
                  {url && (
                    <span
                      aria-hidden="true"
                      className="text-[18px] text-border group-hover:text-coral group-hover:translate-x-1 group-hover:-translate-y-1 transition-[color,transform] leading-none pb-0.5 shrink-0 ml-4"
                    >
                      ↗
                    </span>
                  )}
                </div>
              </Wrapper>
            </RevealOnScroll>
          )
        })}
      </div>
    </section>
  )
}
