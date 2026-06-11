'use client'

import { useState, useEffect, useRef } from 'react'

interface TypewriterProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  cursor?: boolean
  cursorChar?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' | 'div'
  onComplete?: () => void
}

export function Typewriter({
  text,
  speed = 40,
  delay = 500,
  className = '',
  cursor = true,
  cursorChar = '|',
  as: Tag = 'span',
  onComplete,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [started, setStarted] = useState(false)
  const indexRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setStarted(true)
    }, delay)

    return () => clearTimeout(delayTimeout)
  }, [delay])

  useEffect(() => {
    if (!started) return

    if (indexRef.current < text.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayText(text.slice(0, indexRef.current + 1))
        indexRef.current++
      }, speed)
    } else {
      onComplete?.()
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [started, displayText, text, speed, onComplete])

  useEffect(() => {
    if (!cursor) return
    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(blinkInterval)
  }, [cursor])

  const isComplete = indexRef.current >= text.length

  return (
    <Tag className={className}>
      {displayText}
      {cursor && !(isComplete && !showCursor) && (
        <span
          className={`inline-block ml-0.5 -mb-0.5 font-light ${
            isComplete ? 'text-primary/60' : 'text-primary'
          } ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-75`}
          style={{ animation: isComplete ? 'none' : undefined }}
        >
          {cursorChar}
        </span>
      )}
    </Tag>
  )
}
