'use client'

import { useRef, useMemo, Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial, Torus } from '@react-three/drei'
import * as THREE from 'three'

// ============ PORTAL EFFECT ============
function Portal({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z = time * (0.2 + i * 0.05) * (i % 2 === 0 ? 1 : -1)
      const scale = 1 + Math.sin(time * 2 + i * 0.5) * 0.1
      child.scale.setScalar(scale)
    })
  })
  
  const rings = useMemo(() => [
    { radius: 3, color: '#fbbf24', opacity: 0.6 },
    { radius: 3.5, color: '#f59e0b', opacity: 0.5 },
    { radius: 4, color: '#d97706', opacity: 0.4 },
    { radius: 4.5, color: '#b45309', opacity: 0.3 },
    { radius: 5, color: '#92400e', opacity: 0.2 },
  ], [])
  
  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI * 0.5, 0, 0]}>
          <torusGeometry args={[ring.radius, 0.08, 16, 64]} />
          <meshStandardMaterial
            color={ring.color}
            transparent
            opacity={ring.opacity}
            emissive={ring.color}
            emissiveIntensity={isDark ? 0.5 : 0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

// ============ SUCCESS PARTICLES ============
function SuccessParticles({ count = 1500, isDark }: { count?: number; isDark: boolean }) {
  const ref = useRef<THREE.Points>(null)
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 6 + 1
      const z = (Math.random() - 0.5) * 20
      
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = Math.sin(angle) * radius
      positions[i3 + 2] = z - 5
    }
    
    return positions
  }, [count])
  
  useFrame((state) => {
    if (!ref.current) return
    
    const time = state.clock.getElapsedTime()
    const posArray = ref.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Spiral inward motion
      const angle = time * 0.5 + i * 0.01
      const radius = Math.sqrt(posArray[i3] * posArray[i3] + posArray[i3 + 1] * posArray[i3 + 1])
      
      if (radius > 0.5) {
        posArray[i3] -= Math.cos(angle) * 0.01
        posArray[i3 + 1] -= Math.sin(angle) * 0.01
      }
      
      posArray[i3 + 2] += 0.1
      
      if (posArray[i3 + 2] > 5) {
        posArray[i3 + 2] = -15
        const newAngle = Math.random() * Math.PI * 2
        const newRadius = Math.random() * 5 + 2
        posArray[i3] = Math.cos(newAngle) * newRadius
        posArray[i3 + 1] = Math.sin(newAngle) * newRadius
      }
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
  })
  
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? '#fbbf24' : '#d97706'}
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  )
}

// ============ GLOWING CORE ============
function GlowingCore({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.y = time * 0.3
  })
  
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, -5]}>
        <MeshDistortMaterial
          color="#fbbf24"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          emissive="#fbbf24"
          emissiveIntensity={isDark ? 0.5 : 0.3}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  )
}

// ============ ORBITING ELEMENTS ============
function OrbitingElements({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  
  const elements = useMemo(() => [
    { orbit: 6, speed: 1, color: '#818cf8', offset: 0 },
    { orbit: 7, speed: 0.7, color: '#34d399', offset: Math.PI / 2 },
    { orbit: 8, speed: 0.5, color: '#f472b6', offset: Math.PI },
  ], [])
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.children.forEach((child, i) => {
      const angle = time * elements[i].speed + elements[i].offset
      child.position.x = Math.cos(angle) * elements[i].orbit
      child.position.z = Math.sin(angle) * elements[i].orbit - 5
      child.position.y = Math.sin(angle * 2) * 1
      child.rotation.y = time * 0.5
    })
  })
  
  return (
    <group ref={groupRef}>
      {elements.map((el, i) => (
        <mesh key={i}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial
            color={el.color}
            emissive={el.color}
            emissiveIntensity={isDark ? 0.5 : 0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

// ============ SCENE ============
function CTAScene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <color attach="background" args={[isDark ? '#020617' : '#fafafa']} />
      <fog attach="fog" args={[isDark ? '#020617' : '#fafafa', 10, 25]} />
      
      <ambientLight intensity={isDark ? 0.3 : 0.5} />
      <pointLight position={[0, 0, 5]} intensity={2} color="#fbbf24" />
      <pointLight position={[5, 5, -5]} intensity={1} color="#818cf8" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#34d399" />
      
      <Portal isDark={isDark} />
      <SuccessParticles count={2000} isDark={isDark} />
      <GlowingCore isDark={isDark} />
      <OrbitingElements isDark={isDark} />
    </>
  )
}

// ============ MAIN COMPONENT ============
export default function CTA3D() {
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
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 1.2]}
          gl={{ antialias: true, alpha: true }}
        >
          <CTAScene isDark={isDark} />
        </Canvas>
      </Suspense>
    </div>
  )
}
