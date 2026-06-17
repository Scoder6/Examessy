'use client'

import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/input'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight, AlertCircle, Zap, Lock, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/button'
import { Card, CardContent } from '@/components/card'
import { Badge } from '@/components/badge'

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Handle specific error cases
        if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials or sign up for a new account.')
        } else if (error.message.includes('Email not confirmed')) {
          setError('Please confirm your email address before logging in. Check your inbox for the confirmation link.')
        } else {
          throw error
        }
        return
      }

      // Check if user has profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', data.user.id)
        .single()

      if (!profile) {
        // User exists but no profile - redirect to complete profile
        setError('Please complete your profile to continue.')
        setTimeout(() => router.push('/auth/sign-up'), 2000)
        return
      }

      router.push('/dashboard')
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Access Denied: Authentication Failure'
      
      // Handle specific error messages
      if (errorMessage.includes('User not found') || errorMessage.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please check your credentials or sign up for a new account.')
      } else if (errorMessage.includes('Email not confirmed')) {
        setError('Please confirm your email address before logging in. Check your inbox for the confirmation link.')
      } else {
        setError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Header showAuth={false} />
      
      <section className="relative min-h-screen flex items-center pt-4">
        <div className="grid lg:grid-cols-2 w-full max-w-[1920px] mx-auto min-h-[calc(100vh-96px)]">
          
          {/* Visual Side */}
          <div className="hidden lg:flex flex-col justify-between p-20 relative overflow-hidden bg-primary/5 border-r border-white/5">
            <div className="relative z-10 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-primary/20"
              >
                <Lock className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-semibold tracking-wide uppercase">Secure Access Node</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl font-display font-semibold tracking-tighter leading-none uppercase pb-4"
              >
                Return to the <br />
                <span className="text-gradient pr-4">
                  Command Center
                </span>
              </motion.h2>
              
              <p className="text-xl text-muted-foreground max-w-md font-medium leading-relaxed">
                Reconnect with your 2026 preparation sequence. Your progress is synced across all nodes.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Shield, title: 'Military Grade', desc: 'End-to-end encrypted session management.' },
                  { icon: Zap, title: 'Neural Sync', desc: 'Instant data recovery and real-time analytics.' },
                  { icon: Lock, title: 'Zero Trust Auth', desc: 'Every session verified at the hardware level.' },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold tracking-wide uppercase">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative z-10 grid grid-cols-2 gap-12 pt-20 border-t border-white/5"
            >
              <div className="space-y-2">
                <Shield className="w-8 h-8 text-primary" />
                <p className="text-sm font-semibold tracking-wide uppercase">Military Grade</p>
                <p className="text-xs text-muted-foreground">End-to-end encrypted session management.</p>
              </div>
              <div className="space-y-2">
                <Zap className="w-8 h-8 text-secondary" />
                <p className="text-sm font-semibold tracking-wide uppercase">Neural Sync</p>
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
                <h3 className="text-4xl font-display font-semibold tracking-tighter uppercase">
                  Identity Verification
                </h3>
                <p className="text-muted-foreground font-medium">
                  Input your credentials to initialize the session.
                </p>
              </div>

              <Card className="border border-white/5 bg-white/[0.01]">
                <CardContent className="p-6">
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
                          <label className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">Access Key</label>
                          <Link href="#" className="text-[10px] font-semibold tracking-wide text-primary hover:underline uppercase">
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
                      disabled={isLoading}
                      className="w-full h-14 text-lg font-semibold rounded-2xl uppercase tracking-wide bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all"
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
                        <span>INITIALIZE LOGIN <ArrowRight className="ml-3 w-5 h-5 inline" /></span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="pt-8 border-t border-white/5 text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  New to the network?{' '}
                  <Link href="/auth/sign-up" className="text-primary font-semibold uppercase hover:underline ml-2">
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
