'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Button } from '@/components/button'
import { Card, CardContent, CardHeader } from '@/components/card'
import { Badge } from '@/components/badge'
import { CheckCircle2, Zap, ArrowRight, ShieldCheck, Trophy, Target, Monitor, ShieldAlert, BarChart3, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// 3-month countdown target: 90 days from now (set once at module level)
const OFFER_END = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now())
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    return { days, hours, minutes, seconds }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Pricing() {
  const router = useRouter()
  const countdown = useCountdown(OFFER_END)

  const plans = [
    {
      id: 'JEE_MAINS',
      name: 'JEE Mains 2027',
      originalPrice: '₹2499',
      price: '₹1999',
      description: '15 Full-Length Tests',
      features: [
        'Chapterwise & Full Length Tests',
        'Exam Pattern Aligned',
        'Detailed Solutions & Analytics',
        'Rank Booster Series',
        'Remote Proctored',
        'AI Based Proctoring',
        'Secure & Cheat Proof',
        'Detailed Performance Analysis',
      ],
      popular: true,
      color: 'from-primary/40 to-primary/10',
      iconBg: 'bg-slate-700',
      iconLabel: '🎓',
    },
    {
      id: 'VITEEE',
      name: 'VITEEE 2027',
      originalPrice: '₹1999',
      price: '₹999',
      description: '10 Full-Length Tests',
      features: [
        'Chapterwise & Full Length Tests',
        'Exam Pattern Aligned',
        'Detailed Solutions & Analytics',
        'Rank Booster Series',
        'Remote Proctored',
        'AI Based Proctoring',
        'Secure & Cheat Proof',
        'Detailed Performance Analysis',
      ],
      popular: false,
      color: 'from-purple-500/20 to-purple-500/5',
      iconBg: 'bg-purple-700',
      iconLabel: 'VIT',
    },
    {
      id: 'BITSSAT',
      name: 'BITSSAT 2027',
      originalPrice: '₹2499',
      price: '₹1999',
      description: '12 Full-Length Tests',
      features: [
        'Chapterwise & Full Length Tests',
        'Exam Pattern Aligned',
        'Detailed Solutions & Analytics',
        'Rank Booster Series',
        'Remote Proctored',
        'AI Based Proctoring',
        'Secure & Cheat Proof',
        'Detailed Performance Analysis',
      ],
      popular: false,
      color: 'from-cyan-500/20 to-cyan-500/5',
      iconBg: 'bg-blue-700',
      iconLabel: 'BITS',
    },
    {
      id: 'COMEDK',
      name: 'COMEDK-K 2027',
      originalPrice: '₹2499',
      price: '₹1499',
      description: '10 Full-Length Tests',
      features: [
        'Chapterwise & Full Length Tests',
        'Exam Pattern Aligned',
        'Detailed Solutions & Analytics',
        'Rank Booster Series',
        'Remote Proctored',
        'AI Based Proctoring',
        'Secure & Cheat Proof',
        'Detailed Performance Analysis',
      ],
      popular: false,
      color: 'from-orange-500/20 to-orange-500/5',
      iconBg: 'bg-orange-700',
      iconLabel: '🏛',
    },
    {
      id: 'NEET',
      name: 'NEET-UG 2027',
      originalPrice: '₹7999',
      price: '₹4999',
      description: 'Unlimited Tests',
      features: [
        'Unlimited Test Series',
        'Chapterwise & Full Length Tests',
        'Exam Pattern Aligned',
        'Detailed Solutions & Analytics',
        'Rank Booster Series',
        'Remote Proctored',
        'AI Based Proctoring',
        'Secure & Cheat Proof',
      ],
      popular: false,
      color: 'from-rose-500/20 to-rose-500/5',
      iconBg: 'bg-green-700',
      iconLabel: '⚕',
    },
  ]

  const handleGetStarted = (planId: string) => {
    sessionStorage.setItem('selectedPlan', planId)
    router.push('/payment')
  }

  const handleOfferGet = () => {
    sessionStorage.setItem('selectedPlan', 'OFFER_99')
    router.push('/payment')
  }

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      {/* Background Engine */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white opacity-[0.02] animate-grid-move" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] animate-orb" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] animate-orb" style={{ animationDelay: '-10s' }} />
      </div>

      <Header showAuth={true} />

      <section className="pt-48 pb-32">
        <Container size="2xl">
          {/* Hero */}
          <div className="flex flex-col items-center text-center space-y-8 mb-16">
            <Badge variant="glass" className="px-6 py-2 rounded-full border-primary/20 text-primary font-black tracking-widest uppercase italic">
              Test Series 2027
            </Badge>
            <h1 className="text-7xl md:text-9xl font-display font-black tracking-tighter uppercase italic leading-[0.85] pb-4">
              Prepare Smarter,<br /><span className="text-gradient pr-4">Score Higher!</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-clean font-medium opacity-80">
              All test series are Remote Proctored — AI Based Proctoring, Secure & Cheat Proof, with Detailed Performance Analysis.
            </p>
          </div>

          {/* ₹99 Offer Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-20 max-w-4xl mx-auto"
          >
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 dark:border-yellow-400/40 bg-gradient-to-br from-amber-500/5 via-amber-400/5 to-orange-500/5 dark:from-yellow-500/10 dark:via-yellow-400/5 dark:to-orange-500/10 p-1">
              <div className="rounded-[20px] bg-gradient-to-br from-amber-50 to-background dark:from-yellow-950/60 dark:to-background p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* Left: Offer text */}
                <div className="flex-1 text-center md:text-left space-y-3">
                  <p className="text-xs font-black tracking-[0.3em] uppercase text-amber-600 dark:text-yellow-400/80">Limited Time Offer</p>
                  <h2 className="text-4xl md:text-5xl font-display font-black italic tracking-tighter leading-none">
                    All Discounted Prices<br />
                    <span className="text-amber-600 dark:text-yellow-400">is just </span>
                    <span className="text-6xl md:text-8xl text-amber-600 dark:text-yellow-400">₹99</span>
                    <span className="text-amber-600 dark:text-yellow-400 text-4xl">/-</span>
                  </h2>
                  <p className="text-muted-foreground font-bold text-sm md:text-base">
                    Top Exams. One Price. — 3 Month Test Series access for every plan.
                  </p>
                  <Button
                    onClick={handleOfferGet}
                    className="mt-2 h-14 px-10 rounded-2xl font-black uppercase tracking-widest bg-amber-500 hover:bg-amber-400 dark:bg-yellow-400 dark:hover:bg-yellow-300 text-black shadow-[0_8px_32px_rgba(245,158,11,0.4)] dark:shadow-[0_8px_32px_rgba(234,179,8,0.4)] hover:shadow-[0_8px_40px_rgba(245,158,11,0.6)] dark:hover:shadow-[0_8px_40px_rgba(234,179,8,0.6)] transition-all"
                  >
                    GET THIS OFFER — ₹99
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                {/* Right: Countdown */}
                <div className="flex-shrink-0 text-center space-y-3">
                  <div className="flex items-center gap-2 justify-center text-amber-600/70 dark:text-yellow-400/70 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-black tracking-widest uppercase">Offer Ends In</span>
                  </div>
                  <div className="flex gap-3">
                    {[
                      { val: pad(countdown.days), label: 'Days' },
                      { val: pad(countdown.hours), label: 'Hours' },
                      { val: pad(countdown.minutes), label: 'Mins' },
                      { val: pad(countdown.seconds), label: 'Secs' },
                    ].map(({ val, label }) => (
                      <div key={label} className="flex flex-col items-center gap-1">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-amber-100 dark:bg-yellow-400/10 border border-amber-300 dark:border-yellow-400/30 flex items-center justify-center">
                          <span className="text-2xl md:text-3xl font-display font-black text-amber-700 dark:text-yellow-400 tabular-nums">
                            {val}
                          </span>
                        </div>
                        <span className="text-[10px] font-black tracking-widest uppercase text-amber-600/60 dark:text-yellow-400/60">{label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">3 Month Access</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Plans header */}
          <div className="flex items-center justify-center mb-12">
            <div className="h-px flex-1 bg-white/5" />
            <Badge variant="glass" className="mx-6 px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase text-muted-foreground">
              All Test Series — Discounted Prices
            </Badge>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          {/* Plan Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  variant="glass"
                  className={`h-full relative group hover:border-primary/30 transition-all duration-700 overflow-hidden ${
                    plan.popular ? 'border-primary/50 shadow-[0_32px_64px_rgba(var(--primary),0.2)]' : 'border-white/5'
                  }`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${plan.color} blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity`} />

                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                      <Badge variant="default" className="px-4 py-1 font-black uppercase italic tracking-widest shadow-lg">Most Popular</Badge>
                    </div>
                  )}

                  <CardHeader className="p-10 pb-0 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-display font-black tracking-tighter uppercase italic">{plan.name}</h3>
                      <p className="text-muted-foreground font-medium text-sm">{plan.description}</p>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-bold text-muted-foreground/50 line-through">{plan.originalPrice}</span>
                      <span className="text-6xl font-display font-black italic tracking-tighter">{plan.price}</span>
                      <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">/ Access</span>
                    </div>
                  </CardHeader>

                  <CardContent className="p-10 space-y-10">
                    <ul className="space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-sm font-bold font-mono text-muted-foreground group-hover:text-foreground transition-colors">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      fullWidth
                      className="h-20 rounded-2xl font-black uppercase tracking-widest shadow-xl group-hover:scale-[1.02] transition-transform"
                      variant={plan.popular ? 'default' : 'outline'}
                      onClick={() => handleGetStarted(plan.id)}
                    >
                      GET ACCESS
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Bottom Feature Highlights */}
          <div className="mt-20 mb-8">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Monitor, label: 'Chapterwise & Full Length Tests' },
                { icon: Target, label: 'Exam Pattern Aligned' },
                { icon: BarChart3, label: 'Detailed Solutions & Analytics' },
                { icon: Trophy, label: 'Rank Booster Series' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-2xl glass mx-auto flex items-center justify-center text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-black text-muted-foreground uppercase tracking-wide leading-tight">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Trust Benchmarks */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, label: 'Secure Payment', val: 'AES-256' },
              { icon: Trophy, label: 'Success Rate', val: '94.2%' },
              { icon: ShieldAlert, label: 'Cheat Proof', val: 'AI Proctor' },
              { icon: Zap, label: 'Uplink Speed', val: 'Sub-second' },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-2"
              >
                <div className="w-12 h-12 rounded-2xl glass mx-auto flex items-center justify-center text-primary mb-4">
                  <b.icon className="w-6 h-6" />
                </div>
                <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">{b.label}</p>
                <p className="text-xl font-display font-black italic">{b.val}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}