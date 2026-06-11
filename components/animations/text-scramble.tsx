'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useInView } from 'framer-motion'

const CHARS = '!<>-_\\/[]{}—=+*^?#________abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

interface TextScrambleProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' | 'div'
  className?: string
  speed?: number
  scrambleOnHover?: boolean
  delay?: number
  tick?: number
}

export function TextScramble({
  children,
  as: Tag = 'span',
  className = '',
  speed = 50,
  scrambleOnHover = false,
  delay = 0,
  tick = 2,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children)
  const [isAnimating, setIsAnimating] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref as any, { once: true, margin: '-100px' })
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const hasScrambled = useRef(false)

  const doScramble = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    hasScrambled.current = true
    const target = children
    let iteration = 0
    const maxIterations = Math.max(target.length * tick, 15)

    intervalRef.current = setInterval(() => {
      setDisplayText(
        target
          .split('')
          .map((char, i) => {
            if (i < Math.floor(iteration / tick)) return char
            if (char === ' ') return ' '
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      iteration++
      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current)
        setDisplayText(target)
        setIsAnimating(false)
      }
    }, speed)

    return () => clearInterval(intervalRef.current)
  }, [children, speed, tick, isAnimating])

  useEffect(() => {
    if (isInView && !hasScrambled.current) {
      const t = setTimeout(() => {
        doScramble()
      }, delay)
      return () => clearTimeout(t)
    }
  }, [isInView, doScramble, delay])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseEnter={scrambleOnHover && !isAnimating ? doScramble : undefined}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {displayText}
    </Tag>
  )
}
