'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Card, CardContent } from '@/components/card'
import { Badge } from '@/components/badge'
import { Footer } from '@/components/footer'
import { AlertCircle, CheckCircle2, Sparkles, Shield, Zap, Target, Globe, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/button'

declare global {
  interface Window { Razorpay: any }
}

const examData: Record<string, { name: string; icon: string; color: string; tagline: string }> = {
  JEE_MAINS:     { name: 'JEE Mains',     icon: '🎯', color: 'from-indigo-500/80 to-indigo-600',   tagline: 'Engineering Sector Access' },
  JEE_ADVANCED:  { name: 'JEE Advanced',  icon: '🚀', color: 'from-blue-500/80 to-cyan-600',     tagline: 'Advanced Engineering Access' },
  NEET:          { name: 'NEET',          icon: '🧬', color: 'from-emerald-500/80 to-teal-600',    tagline: 'Medical Sector Access' },
  VIT:           { name: 'VIT',           icon: '🏆', color: 'from-violet-500/80 to-purple-600',   tagline: 'University Sector Access' },
  BITSAT:        { name: 'BITSAT',        icon: '⚡', color: 'from-orange-500/80 to-amber-600',    tagline: 'BITS Campus Access' },
  MANIPAL:       { name: 'Manipal',       icon: '🎓', color: 'from-pink-500/80 to-rose-600',      tagline: 'Manipal Campus Access' },
  OFFER_99:      { name: '₹99 Offer',     icon: '⚡', color: 'from-amber-400/80 to-yellow-500',    tagline: 'All Exams Bundle Access' },
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
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Header showAuth={false} />

      <section className="relative pt-36 pb-20 min-h-screen flex items-center">
        <Container size="2xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className="space-y-12">
              <div className="space-y-6">
                <Badge variant="secondary" className="px-4 py-2 rounded-full text-sm font-semibold">
                  Transaction Node
                </Badge>
                <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tighter leading-tight">
                  Secure<br />
                  <span className="text-gradient">Your Access</span>
                </h1>
                <p className="text-lg text-muted-foreground/80 max-w-lg leading-relaxed">
                  Finalize your uplink to the Examessy Network. One-time payment for permanent tactical advantage.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { icon: Shield, label: 'ENCRYPTED',  desc: 'AES-256 Bit Security',   color: '#34d399' },
                  { icon: Zap,         label: 'INSTANT',    desc: 'Real-time Deployment',    color: '#818cf8' },
                  { icon: Target,      label: 'PRECISION',  desc: '99.8% Data Accuracy',     color: '#fbbf24' },
                  { icon: Globe,       label: 'GLOBAL',     desc: 'Unified Benchmarking',    color: '#f472b6' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.03] transition-all">
                    <motion.div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: item.color + '18', color: item.color }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <item.icon className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-wide text-muted-foreground/50 uppercase">{item.label}</p>
                      <p className="text-sm font-semibold">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: payment terminal */}
            <div>
              <Card className="overflow-hidden border border-white/5 rounded-3xl shadow-2xl relative bg-white/[0.01]">

                <CardContent className="p-10 space-y-8 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-semibold tracking-wide text-muted-foreground/50 uppercase">Access Token</p>
                      <h3 className="text-2xl font-display font-semibold">EXM-2026-TAC</h3>
                    </div>
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"
                    >
                      <Sparkles className="w-8 h-8" />
                    </motion.div>
                  </div>

                  <AnimatePresence mode="wait">
                    {status === 'success' ? (
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center space-y-6">
                        <div className="w-24 h-24 mx-auto rounded-full bg-green-500/20 flex items-center justify-center shadow-2xl shadow-green-500/30">
                          <CheckCircle2 className="w-12 h-12 text-green-500" />
                        </div>
                        <h3 className="text-3xl font-display font-semibold uppercase tracking-tighter text-green-500">
                          Uplink Confirmed
                        </h3>
                        <p className="text-muted-foreground/70">Redirecting to Mission Control...</p>
                      </motion.div>
                    ) : (
                      <motion.div key="terminal" className="space-y-8">
                        {/* Exam display */}
                        <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-between gap-4">
                          <div className="flex items-center gap-5">
                            <motion.div
                              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedExam ? examData[selectedExam]?.color : 'from-primary to-primary'} flex items-center justify-center text-2xl shadow-lg`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {selectedExam && examData[selectedExam]?.icon}
                            </motion.div>
                            <div>
                              <h4 className="font-display font-semibold text-xl uppercase tracking-tight">
                                {selectedExam ? examData[selectedExam]?.name : '—'}
                              </h4>
                              <p className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wide">
                                {selectedExam && examData[selectedExam]?.tagline}
                              </p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-4xl font-display font-semibold tracking-tighter text-primary">₹99</p>
                            <p className="text-[10px] text-muted-foreground/30 line-through font-semibold tracking-wide uppercase">₹999</p>
                          </div>
                        </div>

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

                        <Button
                          onClick={handlePayment}
                          disabled={loading}
                          className="w-full h-14 text-lg font-semibold rounded-2xl uppercase tracking-wide bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                        >
                          {loading ? (
                            <span className="flex items-center gap-3 justify-center">
                              <motion.div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, ease: 'linear' }} />
                              Processing...
                            </span>
                          ) : (
                            <span className="flex items-center gap-3 justify-center">
                              Deploy Access — ₹99 <Shield className="w-5 h-5" />
                            </span>
                          )}
                        </Button>

                        <div className="flex items-center justify-center gap-6 text-[10px] font-semibold tracking-wide text-muted-foreground/40 uppercase">
                          <span className="flex items-center gap-2"><Shield className="w-3 h-3" /> Encrypted</span>
                          <span className="flex items-center gap-2"><Check className="w-3 h-3" /> Razorpay</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </main>
  )
}
