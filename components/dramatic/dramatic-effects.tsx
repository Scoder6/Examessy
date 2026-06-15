'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useSpring, useMotionValue, useInView, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────
   HELPER: safe arc radius — prevents IndexSizeError when life → 0
   ───────────────────────────────────────────────────────────────── */
const safeR = (r: number) => Math.max(0.01, r)

/* ═══════════════════════════════════════════════════════════════
   1. SCROLL EXPLOSION
   ═══════════════════════════════════════════════════════════════ */
export function ScrollExplosion() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastScrollRef = useRef(0)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    type Spark = {
      x: number; y: number; vx: number; vy: number
      life: number; maxLife: number; size: number; color: string
      trail: { x: number; y: number }[]
    }
    let sparks: Spark[] = []

    const COLORS = ['#818cf8','#34d399','#fbbf24','#f472b6','#22d3ee','#a78bfa','#6ee7b7']

    const explode = (x: number, y: number, count = 18) => {
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4
        const speed = 3 + Math.random() * 5
        sparks.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          life: 1,
          maxLife: 1,
          size: 2 + Math.random() * 3,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          trail: []
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      sparks = sparks.filter(s => s.life > 0.01)

      for (const s of sparks) {
        s.trail.push({ x: s.x, y: s.y })
        if (s.trail.length > 5) s.trail.shift()

        s.x += s.vx
        s.y += s.vy
        s.vy += 0.18
        s.vx *= 0.97
        s.life -= 0.028

        // trail dots
        for (let t = 0; t < s.trail.length; t++) {
          const tp = s.trail[t]
          const frac = (t + 1) / s.trail.length
          const r = safeR(s.size * frac * 0.6 * s.life)
          const alpha = frac * s.life * 0.5
          if (alpha <= 0) continue
          ctx.globalAlpha = alpha
          ctx.fillStyle = s.color
          ctx.beginPath()
          ctx.arc(tp.x, tp.y, r, 0, Math.PI * 2)
          ctx.fill()
        }

        // main particle
        const mainR = safeR(s.size * s.life)
        ctx.globalAlpha = s.life
        ctx.fillStyle = s.color
        ctx.shadowBlur = 6
        ctx.shadowColor = s.color
        ctx.beginPath()
        ctx.arc(s.x, s.y, mainR, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    const onScroll = () => {
      const now = window.scrollY
      const diff = Math.abs(now - lastScrollRef.current)
      if (diff > 200) {
        explode(
          window.innerWidth * 0.1 + Math.random() * window.innerWidth * 0.8,
          Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2,
          14
        )
        lastScrollRef.current = now
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9980, mixBlendMode: 'screen' }}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════
   2. SCROLL SPEED LINES
   ═══════════════════════════════════════════════════════════════ */
export function ScrollSpeedLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)
  const prevScrollRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const lines: { x: number; y: number; len: number; speed: number; alpha: number }[] = []

    const addLines = (vel: number) => {
      const count = Math.min(Math.floor(Math.abs(vel) / 15), 6)
      for (let i = 0; i < count; i++) {
        lines.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          len: 40 + Math.random() * 70,
          speed: (vel > 0 ? 1 : -1) * (5 + Math.random() * 5),
          alpha: 0.5 + Math.random() * 0.4
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = lines.length - 1; i >= 0; i--) {
        const l = lines[i]
        l.y += l.speed
        l.alpha -= 0.02
        if (l.alpha <= 0 || l.y < -l.len || l.y > canvas.height + l.len) {
          lines.splice(i, 1); continue
        }
        const g = ctx.createLinearGradient(l.x, l.y, l.x, l.y + l.len)
        g.addColorStop(0, `rgba(129,140,248,0)`)
        g.addColorStop(0.5, `rgba(129,140,248,${l.alpha.toFixed(3)})`)
        g.addColorStop(1, `rgba(129,140,248,0)`)
        ctx.beginPath()
        ctx.moveTo(l.x, l.y)
        ctx.lineTo(l.x, l.y + l.len)
        ctx.strokeStyle = g
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    const onScroll = () => {
      const now = window.scrollY
      const vel = now - prevScrollRef.current
      prevScrollRef.current = now
      if (Math.abs(vel) > 12) addLines(vel)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9975, mixBlendMode: 'screen' }}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════
   3. DRAMATIC REVEAL
   ═══════════════════════════════════════════════════════════════ */
export function DramaticReveal({
  children, className = '', direction = 'up', delay = 0
}: {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'flip'
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const variants = {
    up:    { hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },         visible: { opacity: 1, y: 0, filter: 'blur(0px)' } },
    down:  { hidden: { opacity: 0, y: -50, filter: 'blur(8px)' },        visible: { opacity: 1, y: 0, filter: 'blur(0px)' } },
    left:  { hidden: { opacity: 0, x: -60, filter: 'blur(6px)' },        visible: { opacity: 1, x: 0, filter: 'blur(0px)' } },
    right: { hidden: { opacity: 0, x: 60, filter: 'blur(6px)' },         visible: { opacity: 1, x: 0, filter: 'blur(0px)' } },
    scale: { hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },   visible: { opacity: 1, scale: 1, filter: 'blur(0px)' } },
    flip:  { hidden: { opacity: 0, rotateX: -40, y: 30 },                visible: { opacity: 1, rotateX: 0, y: 0 } },
  } as const

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[direction]}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   4. MAGNETIC BUTTON
   ═══════════════════════════════════════════════════════════════ */
export function MagneticButton({
  children, className = '', strength = 0.3
}: {
  children: React.ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 18 })
  const sy = useSpring(y, { stiffness: 180, damping: 18 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      x.set((e.clientX - r.left - r.width / 2) * strength)
      y.set((e.clientY - r.top - r.height / 2) * strength)
    }
    const leave = () => { x.set(0); y.set(0) }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) }
  }, [strength, x, y])

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} className={className}>
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   5. SPARK BUTTON
   ═══════════════════════════════════════════════════════════════ */
