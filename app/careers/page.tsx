'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Badge } from '@/components/badge'
import { MapPin, DollarSign, Clock, ArrowRight, Users, Heart } from 'lucide-react'
import { DramaticRocket, DramaticZap } from '@/components/icons/dramatic-icons'
import { motion } from 'framer-motion'
import { DramaticReveal, DramaticCard, HoverSpotlight, GlitchText, MagneticButton, SparkButton, LiquidButton, StaggerGrid, ScrollingText, WordReveal, PulseBorder } from '@/components/dramatic/dramatic-effects'

const openings = [
  { title: 'Senior Frontend Developer', department: 'Engineering', location: 'Remote', type: 'Full-time', salary: '₹20-30 LPA', description: 'Lead web development initiatives and build amazing user experiences.', color: '#818cf8' },
  { title: 'Backend Engineer', department: 'Engineering', location: 'Bangalore', type: 'Full-time', salary: '₹18-25 LPA', description: 'Build scalable systems and APIs that power our exam preparation platform.', color: '#34d399' },
  { title: 'Content Creator — Physics', department: 'Content', location: 'Remote', type: 'Full-time', salary: '₹12-18 LPA', description: 'Create high-quality physics content for JEE and NEET preparation.', color: '#fbbf24' },
  { title: 'Product Manager', department: 'Product', location: 'Bangalore', type: 'Full-time', salary: '₹25-35 LPA', description: 'Drive product strategy and deliver exceptional student experiences.', color: '#f472b6' },
  { title: 'Marketing Manager', department: 'Marketing', location: 'Remote', type: 'Full-time', salary: '₹15-22 LPA', description: 'Lead marketing initiatives and help us reach more students across India.', color: '#22d3ee' },
  { title: 'Customer Success Manager', department: 'Customer Success', location: 'Remote', type: 'Full-time', salary: '₹10-15 LPA', description: 'Ensure our students have the best experience on their prep journey.', color: '#a78bfa' },
]

const benefits = [
  { icon: DollarSign, title: 'Competitive Salary', description: 'Industry-leading compensation with regular reviews', color: '#34d399' },
  { icon: Clock, title: 'Flexible Work', description: 'Remote-first culture with flexible working hours', color: '#818cf8' },
  { icon: Users, title: 'Great Team', description: 'Work with passionate and talented people', color: '#fbbf24' },
  { icon: DramaticRocket, title: 'Growth Path', description: 'Clear career path and learning opportunities', color: '#f472b6' },
  { icon: Heart, title: 'Health Benefits', description: 'Comprehensive health insurance for you and family', color: '#22d3ee' },
  { icon: MapPin, title: 'Work From Anywhere', description: 'Home or our Bangalore office — your choice', color: '#a78bfa' },
]

