'use client'

import { motion } from 'framer-motion'

export const FocusParagraph = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0.2 }}
    whileInView={{ opacity: 1 }}
    viewport={{ margin: "-20% 0px -40% 0px" }}
    transition={{ duration: 0.5 }}
    className="mb-8"
  >
    <p className="font-sans text-manifesto font-normal leading-relaxed">
      {children}
    </p>
  </motion.div>
)

export const FocusListItem = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0.2 }}
    whileInView={{ opacity: 1 }}
    viewport={{ margin: "-20% 0px -40% 0px" }}
    transition={{ duration: 0.5 }}
    className="flex gap-6 mb-6"
  >
    <span className="mono-sm opacity-30 flex-shrink-0">→</span>
    <p className="font-mono text-sm leading-relaxed opacity-90">{children}</p>
  </motion.div>
)
