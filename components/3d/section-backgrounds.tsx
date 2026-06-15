'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Float, Sphere, Torus } from '@react-three/drei'
import * as THREE from 'three'

// ============ STATS SECTION - Floating Numbers Effect ============
function StatsParticles({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const count = 800
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 30
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20 - 10
    }
    
    return positions
  }, [])
  
  useFrame((state) => {
    if (!ref.current) return
    const time = state.clock.getElapsedTime()
    ref.current.rotation.y = time * 0.05
    
    const posArray = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      posArray[i3 + 1] += 0.01
      if (posArray[i3 + 1] > 10) posArray[i3 + 1] = -10
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })
  
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? "#34d399" : "#059669"}
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  )
}

export function StatsBackground({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <StatsParticles isDark={isDark} />
        </Canvas>
      </Suspense>
    </div>
  )
}

// ============ FEATURES SECTION - Knowledge Network ============
function KnowledgeNetwork({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  
  const nodes = useMemo(() => {
    const nodeData = []
    for (let i = 0; i < 40; i++) {
      nodeData.push({
        position: [
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 20 - 10
        ] as [number, number, number]
      })
    }
    return nodeData
  }, [])
  
  const connections = useMemo(() => {
    const points: THREE.Vector3[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(
          Math.pow(nodes[i].position[0] - nodes[j].position[0], 2) +
          Math.pow(nodes[i].position[1] - nodes[j].position[1], 2) +
          Math.pow(nodes[i].position[2] - nodes[j].position[2], 2)
        )
        if (dist < 8 && Math.random() > 0.5) {
          points.push(
            new THREE.Vector3(...nodes[i].position),
            new THREE.Vector3(...nodes[j].position)
          )
        }
      }
    }
    return points
  }, [nodes])
  
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(connections.length * 3)
    connections.forEach((point, i) => {
      positions[i * 3] = point.x
      positions[i * 3 + 1] = point.y
      positions[i * 3 + 2] = point.z
    })
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [connections])
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = time * 0.03
  })
  
  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={isDark ? "#818cf8" : "#1e3a8a"} transparent opacity={0.15} />
      </lineSegments>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color={isDark ? "#818cf8" : "#1e3a8a"} />
        </mesh>
      ))}
    </group>
  )
}

export function FeaturesBackground({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <KnowledgeNetwork isDark={isDark} />
        </Canvas>
      </Suspense>
    </div>
  )
}

// ============ TESTIMONIALS SECTION - Success Rings ============
function SuccessRings({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z = time * (0.1 + i * 0.02) * (i % 2 === 0 ? 1 : -1)
    })
  })
  
  const rings = useMemo(() => [
    { radius: 4, color: isDark ? '#fbbf24' : '#d97706', opacity: 0.3 },
    { radius: 5, color: isDark ? '#34d399' : '#059669', opacity: 0.25 },
    { radius: 6, color: isDark ? '#818cf8' : '#1e3a8a', opacity: 0.2 },
  ], [isDark])
  
  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI * 0.5, 0, 0]}>
          <torusGeometry args={[ring.radius, 0.03, 8, 32]} />
          <meshBasicMaterial color={ring.color} transparent opacity={ring.opacity} />
        </mesh>
      ))}
    </group>
  )
}

export function TestimonialsBackground({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <SuccessRings isDark={isDark} />
        </Canvas>
      </Suspense>
    </div>
  )
}

// ============ CTA SECTION - Portal Effect ============
function PortalEffect({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const count = 500
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 5 + 2
      
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = Math.sin(angle) * radius
      positions[i3 + 2] = (Math.random() - 0.5) * 10 - 5
    }
    
    return positions
  }, [])
  
  useFrame((state) => {
    if (!ref.current) return
    const time = state.clock.getElapsedTime()
    ref.current.rotation.z = time * 0.2
    
    const posArray = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      posArray[i3 + 2] += 0.05
      if (posArray[i3 + 2] > 0) posArray[i3 + 2] = -10
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })
  
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? "#fbbf24" : "#d97706"}
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  )
}

export function CTABackground({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <PortalEffect isDark={isDark} />
        </Canvas>
      </Suspense>
    </div>
  )
}
