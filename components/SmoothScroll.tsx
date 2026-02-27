'use client'

import { ReactLenis } from '@studio-freight/react-lenis'
import { usePathname } from 'next/navigation'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  if (isHome) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
