import '@testing-library/jest-dom/vitest'
import { mockMatchMedia } from './motion'

// jsdom does not implement `window.matchMedia`. GSAP plugins (e.g.
// ScrollTrigger) call it during `gsap.registerPlugin()` at module load time,
// before any individual test can install its own mock. Install a default
// "no reduced motion" stub globally; tests that care about the reduced-motion
// branch call `mockMatchMedia()` again to override it.
mockMatchMedia(false)
