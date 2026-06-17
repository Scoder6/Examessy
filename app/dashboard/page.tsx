'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Footer } from '@/components/footer'
import { BarChart3, TrendingUp, Trophy, BookOpen, ArrowUpRight, Target, Clock, Zap, Calendar, ChevronRight, Activity, Filter, Download, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface StudentData {
  id: string
  name: string
  email: string
  exam_type: string
  target_score: number | null
  created_at: string
}

interface TestAttempt {
  id: string
  test_name: string
  score: number
  total_marks: number
  accuracy: number
  percentile: number
  rank: number
  test_date: string
}

export default function Dashboard() {
  const router = useRouter()
  const [student, setStudent] = useState<StudentData | null>(null)
  const [testAttempts, setTestAttempts] = useState<TestAttempt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const supabase = createClient()
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
          router.push('/auth/login')
          return
        }

        const { data: studentData, error: studentError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (studentError) {
          if (studentError.code === 'PGRST116') {
            router.push('/auth/sign-up')
          } else {
            console.error('Student data error:', studentError)
            setError('Failed to load profile data')
          }
          return
        }

        setStudent({
          id: studentData.id,
          name: studentData.student_name,
          email: studentData.email,
          exam_type: 'JEE_MAINS', // Default for now, can be added to profiles later
          target_score: null,
          created_at: studentData.created_at
        })

        const { data: attempts, error: attemptsError } = await supabase
          .from('test_results')
          .select('*, test_series(name, total_marks)')
          .eq('profile_id', studentData.id)
          .order('attempted_at', { ascending: false })

        if (!attemptsError && attempts) {
          const formattedAttempts = attempts.map(attempt => ({
            id: attempt.id,
            test_name: attempt.test_series?.name || 'Unknown Test',
            score: Number(attempt.marks_obtained),
            total_marks: attempt.test_series?.total_marks || 100,
            accuracy: Number(attempt.percentage),
            percentile: 0, // Can be calculated later
            rank: attempt.rank || 0,
            test_date: attempt.attempted_at
          }))
          setTestAttempts(formattedAttempts)
        }
      } catch (err) {
        console.error('Dashboard error:', err)
        setError('Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleInitiateTest = () => {
    router.push('/pyq')
  }

  const handleUpdateGoal = () => {
    // For now, just show an alert. In future, open a modal
    alert('Goal update feature coming soon!')
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'Schedule Mock Test':
        router.push('/pyq')
        break
      case 'Review Mistakes':
        router.push('/pyq')
        break
      case 'Compare with Peers':
        alert('Peer comparison feature coming soon!')
        break
      default:
        break
    }
  }

  const handleIntelExport = () => {
    alert('Intel export feature coming soon!')
  }

  const avgScore = testAttempts.length > 0
    ? Math.round(testAttempts.reduce((sum, t) => sum + t.score, 0) / testAttempts.length)
    : 0

  const avgAccuracy = testAttempts.length > 0
    ? Math.round(testAttempts.reduce((sum, t) => sum + t.accuracy, 0) / testAttempts.length)
    : 0

  const bestRank = testAttempts.length > 0
    ? Math.min(...testAttempts.map(t => t.rank))
    : 0

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header showAuth={false} />
        <Container className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-white/5 rounded-2xl" />
            ))}
          </div>
          <div className="h-[400px] bg-white/5 rounded-2xl" />
        </Container>
      </main>
    )
  }

  if (error || !student) {
    return (
      <main className="min-h-screen bg-background">
        <Header showAuth={false} />
        <Container className="py-20 text-center space-y-6">
          <Card className="max-w-md mx-auto p-12 border border-white/5 bg-white/[0.01]">
            <p className="text-destructive font-semibold mb-6">{error || 'Failed to load profile'}</p>
            <Button variant="default" onClick={() => router.push('/')}>Back to Home</Button>
          </Card>
        </Container>
      </main>
    )
  }

  const examName = {
    'JEE_MAINS': 'JEE Mains',
    'JEE_ADVANCED': 'JEE Advanced',
    'NEET': 'NEET',
    'VIT': 'VIT',
    'BITSAT': 'BITSAT',
    'MANIPAL': 'Manipal',
  }[student.exam_type] || student.exam_type

  const stats = [
    { label: 'Total Tests', value: testAttempts.length, numericValue: testAttempts.length, icon: BookOpen, color: 'text-blue-500', suffix: '' },
    { label: 'Avg Score', value: avgScore, numericValue: avgScore, icon: TrendingUp, color: 'text-green-500', suffix: '' },
    { label: 'Avg Accuracy', value: avgAccuracy, numericValue: avgAccuracy, icon: Activity, color: 'text-purple-500', suffix: '%' },
    { label: 'Best Rank', value: bestRank, numericValue: bestRank, icon: Trophy, color: 'text-yellow-500', suffix: '' },
  ]

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Header showAuth={true} isAuthenticated={true} onSignOut={handleLogout} />

      <Container size="2xl" className="py-32">

        {/* Dashboard Header - Massive Style */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 rounded-full text-sm font-semibold">
                {examName} Sector
              </Badge>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase opacity-50">Live Sync</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tighter uppercase leading-tight">
              Welcome back, <br />
              <span className="text-gradient">
                {student.name.split(' ')[0]}
              </span>
            </h1>
            
            <div className="flex items-center gap-6 pt-2">
              <div className="flex flex-col">
                <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase opacity-50">Status</span>
                <span className="text-sm font-semibold font-mono">ELITE ASPIRANT</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase opacity-50">Member Since</span>
                <span className="text-sm font-semibold font-mono">{new Date(student.created_at).getFullYear()}</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-wrap gap-4"
          >
            <Button onClick={handleIntelExport} variant="outline" className="rounded-2xl border border-white/20 font-semibold tracking-wide uppercase h-14 px-8 bg-white/5 text-foreground">
              <Download className="w-5 h-5 mr-3 inline" /> Intel Export
            </Button>
            <Button onClick={handleInitiateTest} className="rounded-2xl font-semibold tracking-wide uppercase h-14 px-12 shadow-lg shadow-primary/30 bg-primary text-primary-foreground">
              INITIATE TEST <ArrowUpRight className="w-6 h-6 ml-3 inline" />
            </Button>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border border-white/5 bg-white/[0.01] group hover:border-primary/30 transition-all duration-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-xl bg-white/5 ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wide">
                      Live
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
                    <p className="text-3xl font-display font-semibold tracking-tight">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {stat.value}{stat.suffix}
                      </motion.span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Test History - Larger Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="h-full overflow-hidden border border-white/5 bg-white/[0.01]">
              <CardHeader className="border-b border-white/5 bg-white/[0.02] p-6 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-display">Recent Performance</CardTitle>
                  <CardDescription>A detailed breakdown of your latest test attempts</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="rounded-lg" onClick={() => alert('Filter feature coming soon!')}>
                  <Filter className="w-4 h-4 mr-2" /> Filter
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/[0.01]">
                        <th className="px-6 py-4 text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">Test Name</th>
                        <th className="px-6 py-4 text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">Score</th>
                        <th className="px-6 py-4 text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">Accuracy</th>
                        <th className="px-6 py-4 text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">Rank</th>
                        <th className="px-6 py-4 text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <AnimatePresence>
                        {testAttempts.length > 0 ? (
                          testAttempts.map((test, i) => (
                            <motion.tr 
                              key={test.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: i * 0.05 }}
                              whileHover={{ x: 3 }}
                              className="group hover:bg-white/[0.02] transition-colors"
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                  <span className="font-semibold text-foreground">{test.test_name}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="font-mono text-foreground">{test.score}</span>
                                <span className="text-muted-foreground">/{test.total_marks}</span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-gradient-to-r from-primary to-accent"
                                      style={{ width: `${test.accuracy}%` }}
                                    />
                                  </div>
                                  <span className="font-mono text-xs">{test.accuracy}%</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <Badge variant="secondary" className="bg-white/5 font-mono">#{test.rank}</Badge>
                              </td>
                              <td className="px-6 py-4 text-sm text-muted-foreground font-clean">
                                {new Date(test.test_date).toLocaleDateString()}
                              </td>
                            </motion.tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-6 py-20 text-center text-muted-foreground">
                              No test attempts recorded yet.
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Side Info Cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-8 space-y-6 border border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xl">Target Score</h3>
                    <p className="text-sm text-muted-foreground">Your current goal for {examName}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-4xl font-display font-semibold">
                      {student.target_score || 'N/A'}
                    </span>
                    <span className="text-sm font-mono text-primary">+15% vs last week</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
                    />
                  </div>
                </div>
                <Button onClick={handleUpdateGoal} className="w-full rounded-xl border border-white/10 bg-white/5 h-12 font-semibold text-sm">
                  Update Goal
                </Button>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-8 border border-white/5 bg-white/[0.01]">
                <h3 className="font-display font-semibold text-xl mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" /> Quick Actions
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Schedule Mock Test', icon: Calendar },
                    { label: 'Review Mistakes', icon: Clock },
                    { label: 'Compare with Peers', icon: Users },
                  ].map((action, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      onClick={() => handleQuickAction(action.label)}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <action.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium">{action.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                    </Button>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  )
}
