'use client'

/**
 * Silences known third-party deprecation warnings that we have no control over:
 * - THREE.Clock deprecated (r183+) — used internally by @react-three/fiber until it updates
 *
 * Only runs in development. Production builds don't log these.
 */
import { useEffect } from 'react'

export function SuppressKnownWarnings() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const originalWarn = console.warn.bind(console)
    const originalError = console.error.bind(console)

    const SUPPRESSED = [
      'THREE.Clock: This module has been deprecated',
      'THREE.Timer',
    ]

    console.warn = (...args: unknown[]) => {
      const msg = String(args[0] ?? '')
      if (SUPPRESSED.some(s => msg.includes(s))) return
      originalWarn(...args)
    }

    console.error = (...args: unknown[]) => {
      const msg = String(args[0] ?? '')
      if (SUPPRESSED.some(s => msg.includes(s))) return
      originalError(...args)
    }

    return () => {
      console.warn = originalWarn
      console.error = originalError
    }
  }, [])

  return null
}
