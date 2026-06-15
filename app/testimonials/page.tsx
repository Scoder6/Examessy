'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Card, CardContent } from '@/components/card'
import { Badge } from '@/components/badge'
import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import { TestimonialsBackground } from '@/components/3d/page-scenes'
import { DramaticReveal, DramaticCard, HoverSpotlight, GlitchText, StaggerGrid, ScrollingText, WordReveal } from '@/components/dramatic/dramatic-effects'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Rahul Sharma',
      exam: 'JEE Mains',
      score: '98.5 percentile',
      image: 'RS',
      content: 'Examessy transformed my preparation. The analytics helped me identify my weak areas and focus on them. I cracked JEE Mains with flying colors!',
      rating: 5,
    },
    {
      name: 'Priya Patel',
      exam: 'NEET',
      score: '680/720',
      image: 'PP',
      content: 'The test series are incredibly accurate and closely match the actual exam pattern. The detailed solutions were a game-changer for me.',
      rating: 5,
    },
    {
      name: 'Arjun Kumar',
      exam: 'VIT',
      score: 'Top 100',
      image: 'AK',
      content: 'Best platform for VIT preparation. The mock tests helped me understand the exam pattern and manage my time effectively.',
      rating: 5,
    },
    {
      name: 'Sneha Reddy',
      exam: 'CBT',
      score: '95%',
      image: 'SR',
      content: 'Affordable and high-quality content. The performance tracking feature is excellent. Highly recommended for all exam aspirants.',
      rating: 5,
    },
    {
      name: 'Vikram Singh',
      exam: 'JEE Mains',
      score: '99.2 percentile',
      image: 'VS',
      content: 'The analytics dashboard is incredible. It helped me track my progress and improve consistently. Worth every rupee!',
      rating: 5,
    },
    {
      name: 'Ananya Gupta',
      exam: 'NEET',
      score: '690/720',
      image: 'AG',
      content: 'Examessy provided me with the perfect practice material. The question quality is top-notch and explanations are detailed.',
      rating: 5,
    },
  ]

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <TestimonialsBackground />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] animate-orb" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] animate-orb" style={{ animationDelay: '-10s' }} />
      </div>
      <Header showAuth={true} />
      
      <section className="py-28 md:py-36">
        <Container>
          <DramaticReveal direction="up" className="text-center mb-16 space-y-4">
            <Badge variant="glass" className="px-5 py-1.5 rounded-full border-primary/20 text-primary font-bold tracking-wider text-[10px] uppercase">
              <Quote className="w-3.5 h-3.5 mr-1.5 inline" /> Success Stories
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[0.88]">
              What Our Students
              <br />
              <span className="text-primary">Say</span>
            </h1>
            <WordReveal
              text="Join thousands of successful students who have achieved their dreams with Examessy"
              className="text-lg text-muted-foreground/60 max-w-2xl mx-auto"
            />
          </DramaticReveal>

          <ScrollingText
            texts={['JEE Mains','NEET','VITEEE','CBT','AIR #3','AIR #7','99.9%ile','Top Rankers','Success Stories']}
            speed={35}
            className="mb-12 opacity-40"
          />

          <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <DramaticCard key={testimonial.name} className="rounded-3xl h-full" glowColor="rgba(var(--primary-rgb),0.3)">
                <HoverSpotlight>
                  <div className="h-full p-8 rounded-3xl border border-white/[0.05] bg-white/[0.01] space-y-6">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                      transition={{ duration: 6, repeat: Infinity, delay: index * 0.5 }}
                    >
                      <Quote className="w-8 h-8 text-primary/40" />
                    </motion.div>
                    <p className="text-muted-foreground/80 leading-relaxed text-sm">{testimonial.content}</p>
                    <div className="flex items-center gap-4 pt-2">
                      <motion.div
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shrink-0"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                      >
                        {testimonial.image}
                      </motion.div>
                      <div>
                        <h4 className="font-black font-display tracking-tight"><GlitchText text={testimonial.name} /></h4>
                        <p className="text-xs text-muted-foreground/50">{testimonial.exam}</p>
                        <div className="flex items-center gap-0.5 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 * i + index * 0.05 }}>
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/[0.05]">
                      <p className="text-sm font-black text-primary">{testimonial.score}</p>
                    </div>
                  </div>
                </HoverSpotlight>
              </DramaticCard>
            ))}
          </StaggerGrid>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
