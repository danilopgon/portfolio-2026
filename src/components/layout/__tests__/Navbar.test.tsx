import { act, cleanup, fireEvent, render } from '@testing-library/react'
import gsap from 'gsap'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { dur } from '../../../lib/motion'
import { mockMatchMedia } from '../../../test/motion'
import Navbar from '../Navbar'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Navbar mobile menu timing', () => {
  it('keeps the mobile menu open/close animation short — a direct-input tap response, not ambient motion — regardless of the editorial token retune', () => {
    mockMatchMedia(false)

    const fromToSpy = vi.spyOn(gsap, 'fromTo')
    const toSpy = vi.spyOn(gsap, 'to')

    const { container } = render(<Navbar />)
    const hamburger = container.querySelector('button[aria-controls="mobile-menu"]')
    expect(hamburger).not.toBeNull()

    act(() => {
      fireEvent.click(hamburger as HTMLButtonElement)
    })

    const durations = [...fromToSpy.mock.calls, ...toSpy.mock.calls]
      .map((call) => {
        const vars = (call[1] as Record<string, unknown>) ?? {}
        const varsAlt = (call[2] as Record<string, unknown>) ?? {}
        return (vars.duration ?? varsAlt.duration) as number | undefined
      })
      .filter((value): value is number => typeof value === 'number')

    expect(durations.length).toBeGreaterThan(0)
    for (const duration of durations) {
      expect(duration).toBeLessThan(dur.slow.s)
      expect(duration).toBeLessThanOrEqual(0.4)
    }
  })
})
