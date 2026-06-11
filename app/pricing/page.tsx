'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Button } from '@/components/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/card'
import { Badge } from '@/components/badge'
import { CheckCircle2, Zap, ArrowRight, ShieldCheck, Trophy, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function Pricing() {
  const router = useRouter()
  const plans = [
    {
      id: 'STARTER',
      name: 'Starter',
      price: '₹99',
      description: 'Perfect for getting started',
      features: [
        '1 Exam Test Series',
        'Basic Analytics',
        '7 Days Access',
        'Email Support',
      ],
      popular: false,
      color: 'from-primary/20 to-primary/5'
    },
    {
      id: 'PRO',
      name: 'Pro',
      price: '₹299',
      description: 'Most popular choice',
      features: [
        'All Exam Test Series',
        'Advanced Analytics',
        '30 Days Access',
        'Priority Support',
        'Performance Reports',
        'Mock Interviews',
      ],
      popular: true,
      color: 'from-primary/40 to-primary/10'
    },
    {
      id: 'ENTERPRISE',
      name: 'Enterprise',
      price: '₹999',
      description: 'For serious aspirants',
      features: [
        'Unlimited Test Series',
        'AI-Powered Analytics',
        '90 Days Access',
        '24/7 Support',
        'Doubt Clearing Sessions',
        'Personal Mentorship',
        'Career Guidance',
      ],
      popular: false,
      color: 'from-foreground/20 to-foreground/5'
    },
  ]

  const handleGetStarted = (planId: string) => {
    // For now, we point to the primary payment sequence
    sessionStorage.setItem('selectedPlan', planId)
    router.push('/payment')
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      {/* 2026 Background Engine */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white opacity-[0.02] animate-grid-move" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] animate-orb" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] animate-orb" style={{ animationDelay: '-10s' }} />
      </div>

      <Header showAuth={true} />
      
      <section className="pt-48 pb-32">
        <Container size="2xl">
          <div className="flex flex-col items-center text-center space-y-8 mb-24">
            <Badge variant="glass" className="px-6 py-2 rounded-full border-primary/20 text-primary font-black tracking-widest uppercase italic">
              Deployment Plans
            </Badge>
            <h1 className="text-7xl md:text-9xl font-display font-black tracking-tighter uppercase italic leading-[0.85] pb-4">
              Tactical <br /><span className="text-gradient pr-4">Investment</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-clean font-medium opacity-80">
              Select your level of engagement with the network. All plans include tactical analytics as standard.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
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
                    <div className="flex items-baseline gap-1">
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
                      INITIALIZE ACCESS
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Security & Trust Benchmarks */}
          <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8">
             {[
               { icon: ShieldCheck, label: 'Secure Payment', val: 'AES-256' },
               { icon: Trophy, label: 'Success Rate', val: '94.2%' },
               { icon: Target, label: 'Accuracy', val: '99.8%' },
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
