import { render, cleanup } from '@testing-library/react'
import gsap from 'gsap'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mockMatchMedia } from '../../../test/motion'
import { useMotionMedia } from '../useMotionMedia'

function TestComponent({
  full,
  reduced,
}: {
  full: () => void
  reduced: () => void
}) {
  useMotionMedia(full, reduced)
  return null
}

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('useMotionMedia', () => {
  it('runs only the reduced callback when reduced motion is preferred', () => {
    mockMatchMedia(true)
    const full = vi.fn()
    const reduced = vi.fn()

    render(<TestComponent full={full} reduced={reduced} />)

    expect(reduced).toHaveBeenCalledTimes(1)
    expect(full).not.toHaveBeenCalled()
  })

  it('runs only the full callback when reduced motion is not preferred', () => {
    mockMatchMedia(false)
    const full = vi.fn()
    const reduced = vi.fn()

    render(<TestComponent full={full} reduced={reduced} />)

    expect(full).toHaveBeenCalledTimes(1)
    expect(reduced).not.toHaveBeenCalled()
  })

  it('reverts the GSAP matchMedia context on unmount', () => {
    mockMatchMedia(false)
    const revertSpy = vi.fn()
    const originalMatchMedia = gsap.matchMedia.bind(gsap)
    vi.spyOn(gsap, 'matchMedia').mockImplementation((...args) => {
      const mm = originalMatchMedia(...args)
      const originalRevert = mm.revert.bind(mm)
      mm.revert = (...revertArgs) => {
        revertSpy()
        return originalRevert(...revertArgs)
      }
      return mm
    })

    const { unmount } = render(
      <TestComponent full={vi.fn()} reduced={vi.fn()} />
    )
    unmount()

    expect(revertSpy).toHaveBeenCalledTimes(1)
  })
})
