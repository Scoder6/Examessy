'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { motion } from 'framer-motion'
import { FileText, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/card'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'

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
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Header showAuth={true} />

      <Container className="py-28 md:py-36">
        <div className="max-w-4xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-16 space-y-6">
            <motion.div
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary to-accent mx-auto flex items-center justify-center shadow-lg"
            >
              <FileText className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tighter leading-none">
              <span className="text-secondary">Terms of Service</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using our platform. By continuing, you agree to be bound by them.
            </p>
            <p className="text-sm text-muted-foreground/50 font-mono">Last updated: June 2026</p>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {termsSections.map((section) => (
              <Card
                key={section.num}
                className="rounded-2xl border border-white/5 bg-white/[0.01]"
              >
                <CardContent className="p-7">
                  <div className="flex items-start gap-5">
                    <motion.div
                      className="w-12 h-10 rounded-xl flex items-center justify-center shrink-0 font-semibold font-mono text-sm"
                      style={{ background: section.color + '15', color: section.color }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {section.num}
                    </motion.div>
                    <div>
                      <h3 className="font-semibold font-display text-lg tracking-tight mb-2" style={{ color: section.color }}>
                        {section.title}
                      </h3>
                      <p className="text-muted-foreground/80 leading-relaxed text-sm">{section.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12">
            <Card className="rounded-3xl border border-white/5 bg-gradient-to-br from-secondary/[0.04] to-accent/[0.03]">
              <CardContent className="p-10 text-center space-y-5">
                <h3 className="text-2xl md:text-3xl font-display font-semibold tracking-tight">
                  Questions about <span className="text-secondary">these terms?</span>
                </h3>
                <p className="text-muted-foreground/70 max-w-md mx-auto">
                  Our team is happy to clarify anything. Reach out and we'll respond within 24 hours.
                </p>
                <Button
                  onClick={() => window.location.href = '/contact'}
                  className="px-10 py-4 rounded-2xl font-semibold text-base tracking-wide bg-secondary text-secondary-foreground shadow-lg hover:shadow-xl transition-all"
                >
                  Contact Support <ArrowRight className="w-4 h-4 inline ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

        </div>
      </Container>
      <Footer />
    </main>
  )
}
