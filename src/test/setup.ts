import '@testing-library/jest-dom/vitest'
import { mockMatchMedia } from './motion'

// jsdom does not implement `window.matchMedia`. GSAP plugins (e.g.
// ScrollTrigger) call it during `gsap.registerPlugin()` at module load time,
// before any individual test can install its own mock. Install a default
// "no reduced motion" stub globally; tests that care about the reduced-motion
// branch call `mockMatchMedia()` again to override it.
mockMatchMedia(false)

// jsdom does not implement the CSS Font Loading API (`document.fonts`),
// which `Ticker` awaits before measuring layout. Stub a resolved promise so
// components using it can mount under test without crashing.
if (!document.fonts) {
  // @ts-expect-error -- jsdom doesn't type `document.fonts`; minimal stub only
  document.fonts = { ready: Promise.resolve() }
}
