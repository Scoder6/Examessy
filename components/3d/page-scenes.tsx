'use client'

/**
 * One file – one export per page.
 * Each scene is visually distinct, thematically relevant, and works in both light & dark.
 * Safe opacity + gradient overlays ensure text is NEVER hidden.
 */

import { Stars } from '@react-three/drei'
import { SceneWrapper, useIsDark, ParticleCloud, DNAHelix, GeometricCluster, KnowledgeOrb, NeuralWeb, ConfettiRise, SpiralGalaxy, RingCluster, PortalSphere } from './scene-wrapper'

/* ── HOME HERO – interactive particle universe ────────────────────── */
export function HomeBackground() {
  const isDark = useIsDark()
  return (
    <SceneWrapper opacity={isDark ? 0.55 : 0.2} cameraZ={18} fov={55} className="pointer-events-none">
      <color attach="background" args={[isDark ? '#020617' : '#fafafa'] as any} />
      <fog attach="fog" args={[isDark ? '#020617' : '#fafafa', 25, 70] as any} />
      <ambientLight intensity={isDark ? 0.3 : 0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#818cf8" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#34d399" />
      <Stars radius={90} depth={60} count={isDark ? 4000 : 800} factor={3} saturation={0} fade speed={0.4} />
      <SpiralGalaxy isDark={isDark} arms={2} perArm={500} />
      <DNAHelix isDark={isDark} count={32} />
      <GeometricCluster isDark={isDark} items={6} />
      <KnowledgeOrb isDark={isDark} position={[-12, 5, -20]} size={1.4} />
      <KnowledgeOrb isDark={isDark} color={isDark ? '#34d399' : '#059669'} position={[14, -4, -25]} size={1.1} />
    </SceneWrapper>
  )
}

/* ── EXAMS PAGE – battlefield / target radar ─────────────────────── */
export function ExamsBackground() {
  const isDark = useIsDark()
  return (
    <SceneWrapper opacity={isDark ? 0.4 : 0.15} cameraZ={14} fov={52}>
      <color attach="background" args={[isDark ? '#020617' : '#fafafa'] as any} />
      <ambientLight intensity={isDark ? 0.3 : 0.5} />
      <pointLight position={[8, 8, 8]} intensity={0.7} color={isDark ? '#22d3ee' : '#0891b2'} />
      <Stars radius={70} depth={50} count={isDark ? 2500 : 500} factor={2.5} saturation={0} fade speed={0.3} />
      <RingCluster isDark={isDark} count={6} />
      <NeuralWeb isDark={isDark} nodeCount={35} spread={22} />
      <GeometricCluster isDark={isDark} items={5} />
    </SceneWrapper>
  )
}

/* ── FEATURES PAGE – brain / neural network ─────────────────────── */
export function FeaturesBackground() {
  const isDark = useIsDark()
  return (
    <SceneWrapper opacity={isDark ? 0.38 : 0.14} cameraZ={16} fov={50}>
      <color attach="background" args={[isDark ? '#020617' : '#fafafa'] as any} />
      <ambientLight intensity={isDark ? 0.25 : 0.5} />
      <pointLight position={[12, 8, 5]} intensity={0.7} color={isDark ? '#a78bfa' : '#4f46e5'} />
      <Stars radius={80} depth={55} count={isDark ? 2000 : 400} factor={2} saturation={0} fade speed={0.25} />
      <NeuralWeb isDark={isDark} nodeCount={55} spread={28} />
      <ParticleCloud isDark={isDark} count={1200} spread={20} />
    </SceneWrapper>
  )
}

/* ── PRICING PAGE – success portal / gold orb ───────────────────── */
export function PricingBackground() {
  const isDark = useIsDark()
  return (
    <SceneWrapper opacity={isDark ? 0.45 : 0.18} cameraZ={12} fov={50}>
      <color attach="background" args={[isDark ? '#020617' : '#fafafa'] as any} />
      <ambientLight intensity={isDark ? 0.3 : 0.55} />
      <pointLight position={[0, 5, 5]} intensity={1.2} color={isDark ? '#fbbf24' : '#d97706'} />
      <pointLight position={[-8, -5, -5]} intensity={0.5} color={isDark ? '#818cf8' : '#1e3a8a'} />
      <Stars radius={60} depth={40} count={isDark ? 2000 : 400} factor={2.5} saturation={0} fade speed={0.3} />
      <PortalSphere isDark={isDark} />
      <ConfettiRise isDark={isDark} count={1000} />
      <RingCluster isDark={isDark} count={4} />
    </SceneWrapper>
  )
}

/* ── BLOG PAGE – floating ink particles ─────────────────────────── */
export function BlogBackground() {
  const isDark = useIsDark()
  return (
    <SceneWrapper opacity={isDark ? 0.35 : 0.12} cameraZ={14} fov={50}>
      <color attach="background" args={[isDark ? '#020617' : '#fafafa'] as any} />
      <ambientLight intensity={isDark ? 0.25 : 0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color={isDark ? '#34d399' : '#059669'} />
      <Stars radius={75} depth={50} count={isDark ? 1500 : 300} factor={2} saturation={0} fade speed={0.2} />
      <SpiralGalaxy isDark={isDark} arms={2} perArm={300} />
      <ParticleCloud isDark={isDark} count={900} spread={18} />
    </SceneWrapper>
  )
}

/* ── ABOUT PAGE – expanding universe / history ───────────────────── */
export function AboutBackground() {
  const isDark = useIsDark()
  return (
    <SceneWrapper opacity={isDark ? 0.38 : 0.13} cameraZ={16} fov={52}>
      <color attach="background" args={[isDark ? '#020617' : '#fafafa'] as any} />
      <ambientLight intensity={isDark ? 0.3 : 0.55} />
      <pointLight position={[10, 10, 5]} intensity={0.6} color={isDark ? '#818cf8' : '#1e3a8a'} />
      <Stars radius={100} depth={70} count={isDark ? 3500 : 700} factor={3.5} saturation={0} fade speed={0.2} />
      <SpiralGalaxy isDark={isDark} arms={3} perArm={350} />
      <KnowledgeOrb isDark={isDark} position={[10, 6, -22]} size={1.2} />
      <KnowledgeOrb isDark={isDark} color={isDark ? '#fbbf24' : '#d97706'} position={[-10, -4, -28]} size={1} />
    </SceneWrapper>
  )
}

/* ── CONTACT PAGE – communication / signal waves ────────────────── */
export function ContactBackground() {
  const isDark = useIsDark()
  return (
    <SceneWrapper opacity={isDark ? 0.42 : 0.15} cameraZ={13} fov={50}>
      <color attach="background" args={[isDark ? '#020617' : '#fafafa'] as any} />
      <ambientLight intensity={isDark ? 0.3 : 0.5} />
      <pointLight position={[-5, 5, 5]} intensity={0.8} color={isDark ? '#22d3ee' : '#0891b2'} />
      <Stars radius={65} depth={45} count={isDark ? 1800 : 350} factor={2} saturation={0} fade speed={0.2} />
      <RingCluster isDark={isDark} count={5} />
      <ParticleCloud isDark={isDark} count={1000} spread={16} />
    </SceneWrapper>
  )
}

/* ── DASHBOARD – data analytics orbs ────────────────────────────── */
export function DashboardBackground() {
  const isDark = useIsDark()
  return (
    <SceneWrapper opacity={isDark ? 0.35 : 0.12} cameraZ={15} fov={50}>
      <color attach="background" args={[isDark ? '#020617' : '#fafafa'] as any} />
      <ambientLight intensity={isDark ? 0.25 : 0.5} />
      <pointLight position={[8, 8, 8]} intensity={0.7} color={isDark ? '#34d399' : '#059669'} />
      <Stars radius={80} depth={55} count={isDark ? 2200 : 400} factor={2.5} saturation={0} fade speed={0.2} />
      <NeuralWeb isDark={isDark} nodeCount={45} spread={24} />
      <ConfettiRise isDark={isDark} count={600} />
    </SceneWrapper>
  )
}

/* ── AUTH PAGES – identity / security ───────────────────────────── */
export function AuthBackground() {
  const isDark = useIsDark()
  return (
    <SceneWrapper opacity={isDark ? 0.4 : 0.14} cameraZ={14} fov={52}>
      <color attach="background" args={[isDark ? '#020617' : '#fafafa'] as any} />
      <ambientLight intensity={isDark ? 0.3 : 0.5} />
      <pointLight position={[5, 10, 5]} intensity={0.7} color={isDark ? '#818cf8' : '#1e3a8a'} />
      <Stars radius={70} depth={50} count={isDark ? 2500 : 500} factor={2.5} saturation={0} fade speed={0.3} />
      <DNAHelix isDark={isDark} count={28} />
      <ParticleCloud isDark={isDark} count={1000} spread={18} />
    </SceneWrapper>
  )
}

/* ── TESTIMONIALS PAGE – celebration / stars ─────────────────────── */
export function TestimonialsBackground() {
  const isDark = useIsDark()
  return (
    <SceneWrapper opacity={isDark ? 0.42 : 0.16} cameraZ={13} fov={50}>
      <color attach="background" args={[isDark ? '#020617' : '#fafafa'] as any} />
      <ambientLight intensity={isDark ? 0.3 : 0.55} />
      <pointLight position={[0, 8, 8]} intensity={1} color={isDark ? '#fbbf24' : '#d97706'} />
      <Stars radius={60} depth={40} count={isDark ? 3000 : 600} factor={3} saturation={0} fade speed={0.5} />
      <ConfettiRise isDark={isDark} count={1200} />
      <RingCluster isDark={isDark} count={4} />
    </SceneWrapper>
  )
}
