'use client'

import { useState, useEffect, useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei'
import * as THREE from 'three'

// ============ SCROLL CONTEXT ============
const ScrollContext = { current: 0 }

// ============ FLOATING PARTICLES ============
function FloatingParticles({ count = 2000, isDark }: { count?: number; isDark: boolean }) {
  const ref = useRef<THREE.Points>(null)
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = Math.random() * 40 + 15
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi) - 30
    }
    
    return positions
  }, [count])
  
  useFrame((state) => {
    if (!ref.current) return
    
    const time = state.clock.getElapsedTime()
    const scroll = ScrollContext.current
    
    ref.current.rotation.y = time * 0.015 + scroll * Math.PI * 0.3
    ref.current.rotation.x = Math.sin(time * 0.1) * 0.05
    
    const posArray = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      posArray[i3 + 1] += Math.sin(time * 0.3 + posArray[i3] * 0.05) * 0.003
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })
  
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? "#818cf8" : "#1e3a8a"}
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={isDark ? 0.6 : 0.4}
      />
    </Points>
  )
}

// ============ GLOWING ORBS ============
function GlowingOrbs({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  
  const orbs = useMemo(() => [
    { position: [-15, 8, -30] as [number, number, number], color: isDark ? '#818cf8' : '#1e3a8a', speed: 1, size: 1.8 },
    { position: [18, -6, -35] as [number, number, number], color: isDark ? '#34d399' : '#059669', speed: 1.2, size: 1.5 },
    { position: [-10, -10, -40] as [number, number, number], color: isDark ? '#fbbf24' : '#d97706', speed: 0.8, size: 2 },
    { position: [12, 12, -45] as [number, number, number], color: isDark ? '#f472b6' : '#db2777', speed: 1.1, size: 1.3 },
    { position: [0, 15, -50] as [number, number, number], color: isDark ? '#22d3ee' : '#0891b2', speed: 0.9, size: 1.6 },
  ], [isDark])
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x = time * 0.15 * orbs[i].speed
      child.rotation.y = time * 0.2 * orbs[i].speed
    })
  })
  
  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <Float key={i} speed={orb.speed} rotationIntensity={0.3} floatIntensity={1.5}>
          <Sphere args={[orb.size, 32, 32]} position={orb.position}>
            <MeshDistortMaterial
              color={orb.color}
              distort={0.3}
              speed={1.5}
              roughness={0.2}
              metalness={0.7}
              transparent
              opacity={0.5}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

// ============ GEOMETRIC SHAPES ============
function GeometricShapes({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  
  const shapes = useMemo(() => [
    { position: [-25, 10, -40] as [number, number, number], color: isDark ? '#818cf8' : '#1e3a8a', type: 'octahedron' },
    { position: [22, -8, -45] as [number, number, number], color: isDark ? '#a78bfa' : '#6366f1', type: 'icosahedron' },
    { position: [-18, -12, -50] as [number, number, number], color: isDark ? '#34d399' : '#059669', type: 'dodecahedron' },
    { position: [25, 15, -55] as [number, number, number], color: isDark ? '#22d3ee' : '#0891b2', type: 'tetrahedron' },
  ], [isDark])
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x = time * 0.1 + i * 0.5
      child.rotation.y = time * 0.15 + i * 0.3
    })
  })
  
  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={0.8 + i * 0.1} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={shape.position}>
            {shape.type === 'octahedron' && <octahedronGeometry args={[1.5]} />}
            {shape.type === 'icosahedron' && <icosahedronGeometry args={[1.2]} />}
            {shape.type === 'dodecahedron' && <dodecahedronGeometry args={[1.3]} />}
            {shape.type === 'tetrahedron' && <tetrahedronGeometry args={[1.4]} />}
            <meshStandardMaterial
              color={shape.color}
              wireframe
              transparent
              opacity={isDark ? 0.4 : 0.3}
              emissive={shape.color}
              emissiveIntensity={isDark ? 0.3 : 0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// ============ SCENE ============
function Scene({ isDark, mousePosition }: { isDark: boolean; mousePosition: { x: number; y: number } }) {
  const { camera } = useThree()
  
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePosition.x * 2, 0.02)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mousePosition.y * 1, 0.02)
    camera.lookAt(0, 0, -25)
  })
  
  return (
    <>
      <color attach="background" args={[isDark ? '#020617' : '#fafafa']} />
      <fog attach="fog" args={[isDark ? '#020617' : '#fafafa', 30, 80]} />
      
      <ambientLight intensity={isDark ? 0.4 : 0.6} />
      <pointLight position={[10, 10, 10]} intensity={isDark ? 0.8 : 1} color={isDark ? "#818cf8" : "#1e3a8a"} />
      <pointLight position={[-10, -10, -20]} intensity={isDark ? 0.5 : 0.7} color={isDark ? "#34d399" : "#059669"} />
      <spotLight position={[0, 20, -20]} angle={0.4} penumbra={1} intensity={isDark ? 0.6 : 0.8} color={isDark ? "#fbbf24" : "#d97706"} />
      
      <Stars radius={100} depth={60} count={isDark ? 3000 : 1000} factor={3} saturation={0} fade speed={0.3} />
      
      <FloatingParticles count={2500} isDark={isDark} />
      <GlowingOrbs isDark={isDark} />
      <GeometricShapes isDark={isDark} />
    </>
  )
}

// ============ MAIN COMPONENT ============
export default function ThemedBackground() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    setMounted(true)
    
    // Check initial theme
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark')
      setIsDark(isDarkMode)
    }
    
    checkTheme()
    
    // Observer for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      ScrollContext.current = window.scrollY / scrollHeight
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  if (!mounted) return null
  
  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden" 
      style={{ zIndex: 0 }}
    >
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 20], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Scene isDark={isDark} mousePosition={mousePosition} />
        </Canvas>
      </Suspense>
      
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60"
          style={{ opacity: isDark ? 0.3 : 0.1 }}
        />
      </div>
    </div>
  )
}
