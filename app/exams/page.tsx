'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Badge } from '@/components/badge'
import { Footer } from '@/components/footer'
import { MouseSpotlight } from '@/components/mouse-spotlight'
import { ScrollProgress } from '@/components/scroll-progress'
import { ExamsBackground } from '@/components/3d/page-scenes'
import {
  DramaticReveal, DramaticCard, HoverSpotlight, GlitchText,
  MagneticButton, SparkButton, LiquidButton, StaggerGrid,
  ScrollingText, WordReveal, PulseBorder,
} from '@/components/dramatic/dramatic-effects'
import { BookOpen, ArrowUpRight, ArrowRight, Target, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const exams = [
  {
    id: 'JEE_MAINS', name: 'JEE Mains',
    description: 'The definitive engineering entrance test. Cover Physics, Chemistry, and Mathematics with extreme precision.',
    icon: BookOpen, color: 'from-indigo-500/80 to-indigo-600', accent: '#818cf8',
    stats: '1.2M+ Students', features: ['Full Mock Tests', 'Chapter-wise Practice', 'Previous Year Papers'],
  },
  {
    id: 'NEET', name: 'NEET',
    description: 'Your gateway to a medical career. Master Biology, Physics, and Chemistry patterns with our curated sets.',
    icon: BookOpen, color: 'from-emerald-500/80 to-teal-600', accent: '#34d399',
    stats: '1.8M+ Students', features: ['Biology Focus Sets', 'Performance Tracking', 'Detailed Solutions'],
  },
  {
    id: 'VIT', name: 'VIT',
    description: 'VITEEE preparation made simple. Focused questions and time-management strategies for VIT.',
    icon: BookOpen, color: 'from-violet-500/80 to-purple-600', accent: '#a78bfa',
    stats: '200K+ Students', features: ['Speed Mock Tests', 'VIT Pattern Sets', 'Rank Predictor'],
  },
  {
    id: 'CBT', name: 'CBT',
    description: 'Computer Based Test simulation. Perfect your online testing skills across various competitive exams.',
    icon: BookOpen, color: 'from-amber-500/80 to-orange-600', accent: '#fbbf24',
    stats: '500K+ Students', features: ['Interface Simulation', 'Live Time Analytics', 'Global Leaderboard'],
  },
]

export default function ExamsPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)

  const handlePayment = (id: string) => {
    sessionStorage.setItem('selectedExam', id)
    router.push('/payment')
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      <MouseSpotlight />
      <ScrollProgress />
      <ExamsBackground />

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white opacity-[0.02] animate-grid-move" />
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] animate-orb" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] animate-orb" style={{ animationDelay: '-10s' }} />
      </div>

      <Header showAuth={true} />

      <section className="pt-48 pb-24 relative">
        <Container size="2xl">

          {/* ── Hero header ── */}
          <div className="flex flex-col lg:flex-row items-end justify-between mb-12 gap-12">
            <DramaticReveal direction="left" className="space-y-8 max-w-3xl">
              <Badge variant="glass" className="px-6 py-2 rounded-full border-secondary/20 text-secondary font-black tracking-widest uppercase italic">
                Operational Sectors
              </Badge>
              <h1 className="text-7xl md:text-9xl font-display font-black tracking-tighter uppercase italic leading-[0.85] pb-4">
                Choose Your<br />
                <span className="text-gradient pr-4">Battlefield</span>
              </h1>
              <WordReveal
                text="Select your objective to begin the tactical preparation sequence. Each sector is optimised for success."
                className="text-xl md:text-2xl text-muted-foreground font-clean font-medium"
              />
            </DramaticReveal>

            <DramaticReveal direction="right" delay={0.2}>
              <DramaticCard className="glass p-8 rounded-3xl border-white/5 space-y-4 min-w-[300px]" glowColor="rgba(var(--primary-rgb),0.5)">
                <div className="flex items-center justify-between text-xs font-black tracking-widest uppercase opacity-50">
                  <span>Active Aspirants</span>
                  <motion.span className="text-primary" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}>● LIVE</motion.span>
                </div>
                <p className="text-4xl font-display font-black italic">3.7M+</p>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-primary to-secondary" initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 2, ease: 'easeOut' }} />
                </div>
              </DramaticCard>
            </DramaticReveal>
          </div>

          {/* ── Ticker ── */}
          <ScrollingText
            texts={['JEE Mains', 'NEET', 'VITEEE', 'CBT', 'JEE Advanced', 'BITSAT', 'COMEDK', 'MHT-CET']}
            speed={40}
            className="mb-12 opacity-50"
          />

          {/* ── Exam cards ── */}
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {exams.map((exam) => (
              <DramaticCard
                key={exam.id}
                className={`rounded-3xl cursor-pointer border-2 transition-all duration-700 overflow-hidden ${
                  selected === exam.id
                    ? 'border-primary shadow-[0_0_60px_rgba(var(--primary-rgb),0.35)]'
                    : 'border-white/5 hover:border-primary/40'
                }`}
                glowColor={selected === exam.id ? 'rgba(var(--primary-rgb),0.5)' : exam.accent + '33'}
              >
                <HoverSpotlight onClick={() => setSelected(exam.id)}>
                  <div className="p-10 md:p-12 flex flex-col lg:flex-row gap-10 h-full">

                    <div className="space-y-6 flex-1">
                      <motion.div
                        className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${exam.color} p-5 flex items-center justify-center text-white shadow-2xl`}
                        whileHover={{ scale: 1.18, rotate: 8 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <exam.icon className="w-full h-full" />
                      </motion.div>

                      <div className="space-y-3">
                        <h3 className="text-4xl font-display font-black tracking-tighter uppercase italic text-foreground">
                          <GlitchText text={exam.name} />
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed">{exam.description}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {exam.features.map((f, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center gap-2 text-sm font-bold font-mono text-muted-foreground/60"
                            whileHover={{ x: 4, color: exam.accent }}
                            transition={{ duration: 0.15 }}
                          >
                            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: exam.accent }} />
                            {f}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:w-44 flex flex-col justify-between items-end border-t lg:border-t-0 lg:border-l border-white/[0.05] pt-6 lg:pt-0 lg:pl-8">
                      <div className="text-right">
                        <span className="text-[10px] font-black tracking-[0.2em] text-muted-foreground/40 uppercase">Students</span>
                        <p className="text-xl font-mono font-black">{exam.stats}</p>
                      </div>

                      <motion.div
                        className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-500 ${
                          selected === exam.id
                            ? 'bg-primary text-white border-primary rotate-45'
                            : 'border-white/10 text-muted-foreground hover:border-primary hover:text-primary'
                        }`}
                        whileHover={{ scale: 1.15 }}
                      >
                        <ArrowUpRight className="w-6 h-6" />
                      </motion.div>
                    </div>
                  </div>
                </HoverSpotlight>
              </DramaticCard>
            ))}
          </StaggerGrid>

          {/* ── Deploy CTA ── */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="mt-20 flex flex-col items-center space-y-6"
              >
                <PulseBorder className="rounded-2xl" color="rgba(var(--primary-rgb),0.5)">
                  <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary/5 text-sm font-mono font-bold text-primary uppercase tracking-widest">
                    <Target className="w-4 h-4" />
                    Target confirmed: {exams.find(e => e.id === selected)?.name}
                  </div>
                </PulseBorder>

                <MagneticButton>
                  <SparkButton onClick={() => handlePayment(selected!)}>
                    <LiquidButton
                      onClick={() => handlePayment(selected!)}
                      className="px-16 h-20 text-xl font-black rounded-[28px] uppercase tracking-[0.2em] bg-primary text-primary-foreground shadow-[0_20px_60px_rgba(var(--primary-rgb),0.4)] gradient-border"
                    >
                      <span className="flex items-center gap-3">
                        Deploy Sequence — ₹99 <ArrowRight className="w-5 h-5" />
                      </span>
                    </LiquidButton>
                  </SparkButton>
                </MagneticButton>
              </motion.div>
            )}
          </AnimatePresence>

        </Container>
      </section>

      <Footer />
    </main>
  )
}
