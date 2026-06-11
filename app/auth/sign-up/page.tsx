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
import { ArrowRight, AlertCircle, CheckCircle2, Rocket, Users, ShieldCheck, Target } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError('System Conflict: Passwords do not match')
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Security Protocol: Password must be at least 8 characters')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
            `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
      router.push('/auth/sign-up-success')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Registry Error: Failed to establish identity')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      {/* 2026 Background Engine */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white opacity-[0.02] animate-grid-move" />
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-orb" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[120px] animate-orb" style={{ animationDelay: '-12s' }} />
      </div>

      <Header showAuth={false} />
      
      <section className="relative min-h-screen flex items-center pt-24">
        <div className="grid lg:grid-cols-2 w-full max-w-[1920px] mx-auto min-h-[calc(100vh-96px)]">
          
          {/* Form Side */}
          <div className="flex items-center justify-center p-8 md:p-20 order-2 lg:order-1 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md space-y-10"
            >
              <div className="space-y-4">
                <h3 className="text-4xl font-display font-black tracking-tighter uppercase italic">Identity Establishment</h3>
                <p className="text-muted-foreground font-medium">Initialize your permanent record in the Examessy Network.</p>
              </div>

              <form onSubmit={handleSignUp} className="space-y-6">
                <div className="space-y-4">
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
                    <label className="px-1 text-[10px] font-black tracking-widest text-muted-foreground uppercase italic">Access Key Generation</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="bg-white/5"
                    />
                    <p className="px-1 text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">MIN 8 CHARACTERS REQUIRED</p>
                  </div>

                  <div className="space-y-2">
                    <label className="px-1 text-[10px] font-black tracking-widest text-muted-foreground uppercase italic">Verify Access Key</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      required
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
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
                  CREATE IDENTITY <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </form>

              <div className="pt-8 border-t border-white/5 text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  Already established?{' '}
                  <Link href="/auth/login" className="text-primary font-black uppercase italic hover:underline ml-2">
                    Access Portal
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Visual Side - The "OG" Part */}
          <div className="hidden lg:flex flex-col justify-between p-20 order-1 lg:order-2 relative overflow-hidden bg-secondary/5 border-l border-white/5">
            <div className="relative z-10 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border-secondary/20 ml-auto"
              >
                <Rocket className="w-4 h-4 text-secondary" />
                <span className="text-[10px] font-black tracking-[0.3em] uppercase">New Aspirant Uplink</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-7xl font-display font-black tracking-tighter leading-none italic uppercase text-right pb-4"
              >
                Join the <br />
                <span className="text-gradient pr-4">Elite Network</span>
              </motion.h2>
              
              <div className="space-y-6 text-right max-w-md ml-auto">
                {[
                  { icon: Target, text: 'Precision Testing Infrastructure' },
                  { icon: Users, text: 'Real-time Global Benchmarking' },
                  { icon: ShieldCheck, text: 'Permanent Academic Ledger' }
                ].map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-4 justify-end group"
                  >
                    <span className="text-lg font-bold text-muted-foreground group-hover:text-foreground transition-colors">{feature.text}</span>
                    <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Futuristic Visual Asset */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none">
              <div className="w-full h-full bg-mesh animate-orb" style={{ animationDirection: 'reverse' }} />
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative z-10 flex items-center justify-between pt-20 border-t border-white/5"
            >
              <div className="flex flex-col">
                <span className="text-4xl font-black font-display tracking-tighter italic">₹99</span>
                <span className="text-[10px] font-black tracking-widest uppercase opacity-50">LIFETIME ACCESS FEE</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-black tracking-widest uppercase italic">2026 Ready</p>
                <p className="text-xs text-muted-foreground">Fully compatible with latest exam nodes.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
