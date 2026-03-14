import RevealOnScroll from '@/components/ui/RevealOnScroll'

const skills = [
  { n: '01', name: 'Front-end', color: 'bg-coral', desc: 'Interfaces accesibles, reactivas y con intención. Angular, React, Next.js. Sistemas de diseño, motion, rendimiento y arquitectura de componentes.' },
  { n: '02', name: 'Back-end',  color: 'bg-teal-500', desc: 'APIs con Node.js, NestJS y .NET. Infraestructura con Supabase, AWS y Docker/Coolify. Del modelo de datos al despliegue.' },
  { n: '03', name: 'UX / UI',   color: 'bg-yellow-400', desc: 'Prototipado en Figma hasta implementación final. Sistemas de diseño, accesibilidad y experiencia de usuario como parte del proceso técnico.' },
  { n: '04', name: 'Narrativa digital', color: 'bg-purple-500', desc: 'Background en periodismo y producción de contenido. El contexto que distingue un developer con criterio de uno sin él.' },
]

export default function Skills() {
  return (
    <section id="skills" className="border-b border-border">
      <div className="flex justify-between items-center px-16 py-5 border-b border-border">
        <span className="text-[8px] tracking-[0.3em] uppercase text-muted before:content-['//'] before:text-coral before:mr-2">Lo que hago</span>
        <span className="font-bebas text-[11px] text-border tracking-[0.1em]">02</span>
      </div>
      <div className="grid grid-cols-4">
        {skills.map(({ n, name, color, desc }, i) => (
          <RevealOnScroll
            key={n}
            delay={i * 80}
            className={`px-8 py-9 relative overflow-hidden group hover:bg-faint transition-colors ${i < 3 ? 'border-r border-border' : ''}`}
          >
            {/* número decorativo */}
            <span className="absolute top-[-10px] right-4 font-bebas text-[80px] text-faint leading-none pointer-events-none group-hover:text-[#1e1e1c] transition-colors">
              {n}
            </span>
            <div className={`w-6 h-0.5 ${color} mb-4 transition-all duration-300 group-hover:w-10`} />
            <h3 className="text-[11px] font-medium tracking-[0.08em] uppercase text-cream mb-2.5">{name}</h3>
            <p className="text-[10px] text-muted leading-[1.65]">{desc}</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
