'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial, Stars, Trail } from '@react-three/drei'
import * as THREE from 'three'

// ============ SHARED SCROLL CONTEXT ============
const ScrollContext = { current: 0 }

// ============ COSMIC PARTICLES ============
function CosmicParticles({ count = 5000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    const colorPalette = [
      new THREE.Color('#6366f1'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#10b981'),
      new THREE.Color('#f59e0b'),
      new THREE.Color('#ec4899'),
    ]
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = Math.random() * 50 + 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi) - 20
      
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }
    
    return [positions, colors]
  }, [count])
  
  useFrame((state) => {
    if (!ref.current) return
    
    const time = state.clock.getElapsedTime()
    const scroll = ScrollContext.current
    
    ref.current.rotation.y = time * 0.02 + scroll * Math.PI * 0.5
    ref.current.rotation.x = Math.sin(time * 0.1) * 0.1 + scroll * 0.2
    
    const positions = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3 + 1] += Math.sin(time * 0.5 + positions[i3] * 0.1) * 0.005
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })
  
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.12}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// ============ JOURNEY TUNNEL ============
function JourneyTunnel() {
  const groupRef = useRef<THREE.Group>(null)
  
  const rings = useMemo(() => {
    const ringData = []
    for (let i = 0; i < 30; i++) {
      ringData.push({
        position: [0, 0, -i * 4 - 10] as [number, number, number],
        color: `hsl(${240 + i * 8}, 70%, 60%)`,
        scale: 1 + i * 0.1,
        rotation: i * 0.2
      })
    }
    return ringData
  }, [])
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    const scroll = ScrollContext.current
    
    groupRef.current.children.forEach((child, i) => {
      const ring = rings[i]
      if (ring) {
        child.rotation.z = time * 0.1 + ring.rotation
        child.position.z = -i * 4 - 10 + scroll * 20
      }
    })
  })
  
  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} position={ring.position} scale={ring.scale}>
          <torusGeometry args={[8, 0.05, 8, 64]} />
          <meshBasicMaterial color={ring.color} transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  )
}

// ============ FLOATING KNOWLEDGE ORBS ============
function KnowledgeOrbs() {
  const groupRef = useRef<THREE.Group>(null)
  
  const orbs = useMemo(() => [
    { position: [-12, 5, -15] as [number, number, number], color: '#6366f1', speed: 1, distort: 0.4, size: 1.2 },
    { position: [12, -3, -20] as [number, number, number], color: '#8b5cf6', speed: 1.2, distort: 0.3, size: 1 },
    { position: [-8, -6, -25] as [number, number, number], color: '#06b6d4', speed: 0.8, distort: 0.5, size: 1.5 },
    { position: [10, 8, -30] as [number, number, number], color: '#10b981', speed: 1.1, distort: 0.35, size: 0.8 },
    { position: [0, 10, -35] as [number, number, number], color: '#f59e0b', speed: 0.9, distort: 0.45, size: 1.3 },
    { position: [-15, 0, -40] as [number, number, number], color: '#ec4899', speed: 1.3, distort: 0.25, size: 1.1 },
    { position: [15, 5, -45] as [number, number, number], color: '#3b82f6', speed: 1, distort: 0.5, size: 1.4 },
    { position: [0, -8, -50] as [number, number, number], color: '#8b5cf6', speed: 0.7, distort: 0.4, size: 1.6 },
  ], [])
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x = time * 0.2 * orbs[i].speed
      child.rotation.y = time * 0.3 * orbs[i].speed
    })
  })
  
  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <Float key={i} speed={orb.speed} rotationIntensity={0.5} floatIntensity={2}>
          <Sphere args={[orb.size, 64, 64]} position={orb.position}>
            <MeshDistortMaterial
              color={orb.color}
              distort={orb.distort}
              speed={2 * orb.speed}
              roughness={0.1}
              metalness={0.8}
              transparent
              opacity={0.7}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

