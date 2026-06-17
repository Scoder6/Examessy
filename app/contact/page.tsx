'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Card, CardContent } from '@/components/card'
import { Input } from '@/components/input'
import { Footer } from '@/components/footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, CheckCircle2, Globe } from 'lucide-react'
import { Badge } from '@/components/badge'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'contact@examessy.com',
      description: 'We respond within 24 hours'
    },
    {
      icon: Globe,
      title: 'Visit Us',
      value: 'Digital Headquarters',
      description: 'Available across India'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">

      <Header showAuth={true} />

      <section className="pt-32 pb-24">
        <Container size="2xl">

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            
            {/* Left Side */}
            <div className="space-y-12">
              <div className="space-y-6">
                <Badge variant="secondary" className="px-4 py-2 rounded-full text-sm font-semibold tracking-wide">
                  Contact Us
                </Badge>
                
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                  Get in Touch
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-xl">
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              <div className="grid sm:grid-cols-1 gap-6">
                {contactMethods.map((method, idx) => {
                  const Icon = method.icon
                  return (
                    <Card key={idx} className="hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-6 flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-1">{method.title}</h3>
                          <p className="text-lg font-semibold text-foreground">{method.value}</p>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Form Side */}
            <div className="rounded-3xl">
              <Card className="p-8 md:p-12 border shadow-lg">
                    
                    <AnimatePresence mode="wait">
                      {isSubmitted ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="text-center py-16 space-y-6"
                        >
                          <div className="w-20 h-20 rounded-full bg-green-500/10 mx-auto flex items-center justify-center">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                          </div>
                          <div className="space-y-3">
                            <h3 className="text-2xl font-bold">Message Sent</h3>
                            <p className="text-muted-foreground">Thank you for reaching out. We'll get back to you soon.</p>
                          </div>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="space-y-2">
                            <h3 className="text-2xl font-bold">
                              Send us a message
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Fill out the form below and we'll get back to you as soon as possible.
                            </p>
                          </div>

                            <div className="space-y-6">
                              <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                  label="NAME"
                                  placeholder="Aspirant Name"
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  required
                                  disabled={isSubmitting}
                                  className="bg-white/5"
                                />
                                <Input
                                  label="NETWORK EMAIL"
                                  type="email"
                                  placeholder="contact@examessy.com"
                                  value={formData.email}
                                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                  required
                                  disabled={isSubmitting}
                                  className="bg-white/5"
                                />
                              </div>
                              <Input
                                label="SUBJECT"
                                placeholder="Transmission Subject"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                required
                                disabled={isSubmitting}
                                className="bg-white/5"
                              />
                              <div className="space-y-2">
                                <label className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase px-1">Message Intel</label>
                                <textarea
                                  className="w-full h-40 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-6 py-4 text-base font-medium placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all duration-500 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 hover:border-white/20"
                                  placeholder="Enter your detailed query here..."
                                  value={formData.message}
                                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                  required
                                  disabled={isSubmitting}
                                />
                              </div>
                            </div>

                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full h-14 text-lg font-semibold rounded-xl uppercase tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                              {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="w-5 h-5" />
                            </button>

                            {/* Hidden native submit for accessibility / form validation */}
                            <button type="submit" className="hidden" aria-hidden="true" />
                          </form>
                      )}
                    </AnimatePresence>
                  </Card>
              </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
