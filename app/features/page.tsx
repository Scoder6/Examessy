'use client'

import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Card, CardContent } from '@/components/card'
import { Badge } from '@/components/badge'
import { Footer } from '@/components/footer'
import { Zap, BarChart3, Users, Brain, Shield, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/button'

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
      icon: Shield,
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
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Header showAuth={true} />

      {/* Hero Section */}
      <section className="pt-48 pb-24 relative">
        <Container size="2xl">
          <div className="flex flex-col items-center text-center space-y-8 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge variant="secondary" className="px-4 py-2 rounded-full text-sm font-semibold">
                Platform Intelligence
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-display font-semibold tracking-tighter uppercase leading-tight pb-4"
            >
              The{' '}
              <span className="text-gradient pr-4">
                Ultimate
              </span>{' '}
              <br />Arsenal
            </motion.h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-medium opacity-80">
              Discover the high-end technology engineered to give you the ultimate edge in your preparation.
            </p>
          </div>

          {/* Detailed Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="h-full group hover:bg-white/5 transition-all duration-700 border border-white/5 hover:border-primary/30 overflow-hidden relative bg-white/[0.01]">
                  <CardContent className="p-10 flex flex-col gap-10 h-full relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-display font-semibold tracking-tight uppercase group-hover:text-primary transition-colors">
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
          <Card className="p-12 md:p-24 overflow-hidden relative border border-white/5 bg-white/[0.01]">
            <div className="absolute inset-0 bg-primary/5 -z-10" />
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <Badge variant="outline" className="text-xs font-semibold tracking-wide uppercase">System Core</Badge>
                <h2 className="text-5xl md:text-7xl font-display font-semibold tracking-tighter uppercase">
                  Mission <br /><span className="text-gradient">Control</span>
                </h2>
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
                      <motion.li
                        key={i}
                        className="flex items-center gap-3 text-foreground font-bold font-mono text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        whileHover={{ x: 6 }}
                      >
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-primary"
                        />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                  <Button className="h-14 px-10 rounded-2xl font-semibold uppercase tracking-wide bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all">
                    Explore Platform
                  </Button>
                </div>
                <div className="relative aspect-square bg-white/5 rounded-[40px] border border-white/10 overflow-hidden shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="w-full h-full bg-white/[0.02] rounded-[32px] border border-primary/20 flex flex-col items-center justify-center space-y-8">
                      <div className="w-24 h-24 rounded-full border-4 border-dashed border-primary/30" />
                      <p className="text-2xl font-display font-semibold tracking-wide text-primary">PROCESSING DATA...</p>
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
