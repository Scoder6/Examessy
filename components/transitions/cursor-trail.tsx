'use client'

import { useEffect, useRef } from 'react'

/**
 * Canvas-based cursor comet trail.
 * Works on both light and dark themes — auto-detects.
 */
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }
    window.addEventListener('resize', onResize)

    // Trail points
    type Pt = { x: number; y: number; life: number; size: number }
    const trail: Pt[] = []
    let mx = -200, my = -200
    let raf = 0

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      const isDark = document.documentElement.classList.contains('dark')

      ctx.clearRect(0, 0, W, H)

      // spawn new point
      trail.push({ x: mx, y: my, life: 1, size: 6 + Math.random() * 4 })

      // update & draw
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i]
        p.life -= 0.045
        if (p.life <= 0) { trail.splice(i, 1); continue }

        const alpha = p.life * (isDark ? 0.65 : 0.5)
        // colour: primary in dark, indigo in light
        const hue = isDark ? 240 : 230
        const sat = isDark ? 90 : 80
        const lum = isDark ? 65 : 50
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hue},${sat}%,${lum}%,${alpha})`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9990, mixBlendMode: 'screen' }}
    />
  )
}
