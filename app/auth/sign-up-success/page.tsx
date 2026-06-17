'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Card, CardContent } from '@/components/card'
import { Button } from '@/components/button'
import { CheckCircle2, ArrowRight, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SignUpSuccessPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Header showAuth={false} />

      <section className="min-h-screen flex items-center py-20">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30"
              >
                <CheckCircle2 className="w-12 h-12 text-white" />
              </motion.div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
                Registration <span className="text-gradient">Successful!</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Your account has been created successfully. We've sent a confirmation email to your registered address.
              </p>
            </div>

            <Card className="border border-border-subtle bg-gradient-to-br from-card to-card-bg-subtle shadow-xl">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">Check your email to confirm your account</span>
                </div>

                <div className="pt-4 border-t border-border-subtle">
                  <Button
                    onClick={() => router.push('/auth/login')}
                    className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Go to Login <ArrowRight className="w-5 h-5" />
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground">
              Didn't receive the email? Check your spam folder or{' '}
              <button
                onClick={() => router.push('/auth/sign-up')}
                className="text-primary font-semibold hover:underline"
              >
                try signing up again
              </button>
            </p>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
