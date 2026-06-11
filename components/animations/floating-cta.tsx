'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function FloatingCTA() {
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          <div className="bg-background/90 backdrop-blur-2xl border-t border-white/[0.06] px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground/60 font-medium">Start your prep today</span>
                <span className="text-lg font-black font-display tracking-tight">
                  ₹99 <span className="text-xs font-medium text-muted-foreground/60">one-time</span>
                </span>
              </div>
              <button
                onClick={() => router.push('/auth/sign-up')}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-primary text-primary-foreground font-black text-sm shadow-[0_4px_14px_rgba(var(--primary-rgb),0.35)] hover:bg-primary/90 active:scale-95 transition-all"
              >
                Enroll Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
