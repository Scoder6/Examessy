'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Mail, Heart, ArrowUp, MessageSquare, MapPin, Phone, ArrowUpRight, Sparkles, Zap, Globe, Users } from 'lucide-react'
import { Instagram } from '@/components/icons/instagram'

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setShowBackToTop(latest > 500)
    })
    return () => unsubscribe()
  }, [scrollY])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    product: [
      { label: 'Features', href: '/features' },
      { label: 'Exams', href: '/exams' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Testimonials', href: '/testimonials' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    support: [
      { label: 'FAQ', href: '/#faq' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Help Center', href: '/contact' },
    ],
  }

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/exa_measy?igsh=MWhiZHZsYXEyMHBkbA==', label: 'Instagram' },
    { icon: Mail, href: 'mailto:contact@examessy.com', label: 'Email' },
    { icon: MessageSquare, href: '#', label: 'Support' },
  ]

  const featuredStudents = [
    { name: 'Aarav Sharma', rank: 'AIR 3', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
    { name: 'Priya Verma', rank: 'AIR 7', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
    { name: 'Rahul Gupta', rank: 'AIR 42', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
  ]

  return (
    <footer className="relative pt-24 pb-28 md:pb-20 bg-background border-t border-white/[0.06] overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.01] to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Unique asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section - Takes 4 columns */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-14 h-14">
                  <motion.div 
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-secondary"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-1 rounded-xl bg-background overflow-hidden">
                    <Image
                      src="/logo.png"
                      alt="Examessy Logo"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>
                <span className="text-3xl font-display font-black tracking-tight">
                  EXAMES<span className="text-primary">SY</span>
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground/70 leading-relaxed">
              India&apos;s most trusted offline test series platform. Empowering 50,000+ students to achieve 99.9+ percentiles through rigorous practice and expert guidance.
            </p>

            <div className="space-y-3">
              <a href="mailto:contact@examessy.com" className="flex items-center gap-3 text-sm text-muted-foreground/60 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span>contact@examessy.com</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground/60">
                <MapPin className="w-4 h-4" />
                <span>50+ Centers Across India</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground/60">
                <Phone className="w-4 h-4" />
                <span>+91 1800-XXX-XXXX</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, i) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Featured Students Avatar Animation - Takes 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Our Toppers
            </h4>
            <div className="relative">
              {/* Animated avatar stack */}
              <div className="flex -space-x-4">
                {featuredStudents.map((student, i) => (
                  <motion.div
                    key={i}
                    className="relative w-16 h-16 rounded-full border-4 border-background overflow-hidden"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    whileHover={{ y: -8, scale: 1.1, zIndex: 10 }}
                  >
                    <Image
                      src={student.image}
                      alt={student.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-1 left-1 right-1 text-center">
                      <span className="text-[8px] font-bold text-white">{student.rank}</span>
                    </div>
                  </motion.div>
                ))}
                <motion.div 
                  className="w-16 h-16 rounded-full border-4 border-background bg-primary/10 flex items-center justify-center text-primary font-black text-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  +50K
                </motion.div>
              </div>
              
              {/* Floating success badges */}
              <motion.div 
                className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                99.9% Success
              </motion.div>
            </div>
            
            <p className="text-xs text-muted-foreground/60 mt-4">
              Join 50,000+ students who transformed their preparation into top ranks
            </p>
          </div>

          {/* Link Sections - Takes 4 columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  {title}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <motion.div whileHover={{ x: 4 }}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-1"
                        >
                          {link.label}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground/50">
              &copy; {new Date().getFullYear()} Examessy. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs">
              <Link href="/privacy" className="text-muted-foreground/50 hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground/50 hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-muted-foreground/50 hover:text-foreground transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-24 md:bottom-8 right-6 z-40 w-12 h-12 rounded-xl bg-background/90 backdrop-blur-xl border border-white/[0.1] shadow-lg flex items-center justify-center"
          >
            <ArrowUp className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}
