import Image from 'next/image'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import Ticker from '@/components/ui/Ticker'
import { projects } from '@/lib/projects'

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-b border-border">
      <div className="flex justify-between items-center px-6 py-4 md:px-16 md:py-5 border-b border-border">
        <h2
          id="projects-heading"
          className="text-[12px] tracking-[0.3em] uppercase text-muted font-normal"
        >
          <span aria-hidden="true" className="text-coral mr-2">
            {"//"}
          </span>
          Trabajo seleccionado
        </h2>
        <span aria-hidden="true" className="font-bebas text-[13px] text-muted tracking-[0.1em]">
          03
        </span>
      </div>

      <Ticker className="border-b border-border h-12 bg-dark">
        {Array.from({ length: 10 }).map((_, j) => (
          <div key={j} className="flex items-center h-12">
            <span
              className="font-bebas text-[28px] tracking-[0.04em] px-6 text-cream"
              style={{ lineHeight: 1 }}
            >
              PROYECTOS
            </span>
            <span className="font-bebas text-[20px] text-coral px-1" style={{ lineHeight: 1 }}>
              ·
            </span>
          </div>
        ))}
      </Ticker>

      {/* Bento grid: columna grande izquierda + 2 apiladas derecha en desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {projects.map(({ slug, name, description, year, tags, gradient, image, url }, i) => {
          const isLarge = i === 0
          const borderCls = isLarge
            ? 'border-b lg:border-b-0 lg:border-r border-border'
            : i === 1
              ? 'border-b border-border'
              : ''

          const Wrapper = url ? 'a' : 'div'
          const wrapperProps = url
            ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
            : {}

          return (
            <RevealOnScroll
              key={slug}
              delay={i * 80}
              className={`project-card group overflow-hidden flex flex-col ${borderCls} ${isLarge ? 'lg:row-span-2' : ''} ${url ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <Wrapper className="flex flex-col flex-1" {...wrapperProps}>
                {/* Thumb */}
                <div
                  className={`relative overflow-hidden ${isLarge ? 'h-[320px] lg:flex-1 lg:min-h-[300px]' : 'h-[280px]'}`}
                >
                  {image ? (
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-[1.03] [filter:grayscale(0.65)_saturate(0.5)] group-hover:[filter:grayscale(0.2)_saturate(1.1)]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${gradient} transition-transform duration-500 group-hover:scale-[1.03]`}
                    />
                  )}
                  {/* dark desaturate overlay */}
                  <div className="absolute inset-0 bg-black/55 mix-blend-multiply" />
                  {/* gradient shadow top for label legibility */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
                  {/* hatch overlay */}
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.012)_20px,rgba(255,255,255,0.012)_21px)]" />
                  {/* hover line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  <span className="absolute top-4 left-4 text-[12px] tracking-[0.2em] uppercase text-white/40 z-10">
                    {year}
                  </span>
                </div>
                {/* Info */}
                <div className="flex justify-between items-end px-6 py-5 border-t border-border shrink-0">
                  <div>
                    <h3 className="font-bebas text-[24px] tracking-[0.04em] text-cream mb-1.5 leading-none">
                      {name}
                    </h3>
                    <p className="text-[13px] text-muted mb-2.5 leading-relaxed pr-6">
                      {description}
                    </p>
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
                  </div>
                  {url && (
                    <span
                      aria-hidden="true"
                      className="text-[18px] text-border group-hover:text-coral group-hover:translate-x-1 group-hover:-translate-y-1 transition-all leading-none pb-0.5 shrink-0 ml-4"
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
