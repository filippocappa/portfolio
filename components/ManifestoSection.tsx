'use client'

import { useRef, useEffect, useState } from 'react'
import { useScroll, useSpring, useTransform } from 'framer-motion'
import TextReveal from './TextReveal'

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const main = document.querySelector('main')
    if (main) setContainer(main)
  }, [])
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: container ? { current: container } : undefined,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Split progress for two paragraphs
  const p1Progress = useTransform(smoothProgress, [0, 0.6], [0, 1])
  const p2Progress = useTransform(smoothProgress, [0.6, 1], [0, 1])

  return (
    <section ref={sectionRef} className="h-[400vh] relative bg-cream text-off-black snap-start">
      <div className="sticky top-0 h-screen grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 px-page py-section">
        <div className="pt-1">
          <span className="font-geist-mono text-mono-sm">001 — About</span>
        </div>
        <div className="flex flex-col justify-center gap-12 h-full">
          <TextReveal 
            progress={p1Progress}
            text="I believe the most interesting problems sit at the intersection of markets, mathematics, and human behaviour. I study economics not as theory but as a lens — sharpened by data, tested by code, and driven by an obsession with how systems actually work. My work moves between financial modelling, community building, and the quiet discipline of turning noise into signal." 
          />
          
          <div className="pt-8 border-t border-off-black/10">
            <TextReveal 
              progress={p2Progress}
              text="Currently based in Turin, I am pursuing my BSc in Economics and Finance with Data Science at the University of Turin. My academic focus lies at the intersection of quantitative analysis, statistical modelling, and market dynamics." 
            />
          </div>
        </div>
      </div>
    </section>
  )
}