// ============ GEOMETRIC SHAPES ============
function GeometricShapes() {
  const groupRef = useRef<THREE.Group>(null)
  
  const shapes = useMemo(() => [
    { position: [-20, 8, -30] as [number, number, number], color: '#6366f1', type: 'octahedron', size: 1.5 },
    { position: [18, -5, -35] as [number, number, number], color: '#8b5cf6', type: 'icosahedron', size: 1.2 },
    { position: [-15, -10, -40] as [number, number, number], color: '#06b6d4', type: 'dodecahedron', size: 1.3 },
    { position: [20, 12, -45] as [number, number, number], color: '#10b981', type: 'tetrahedron', size: 1.4 },
    { position: [0, 15, -50] as [number, number, number], color: '#f59e0b', type: 'octahedron', size: 1.6 },
    { position: [-25, 0, -55] as [number, number, number], color: '#ec4899', type: 'icosahedron', size: 1.1 },
    { position: [25, -8, -60] as [number, number, number], color: '#3b82f6', type: 'dodecahedron', size: 1.5 },
    { position: [-10, 15, -65] as [number, number, number], color: '#8b5cf6', type: 'tetrahedron', size: 1.2 },
    { position: [10, -15, -70] as [number, number, number], color: '#06b6d4', type: 'octahedron', size: 1.3 },
  ], [])
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x = time * 0.15 + i * 0.5
      child.rotation.y = time * 0.2 + i * 0.3
    })
  })
  
  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.8} floatIntensity={1.5}>
          <mesh position={shape.position}>
            {shape.type === 'octahedron' && <octahedronGeometry args={[shape.size]} />}
            {shape.type === 'icosahedron' && <icosahedronGeometry args={[shape.size]} />}
            {shape.type === 'dodecahedron' && <dodecahedronGeometry args={[shape.size]} />}
            {shape.type === 'tetrahedron' && <tetrahedronGeometry args={[shape.size]} />}
            <meshStandardMaterial
              color={shape.color}
              wireframe
              transparent
              opacity={0.5}
              emissive={shape.color}
              emissiveIntensity={0.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// ============ NEURAL NETWORK ============
function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null)
  
  const nodes = useMemo(() => {
    const nodeData = []
    for (let i = 0; i < 80; i++) {
      nodeData.push({
        position: [
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 50 - 25
        ] as [number, number, number],
        color: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)]
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
        if (dist < 10 && Math.random() > 0.6) {
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
    const scroll = ScrollContext.current
    groupRef.current.rotation.y = time * 0.02 + scroll * Math.PI * 0.3
  })
  
  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#6366f1" transparent opacity={0.1} />
      </lineSegments>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={node.color} />
        </mesh>
      ))}
    </group>
  )
}

// ============ ENERGY STREAMS ============
function EnergyStreams() {
  const ref = useRef<THREE.Points>(null)
  const count = 2000
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 5 + 3
      const z = (Math.random() - 0.5) * 100
      
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = Math.sin(angle) * radius
      positions[i3 + 2] = z
    }
    
    return positions
  }, [])
  
  useFrame((state) => {
    if (!ref.current) return
    
    const time = state.clock.getElapsedTime()
    const posArray = ref.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      posArray[i3 + 2] += 0.2
      
      if (posArray[i3 + 2] > 50) {
        posArray[i3 + 2] = -50
      }
      
      const angle = time * 0.3 + i * 0.005
      posArray[i3] += Math.sin(angle) * 0.01
      posArray[i3 + 1] += Math.cos(angle) * 0.01
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
  })
  
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a855f7"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// ============ SCENE ============
function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const { camera } = useThree()
  
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePosition.x * 3, 0.03)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mousePosition.y * 1.5, 0.03)
    camera.lookAt(0, 0, -20)
  })
  
  return (
    <>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 20, 100]} />
      
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -20]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[0, 20, -30]} intensity={0.6} color="#06b6d4" />
      <spotLight position={[0, 30, -20]} angle={0.3} penumbra={1} intensity={0.8} color="#6366f1" />
      
      <Stars radius={120} depth={80} count={5000} factor={4} saturation={0} fade speed={0.5} />
      
      <CosmicParticles count={6000} />
      <JourneyTunnel />
      <KnowledgeOrbs />
      <GeometricShapes />
      <NeuralNetwork />
      <EnergyStreams />
    </>
  )
}

// ============ MAIN COMPONENT ============
export default function ImmersiveBackground() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    setMounted(true)
    
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
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  if (!mounted) return null
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none" 
      style={{ zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene mousePosition={mousePosition} />
      </Canvas>
      
      {/* Seamless gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#020617] via-transparent to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#020617] via-transparent to-transparent" />
      </div>
    </div>
  )
}
