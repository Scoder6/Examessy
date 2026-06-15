'use client'

import { useRef, useMemo, Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ============ NEURAL NETWORK ============
function NeuralNetwork3D({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  
  const nodes = useMemo(() => {
    const nodeData = []
    const gridSize = 5
    const spacing = 3
    
    for (let x = -gridSize; x <= gridSize; x++) {
      for (let y = -gridSize; y <= gridSize; y++) {
        for (let z = -2; z <= 2; z++) {
          nodeData.push({
            position: [x * spacing, y * spacing, z * spacing - 10] as [number, number, number],
            color: ['#818cf8', '#34d399', '#fbbf24', '#f472b6'][Math.floor(Math.random() * 4)]
          })
        }
      }
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
        if (dist < 4.5 && Math.random() > 0.7) {
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
    groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1
  })
  
  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={isDark ? "#818cf8" : "#1e3a8a"} transparent opacity={0.15} />
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

// ============ FLOATING ICONS ============
function FloatingIcons({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  
  const icons = useMemo(() => [
    { position: [-10, 5, -15] as [number, number, number], color: '#818cf8', type: 'octahedron' },
    { position: [10, -5, -18] as [number, number, number], color: '#34d399', type: 'icosahedron' },
    { position: [-8, -8, -20] as [number, number, number], color: '#fbbf24', type: 'dodecahedron' },
    { position: [8, 8, -22] as [number, number, number], color: '#f472b6', type: 'tetrahedron' },
    { position: [0, 10, -25] as [number, number, number], color: '#22d3ee', type: 'octahedron' },
  ], [])
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x = time * 0.2 + i * 0.5
      child.rotation.y = time * 0.3 + i * 0.3
      child.position.y = icons[i].position[1] + Math.sin(time + i) * 0.5
    })
  })
  
  return (
    <group ref={groupRef}>
      {icons.map((icon, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={icon.position}>
            {icon.type === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
            {icon.type === 'icosahedron' && <icosahedronGeometry args={[0.8, 0]} />}
            {icon.type === 'dodecahedron' && <dodecahedronGeometry args={[0.9, 0]} />}
            {icon.type === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
            <meshStandardMaterial
              color={icon.color}
              wireframe
              emissive={icon.color}
              emissiveIntensity={isDark ? 0.4 : 0.2}
              transparent
              opacity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// ============ PULSE RINGS ============
function PulseRings({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.children.forEach((child, i) => {
      const scale = 1 + Math.sin(time * 2 + i * 0.5) * 0.2
      child.scale.setScalar(scale)
      const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
      material.opacity = 0.3 - i * 0.05 + Math.sin(time * 2 + i * 0.5) * 0.1
    })
  })
  
  const rings = useMemo(() => [
    { radius: 8, color: '#818cf8' },
    { radius: 10, color: '#34d399' },
    { radius: 12, color: '#fbbf24' },
  ], [])
  
  return (
    <group ref={groupRef} position={[0, 0, -15]}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI * 0.5, 0, 0]}>
          <torusGeometry args={[ring.radius, 0.05, 8, 64]} />
          <meshBasicMaterial color={ring.color} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

// ============ SCENE ============
function FeaturesScene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <color attach="background" args={[isDark ? '#020617' : '#fafafa']} />
      <fog attach="fog" args={[isDark ? '#020617' : '#fafafa', 20, 40]} />
      
      <ambientLight intensity={isDark ? 0.3 : 0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#818cf8" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#34d399" />
      
      <NeuralNetwork3D isDark={isDark} />
      <FloatingIcons isDark={isDark} />
      <PulseRings isDark={isDark} />
    </>
  )
}

// ============ MAIN COMPONENT ============
export default function Features3D() {
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
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 15], fov: 50 }}
          dpr={[1, 1.2]}
          gl={{ antialias: true, alpha: true }}
        >
          <FeaturesScene isDark={isDark} />
        </Canvas>
      </Suspense>
    </div>
  )
}