export function SparkButton({
  children, className = '', onClick
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  const [sparks, setSparks] = useState<{ id: number; angle: number; dist: number; color: string }[]>([])
  const COLORS = ['#818cf8','#34d399','#fbbf24','#f472b6','#22d3ee']

  const fire = () => {
    const newSparks = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      angle: (i / 12) * 360 + Math.random() * 30,
      dist: 28 + Math.random() * 40,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    }))
    setSparks(newSparks)
    setTimeout(() => setSparks([]), 650)
    onClick?.()
  }

  return (
    <div className={`relative inline-flex ${className}`} onClick={fire}>
      {children}
      <AnimatePresence>
        {sparks.map(s => (
          <motion.div
            key={s.id}
            className="absolute top-1/2 left-1/2 pointer-events-none"
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{
              x: Math.cos((s.angle * Math.PI) / 180) * s.dist,
              y: Math.sin((s.angle * Math.PI) / 180) * s.dist,
              scale: 0,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div
              className="w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{ background: s.color, boxShadow: `0 0 5px ${s.color}` }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   6. GLITCH TEXT
   ═══════════════════════════════════════════════════════════════ */
const GLITCH_CHARS = '!<>-_\\/[]{}=+*^?#___'

export function GlitchText({ text, className = '', autoGlitch = false, autoDelay = 0 }: {
  text: string
  className?: string
  autoGlitch?: boolean
  autoDelay?: number
}) {
  const [display, setDisplay] = useState(text)
  const [glitching, setGlitching] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startGlitch = useCallback(() => {
    if (glitching) return
    setGlitching(true)
    let iterations = 0
    timerRef.current = setInterval(() => {
      setDisplay(
        text.split('').map((c, i) => {
          if (c === ' ') return ' '
          if (i < iterations) return text[i]
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        }).join('')
      )
      iterations++
      if (iterations > text.length) {
        if (timerRef.current) clearInterval(timerRef.current)
        setDisplay(text)
        setGlitching(false)
      }
    }, 40)
  }, [glitching, text])

  // auto-glitch on mount if requested
  useEffect(() => {
    if (!autoGlitch) return
    const t = setTimeout(() => startGlitch(), autoDelay)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoGlitch, autoDelay])

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  return (
    <span
      className={`cursor-default select-none ${glitching ? 'text-primary' : ''} ${className}`}
      onMouseEnter={startGlitch}
      style={{ transition: 'color 0.15s' }}
    >
      {display}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   7. SCROLLING TEXT TICKER
   ═══════════════════════════════════════════════════════════════ */
export function ScrollingText({
  texts, speed = 40, className = '', reverse = false
}: {
  texts: string[]
  speed?: number
  className?: string
  reverse?: boolean
}) {
  return (
    <div className="overflow-hidden py-3 select-none" aria-hidden>
      <div
        className={`flex gap-12 whitespace-nowrap ${className}`}
        style={{
          animation: `scroll-x ${speed}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {[...texts, ...texts, ...texts].map((t, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className="font-display font-black tracking-widest uppercase text-lg opacity-20 hover:opacity-60 transition-opacity duration-300">
              {t}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/30 inline-block" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   8. EXPLOSIVE COUNTER
   ═══════════════════════════════════════════════════════════════ */
export function ExplosiveCounter({
  from = 0, to, suffix = '', prefix = '', className = '', duration = 2.5
}: {
  from?: number
  to: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [val, setVal] = useState(from)
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    if (!inView) return
    let raf: number
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      const ease = 1 - Math.pow(1 - p, 4)
      setVal(Math.round(from + (to - from) * ease))
      if (p < 1) { raf = requestAnimationFrame(tick) }
      else { setBurst(true); setTimeout(() => setBurst(false), 700) }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, from, to, duration])

  const COLORS = ['#818cf8','#34d399','#fbbf24','#f472b6','#22d3ee','#a78bfa','#6ee7b7','#fb923c']

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <motion.span
        animate={burst ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.4 }}
      >
        {prefix}{val.toLocaleString()}{suffix}
      </motion.span>
      <AnimatePresence>
        {burst && COLORS.map((color, i) => {
          const angle = (i / COLORS.length) * Math.PI * 2
          const dist = 30 + Math.random() * 25
          return (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
              style={{ background: color }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            />
          )
        })}
      </AnimatePresence>
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   9. DRAMATIC CARD — 3D tilt + glow + shimmer
   ═══════════════════════════════════════════════════════════════ */
export function DramaticCard({
  children, className = '', glowColor = 'rgba(129,140,248,0.3)', onClick
}: {
  children: React.ReactNode
  className?: string
  glowColor?: string
  onClick?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [cardStyle, setCardStyle] = useState<React.CSSProperties>({})
  const [shimmer, setShimmer] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect()
    const xPct = (e.clientX - r.left) / r.width
    const yPct = (e.clientY - r.top) / r.height
    const rx = (yPct - 0.5) * -18
    const ry = (xPct - 0.5) * 18
    setCardStyle({
      transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.025)`,
      boxShadow: `0 16px 50px -8px ${glowColor}`,
      transition: 'transform 0.12s, box-shadow 0.2s',
    })
    setShimmer({ x: xPct * 100, y: yPct * 100 })
  }

  const onLeave = () => {
    setCardStyle({ transition: 'transform 0.5s ease, box-shadow 0.5s ease' })
    setHovered(false)
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={cardStyle}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => setHovered(true)}
      onClick={onClick}
    >
      {children}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{
            background: `radial-gradient(260px circle at ${shimmer.x}% ${shimmer.y}%, rgba(255,255,255,0.1) 0%, transparent 55%)`,
          }}
        />
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   10. FLOATING EMOJI BURST
   ═══════════════════════════════════════════════════════════════ */
export function FloatingBurst({
  emojis = ['⚡','🔥','✨','💥','🚀','🎯','🏆','💎'],
  interval = 6000
}: {
  emojis?: string[]
  interval?: number
}) {
  const [items, setItems] = useState<{ id: number; emoji: string; x: number; y: number }[]>([])

  useEffect(() => {
    const id = setInterval(() => {
      const item = {
        id: Date.now(),
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: 5 + Math.random() * 88,
        y: 15 + Math.random() * 65,
      }
      setItems(prev => [...prev.slice(-3), item])
      setTimeout(() => setItems(prev => prev.filter(i => i.id !== item.id)), 2400)
    }, interval)
    return () => clearInterval(id)
  }, [emojis, interval])

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9970 }}>
      <AnimatePresence>
        {items.map(item => (
          <motion.div
            key={item.id}
            className="absolute text-2xl select-none"
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            initial={{ opacity: 0, y: 0, scale: 0.5, rotate: -15 }}
            animate={{ opacity: [0, 1, 1, 0], y: -70, scale: [0.5, 1.2, 1, 0.7], rotate: [-15, 5, -5, 8] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   11. STAGGER GRID
   ═══════════════════════════════════════════════════════════════ */
export function StaggerGrid({
  children, className = '', stagger = 0.08, viewMargin = '-60px'
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
  viewMargin?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: viewMargin as any })

  const childVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.94, filter: 'blur(5px)' },
    visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  }

  const children_ = Array.isArray(children) ? children : [children]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: stagger } }, hidden: {} }}
    >
      {children_.map((child, i) => (
        <motion.div
          key={i}
          variants={childVariants}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   12. PULSE BORDER
   ═══════════════════════════════════════════════════════════════ */
export function PulseBorder({
  children, className = '', color = '#818cf8'
}: {
  children: React.ReactNode
  className?: string
  color?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[inherit]"
        style={{ border: `1px solid ${color}` }}
        animate={inView ? { opacity: [0, 0.5, 0], scale: [0.985, 1.015, 0.985] } : { opacity: 0 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   13. WORD REVEAL
   ═══════════════════════════════════════════════════════════════ */
export function WordReveal({
  text, className = '', wordClass = '', delay = 0
}: {
  text: string
  className?: string
  wordClass?: string
  delay?: number
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const words = text.split(' ')

  return (
    <p ref={ref} className={className} style={{ transformStyle: 'preserve-3d' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block mr-[0.28em] ${wordClass}`}
          initial={{ opacity: 0, y: 18, rotateX: -40, filter: 'blur(4px)' }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.45, delay: delay + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 600 }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  )
}

/* ═══════════════════════════════════════════════════════════════
   14. HOVER SPOTLIGHT  — includes onClick passthrough
   ═══════════════════════════════════════════════════════════════ */
export function HoverSpotlight({
  children, className = '', onClick
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: -999, y: -999 })
  const [active, setActive] = useState(false)

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
      onMouseMove={e => {
        const r = ref.current!.getBoundingClientRect()
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => { setActive(false) }}
    >
      {children}
      {active && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{
            background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, rgba(var(--primary-rgb),0.07) 0%, transparent 70%)`,
          }}
        />
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   15. LIQUID BUTTON
   ═══════════════════════════════════════════════════════════════ */
export function LiquidButton({
  children, onClick, className = '', style
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const ripple = { id: Date.now(), x: e.clientX - r.left, y: e.clientY - r.top }
    setRipples(prev => [...prev.slice(-4), ripple])
    setTimeout(() => setRipples(prev => prev.filter(rp => rp.id !== ripple.id)), 680)
    onClick?.()
  }

  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      style={style}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {ripples.map(rp => (
          <motion.span
            key={rp.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: rp.x, top: rp.y,
              background: 'rgba(255,255,255,0.22)',
              transform: 'translate(-50%,-50%)',
            }}
            initial={{ width: 0, height: 0, opacity: 0.65 }}
            animate={{ width: 420, height: 420, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  )
}
