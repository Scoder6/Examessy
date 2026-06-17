'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Card, CardContent } from '@/components/card'
import { Badge } from '@/components/badge'
import { Calendar, Clock, ArrowRight, ArrowLeft, Share2, Bookmark } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/button'

export default function Blog() {
  const [selectedPost, setSelectedExam] = useState<any>(null)

  const posts = [
    {
      id: 1,
      title: 'How to Crack JEE Mains in 3 Months',
      excerpt: 'A comprehensive guide to preparing for JEE Mains with a focused strategy and time management tips.',
      content: `
        The JEE Mains examination is one of the most competitive engineering entrance exams in India. Preparing for it in 3 months requires a highly tactical approach.
        
        ### Phase 1: The Foundation (Month 1)
        Focus on high-weightage chapters. In Physics, prioritize Mechanics and Electrodynamics. In Chemistry, ensure your Organic and Physical chemistry concepts are crystal clear. For Mathematics, Calculus and Algebra are your primary weapons.
        
        ### Phase 2: Tactical Application (Month 2)
        Start solving previous year question papers (PYQs). This is the most effective way to understand the exam pattern and the "language" of the questions.
        
        ### Phase 3: The Simulation (Month 3)
        Take full-length mock tests every alternate day. Analyze your results with the Examessy analytics engine to identify neural sync gaps and optimize your speed.
      `,
      date: 'Dec 15, 2026',
      readTime: '8 min read',
      category: 'JEE Mains',
      image: '🎯',
    },
    {
      id: 2,
      title: 'NEET 2026: Complete Preparation Strategy',
      excerpt: 'Learn the most effective strategies to prepare for NEET 2026 and maximize your score.',
      content: `
        NEET preparation is a marathon, not a sprint. To master the 2026 medical entrance, you need a balanced strategy across Biology, Physics, and Chemistry.
        
        ### The Biology Advantage
        Biology accounts for 50% of the marks. Mastery of NCERT is mandatory. Use visual mnemonics and frequent revision nodes to lock in complex biological sequences.
        
        ### Physics & Chemistry Precision
        Don't let Physics be your bottleneck. Focus on formula application and conceptual clarity in Mechanics and Modern Physics. In Chemistry, Inorganic requires consistent revision while Organic needs reaction mechanism practice.
      `,
      date: 'Dec 10, 2026',
      readTime: '10 min read',
      category: 'NEET',
      image: '🧬',
    },
    {
      id: 3,
      title: 'VIT Entrance Exam 2026: Tips and Tricks',
      excerpt: 'Expert tips to crack VIT entrance exam with detailed subject-wise preparation guide.',
      content: `
        VITEEE 2026 requires a different tactical approach compared to JEE. Speed and accuracy are the primary metrics for success in this university-level exam.
        
        ### Speed Mock Drills
        The VITEEE interface is unique. Practice with simulations that mimic the exact CBT environment to reduce transition latency during the actual exam.
      `,
      date: 'Dec 5, 2026',
      readTime: '6 min read',
      category: 'VIT',
      image: '📚',
    },
    {
      id: 4,
      title: 'Time Management for Competitive Exams 2026',
      excerpt: 'Master the art of time management to excel in any competitive exam you take.',
      content: `
        In the 2026 competitive landscape, time is your most valuable resource. Managing it effectively during the exam can boost your score by 15-20%.
        
        ### The 3-Round Strategy
        - **Round 1:** Solve 'Sure-Shot' questions (30 seconds each).
        - **Round 2:** Tackle 'Thinker' questions (2 minutes each).
        - **Round 3:** Attempt 'Complex' questions only if time permits.
      `,
      date: 'Nov 28, 2026',
      readTime: '7 min read',
      category: 'Study Tips',
      image: '⏰',
    }
  ]

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Header showAuth={true} />

      <Container size="2xl" className="pt-48 pb-24 relative">
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-24"
            >
              <div className="flex flex-col items-center text-center space-y-8">
                <Badge variant="secondary" className="px-4 py-2 rounded-full text-sm font-semibold">
                  Intel Archive
                </Badge>
                <h1 className="text-6xl md:text-8xl font-display font-semibold tracking-tighter uppercase leading-tight pb-4">
                  Tactical <br />
                  <span className="text-gradient pr-4">
                    Insights
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-medium opacity-80">
                  Deep-dive strategies and field intel from the Examessy engineering and academic team.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Card 
                    key={post.id}
                    className="h-full group hover:border-primary/30 transition-all duration-700 overflow-hidden cursor-pointer border border-white/5 bg-white/[0.01]"
                    onClick={() => setSelectedExam(post)}
                  >
                    <CardContent className="p-10 flex flex-col gap-8 h-full">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="font-mono font-semibold uppercase text-[10px] tracking-wide">
                          {post.category}
                        </Badge>
                        <div className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110">
                          {post.image}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-3xl font-display font-semibold tracking-tighter uppercase group-hover:text-primary transition-colors leading-none">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase opacity-50">
                          <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.readTime}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <Button 
                variant="ghost" 
                onClick={() => setSelectedExam(null)}
                className="mb-12 group text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Return to Archive
              </Button>

              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="text-primary uppercase font-semibold">{selectedPost.category}</Badge>
                    <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wide">{selectedPost.readTime}</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tighter uppercase leading-none text-foreground">
                    {selectedPost.title}
                  </h1>
                  <div className="flex items-center gap-8 py-8 border-y border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">E</div>
                      <div>
                        <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">Author</p>
                        <p className="text-sm font-bold">Examessy Intel</p>
                      </div>
                    </div>
                    <div className="h-8 w-px bg-white/5" />
                    <div>
                      <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">Published</p>
                      <p className="text-sm font-bold">{selectedPost.date}</p>
                    </div>
                    <div className="ml-auto flex gap-4">
                       <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground hover:text-primary transition-all"><Share2 className="w-4 h-4" /></button>
                       <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground hover:text-primary transition-all"><Bookmark className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>

                <div className="prose prose-invert prose-2xl max-w-none font-clean font-medium text-muted-foreground leading-relaxed space-y-8">
                   {selectedPost.content.split('\n').map((para: string, i: number) => (
                     <p key={i}>{para.trim()}</p>
                   ))}
                </div>

                <div className="pt-20 border-t border-white/5">
                   <Card className="p-12 text-center space-y-8 border border-white/5 bg-white/[0.01]">
                      <h3 className="text-4xl font-display font-semibold tracking-tighter uppercase">
                        Ready to Apply This Intel?
                      </h3>
                      <p className="text-xl text-muted-foreground max-w-xl mx-auto">
                        Join the network today and initialize your personalized preparation sequence.
                      </p>
                      <Button className="h-14 px-12 rounded-2xl uppercase font-semibold tracking-wide bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all">
                        START MISSION - ₹99
                      </Button>
                   </Card>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      <Footer />
    </main>
  )
}
