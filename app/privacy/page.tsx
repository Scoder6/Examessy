'use client'

import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Database, Cookie, FileText, ArrowRight } from 'lucide-react'
import { DramaticReveal, DramaticCard, HoverSpotlight, GlitchText, MagneticButton, SparkButton, LiquidButton, StaggerGrid, ScrollingText, WordReveal, PulseBorder } from '@/components/dramatic/dramatic-effects'

const sections = [
  {
    icon: Shield, color: '#818cf8',
    title: 'Data Collection',
    content: 'We collect information you provide directly to us, such as when you create an account, sign up for test series, or communicate with us. This may include your name, email address, and payment information.'
  },
  {
    icon: Lock, color: '#34d399',
    title: 'Data Security',
    content: 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Your data is encrypted both in transit and at rest.'
  },
  {
    icon: Eye, color: '#fbbf24',
    title: 'Data Usage',
    content: 'We use your personal data to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.'
  },
  {
    icon: Database, color: '#f472b6',
    title: 'Data Retention',
    content: 'We retain your personal data for as long as necessary to provide our services and fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.'
  },
  {
    icon: Cookie, color: '#22d3ee',
    title: 'Cookies',
    content: 'We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.'
  },
  {
    icon: FileText, color: '#a78bfa',
    title: 'Your Rights',
    content: 'You have the right to access, correct, or delete your personal data. You can also object to processing of your personal data, ask us to restrict processing, or request data portability.'
  }
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid-white opacity-[0.02] animate-grid-move" />
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] animate-orb" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] animate-orb" style={{ animationDelay: '-10s' }} />
      </div>

      <Header showAuth={false} />

      <Container className="py-28 md:py-36">
        <div className="max-w-4xl mx-auto">

          {/* Hero */}
          <DramaticReveal direction="scale" className="text-center mb-16 space-y-6">
            <motion.div
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center shadow-[0_0_40px_rgba(var(--primary-rgb),0.35)]"
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-none">
              <span className="text-primary">Privacy Policy</span>
            </h1>
            <WordReveal
              text="Your privacy is important to us. This policy explains how we collect, use, and protect your data."
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            />
            <p className="text-sm text-muted-foreground/50 font-mono">Last updated: January 2025</p>
          </DramaticReveal>

          <ScrollingText
            texts={['DATA PROTECTION','GDPR COMPLIANT','AES-256 ENCRYPTED','ZERO SHARING','YOUR RIGHTS','TRANSPARENT','SECURE']}
            speed={40}
            className="opacity-40 mb-12"
          />

          {/* Sections */}
          <StaggerGrid className="space-y-5">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <DramaticCard
                  key={section.title}
                  className="rounded-2xl"
                  glowColor={section.color + '44'}
                >
                  <HoverSpotlight>
                    <div className="p-7 rounded-2xl border border-white/[0.05] bg-white/[0.01]">
                      <div className="flex items-start gap-5">
                        <motion.div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: section.color + '18', color: section.color }}
                          whileHover={{ scale: 1.15, rotate: -8 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Icon className="w-6 h-6" />
                        </motion.div>
                        <div>
                          <h3 className="font-black font-display text-xl tracking-tight mb-2">
                            <GlitchText text={section.title} />
                          </h3>
                          <p className="text-muted-foreground/80 leading-relaxed text-sm">{section.content}</p>
                        </div>
                      </div>
                    </div>
                  </HoverSpotlight>
                </DramaticCard>
              )
            })}
          </StaggerGrid>

          {/* CTA */}
          <DramaticReveal direction="up" className="mt-12">
            <PulseBorder className="rounded-[28px]" color="rgba(var(--primary-rgb),0.4)">
              <DramaticCard className="rounded-[28px]" glowColor="rgba(var(--primary-rgb),0.35)">
                <div className="p-10 md:p-14 rounded-[28px] border border-white/[0.05] bg-gradient-to-br from-primary/[0.04] to-secondary/[0.03] text-center space-y-6">
                  <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight">
                    Questions about your <span className="text-primary">privacy?</span>
                  </h3>
                  <WordReveal
                    text="If you have any questions about this Privacy Policy, please contact us."
                    className="text-muted-foreground/70 max-w-md mx-auto"
                  />
                  <MagneticButton>
                    <SparkButton>
                      <LiquidButton
                        onClick={() => window.location.href = '/contact'}
                        className="px-10 py-4 rounded-2xl font-black text-base tracking-wide bg-primary text-primary-foreground shadow-[0_8px_30px_rgba(var(--primary-rgb),0.35)] gradient-border"
                      >
                        Contact Us <ArrowRight className="w-4 h-4 inline ml-2" />
                      </LiquidButton>
                    </SparkButton>
                  </MagneticButton>
                </div>
              </DramaticCard>
            </PulseBorder>
          </DramaticReveal>

        </div>
      </Container>
      <Footer />
    </main>
  )
}
