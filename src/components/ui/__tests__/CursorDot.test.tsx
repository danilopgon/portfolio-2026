import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import CursorDot from '../CursorDot'

/**
 * `CursorDot` checks two independent media queries: `prefers-reduced-motion`
 * (via `useMotionMedia`/`gsap.matchMedia`, which needs the legacy
 * `addListener`/`removeListener` surface) and `(pointer: fine)` (a plain
 * `window.matchMedia` check to skip attaching listeners on touch devices).
 * The shared `mockMatchMedia` harness in `src/test/motion.ts` only resolves
 * the reduced-motion queries, so it would make `(pointer: fine)` always
 * resolve `false` and prevent testing the full-motion desktop path. Build a
 * local mock here that resolves all three query shapes this component uses.
 */
function mockDesktopMatchMedia(reduced: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>()

  function matches(query: string): boolean {
    if (query.includes('no-preference')) return !reduced
    if (query.includes('reduce')) return reduced
    if (query.includes('pointer: fine')) return true
    return false
  }

  window.matchMedia = ((query: string) => ({
    matches: matches(query),
    media: query,
    onchange: null,
    addEventListener: ((_type: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.add(listener)
    }) as MediaQueryList['addEventListener'],
    removeEventListener: ((_type: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.delete(listener)
    }) as MediaQueryList['removeEventListener'],
    addListener: (listener: (event: MediaQueryListEvent) => void) => {
      listeners.add(listener)
    },
    removeListener: (listener: (event: MediaQueryListEvent) => void) => {
      listeners.delete(listener)
    },
    dispatchEvent: () => true,
  })) as typeof window.matchMedia
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('CursorDot', () => {
  it('renders no DOM output and attaches no pointer/mouse listeners when reduced motion is preferred', () => {
    mockDesktopMatchMedia(true)
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener')

    const { container } = render(<CursorDot />)

    expect(container).toBeEmptyDOMElement()
    expect(addEventListenerSpy).not.toHaveBeenCalledWith('mousemove', expect.any(Function))
  })

  it('removes every listener it attached on unmount, matching the number added, when motion is not reduced', () => {
    mockDesktopMatchMedia(false)
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener')
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')

    const { unmount } = render(<CursorDot />)
    unmount()

    const addCalls = addEventListenerSpy.mock.calls.filter(([type]) => type === 'mousemove').length
    const removeCalls = removeEventListenerSpy.mock.calls.filter(
      ([type]) => type === 'mousemove'
    ).length

    expect(addCalls).toBeGreaterThan(0)
    expect(removeCalls).toBe(addCalls)
  })
})
