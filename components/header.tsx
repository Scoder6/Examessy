'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from './button'
import { Container } from './container'
import { ThemeToggle } from './theme-toggle'
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X, ArrowRight, Zap, ChevronDown, Users, Sparkles } from 'lucide-react'
import { JEEIcon } from '@/components/icons/jee-icon'
import { NEETIcon } from '@/components/icons/neet-icon'
import { VITIcon } from '@/components/icons/vit-icon'
import { CBTIcon } from '@/components/icons/cbt-icon'

export interface NavItem {
  label: string
  href: string
}

interface HeaderProps {
  navItems?: NavItem[]
  showAuth?: boolean
  onSignOut?: () => void
  isAuthenticated?: boolean
}

const defaultNavItems: NavItem[] = [
  { label: 'Exams', href: '/exams' },
  { label: 'Results', href: '/#results' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
]

const megaMenuContent = {
  Exams: {
    items: [
      { label: 'JEE Mains', href: '/exams', icon: JEEIcon, desc: 'National Engineering Entrance' },
      { label: 'NEET', href: '/exams', icon: NEETIcon, desc: 'Medical Entrance Test' },
      { label: 'VITEEE', href: '/exams', icon: VITIcon, desc: 'VIT Engineering Exam' },
      { label: 'CBT', href: '/exams', icon: CBTIcon, desc: 'Common Based Test' },
    ],
  },
  Results: {
    items: [
      { label: 'Top Rankers', href: '/#results', icon: Trophy, desc: 'Our 99.9% percentilers' },
      { label: 'Testimonials', href: '/testimonials', icon: Users, desc: 'Student success stories' },
      { label: 'Success Rate', href: '/#stats', icon: Sparkles, desc: 'Proven track record' },
    ],
  },
}

function Trophy({ className }: { className?: string }) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>}

export function Header({
  navItems = [],
  showAuth = true,
  onSignOut,
  isAuthenticated = false,
}: HeaderProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [activeMega, setActiveMega] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const lastScroll = useRef(0)
  const headerRef = useRef<HTMLElement>(null)
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = lastScroll.current
    lastScroll.current = latest
    setScrolled(latest > 50)
    if (latest > previous && latest > 200) {
      setHidden(true)
      setActiveMega(null)
    } else {
      setHidden(false)
    }
  })

  useEffect(() => {
    setIsOpen(false)
  }, [router])

  const displayNavItems = navItems.length > 0 ? navItems : defaultNavItems

  const handleMegaEnter = (label: string) => {
    clearTimeout(megaTimeout.current)
    setActiveMega(label)
  }

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => {
      setActiveMega(null)
    }, 150)
  }

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hidden ? '-translate-y-[110%]' : 'translate-y-0'
      } ${scrolled ? 'bg-background/85 backdrop-blur-2xl shadow-[0_1px_0_rgba(255,255,255,0.05)]' : 'bg-transparent'}`}
    >
      <div className="w-full border-b border-white/[0.03]">
        <Container size="2xl">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-4 group relative">
              <motion.div
                className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent animate-gradient-shift rounded-2xl" />
                <div className="absolute inset-[2px] bg-background rounded-[10px] flex items-center justify-center">
                  <motion.div
                    className="relative w-8 h-8 md:w-10 md:h-10"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Image src="/logo.png" alt="Logo" fill className="object-contain p-0.5" />
                  </motion.div>
                </div>
                <motion.div
                  className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40 blur-md -z-10"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl md:text-2xl tracking-tight leading-none text-foreground">
                  EXAMES
                  <span className="text-primary">SY</span>
                </span>
                <span className="text-[7px] md:text-[9px] font-mono font-bold tracking-[0.3em] text-muted-foreground/60 uppercase mt-0.5">
                  Precision Prep
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1" onMouseLeave={handleMegaLeave}>
              {displayNavItems.map((item) => {
                const mega = (megaMenuContent as any)[item.label]
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => handleMegaEnter(item.label)}
                  >
                    <Link
                      href={item.href}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-1.5 group ${
                        activeMega === item.label
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                      }`}
                    >
                      {item.label}
                      {mega && (
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMega === item.label ? 'rotate-180' : ''}`} />
                      )}
                    </Link>

                    {mega && activeMega === item.label && (
                      <div
                        className="absolute top-full left-0 pt-2"
                        onMouseEnter={() => handleMegaEnter(item.label)}
                        onMouseLeave={handleMegaLeave}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="bg-background/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/20 p-3 min-w-[280px]"
                        >
                          {mega.items.map((sub: any, i: number) => (
                            <Link
                              key={i}
                              href={sub.href}
                              className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-primary/10 transition-all duration-200 group/item"
                            >
                              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300">
                                <sub.icon className="w-5 h-5" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground">{sub.label}</span>
                                <span className="text-xs text-muted-foreground/60">{sub.desc}</span>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3">
                <ThemeToggle />
                {showAuth && (
                  <div className="flex items-center gap-2">
                    {isAuthenticated ? (
                      <Button variant="glass" size="sm" onClick={onSignOut}>
                        SIGN OUT
                      </Button>
                    ) : (
                      <>
                        <Link href="/auth/login">
                          <Button variant="ghost" size="sm" className="font-bold text-xs tracking-wider">
                            LOG IN
                          </Button>
                        </Link>
                        <Link href="/auth/sign-up">
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="relative px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-black text-xs tracking-widest shadow-[0_4px_14px_rgba(var(--primary-rgb),0.35)] hover:bg-primary/90 transition-colors overflow-hidden"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              ENLIST <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </motion.button>
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-11 h-11 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-foreground transition-all active:scale-90 hover:bg-muted"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </Container>
      </div>
    </header>
    
    {mounted && createPortal(
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999] lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-20 left-0 right-0 bottom-0 bg-background/99 backdrop-blur-2xl z-[1000] lg:hidden overflow-auto border-t border-border/50"
            >
            <Container className="py-8 flex flex-col min-h-[calc(100vh-5rem)]">
              <nav className="space-y-1 flex-1">
                {displayNavItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-6 py-5 rounded-2xl hover:bg-primary/[0.04] transition-all group"
                    >
                      <span className="text-2xl md:text-3xl font-display font-black tracking-tight text-foreground">
                        {item.label}
                      </span>
                      <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="space-y-4 pb-8 pt-6 border-t border-border">
                <div className="flex items-center justify-between px-2 mb-4">
                  <span className="text-xs font-bold tracking-widest text-muted-foreground/40 uppercase">Access</span>
                  <ThemeToggle />
                </div>
                {showAuth && (
                  <div className="flex flex-col gap-3">
                    {isAuthenticated ? (
                      <Button variant="default" size="xl" onClick={onSignOut} className="h-16 text-lg font-black rounded-2xl w-full">
                        SIGN OUT
                      </Button>
                    ) : (
                      <>
                        <Link href="/auth/sign-up" className="w-full" onClick={() => setIsOpen(false)}>
                          <Button variant="default" size="xl" className="h-16 text-lg font-black rounded-2xl w-full shadow-2xl shadow-primary/20">
                            JOIN NOW
                          </Button>
                        </Link>
                        <Link href="/auth/login" className="w-full" onClick={() => setIsOpen(false)}>
                          <Button variant="glass" size="xl" className="h-16 text-lg font-black rounded-2xl w-full">
                            LOG IN
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </Container>
          </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body
    )}
  </>
  )
}
