'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial, Stars, Trail } from '@react-three/drei'
import * as THREE from 'three'

// ============ PARTICLE CONSTELLATION ============
function ParticleConstellation({ count = 3000, scrollProgress = 0 }: { count?: number; scrollProgress: number }) {
  const ref = useRef<THREE.Points>(null)
  const [hovered, setHovered] = useState(false)
  
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    
    const colorPalette = [
      new THREE.Color('#6366f1'), // Indigo
      new THREE.Color('#8b5cf6'), // Violet
      new THREE.Color('#06b6d4'), // Cyan
      new THREE.Color('#10b981'), // Emerald
      new THREE.Color('#f59e0b'), // Amber
    ]
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = Math.random() * 15 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi) - 10
      
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
      
      sizes[i] = Math.random() * 2 + 0.5
    }
    
    return [positions, colors, sizes]
  }, [count])
  
  useFrame((state) => {
    if (!ref.current) return
    
    const time = state.clock.getElapsedTime()
    const positions = ref.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = positions[i3]
      const y = positions[i3 + 1]
      const z = positions[i3 + 2]
      
      // Wave motion
      positions[i3 + 1] = y + Math.sin(time * 0.5 + x * 0.1) * 0.01
      positions[i3] = x + Math.cos(time * 0.3 + y * 0.1) * 0.01
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y = time * 0.02 + scrollProgress * Math.PI * 0.5
    ref.current.rotation.x = Math.sin(time * 0.1) * 0.1
  })
  
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// ============ KNOWLEDGE ORB ============
function KnowledgeOrb({ position, color, speed = 1, distort = 0.3 }: { 
  position: [number, number, number]
  color: string
  speed?: number
  distort?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2 * speed
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 * speed
  })
  
  return (
    <Float speed={2 * speed} rotationIntensity={0.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2 * speed}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  )
}

// ============ ENERGY RINGS ============
function EnergyRings({ scrollProgress = 0 }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.z = time * 0.1
    groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1 + scrollProgress * 0.3
  })
  
  const rings = useMemo(() => {
    const ringData = []
    for (let i = 0; i < 5; i++) {
      ringData.push({
        radius: 3 + i * 1.5,
        color: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][i],
        rotation: i * 0.3,
      })
    }
    return ringData
  }, [])
  
  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI * 0.5 + ring.rotation, 0, 0]}>
          <torusGeometry args={[ring.radius, 0.02, 16, 100]} />
          <meshBasicMaterial color={ring.color} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

// ============ FLOATING GEOMETRIC SHAPES ============
function FloatingShapes({ scrollProgress = 0 }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = time * 0.05
  })
  
  const shapes = useMemo(() => [
    { position: [-8, 3, -15] as [number, number, number], color: '#6366f1', type: 'octahedron' },
    { position: [7, -2, -12] as [number, number, number], color: '#8b5cf6', type: 'icosahedron' },
    { position: [-6, -4, -18] as [number, number, number], color: '#06b6d4', type: 'dodecahedron' },
    { position: [9, 4, -20] as [number, number, number], color: '#10b981', type: 'tetrahedron' },
    { position: [0, 5, -25] as [number, number, number], color: '#f59e0b', type: 'octahedron' },
    { position: [-10, 0, -22] as [number, number, number], color: '#ec4899', type: 'icosahedron' },
    { position: [10, -3, -16] as [number, number, number], color: '#3b82f6', type: 'dodecahedron' },
  ], [])
  
  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={1} floatIntensity={2}>
          <mesh position={shape.position}>
            {shape.type === 'octahedron' && <octahedronGeometry args={[0.8]} />}
            {shape.type === 'icosahedron' && <icosahedronGeometry args={[0.7]} />}
            {shape.type === 'dodecahedron' && <dodecahedronGeometry args={[0.6]} />}
            {shape.type === 'tetrahedron' && <tetrahedronGeometry args={[0.8]} />}
            <meshStandardMaterial
              color={shape.color}
              wireframe
              transparent
              opacity={0.6}
              emissive={shape.color}
              emissiveIntensity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// ============ NEURAL NETWORK ============
function NeuralNetwork({ scrollProgress = 0 }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  
  const nodes = useMemo(() => {
    const nodeData = []
    for (let i = 0; i < 50; i++) {
      nodeData.push({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 30 - 10
        ] as [number, number, number],
        color: ['#6366f1', '#8b5cf6', '#06b6d4'][Math.floor(Math.random() * 3)]
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
        if (dist < 8 && Math.random() > 0.7) {
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
    groupRef.current.rotation.y = time * 0.02 + scrollProgress * Math.PI * 0.3
  })
  
  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#6366f1" transparent opacity={0.15} />
      </lineSegments>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color={node.color} />
        </mesh>
      ))}
    </group>
  )
}

// ============ PORTAL TUNNEL ============
function PortalTunnel({ scrollProgress = 0 }: { scrollProgress: number }) {
  const ref = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!ref.current) return
    const time = state.clock.getElapsedTime()
    ref.current.rotation.z = time * 0.1
  })
  
  return (
    <mesh ref={ref} position={[0, 0, -30]}>
      <cylinderGeometry args={[20, 15, 60, 64, 1, true]} />
      <meshBasicMaterial
        color="#1e3a8a"
        wireframe
        transparent
        opacity={0.1}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

// ============ SCENE ============
function Scene({ scrollProgress, mousePosition }: { scrollProgress: number; mousePosition: { x: number; y: number } }) {
  const { camera } = useThree()
  
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePosition.x * 2, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mousePosition.y * 1, 0.05)
    camera.lookAt(0, 0, -10)
  })
  
  return (
    <>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 10, 50]} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#06b6d4" />
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      <ParticleConstellation count={4000} scrollProgress={scrollProgress} />
      <NeuralNetwork scrollProgress={scrollProgress} />
      <PortalTunnel scrollProgress={scrollProgress} />
      <EnergyRings scrollProgress={scrollProgress} />
      <FloatingShapes scrollProgress={scrollProgress} />
      
      <KnowledgeOrb position={[-5, 2, -8]} color="#6366f1" speed={1} distort={0.4} />
      <KnowledgeOrb position={[5, -2, -12]} color="#8b5cf6" speed={1.2} distort={0.3} />
      <KnowledgeOrb position={[0, 3, -18]} color="#06b6d4" speed={0.8} distort={0.5} />
    </>
  )
}

// ============ MAIN COMPONENT ============
export default function ImmersiveHero({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  if (!mounted) return null
  
  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene scrollProgress={scrollProgress} mousePosition={mousePosition} />
      </Canvas>
      
      {/* Gradient overlays for seamless integration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#020617]/50" />
      </div>
    </div>
  )
}
