'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div'
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
  as: Tag = 'span',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref as any, { once: true, margin: '-50px' })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()
    const difference = to - from

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)

      const eased = 1 - Math.pow(1 - progress, 3)
      const current = from + difference * eased

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(to)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, from, to, duration])

  const formatted = count.toFixed(decimals)

  return (
    <Tag ref={ref as any} className={className}>
      {prefix}{formatted}{suffix}
    </Tag>
  )
}
