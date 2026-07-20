/**
 * Shared test harness for motion-related tests.
 *
 * jsdom does not implement `window.matchMedia`, and `gsap.matchMedia()`
 * requires the full `MediaQueryList` surface (including the legacy
 * `addListener`/`removeListener` methods) or it throws. This mock provides
 * that full surface so components using `gsap.matchMedia()` /
 * `useMotionMedia` can be tested under both motion preferences.
 */
export function mockMatchMedia(reduced: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>()

  function matchesQuery(query: string): boolean {
    // Resolve `matches` per-query so `gsap.matchMedia()` can register both
    // the `no-preference` and `reduce` conditions and only one of them wins,
    // matching real browser behavior.
    if (query.includes('no-preference')) return !reduced
    if (query.includes('reduce')) return reduced
    return false
  }

  const buildMql = (query: string): MediaQueryList => ({
    matches: matchesQuery(query),
    media: query,
    onchange: null,
    addEventListener: ((
      _type: string,
      listener: (event: MediaQueryListEvent) => void
    ) => {
      listeners.add(listener)
    }) as MediaQueryList['addEventListener'],
    removeEventListener: ((
      _type: string,
      listener: (event: MediaQueryListEvent) => void
    ) => {
      listeners.delete(listener)
    }) as MediaQueryList['removeEventListener'],
    addListener: (listener: (event: MediaQueryListEvent) => void) => {
      listeners.add(listener)
    },
    removeListener: (listener: (event: MediaQueryListEvent) => void) => {
      listeners.delete(listener)
    },
    dispatchEvent: (event: Event) => {
      listeners.forEach((listener) => listener(event as MediaQueryListEvent))
      return true
    },
  })

  window.matchMedia = ((query: string) =>
    buildMql(query)) as typeof window.matchMedia

  return buildMql('(prefers-reduced-motion: reduce)')
}
