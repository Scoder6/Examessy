'use client'

import { useEffect, useRef, useState, useCallback, createContext, useContext, useMemo, Suspense } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Route meta ────────────────────────────────────────────── */
const ROUTE_META: Record<string, { label: string; color: string; secondary: string }> = {
  '/':            { label: 'HOME',         color: '#818cf8', secondary: '#34d399' },
  '/exams':       { label: 'EXAMS',        color: '#22d3ee', secondary: '#818cf8' },
  '/features':    { label: 'FEATURES',     color: '#a78bfa', secondary: '#34d399' },
  '/pricing':     { label: 'PRICING',      color: '#fbbf24', secondary: '#f59e0b' },
  '/blog':        { label: 'INSIGHTS',     color: '#34d399', secondary: '#818cf8' },
  '/about':       { label: 'ABOUT',        color: '#f472b6', secondary: '#818cf8' },
  '/contact':     { label: 'CONTACT',      color: '#22d3ee', secondary: '#a78bfa' },
  '/dashboard':   { label: 'DASHBOARD',    color: '#10b981', secondary: '#34d399' },
  '/auth/login':  { label: 'LOGIN',        color: '#818cf8', secondary: '#a78bfa' },
  '/auth/sign-up':{ label: 'JOINING',      color: '#34d399', secondary: '#818cf8' },
  '/payment':     { label: 'PAYMENT',      color: '#fbbf24', secondary: '#f59e0b' },
  '/testimonials':{ label: 'STORIES',      color: '#f472b6', secondary: '#818cf8' },
  '/careers':     { label: 'CAREERS',      color: '#818cf8', secondary: '#22d3ee' },
  '/privacy':     { label: 'PRIVACY',      color: '#94a3b8', secondary: '#64748b' },
  '/terms':       { label: 'TERMS',        color: '#94a3b8', secondary: '#64748b' },
}

function getRouteMeta(path: string) {
  return ROUTE_META[path] ?? { label: path.replace('/', '').toUpperCase() || 'PAGE', color: '#818cf8', secondary: '#34d399' }
}

/* ─── Context ───────────────────────────────────────────────── */
interface TransitionCtx {
  navigateTo: (href: string) => void
  isTransitioning: boolean
}
const TransitionContext = createContext<TransitionCtx>({ navigateTo: () => {}, isTransitioning: false })
export function usePageTransition() { return useContext(TransitionContext) }

/* ─── Wormhole 3-D scene ─────────────────────────────────────── */

/** Tunnel of rings rushing toward camera */
function TunnelRings({ color, progress }: { color: string; progress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const col = useMemo(() => new THREE.Color(color), [color])
  const RINGS = 28

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.children.forEach((ring, i) => {
      // rings start far back and rush toward camera
      const base = -RINGS + i * 2
      let z = ((base + t * 18 * progress) % (RINGS * 2)) - RINGS * 0.3
      ring.position.z = z
      // scale grows as ring approaches
      const s = THREE.MathUtils.mapLinear(z, -RINGS, 4, 0.2, 3.5)
      ring.scale.setScalar(Math.max(0.1, s))
      // opacity fade at edges
      const mat = (ring as THREE.Mesh).material as THREE.MeshBasicMaterial
      mat.opacity = THREE.MathUtils.clamp(THREE.MathUtils.mapLinear(Math.abs(z), 0, RINGS, 0.6, 0), 0, 0.7)
    })
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: RINGS }).map((_, i) => (
        <mesh key={i} position={[0, 0, -RINGS + i * 2]}>
          <torusGeometry args={[3, 0.06, 12, 80]} />
          <meshBasicMaterial color={col} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

/** Particle stream — like a hyperdrive star streak */
function HyperParticles({ color, progress }: { color: string; progress: number }) {
  const ref = useRef<THREE.Points>(null)
  const COUNT = 1200
  const pos = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 0.5 + Math.random() * 4
      arr[i * 3]     = Math.cos(a) * r
      arr[i * 3 + 1] = Math.sin(a) * r
      arr[i * 3 + 2] = (Math.random() - 0.5) * 60
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const arr = ref.current.geometry.attributes.position.array as Float32Array
    const speed = 30 * progress
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 2] += speed * 0.016
      if (arr[i * 3 + 2] > 10) arr[i * 3 + 2] = -50
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={ref} positions={pos} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={color} size={0.12} sizeAttenuation
        depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.85} />
    </Points>
  )
}

/** Chromatic aberration shockwave rings emanating outward */
function ShockwaveRings({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const col = useMemo(() => new THREE.Color(color), [color])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.children.forEach((child, i) => {
      const delay = i * 0.15
      const cycle = ((t - delay) % 1.2)
      const s = cycle * 6
      child.scale.setScalar(s)
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
      mat.opacity = Math.max(0, 0.5 - cycle * 0.45)
    })
  })

  return (
    <group ref={groupRef} position={[0, 0, 1]}>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i}>
          <torusGeometry args={[1, 0.03, 8, 60]} />
          <meshBasicMaterial color={col} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

