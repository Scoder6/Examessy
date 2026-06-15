'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Stars, Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

// ============ SUCCESS MOUNTAIN ============
function SuccessMountain({ scrollProgress = 0 }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.1 + scrollProgress * Math.PI * 0.2
  })
  
  const mountainLayers = useMemo(() => {
    const layers = []
    const colors = ['#1e3a8a', '#1d4ed8', '#2563eb', '#3b82f6', '#6366f1']
    
    for (let i = 0; i < 8; i++) {
      const width = 12 - i * 1.2
      const height = 2 + i * 0.8
      const depth = 12 - i * 1.2
      
      layers.push({
        position: [0, i * 0.5 - 2, 0] as [number, number, number],
        scale: [width, height, depth] as [number, number, number],
        color: colors[i % colors.length],
        opacity: 0.3 - i * 0.02
      })
    }
    return layers
  }, [])
  
  return (
    <group ref={groupRef} position={[0, -3, -10]}>
      {mountainLayers.map((layer, i) => (
        <mesh key={i} position={layer.position} scale={layer.scale}>
          <coneGeometry args={[1, 1, 6]} />
          <meshStandardMaterial
            color={layer.color}
            transparent
            opacity={layer.opacity}
            wireframe={i % 2 === 0}
            emissive={layer.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

// ============ ACHIEVEMENT PYRAMIDS ============
function AchievementPyramids({ scrollProgress = 0 }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  const pyramids = useMemo(() => [
    { position: [-15, -5, -20] as [number, number, number], color: '#6366f1', scale: 3 },
    { position: [15, -5, -25] as [number, number, number], color: '#8b5cf6', scale: 2.5 },
    { position: [-20, -5, -35] as [number, number, number], color: '#06b6d4', scale: 4 },
    { position: [20, -5, -40] as [number, number, number], color: '#10b981', scale: 3.5 },
    { position: [0, -5, -45] as [number, number, number], color: '#f59e0b', scale: 5 },
  ], [])
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    groupRef.current.children.forEach((child, i) => {
      child.rotation.y = time * 0.1 + i * 0.5
    })
  })
  
  return (
    <group ref={groupRef}>
      {pyramids.map((pyramid, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.3} floatIntensity={0.5}>
          <mesh position={pyramid.position} rotation={[0, i * 0.5, 0]}>
            <tetrahedronGeometry args={[pyramid.scale, 0]} />
            <meshStandardMaterial
              color={pyramid.color}
              wireframe
              transparent
              opacity={0.4}
              emissive={pyramid.color}
              emissiveIntensity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// ============ SUCCESS PARTICLES ============
function SuccessParticles({ count = 2000, scrollProgress = 0 }: { count?: number; scrollProgress: number }) {
  const ref = useRef<THREE.Points>(null)
  
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 25 + 5
      
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = Math.sin(angle) * radius - 20
      
      velocities[i3] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 1] = Math.random() * 0.02 + 0.01
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02
    }
    
    return [positions, velocities]
  }, [count])
  
  useFrame((state) => {
    if (!ref.current) return
    
    const time = state.clock.getElapsedTime()
    const positions = ref.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      positions[i3 + 1] += velocities[i3 + 1]
      
      if (positions[i3 + 1] > 10) {
        positions[i3 + 1] = -10
      }
      
      positions[i3] += Math.sin(time + i * 0.1) * 0.01
      positions[i3 + 2] += Math.cos(time + i * 0.1) * 0.01
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y = time * 0.03 + scrollProgress * Math.PI * 0.2
  })
  
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#fbbf24"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// ============ RANK BADGE 3D ============
function RankBadge3D({ position, rank }: { position: [number, number, number]; rank: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.3
    meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.2
  })
  
  const color = rank === 1 ? '#ffd700' : rank === 2 ? '#c0c0c0' : '#cd7f32'
  
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[1, 0.3, 8, 24]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  )
}

// ============ SCENE ============
function Scene({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree()
  
  useFrame(() => {
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 10 - scrollProgress * 5, 0.02)
  })
  
  return (
    <>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 15, 60]} />
      
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -5, 5]} intensity={0.5} color="#fbbf24" />
      <spotLight position={[0, 30, 0]} angle={0.3} penumbra={1} intensity={1} color="#6366f1" />
      
      <Stars radius={100} depth={50} count={2000} factor={3} saturation={0} fade speed={0.5} />
      
      <SuccessParticles count={2500} scrollProgress={scrollProgress} />
      <SuccessMountain scrollProgress={scrollProgress} />
      <AchievementPyramids scrollProgress={scrollProgress} />
      
      <RankBadge3D position={[-8, 0, -15]} rank={1} />
      <RankBadge3D position={[8, -1, -18]} rank={2} />
      <RankBadge3D position={[-6, -2, -22]} rank={3} />
    </>
  )
}

// ============ MAIN COMPONENT ============
export default function SuccessSummit({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50" />
    </div>
  )
}
