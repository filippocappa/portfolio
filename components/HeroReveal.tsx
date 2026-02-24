'use client'

import { useEffect, useRef } from 'react'

interface HeroRevealProps {
  children: React.ReactNode
  delay?: number
}

export default function HeroReveal({ children, delay = 0 }: HeroRevealProps) {
  const wrapRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const timer = setTimeout(() => {
      wrap.classList.add('visible')
    }, 300 + delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <span ref={wrapRef} className="char-wrap">
      {children}
    </span>
  )
}
