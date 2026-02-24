import type { Metadata } from 'next'
import { Inter_Tight, Inter, Newsreader, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Cursor from '@/components/Cursor'
import ScrollProgress from '@/components/ScrollProgress'
// import SmoothScroll from '@/components/SmoothScroll' // Temporarily removed
import StockTicker from '@/components/StockTicker'

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter-tight',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-newsreader',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Filippo Cappa',
  description: 'Filippo Cappa — Economics with Finance & Data Science',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${interTight.variable} ${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}>
      <body>
        <StockTicker />
        <ScrollProgress />
        <Cursor />
        {children} {/* children moved outside SmoothScroll */}
      </body>
    </html>
  )
}
