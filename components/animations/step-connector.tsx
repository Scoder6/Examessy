'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function StepConnector() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as any, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="hidden md:block absolute top-1/2 left-[16.66%] right-[16.66%] h-0.5 -translate-y-1/2 z-0">
      <div className="w-full h-full bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: '0%' }}
          animate={isInView ? { width: '100%' } : { width: '0%' }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
        />
      </div>

      {/* Step dots */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full -translate-x-1/2"
          style={{ left: `${16.66 + i * 33.33}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.2, ease: 'backOut' }}
        >
          <div className="w-full h-full rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.7 + i * 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  )
}
