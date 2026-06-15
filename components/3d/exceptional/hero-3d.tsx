'use client'

import { useRef, useMemo, Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial, Stars, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ============ CUSTOM AURORA SHADER ============
const AuroraMaterial = shaderMaterial(
  { uTime: 0, uColor1: new THREE.Color('#818cf8'), uColor2: new THREE.Color('#34d399') },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;
    
    void main() {
      float wave = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
      wave *= sin(vUv.y * 8.0 + uTime * 0.5) * 0.5 + 0.5;
      vec3 color = mix(uColor1, uColor2, wave);
      gl_FragColor = vec4(color, wave * 0.3);
    }
  `
)

extend({ AuroraMaterial })

// ============ INTERACTIVE PARTICLE UNIVERSE ============
function ParticleUniverse({ count = 4000, mouse }: { count?: number; mouse: React.RefObject<{ x: number; y: number }> }) {
  const ref = useRef<THREE.Points>(null)
  
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = Math.random() * 30 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi) - 15
      
      velocities[i3] = (Math.random() - 0.5) * 0.01
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01
    }
    
    return [positions, velocities]
  }, [count])
  
  useFrame((state) => {
    if (!ref.current || !mouse.current) return
    
    const time = state.clock.getElapsedTime()
    const posArray = ref.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Mouse attraction
      const dx = mouse.current.x * 15 - posArray[i3]
      const dy = mouse.current.y * 10 - posArray[i3 + 1]
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 10) {
        posArray[i3] += dx * 0.01
        posArray[i3 + 1] += dy * 0.01
      }
      
      // Wave motion
      posArray[i3 + 1] += Math.sin(time + posArray[i3] * 0.1) * 0.005
      posArray[i3] += Math.cos(time * 0.5 + posArray[i3 + 1] * 0.1) * 0.003
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y = time * 0.02
  })
  
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  )
}

// ============ ORBITING SPHERES ============
function OrbitingSpheres({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  
  const spheres = useMemo(() => [
    { orbit: 8, speed: 1, size: 0.4, color: '#818cf8', offset: 0 },
    { orbit: 10, speed: 0.7, size: 0.3, color: '#34d399', offset: Math.PI / 3 },
    { orbit: 12, speed: 0.5, size: 0.5, color: '#fbbf24', offset: Math.PI / 1.5 },
    { orbit: 14, speed: 0.3, size: 0.35, color: '#f472b6', offset: Math.PI },
  ], [])
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.children.forEach((child, i) => {
      const angle = time * spheres[i].speed + spheres[i].offset
      child.position.x = Math.cos(angle) * spheres[i].orbit
      child.position.z = Math.sin(angle) * spheres[i].orbit - 20
      child.position.y = Math.sin(angle * 2) * 2
    })
  })
  
  return (
    <group ref={groupRef}>
      {spheres.map((sphere, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <Sphere args={[sphere.size, 32, 32]}>
            <MeshDistortMaterial
              color={sphere.color}
              distort={0.4}
              speed={2}
              roughness={0.1}
              metalness={0.9}
              emissive={sphere.color}
              emissiveIntensity={0.3}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

// ============ DNA HELIX ============
function DNAHelix({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const count = 30
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = time * 0.1
  })
  
  const nodes = useMemo(() => {
    const nodes = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 4
      const y = (i - count / 2) * 0.4
      nodes.push({
        left: { x: Math.cos(angle) * 2, y, z: Math.sin(angle) * 2 - 15 },
        right: { x: Math.cos(angle + Math.PI) * 2, y, z: Math.sin(angle + Math.PI) * 2 - 15 },
        color: i % 2 === 0 ? '#818cf8' : '#34d399'
      })
    }
    return nodes
  }, [])
  
  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <group key={i}>
          <mesh position={[node.left.x, node.left.y, node.left.z]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[node.right.x, node.right.y, node.right.z]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.5} />
          </mesh>
          {i < nodes.length - 1 && (
            <>
              <mesh position={[node.left.x, node.left.y + 0.2, node.left.z]}>
                <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
                <meshStandardMaterial color="#818cf8" transparent opacity={0.3} />
              </mesh>
              <mesh position={[node.right.x, node.right.y + 0.2, node.right.z]}>
                <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
                <meshStandardMaterial color="#34d399" transparent opacity={0.3} />
              </mesh>
            </>
          )}
        </group>
      ))}
    </group>
  )
}

// ============ SCENE ============
function HeroScene({ isDark, mouse }: { isDark: boolean; mouse: React.RefObject<{ x: number; y: number }> }) {
  const { camera } = useThree()
  
  useFrame(() => {
    if (!mouse.current) return
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current.x * 2, 0.02)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.current.y * 1, 0.02)
    camera.lookAt(0, 0, -15)
  })
  
  return (
    <>
      <color attach="background" args={[isDark ? '#020617' : '#fafafa']} />
      <fog attach="fog" args={[isDark ? '#020617' : '#fafafa', 20, 60]} />
      
      <ambientLight intensity={isDark ? 0.3 : 0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#818cf8" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#34d399" />
      <spotLight position={[0, 20, -10]} angle={0.5} penumbra={1} intensity={0.8} color="#fbbf24" />
      
      <Stars radius={80} depth={50} count={isDark ? 4000 : 1500} factor={3} saturation={0} fade speed={0.5} />
      
      <ParticleUniverse count={4000} mouse={mouse} />
      <OrbitingSpheres isDark={isDark} />
      <DNAHelix isDark={isDark} />
    </>
  )
}

// ============ MAIN COMPONENT ============
export default function Hero3D() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const mouse = useRef({ x: 0, y: 0 })
  
  useEffect(() => {
    setMounted(true)
    
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()
    
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  
  if (!mounted) return null
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 18], fov: 55 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <HeroScene isDark={isDark} mouse={mouse} />
        </Canvas>
      </Suspense>
      
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40"
          style={{ opacity: isDark ? 0.5 : 0.3 }}
        />
      </div>
    </div>
  )
}
