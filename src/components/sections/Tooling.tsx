'use client'
import { useState } from 'react'
import Link from 'next/link'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import { getTools, type Tool } from '@/lib/tooling'
import { useLanguage } from '@/lib/i18n/context'

// The detail disclosure is a direct-input tap response, not ambient motion, so
// it deliberately does NOT consume `dur.base`/`dur.snap` (1.2s/0.9s under the
// editorial retune) — same reasoning as the Navbar mobile menu. It keeps a
// short local duration and reuses the shared `--ease-snap` curve.
const DISCLOSURE_MS = 'duration-[220ms]'

type ToolCardProps = {
  tool: Tool
  /** The flagship reads at a larger scale in the first row of the bento. */
  lead?: boolean
  expandLabel: string
  collapseLabel: string
  technologiesLabel: string
}

function ToolCard({
  tool,
  lead = false,
  expandLabel,
  collapseLabel,
  technologiesLabel,
}: ToolCardProps) {
  const [open, setOpen] = useState(false)
  const { slug, name, kind, summary, detail, stack } = tool

  const identity = (
    <div className="flex flex-col gap-2">
      {/*
        Tool names stay in DM Mono, never Bebas: Bebas is caps-only, and the
        lowercase hyphenated form is the whole signal that these are repo
        artifacts rather than product names.
      */}
      <h3
        className={`text-cream font-medium tracking-[0.02em] leading-tight ${
          lead ? 'text-[20px] md:text-[22px]' : 'text-[17px] md:text-[18px]'
        }`}
      >
        {name}
      </h3>
      <p className="text-[11px] uppercase tracking-[0.15em] text-muted">{kind}</p>
    </div>
  )

  const tags = (
    // Tags anchor to the bottom of their cell. Grid rows are equal height, so
    // whenever a neighbour is taller (the thesis column beside the flagship, or
    // a sibling with its disclosure open) the slack would otherwise pool under
    // a card that just stops mid-height. Anchored, the slack lands above a tag
    // row that reads as a footer, and the three rows line up across the grid.
    <ul aria-label={`${name}, ${technologiesLabel}`} className="flex flex-wrap gap-1.5 mt-auto">
      {stack.map((tag) => (
        <li
          key={tag}
          className="text-[12px] px-1.5 py-0.5 border border-faint text-muted tracking-[0.1em]"
        >
          {tag}
        </li>
      ))}
    </ul>
  )

  const summaryAndTrigger = (
    <div className="flex flex-col gap-4">
      <p
        className={`text-[var(--dim)] leading-[1.65] max-w-[62ch] ${
          lead ? 'text-[15px] md:text-[16px]' : 'text-[14px]'
        }`}
      >
        {summary}
      </p>

      {/*
        The button precedes the region it controls, so activating it never
        reveals content behind the reader's position. The visible text is the
        label itself, so the accessible name matches it (WCAG 2.5.3 Label in
        Name) and the control reads as a control rather than as one more
        terminal sigil.
      */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${slug}-detail`}
        className={`self-start inline-flex items-center gap-2 py-2 -my-2 text-[11px] uppercase tracking-[0.15em] text-[var(--dim)] hover:text-cream transition-[color,transform] ${DISCLOSURE_MS} ease-snap active:scale-[0.97] origin-left`}
      >
        <span aria-hidden="true" className="text-coral select-none w-2 text-center">
          {open ? '–' : '+'}
        </span>
        <span className="underline decoration-border underline-offset-4 hover:decoration-coral">
          {open ? collapseLabel : expandLabel}
        </span>
      </button>
    </div>
  )

  // 0fr → 1fr keeps the collapsed height at zero without measuring the
  // content, so the row grows with the copy and the transition stays
  // interruptible mid-flight (a CSS transition, not a keyframe).
  const detailRegion = (
    <div
      id={`${slug}-detail`}
      inert={!open}
      className={`grid transition-[grid-template-rows,opacity] ${DISCLOSURE_MS} ease-snap ${
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        <p className="text-[14px] text-[var(--dim)] leading-[1.65] max-w-[62ch] border-l border-border pl-4">
          {detail}
        </p>
      </div>
    </div>
  )

  return (
    <div
      className={`h-full flex flex-col gap-5 hover:bg-faint transition-colors ${
        lead ? 'px-6 py-9 md:px-10 md:py-11' : 'px-6 py-8 md:px-8 md:py-9'
      }`}
    >
      {identity}
      <div className="flex flex-col gap-4">
        {summaryAndTrigger}
        {detailRegion}
      </div>
      {tags}
    </div>
  )
}

export default function Tooling() {
  const { locale, t } = useLanguage()
  const [lead, ...rest] = getTools(locale)

  return (
    <section id="tooling" aria-labelledby="tooling-heading" className="border-b border-border">
      <SectionHeader id="tooling-heading" title={t.tooling.title} number="04" />

      {/*
        Asymmetric bento. The statement and the flagship share the first row so
        the section leads with a named, shipped thing instead of a preamble; the
        three supporting tools follow in an even row. The earlier six-step
        pipeline lived here and was cut: it restated the thesis in abstract
        nouns that no card ever referred back to, and the tools themselves
        already carry the argument about deterministic checks and human
        confirmation.
      */}
      <div aria-label={t.tooling.toolsLabel} role="group">
        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] border-b border-border">
          <RevealOnScroll className="flex">
            <div className="px-6 py-9 md:px-16 md:py-12 lg:pr-12 flex flex-col gap-8 w-full">
              <p className="text-[17px] md:text-[19px] leading-[1.6] text-cream max-w-[46ch]">
                {t.tooling.thesis}
              </p>
              {/*
                States up front that this is internal work, which is why no card
                links anywhere. The Servinet anchor gives the curious reader the
                one destination that does exist.
              */}
              <p className="text-[13px] text-muted leading-[1.6] max-w-[70ch] flex gap-2 mt-auto">
                <span aria-hidden="true" className="text-coral select-none shrink-0">
                  {'//'}
                </span>
                <span>
                  {t.tooling.contextBefore}
                  <Link
                    href="/#experience"
                    className="text-cream underline decoration-border underline-offset-4 hover:decoration-coral transition-colors"
                  >
                    {t.tooling.contextLink}
                  </Link>
                  {t.tooling.contextAfter}
                </span>
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll
            delay={80}
            className="bg-dark border-t lg:border-t-0 lg:border-l border-border"
          >
            <ToolCard
              tool={lead}
              lead
              expandLabel={t.tooling.expand}
              collapseLabel={t.tooling.collapse}
              technologiesLabel={t.tooling.technologies}
            />
          </RevealOnScroll>
        </div>

        <div className="grid md:grid-cols-3">
          {rest.map((tool, i) => (
            <RevealOnScroll
              key={tool.slug}
              delay={i * 80}
              className={`border-border ${i < rest.length - 1 ? 'border-b md:border-b-0 md:border-r' : ''}`}
            >
              <ToolCard
                tool={tool}
                expandLabel={t.tooling.expand}
                collapseLabel={t.tooling.collapse}
                technologiesLabel={t.tooling.technologies}
              />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
