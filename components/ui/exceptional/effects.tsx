'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'

// ============ MAGNETIC BUTTON ============
export function MagneticButton({ 
  children, 
  className = '',
  strength = 0.3 
}: { 
  children: React.ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      
      x.set(distanceX * strength)
      y.set(distanceY * strength)
    }
    
    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }
    
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength, x, y])
  
  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============ GLOWING BORDER ============
export function GlowingBorder({ 
  children, 
  className = '',
  color = 'primary'
}: { 
  children: React.ReactNode
  className?: string
  color?: 'primary' | 'secondary' | 'accent'
}) {
  const colors = {
    primary: 'from-primary via-secondary to-accent',
    secondary: 'from-secondary via-accent to-primary',
    accent: 'from-accent via-primary to-secondary'
  }
  
  return (
    <div className={`relative group ${className}`}>
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${colors[color]} rounded-2xl opacity-0 group-hover:opacity-75 blur transition-all duration-500 animate-gradient-shift`} />
      <div className="relative">
        {children}
      </div>
    </div>
  )
}

// ============ TEXT REVEAL ANIMATION ============
export function TextReveal({ 
  text, 
  className = '',
  delay = 0
}: { 
  text: string
  className?: string
  delay?: number
}) {
  const words = text.split(' ')
  
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5, 
            delay: delay + i * 0.1,
            type: 'spring',
            stiffness: 100
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </span>
  )
}

// ============ PARALLAX LAYER ============
export function ParallaxLayer({ 
  children, 
  speed = 0.5,
  className = ''
}: { 
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const springY = useSpring(y, { damping: 20, stiffness: 100 })
  
  return (
    <motion.div ref={ref} style={{ y: springY }} className={className}>
      {children}
    </motion.div>
  )
}

// ============ SCROLL PROGRESS INDICATOR ============
export function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { damping: 20, stiffness: 100 })
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent origin-left z-50"
      style={{ scaleX }}
    />
  )
}

// ============ TILT CARD ============
export function TiltCard({ 
  children, 
  className = '',
  glare = true
}: { 
  children: React.ReactNode
  className?: string
  glare?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20
      
      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
      setGlarePosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
    }
    
    const handleMouseLeave = () => {
      setTransform('')
    }
    
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  
  return (
    <div
      ref={ref}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ transform, transformStyle: 'preserve-3d' }}
    >
      {children}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-inherit"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`
          }}
        />
      )}
    </div>
  )
}

// ============ ANIMATED COUNTER ============
export function AnimatedCounter({ 
  value, 
  duration = 2,
  prefix = '',
  suffix = '',
  className = ''
}: { 
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  
  useEffect(() => {
    if (!isVisible) return
    
    let startTime: number
    let animationFrame: number
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * value))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, value, duration])
  
  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

// ============ MORPHING SHAPES BACKGROUND ============
export function MorphingShapes({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-full blur-3xl animate-morph-blob" />
      <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-secondary/20 via-transparent to-transparent rounded-full blur-3xl animate-morph-blob" style={{ animationDelay: '-10s' }} />
      <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-accent/10 via-transparent to-transparent rounded-full blur-3xl animate-morph-blob" style={{ animationDelay: '-5s' }} />
    </div>
  )
}

// ============ FLOATING ELEMENTS ============
export function FloatingElement({ 
  children, 
  duration = 6,
  distance = 10,
  delay = 0,
  className = ''
}: { 
  children: React.ReactNode
  duration?: number
  distance?: number
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance, distance, -distance],
        rotate: [-2, 2, -2]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay
      }}
    >
      {children}
    </motion.div>
  )
}

// ============ GRADIENT TEXT ============
export function GradientText({ 
  children, 
  from = 'primary',
  via = 'secondary',
  to = 'accent',
  className = ''
}: { 
  children: React.ReactNode
  from?: string
  via?: string
  to?: string
  className?: string
}) {
  const colorMap: Record<string, string> = {
    primary: 'from-primary',
    secondary: 'via-secondary',
    accent: 'to-accent'
  }
  
  return (
    <span className={`bg-gradient-to-r ${colorMap[from] || from} ${colorMap[via] || via} ${colorMap[to] || to} bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift ${className}`}>
      {children}
    </span>
  )
}
