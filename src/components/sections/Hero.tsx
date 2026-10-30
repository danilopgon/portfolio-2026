'use client'
import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/lib/i18n/context'
import { ease } from '@/lib/motion'
import { useMotionMedia } from '@/lib/motion/useMotionMedia'
import DitherImage from '@/components/ui/DitherImage'

gsap.registerPlugin(ScrollTrigger)

// Bespoke timings outside the 3-tier `dur`/`ease` token set (snap/base/slow).
// The token set only covers short interaction/reveal timings; this entrance
// sequence is intentionally its own.
const HERO_EASE = {
  entrance: ease.snap.gsap, // editorial primary ease (expo.out), shared timeline default
  scroll: ease.linear.gsap, // exact match: gsap 'none'
}
const HERO_DURATION = {
  // The H1 is the mobile LCP element (the photo is `hidden lg:block`), so it
  // must stay short regardless of the editorial retune — it intentionally
  // does NOT reference `dur.base` (now 1.2s). See scope-decisions memory.
  h1: 0.4,
  rule: 0.5,
  desc: 0.6,
  cta: 0.5,
  caption: 0.5,
}

export default function Hero() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const imgInnerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const daniRef = useRef<HTMLSpanElement>(null)
  const lopezRef = useRef<HTMLSpanElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLParagraphElement>(null)
  const [motionPending, setMotionPending] = useState(true)

  const full = useCallback(() => {
    setMotionPending(false)

    // Each word rises out of its own mask: the wrapping span clips only its
    // foot, so the accent on LÓPEZ is never cut.
    gsap.set([daniRef.current, lopezRef.current], { yPercent: 105 })
    gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set([descRef.current, ctasRef.current], { opacity: 0, y: 12 })
    gsap.set(captionRef.current, { opacity: 0, y: 8 })

    const tl = gsap.timeline({ defaults: { ease: HERO_EASE.entrance } })

    // H1 first, with zero start delay and a short, locally-capped duration.
    tl.to(
      [daniRef.current, lopezRef.current],
      { yPercent: 0, duration: HERO_DURATION.h1, ease: ease.snap.gsap, stagger: 0.08 },
      0
    )
      .to(ruleRef.current, { scaleX: 1, duration: HERO_DURATION.rule }, 0.1)
      .to(descRef.current, { opacity: 1, y: 0, duration: HERO_DURATION.desc }, 0.35)
      .to(ctasRef.current, { opacity: 1, y: 0, duration: HERO_DURATION.cta }, 0.5)
      .to(captionRef.current, { opacity: 1, y: 0, duration: HERO_DURATION.caption }, 0.25)

    // On the way out the cover line (rule, name and role together, so the
    // blended name never crosses the rule) and the photo part at different
    // speeds: the name lifts faster than the portrait drifts.
    const scroll = { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
    gsap.to(nameRef.current, { yPercent: -35, ease: HERO_EASE.scroll, scrollTrigger: scroll })
    gsap.to(imgInnerRef.current, {
      yPercent: -8,
      ease: HERO_EASE.scroll,
      scrollTrigger: { ...scroll },
    })
  }, [])

  const reduced = useCallback(() => {
    setMotionPending(false)
    gsap.set([daniRef.current, lopezRef.current], { yPercent: 0 })
    gsap.set([descRef.current, ctasRef.current, captionRef.current], { opacity: 1, x: 0, y: 0 })
    gsap.set(ruleRef.current, { scaleX: 1 })
  }, [])

  useMotionMedia(full, reduced)

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="min-h-svh lg:h-svh lg:min-h-[600px] lg:max-h-[1100px] pt-11 flex flex-col relative overflow-hidden"
    >
      {/* The portrait: the right half, nav to fold, off the page edge. It is
          the desktop LCP candidate, so it paints at once and never jumps; it
          only drifts with the scroll. The grain sits on the
          photo alone, where it matches the grain already in the print, and fades
          out towards the text so the photo melts into the page. */}
      <figure className="hidden lg:block absolute right-0 top-11 bottom-0 w-[56%] overflow-hidden m-0">
        <div ref={imgInnerRef} className="absolute left-0 right-0 top-0 bottom-[-12%]">
          <Image
            src="/images/foto-portfolio.webp"
            alt="Dani López González"
            fill
            sizes="(min-width: 1024px) 56vw, 0vw"
            className="object-cover grayscale contrast-[1.12] brightness-[0.92]"
            style={{ objectPosition: 'center 30%' }}
            priority
          />
          {/* The loupe: under the pointer the portrait prints as an ordered
              dither in black, coral and cream. */}
          <DitherImage
            src="/images/foto-portfolio.webp"
            target={sectionRef}
            positionX={0.5}
            positionY={0.3}
            contrast={1.12}
            brightness={0.92}
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.06] [mask-image:linear-gradient(to_right,transparent,black_35%)]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />
      </figure>

      {/* Text-content wrapper: the cover line, then the standfirst and the
          actions right under it. Everything inside gets an imperative
          pre-animation state in `full()`, so `data-motion` gates only this
          subtree — never the section, and never the photo. No z-index here:
          the name has to blend with the photo beneath it. */}
      <div
        data-motion={motionPending ? 'pending' : undefined}
        className="relative flex-1 flex flex-col justify-center gap-[clamp(28px,5svh,56px)] w-full max-w-[1520px] mx-auto px-6 md:px-16 pt-[clamp(32px,6svh,72px)] pb-[clamp(32px,6svh,64px)]"
      >
        <div ref={nameRef}>
          <div
            ref={ruleRef}
            aria-hidden="true"
            className="w-24 h-1 bg-coral mb-[clamp(12px,2svh,20px)]"
          />
          {/* The cover line: one line across the page, LÓPEZ crossing the
              photo. `difference` keeps it legible over dark and light. */}
          <h1
            id="hero-heading"
            className="font-bebas text-cream leading-[0.82] tracking-[0.005em] text-[clamp(68px,min(19vw,33svh),320px)] select-none whitespace-nowrap lg:mix-blend-difference"
          >
            <span className="inline-block align-top [clip-path:inset(-0.5em_-0.1em_0_-0.1em)]">
              <span ref={daniRef} className="inline-block">
                DANI
              </span>
            </span>{' '}
            <span className="inline-block align-top [clip-path:inset(-0.5em_-0.1em_0_-0.1em)]">
              <span ref={lopezRef} className="inline-block">
                LÓPEZ
              </span>
            </span>
          </h1>
          <p
            ref={captionRef}
            className="mt-[clamp(12px,2svh,20px)] text-[clamp(16px,1.3vw,19px)] text-[var(--dim)]"
          >
            {t.hero.label}
          </p>
        </div>

        <div className="lg:max-w-[40%]">
          <p
            ref={descRef}
            className="max-w-[32ch] font-serif text-[clamp(19px,min(1.8vw,3.2svh),28px)] leading-[1.32] text-cream"
          >
            {t.hero.taglineBefore}
            <strong className="font-semibold">{t.hero.taglineHighlight}</strong>
            {t.hero.taglineAfter}
          </p>

          <div ref={ctasRef} className="flex flex-wrap gap-4 mt-[clamp(20px,4svh,36px)]">
            <a
              href="#projects"
              className="inline-flex items-center min-h-12 px-8 bg-coral text-black font-bebas text-[24px] leading-none tracking-[0.01em] border border-coral hover:bg-cream hover:border-cream transition-colors"
            >
              {t.hero.cta1}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center min-h-12 px-8 text-cream font-bebas text-[24px] leading-none tracking-[0.01em] border border-[var(--dim)] hover:bg-faint hover:border-cream transition-colors"
            >
              {t.hero.cta2}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
