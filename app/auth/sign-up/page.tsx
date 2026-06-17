'use client'

import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/input'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight, AlertCircle, Users, Target, Rocket, Shield, Camera, GraduationCap, Phone, Mail, MapPin, BookOpen, CheckCircle2, User, Lock, ChevronRight, Sparkles, Map } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/button'
import { Card, CardContent } from '@/components/card'
import { Badge } from '@/components/badge'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    studentMobile: '',
    fatherMobile: '',
    email: '',
    password: '',
    repeatPassword: '',
    tenthMarks: '',
    twelfthStatus: 'appearing',
    twelfthPercentage: '',
    address: '',
    photo: null as File | null,
    preparationMode: '',
    coachingName: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingLocation, setIsFetchingLocation] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (formData.password !== formData.repeatPassword) {
      setError('System Conflict: Passwords do not match')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Security Protocol: Password must be at least 8 characters')
      setIsLoading(false)
      return
    }

    if (formData.twelfthStatus === 'pass' && !formData.twelfthPercentage) {
      setError('Academic Record: Please provide 12th percentage')
      setIsLoading(false)
      return
    }

    try {
      // Upload photo if provided
      let photoUrl = null
      if (formData.photo) {
        const fileExt = formData.photo.name.split('.').pop()
        const fileName = `temp_${Date.now()}.${fileExt}`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('student-photos')
          .upload(fileName, formData.photo)

        if (uploadError) {
          console.error('Photo upload error:', uploadError)
          // Continue without photo if upload fails
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from('student-photos')
            .getPublicUrl(uploadData.path)
          photoUrl = publicUrl
        }
      }

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
            `${window.location.origin}/auth/callback`,
          data: {
            student_name: formData.studentName,
            father_name: formData.fatherName,
            student_mobile: formData.studentMobile,
            father_mobile: formData.fatherMobile,
            tenth_marks: formData.tenthMarks,
            twelfth_status: formData.twelfthStatus,
            twelfth_percentage: formData.twelfthPercentage,
            address: formData.address,
            preparation_mode: formData.preparationMode,
            coaching_name: formData.coachingName,
            photo_url: photoUrl,
          },
        },
      })

      if (error) {
        // Handle specific error cases
        if (error.message.includes('User already registered')) {
          setError('An account with this email already exists. Please login instead.')
          setTimeout(() => router.push('/auth/login'), 2000)
          return
        }
        throw error
      }

      // Check if user needs email confirmation
      if (data.user && !data.session) {
        router.push('/auth/sign-up-success')
      } else if (data.session) {
        // Auto-login successful
        router.push('/')
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Registry Error: Failed to establish identity'
      
      // Handle specific error messages
      if (errorMessage.includes('duplicate key') || errorMessage.includes('already exists')) {
        setError('An account with this email already exists. Please login instead.')
        setTimeout(() => router.push('/auth/login'), 2000)
      } else if (errorMessage.includes('Invalid email')) {
        setError('Please enter a valid email address.')
      } else if (errorMessage.includes('Password')) {
        setError('Password must be at least 8 characters.')
      } else {
        setError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, photo: file })
    }
  }

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }

    setIsFetchingLocation(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
          const data = await response.json()
          if (data.display_name) {
            setFormData({ ...formData, address: data.display_name })
          }
        } catch (err) {
          setError('Failed to fetch address from location')
        } finally {
          setIsFetchingLocation(false)
        }
      },
      (err) => {
        setError('Unable to retrieve your location. Please enable location services.')
        setIsFetchingLocation(false)
      }
    )
  }

  const steps = [
    { id: 1, title: 'Personal', icon: User },
    { id: 2, title: 'Academic', icon: GraduationCap },
    { id: 3, title: 'Preparation', icon: BookOpen },
    { id: 4, title: 'Account', icon: Lock },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 selection:bg-primary/30">
      <Header showAuth={false} />
      
      <section className="relative min-h-screen flex items-center py-6 md:py-10 lg:py-16">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-6 shadow-lg shadow-primary/10"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold tracking-wide text-primary uppercase">Student Registration 2027</span>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-3">
              Create Your <span className="text-gradient">Academic Profile</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Join thousands of students preparing for top engineering and medical exams
            </p>
          </div>

          <Card className="border border-border-subtle/50 bg-gradient-to-br from-card via-card to-card-bg-subtle/50 shadow-2xl shadow-primary/5 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8 md:p-10 lg:p-14 xl:p-16">
              <form onSubmit={handleSignUp} className="space-y-8 md:space-y-10">
                
                {/* Step 1: Personal Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-border-subtle/50">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary shadow-lg shadow-primary/10">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold">Personal Information</h3>
                      <p className="text-sm text-muted-foreground">Basic details about you</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Student Name</label>
                      <Input
                        type="text"
                        placeholder="Full name as per documents"
                        required
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        disabled={isLoading}
                        className="h-12 bg-card-bg-subtle/50 border-border-subtle/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Father's Name</label>
                      <Input
                        type="text"
                        placeholder="Father's full name"
                        required
                        value={formData.fatherName}
                        onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                        disabled={isLoading}
                        className="h-12 bg-card-bg-subtle/50 border-border-subtle/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Student Mobile</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="tel"
                          placeholder="10-digit number"
                          required
                          pattern="[0-9]{10}"
                          value={formData.studentMobile}
                          onChange={(e) => setFormData({ ...formData, studentMobile: e.target.value })}
                          disabled={isLoading}
                          className="h-12 bg-card-bg-subtle/50 border-border-subtle/50 pl-12 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Father's Mobile</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="tel"
                          placeholder="10-digit number"
                          required
                          pattern="[0-9]{10}"
                          value={formData.fatherMobile}
                          onChange={(e) => setFormData({ ...formData, fatherMobile: e.target.value })}
                          disabled={isLoading}
                          className="h-12 bg-card-bg-subtle/50 border-border-subtle/50 pl-12 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                      <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          disabled={isLoading}
                          className="h-12 bg-card-bg-subtle/50 border-border-subtle/50 pl-12 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Address</label>
                      <button
                        type="button"
                        onClick={handleGetLocation}
                        disabled={isFetchingLocation || isLoading}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 text-primary text-xs font-semibold transition-all disabled:opacity-50 border border-primary/20"
                      >
                        {isFetchingLocation ? (
                          <>
                            <motion.div
                              className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            />
                            Fetching...
                          </>
                        ) : (
                          <>
                            <Map className="w-3 h-3" />
                            Auto-detect
                          </>
                        )}
                      </button>
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
                      <textarea
                        placeholder="Complete residential address"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        disabled={isLoading}
                        className="w-full min-h-[100px] px-12 py-4 rounded-xl border border-border-subtle/50 bg-card-bg-subtle/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/50 resize-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Student Photo</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        disabled={isLoading}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="flex items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed border-border-subtle/50 bg-card-bg-subtle/30 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all group"
                      >
                        {formData.photo ? (
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                            <span className="text-sm font-medium">{formData.photo.name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <Camera className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Upload passport size photo</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Step 2: Academic Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-border-subtle/50">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 flex items-center justify-center text-secondary shadow-lg shadow-secondary/10">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold">Academic Information</h3>
                      <p className="text-sm text-muted-foreground">Your educational background</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">10th Marks (%)</label>
                      <div className="relative">
                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="e.g., 85"
                          required
                          min="0"
                          max="100"
                          value={formData.tenthMarks}
                          onChange={(e) => setFormData({ ...formData, tenthMarks: e.target.value })}
                          disabled={isLoading}
                          className="h-12 bg-card-bg-subtle/50 border-border-subtle/50 pl-12 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">12th Status</label>
                      <select
                        required
                        value={formData.twelfthStatus}
                        onChange={(e) => setFormData({ ...formData, twelfthStatus: e.target.value })}
                        disabled={isLoading}
                        className="w-full h-12 px-4 rounded-xl border border-border-subtle/50 bg-card-bg-subtle/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/50"
                      >
                        <option value="appearing">Appearing</option>
                        <option value="pass">Passed</option>
                      </select>
                    </div>

                    {formData.twelfthStatus === 'pass' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-2"
                      >
                        <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">12th Percentage (%)</label>
                        <div className="relative">
                          <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="number"
                            placeholder="e.g., 78"
                            required
                            min="0"
                            max="100"
                            value={formData.twelfthPercentage}
                            onChange={(e) => setFormData({ ...formData, twelfthPercentage: e.target.value })}
                            disabled={isLoading}
                            className="h-12 bg-card-bg-subtle/50 border-border-subtle/50 pl-12 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Step 3: Preparation Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-border-subtle/50">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center text-accent shadow-lg shadow-accent/10">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold">Preparation Details</h3>
                      <p className="text-sm text-muted-foreground">How you're preparing</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <div className="space-y-3 sm:col-span-2 lg:col-span-3">
                      <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Preparation Mode</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['Online Coaching', 'Offline', 'Self Study'].map((mode) => (
                          <label
                            key={mode}
                            className={`relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all group ${
                              formData.preparationMode === mode
                                ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-lg shadow-primary/20'
                                : 'border-border-subtle/50 bg-card-bg-subtle/30 hover:border-primary/50 hover:bg-primary/5'
                            }`}
                          >
                            <input
                              type="radio"
                              name="preparationMode"
                              value={mode}
                              checked={formData.preparationMode === mode}
                              onChange={(e) => setFormData({ ...formData, preparationMode: e.target.value })}
                              disabled={isLoading}
                              className="hidden"
                            />
                            <span className="text-sm font-semibold">{mode}</span>
                            {formData.preparationMode === mode && (
                              <motion.div
                                layoutId="activeMode"
                                className="absolute inset-0 rounded-xl bg-primary/5"
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                              />
                            )}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 sm:col-span-2 lg:col-span-3">
                      <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Coaching Institute</label>
                      <div className="relative">
                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Name of coaching institute (if any)"
                          value={formData.coachingName}
                          onChange={(e) => setFormData({ ...formData, coachingName: e.target.value })}
                          disabled={isLoading}
                          className="h-12 bg-card-bg-subtle/50 border-border-subtle/50 pl-12 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Account Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-border-subtle/50">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary shadow-lg shadow-primary/10">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold">Account Security</h3>
                      <p className="text-sm text-muted-foreground">Create your login credentials</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Password</label>
                      <Input
                        type="password"
                        placeholder="Minimum 8 characters"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        disabled={isLoading}
                        className="h-12 bg-card-bg-subtle/50 border-border-subtle/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Confirm Password</label>
                      <Input
                        type="password"
                        placeholder="Re-enter password"
                        required
                        value={formData.repeatPassword}
                        onChange={(e) => setFormData({ ...formData, repeatPassword: e.target.value })}
                        disabled={isLoading}
                        className="h-12 bg-card-bg-subtle/50 border-border-subtle/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Test Series Preview */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border border-border-subtle/50 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-foreground">Test Series Performance</h4>
                    <Badge variant="outline" className="text-xs border-primary/20 bg-primary/5 text-primary">Preview</Badge>
                  </div>
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((slab) => (
                      <motion.div
                        key={slab}
                        whileHover={{ scale: 1.1 }}
                        className="aspect-square rounded-lg bg-card-bg-subtle/50 border border-border-subtle/50 flex items-center justify-center group hover:border-primary/50 hover:bg-primary/10 transition-all cursor-pointer"
                      >
                        <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">{slab}</span>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground/60 mt-3 text-center">Your test marks will appear here after completing tests</p>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-start gap-3 rounded-xl bg-destructive/10 border border-destructive/20 p-4"
                    >
                      <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      <p className="text-sm font-semibold text-destructive">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 text-base font-semibold rounded-2xl uppercase tracking-wide bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-3">
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      Creating Account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Complete Registration <ChevronRight className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
