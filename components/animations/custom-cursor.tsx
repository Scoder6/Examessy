'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [clickRipples, setClickRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const rippleId = useRef(0)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const followerX = useSpring(cursorX, { stiffness: 150, damping: 15, mass: 0.5 })
  const followerY = useSpring(cursorY, { stiffness: 150, damping: 15, mass: 0.5 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
    setIsVisible(true)
  }, [cursorX, cursorY])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  const handleClick = useCallback((e: MouseEvent) => {
    const id = rippleId.current++
    setClickRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }])
    setTimeout(() => {
      setClickRipples((prev) => prev.filter((r) => r.id !== id))
    }, 800)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsTouch(isTouchDevice)
    if (isTouchDevice) return

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('click', handleClick)

    const addHover = () => setIsHovering(true)
    const removeHover = () => setIsHovering(false)

    const attachHover = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
    }
    attachHover()

    const observer = new MutationObserver(attachHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('click', handleClick)
      observer.disconnect()
    }
  }, [handleMouseMove, handleMouseLeave, handleClick])

  if (isTouch) return null

  return (
    <>
      {/* Dot — use inline style for background, never animate backgroundColor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          /* Static CSS custom property — not animated, so no framer warning */
          backgroundColor: 'var(--foreground)',
        }}
        animate={{
          width: isHovering ? 10 : 6,
          height: isHovering ? 10 : 6,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring follower */}
      <motion.div
        className="fixed pointer-events-none z-[9998] border border-foreground/30 rounded-full"
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 48 : 36,
          height: isHovering ? 48 : 36,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.5,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Click ripples */}
      {clickRipples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed pointer-events-none z-[9997] rounded-full border border-white/20"
          style={{ left: ripple.x, top: ripple.y }}
          initial={{ width: 0, height: 0, opacity: 0.6, x: 0, y: 0 }}
          animate={{ width: 60, height: 60, opacity: 0, x: -30, y: -30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}
    </>
  )
}