export default function Careers() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-grid-white opacity-[0.02] animate-grid-move" />
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] animate-orb" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] animate-orb" style={{ animationDelay: '-10s' }} />
      </div>

      <Header showAuth={true} />

      <section className="pt-48 pb-32 relative">
        <Container size="2xl">

          {/* Hero */}
          <DramaticReveal direction="up" className="text-center mb-6 space-y-5">
            <Badge variant="glass" className="px-6 py-2 rounded-full border-secondary/20 text-secondary font-black tracking-widest uppercase">
              <DramaticZap className="w-3.5 h-3.5 mr-2 inline" /> Careers
            </Badge>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter leading-[0.85]">
              Join Our<br />
              <span className="text-primary">Team</span>
            </h1>
            <WordReveal
              text="Build the future of education with us. We're looking for passionate individuals who want to make a difference in students' lives."
              className="text-xl text-muted-foreground/70 max-w-2xl mx-auto"
            />
          </DramaticReveal>

          <ScrollingText
            texts={['Engineering','Product','Design','Marketing','Content','Operations','Customer Success','Remote-First']}
            speed={40}
            className="mb-16 opacity-40"
          />

          {/* Benefits */}
          <DramaticReveal direction="up" className="mb-6">
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tighter text-center mb-10">
              Why Work With Us
            </h2>
          </DramaticReveal>

          <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {benefits.map((benefit) => (
              <DramaticCard key={benefit.title} className="rounded-3xl" glowColor={benefit.color + '55'}>
                <HoverSpotlight>
                  <div className="p-8 rounded-3xl border border-white/[0.05] bg-white/[0.01] h-full">
                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                      style={{ background: benefit.color + '18', color: benefit.color }}
                      whileHover={{ scale: 1.2, rotate: -8 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <benefit.icon className="w-7 h-7" />
                    </motion.div>
                    <h3 className="text-lg font-black font-display tracking-tight mb-2">
                      <GlitchText text={benefit.title} />
                    </h3>
                    <p className="text-sm text-muted-foreground/70">{benefit.description}</p>
                  </div>
                </HoverSpotlight>
              </DramaticCard>
            ))}
          </StaggerGrid>

          {/* Open positions */}
          <DramaticReveal direction="left" className="mb-10">
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter">
              Open <span className="text-primary">Positions</span>
            </h2>
          </DramaticReveal>

          <div className="space-y-4 mb-20">
            {openings.map((job, i) => (
              <DramaticReveal key={job.title} direction="right" delay={i * 0.07}>
                <DramaticCard className="rounded-2xl" glowColor={job.color + '44'}>
                  <HoverSpotlight>
                    <div className="p-7 rounded-2xl border border-white/[0.05] bg-white/[0.01] flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="text-xl font-black font-display tracking-tight">
                            <GlitchText text={job.title} />
                          </h3>
                          <motion.span
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider"
                            style={{ background: job.color + '22', color: job.color }}
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {job.department}
                          </motion.span>
                        </div>
                        <p className="text-sm text-muted-foreground/70 mb-4">{job.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { icon: MapPin, text: job.location },
                            { icon: Clock, text: job.type },
                            { icon: DollarSign, text: job.salary },
                          ].map((tag, ti) => (
                            <span key={ti} className="flex items-center gap-1 text-xs font-bold text-muted-foreground/50 bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.05]">
                              <tag.icon className="w-3 h-3" />
                              {tag.text}
                            </span>
                          ))}
                        </div>
                      </div>
                      <MagneticButton strength={0.2}>
                        <SparkButton onClick={() => window.location.href = 'mailto:contact@examessy.com'}>
                          <LiquidButton
                            onClick={() => {}}
                            className="px-7 py-3 rounded-xl font-black text-sm tracking-wider shrink-0 gradient-border"
                            style={{ background: job.color + '18', color: job.color, border: `1px solid ${job.color}33` }}
                          >
                            Apply Now <ArrowRight className="w-4 h-4 inline ml-2" />
                          </LiquidButton>
                        </SparkButton>
                      </MagneticButton>
                    </div>
                  </HoverSpotlight>
                </DramaticCard>
              </DramaticReveal>
            ))}
          </div>

          {/* Open CTA */}
          <DramaticReveal direction="scale">
            <PulseBorder className="rounded-[32px]" color="rgba(var(--primary-rgb),0.4)">
              <div className="rounded-[32px] border border-white/[0.05] bg-gradient-to-br from-primary/[0.05] to-secondary/[0.03] p-12 md:p-16 text-center">
                <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter mb-4">
                  Don't See a <span className="text-accent">Role?</span>
                </h2>
                <WordReveal
                  text="We're always looking for talented people. Send us your resume and we'll keep you in mind."
                  className="text-muted-foreground/70 mb-8 max-w-xl mx-auto"
                />
                <MagneticButton>
                  <SparkButton onClick={() => window.location.href = 'mailto:contact@examessy.com'}>
                    <LiquidButton
                      onClick={() => {}}
                      className="px-12 py-5 rounded-2xl font-black text-base tracking-wide bg-primary text-primary-foreground shadow-[0_8px_30px_rgba(var(--primary-rgb),0.35)] gradient-border"
                    >
                      Send Resume <ArrowRight className="w-5 h-5 inline ml-2" />
                    </LiquidButton>
                  </SparkButton>
                </MagneticButton>
              </div>
            </PulseBorder>
          </DramaticReveal>

        </Container>
      </section>

      <Footer />
    </main>
  )
}
