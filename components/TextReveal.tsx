'use client'

import { motion, useTransform, MotionValue } from 'framer-motion'

export default function TextReveal({ text, progress }: { text: string, progress: MotionValue<number> }) {
  const words = text.split(' ')

  return (
    <p className="font-inter text-manifesto font-normal leading-relaxed tracking-tight max-w-[60ch] flex flex-wrap">
              {words.map((word, i) => {
                const start = i / words.length
                const end = start + (1 / words.length)
                
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(progress, [start, end], [0, 1])
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const y = useTransform(progress, [start, end], [10, 0])
      
                return (
                  <motion.span
                    key={i}
                    style={{ opacity, y, color: "#1A1A1A" }}
                    className="mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                )
              })}    </p>
  )
}
