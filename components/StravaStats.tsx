'use client'

import { motion } from 'framer-motion'

interface StravaStatsProps {
  kmPerWeek: number
  avgPace: string
  totalRuns: number
}

export default function StravaStats({ data }: { data: StravaStatsProps }) {
  const stats = [
    { label: 'WEEKLY_AVG_KM', value: `${data.kmPerWeek.toFixed(1)}` },
    { label: 'AVG_PACE', value: data.avgPace },
    { label: 'RUN_COUNT_21D', value: data.totalRuns },
  ]

  return (
    <div className="my-12 grid grid-cols-3 gap-8 py-8 border-t border-off-black/10 font-mono">
      {stats.map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex flex-col gap-1"
        >
          <span className="text-[9px] opacity-40 uppercase tracking-[0.2em]">{stat.label}</span>
          <span className="text-xl font-bold tracking-tighter text-off-black">
            {stat.value}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
