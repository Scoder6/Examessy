'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Card, CardContent } from '@/components/card'
import { Badge } from '@/components/badge'
import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

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
    <main className="min-h-screen bg-background">
      <Header showAuth={true} />
      
      <section className="py-20 md:py-32">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Testimonials</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">What Our Students Say</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful students who have achieved their dreams with Examessy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <Quote className="w-8 h-8 text-primary/30 mb-4" />
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {testimonial.content}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                        {testimonial.image}
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.exam}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-semibold text-primary">{testimonial.score}</p>
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
