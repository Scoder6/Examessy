import { createClient } from './client'

const supabase = createClient()

export interface Profile {
  id: string
  student_name: string
  father_name: string
  student_mobile: string
  father_mobile: string
  email: string
  address: string
  photo_url: string | null
  preparation_mode: 'online_coaching' | 'offline' | 'self_study'
  coaching_name: string | null
  created_at: string
  updated_at: string
}

export interface AcademicRecord {
  id: string
  profile_id: string
  tenth_marks: number
  twelfth_status: 'appearing' | 'pass'
  twelfth_percentage: number | null
  created_at: string
  updated_at: string
}

export interface TestSeries {
  id: string
  name: string
  exam_type: string
  subject: string
  total_marks: number
  duration_minutes: number
  created_at: string
}

export interface TestResult {
  id: string
  profile_id: string
  test_series_id: string
  marks_obtained: number
  percentage: number
  rank: number | null
  slab_marks: Record<string, number>
  attempted_at: string
}

export interface Question {
  id: string
  exam_type: string
  year: number
  subject: string
  chapter: string
  question_number: number | null
  question_text: string
  options: Record<string, string> | null
  correct_answer: string | null
  explanation: string | null
  difficulty: 'easy' | 'medium' | 'hard' | null
  topics: string[] | null
  image_url: string | null
  created_at: string
}

export interface UserProgress {
  id: string
  profile_id: string
  question_id: string
  attempted: boolean
  correct: boolean | null
  time_spent_seconds: number | null
  attempted_at: string
  questions?: Question
}

// Profile Operations
export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return data
}

export async function updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    console.error('Error updating profile:', error)
    return null
  }

  return data
}

export async function uploadPhoto(userId: string, file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('student-photos')
    .upload(fileName, file)

  if (error) {
    console.error('Error uploading photo:', error)
    return null
  }

  const { data: { publicUrl } } = supabase.storage
    .from('student-photos')
    .getPublicUrl(data.path)

  // Update profile with photo URL
  await updateProfile(userId, { photo_url: publicUrl })

  return publicUrl
}

// Academic Record Operations
export async function getAcademicRecord(userId: string): Promise<AcademicRecord | null> {
  const { data, error } = await supabase
    .from('academic_records')
    .select('*')
    .eq('profile_id', userId)
    .single()

  if (error) {
    console.error('Error fetching academic record:', error)
    return null
  }

  return data
}

export async function updateAcademicRecord(userId: string, updates: Partial<AcademicRecord>): Promise<AcademicRecord | null> {
  const { data, error } = await supabase
    .from('academic_records')
    .update(updates)
    .eq('profile_id', userId)
    .select()
    .single()

  if (error) {
    console.error('Error updating academic record:', error)
    return null
  }

  return data
}

// Test Series Operations
export async function getTestSeries(examType?: string): Promise<TestSeries[]> {
  let query = supabase.from('test_series').select('*')
  
  if (examType) {
    query = query.eq('exam_type', examType)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching test series:', error)
    return []
  }

  return data || []
}

export async function createTestSeries(testSeries: Omit<TestSeries, 'id' | 'created_at'>): Promise<TestSeries | null> {
  const { data, error } = await supabase
    .from('test_series')
    .insert(testSeries)
    .select()
    .single()

  if (error) {
    console.error('Error creating test series:', error)
    return null
  }

  return data
}

// Test Result Operations
export async function getTestResults(userId: string): Promise<TestResult[]> {
  const { data, error } = await supabase
    .from('test_results')
    .select('*, test_series(*)')
    .eq('profile_id', userId)

  if (error) {
    console.error('Error fetching test results:', error)
    return []
  }

  return data || []
}

export async function saveTestResult(testResult: Omit<TestResult, 'id' | 'attempted_at'>): Promise<TestResult | null> {
  const { data, error } = await supabase
    .from('test_results')
    .insert(testResult)
    .select()
    .single()

  if (error) {
    console.error('Error saving test result:', error)
    return null
  }

  return data
}

export async function updateTestResult(id: string, updates: Partial<TestResult>): Promise<TestResult | null> {
  const { data, error } = await supabase
    .from('test_results')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating test result:', error)
    return null
  }

  return data
}

// Question Operations (PYQ)
export async function getQuestions(filters: {
  examType?: string
  year?: number
  subject?: string
  chapter?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  limit?: number
}): Promise<Question[]> {
  let query = supabase.from('questions').select('*')

  if (filters.examType) query = query.eq('exam_type', filters.examType)
  if (filters.year) query = query.eq('year', filters.year)
  if (filters.subject) query = query.eq('subject', filters.subject)
  if (filters.chapter) query = query.eq('chapter', filters.chapter)
  if (filters.difficulty) query = query.eq('difficulty', filters.difficulty)
  if (filters.limit) query = query.limit(filters.limit)

  const { data, error } = await query

  if (error) {
    console.error('Error fetching questions:', error)
    return []
  }

  return data || []
}

export async function getQuestionById(id: string): Promise<Question | null> {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching question:', error)
    return null
  }

  return data
}

export async function createQuestion(question: Omit<Question, 'id' | 'created_at'>): Promise<Question | null> {
  const { data, error } = await supabase
    .from('questions')
    .insert(question)
    .select()
    .single()

  if (error) {
    console.error('Error creating question:', error)
    return null
  }

  return data
}

// User Progress Operations
export async function getUserProgress(userId: string): Promise<UserProgress[]> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*, questions(*)')
    .eq('profile_id', userId)

  if (error) {
    console.error('Error fetching user progress:', error)
    return []
  }

  return data || []
}

export async function updateProgress(userId: string, questionId: string, progress: {
  attempted: boolean
  correct?: boolean
  time_spent_seconds?: number
}): Promise<UserProgress | null> {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      profile_id: userId,
      question_id: questionId,
      ...progress
    })
    .select()
    .single()

  if (error) {
    console.error('Error updating progress:', error)
    return null
  }

  return data
}

export async function getProgressStats(userId: string) {
  const progress = await getUserProgress(userId)
  
  const stats = {
    totalAttempted: progress.filter(p => p.attempted).length,
    totalCorrect: progress.filter(p => p.correct).length,
    averageTime: progress.reduce((acc, p) => acc + (p.time_spent_seconds || 0), 0) / progress.length || 0,
    bySubject: {} as Record<string, { attempted: number; correct: number }>,
    byDifficulty: {
      easy: { attempted: 0, correct: 0 },
      medium: { attempted: 0, correct: 0 },
      hard: { attempted: 0, correct: 0 }
    } as Record<string, { attempted: number; correct: number }>
  }

  progress.forEach(p => {
    if (p.questions) {
      const subject = p.questions.subject
      const difficulty = p.questions.difficulty

      if (!stats.bySubject[subject]) {
        stats.bySubject[subject] = { attempted: 0, correct: 0 }
      }

      if (p.attempted) {
        stats.bySubject[subject].attempted++
        if (difficulty && stats.byDifficulty[difficulty]) {
          stats.byDifficulty[difficulty].attempted++
        }
      }

      if (p.correct) {
        stats.bySubject[subject].correct++
        if (difficulty && stats.byDifficulty[difficulty]) {
          stats.byDifficulty[difficulty].correct++
        }
      }
    }
  })

  return stats
}
