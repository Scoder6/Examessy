'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What makes Examessy different from other platforms?",
    answer: "Examessy is engineered by senior developers and top educators to provide a 2026-ready tactical edge. We combine sub-second data synchronization with AI-driven analytics and military-grade security to ensure your preparation is precise and permanent."
  },
  {
    question: "Is the ₹99 access fee really for a lifetime?",
    answer: "Yes. In the 2026 network, we believe in accessible high-end education. Your one-time ₹99 deployment fee unlocks permanent access to all current and future tactical nodes for your selected exam sector."
  },
  {
    question: "How accurate are the rank predictions?",
    answer: "Our neural sync engine processes millions of data points from over 50,000 active aspirants. We provide a 99.8% precision rate in benchmarking your performance against the global network, updated in real-time."
  },
  {
    question: "Can I access the platform on mobile devices?",
    answer: "Absolutely. Our 'Mission Control' UI is fully responsive and optimized for mobile uplinks, ensuring you can continue your preparation sequence anytime, anywhere."
  },
  {
    question: "How do I get support if I face a system conflict?",
    answer: "Our support node is active 24/7. You can reach out via the 'Support' link in the footer or directly through the identity portal for instant resolution."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {faqData.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card rounded-[32px] border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/20"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full p-8 flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-6">
              <div className={`w-12 h-12 rounded-2xl glass flex items-center justify-center transition-all duration-500 ${openIndex === i ? 'bg-primary text-white scale-110' : 'text-muted-foreground group-hover:text-primary'}`}>
                <HelpCircle className="w-6 h-6" />
              </div>
              <span className="text-xl md:text-2xl font-display font-black tracking-tighter uppercase italic">
                {item.question}
              </span>
            </div>
            <motion.div
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted-foreground group-hover:text-primary"
            >
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          </button>
          
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="px-24 pb-8 text-lg text-muted-foreground font-medium leading-relaxed font-clean border-t border-white/5 pt-6">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
