'use client'

import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/input'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight, AlertCircle } from 'lucide-react'
import { DramaticZap, DramaticLock, DramaticShield } from '@/components/icons/dramatic-icons'
import { motion, AnimatePresence } from 'framer-motion'
import { DramaticReveal, GlitchText, MagneticButton, SparkButton, LiquidButton, ScrollingText, WordReveal, PulseBorder, HoverSpotlight } from '@/components/dramatic/dramatic-effects'
import { AuthBackground } from '@/components/3d/page-scenes'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push('/dashboard')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Access Denied: Authentication Failure')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      <AuthBackground />

      {/* 2026 Background Engine */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white opacity-[0.02] animate-grid-move" />
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-orb" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[120px] animate-orb" style={{ animationDelay: '-8s' }} />
      </div>

      <Header showAuth={false} />

      <ScrollingText
        texts={['SECURE ACCESS', 'AES-256 ENCRYPTED', 'NEURAL SYNC', 'IDENTITY VERIFIED', 'ZERO TRUST', 'MILITARY GRADE', 'SESSION ACTIVE']}
        speed={35}
        className="opacity-20 mt-20"
      />
      
      <section className="relative min-h-screen flex items-center pt-4">
        <div className="grid lg:grid-cols-2 w-full max-w-[1920px] mx-auto min-h-[calc(100vh-96px)]">
          
          {/* Visual Side */}
          <div className="hidden lg:flex flex-col justify-between p-20 relative overflow-hidden bg-primary/5 border-r border-white/5">
            <div className="relative z-10 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border-primary/20"
              >
                <DramaticLock className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black tracking-[0.3em] uppercase">Secure Access Node</span>
              </motion.div>
              
              <DramaticReveal direction="up">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-7xl font-display font-black tracking-tighter leading-none italic uppercase pb-4"
                >
                  Return to the <br />
                  <span className="text-gradient pr-4">
                    Command Center
                  </span>
                </motion.h2>
              </DramaticReveal>
              
              <WordReveal
                text="Reconnect with your 2026 preparation sequence. Your progress is synced across all nodes."
                className="text-xl text-muted-foreground max-w-md font-medium leading-relaxed"
              />

              <div className="space-y-4">
                {[
                  { icon: DramaticShield, title: 'Military Grade', desc: 'End-to-end encrypted session management.' },
                  { icon: DramaticZap, title: 'Neural Sync', desc: 'Instant data recovery and real-time analytics.' },
                  { icon: DramaticLock, title: 'Zero Trust Auth', desc: 'Every session verified at the hardware level.' },
                ].map((item, i) => (
                  <DramaticReveal key={i} direction="left" delay={0.2 + i * 0.1}>
                    <div className="flex items-start gap-4 p-4 rounded-xl glass border border-white/5 hover:border-primary/20 transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-black tracking-widest uppercase italic">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </DramaticReveal>
                ))}
              </div>
            </div>

            {/* Futuristic Visual Asset */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none">
              <div className="w-full h-full bg-mesh animate-orb" />
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative z-10 grid grid-cols-2 gap-12 pt-20 border-t border-white/5"
            >
              <div className="space-y-2">
                <DramaticShield className="w-8 h-8 text-primary" />
                <p className="text-sm font-black tracking-widest uppercase italic">Military Grade</p>
                <p className="text-xs text-muted-foreground">End-to-end encrypted session management.</p>
              </div>
              <div className="space-y-2">
                <DramaticZap className="w-8 h-8 text-secondary" />
                <p className="text-sm font-black tracking-widest uppercase italic">Neural Sync</p>
                <p className="text-xs text-muted-foreground">Instant data recovery and real-time analytics.</p>
              </div>
            </motion.div>
          </div>

          {/* Form Side */}
          <div className="flex items-center justify-center p-8 md:p-20 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md space-y-12"
            >
              <div className="space-y-4">
                <DramaticReveal direction="up">
                  <h3 className="text-4xl font-display font-black tracking-tighter uppercase italic">
                    Identity Verification
                  </h3>
                </DramaticReveal>
                <WordReveal
                  text="Input your credentials to initialize the session."
                  className="text-muted-foreground font-medium"
                />
              </div>

              <PulseBorder>
                <HoverSpotlight className="rounded-2xl p-1">
                  <form onSubmit={handleLogin} className="space-y-8 p-6">
                    <div className="space-y-6">
                      <Input
                        label="NETWORK EMAIL"
                        type="email"
                        placeholder="contact@examessy.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        className="bg-white/5"
                      />

                      <div className="space-y-2">
                        <div className="flex items-center justify-between px-1">
                          <label className="text-[10px] font-black tracking-widest text-muted-foreground uppercase italic">Access Key</label>
                          <Link href="#" className="text-[10px] font-black tracking-widest text-primary hover:underline uppercase italic">
                            Recovery?
                          </Link>
                        </div>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isLoading}
                          className="bg-white/5"
                        />
                      </div>
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-start gap-3 rounded-2xl bg-destructive/10 border border-destructive/20 p-4"
                        >
                          <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                          <p className="text-sm font-bold text-destructive">{error}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <MagneticButton>
                      <SparkButton>
                        <LiquidButton
                          onClick={() => {
                            const form = document.querySelector('form') as HTMLFormElement | null
                            form?.requestSubmit()
                          }}
                          className="w-full h-20 text-xl font-black rounded-2xl shadow-2xl shadow-primary/20 uppercase tracking-[0.2em] bg-primary text-primary-foreground"
                        >
                          {isLoading ? (
                            <span className="flex items-center justify-center gap-3">
                              <motion.span
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full inline-block"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                              />
                              INITIALIZING...
                            </span>
                          ) : (
                            <span>INITIALIZE LOGIN <ArrowRight className="ml-3 w-6 h-6 inline" /></span>
                          )}
                        </LiquidButton>
                      </SparkButton>
                    </MagneticButton>
                    {/* Native submit button for form accessibility */}
                    <button type="submit" className="hidden" aria-hidden="true" />
                  </form>
                </HoverSpotlight>
              </PulseBorder>

              <div className="pt-8 border-t border-white/5 text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  New to the network?{' '}
                  <Link href="/auth/sign-up" className="text-primary font-black uppercase italic hover:underline ml-2">
                    Establish Identity
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
