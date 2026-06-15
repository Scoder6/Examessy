'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Badge } from '@/components/badge'
import { Container } from '@/components/container'
import { createClient } from '@/lib/supabase/client'
import { BookOpen, Target, Trophy, Zap, CheckCircle2, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { DramaticCard, HoverSpotlight, GlitchText, MagneticButton, SparkButton, LiquidButton, PulseBorder } from '@/components/dramatic/dramatic-effects'

type Step = 'info' | 'exam' | 'goals' | 'complete'

export default function ProfileSetup() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('info')
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    examType: '',
    targetScore: '',
  })

  const exams = [
    { id: 'JEE_MAINS', label: 'JEE Mains', icon: '🎯', color: 'from-primary/80 to-primary' },
    { id: 'NEET', label: 'NEET', icon: '💊', color: 'from-foreground/80 to-foreground' },
    { id: 'VIT', label: 'VIT', icon: '🏆', color: 'from-primary/60 to-primary' },
    { id: 'CBT', label: 'CBT', icon: '📝', color: 'from-foreground/60 to-foreground' },
  ]

  const handleNext = () => {
    if (currentStep === 'info' && !formData.name) return
    if (currentStep === 'exam' && !formData.examType) return
    if (currentStep === 'goals' && !formData.targetScore) return
    
    if (currentStep === 'goals') {
      setCurrentStep('complete')
    } else if (currentStep === 'info') {
      setCurrentStep('exam')
    } else if (currentStep === 'exam') {
      setCurrentStep('goals')
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }

      const { error } = await supabase.from('students').insert([
        {
          user_id: user.id,
          name: formData.name,
          email: user.email,
          exam_type: formData.examType,
          target_score: parseInt(formData.targetScore),
        },
      ])

      if (error) throw error
      
      router.push('/dashboard')
    } catch (error) {
      console.error('[v0] Profile setup error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-grid-white opacity-[0.02] animate-grid-move" />
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-orb" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[120px] animate-orb" style={{ animationDelay: '-8s' }} />
      </div>

      <Container className="py-16 min-h-screen flex flex-col justify-center">
        {/* Progress */}
        <div className="mb-12 max-w-lg mx-auto w-full">
          <div className="flex items-center justify-between">
            {(['info','exam','goals','complete'] as Step[]).map((step, idx) => (
              <div key={step} className="flex items-center gap-2">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300 ${
                    currentStep === step ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]'
                    : idx < (['info','exam','goals','complete'] as Step[]).indexOf(currentStep) ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                  }`}
                  animate={currentStep === step ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {idx < (['info','exam','goals','complete'] as Step[]).indexOf(currentStep) ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : idx + 1}
                </motion.div>
                {idx < 3 && (
                  <motion.div
                    className="w-10 md:w-16 h-1 rounded-full transition-all duration-500"
                    style={{ background: idx < (['info','exam','goals','complete'] as Step[]).indexOf(currentStep) ? 'var(--primary)' : 'var(--muted)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1 */}
          {currentStep === 'info' && (
            <motion.div key="info" initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20 }}>
              <DramaticCard className="max-w-lg mx-auto rounded-3xl" glowColor="rgba(var(--primary-rgb),0.4)">
                <Card variant="glass" className="rounded-3xl border-white/5">
                  <CardHeader className="p-8 pb-0">
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary" whileHover={{ scale: 1.1, rotate: -5 }}>
                        <BookOpen className="w-5 h-5" />
                      </motion.div>
                      <CardTitle className="font-display font-black tracking-tight text-xl">
                        Welcome to Examessy
                      </CardTitle>
                    </div>
                    <CardDescription>Let&apos;s start with your basic information</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <Input label="Full Name" placeholder="Enter your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <MagneticButton className="w-full">
                      <SparkButton className="w-full" onClick={handleNext}>
                        <LiquidButton onClick={handleNext} className="w-full h-14 rounded-2xl font-black text-base bg-primary text-primary-foreground">
                          Continue <ArrowRight className="w-4 h-4 inline ml-2" />
                        </LiquidButton>
                      </SparkButton>
                    </MagneticButton>
                  </CardContent>
                </Card>
              </DramaticCard>
            </motion.div>
          )}

          {/* Step 2 */}
          {currentStep === 'exam' && (
            <motion.div key="exam" initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20 }}>
              <DramaticCard className="max-w-2xl mx-auto rounded-3xl" glowColor="rgba(var(--secondary-rgb),0.4)">
                <Card variant="glass" className="rounded-3xl border-white/5">
                  <CardHeader className="p-8 pb-0">
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary" whileHover={{ scale: 1.1, rotate: -5 }}>
                        <Target className="w-5 h-5" />
                      </motion.div>
                      <CardTitle className="font-display font-black tracking-tight text-xl">
                        Choose Your Exam
                      </CardTitle>
                    </div>
                    <CardDescription>Select the exam you&apos;re preparing for</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {exams.map((exam) => (
                        <DramaticCard key={exam.id} className={`rounded-2xl cursor-pointer transition-all duration-300 ${formData.examType === exam.id ? 'ring-2 ring-primary' : ''}`} glowColor="rgba(var(--primary-rgb),0.3)">
                          <HoverSpotlight onClick={() => setFormData({ ...formData, examType: exam.id })}>
                            <div className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${formData.examType === exam.id ? 'border-primary bg-primary/10 scale-[1.02]' : 'border-white/10 hover:border-primary/40'}`}>
                              <motion.div className="text-4xl mb-3" animate={formData.examType === exam.id ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : {}} transition={{ duration: 0.4 }}>
                                {exam.icon}
                              </motion.div>
                              <h3 className="font-black font-display text-lg tracking-tight">{exam.label}</h3>
                              <AnimatePresence>
                                {formData.examType === exam.id && (
                                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute top-3 right-3">
                                    <CheckCircle2 className="w-6 h-6 text-primary" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </HoverSpotlight>
                        </DramaticCard>
                      ))}
                    </div>
                    <div className="flex gap-3 pt-2">
                      <LiquidButton onClick={() => setCurrentStep('info')} className="flex-1 h-12 rounded-2xl border border-white/10 font-bold bg-transparent text-foreground">Back</LiquidButton>
                      <MagneticButton className="flex-1">
                        <SparkButton className="w-full" onClick={handleNext}>
                          <LiquidButton onClick={handleNext} className="w-full h-12 rounded-2xl font-black bg-primary text-primary-foreground" >
                            Continue <ArrowRight className="w-4 h-4 inline ml-2" />
                          </LiquidButton>
                        </SparkButton>
                      </MagneticButton>
                    </div>
                  </CardContent>
                </Card>
              </DramaticCard>
            </motion.div>
          )}

          {/* Step 3 */}
          {currentStep === 'goals' && (
            <motion.div key="goals" initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20 }}>
              <DramaticCard className="max-w-lg mx-auto rounded-3xl" glowColor="rgba(var(--accent-rgb),0.4)">
                <Card variant="glass" className="rounded-3xl border-white/5">
                  <CardHeader className="p-8 pb-0">
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        <Trophy className="w-5 h-5" />
                      </motion.div>
                      <CardTitle className="font-display font-black tracking-tight text-xl">
                        Set Your Target
                      </CardTitle>
                    </div>
                    <CardDescription>What&apos;s your target score?</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <Input label="Target Score" type="number" placeholder="e.g., 250" value={formData.targetScore} onChange={(e) => setFormData({ ...formData, targetScore: e.target.value })} />
                    <motion.div className="p-4 rounded-2xl border border-accent/20 bg-accent/5 flex items-center gap-3" animate={{ borderColor: ['rgba(var(--accent-rgb),0.2)', 'rgba(var(--accent-rgb),0.5)', 'rgba(var(--accent-rgb),0.2)'] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Zap className="w-4 h-4 text-accent shrink-0" />
                      <p className="text-sm font-bold">You&apos;re all set! Click continue to finalize your profile.</p>
                    </motion.div>
                    <div className="flex gap-3 pt-2">
                      <LiquidButton onClick={() => setCurrentStep('exam')} className="flex-1 h-12 rounded-2xl border border-white/10 font-bold bg-transparent text-foreground">Back</LiquidButton>
                      <MagneticButton className="flex-1">
                        <SparkButton className="w-full" onClick={handleNext}>
                          <LiquidButton onClick={handleNext} className="w-full h-12 rounded-2xl font-black bg-primary text-primary-foreground">
                            Continue <ArrowRight className="w-4 h-4 inline ml-2" />
                          </LiquidButton>
                        </SparkButton>
                      </MagneticButton>
                    </div>
                  </CardContent>
                </Card>
              </DramaticCard>
            </motion.div>
          )}

          {/* Step 4 — Complete */}
          {currentStep === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
              <PulseBorder className="max-w-lg mx-auto rounded-3xl" color="#34d399">
                <DramaticCard className="rounded-3xl" glowColor="#34d39966">
                  <Card variant="glass" className="rounded-3xl border-green-500/30">
                    <CardContent className="text-center py-12 px-8 space-y-6">
                      <motion.div
                        className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30"
                        animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 20px rgba(52,211,153,0.3)', '0 0 50px rgba(52,211,153,0.6)', '0 0 20px rgba(52,211,153,0.3)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                      </motion.div>
                      <div>
                        <h2 className="text-3xl font-display font-black tracking-tight mb-2 text-green-500">
                          Profile Created!
                        </h2>
                        <p className="text-muted-foreground/70">Great! Your profile is ready.</p>
                      </div>
                      <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/[0.06] text-left space-y-2">
                        {[{k:'Name',v:formData.name},{k:'Exam',v:exams.find(e=>e.id===formData.examType)?.label||''},{k:'Target',v:formData.targetScore}].map(row=>(
                          <div key={row.k} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground/50 font-bold uppercase tracking-wider text-[10px]">{row.k}</span>
                            <span className="font-black">{row.v}</span>
                          </div>
                        ))}
                      </div>
                      <MagneticButton className="w-full">
                        <SparkButton className="w-full" onClick={handleSubmit}>
                          <LiquidButton onClick={handleSubmit} className="w-full h-14 rounded-2xl font-black bg-primary text-primary-foreground gradient-border">
                            {loading ? 'Loading...' : 'Go to Dashboard'} <ArrowRight className="w-4 h-4 inline ml-2" />
                          </LiquidButton>
                        </SparkButton>
                      </MagneticButton>
                    </CardContent>
                  </Card>
                </DramaticCard>
              </PulseBorder>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </main>
  )
}
