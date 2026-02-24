import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#F4F4F0',
        'off-black': '#1A1A1A',
        'emerald-green': '#10B981',
        'charcoal': '#1A1A1A',
        'hermes-orange': '#F37021',
        'accent': '#F37021',
      },
      fontFamily: {
        'inter-tight': ['var(--font-inter-tight)'],
        inter: ['var(--font-inter)'],
        'newsreader': ['var(--font-newsreader)'],
        'geist-mono': ['var(--font-geist-mono)'],
        'jetbrains-mono': ['var(--font-jetbrains-mono)'],
      },
      fontSize: {
        'hero': 'clamp(4rem, 14vw, 16rem)',
        'work-title': 'clamp(4.5rem, 11vw, 12rem)',
        'contact-heading': 'clamp(3rem, 8vw, 9rem)',
        'manifesto': 'clamp(1.25rem, 2.5vw, 2.2rem)',
        'mono-sm': 'clamp(11px, 1.2vw, 14px)',
      },
      spacing: {
        'page': 'clamp(1.5rem, 5vw, 6rem)',
        'section': 'clamp(4rem, 8vh, 10rem)',
      },
    },
  },
  plugins: [],
}

export default config
