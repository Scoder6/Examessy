'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function MouseSpotlight() {
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const spotlightX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const spotlightY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  if (!mounted) return null

  return (
    <>
      {/* Main spotlight - subtle */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(var(--primary-rgb), 0.03), transparent 45%)',
          WebkitMaskImage: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), black 40%, transparent 100%)',
        }}
        animate={{
          '--mouse-x': spotlightX,
          '--mouse-y': spotlightY,
        } as any}
      />
    </>
  )
}
