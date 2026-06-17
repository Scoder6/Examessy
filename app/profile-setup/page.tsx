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
    { id: 'JEE_ADVANCED', label: 'JEE Advanced', icon: '🚀', color: 'from-blue-500/80 to-blue-600' },
    { id: 'NEET', label: 'NEET', icon: '💊', color: 'from-emerald-500/80 to-emerald-600' },
    { id: 'VIT', label: 'VIT', icon: '🏆', color: 'from-violet-500/80 to-violet-600' },
    { id: 'BITSAT', label: 'BITSAT', icon: '⚡', color: 'from-orange-500/80 to-orange-600' },
    { id: 'MANIPAL', label: 'Manipal', icon: '🎓', color: 'from-pink-500/80 to-pink-600' },
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
    <main className="min-h-screen bg-background selection:bg-primary/30">

      <Container className="py-16 min-h-screen flex flex-col justify-center">
        {/* Progress */}
        <div className="mb-12 max-w-lg mx-auto w-full">
          <div className="flex items-center justify-between">
            {(['info','exam','goals','complete'] as Step[]).map((step, idx) => (
              <div key={step} className="flex items-center gap-2">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                    currentStep === step ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]'
                    : idx < (['info','exam','goals','complete'] as Step[]).indexOf(currentStep) ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                  }`}
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
              <Card className="max-w-lg mx-auto rounded-3xl border border-border-subtle bg-card">
                <CardHeader className="p-8 pb-0">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary" whileHover={{ scale: 1.1 }}>
                      <BookOpen className="w-5 h-5" />
                    </motion.div>
                    <CardTitle className="font-display font-semibold tracking-tight text-xl">
                      Welcome to Examessy
                    </CardTitle>
                  </div>
                  <CardDescription>Let&apos;s start with your basic information</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <Input label="Full Name" placeholder="Enter your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  <Button onClick={handleNext} className="w-full h-14 rounded-2xl font-semibold text-base bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all">
                    Continue <ArrowRight className="w-4 h-4 inline ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2 */}
          {currentStep === 'exam' && (
            <motion.div key="exam" initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20 }}>
              <Card className="max-w-2xl mx-auto rounded-3xl border border-border-subtle bg-card">
                <CardHeader className="p-8 pb-0">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary" whileHover={{ scale: 1.1 }}>
                      <Target className="w-5 h-5" />
                    </motion.div>
                    <CardTitle className="font-display font-semibold tracking-tight text-xl">
                      Choose Your Exam
                    </CardTitle>
                  </div>
                  <CardDescription>Select the exam you&apos;re preparing for</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {exams.map((exam) => (
                      <Card key={exam.id} className={`rounded-2xl cursor-pointer transition-all duration-300 border-2 ${formData.examType === exam.id ? 'border-primary bg-primary/10 scale-[1.02]' : 'border-white/10 hover:border-primary/40'}`} onClick={() => setFormData({ ...formData, examType: exam.id })}>
                        <CardContent className="p-6">
                          <motion.div className="text-4xl mb-3" animate={formData.examType === exam.id ? { scale: 1.1 } : {}} transition={{ duration: 0.4 }}>
                            {exam.icon}
                          </motion.div>
                          <h3 className="font-semibold font-display text-lg tracking-tight">{exam.label}</h3>
                          <AnimatePresence>
                            {formData.examType === exam.id && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute top-3 right-3">
                                <CheckCircle2 className="w-6 h-6 text-primary" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button onClick={() => setCurrentStep('info')} variant="outline" className="flex-1 h-12 rounded-2xl font-semibold bg-transparent text-foreground">Back</Button>
                    <Button onClick={handleNext} className="flex-1 h-12 rounded-2xl font-semibold bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all">
                      Continue <ArrowRight className="w-4 h-4 inline ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3 */}
          {currentStep === 'goals' && (
            <motion.div key="goals" initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20 }}>
              <Card className="max-w-lg mx-auto rounded-3xl border border-border-subtle bg-card">
                <CardHeader className="p-8 pb-0">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                      <Trophy className="w-5 h-5" />
                    </motion.div>
                    <CardTitle className="font-display font-semibold tracking-tight text-xl">
                      Set Your Target
                    </CardTitle>
                  </div>
                  <CardDescription>What&apos;s your target score?</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <Input label="Target Score" type="number" placeholder="e.g., 250" value={formData.targetScore} onChange={(e) => setFormData({ ...formData, targetScore: e.target.value })} />
                  <div className="p-4 rounded-2xl border border-accent/20 bg-accent/5 flex items-center gap-3">
                    <Zap className="w-4 h-4 text-accent shrink-0" />
                    <p className="text-sm font-semibold">You&apos;re all set! Click continue to finalize your profile.</p>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button onClick={() => setCurrentStep('exam')} variant="outline" className="flex-1 h-12 rounded-2xl font-semibold bg-transparent text-foreground">Back</Button>
                    <Button onClick={handleNext} className="flex-1 h-12 rounded-2xl font-semibold bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all">
                      Continue <ArrowRight className="w-4 h-4 inline ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4 — Complete */}
          {currentStep === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
              <Card className="max-w-lg mx-auto rounded-3xl border border-green-500/30 bg-card">
                <CardContent className="text-center py-12 px-8 space-y-6">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-display font-semibold tracking-tight mb-2 text-green-500">
                      Profile Created!
                    </h2>
                    <p className="text-muted-foreground/70">Great! Your profile is ready.</p>
                  </div>
                  <div className="bg-card-bg-subtle rounded-2xl p-5 border border-border-subtle text-left space-y-2">
                    {[{k:'Name',v:formData.name},{k:'Exam',v:exams.find(e=>e.id===formData.examType)?.label||''},{k:'Target',v:formData.targetScore}].map(row=>(
                      <div key={row.k} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground/50 font-semibold uppercase tracking-wider text-[10px]">{row.k}</span>
                        <span className="font-semibold">{row.v}</span>
                      </div>
                    ))}
                  </div>
                  <Button onClick={handleSubmit} disabled={loading} className="w-full h-14 rounded-2xl font-semibold bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all">
                    {loading ? 'Loading...' : 'Go to Dashboard'} <ArrowRight className="w-4 h-4 inline ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </main>
  )
}
