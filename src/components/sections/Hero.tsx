'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const photoRef    = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const daniRef     = useRef<HTMLSpanElement>(null);
  const lopezRef    = useRef<HTMLSpanElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);
  const ctasRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(labelRef.current,                             { opacity: 0, y: 8  });
    gsap.set([daniRef.current, lopezRef.current],          { opacity: 0, y: 20 });
    gsap.set([descRef.current, ctasRef.current],           { opacity: 0, y: 10 });
    gsap.set(photoRef.current,                             { opacity: 0, scale: 1.04 });

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(labelRef.current,  { opacity: 1, y: 0, duration: 0.5 }, 0.1)
        .to(daniRef.current,   { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .to(lopezRef.current,  { opacity: 1, y: 0, duration: 0.6 }, 0.55)
        .to(descRef.current,   { opacity: 1, y: 0, duration: 0.6 }, 0.9)
        .to(ctasRef.current,   { opacity: 1, y: 0, duration: 0.5 }, 1.1)
        .to(photoRef.current,  { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.inOut' }, 0.3);

      gsap.to(imgInnerRef.current, {
        yPercent: -10,
        zoom: 1.20,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set([labelRef.current, daniRef.current, lopezRef.current, descRef.current, ctasRef.current], { opacity: 1, y: 0 });
      gsap.set(photoRef.current, { opacity: 1, scale: 1 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen pt-11 flex flex-col justify-center relative overflow-hidden"
    >
      {/* Photo — outer clips, inner se mueve con parallax */}
      <div
        ref={photoRef}
        className="hidden md:block absolute right-0 top-0 bottom-0 w-[52%] mix-blend-luminosity overflow-hidden"
      >
        <div ref={imgInnerRef} className="absolute left-0 right-0 top-0 bottom-[-35%]">
          <Image
            src="/images/foto-portfolio.webp"
            alt="Dani López González"
            fill
            className="object-cover grayscale brightness-[0.6]"
            style={{ objectPosition: 'right 20%' }}
            priority
          />
        </div>
      </div>

      {/* bg radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_50%,rgba(245,80,51,0.06),transparent)] pointer-events-none"
      />
      {/* grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="flex items-center relative z-10">
        <div className="flex flex-col justify-center flex-1 min-w-0 px-6 py-16 md:px-16 md:py-20">
          <div
            ref={labelRef}
            className="mb-5 flex items-center gap-3 before:block before:w-8 before:h-px before:bg-coral"
          >
            <span className="text-[11px] tracking-[0.3em] uppercase text-muted">
              Frontend Developer
            </span>
          </div>

          <h1 className="font-bebas leading-[0.88] tracking-[0.01em] text-[clamp(64px,10vw,140px)] select-none">
            <span ref={daniRef} className="block text-cream">DANI</span>
            <span ref={lopezRef} className="block text-coral">LÓPEZ</span>
          </h1>

          <p ref={descRef} className="max-w-[460px] text-[12px] text-[#a0a0a0] leading-[1.75] mt-7">
            Construyo interfaces donde{' '}
            <strong className="text-cream font-medium">diseño y arquitectura</strong>{' '}
            no se negocian por separado. Código que no solo funciona, cuenta una historia.
          </p>

          <div ref={ctasRef} className="flex mt-10">
            <a
              href="#projects"
              className="bg-coral text-black font-mono text-[11px] font-medium tracking-[0.22em] uppercase px-7 py-3 border border-coral hover:bg-cream hover:border-cream transition-colors flex items-center gap-2.5"
            >
              Ver trabajo →
            </a>
            <a
              href="#contact"
              className="text-muted font-mono text-[11px] tracking-[0.22em] uppercase px-7 py-3 border border-border border-l-0 hover:text-cream hover:border-muted transition-colors"
            >
              Hablemos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
