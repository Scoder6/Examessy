'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  baseAlpha: number
}

export function ParticleNetwork({
  particleCount = 70,
  connectionDistance = 150,
  speed = 0.3,
  mouseRadius = 180,
  className = '',
}: {
  particleCount?: number
  connectionDistance?: number
  speed?: number
  mouseRadius?: number
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef<number>(0)
  const isVisibleRef = useRef(true)

  const init = useCallback((w: number, h: number) => {
    const p: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      p.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.3 + 0.05,
        baseAlpha: Math.random() * 0.3 + 0.05,
      })
    }
    particlesRef.current = p
  }, [particleCount, speed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
      if (particlesRef.current.length === 0) init(w, h)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    canvas.addEventListener('mousemove', onMouse)
    canvas.addEventListener('mouseleave', onLeave)

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting
    })
    observer.observe(canvas)

    const animate = () => {
      if (!isVisibleRef.current) {
        frameRef.current = requestAnimationFrame(animate)
        return
      }

      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const particles = particlesRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        const mdx = mx - p.x
        const mdy = my - p.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < mouseRadius) {
          const force = (mouseRadius - mdist) / mouseRadius
          p.vx += (mdx / mdist) * force * 0.05
          p.vy += (mdy / mdist) * force * 0.05
          p.alpha = Math.min(p.baseAlpha + force * 0.4, 0.8)
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05
        }

        p.vx += (Math.random() - 0.5) * 0.02
        p.vy += (Math.random() - 0.5) * 0.02
        const maxV = speed * 2
        p.vx = Math.max(-maxV, Math.min(maxV, p.vx))
        p.vy = Math.max(-maxV, Math.min(maxV, p.vy))

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDistance) {
            const a = (1 - dist / connectionDistance) * 0.12
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${a})`
            ctx.lineWidth = 0.4
            ctx.stroke()
          }
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouse)
      canvas.removeEventListener('mouseleave', onLeave)
      observer.disconnect()
    }
  }, [init, connectionDistance, mouseRadius, speed])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
    />
  )
}
