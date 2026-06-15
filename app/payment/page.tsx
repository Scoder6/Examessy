'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Card, CardContent } from '@/components/card'
import { Badge } from '@/components/badge'
import { Footer } from '@/components/footer'
import { AlertCircle, CheckCircle2, Lock, CreditCard, Sparkles } from 'lucide-react'
import { DramaticShield, DramaticZap, DramaticTarget, DramaticGlobe, DramaticLock, DramaticCreditCard, DramaticCheck } from '@/components/icons/dramatic-icons'
import { motion, AnimatePresence } from 'framer-motion'
import { DramaticReveal, DramaticCard, HoverSpotlight, GlitchText, MagneticButton, SparkButton, LiquidButton, ScrollingText, PulseBorder } from '@/components/dramatic/dramatic-effects'

declare global {
  interface Window { Razorpay: any }
}

const examData: Record<string, { name: string; icon: string; color: string; tagline: string }> = {
  JEE_MAINS:  { name: 'JEE Mains', icon: '🎯', color: 'from-indigo-500/80 to-indigo-600',   tagline: 'Engineering Sector Access' },
  NEET:       { name: 'NEET',      icon: '🧬', color: 'from-emerald-500/80 to-teal-600',    tagline: 'Medical Sector Access' },
  VIT:        { name: 'VIT',       icon: '🏆', color: 'from-violet-500/80 to-purple-600',   tagline: 'University Sector Access' },
  CBT:        { name: 'CBT',       icon: '📝', color: 'from-amber-500/80 to-orange-600',    tagline: 'Digital Sector Access' },
  OFFER_99:   { name: '₹99 Offer', icon: '⚡', color: 'from-amber-400/80 to-yellow-500',    tagline: 'All Exams Bundle Access' },
  BITSSAT:    { name: 'BITSSAT',   icon: '🔬', color: 'from-cyan-500/80 to-blue-600',       tagline: 'BITS Campus Access' },
  COMEDK:     { name: 'COMEDK',    icon: '🏛', color: 'from-orange-500/80 to-red-500',      tagline: 'Karnataka Sector Access' },
}

