'use client'

import { useRef, useMemo, Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Float, Text } from '@react-three/drei'
import * as THREE from 'three'

// ============ NUMBER VORTEX ============
function NumberVortex({ count = 1500, isDark }: { count?: number; isDark: boolean }) {
  const ref = useRef<THREE.Points>(null)
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 8 + 2
      const height = (Math.random() - 0.5) * 15
      
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = height
      positions[i3 + 2] = Math.sin(angle) * radius - 5
    }
    
    return positions
  }, [count])
  
  useFrame((state) => {
    if (!ref.current) return
    
    const time = state.clock.getElapsedTime()
    const posArray = ref.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Spiral upward motion
      const angle = time * 0.5 + i * 0.01
      const radius = Math.sqrt(posArray[i3] * posArray[i3] + posArray[i3 + 2] * posArray[i3 + 2])
      
      posArray[i3] = Math.cos(angle) * radius
      posArray[i3 + 2] = Math.sin(angle) * radius - 5
      posArray[i3 + 1] += 0.02
      
      if (posArray[i3 + 1] > 7.5) {
        posArray[i3 + 1] = -7.5
      }
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
  })
  
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? '#34d399' : '#059669'}
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.7}
      />
    </Points>
  )
}

// ============ SUCCESS RINGS ============
function SuccessRings({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z = time * (0.15 + i * 0.03) * (i % 2 === 0 ? 1 : -1)
      child.rotation.x = Math.sin(time * 0.3 + i) * 0.1
    })
  })
  
  const rings = useMemo(() => [
    { radius: 3, tube: 0.03, color: '#fbbf24', opacity: 0.6 },
    { radius: 4, tube: 0.025, color: '#34d399', opacity: 0.5 },
    { radius: 5, tube: 0.02, color: '#818cf8', opacity: 0.4 },
    { radius: 6, tube: 0.015, color: '#f472b6', opacity: 0.3 },
  ], [])
  
  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI * 0.5, 0, 0]}>
          <torusGeometry args={[ring.radius, ring.tube, 16, 64]} />
          <meshStandardMaterial
            color={ring.color}
            transparent
            opacity={ring.opacity}
            emissive={ring.color}
            emissiveIntensity={isDark ? 0.4 : 0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

// ============ FLOATING TROPHIES ============
function FloatingTrophies({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  
  const positions = useMemo(() => [
    { pos: [-5, 2, -8] as [number, number, number], scale: 0.6 },
    { pos: [5, -2, -10] as [number, number, number], scale: 0.5 },
    { pos: [-3, -3, -12] as [number, number, number], scale: 0.4 },
    { pos: [4, 3, -14] as [number, number, number], scale: 0.55 },
  ], [])
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.children.forEach((child, i) => {
      child.rotation.y = time * 0.3 + i * 0.5
      child.position.y = positions[i].pos[1] + Math.sin(time * 0.8 + i) * 0.3
    })
  })
  
  return (
    <group ref={groupRef}>
      {positions.map((item, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <mesh position={item.pos} scale={item.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#fbbf24"
              wireframe
              emissive="#fbbf24"
              emissiveIntensity={isDark ? 0.5 : 0.2}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// ============ SCENE ============
function StatsScene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <color attach="background" args={[isDark ? '#020617' : '#fafafa']} />
      <fog attach="fog" args={[isDark ? '#020617' : '#fafafa', 15, 25]} />
      
      <ambientLight intensity={isDark ? 0.4 : 0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#34d399" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#fbbf24" />
      
      <NumberVortex count={2000} isDark={isDark} />
      <SuccessRings isDark={isDark} />
      <FloatingTrophies isDark={isDark} />
    </>
  )
}

// ============ MAIN COMPONENT ============
export default function Stats3D() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(true)
  
  useEffect(() => {
    setMounted(true)
    
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()
    
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])
  
  if (!mounted) return null
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          dpr={[1, 1.2]}
          gl={{ antialias: true, alpha: true }}
        >
          <StatsScene isDark={isDark} />
        </Canvas>
      </Suspense>
    </div>
  )
}
