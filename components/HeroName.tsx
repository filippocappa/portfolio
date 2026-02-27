'use client'

import { useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function HeroName({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Super reactive and precise springs
  const x = useSpring(mouseX, { stiffness: 1000, damping: 40 })
  const y = useSpring(mouseY, { stiffness: 1000, damping: 40 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    
    // Set values relative to the container's top-left corner
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-fit h-fit overflow-visible"
    >
      {/* The Glow */}
      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 0.9 : 0.2,
        }}
        transition={{ opacity: { duration: 0.2 } }}
        className="absolute top-0 left-0 w-[350px] h-[350px] bg-accent/15 blur-[80px] rounded-full pointer-events-none z-0"
      />
      
      {/* The Text Content */}
      <div className="relative z-10 pointer-events-none select-none">
        {children}
      </div>
    </div>
  )
}