export default function PaymentPage() {
  const router = useRouter()
  const [selectedExam, setSelectedExam] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')

  useEffect(() => {
    let exam = sessionStorage.getItem('selectedExam')
    if (!exam) exam = 'JEE_MAINS'
    if (!Object.keys(examData).includes(exam)) { router.push('/'); return }
    setSelectedExam(exam)

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => { if (document.body.contains(script)) document.body.removeChild(script) }
  }, [router])

  const handlePayment = async () => {
    if (loading) return
    try {
      setLoading(true); setError(null); setStatus('processing')
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 99, currency: 'INR', examType: selectedExam }),
      })
      if (!response.ok) throw new Error('Failed to create order')
      const { orderId, key } = await response.json()

      const options = {
        key, amount: 99 * 100, currency: 'INR', name: 'Examessy',
        description: `${selectedExam} — Tactical Access`, order_id: orderId,
        handler: async (res: any) => {
          try {
            const v = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...res, examType: selectedExam }),
            })
            const data = await v.json()
            if (data.success) {
              setStatus('success')
              setTimeout(() => { sessionStorage.removeItem('selectedExam'); router.push('/profile-setup') }, 2000)
            } else throw new Error('Verification failed')
          } catch { setError('Payment verification failed.'); setStatus('error'); setLoading(false) }
        },
        theme: { color: '#818CF8' },
      }
      new window.Razorpay(options).open()
    } catch { setError('Failed to initiate payment.'); setStatus('error'); setLoading(false) }
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white opacity-[0.02] animate-grid-move" />
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-orb" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[120px] animate-orb" style={{ animationDelay: '-12s' }} />
      </div>

      <Header showAuth={false} />

      <div className="fixed top-20 left-0 right-0 z-30 overflow-hidden opacity-20 pointer-events-none">
        <ScrollingText
          texts={['SECURE CHECKOUT','AES-256 ENCRYPTED','RAZORPAY VERIFIED','INSTANT ACCESS','TACTICAL ADVANTAGE','₹99 ONLY']}
          speed={30}
          className="text-xs"
        />
      </div>

      <section className="relative pt-36 pb-20 min-h-screen flex items-center">
        <Container size="2xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <DramaticReveal direction="left" className="space-y-12">
              <div className="space-y-6">
                <Badge variant="glass" className="px-6 py-2 rounded-full border-primary/20 text-primary font-black tracking-widest uppercase italic">
                  Transaction Node
                </Badge>
                <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase italic leading-[0.85]">
                  Secure<br />
                  <span className="text-gradient">Your Access</span>
                </h1>
                <p className="text-lg text-muted-foreground/80 max-w-lg leading-relaxed">
                  Finalize your uplink to the Examessy Network. One-time payment for permanent tactical advantage.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { icon: DramaticShield, label: 'ENCRYPTED',  desc: 'AES-256 Bit Security',   color: '#34d399' },
                  { icon: DramaticZap,         label: 'INSTANT',    desc: 'Real-time Deployment',    color: '#818cf8' },
                  { icon: DramaticTarget,      label: 'PRECISION',  desc: '99.8% Data Accuracy',     color: '#fbbf24' },
                  { icon: DramaticGlobe,       label: 'GLOBAL',     desc: 'Unified Benchmarking',    color: '#f472b6' },
                ].map((item, i) => (
                  <DramaticReveal key={i} direction="left" delay={0.12 * i}>
                    <HoverSpotlight>
                      <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.03] transition-all">
                        <motion.div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                          style={{ background: item.color + '18', color: item.color }}
                          whileHover={{ scale: 1.15, rotate: -6 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <item.icon className="w-6 h-6" />
                        </motion.div>
                        <div>
                          <p className="text-[10px] font-black tracking-widest text-muted-foreground/50 uppercase">{item.label}</p>
                          <p className="text-sm font-bold">{item.desc}</p>
                        </div>
                      </div>
                    </HoverSpotlight>
                  </DramaticReveal>
                ))}
              </div>
            </DramaticReveal>

            {/* Right: payment terminal */}
            <DramaticReveal direction="right" delay={0.2}>
              <DramaticCard className="rounded-[28px]" glowColor="rgba(var(--primary-rgb),0.5)">
                <Card variant="glass" className="overflow-hidden border-white/5 rounded-[28px] shadow-2xl relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />

                  <div className="p-10 space-y-8 relative z-10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-black tracking-widest text-muted-foreground/50 uppercase italic">Access Token</p>
                        <h3 className="text-2xl font-display font-black italic">EXM-2026-TAC</h3>
                      </div>
                      <motion.div
                        className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"
                        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <Sparkles className="w-8 h-8" />
                      </motion.div>
                    </div>

                    <AnimatePresence mode="wait">
                      {status === 'success' ? (
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center space-y-6">
                          <PulseBorder className="rounded-full w-24 h-24 mx-auto" color="#34d399">
                            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center shadow-2xl shadow-green-500/30">
                              <CheckCircle2 className="w-12 h-12 text-green-500" />
                            </div>
                          </PulseBorder>
                          <h3 className="text-3xl font-display font-black italic uppercase tracking-tighter text-green-500">
                            Uplink Confirmed
                          </h3>
                          <p className="text-muted-foreground/70">Redirecting to Mission Control...</p>
                        </motion.div>
                      ) : (
                        <motion.div key="terminal" className="space-y-8">
                          {/* Exam display */}
                          <DramaticCard className="rounded-2xl" glowColor="rgba(var(--primary-rgb),0.3)">
                            <HoverSpotlight>
                              <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-between gap-4">
                                <div className="flex items-center gap-5">
                                  <motion.div
                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedExam ? examData[selectedExam]?.color : 'from-primary to-primary'} flex items-center justify-center text-2xl shadow-xl`}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    animate={{ boxShadow: ['0 0 0 0 rgba(var(--primary-rgb),0.3)', '0 0 12px 4px rgba(var(--primary-rgb),0.2)', '0 0 0 0 rgba(var(--primary-rgb),0.3)'] }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                  >
                                    {selectedExam && examData[selectedExam]?.icon}
                                  </motion.div>
                                  <div>
                                    <h4 className="font-display font-black text-xl uppercase italic tracking-tight">
                                      <GlitchText text={selectedExam ? examData[selectedExam]?.name : '—'} />
                                    </h4>
                                    <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">
                                      {selectedExam && examData[selectedExam]?.tagline}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="text-4xl font-display font-black italic tracking-tighter text-primary">₹99</p>
                                  <p className="text-[10px] text-muted-foreground/30 line-through font-black tracking-widest uppercase">₹999</p>
                                </div>
                              </div>
                            </HoverSpotlight>
                          </DramaticCard>

                          <AnimatePresence>
                            {error && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                className="p-5 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-start gap-4"
                              >
                                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                                <p className="text-sm font-bold text-destructive">{error}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <MagneticButton className="w-full">
                            <SparkButton className="w-full" onClick={handlePayment}>
                              <LiquidButton
                                onClick={handlePayment}
                                className="w-full h-20 text-xl font-black rounded-2xl uppercase tracking-[0.2em] bg-primary text-primary-foreground shadow-[0_8px_40px_rgba(var(--primary-rgb),0.4)] gradient-border"
                              >
                                {loading ? (
                                  <span className="flex items-center gap-3 justify-center">
                                    <motion.div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                                    Processing...
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-3 justify-center">
                                    Deploy Access — ₹99 <Lock className="w-5 h-5" />
                                  </span>
                                )}
                              </LiquidButton>
                            </SparkButton>
                          </MagneticButton>

                          <div className="flex items-center justify-center gap-6 text-[10px] font-black tracking-widest text-muted-foreground/40 uppercase">
                            <span className="flex items-center gap-2"><DramaticShield className="w-3 h-3" /> Encrypted</span>
                            <span className="flex items-center gap-2"><DramaticCreditCard className="w-3 h-3" /> Razorpay</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </DramaticCard>
            </DramaticReveal>
          </div>
        </Container>
      </section>
      <Footer />
    </main>
  )
}
