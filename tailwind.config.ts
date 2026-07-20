import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: '#f55033',
        cream: '#f0ede8',
        black: '#0c0c0b',
        dark: '#111110',
        muted: '#8e8e8c',
        border: '#2a2a28',
        faint: '#222220',
      },
      fontFamily: {
        bebas: ['var(--font-bebas)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      transitionDuration: {
        snap: 'var(--dur-snap)',
        base: 'var(--dur-base)',
        slow: 'var(--dur-slow)',
      },
      transitionTimingFunction: {
        snap: 'var(--ease-snap)',
        punch: 'var(--ease-punch)',
        linear: 'var(--ease-linear)',
      },
    },
  },
  plugins: [],
}

export default config
