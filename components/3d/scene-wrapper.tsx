'use client'

import { Suspense, useEffect, useState, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial, Stars, Torus } from '@react-three/drei'
import * as THREE from 'three'

/* ─────────────────────────────────────────────
   THEME HOOK  – reads .dark class, stays in sync
   ───────────────────────────────────────────── */
export function useIsDark() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const check = () => setDark(document.documentElement.classList.contains('dark'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  return dark
}

/* ─────────────────────────────────────────────
   RE-USABLE CANVAS WRAPPER
   ───────────────────────────────────────────── */
interface SceneWrapperProps {
  children: React.ReactNode
  className?: string
  opacity?: number
  fov?: number
  cameraZ?: number
}
export function SceneWrapper({ children, className = '', opacity = 0.45, fov = 50, cameraZ = 12 }: SceneWrapperProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ opacity }}>
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, cameraZ], fov }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
          {children}
        </Canvas>
      </Suspense>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SHARED PRIMITIVES
   ───────────────────────────────────────────── */

/** Slow-rotating ring cluster  */
export function RingCluster({ isDark, count = 5 }: { isDark: boolean; count?: number }) {
  const g = useRef<THREE.Group>(null)
  const colors = isDark
    ? ['#818cf8','#34d399','#fbbf24','#f472b6','#22d3ee']
    : ['#1e3a8a','#059669','#d97706','#db2777','#0891b2']
  useFrame(s => {
    if (!g.current) return
    const t = s.clock.getElapsedTime()
    g.current.children.forEach((c, i) => {
      c.rotation.z = t * (0.1 + i * 0.025) * (i % 2 ? 1 : -1)
      c.rotation.x = Math.sin(t * 0.2 + i) * 0.15
    })
  })
  return (
    <group ref={g} position={[0, 0, -3]}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} rotation={[Math.PI * 0.5, 0, 0]}>
          <torusGeometry args={[2.5 + i * 0.8, 0.04 - i * 0.004, 12, 64]} />
          <meshStandardMaterial color={colors[i % colors.length]} transparent opacity={0.4 - i * 0.05}
            emissive={colors[i % colors.length]} emissiveIntensity={isDark ? 0.3 : 0.1} />
        </mesh>
      ))}
    </group>
  )
}

/** Ambient particles cloud */
export function ParticleCloud({ isDark, count = 1500, spread = 25 }: { isDark: boolean; count?: number; spread?: number }) {
  const ref = useRef<THREE.Points>(null)
  const pos = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const r = Math.random() * spread + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i3+1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i3+2] = r * Math.cos(phi) - spread * 0.5
    }
    return arr
  }, [count, spread])

  useFrame(s => {
    if (!ref.current) return
    ref.current.rotation.y = s.clock.getElapsedTime() * 0.015
  })

  return (
    <Points ref={ref} positions={pos} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={isDark ? '#818cf8' : '#1e3a8a'} size={0.07}
        sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.6} />
    </Points>
  )
}

/** DNA double-helix */
export function DNAHelix({ isDark, count = 30 }: { isDark: boolean; count?: number }) {
  const g = useRef<THREE.Group>(null)
  const nodes = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 4
      const y = (i - count / 2) * 0.4
      return {
        left: [Math.cos(angle) * 1.8, y, Math.sin(angle) * 1.8 - 10] as [number,number,number],
        right: [Math.cos(angle + Math.PI) * 1.8, y, Math.sin(angle + Math.PI) * 1.8 - 10] as [number,number,number],
        color: i % 2 === 0 ? (isDark ? '#818cf8' : '#1e3a8a') : (isDark ? '#34d399' : '#059669')
      }
    })
  }, [count, isDark])

  useFrame(s => { if (g.current) g.current.rotation.y = s.clock.getElapsedTime() * 0.08 })

  return (
    <group ref={g}>
      {nodes.map((n, i) => (
        <group key={i}>
          <mesh position={n.left}><sphereGeometry args={[0.1, 8, 8]} /><meshStandardMaterial color={n.color} emissive={n.color} emissiveIntensity={0.4} /></mesh>
          <mesh position={n.right}><sphereGeometry args={[0.1, 8, 8]} /><meshStandardMaterial color={n.color} emissive={n.color} emissiveIntensity={0.4} /></mesh>
        </group>
      ))}
    </group>
  )
}

