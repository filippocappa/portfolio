import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        rule: 'var(--rule)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      fontSize: {
        display: ['clamp(5rem, 17vw, 15rem)', { lineHeight: '0.8', letterSpacing: '-0.015em' }],
        title: ['clamp(2.75rem, 7vw, 5.5rem)', { lineHeight: '0.9', letterSpacing: '-0.01em' }],
        h2: ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1', letterSpacing: '-0.005em' }],
        lead: ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.45' }],
      },
      spacing: {
        page: 'clamp(1rem, 5vw, 5rem)',
      },
      maxWidth: {
        prose: '66ch',
        site: '88rem',
      },
    },
  },
  plugins: [],
}

export default config
