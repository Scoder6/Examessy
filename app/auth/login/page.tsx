'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Container } from '@/components/container'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight, AlertCircle, ShieldCheck, Zap, Star, Globe, Lock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
      {/* 2026 Background Engine */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white opacity-[0.02] animate-grid-move" />
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-orb" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[120px] animate-orb" style={{ animationDelay: '-8s' }} />
      </div>

      <Header showAuth={false} />
      
      <section className="relative min-h-screen flex items-center pt-24">
        <div className="grid lg:grid-cols-2 w-full max-w-[1920px] mx-auto min-h-[calc(100vh-96px)]">
          
          {/* Visual Side - The "OG" Part */}
          <div className="hidden lg:flex flex-col justify-between p-20 relative overflow-hidden bg-primary/5 border-r border-white/5">
            <div className="relative z-10 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border-primary/20"
              >
                <Lock className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black tracking-[0.3em] uppercase">Secure Access Node</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-7xl font-display font-black tracking-tighter leading-none italic uppercase pb-4"
              >
                Return to the <br />
                <span className="text-gradient pr-4">Command Center</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-muted-foreground max-w-md font-medium leading-relaxed"
              >
                Reconnect with your 2026 preparation sequence. Your progress is synced across all nodes.
              </motion.p>
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
                <ShieldCheck className="w-8 h-8 text-primary" />
                <p className="text-sm font-black tracking-widest uppercase italic">Military Grade</p>
                <p className="text-xs text-muted-foreground">End-to-end encrypted session management.</p>
              </div>
              <div className="space-y-2">
                <Zap className="w-8 h-8 text-secondary" />
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
                <h3 className="text-4xl font-display font-black tracking-tighter uppercase italic">Identity Verification</h3>
                <p className="text-muted-foreground font-medium">Input your credentials to initialize the session.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-8">
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

                <Button 
                  type="submit" 
                  fullWidth 
                  size="xl" 
                  loading={isLoading} 
                  variant="default"
                  className="h-20 text-xl font-black rounded-2xl shadow-2xl shadow-primary/20 uppercase tracking-[0.2em]"
                >
                  INITIALIZE LOGIN <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </form>

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
