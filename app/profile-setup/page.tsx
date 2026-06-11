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
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
      <Container>
        {/* Progress Indicators */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {['info', 'exam', 'goals', 'complete'].map((step, idx) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ease-in-out ${
                    currentStep === step
                      ? 'bg-primary text-primary-foreground scale-110'
                      : idx < ['info', 'exam', 'goals', 'complete'].indexOf(currentStep)
                      ? 'bg-green-500 text-white'
                      : 'bg-muted text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {idx < ['info', 'exam', 'goals', 'complete'].indexOf(currentStep) ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    idx + 1
                  )}
                </div>
                {idx < 3 && (
                  <div
                    className={`w-12 h-1 transition-all duration-300 ease-in-out ${
                      idx < ['info', 'exam', 'goals', 'complete'].indexOf(currentStep)
                        ? 'bg-green-500'
                        : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Personal Info */}
        {currentStep === 'info' && (
          <Card className="max-w-lg mx-auto animate-slideUp border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Welcome to Examessy
              </CardTitle>
              <CardDescription>Let&apos;s start with your basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Button fullWidth onClick={handleNext} className="mt-8">
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Exam Selection */}
        {currentStep === 'exam' && (
          <Card className="max-w-2xl mx-auto animate-slideUp border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-secondary" />
                Choose Your Exam
              </CardTitle>
              <CardDescription>Select the exam you&apos;re preparing for</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {exams.map((exam) => (
                  <div
                    key={exam.id}
                    onClick={() => setFormData({ ...formData, examType: exam.id })}
                    className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ease-in-out ${
                      formData.examType === exam.id
                        ? 'border-primary bg-primary/10 scale-105'
                        : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
                    }`}
                  >
                    <div className="text-4xl mb-3">{exam.icon}</div>
                    <h3 className="font-semibold text-lg">{exam.label}</h3>
                    {formData.examType === exam.id && (
                      <CheckCircle2 className="absolute top-3 right-3 w-6 h-6 text-primary" />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" fullWidth onClick={() => setCurrentStep('info')}>
                  Back
                </Button>
                <Button fullWidth onClick={handleNext} disabled={!formData.examType}>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Target Goals */}
        {currentStep === 'goals' && (
          <Card className="max-w-lg mx-auto animate-slideUp border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                Set Your Target
              </CardTitle>
              <CardDescription>What&apos;s your target score?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input
                label="Target Score"
                type="number"
                placeholder="e.g., 250"
                value={formData.targetScore}
                onChange={(e) => setFormData({ ...formData, targetScore: e.target.value })}
              />
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                <p className="text-sm text-slate-900 dark:text-slate-50 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent" />
                  You&apos;re all set! Click continue to finalize your profile.
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" fullWidth onClick={() => setCurrentStep('exam')}>
                  Back
                </Button>
                <Button fullWidth onClick={handleNext} disabled={!formData.targetScore}>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Complete */}
        {currentStep === 'complete' && (
          <Card className="max-w-lg mx-auto animate-scaleIn border-2 border-green-500">
            <CardContent className="text-center py-12 space-y-6">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto animate-bounce-sm">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Profile Created!</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Great! Your profile is ready. Let&apos;s get started with your prep.
                </p>
              </div>
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 space-y-2">
                <p className="text-sm"><strong>Name:</strong> {formData.name}</p>
                <p className="text-sm"><strong>Exam:</strong> {exams.find(e => e.id === formData.examType)?.label}</p>
                <p className="text-sm"><strong>Target:</strong> {formData.targetScore}</p>
              </div>
              <Button fullWidth size="lg" onClick={handleSubmit} loading={loading} className="mt-8">
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}
      </Container>
    </main>
  )
}
