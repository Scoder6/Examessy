'use client'

import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Card, CardContent } from '@/components/card'
import { Badge } from '@/components/badge'
import { Footer } from '@/components/footer'
import { MouseSpotlight } from '@/components/mouse-spotlight'
import { ScrollProgress } from '@/components/scroll-progress'
import { Zap, BarChart3, Users, Rocket, ShieldCheck, Globe, Trophy, Sparkles, Target, Activity, Brain, Layout, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FeaturesPage() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Performance',
      description: 'Built on a high-speed infrastructure that ensures instant test loading and zero-latency interactions.',
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Get deep insights into your preparation with AI-powered performance tracking and weakness analysis.',
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      icon: Users,
      title: 'Peer Comparison',
      description: 'See where you stand globally. Real-time ranking and percentile calculation against thousands of aspirants.',
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      icon: Brain,
      title: 'Adaptive Learning',
      description: 'Our system learns from your mistakes and tailors the test difficulty to push your limits.',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Materials',
      description: 'Every question is verified by subject matter experts to match the latest exam patterns.',
      color: 'text-orange-500',
      bg: 'bg-orange-500/10'
    },
    {
      icon: Lock,
      title: 'Secure Environment',
      description: 'State-of-the-art proctoring and secure testing environment to simulate real exam conditions.',
      color: 'text-red-500',
      bg: 'bg-red-500/10'
    }
  ]

  return (
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      <MouseSpotlight />
      <ScrollProgress />
      
      {/* Dynamic Moving Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white opacity-[0.02] animate-grid-move" />
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.05]" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] animate-orb" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] animate-orb" style={{ animationDelay: '-10s' }} />
      </div>

      <Header showAuth={true} />

      {/* Hero Section */}
      <section className="pt-48 pb-24 relative">
        <Container size="2xl">
          <div className="flex flex-col items-center text-center space-y-8 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge variant="glass" className="px-6 py-2 rounded-full border-primary/20 text-primary font-black tracking-widest uppercase italic">
                Platform Intelligence
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl md:text-9xl font-display font-black tracking-tighter uppercase italic leading-[0.85] pb-4"
            >
              The <span className="text-gradient pr-4">Ultimate</span> <br />Arsenal
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-clean font-medium opacity-80"
            >
              Discover the high-end technology engineered to give you the ultimate edge in your preparation.
            </motion.p>
          </div>

          {/* Detailed Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="glass" className="h-full group hover:bg-white/5 transition-all duration-700 border-white/5 hover:border-primary/30 overflow-hidden relative p-1">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${feature.bg} blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  <CardContent className="p-10 flex flex-col gap-10 h-full relative z-10">
                    <div className={`w-16 h-16 rounded-2xl glass flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-black/20`}>
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-display font-black tracking-tight uppercase italic group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Tech Stack Visual Section */}
      <section className="py-32 relative">
        <Container size="2xl">
          <Card variant="glass" className="p-12 md:p-24 overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/5 -z-10" />
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <Badge variant="outline" className="text-xs font-black tracking-widest uppercase">System Core</Badge>
                <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase italic">Mission <br /><span className="text-gradient">Control</span></h2>
                <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                  Our dashboard isn't just a screen; it's your tactical advantage. Real-time data processing, visual heatmaps, and adaptive scheduling all working in sync.
                </p>
                <ul className="space-y-4">
                  {[
                    'Sub-second latency on data updates',
                    'Military-grade data encryption',
                    'Cloud-native architecture for 100% uptime',
                    'AI-driven predictive analytics'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground font-bold font-mono text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-square glass rounded-[40px] border-white/10 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-mesh opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                   <div className="w-full h-full glass-card rounded-[32px] border-primary/20 flex flex-col items-center justify-center space-y-8">
                      <div className="w-24 h-24 rounded-full border-4 border-dashed border-primary/30 animate-spin" style={{ animationDuration: '10s' }} />
                      <p className="text-2xl font-display font-black italic tracking-widest text-primary">PROCESSING DATA...</p>
                   </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
