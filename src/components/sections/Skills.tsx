import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { dev, foundations } from '@/lib/skills'

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-b border-border">
      <div className="flex justify-between items-center px-6 py-4 md:px-16 md:py-5 border-b border-border">
        <h2
          id="skills-heading"
          className="text-[12px] tracking-[0.3em] uppercase text-muted font-normal"
        >
          <span aria-hidden="true" className="text-coral mr-2">//</span>
          Lo que hago
        </h2>
        <span aria-hidden="true" className="font-bebas text-[13px] text-muted tracking-[0.1em]">02</span>
      </div>

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
