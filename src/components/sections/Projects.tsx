import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { projects } from '@/lib/projects'

export default function Projects() {
  return (
    <section id="projects" className="border-b border-border">
      <div className="flex justify-between items-center px-6 py-4 md:px-16 md:py-5 border-b border-border">
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted before:content-['//'] before:text-coral before:mr-2">Trabajo seleccionado</span>
        <span className="font-bebas text-[11px] text-border tracking-[0.1em]">03</span>
      </div>

      {/* Ticker */}
      <div className="overflow-hidden border-b border-border h-12 flex items-center bg-dark">
        <div className="flex animate-[ticker_22s_linear_infinite] whitespace-nowrap">
          {[0, 1].map(i => (
            <span key={i} className="flex items-center shrink-0">
              {Array.from({ length: 8 }).flatMap((_, j) => [
                <span key={`${i}-${j}`} className="font-bebas text-[28px] tracking-[0.04em] px-6 text-cream">PROYECTOS</span>,
                <span key={`${i}-sep-${j}`} className="font-bebas text-[20px] text-coral px-2">·</span>,
              ])}
            </span>
          ))}
        </div>
      </div>

      {/* Bento grid: columna grande izquierda + 2 apiladas derecha en desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {projects.map(({ slug, name, type, year, tags, gradient }, i) => {
          const isLarge = i === 0
          const borderCls = isLarge
            ? 'border-b lg:border-b-0 lg:border-r border-border'
            : i === 1 ? 'border-b border-border' : ''

          return (
            <RevealOnScroll
              key={slug}
              delay={i * 80}
              className={`project-card group cursor-pointer overflow-hidden flex flex-col ${borderCls} ${isLarge ? 'lg:row-span-2' : ''}`}
            >
              {/* Thumb */}
              <div className={`relative overflow-hidden ${isLarge ? 'h-[260px] lg:flex-1 lg:min-h-[200px]' : 'h-[200px]'}`}>
                <div className={`w-full h-full bg-gradient-to-br ${gradient} transition-transform duration-500 group-hover:scale-[1.03]`} />
                {/* hatch overlay */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.012)_20px,rgba(255,255,255,0.012)_21px)]" />
                {/* hover line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                <span className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase text-white/40 z-10">
                  {type} · {year}
                </span>
              </div>
              {/* Info */}
              <div className="flex justify-between items-end px-6 py-5 border-t border-border shrink-0">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-1">{type}</p>
                  <h3 className="font-bebas text-[24px] tracking-[0.04em] text-cream mb-2.5 leading-none">{name}</h3>
                  <div className="flex flex-wrap gap-1">
                    {tags.map(tag => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 border border-faint text-muted tracking-[0.1em]">{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="text-[18px] text-border group-hover:text-coral group-hover:translate-x-1 group-hover:-translate-y-1 transition-all leading-none pb-0.5 shrink-0 ml-4">
                  ↗
                </span>
              </div>
            </RevealOnScroll>
          )
        })}
      </div>
    </section>
  )
}
