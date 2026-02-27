'use client'

import { motion } from 'framer-motion'

export const VolatilityChart = () => {
  const points = [20, 45, 30, 60, 45, 80, 65, 90, 75, 100, 85, 120]
  const path = `M 0 ${150 - points[0]} ` + points.map((p, i) => `L ${(i * 40)} ${150 - p}`).join(' ')

  return (
    <div className="my-12 p-8 bg-off-black/10 border border-accent/20 rounded-sm overflow-hidden font-mono">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs opacity-50 uppercase tracking-widest text-off-black dark:text-cream">PORTFOLIO_VOLATILITY_INDEX</span>
        <span className="text-xs text-accent">LIVE_SIGNAL: 1.85_SHARPE</span>
      </div>
      <div className="relative h-40 w-full border-b border-l border-white/10">
        <svg viewBox="0 0 440 150" className="w-full h-full overflow-visible">
          <motion.path
            d={path}
            fill="none"
            stroke="#F37021"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          {points.map((p, i) => (
            <motion.circle
              key={i}
              cx={i * 40}
              cy={150 - p}
              r="3"
              fill="#F37021"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * i }}
            />
          ))}
        </svg>
      </div>
      <div className="flex justify-between mt-4 text-[10px] opacity-30 text-off-black dark:text-cream">
        <span>T0_JAN</span>
        <span>T1_JUN</span>
        <span>T2_DEC</span>
      </div>
    </div>
  )
}