/** Geometric wireframe cluster */
export function GeometricCluster({ isDark, items = 8 }: { isDark: boolean; items?: number }) {
  const g = useRef<THREE.Group>(null)
  const palette = isDark
    ? ['#818cf8','#34d399','#fbbf24','#f472b6','#22d3ee','#a78bfa','#6ee7b7','#fde68a']
    : ['#1e3a8a','#059669','#d97706','#db2777','#0891b2','#4f46e5','#047857','#b45309']

  const shapes = useMemo(() => Array.from({ length: items }).map((_, i) => ({
    pos: [(Math.random()-0.5)*30, (Math.random()-0.5)*20, (Math.random()-0.5)*20-15] as [number,number,number],
    type: ['oct','ico','dod','tet'][i%4],
    scale: 0.6 + Math.random() * 0.8,
    color: palette[i % palette.length],
    speed: 0.05 + Math.random() * 0.1
  })), [items])

  useFrame(s => {
    if (!g.current) return
    const t = s.clock.getElapsedTime()
    g.current.children.forEach((c, i) => {
      c.rotation.x = t * shapes[i].speed + i
      c.rotation.y = t * shapes[i].speed * 1.3 + i
    })
  })

  return (
    <group ref={g}>
      {shapes.map((sh, i) => (
        <Float key={i} speed={0.8+i*0.1} rotationIntensity={0.4} floatIntensity={1}>
          <mesh position={sh.pos} scale={sh.scale}>
            {sh.type === 'oct' && <octahedronGeometry args={[1]} />}
            {sh.type === 'ico' && <icosahedronGeometry args={[1]} />}
            {sh.type === 'dod' && <dodecahedronGeometry args={[1]} />}
            {sh.type === 'tet' && <tetrahedronGeometry args={[1]} />}
            <meshStandardMaterial wireframe color={sh.color} transparent opacity={0.45}
              emissive={sh.color} emissiveIntensity={isDark ? 0.35 : 0.1} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

/** Morphing distorted sphere – "knowledge orb" */
export function KnowledgeOrb({ isDark, color, position = [0,0,-5] as [number,number,number], size = 1.5 }:
  { isDark: boolean; color?: string; position?: [number,number,number]; size?: number }) {
  const c = color ?? (isDark ? '#818cf8' : '#1e3a8a')
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1}>
      <Sphere args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial color={c} distort={0.35} speed={1.8} roughness={0.1} metalness={0.85}
          transparent opacity={0.7} emissive={c} emissiveIntensity={isDark ? 0.25 : 0.1} />
      </Sphere>
    </Float>
  )
}

/** Neural web: nodes + connections */
export function NeuralWeb({ isDark, nodeCount = 40, spread = 20 }: { isDark: boolean; nodeCount?: number; spread?: number }) {
  const g = useRef<THREE.Group>(null)

  const nodes = useMemo(() => Array.from({ length: nodeCount }).map(() => ({
    pos: [(Math.random()-0.5)*spread, (Math.random()-0.5)*spread*0.6, (Math.random()-0.5)*spread-10] as [number,number,number],
    color: [isDark ? '#818cf8':'#1e3a8a', isDark ? '#34d399':'#059669', isDark ? '#fbbf24':'#d97706'][Math.floor(Math.random()*3)]
  })), [nodeCount, spread, isDark])

  const lineGeo = useMemo(() => {
    const pts: number[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i+1; j < nodes.length; j++) {
        const dx = nodes[i].pos[0]-nodes[j].pos[0]
        const dy = nodes[i].pos[1]-nodes[j].pos[1]
        const dz = nodes[i].pos[2]-nodes[j].pos[2]
        if (Math.sqrt(dx*dx+dy*dy+dz*dz) < 7 && Math.random() > 0.55) {
          pts.push(...nodes[i].pos, ...nodes[j].pos)
        }
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    return geo
  }, [nodes])

  useFrame(s => { if (g.current) g.current.rotation.y = s.clock.getElapsedTime() * 0.02 })

  return (
    <group ref={g}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={isDark ? '#818cf8':'#1e3a8a'} transparent opacity={0.12} />
      </lineSegments>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshBasicMaterial color={n.color} />
        </mesh>
      ))}
    </group>
  )
}

/** Rising confetti / gold particles */
export function ConfettiRise({ isDark, count = 800 }: { isDark: boolean; count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const pos = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i*3] = (Math.random()-0.5) * 20
      arr[i*3+1] = (Math.random()-0.5) * 15
      arr[i*3+2] = (Math.random()-0.5) * 15 - 5
    }
    return arr
  }, [count])

  useFrame(s => {
    if (!ref.current) return
    const arr = ref.current.geometry.attributes.position.array as Float32Array
    const t = s.clock.getElapsedTime()
    for (let i = 0; i < count; i++) {
      arr[i*3+1] += 0.015
      arr[i*3] += Math.sin(t + i * 0.05) * 0.003
      if (arr[i*3+1] > 7.5) arr[i*3+1] = -7.5
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={ref} positions={pos} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={isDark ? '#fbbf24':'#d97706'} size={0.05}
        sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.75} />
    </Points>
  )
}

/** Spiral galaxy */
export function SpiralGalaxy({ isDark, arms = 3, perArm = 400 }: { isDark: boolean; arms?: number; perArm?: number }) {
  const ref = useRef<THREE.Points>(null)
  const count = arms * perArm
  const pos = useMemo(() => {
    const arr = new Float32Array(count * 3)
    let idx = 0
    for (let a = 0; a < arms; a++) {
      const offset = (a / arms) * Math.PI * 2
      for (let p = 0; p < perArm; p++) {
        const t = p / perArm
        const r = t * 10 + 2
        const angle = t * Math.PI * 5 + offset
        arr[idx++] = Math.cos(angle) * r + (Math.random()-0.5) * 1.5
        arr[idx++] = (Math.random()-0.5) * 1.5
        arr[idx++] = Math.sin(angle) * r + (Math.random()-0.5) * 1.5 - 15
      }
    }
    return arr
  }, [arms, perArm, count])

  useFrame(s => { if (ref.current) ref.current.rotation.y = s.clock.getElapsedTime() * 0.05 })

  return (
    <Points ref={ref} positions={pos} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={isDark ? '#818cf8':'#1e3a8a'} size={0.06}
        sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.5} />
    </Points>
  )
}

/** A pulsing sphere that acts as a portal */
export function PortalSphere({ isDark, color }: { isDark: boolean; color?: string }) {
  const c = color ?? (isDark ? '#fbbf24' : '#d97706')
  const r = useRef<THREE.Mesh>(null)
  useFrame(s => {
    if (!r.current) return
    const t = s.clock.getElapsedTime()
    r.current.rotation.y = t * 0.25
    r.current.rotation.x = Math.sin(t * 0.4) * 0.2
  })
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere ref={r} args={[1.8, 64, 64]} position={[0, 0, -4]}>
        <MeshDistortMaterial color={c} distort={0.45} speed={2} roughness={0.05} metalness={0.9}
          transparent opacity={0.75} emissive={c} emissiveIntensity={isDark ? 0.4 : 0.2} />
      </Sphere>
    </Float>
  )
}
