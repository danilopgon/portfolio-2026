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
        muted: '#7e7e7c',
        border: '#2a2a28',
        faint: '#222220',
      },
      fontFamily: {
        bebas: ['var(--font-bebas)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
