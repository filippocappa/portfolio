'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover)').matches
    if (!hasHover) return

    const dot = dotRef.current
    if (!dot) return

    let mx = 0, my = 0
    let dx = 0, dy = 0
    let rafId: number
    let hovering = false

    const hoverTargets = 'a, button, [data-cursor-hover]'

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!dot.classList.contains('visible')) {
        dot.classList.add('visible')
      }
    }

    const handleMouseLeave = () => {
      dot.classList.remove('visible')
    }

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(hoverTargets)) {
        if (!hovering) {
          hovering = true
          dot.classList.add('hovering')
        }
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest(hoverTargets)) {
        const related = e.relatedTarget as HTMLElement | null
        if (!related || !related.closest(hoverTargets)) {
          hovering = false
          dot.classList.remove('hovering')
        }
      }
    }

    const tick = () => {
      dx += (mx - dx) * 0.15
      dy += (my - dy) * 0.15
      dot.style.left = `${dx}px`
      dot.style.top = `${dy}px`
      rafId = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    rafId = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <div ref={dotRef} className="cursor-dot" />
}
