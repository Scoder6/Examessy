'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Card, CardContent } from '@/components/card'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { BookCheck, ArrowRight, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const examData: Record<string, { name: string; color: string; percentage: number; description: string; subjects: string[] }> = {
  'jee_mains': { 
    name: 'JEE Mains', 
    color: 'from-indigo-500 to-blue-600', 
    percentage: 87,
    description: 'Joint Entrance Examination Mains - The gateway to NITs, IIITs, and other top engineering colleges.',
    subjects: ['Physics', 'Chemistry', 'Mathematics']
  },
  'jee_advanced': { 
    name: 'JEE Advanced', 
    color: 'from-blue-500 to-cyan-600', 
    percentage: 82,
    description: 'Joint Entrance Examination Advanced - For admission to IITs. The toughest engineering entrance exam.',
    subjects: ['Physics', 'Chemistry', 'Mathematics']
  },
  'neet': { 
    name: 'NEET', 
    color: 'from-emerald-500 to-teal-600', 
    percentage: 91,
    description: 'National Eligibility cum Entrance Test - The single medical entrance exam for MBBS/BDS courses.',
    subjects: ['Physics', 'Chemistry', 'Biology']
  },
  'vit': { 
    name: 'VIT', 
    color: 'from-violet-500 to-purple-600', 
    percentage: 79,
    description: 'Vellore Institute of Technology Engineering Entrance Examination - For VIT campuses.',
    subjects: ['Physics', 'Chemistry', 'Mathematics']
  },
  'bitsat': { 
    name: 'BITSAT', 
    color: 'from-orange-500 to-amber-600', 
    percentage: 85,
    description: 'BITS Admission Test - For admission to BITS Pilani, Goa, and Hyderabad campuses.',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Logical Reasoning']
  },
  'manipal': { 
    name: 'Manipal', 
    color: 'from-pink-500 to-rose-600', 
    percentage: 77,
    description: 'Manipal Entrance Test - For admission to Manipal Institute of Technology.',
    subjects: ['Physics', 'Chemistry', 'Mathematics']
  },
}

export default function PYQPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Header showAuth={true} />

      <section className="pt-48 pb-24">
        <Container size="2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 space-y-6"
          >
            <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-xs font-semibold">
              <BookCheck className="w-3.5 h-3.5 mr-1.5" /> Previous Year Questions
            </Badge>
            <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tighter leading-tight">
              Choose Your{' '}
              <span className="text-primary">Exam</span>
            </h1>
            <p className="text-lg text-muted-foreground/70 max-w-2xl">
              Select an exam to browse chapter-wise previous year questions with detailed solutions.
            </p>
          </motion.div>

          {/* Exam Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(examData).map(([key, exam], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => router.push(`/pyq/${key}`)}
                className="cursor-pointer group"
              >
                <Card className="h-full rounded-3xl border border-border-subtle bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-display font-semibold tracking-tight">{exam.name}</h3>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed">{exam.description}</p>
                    <div className="space-y-3">
                      <div className="flex items-end justify-between">
                        <span className="text-4xl font-display font-bold text-foreground">{exam.percentage}%</span>
                        <span className="text-sm text-muted-foreground mb-2">match rate</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/[0.04] overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${exam.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${exam.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exam.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
