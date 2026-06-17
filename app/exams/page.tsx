'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Badge } from '@/components/badge'
import { Footer } from '@/components/footer'
import { Button } from '@/components/button'
import { Card, CardContent } from '@/components/card'
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
    id: 'JEE_ADVANCED', name: 'JEE Advanced',
    description: 'The ultimate engineering challenge. Master advanced concepts and problem-solving techniques for top IITs.',
    icon: BookOpen, color: 'from-blue-500/80 to-cyan-600', accent: '#3b82f6',
    stats: '400K+ Students', features: ['Advanced Mock Tests', 'Concept Mastery', 'IIT Pattern Sets'],
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
    id: 'BITSAT', name: 'BITSAT',
    description: 'Comprehensive BITSAT preparation. Master the unique pattern and time management for BITS Pilani.',
    icon: BookOpen, color: 'from-orange-500/80 to-amber-600', accent: '#f97316',
    stats: '150K+ Students', features: ['BITS Pattern Tests', 'Speed Building', 'Rank Analysis'],
  },
  {
    id: 'MANIPAL', name: 'Manipal',
    description: 'Manipal entrance exam preparation. Focused practice for MET with detailed analytics.',
    icon: BookOpen, color: 'from-pink-500/80 to-rose-600', accent: '#ec4899',
    stats: '100K+ Students', features: ['MET Pattern Sets', 'Subject Focus', 'Performance Reports'],
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
    <main className="min-h-screen bg-background selection:bg-primary/30">

      <Header showAuth={true} />

      <section className="pt-48 pb-24 relative">
        <Container size="2xl">

          {/* ── Hero header ── */}
          <div className="flex flex-col lg:flex-row items-end justify-between mb-12 gap-12">
            <div className="space-y-8 max-w-3xl">
              <Badge variant="secondary" className="px-4 py-2 rounded-full text-sm font-semibold">
                Operational Sectors
              </Badge>
              <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tighter leading-tight">
                Choose Your<br />
                <span className="text-gradient pr-4">Battlefield</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                Select your objective to begin the tactical preparation sequence. Each sector is optimised for success.
              </p>
            </div>

            <div>
              <Card className="bg-white/5 p-8 rounded-3xl border border-white/5 space-y-4 min-w-[300px]">
                <CardContent>
                  <div className="flex items-center justify-between text-xs font-semibold tracking-wide uppercase opacity-50">
                    <span>Active Aspirants</span>
                    <span className="text-primary">● LIVE</span>
                  </div>
                  <p className="text-4xl font-display font-semibold">3.7M+</p>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-primary to-secondary" initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 2, ease: 'easeOut' }} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>


          {/* ── Exam cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {exams.map((exam) => (
              <Card
                key={exam.id}
                className={`rounded-3xl cursor-pointer border-2 transition-all duration-300 overflow-hidden ${
                  selected === exam.id
                    ? 'border-primary shadow-lg'
                    : 'border-white/5 hover:border-primary/40'
                }`}
                onClick={() => setSelected(exam.id)}
              >
                <CardContent className="p-10 md:p-12 flex flex-col lg:flex-row gap-10 h-full">

                  <div className="space-y-6 flex-1">
                    <motion.div
                      className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${exam.color} p-5 flex items-center justify-center text-white shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <exam.icon className="w-full h-full" />
                    </motion.div>

                    <div className="space-y-3">
                      <h3 className="text-4xl font-display font-semibold tracking-tighter uppercase text-foreground">
                        {exam.name}
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed">{exam.description}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {exam.features.map((f, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center gap-2 text-sm font-semibold font-mono text-muted-foreground/60"
                            whileHover={{ x: 4, color: exam.accent }}
                            transition={{ duration: 0.15 }}
                          >
                            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: exam.accent }} />
                            {f}
                          </motion.div>
                        ))}
                      </div>
                  </div>

                  <div className="lg:w-44 flex flex-col justify-between items-end border-t lg:border-t-0 lg:border-l border-border-subtle pt-6 lg:pt-0 lg:pl-8">
                      <div className="text-right">
                        <span className="text-[10px] font-semibold tracking-wide text-muted-foreground/40 uppercase">Students</span>
                        <p className="text-xl font-mono font-semibold">{exam.stats}</p>
                      </div>

                      <motion.div
                        className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          selected === exam.id
                            ? 'bg-primary text-white border-primary rotate-45'
                            : 'border-white/10 text-muted-foreground hover:border-primary hover:text-primary'
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <ArrowUpRight className="w-6 h-6" />
                      </motion.div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ── Deploy CTA ── */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="mt-20 flex flex-col items-center space-y-6"
              >
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary/5 text-sm font-mono font-semibold text-primary uppercase tracking-wide">
                  <Target className="w-4 h-4" />
                  Target confirmed: {exams.find(e => e.id === selected)?.name}
                </div>

                <Button
                  onClick={() => handlePayment(selected!)}
                  className="px-16 h-14 text-lg font-semibold rounded-2xl uppercase tracking-wide bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                >
                  <span className="flex items-center gap-3">
                    Deploy Sequence — ₹99 <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

        </Container>
      </section>

      <Footer />
    </main>
  )
}
