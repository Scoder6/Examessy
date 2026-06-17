'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Card, CardContent } from '@/components/card'
import { Badge } from '@/components/badge'
import { Star, Quote, Medal } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Rahul Sharma',
      exam: 'JEE Mains',
      score: '98.5 percentile',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      gradient: 'from-blue-500 to-indigo-600',
      content: 'Examessy transformed my preparation. The analytics helped me identify my weak areas and focus on them. I cracked JEE Mains with flying colors!',
      rating: 5,
    },
    {
      name: 'Priya Patel',
      exam: 'NEET',
      score: '680/720',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      gradient: 'from-emerald-500 to-teal-600',
      content: 'The test series are incredibly accurate and closely match the actual exam pattern. The detailed solutions were a game-changer for me.',
      rating: 5,
    },
    {
      name: 'Arjun Kumar',
      exam: 'VIT',
      score: 'Top 100',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      gradient: 'from-amber-500 to-orange-600',
      content: 'Best platform for VIT preparation. The mock tests helped me understand the exam pattern and manage my time effectively.',
      rating: 5,
    },
    {
      name: 'Sneha Reddy',
      exam: 'BITSAT',
      score: 'Top 100',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      gradient: 'from-cyan-500 to-blue-600',
      content: 'Affordable and high-quality content. The performance tracking feature is excellent. Highly recommended for all exam aspirants.',
      rating: 5,
    },
    {
      name: 'Vikram Singh',
      exam: 'JEE Mains',
      score: '99.2 percentile',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      gradient: 'from-purple-500 to-violet-600',
      content: 'The analytics dashboard is incredible. It helped me track my progress and improve consistently. Worth every rupee!',
      rating: 5,
    },
    {
      name: 'Ananya Gupta',
      exam: 'NEET',
      score: '690/720',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      gradient: 'from-pink-500 to-rose-600',
      content: 'Examessy provided me with the perfect practice material. The question quality is top-notch and explanations are detailed.',
      rating: 5,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header showAuth={true} />
      
      <section className="py-28 md:py-36">
        <Container>
          <div className="text-center mb-16 space-y-4">
            <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-xs font-semibold">
              <Quote className="w-3.5 h-3.5 mr-1.5 inline" /> Success Stories
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tighter leading-tight">
              What Our Students
              <br />
              <span className="text-primary">Say</span>
            </h1>
            <p className="text-lg text-muted-foreground/60 max-w-2xl mx-auto">
              Join thousands of successful students who have achieved their dreams with Examessy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name} className="rounded-3xl h-full border border-white/[0.05] bg-white/[0.01]">
                <CardContent className="h-full p-8 space-y-6">
                  <Quote className="w-8 h-8 text-primary/40" />
                  <p className="text-muted-foreground/80 leading-relaxed text-sm">{testimonial.content}</p>
                  <div className="flex items-center gap-4 pt-2">
                    <div className="relative">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 flex-shrink-0 ring-2 ring-white/5 shadow-lg">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center border-2 border-background shadow-md`}>
                        <Medal className="w-2 h-2 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold font-display tracking-tight">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground/50">{testimonial.exam}</p>
                      <div className="flex items-center gap-0.5 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/[0.05]">
                    <p className="text-sm font-semibold text-primary">{testimonial.score}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
