import { createClient } from '@/lib/supabase/client'

interface Student {
  id: string
  name: string
  email: string
  phone: string
  exam_type: string
  target_score: number
  created_at: string
}

interface Payment {
  id: string
  razorpay_order_id: string
  razorpay_payment_id: string
  amount: number
  payment_status: string
  created_at: string
}

interface TestAttempt {
  id: string
  test_name: string
  score: number
  total_marks: number
  accuracy: number
  rank: number
  percentile: number
  test_date: string
}

export async function getStudentProfile(): Promise<Student | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    console.error('Error fetching student:', error)
    return null
  }

  return data
}

export async function createStudent(
  name: string,
  email: string,
  phone: string,
  examType: string,
  targetScore: number
): Promise<Student | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase
    .from('students')
    .insert([
      {
        user_id: user.id,
        name,
        email,
        phone,
        exam_type: examType,
        target_score: targetScore,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Error creating student:', error)
    return null
  }

  return data
}

export async function getPaymentHistory(): Promise<Payment[]> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching payments:', error)
    return []
  }

  return data || []
}

export async function getTestAttempts(): Promise<TestAttempt[]> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data: student } = await supabase
    .from('students')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!student) return []

  const { data, error } = await supabase
    .from('test_attempts')
    .select('*')
    .eq('student_id', student.id)
    .order('test_date', { ascending: false })

  if (error) {
    console.error('Error fetching test attempts:', error)
    return []
  }

  return data || []
}

export async function recordTestAttempt(
  testName: string,
  score: number,
  totalMarks: number,
  attemptedQuestions: number,
  correctAnswers: number,
  wrongAnswers: number
): Promise<TestAttempt | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: student } = await supabase
    .from('students')
    .select('id, exam_type')
    .eq('user_id', user.id)
    .single()

  if (!student) return null

  const accuracy = ((correctAnswers / attemptedQuestions) * 100).toFixed(2)

  const { data, error } = await supabase
    .from('test_attempts')
    .insert([
      {
        student_id: student.id,
        exam_type: student.exam_type,
        test_name: testName,
        score,
        total_marks: totalMarks,
        attempted_questions: attemptedQuestions,
        correct_answers: correctAnswers,
        wrong_answers: wrongAnswers,
        accuracy: parseFloat(accuracy as string),
        test_date: new Date().toISOString(),
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Error recording test attempt:', error)
    return null
  }

  return data
}
