'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Stars, Torus } from '@react-three/drei'
import * as THREE from 'three'

// ============ PORTAL RINGS ============
function PortalRings() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z = time * (0.2 + i * 0.05) * (i % 2 === 0 ? 1 : -1)
      child.rotation.x = Math.sin(time * 0.3 + i) * 0.1
    })
  })
  
  const rings = useMemo(() => {
    const ringData = []
    const colors = ['#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e']
    
    for (let i = 0; i < 8; i++) {
      ringData.push({
        radius: 3 + i * 0.5,
        color: colors[i % colors.length],
        opacity: 0.4 - i * 0.04,
        position: [0, 0, -i * 0.3] as [number, number, number]
      })
    }
    return ringData
  }, [])
  
  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {rings.map((ring, i) => (
        <mesh key={i} position={ring.position}>
          <torusGeometry args={[ring.radius, 0.05, 16, 64]} />
          <meshStandardMaterial
            color={ring.color}
            transparent
            opacity={ring.opacity}
            emissive={ring.color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

// ============ SUCCESS PARTICLES ============
function SuccessParticles({ count = 1000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 8 + 2
      const height = (Math.random() - 0.5) * 10
      
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
      const angle = time * 0.5 + i * 0.01
      
      posArray[i3] += Math.cos(angle) * 0.01
      posArray[i3 + 1] += 0.02
      
      if (posArray[i3 + 1] > 5) {
        posArray[i3 + 1] = -5
      }
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y = time * 0.1
  })
  
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <pointMaterial attach="material" color="#fbbf24" size={0.05} transparent opacity={0.8} />
    </Points>
  )
}

// ============ TROPHY ORB ============
function TrophyOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.y = time * 0.3
    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2
  })
  
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, -3]}>
        <MeshDistortMaterial
          color="#fbbf24"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          emissive="#fbbf24"
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  )
}

// ============ SCENE ============
function Scene() {
  return (
    <>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 10, 30]} />
      
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#fbbf24" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#f59e0b" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#d97706" />
      
      <Stars radius={50} depth={30} count={1000} factor={3} saturation={0} fade speed={0.3} />
      
      <PortalRings />
      <SuccessParticles count={1500} />
      <TrophyOrb />
    </>
  )
}

// ============ MAIN COMPONENT ============
export default function SuccessPortal() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50" />
    </div>
  )
}
