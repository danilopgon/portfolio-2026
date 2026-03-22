import Image from 'next/image'
import ScrambleText from '@/components/ui/ScrambleText'

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen pt-11 flex flex-col justify-center relative overflow-hidden">
      {/* Photo — behind glow/grain, diagonal mask from top-right corner */}
      <div
        className="hidden md:block absolute right-0 top-0 bottom-0 w-[52%] mix-blend-luminosity opacity-0 animate-[fadeUp_0.6s_2.4s_forwards]"
      >
        <Image
          src="/images/foto-portfolio.webp"
          alt="Dani López González"
          fill
          className="object-cover grayscale brightness-[0.6]"
          style={{ objectPosition: 'right 20%' }}
          priority
        />
      </div>

      {/* bg radial glow */}
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_50%,rgba(245,80,51,0.06),transparent)] pointer-events-none" />
      {/* grain */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />

      <div className="flex items-center relative z-10">
        {/* Left: text content */}
        <div className="flex flex-col justify-center flex-1 min-w-0 px-6 py-16 md:px-16 md:py-20">
          <div className="mb-5 flex items-center gap-3 before:block before:w-8 before:h-px before:bg-coral opacity-0 animate-[fadeUp_0.4s_0.1s_forwards]">
            <ScrambleText
              text="Frontend Developer"
              duration={500}
              delay={200}
              className="text-[11px] tracking-[0.3em] uppercase text-muted"
            />
          </div>

          <h1 className="font-bebas leading-[0.88] tracking-[0.01em] text-[clamp(64px,10vw,140px)] select-none">
            <ScrambleText text="DANI"  duration={500} delay={500}  className="block text-cream" />
            <ScrambleText text="LÓPEZ" duration={600} delay={1000} className="block text-coral" />
          </h1>

          <p className="max-w-[460px] text-[12px] text-[#a0a0a0] leading-[1.75] mt-7 opacity-0 animate-[fadeUp_0.7s_1.9s_forwards]">
            Construyo interfaces donde <strong className="text-cream font-medium">diseño y arquitectura</strong> no se negocian por separado.
            Background en comunicación digital y narrativa transmedia —
            el contexto que convierte código en experiencia.
          </p>

          <div className="flex mt-10 opacity-0 animate-[fadeUp_0.5s_2.2s_forwards]">
            <a href="#projects" className="bg-coral text-black font-mono text-[11px] font-medium tracking-[0.22em] uppercase px-7 py-3 border border-coral hover:bg-cream hover:border-cream transition-colors flex items-center gap-2.5">
              Ver trabajo →
            </a>
            <a href="#contact" className="text-muted font-mono text-[11px] tracking-[0.22em] uppercase px-7 py-3 border border-border border-l-0 hover:text-cream hover:border-muted transition-colors">
              Hablemos
            </a>
          </div>
        </div>

      </div>

    </section>
  )
}
