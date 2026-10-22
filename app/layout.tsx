import type { Metadata } from 'next'
import { Archivo, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import CommandPalette from '@/components/CommandPalette'

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Filippo Cappa | Economics and Finance with Data Science student',
    template: '%s | Filippo Cappa',
  },
  description:
    'Economics and Finance with Data Science student at the University of Turin, interested in investment banking.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${sourceSerif.variable}`}>
      <body>
        <CommandPalette />
        {children}
      </body>
    </html>
  )
}
