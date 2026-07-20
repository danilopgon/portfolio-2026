import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Regression test for the Strict Mode double-invoke bug: `flipOpen`'s
// returned cleanup must kill the in-flight `Flip.to` tween and clear the
// panel's Flip-applied inline styles, so a remount captures the panel's
// natural layout instead of a mid-tween intermediate one.

const { killMock, flipToMock, flipFitMock, flipGetStateMock, setMock } = vi.hoisted(() => {
  const killMock = vi.fn()
  return {
    killMock,
    flipToMock: vi.fn(() => ({ kill: killMock })),
    flipFitMock: vi.fn(),
    flipGetStateMock: vi.fn(() => 'MOCK_FLIP_STATE'),
    setMock: vi.fn(),
  }
})

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    set: setMock,
  },
}))

vi.mock('gsap/Flip', () => ({
  Flip: {
    getState: flipGetStateMock,
    fit: flipFitMock,
    to: flipToMock,
  },
}))

import { flipOpen } from '../ProjectModal'

describe('flipOpen — tween cleanup (Strict Mode double-invoke regression)', () => {
  let card: HTMLElement
  let panel: HTMLElement

  beforeEach(() => {
    card = document.createElement('a')
    card.setAttribute('data-flip-id', 'project-holy-seitan')
    document.body.appendChild(card)
    panel = document.createElement('div')
    document.body.appendChild(panel)
  })

  afterEach(() => {
    card.remove()
    panel.remove()
    vi.clearAllMocks()
  })

  it('kills the in-flight Flip.to tween on cleanup', () => {
    const restore = flipOpen(panel, 'project-holy-seitan')
    expect(flipToMock).toHaveBeenCalledTimes(1)

    restore?.()

    expect(killMock).toHaveBeenCalledTimes(1)
  })

  it('clears the panel Flip-applied inline styles on cleanup', () => {
    const restore = flipOpen(panel, 'project-holy-seitan')

    restore?.()

    expect(setMock).toHaveBeenCalledWith(panel, { clearProps: 'all' })
  })

  it('kills the tween and clears panel styles before a remount captures state again', () => {
    const restoreFirst = flipOpen(panel, 'project-holy-seitan')
    restoreFirst?.()

    flipGetStateMock.mockClear()
    flipOpen(panel, 'project-holy-seitan')

    // Cleanup (kill + clearProps) must have already run by the time the
    // remount calls getState again, so it captures the natural layout.
    expect(killMock).toHaveBeenCalledTimes(1)
    expect(setMock).toHaveBeenCalledWith(panel, { clearProps: 'all' })
    expect(flipGetStateMock).toHaveBeenCalledTimes(1)
  })
})
