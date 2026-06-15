'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Card, CardContent } from '@/components/card'
import { Badge } from '@/components/badge'
import { Target, Users, Award, Lightbulb, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { DramaticReveal, DramaticCard, HoverSpotlight, GlitchText, MagneticButton, SparkButton, LiquidButton, StaggerGrid, ScrollingText, WordReveal, PulseBorder, ExplosiveCounter } from '@/components/dramatic/dramatic-effects'
import { AboutBackground } from '@/components/3d/page-scenes'
import { MouseSpotlight } from '@/components/mouse-spotlight'
import { ScrollProgress } from '@/components/scroll-progress'

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Student Success First',
      description: 'Every decision we make is centered around helping students achieve their academic goals.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'We believe in the power of community learning and peer support.',
    },
    {
      icon: Award,
      title: 'Excellence in Quality',
      description: 'We maintain the highest standards in content quality and accuracy.',
    },
    {
      icon: Lightbulb,
      title: 'Continuous Innovation',
      description: 'We constantly evolve our platform based on student feedback and technological advances.',
    },
  ]

  const stats = [
    { label: 'Students Helped', from: 0, to: 50000, suffix: '+' },
    { label: 'Test Series Created', from: 0, to: 10000, suffix: '+' },
    { label: 'Success Rate', from: 0, to: 92, suffix: '%' },
    { label: 'Expert Mentors', from: 0, to: 100, suffix: '+' },
  ]

  return (
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      <MouseSpotlight />
      <ScrollProgress />
      <AboutBackground />

      <Header showAuth={true} />
      
      <section className="py-20 md:py-32">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">About Us</Badge>
            <DramaticReveal direction="up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Empowering Students to Excel
              </h1>
            </DramaticReveal>
            <WordReveal
              text="Examessy was founded with a simple mission: to make high-quality exam preparation accessible to every student. We combine cutting-edge technology with expert content to help you achieve your dreams."
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            />
          </div>

          <ScrollingText
            texts={['STUDENT SUCCESS', 'COMMUNITY DRIVEN', 'EXCELLENCE', 'INNOVATION', 'AI ANALYTICS', 'QUALITY CONTENT']}
            speed={40}
            className="opacity-40 my-8"
          />

          {/* Stats */}
          <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat) => (
              <DramaticCard key={stat.label} glowColor="rgba(var(--primary-rgb),0.4)">
                <Card className="text-center hover:shadow-xl transition-shadow duration-300">
                  <HoverSpotlight>
                    <CardContent className="pt-6 pb-6">
                      <div className="text-3xl font-bold text-primary mb-2">
                        <ExplosiveCounter from={stat.from} to={stat.to} suffix={stat.suffix} duration={2} />
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </HoverSpotlight>
                </Card>
              </DramaticCard>
            ))}
          </StaggerGrid>

          <div className="mb-20">
            <DramaticReveal direction="scale">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Our Values
              </h2>
            </DramaticReveal>
            <StaggerGrid className="grid md:grid-cols-2 gap-6">
              {values.map((value) => (
                <DramaticCard key={value.title} glowColor="rgba(var(--primary-rgb),0.4)">
                  <Card className="hover:shadow-xl transition-shadow duration-300">
                    <HoverSpotlight>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <value.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">
                              <GlitchText text={value.title} />
                            </h3>
                            <p className="text-muted-foreground">{value.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </HoverSpotlight>
                  </Card>
                </DramaticCard>
              ))}
            </StaggerGrid>
          </div>

          <ScrollingText
            texts={['IITIAN FOUNDED', 'AI POWERED', 'STUDENT FIRST', 'AFFORDABLE', 'TRUSTED', 'INDIA WIDE']}
            speed={45}
            className="opacity-40 my-8"
            reverse
          />

          <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <DramaticReveal direction="left">
                  <h2 className="text-3xl font-bold mb-4">
                    Our Story
                  </h2>
                </DramaticReveal>
                <WordReveal
                  text="Examessy started as a small initiative by a group of IITians who wanted to democratize exam preparation. We noticed that quality test series were either too expensive or inaccessible to many students."
                  className="text-muted-foreground mb-4"
                />
                <p className="text-muted-foreground mb-4">
                  Today, we&apos;ve helped over 50,000 students achieve their dreams. Our platform uses AI-powered analytics to provide personalized learning paths, making exam preparation more efficient and effective.
                </p>
                <p className="text-muted-foreground">
                  We&apos;re committed to continuously improving our platform and adding new features based on student feedback. Our goal is to be the most trusted exam preparation platform in India.
                </p>
              </div>
              <div>
                <DramaticReveal direction="right">
                  <h3 className="font-semibold text-xl mb-4">
                    What Makes Us Different
                  </h3>
                </DramaticReveal>
                <ul className="space-y-3">
                  {[
                    'AI-powered performance analytics',
                    'Real exam-like test series',
                    'Detailed solutions and explanations',
                    'Affordable pricing for everyone',
                    'Community of motivated learners',
                    'Regular content updates',
                  ].map((item) => (
                    <motion.li
                      key={item}
                      className="flex items-center gap-2"
                      whileHover={{ x: 6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8">
                  <MagneticButton>
                    <SparkButton>
                      <LiquidButton className="h-12 px-8 rounded-xl font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-xl shadow-primary/25">
                        Join Our Community
                      </LiquidButton>
                    </SparkButton>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