/** Camera drift — pulls viewer into the wormhole */
function CameraDriver({ progress }: { progress: number }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 2 - progress * 1.5, 0.06)
    camera.fov = THREE.MathUtils.lerp(camera.fov, 55 + progress * 35, 0.08)
    camera.updateProjectionMatrix()
  })
  return null
}

function WormholeScene({ color, secondary, progress }: { color: string; secondary: string; progress: number }) {
  return (
    <>
      <color attach="background" args={['#000008'] as any} />
      <fog attach="fog" args={['#000008', 10, 60] as any} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 2]} intensity={3} color={color} />
      <pointLight position={[3, 2, -5]} intensity={1.5} color={secondary} />
      <CameraDriver progress={progress} />
      <TunnelRings color={color} progress={progress} />
      <HyperParticles color={color} progress={progress} />
      <ShockwaveRings color={secondary} />
    </>
  )
}

/* ─── Main overlay component ─────────────────────────────────── */
interface OverlayProps { color: string; secondary: string; label: string; phase: 'in' | 'hold' | 'out' }

function TransitionOverlay({ color, secondary, label, phase }: OverlayProps) {
  const progress = phase === 'in' ? 1 : phase === 'hold' ? 1 : 0.3

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === 'out' ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: phase === 'out' ? 0.6 : 0.3, ease: 'easeInOut' }}
    >
      {/* WebGL wormhole */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 2]} gl={{ antialias: true }}>
            <WormholeScene color={color} secondary={secondary} progress={progress} />
          </Canvas>
        </Suspense>
      </div>

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 30%, #000010 100%)`,
        }}
      />

      {/* Route label — big chunky text */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: phase === 'hold' ? 1 : 0, scale: phase === 'hold' ? 1 : 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          {/* Glow behind text */}
          <div
            className="absolute inset-0 blur-3xl scale-150"
            style={{ background: color, opacity: 0.2 }}
          />
          <p
            className="relative font-display font-black tracking-[0.3em] text-white/90 uppercase select-none"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              textShadow: `0 0 40px ${color}, 0 0 80px ${color}60`,
            }}
          >
            {label}
          </p>
        </div>
        {/* Animated loading bar */}
        <div className="mt-6 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${color}, ${secondary})` }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </div>
        <p className="mt-3 font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase">
          navigating
        </p>
      </motion.div>

      {/* Corner HUD decorations */}
      {[
        'top-4 left-4 border-t-2 border-l-2',
        'top-4 right-4 border-t-2 border-r-2',
        'bottom-4 left-4 border-b-2 border-l-2',
        'bottom-4 right-4 border-b-2 border-r-2',
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={`absolute w-8 h-8 ${cls}`}
          style={{ borderColor: color, opacity: 0.5 }}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
        />
      ))}
    </motion.div>
  )
}

/* ─── Provider + intercepted router ──────────────────────────── */
export function WormholeTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [state, setState] = useState<{
    active: boolean
    phase: 'in' | 'hold' | 'out'
    href: string
    meta: ReturnType<typeof getRouteMeta>
  } | null>(null)

  const navigateTo = useCallback((href: string) => {
    if (href === pathname) return
    const meta = getRouteMeta(href)
    setState({ active: true, phase: 'in', href, meta })

    // in (0.35s) → hold (0.7s) → navigate → out (0.55s)
    setTimeout(() => setState(s => s ? { ...s, phase: 'hold' } : s), 350)
    setTimeout(() => {
      router.push(href)
      setState(s => s ? { ...s, phase: 'out' } : s)
      setTimeout(() => setState(null), 550)
    }, 1000)
  }, [pathname, router])

  return (
    <TransitionContext.Provider value={{ navigateTo, isTransitioning: !!state?.active }}>
      {children}
      <AnimatePresence>
        {state?.active && (
          <TransitionOverlay
            key="wormhole"
            color={state.meta.color}
            secondary={state.meta.secondary}
            label={state.meta.label}
            phase={state.phase}
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  )
}

/* ─── Drop-in link that uses the wormhole ────────────────────── */
import type { AnchorHTMLAttributes } from 'react'

interface WormholeLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  className?: string
}

export function WormholeLink({ href, children, className, onClick, ...rest }: WormholeLinkProps) {
  const { navigateTo, isTransitioning } = usePageTransition()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('#')) return
    e.preventDefault()
    if (!isTransitioning) {
      onClick?.(e)
      navigateTo(href)
    }
  }

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  )
}
