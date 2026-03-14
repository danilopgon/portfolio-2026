import ScrambleText from '@/components/ui/ScrambleText'

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen pt-11 grid grid-rows-[1fr_auto] border-b border-border relative overflow-hidden">
      {/* bg radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_50%,rgba(245,80,51,0.06),transparent)] pointer-events-none" />
      {/* grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />

      <div className="flex flex-col justify-center px-6 py-16 md:px-16 md:py-20 relative z-10">
        <p className="text-[9px] tracking-[0.3em] uppercase text-muted mb-5 flex items-center gap-3 before:block before:w-8 before:h-px before:bg-coral opacity-0 animate-[fadeUp_0.4s_0.1s_forwards]">
          Frontend Developer
        </p>

        <h1 className="font-bebas leading-[0.88] tracking-[0.01em] text-[clamp(64px,10vw,140px)] select-none">
          <ScrambleText text="DANI"  duration={500} delay={200}  className="block text-cream" />
          <ScrambleText text="LÓPEZ" duration={600} delay={700}  className="block text-coral" />
        </h1>

        <ScrambleText
          text="Frontend Developer"
          duration={600}
          delay={1300}
          className="text-[clamp(11px,1.5vw,15px)] tracking-[0.25em] uppercase text-muted mt-6 block"
        />

        <p className="max-w-[460px] text-[12px] text-[#a0a0a0] leading-[1.75] mt-7 opacity-0 animate-[fadeUp_0.7s_1.9s_forwards]">
          Construyo interfaces donde <strong className="text-cream font-medium">diseño y arquitectura</strong> no se negocian por separado.
          Background en comunicación digital y narrativa transmedia —
          el contexto que convierte código en experiencia.
        </p>

        <div className="flex mt-10 opacity-0 animate-[fadeUp_0.5s_2.2s_forwards]">
          <a href="#projects" className="bg-coral text-black font-mono text-[9px] font-medium tracking-[0.22em] uppercase px-7 py-3 border border-coral hover:bg-cream hover:border-cream transition-colors flex items-center gap-2.5">
            Ver trabajo →
          </a>
          <a href="#contact" className="text-muted font-mono text-[9px] tracking-[0.22em] uppercase px-7 py-3 border border-border border-l-0 hover:text-cream hover:border-muted transition-colors">
            Hablemos
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-border opacity-0 animate-[fadeUp_0.5s_2.4s_forwards]">
        {([
          { pre: '2',             coral: '+',  post: '',      label: 'Años de experiencia',    small: false },
          { pre: 'TS · Angular · React', coral: ' ·', post: '', label: 'Next.js · Node.js · .NET', small: true  },
          { pre: 'UX/UI',         coral: ' ·', post: ' Figma', label: 'Diseño & prototipado',    small: true  },
        ] as const).map(({ pre, coral, post, label, small }, i) => (
          <div key={i} className={`px-6 md:px-8 py-5 border-border
            ${i < 2 ? 'border-b sm:border-b-0 sm:border-r' : ''}`}>
            <div className={`font-bebas text-cream leading-none ${small ? 'text-[clamp(14px,1.8vw,20px)] leading-[1.3]' : 'text-[32px]'}`}>
              {pre}<span className="text-coral">{coral}</span>{post}
            </div>
            <div className="text-[8px] tracking-[0.2em] uppercase text-muted mt-1">{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
