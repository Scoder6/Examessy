'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Stars, Torus } from '@react-three/drei'
import * as THREE from 'three'

// ============ TUNNEL SEGMENTS ============
function TunnelSegment({ position, rotation, color, scale = 1 }: { 
  position: [number, number, number]
  rotation: [number, number, number]
  color: string
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.z = time * 0.1
  })
  
  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <torusGeometry args={[8, 0.3, 8, 64]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.4}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

// ============ FLOWING PARTICLES ============
function FlowingParticles({ count = 1500, scrollProgress = 0 }: { count?: number; scrollProgress: number }) {
  const ref = useRef<THREE.Points>(null)
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 6 + 2
      const z = (Math.random() - 0.5) * 100
      
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = Math.sin(angle) * radius
      positions[i3 + 2] = z
    }
    
    return positions
  }, [count])
  
  useFrame((state) => {
    if (!ref.current) return
    
    const time = state.clock.getElapsedTime()
    const posArray = ref.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      posArray[i3 + 2] += 0.3
      
      if (posArray[i3 + 2] > 50) {
        posArray[i3 + 2] = -50
      }
      
      const angle = time * 0.5 + i * 0.01
      posArray[i3] += Math.sin(angle) * 0.02
      posArray[i3 + 1] += Math.cos(angle) * 0.02
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
  })
  
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// ============ HEXAGONAL GRID ============
function HexagonalGrid({ scrollProgress = 0 }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  const hexagons = useMemo(() => {
    const hexData = []
    const rows = 5
    const cols = 10
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * 2.5 + (r % 2) * 1.25
        const z = (r - rows / 2) * 3 - 30
        const delay = (c + r) * 0.1
        
        hexData.push({
          position: [x, -8, z] as [number, number, number],
          delay,
          color: `hsl(${240 + c * 5 + r * 10}, 70%, 50%)`
        })
      }
    }
    
    return hexData
  }, [])
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.children.forEach((child, i) => {
      const hex = hexagons[i]
      if (hex) {
        child.position.y = -8 + Math.sin(time * 2 + hex.delay) * 0.5
        child.scale.setScalar(1 + Math.sin(time * 1.5 + hex.delay) * 0.1)
      }
    })
  })
  
  return (
    <group ref={groupRef}>
      {hexagons.map((hex, i) => (
        <mesh key={i} position={hex.position} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1, 6]} />
          <meshStandardMaterial
            color={hex.color}
            transparent
            opacity={0.2}
            emissive={hex.color}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

// ============ ENERGY STREAMS ============
function EnergyStreams({ scrollProgress = 0 }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  const streams = useMemo(() => {
    const streamData = []
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      streamData.push({
        angle,
        color: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981'][i % 4]
      })
    }
    return streamData
  }, [])
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.rotation.z = time * 0.1
    groupRef.current.position.z = -20 + Math.sin(time * 0.2) * 5
  })
  
  return (
    <group ref={groupRef}>
      {streams.map((stream, i) => (
        <mesh key={i} position={[Math.cos(stream.angle) * 7, Math.sin(stream.angle) * 7, 0]}>
          <boxGeometry args={[0.1, 0.1, 40]} />
          <meshBasicMaterial color={stream.color} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

// ============ KNOWLEDGE CRYSTALS ============
function KnowledgeCrystals({ scrollProgress = 0 }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  const crystals = useMemo(() => {
    const crystalData = []
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 8 + 3
      const z = (Math.random() - 0.5) * 60
      
      crystalData.push({
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          z
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        scale: Math.random() * 0.5 + 0.3,
        color: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]
      })
    }
    return crystalData
  }, [])
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z = time * 0.5 + i * 0.2
    })
  })
  
  return (
    <group ref={groupRef}>
      {crystals.map((crystal, i) => (
        <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={crystal.position} rotation={crystal.rotation} scale={crystal.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={crystal.color}
              wireframe
              transparent
              opacity={0.5}
              emissive={crystal.color}
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// ============ SCENE ============
function Scene({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree()
  
  const tunnelColors = useMemo(() => [
    '#6366f1', '#8b5cf6', '#a855f7', '#c084fc', '#e879f9'
  ], [])
  
  useFrame(() => {
    camera.position.z = 5 - scrollProgress * 3
  })
  
  return (
    <>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 20, 80]} />
      
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 10]} intensity={2} color="#8b5cf6" />
      <pointLight position={[0, 0, -20]} intensity={1} color="#6366f1" />
      
      <Stars radius={80} depth={60} count={1500} factor={2} saturation={0} fade speed={0.3} />
      
      {Array.from({ length: 15 }).map((_, i) => (
        <TunnelSegment
          key={i}
          position={[0, 0, -i * 5 - 5]}
          rotation={[Math.PI / 2, 0, i * 0.2]}
          color={tunnelColors[i % tunnelColors.length]}
          scale={1 + i * 0.05}
        />
      ))}
      
      <FlowingParticles count={2000} scrollProgress={scrollProgress} />
      <HexagonalGrid scrollProgress={scrollProgress} />
      <EnergyStreams scrollProgress={scrollProgress} />
      <KnowledgeCrystals scrollProgress={scrollProgress} />
    </>
  )
}

// ============ MAIN COMPONENT ============
export default function KnowledgeTunnel({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 65 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-[#020617]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-[#020617]/80" />
      </div>
    </div>
  )
}
