'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Card, CardContent } from '@/components/card'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Footer } from '@/components/footer'
import { MouseSpotlight } from '@/components/mouse-spotlight'
import { ScrollProgress } from '@/components/scroll-progress'
import { BookOpen, ArrowUpRight, ArrowRight, Zap, Target, Trophy, Clock, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ExamsPage() {
  const router = useRouter()
  const [selectedExam, setSelectedExam] = useState<string | null>(null)

  const exams = [
    {
      id: 'JEE_MAINS',
      name: 'JEE Mains',
      description: 'The definitive engineering entrance test. Cover Physics, Chemistry, and Mathematics with extreme precision.',
      icon: BookOpen,
      color: 'from-primary/80 to-primary',
      stats: '1.2M+ Students',
      features: ['Full Mock Tests', 'Chapter-wise Practice', 'Previous Year Papers']
    },
    {
      id: 'NEET',
      name: 'NEET',
      description: 'Your gateway to a medical career. Master Biology, Physics, and Chemistry patterns with our curated sets.',
      icon: BookOpen,
      color: 'from-foreground/80 to-foreground',
      stats: '1.8M+ Students',
      features: ['Biology Focus Sets', 'Performance Tracking', 'Detailed Solutions']
    },
    {
      id: 'VIT',
      name: 'VIT',
      description: 'VITEEE preparation made simple. Focused questions and time-management strategies for VIT.',
      icon: BookOpen,
      color: 'from-primary/60 to-primary',
      stats: '200K+ Students',
      features: ['Speed Mock Tests', 'VIT Pattern Sets', 'Rank Predictor']
    },
    {
      id: 'CBT',
      name: 'CBT',
      description: 'Computer Based Test simulation. Perfect your online testing skills across various competitive exams.',
      icon: BookOpen,
      color: 'from-foreground/60 to-foreground',
      stats: '500K+ Students',
      features: ['Interface Simulation', 'Live Time Analytics', 'Global Leaderboard']
    }
  ]

  const handlePayment = (examId: string) => {
    sessionStorage.setItem('selectedExam', examId)
    router.push('/payment')
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      <MouseSpotlight />
      <ScrollProgress />
      
      {/* Dynamic Moving Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white opacity-[0.02] animate-grid-move" />
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.05]" />
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] animate-orb" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] animate-orb" style={{ animationDelay: '-10s' }} />
      </div>

      <Header showAuth={true} />

      {/* Hero Section */}
      <section className="pt-48 pb-24 relative">
        <Container size="2xl">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-12">
            <div className="space-y-8 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Badge variant="glass" className="px-6 py-2 rounded-full border-secondary/20 text-secondary font-black tracking-widest uppercase italic">
                  Operational Sectors
                </Badge>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-7xl md:text-9xl font-display font-black tracking-tighter uppercase italic leading-[0.85] pb-4"
              >
                Choose Your <br /><span className="text-gradient pr-4">Battlefield</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-muted-foreground font-clean font-medium opacity-80"
              >
                Select your objective to begin the tactical preparation sequence. Each sector is optimized for success.
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass p-8 rounded-3xl border-white/5 space-y-4 min-w-[300px]"
            >
              <div className="flex items-center justify-between text-xs font-black tracking-widest uppercase opacity-50">
                <span>Active Aspirants</span>
                <span>Live</span>
              </div>
              <p className="text-4xl font-display font-black italic">3.7M+</p>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </div>

          {/* Detailed Exams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {exams.map((exam, i) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card 
                  variant={selectedExam === exam.id ? 'glass' : 'default'}
                  className={`group relative cursor-pointer border-2 transition-all duration-700 overflow-hidden ${
                    selectedExam === exam.id ? 'border-primary shadow-[0_0_50px_rgba(var(--primary),0.2)] bg-primary/5' : 'border-white/5 hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedExam(exam.id)}
                >
                  <CardContent className="p-12 flex flex-col lg:flex-row gap-12 h-full">
                    <div className="space-y-8 flex-1">
                      <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${exam.color} p-5 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <exam.icon className="w-full h-full" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-4xl font-display font-black tracking-tighter uppercase italic group-hover:text-primary transition-colors">{exam.name}</h3>
                        <p className="text-lg text-muted-foreground font-medium opacity-70 group-hover:opacity-100 transition-opacity leading-relaxed">
                          {exam.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {exam.features.map((f, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm font-bold font-mono opacity-60">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:w-48 flex flex-col justify-between items-end border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-8">
                      <div className="text-right">
                        <span className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase opacity-50">Intel</span>
                        <p className="text-xl font-mono font-black text-foreground">{exam.stats}</p>
                      </div>
                      
                      <div className={`w-16 h-16 rounded-full glass flex items-center justify-center transition-all duration-500 ${selectedExam === exam.id ? 'bg-primary text-white rotate-45' : 'group-hover:bg-primary/20'}`}>
                        <ArrowUpRight className="w-8 h-8" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {selectedExam && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-24 flex flex-col items-center space-y-8"
            >
              <div className="flex items-center gap-4 text-muted-foreground font-mono font-bold italic uppercase tracking-widest text-sm">
                <Target className="w-5 h-5 text-primary" /> Target Confirmed: {exams.find(e => e.id === selectedExam)?.name}
              </div>
              <Button 
                size="xl" 
                variant="default" 
                className="px-16 h-24 text-2xl font-black rounded-[32px] uppercase tracking-[0.2em] shadow-[0_32px_64px_rgba(var(--primary),0.3)] hover:scale-105 transition-transform" 
                onClick={() => handlePayment(selectedExam)}
              >
                DEPLOY SEQUENCE - ₹99
              </Button>
            </motion.div>
          )}
        </Container>
      </section>

      <Footer />
    </main>
  )
}
