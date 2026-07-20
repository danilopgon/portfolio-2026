'use client'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/context'
import { getProjects } from '@/lib/projects'

type Props = {
  slug: string
}

/**
 * Shared presentational piece rendering a project's detail content.
 * Used by both the deep-link page (`/proyectos/[slug]`) and the intercepted
 * modal route, so the two entry points never diverge in markup or copy.
 *
 * Resolves the project client-side via `useLanguage()` + `getProjects()`,
 * mirroring the rest of the site's locale pattern (SSR defaults to `es`,
 * then swaps on hydration once the stored/detected locale is known).
 */
export default function ProjectDetailContent({ slug }: Props) {
  const { locale, t } = useLanguage()
  const project = getProjects(locale).find((p) => p.slug === slug)

  if (!project) return null

  const { name, description, process, year, tags, image, url } = project

  return (
    <div className="flex flex-col">
      {image && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-col px-6 py-8 md:px-10 md:py-10 gap-4">
        <span className="text-[12px] tracking-[0.2em] uppercase text-muted">{year}</span>

        <h1
          id={`project-title-${slug}`}
          className="font-bebas text-[40px] md:text-[52px] tracking-[0.02em] text-cream leading-none"
        >
          {name}
        </h1>

        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[12px] px-1.5 py-0.5 border border-faint text-muted tracking-[0.1em]"
            >
              {tag}
            </span>
          ))}
        </div>

        <p data-testid="project-description" className="text-[15px] text-muted leading-relaxed">
          {description}
        </p>

        {process && (
          <div data-testid="project-process" className="flex flex-col gap-2">
            <h2 className="text-[13px] tracking-[0.2em] uppercase text-cream">
              {t.projectModal.process}
            </h2>
            <p className="text-[15px] text-muted leading-relaxed">{process}</p>
          </div>
        )}

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start bg-coral text-black font-mono text-[13px] font-medium tracking-[0.22em] uppercase px-7 py-3 border border-coral hover:bg-cream hover:border-cream transition-colors mt-2"
          >
            {t.projectModal.visitSite}
          </a>
        )}
      </div>
    </div>
  )
}
