'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/card'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { MapPin, DollarSign, Clock, ArrowRight, Users, Rocket, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Careers() {
  const openings = [
    {
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '₹20-30 LPA',
      description: 'We are looking for an experienced Frontend Developer to lead our web development initiatives and build amazing user experiences.',
    },
    {
      title: 'Backend Engineer',
      department: 'Engineering',
      location: 'Bangalore',
      type: 'Full-time',
      salary: '₹18-25 LPA',
      description: 'Join our backend team to build scalable systems and APIs that power our exam preparation platform.',
    },
    {
      title: 'Content Creator - Physics',
      department: 'Content',
      location: 'Remote',
      type: 'Full-time',
      salary: '₹12-18 LPA',
      description: 'Create high-quality physics content for JEE and NEET preparation with detailed explanations and problem sets.',
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Bangalore',
      type: 'Full-time',
      salary: '₹25-35 LPA',
      description: 'Drive product strategy and work closely with engineering and content teams to deliver exceptional student experiences.',
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      salary: '₹15-22 LPA',
      description: 'Lead our marketing initiatives and help us reach more students across India with our platform.',
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      salary: '₹10-15 LPA',
      description: 'Ensure our students have the best experience and help them succeed in their exam preparation journey.',
    },
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Salary',
      description: 'Industry-leading compensation with regular performance reviews',
    },
    {
      icon: Clock,
      title: 'Flexible Work',
      description: 'Remote-first culture with flexible working hours',
    },
    {
      icon: Users,
      title: 'Great Team',
      description: 'Work with passionate and talented people',
    },
    {
      icon: Rocket,
      title: 'Growth Opportunities',
      description: 'Clear career path and learning opportunities',
    },
    {
      icon: Heart,
      title: 'Health Benefits',
      description: 'Comprehensive health insurance for you and family',
    },
    {
      icon: MapPin,
      title: 'Work From Anywhere',
      description: 'Choose to work from home or our Bangalore office',
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header showAuth={true} />
      
      <section className="py-20 md:py-32">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Careers</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Build the future of education with us. We're looking for passionate individuals who want to make a difference in students' lives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
            <div className="space-y-4">
              {openings.map((job, index) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                          <CardDescription className="mb-4">{job.description}</CardDescription>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">{job.department}</Badge>
                            <Badge variant="outline">
                              <MapPin className="w-3 h-3 mr-1" />
                              {job.location}
                            </Badge>
                            <Badge variant="outline">
                              <Clock className="w-3 h-3 mr-1" />
                              {job.type}
                            </Badge>
                            <Badge variant="outline">
                              <DollarSign className="w-3 h-3 mr-1" />
                              {job.salary}
                            </Badge>
                          </div>
                        </div>
                        <Button className="shrink-0">
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Don't See a Role That Fits?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Button size="lg" variant="outline" onClick={() => window.location.href = 'mailto:contact@examessy.com'}>
              Send Resume
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
