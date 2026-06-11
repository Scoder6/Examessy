'use client'

import { useEffect, useRef } from 'react'

export function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = window.innerWidth * 0.5
      canvas.height = window.innerHeight * 0.5
    }
    resize()
    window.addEventListener('resize', resize)

    const generateNoise = () => {
      const w = canvas.width
      const h = canvas.height
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = 12
      }

      ctx.putImageData(imageData, 0, 0)
      animationId = requestAnimationFrame(generateNoise)
    }

    generateNoise()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9995] opacity-[0.15]"
      style={{ imageRendering: 'pixelated', mixBlendMode: 'overlay' }}
    />
  )
}
