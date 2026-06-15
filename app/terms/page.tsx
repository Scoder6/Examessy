'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { motion } from 'framer-motion'
import { FileText, ArrowRight } from 'lucide-react'
import { DramaticReveal, DramaticCard, HoverSpotlight, GlitchText, MagneticButton, SparkButton, LiquidButton, StaggerGrid, ScrollingText, WordReveal, PulseBorder } from '@/components/dramatic/dramatic-effects'

const termsSections = [
  {
    num: '01', title: 'Acceptance of Terms', color: '#818cf8',
    content: 'By accessing and using Examessy, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.'
  },
  {
    num: '02', title: 'Description of Service', color: '#34d399',
    content: 'Examessy provides online test series, study materials, and analytics for exam preparation. Our services include practice tests, performance analytics, and study resources.'
  },
  {
    num: '03', title: 'User Accounts', color: '#fbbf24',
    content: 'To access certain features you must create an account. You are responsible for maintaining confidentiality of credentials, all activities under your account, notifying us of unauthorized use, and providing accurate information.'
  },
  {
    num: '04', title: 'Payment Terms', color: '#f472b6',
    content: 'All payments are one-time and non-refundable unless otherwise stated. We reserve the right to modify pricing at any time. Payment is processed through secure third-party payment gateways.'
  },
  {
    num: '05', title: 'Intellectual Property', color: '#22d3ee',
    content: 'All content on Examessy including test questions, study materials, analytics, website design and code are the exclusive property of Examessy and are protected by intellectual property laws.'
  },
  {
    num: '06', title: 'User Conduct', color: '#a78bfa',
    content: 'You agree not to share account credentials, attempt to reverse engineer our systems, use our service for illegal purposes, violate applicable laws, or interfere with other users\' experience.'
  },
  {
    num: '07', title: 'Privacy Policy', color: '#fb923c',
    content: 'Your use of Examessy is also governed by our Privacy Policy, which describes how we collect, use, and protect your personal information. Please review our Privacy Policy carefully.'
  },
  {
    num: '08', title: 'Disclaimer of Warranties', color: '#818cf8',
    content: 'Examessy is provided on an "as is" and "as available" basis. We make no warranties regarding the accuracy, reliability, or completeness of our service and do not guarantee uninterrupted access.'
  },
  {
    num: '09', title: 'Limitation of Liability', color: '#34d399',
    content: 'In no event shall Examessy be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our service.'
  },
  {
    num: '10', title: 'Termination', color: '#fbbf24',
    content: 'We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason at our sole discretion without prior notice.'
  },
  {
    num: '11', title: 'Changes to Terms', color: '#f472b6',
    content: 'We may modify these terms at any time. Continued use of our service after such modifications constitutes acceptance of the updated terms. We will notify users of major changes.'
  },
  {
    num: '12', title: 'Contact Information', color: '#22d3ee',
    content: 'If you have any questions about these Terms, contact us at contact@examessy.com or write to: Examessy Education Pvt Ltd, Bangalore, India.'
  },
]

export default function Terms() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid-white opacity-[0.02] animate-grid-move" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] animate-orb" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] animate-orb" style={{ animationDelay: '-10s' }} />
      </div>

      <Header showAuth={true} />

      <Container className="py-28 md:py-36">
        <div className="max-w-4xl mx-auto">

          {/* Hero */}
          <DramaticReveal direction="scale" className="text-center mb-16 space-y-6">
            <motion.div
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary to-accent mx-auto flex items-center justify-center shadow-[0_0_40px_rgba(var(--secondary-rgb),0.35)]"
              animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.06, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FileText className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-none">
              <span className="text-secondary">Terms of Service</span>
            </h1>
            <WordReveal
              text="Please read these terms carefully before using our platform. By continuing, you agree to be bound by them."
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            />
            <p className="text-sm text-muted-foreground/50 font-mono">Last updated: June 2026</p>
          </DramaticReveal>

          <ScrollingText
            texts={['TERMS OF SERVICE','LEGAL AGREEMENT','USER CONDUCT','PAYMENT TERMS','INTELLECTUAL PROPERTY','DATA RIGHTS','FAIR USE']}
            speed={42}
            className="opacity-40 mb-12"
          />

          {/* Sections */}
          <StaggerGrid className="space-y-4">
            {termsSections.map((section) => (
              <DramaticCard
                key={section.num}
                className="rounded-2xl"
                glowColor={section.color + '33'}
              >
                <HoverSpotlight>
                  <div className="p-7 rounded-2xl border border-white/[0.05] bg-white/[0.01]">
                    <div className="flex items-start gap-5">
                      <motion.div
                        className="w-12 h-10 rounded-xl flex items-center justify-center shrink-0 font-black font-mono text-sm"
                        style={{ background: section.color + '15', color: section.color }}
                        whileHover={{ scale: 1.1 }}
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3, repeat: Infinity, delay: parseInt(section.num) * 0.2 }}
                      >
                        {section.num}
                      </motion.div>
                      <div>
                        <h3 className="font-black font-display text-lg tracking-tight mb-2" style={{ color: section.color }}>
                          <GlitchText text={section.title} />
                        </h3>
                        <p className="text-muted-foreground/80 leading-relaxed text-sm">{section.content}</p>
                      </div>
                    </div>
                  </div>
                </HoverSpotlight>
              </DramaticCard>
            ))}
          </StaggerGrid>

          {/* Contact CTA */}
          <DramaticReveal direction="up" className="mt-12">
            <PulseBorder className="rounded-[28px]" color="rgba(var(--secondary-rgb),0.4)">
              <DramaticCard className="rounded-[28px]" glowColor="rgba(var(--secondary-rgb),0.35)">
                <div className="p-10 rounded-[28px] border border-white/[0.05] bg-gradient-to-br from-secondary/[0.04] to-accent/[0.03] text-center space-y-5">
                  <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight">
                    Questions about <span className="text-secondary">these terms?</span>
                  </h3>
                  <WordReveal
                    text="Our team is happy to clarify anything. Reach out and we'll respond within 24 hours."
                    className="text-muted-foreground/70 max-w-md mx-auto"
                  />
                  <MagneticButton>
                    <SparkButton>
                      <LiquidButton
                        onClick={() => window.location.href = '/contact'}
                        className="px-10 py-4 rounded-2xl font-black text-base tracking-wide bg-secondary text-secondary-foreground shadow-[0_8px_30px_rgba(var(--secondary-rgb),0.35)] gradient-border"
                      >
                        Contact Support <ArrowRight className="w-4 h-4 inline ml-2" />
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
