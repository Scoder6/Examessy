'use client'

import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Database, Cookie, FileText } from 'lucide-react'

export default function PrivacyPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const sections = [
    {
      icon: Shield,
      title: 'Data Collection',
      content: 'We collect information you provide directly to us, such as when you create an account, sign up for test series, or communicate with us. This may include your name, email address, and payment information.'
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Your data is encrypted both in transit and at rest.'
    },
    {
      icon: Eye,
      title: 'Data Usage',
      content: 'We use your personal data to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.'
    },
    {
      icon: Database,
      title: 'Data Retention',
      content: 'We retain your personal data for as long as necessary to provide our services and fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.'
    },
    {
      icon: Cookie,
      title: 'Cookies',
      content: 'We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.'
    },
    {
      icon: FileText,
      title: 'Your Rights',
      content: 'You have the right to access, correct, or delete your personal data. You can also object to processing of your personal data, ask us to restrict processing, or request data portability.'
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header showAuth={false} />
      
      <Container className="py-20 md:py-32">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.div
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center mb-6 shadow-lg shadow-primary/25"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold mb-4 text-primary">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your data.
            </p>
            <p className="text-sm text-muted-foreground mt-4">Last updated: January 2025</p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, idx) => {
              const Icon = section.icon
              return (
                <motion.div key={idx} variants={itemVariants}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Card variant="elevated" className="border-2 hover:border-primary/50 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-foreground">
                          <motion.div
                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <Icon className="w-6 h-6 text-primary" />
                          </motion.div>
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="mt-12">
            <Card variant="gradient" className="border-2 text-center py-12">
              <CardContent className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Questions about your privacy?</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  If you have any questions about this Privacy Policy, please contact us.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  >
                    Contact Us
                  </a>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
      <Footer />
    </main>
  )
}
