'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Card, CardContent, CardHeader } from '@/components/card'
import { Badge } from '@/components/badge'
import { Check, Zap, ArrowRight, Shield, Trophy, Target, Monitor, ShieldAlert, BarChart3, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/button'

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
      name: 'JEE Mains 2026',
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
      id: 'JEE_ADVANCED',
      name: 'JEE Advanced 2026',
      originalPrice: '₹3499',
      price: '₹2499',
      description: '12 Full-Length Tests',
      features: [
        'Advanced Level Problems',
        'IIT Pattern Aligned',
        'Detailed Solutions & Analytics',
        'Rank Booster Series',
        'Remote Proctored',
        'AI Based Proctoring',
        'Secure & Cheat Proof',
        'Detailed Performance Analysis',
      ],
      popular: false,
      color: 'from-blue-500/20 to-blue-500/5',
      iconBg: 'bg-blue-800',
      iconLabel: '🚀',
    },
    {
      id: 'VITEEE',
      name: 'VITEEE 2026',
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
      name: 'BITSAT 2026',
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
      id: 'MANIPAL',
      name: 'Manipal 2026',
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
      color: 'from-pink-500/20 to-pink-500/5',
      iconBg: 'bg-pink-700',
      iconLabel: '�',
    },
    {
      id: 'NEET',
      name: 'NEET-UG 2026',
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
    sessionStorage.setItem('selectedExam', planId)
    router.push('/payment')
  }

  const handleOfferGet = () => {
    sessionStorage.setItem('selectedExam', 'OFFER_99')
    router.push('/payment')
  }

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">

      <Header showAuth={true} />

      <section className="pt-48 pb-32">
        <Container size="2xl">
          {/* Hero */}
          <div className="flex flex-col items-center text-center space-y-8 mb-16">
            <Badge variant="secondary" className="px-4 py-2 rounded-full text-sm font-semibold">
              Test Series 2026
            </Badge>
            <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tighter leading-tight">
              Prepare Smarter,<br />
              <span className="text-gradient">
                Score Higher!
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-medium">
              All test series are Remote Proctored — AI Based Proctoring, Secure & Cheat Proof, with Detailed Performance Analysis.
            </p>
          </div>

          {/* ₹99 Offer Banner */}
          <div className="mb-20 max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 dark:border-yellow-400/40 bg-gradient-to-br from-amber-500/5 via-amber-400/5 to-orange-500/5 dark:from-yellow-500/10 dark:via-yellow-400/5 dark:to-orange-500/10 p-1">
              <div className="rounded-[20px] bg-gradient-to-br from-amber-50 to-background dark:from-yellow-950/60 dark:to-background p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* Left: Offer text */}
                <div className="flex-1 text-center md:text-left space-y-3">
                  <p className="text-xs font-semibold tracking-wide uppercase text-amber-600 dark:text-yellow-400/80">Limited Time Offer</p>
                  <h2 className="text-4xl md:text-5xl font-display font-semibold italic tracking-tighter leading-none">
                    All Discounted Prices<br />
                    <span className="text-amber-600 dark:text-yellow-400">is just </span>
                    <span className="text-6xl md:text-8xl text-amber-600 dark:text-yellow-400">
                      ₹99
                    </span>
                    <span className="text-amber-600 dark:text-yellow-400 text-4xl">/-</span>
                  </h2>
                  <p className="text-muted-foreground font-bold text-sm md:text-base">
                    Top Exams. One Price. — 3 Month Test Series access for every plan.
                  </p>
                  <Button
                    onClick={handleOfferGet}
                    className="mt-2 h-14 px-10 rounded-2xl font-semibold uppercase tracking-wide bg-amber-500 hover:bg-amber-400 dark:bg-yellow-400 dark:hover:bg-yellow-300 text-black shadow-lg hover:shadow-xl transition-all"
                  >
                    GET THIS OFFER — ₹99
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                {/* Right: Countdown */}
                <div className="flex-shrink-0 text-center space-y-3">
                  <div className="flex items-center gap-2 justify-center text-amber-600/70 dark:text-yellow-400/70 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-semibold tracking-wide uppercase">Offer Ends In</span>
                  </div>
                  <div className="flex gap-3 p-2">
                    {[
                      { val: pad(countdown.days), label: 'Days' },
                      { val: pad(countdown.hours), label: 'Hours' },
                      { val: pad(countdown.minutes), label: 'Mins' },
                      { val: pad(countdown.seconds), label: 'Secs' },
                    ].map(({ val, label }) => (
                      <div key={label} className="flex flex-col items-center gap-1">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-amber-100 dark:bg-yellow-400/10 border border-amber-300 dark:border-yellow-400/30 flex items-center justify-center">
                          <span className="text-2xl md:text-3xl font-display font-semibold text-amber-700 dark:text-yellow-400 tabular-nums">
                            {val}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold tracking-wide uppercase text-amber-600/60 dark:text-yellow-400/60">{label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">3 Month Access</p>
                </div>
              </div>
            </div>
          </div>

          {/* Plans header */}
          <div className="flex items-center justify-center mb-12">
            <div className="h-px flex-1 bg-border-subtle" />
            <Badge variant="secondary" className="mx-6 px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-muted-foreground">
              All Test Series — Discounted Prices
            </Badge>
            <div className="h-px flex-1 bg-border-subtle" />
          </div>

          {/* Plan Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`h-full relative group hover:border-primary/30 transition-all duration-300 ${
                  plan.popular ? 'border-primary/50 shadow-lg' : 'border-border-subtle'
                }`}
              >

                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <Badge variant="default" className="px-4 py-1 font-semibold uppercase tracking-wide shadow-lg">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="p-10 pb-0 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-display font-semibold tracking-tighter uppercase">
                      {plan.name}
                    </h3>
                    <p className="text-muted-foreground font-medium text-sm">{plan.description}</p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-muted-foreground/50 line-through">{plan.originalPrice}</span>
                    <span className="text-6xl font-display font-semibold tracking-tighter">
                      {plan.price}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">/ Access</span>
                  </div>
                </CardHeader>

                <CardContent className="p-10 space-y-10">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm font-bold font-mono text-muted-foreground group-hover:text-foreground transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleGetStarted(plan.id)}
                    className={`w-full h-14 rounded-2xl font-semibold uppercase tracking-wide shadow-lg hover:shadow-xl transition-all ${plan.popular ? 'bg-primary text-primary-foreground' : 'border-2 border-primary/30 bg-transparent text-foreground'}`}
                  >
                    GET ACCESS
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom Feature Highlights */}
          <div className="mt-20 mb-8">
            <div className="rounded-2xl border border-border-subtle bg-card-bg-subtle p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Monitor, label: 'Chapterwise & Full Length Tests' },
                { icon: Target, label: 'Exam Pattern Aligned' },
                { icon: BarChart3, label: 'Detailed Solutions & Analytics' },
                { icon: Trophy, label: 'Rank Booster Series' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-card-bg-subtle mx-auto flex items-center justify-center text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide leading-tight">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-12 mb-8">
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-green-500" />
                <h3 className="text-2xl font-display font-semibold text-green-500">100% Money-Back Guarantee</h3>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Not satisfied with our test series? Get a full refund within 7 days of purchase. No questions asked.
              </p>
            </div>
          </div>

          {/* Security & Trust Benchmarks */}
          <div className="mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-6 rounded-2xl border border-border-subtle bg-card-bg-subtle">
              {[
                { icon: Shield, label: 'Secure Payment', val: 'AES-256' },
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
                  <div className="w-12 h-12 rounded-2xl bg-card-bg-subtle mx-auto flex items-center justify-center text-primary mb-4">
                    <b.icon className="w-6 h-6" />
                  </div>
                  <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">{b.label}</p>
                  <p className="text-xl font-display font-semibold">{b.val}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="mt-12">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Clock, title: '24/7 Access', desc: 'Take tests anytime, anywhere' },
                { icon: BarChart3, title: 'Detailed Analytics', desc: 'Track your progress with insights' },
                { icon: Target, title: 'PYQ Integration', desc: 'Practice with actual previous year questions' },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl border border-border-subtle bg-card-bg-subtle text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
