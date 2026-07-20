import { cleanup, render } from '@testing-library/react'
import gsap from 'gsap'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { dur } from '../../../lib/motion'
import { mockMatchMedia } from '../../../test/motion'
import Hero from '../Hero'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Hero entrance', () => {
  it('SSR markup contains data-motion="pending" while content is rendered', () => {
    // renderToStaticMarkup never runs effects, so this reflects exactly what
    // ships before any JS executes (no-JS / pre-hydration state).
    const html = renderToStaticMarkup(<Hero />)

    expect(html).toContain('data-motion="pending"')
    expect(html).toContain('DANI')
  })

  it('removes the data-motion="pending" attribute after mount', () => {
    mockMatchMedia(false)

    const { container } = render(<Hero />)

    const root = container.querySelector('#hero')
    expect(root?.hasAttribute('data-motion')).toBe(false)
  })

  it('removes the data-motion="pending" attribute after mount even with reduced motion', () => {
    mockMatchMedia(true)

    const { container } = render(<Hero />)

    const root = container.querySelector('#hero')
    expect(root?.hasAttribute('data-motion')).toBe(false)
  })

  it('caps the H1 entrance duration at a short, LCP-safe value regardless of the editorial token retune', () => {
    // The H1 is the mobile LCP element (the hero photo is `hidden lg:block`),
    // so it must NOT inherit the slow editorial `dur.base` value even though
    // every other ambient/scroll-triggered surface in the system does.
    mockMatchMedia(false)

    const toCalls: Array<Record<string, unknown>> = []
    const originalTimeline = gsap.timeline.bind(gsap)
    vi.spyOn(gsap, 'timeline').mockImplementation((...args: unknown[]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tl = (originalTimeline as any)(...args)
      const originalTo = tl.to.bind(tl)
      vi.spyOn(tl, 'to').mockImplementation((...toArgs: unknown[]) => {
        toCalls.push(toArgs[1] as Record<string, unknown>)
        return originalTo(...toArgs)
      })
      return tl
    })

    render(<Hero />)

    expect(toCalls.length).toBeGreaterThan(0)
    const h1Call = toCalls[0]

    expect(h1Call.duration).toBe(0.4)
    expect(h1Call.duration).not.toBe(dur.base.s)
    expect(h1Call.duration as number).toBeLessThan(dur.slow.s)
  })
})
