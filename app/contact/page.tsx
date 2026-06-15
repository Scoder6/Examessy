'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Card, CardContent } from '@/components/card'
import { Input } from '@/components/input'
import { Footer } from '@/components/footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, CheckCircle2 } from 'lucide-react'
import { DramaticShield, DramaticZap, DramaticGlobe } from '@/components/icons/dramatic-icons'
import { Badge } from '@/components/badge'
import { MouseSpotlight } from '@/components/mouse-spotlight'
import { ScrollProgress } from '@/components/scroll-progress'
import { DramaticReveal, DramaticCard, HoverSpotlight, GlitchText, MagneticButton, SparkButton, LiquidButton, StaggerGrid, ScrollingText, WordReveal, PulseBorder } from '@/components/dramatic/dramatic-effects'
import { ContactBackground } from '@/components/3d/page-scenes'

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
      description: 'Instant response via neural sync.'
    },
    {
      icon: DramaticGlobe,
      title: 'Visit Us',
      value: 'Digital Headquarters',
      description: 'Distributed network across India.'
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
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      <MouseSpotlight />
      <ScrollProgress />
      <ContactBackground />
      
      {/* 2026 Background Engine */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white opacity-[0.02] animate-grid-move" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] animate-orb" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] animate-orb" style={{ animationDelay: '-10s' }} />
      </div>

      <Header showAuth={true} />

      <section className="pt-48 pb-24 relative">
        <Container size="2xl">

          <ScrollingText
            texts={['CONTACT', 'SUPPORT', 'EMAIL US', 'GET IN TOUCH', 'DIGITAL HQ', 'NEURAL SYNC', 'INSTANT RESPONSE', 'INDIA WIDE']}
            speed={38}
            className="opacity-30 mb-16"
          />

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            
            {/* Intel Side */}
            <div className="space-y-12">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Badge variant="glass" className="px-6 py-2 rounded-full border-primary/20 text-primary font-black tracking-widest uppercase italic">
                    Support Node
                  </Badge>
                </motion.div>
                
                <DramaticReveal direction="up">
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-7xl md:text-9xl font-display font-black tracking-tighter uppercase italic leading-[0.85] text-foreground pb-4"
                  >
                    Get in
                    <br />
                    <span className="text-gradient pr-4">
                      Touch
                    </span>
                  </motion.h1>
                </DramaticReveal>
                
                <WordReveal
                  text="Establish a direct uplink with our engineering team. We're here to optimize your preparation sequence."
                  className="text-xl md:text-2xl text-muted-foreground font-clean font-medium opacity-80 max-w-xl"
                />
              </div>

              <StaggerGrid className="grid sm:grid-cols-1 gap-6">
                {contactMethods.map((method, idx) => {
                  const Icon = method.icon
                  return (
                    <DramaticReveal key={idx} direction="left" delay={idx * 0.1}>
                      <DramaticCard glowColor="rgba(var(--primary-rgb),0.4)">
                        <Card variant="glass" className="group hover:border-primary/30 transition-all duration-500">
                          <HoverSpotlight>
                            <CardContent className="p-8 flex items-center gap-6">
                              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-2xl shadow-black/20">
                                <Icon className="w-8 h-8" />
                              </div>
                              <div>
                                <h3 className="text-xs font-black tracking-widest text-muted-foreground uppercase mb-1">{method.title}</h3>
                                <p className="text-2xl font-display font-black italic text-foreground tracking-tight">{method.value}</p>
                                <p className="text-sm font-medium text-muted-foreground opacity-60">{method.description}</p>
                              </div>
                            </CardContent>
                          </HoverSpotlight>
                        </Card>
                      </DramaticCard>
                    </DramaticReveal>
                  )
                })}
              </StaggerGrid>

              <div className="pt-12 border-t border-white/5 flex items-center gap-8 grayscale opacity-40">
                <DramaticShield className="w-8 h-8" />
                <DramaticZap className="w-8 h-8" />
                <DramaticGlobe className="w-8 h-8" />
              </div>
            </div>

            {/* Form Side */}
            <DramaticReveal direction="right">
              <div className="rounded-3xl">
                <PulseBorder>
                  <Card variant="glass" className="p-10 md:p-16 border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
                    
                    <AnimatePresence mode="wait">
                      {isSubmitted ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="text-center py-20 space-y-8"
                        >
                          <div className="w-24 h-24 rounded-full bg-green-500/20 mx-auto flex items-center justify-center shadow-2xl shadow-green-500/20">
                            <CheckCircle2 className="w-12 h-12 text-green-500" />
                          </div>
                          <div className="space-y-4">
                            <h3 className="text-4xl font-display font-black italic uppercase tracking-tighter">Uplink Success</h3>
                            <p className="text-xl text-muted-foreground font-medium">Your message has been decrypted and sent to the core team.</p>
                          </div>
                        </motion.div>
                      ) : (
                        <HoverSpotlight>
                          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="space-y-2">
                              <h3 className="text-3xl font-display font-black tracking-tighter uppercase italic">
                                Transmit Intel
                              </h3>
                              <WordReveal
                                text="Initialize the communication protocol below."
                                className="text-muted-foreground font-medium"
                              />
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
                                <label className="text-[10px] font-black tracking-widest text-muted-foreground uppercase italic px-1">Message Intel</label>
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

                            <MagneticButton>
                              <SparkButton>
                                <LiquidButton
                                  onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                                  className="w-full h-24 text-2xl font-black rounded-3xl uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 bg-primary text-primary-foreground"
                                >
                                  SEND TRANSMISSION <Send className="ml-3 w-6 h-6 inline" />
                                </LiquidButton>
                              </SparkButton>
                            </MagneticButton>

                            {/* Hidden native submit for accessibility / form validation */}
                            <button type="submit" className="hidden" aria-hidden="true" />
                          </form>
                        </HoverSpotlight>
                      )}
                    </AnimatePresence>
                  </Card>
                </PulseBorder>
              </div>
            </DramaticReveal>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
