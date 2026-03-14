import RevealOnScroll from '@/components/ui/RevealOnScroll'

const stack = ['TypeScript', 'Angular', 'React', 'Next.js', 'Node.js', '.NET', 'UX/UI', 'Figma', 'GSAP']

export default function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="flex justify-between items-center px-16 py-5 border-b border-border">
        <span className="text-[8px] tracking-[0.3em] uppercase text-muted before:content-['//'] before:text-coral before:mr-2">Sobre mí</span>
        <span className="font-bebas text-[11px] text-border tracking-[0.1em]">01</span>
      </div>
      <div className="grid grid-cols-2">
        <RevealOnScroll className="px-16 py-12 border-r border-border space-y-4">
          <p className="text-[13px] text-[#888] leading-[1.8]">
            Developer con base en <strong className="text-cream font-medium">Angular, React y Next.js</strong> en el front, y Node.js y .NET en el back.
            Trabajo en el diseño de sistemas de componentes, arquitectura de aplicaciones y en la capa donde
            el código y la experiencia de usuario se tienen que entender.
          </p>
          <p className="text-[13px] text-[#888] leading-[1.8]">
            Antes de programar, trabajé en <strong className="text-cream font-medium">comunicación digital y producción de contenido</strong>.
            Tengo un máster en narrativa transmedia — la coherencia que convierte un producto funcional en uno memorable.
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="px-12 py-12 flex flex-col gap-8" delay={100}>
          <div>
            <p className="text-[8px] tracking-[0.25em] uppercase text-coral mb-3">Stack técnico</p>
            <div className="flex flex-wrap gap-1.5">
              {stack.map(tag => (
                <span key={tag} className="text-[9px] tracking-[0.1em] px-2.5 py-1 border border-border text-muted hover:border-coral hover:text-cream transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[8px] tracking-[0.25em] uppercase text-coral mb-3">Contacto directo</p>
            <div className="flex">
              {[['in', 'LinkedIn'], ['gh', 'GitHub'], ['✉', 'Email']].map(([icon, title]) => (
                <a key={title} href="#" title={title}
                  className="w-9 h-9 border border-border border-r-0 last:border-r flex items-center justify-center text-[10px] text-muted hover:bg-coral hover:text-black hover:border-coral transition-all">
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
