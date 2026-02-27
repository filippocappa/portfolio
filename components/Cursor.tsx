'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const dot = dotRef.current
    if (dot) {
      dot.classList.remove('hovering')
    }
  }, [pathname])

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover)').matches
    if (!hasHover) return

    const dot = dotRef.current
    if (!dot) return

    let mx = 0, my = 0
    let dx = 0, dy = 0
    let rafId: number
    let magneticTarget: HTMLElement | null = null

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      
      if (!dot.classList.contains('visible')) {
        dot.classList.add('visible')
      }

      // Check for magnetic target under cursor
      const target = (e.target as HTMLElement).closest('[data-cursor-magnetic]') as HTMLElement
      if (target) {
        magneticTarget = target
        dot.classList.add('hovering')
        
        // Add contrast class if we're hovering over an orange button
        if (target.classList.contains('bg-accent')) {
          dot.classList.add('contrast')
        } else {
          dot.classList.remove('contrast')
        }
      } else {
        magneticTarget = null
        dot.classList.remove('hovering')
        dot.classList.remove('contrast')
      }
    }

    const handleMouseLeave = () => {
      dot.classList.remove('visible')
    }

    const tick = () => {
      const ease = 0.15
      let targetX = mx
      let targetY = my

      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        targetX = centerX + (mx - centerX) * 0.35
        targetY = centerY + (my - centerY) * 0.35
      }

      dx += (targetX - dx) * ease
      dy += (targetY - dy) * ease
      
      dot.style.transform = `translate3d(calc(${dx}px - 50%), calc(${dy}px - 50%), 0)`
      rafId = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    rafId = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <div ref={dotRef} className="cursor-dot" />
}
