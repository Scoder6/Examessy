'use client'

import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Database, Cookie, FileText, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/card'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'

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
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Header showAuth={false} />

      <Container className="py-28 md:py-36">
        <div className="max-w-4xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-16 space-y-6">
            <motion.div
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center shadow-lg"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tighter leading-none">
              <span className="text-primary">Privacy Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your data.
            </p>
            <p className="text-sm text-muted-foreground/50 font-mono">Last updated: January 2025</p>
          </div>

          {/* Sections */}
          <div className="space-y-5">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <Card
                  key={section.title}
                  className="rounded-2xl border border-white/5 bg-white/[0.01]"
                >
                  <CardContent className="p-7">
                    <div className="flex items-start gap-5">
                      <motion.div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: section.color + '18', color: section.color }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold font-display text-xl tracking-tight mb-2">
                          {section.title}
                        </h3>
                        <p className="text-muted-foreground/80 leading-relaxed text-sm">{section.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-12">
            <Card className="rounded-3xl border border-white/5 bg-gradient-to-br from-primary/[0.04] to-secondary/[0.03]">
              <CardContent className="p-10 md:p-14 text-center space-y-6">
                <h3 className="text-2xl md:text-3xl font-display font-semibold tracking-tight">
                  Questions about your <span className="text-primary">privacy?</span>
                </h3>
                <p className="text-muted-foreground/70 max-w-md mx-auto">
                  If you have any questions about this Privacy Policy, please contact us.
                </p>
                <Button
                  onClick={() => window.location.href = '/contact'}
                  className="px-10 py-4 rounded-2xl font-semibold text-base tracking-wide bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                >
                  Contact Us <ArrowRight className="w-4 h-4 inline ml-2" />
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
