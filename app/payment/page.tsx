'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Card, CardContent } from '@/components/card'
import { Button } from '@/components/button'
import { Badge } from '@/components/badge'
import { Footer } from '@/components/footer'
import { AlertCircle, CheckCircle2, Lock, ShieldCheck, ArrowLeft, CreditCard, Sparkles, Zap, BarChart3, Trophy, Globe, Target } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function PaymentPage() {
  const router = useRouter()
  const [selectedExam, setSelectedExam] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')

  const examData: Record<string, { name: string; icon: string; color: string; tagline: string }> = {
    JEE_MAINS: { name: 'JEE Mains', icon: '🎯', color: 'from-primary/80 to-primary', tagline: 'Engineering Sector Access' },
    NEET: { name: 'NEET', icon: '🧬', color: 'from-foreground/80 to-foreground', tagline: 'Medical Sector Access' },
    VIT: { name: 'VIT', icon: '🏆', color: 'from-primary/60 to-primary', tagline: 'University Sector Access' },
    CBT: { name: 'CBT', icon: '📝', color: 'from-foreground/60 to-foreground', tagline: 'Digital Sector Access' },
  }

  useEffect(() => {
    let exam = sessionStorage.getItem('selectedExam')
    if (!exam) exam = 'JEE_MAINS'
    
    if (!exam || !Object.keys(examData).includes(exam)) {
      router.push('/')
      return
    }
    
    setSelectedExam(exam)

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script)
    }
  }, [router])

  const handlePayment = async () => {
    try {
      setLoading(true)
      setError(null)
      setStatus('processing')

      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 99,
          currency: 'INR',
          examType: selectedExam,
        }),
      })

      if (!response.ok) throw new Error('Failed to create order')
      const { orderId, key } = await response.json()

      const options = {
        key,
        amount: 99 * 100,
        currency: 'INR',
        name: 'Examessy',
        description: `${selectedExam} - Tactical Access`,
        order_id: orderId,
        handler: async (response: any) => {
          try {
            const verifyResponse = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                examType: selectedExam,
              }),
            })

            const verifyData = await verifyResponse.json()
            if (verifyData.success) {
              setStatus('success')
              setTimeout(() => {
                sessionStorage.removeItem('selectedExam')
                router.push('/profile-setup')
              }, 2000)
            } else {
              throw new Error('Verification Error: Integrity Check Failed')
            }
          } catch (err) {
            setError('Payment verification failed. Please contact support.')
            setStatus('error')
            setLoading(false)
          }
        },
        theme: { color: '#0EA5E9' },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (err) {
      setError('Failed to initiate secure payment protocol.')
      setStatus('error')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      {/* 2026 Background Engine */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white opacity-[0.02] animate-grid-move" />
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-orb" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[120px] animate-orb" style={{ animationDelay: '-12s' }} />
      </div>

      <Header showAuth={false} />

      <section className="relative pt-32 pb-20 min-h-screen flex items-center">
        <Container size="2xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Intel Side */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <Badge variant="glass" className="px-6 py-2 rounded-full border-primary/20 text-primary font-black tracking-widest uppercase italic">
                  Transaction Node
                </Badge>
                <h1 className="text-7xl md:text-9xl font-display font-black tracking-tighter uppercase italic leading-[0.85]">
                  Secure <br /><span className="text-gradient">Your Access</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-clean font-medium opacity-80 max-w-xl">
                  Finalize your uplink to the Examessy Network. One-time payment for permanent tactical advantage.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: ShieldCheck, label: 'ENCRYPTED', desc: 'AES-256 Bit Security' },
                  { icon: Zap, label: 'INSTANT', desc: 'Real-time Deployment' },
                  { icon: Target, label: 'PRECISION', desc: '99.8% Data Accuracy' },
                  { icon: Globe, label: 'GLOBAL', desc: 'Unified Benchmarking' },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">{item.label}</p>
                      <p className="text-sm font-bold">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/5 flex items-center gap-8 grayscale opacity-40">
                <Lock className="w-8 h-8" />
                <CreditCard className="w-8 h-8" />
                <ShieldCheck className="w-8 h-8" />
                <Globe className="w-8 h-8" />
              </div>
            </motion.div>

            {/* Payment Terminal Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="glass" className="overflow-hidden border-white/5 shadow-2xl relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
                
                <div className="p-10 space-y-10 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase italic">Access Token</p>
                      <h3 className="text-2xl font-display font-black italic">EXM-2026-TAC</h3>
                    </div>
                    <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-primary">
                      <Sparkles className="w-8 h-8" />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {status === 'success' ? (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="py-12 text-center space-y-6"
                      >
                        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto shadow-2xl shadow-green-500/20">
                          <CheckCircle2 className="w-12 h-12 text-green-500" />
                        </div>
                        <h3 className="text-3xl font-display font-black italic uppercase tracking-tighter">Uplink Confirmed</h3>
                        <p className="text-muted-foreground font-medium">Redirecting to Mission Control...</p>
                      </motion.div>
                    ) : (
                      <motion.div key="terminal" className="space-y-10">
                        {/* Exam Intelligence */}
                        <div className="p-8 glass rounded-3xl border-white/10 flex items-center justify-between group hover:bg-white/5 transition-all">
                          <div className="flex items-center gap-6">
                            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${selectedExam ? examData[selectedExam]?.color : ''} flex items-center justify-center text-3xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                              {selectedExam && examData[selectedExam]?.icon}
                            </div>
                            <div>
                              <h4 className="font-display font-black text-2xl uppercase italic tracking-tighter">{selectedExam && examData[selectedExam]?.name}</h4>
                              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-60">{selectedExam && examData[selectedExam]?.tagline}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-4xl font-display font-black italic tracking-tighter">₹99</p>
                            <p className="text-[10px] text-muted-foreground line-through font-black tracking-widest uppercase opacity-40">₹999 SRP</p>
                          </div>
                        </div>

                        {/* Error Node */}
                        <AnimatePresence>
                          {error && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="p-5 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-start gap-4"
                            >
                              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                              <p className="text-sm font-bold text-destructive leading-tight">{error}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Tactical Action */}
                        <div className="space-y-6">
                          <Button 
                            fullWidth 
                            size="xl" 
                            variant="default" 
                            onClick={handlePayment}
                            loading={loading}
                            className="h-24 text-2xl font-black rounded-3xl uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-transform"
                          >
                            DEPLOY ACCESS - ₹99
                          </Button>
                          <div className="flex items-center justify-center gap-8 text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase italic opacity-50">
                            <span className="flex items-center gap-2">
                              <ShieldCheck className="w-3 h-3" /> Encrypted
                            </span>
                            <span className="flex items-center gap-2">
                              <CreditCard className="w-3 h-3" /> Razorpay
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
