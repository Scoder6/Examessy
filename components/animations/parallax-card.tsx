'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface ParallaxCardProps {
  children: React.ReactNode
  className?: string
  tiltDegree?: number
  glare?: boolean
  scale?: number
  perspective?: number
}

export function ParallaxCard({
  children,
  className = '',
  tiltDegree = 8,
  glare = true,
  scale = 1.02,
  perspective = 1000,
}: ParallaxCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltDegree, -tiltDegree]), {
    stiffness: 200,
    damping: 25,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltDegree, tiltDegree]), {
    stiffness: 200,
    damping: 25,
  })

  const glareX = useTransform(y, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(x, [-0.5, 0.5], [0, 100])

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const posX = (e.clientX - rect.left) / rect.width - 0.5
    const posY = (e.clientY - rect.top) / rect.height - 0.5
    x.set(posX)
    y.set(posY)
  }, [x, y])

  const handleLeave = useCallback(() => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        perspective,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      animate={{
        scale: isHovered ? scale : 1,
      }}
      transition={{
        scale: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}

        {glare && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background: `radial-gradient(circle at ${glareY}% ${glareX}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
