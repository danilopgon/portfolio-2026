import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { projects } from '@/lib/projects'

export default function Projects() {
  return (
    <section id="projects" className="border-b border-border">
      <div className="flex justify-between items-center px-16 py-5 border-b border-border">
        <span className="text-[8px] tracking-[0.3em] uppercase text-muted before:content-['//'] before:text-coral before:mr-2">Trabajo seleccionado</span>
        <span className="font-bebas text-[11px] text-border tracking-[0.1em]">03</span>
      </div>
      <div className="grid grid-cols-2">
        {projects.map(({ slug, name, type, year, tags, gradient, url }, i) => (
          <RevealOnScroll
            key={slug}
            delay={i % 2 === 0 ? 0 : 100}
            className={`group cursor-pointer overflow-hidden
              ${i % 2 === 0 ? 'border-r border-border' : ''}
              ${i < 2 ? 'border-b border-border' : ''}`}
          >
            {/* Thumb */}
            <div className="h-[200px] relative overflow-hidden">
              <div className={`w-full h-full bg-gradient-to-br ${gradient} transition-transform duration-500 group-hover:scale-[1.03]`} />
              {/* hatch overlay */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.012)_20px,rgba(255,255,255,0.012)_21px)]" />
              {/* hover line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              <span className="absolute top-4 left-4 text-[8px] tracking-[0.2em] uppercase text-white/40 z-10">
                {type} · {year}
              </span>
            </div>
            {/* Info */}
            <div className="flex justify-between items-end px-6 py-5 border-t border-border">
              <div>
                <p className="text-[8px] tracking-[0.2em] uppercase text-muted mb-1">{type}</p>
                <h3 className="font-bebas text-[24px] tracking-[0.04em] text-cream mb-2.5 leading-none">{name}</h3>
                <div className="flex flex-wrap gap-1">
                  {tags.map(tag => (
                    <span key={tag} className="text-[7px] px-1.5 py-0.5 border border-faint text-muted tracking-[0.1em]">{tag}</span>
                  ))}
                </div>
              </div>
              <span className="text-[18px] text-border group-hover:text-coral group-hover:translate-x-1 group-hover:-translate-y-1 transition-all leading-none pb-0.5">
                ↗
              </span>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
