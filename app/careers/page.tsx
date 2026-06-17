'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Badge } from '@/components/badge'
import { MapPin, DollarSign, Clock, ArrowRight, Users, Heart, Rocket, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/card'
import { Button } from '@/components/button'

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
  { icon: Rocket, title: 'Growth Path', description: 'Clear career path and learning opportunities', color: '#f472b6' },
  { icon: Heart, title: 'Health Benefits', description: 'Comprehensive health insurance for you and family', color: '#22d3ee' },
  { icon: MapPin, title: 'Work From Anywhere', description: 'Home or our Bangalore office — your choice', color: '#a78bfa' },
]

export default function Careers() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Header showAuth={true} />

      <section className="pt-48 pb-32 relative">
        <Container size="2xl">

          {/* Hero */}
          <div className="text-center mb-6 space-y-5">
            <Badge variant="secondary" className="px-4 py-2 rounded-full text-sm font-semibold">
              <Zap className="w-3.5 h-3.5 mr-2 inline" /> Careers
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tighter leading-tight">
              Join Our<br />
              <span className="text-primary">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground/70 max-w-2xl mx-auto">
              Build the future of education with us. We're looking for passionate individuals who want to make a difference in students' lives.
            </p>
          </div>

          {/* Benefits */}
          <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tighter text-center mb-10">
            Why Work With Us
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="rounded-3xl border border-white/5 bg-white/[0.01] h-full">
                  <CardContent className="p-8">
                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                      style={{ background: benefit.color + '18', color: benefit.color }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <benefit.icon className="w-7 h-7" />
                    </motion.div>
                    <h3 className="text-lg font-semibold font-display tracking-tight mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/70">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Open positions */}
          <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tighter mb-10">
            Open <span className="text-primary">Positions</span>
          </h2>

          <div className="space-y-4 mb-20">
            {openings.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Card className="rounded-2xl border border-white/5 bg-white/[0.01]">
                  <CardContent className="p-7 flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold font-display tracking-tight">
                          {job.title}
                        </h3>
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide"
                          style={{ background: job.color + '22', color: job.color }}
                        >
                          {job.department}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground/70 mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { icon: MapPin, text: job.location },
                          { icon: Clock, text: job.type },
                          { icon: DollarSign, text: job.salary },
                        ].map((tag, ti) => (
                          <span key={ti} className="flex items-center gap-1 text-xs font-semibold text-muted-foreground/50 bg-card-bg-subtle px-3 py-1 rounded-full border border-border-subtle">
                            <tag.icon className="w-3 h-3" />
                            {tag.text}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button
                      onClick={() => window.location.href = 'mailto:contact@examessy.com'}
                      className="px-7 py-3 rounded-xl font-semibold text-sm tracking-wide shrink-0"
                      style={{ background: job.color + '18', color: job.color, border: `1px solid ${job.color}33` }}
                    >
                      Apply Now <ArrowRight className="w-4 h-4 inline ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Open CTA */}
          <Card className="rounded-3xl border border-white/5 bg-gradient-to-br from-primary/[0.05] to-secondary/[0.03]">
            <CardContent className="p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tighter mb-4">
                Don't See a <span className="text-accent">Role?</span>
              </h2>
              <p className="text-muted-foreground/70 mb-8 max-w-xl mx-auto">
                We're always looking for talented people. Send us your resume and we'll keep you in mind.
              </p>
              <Button
                onClick={() => window.location.href = 'mailto:contact@examessy.com'}
                className="px-12 py-5 rounded-2xl font-semibold text-base tracking-wide bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all"
              >
                Send Resume <ArrowRight className="w-5 h-5 inline ml-2" />
              </Button>
            </CardContent>
          </Card>

        </Container>
      </section>

      <Footer />
    </main>
  )
}
