import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Get student
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (studentError || !student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    // Insert test attempt
    const { data, error } = await supabase
      .from('test_attempts')
      .insert({
        student_id: student.id,
        exam_type: body.exam_type,
        test_name: body.test_name,
        score: body.score,
        total_marks: body.total_marks,
        duration_minutes: body.duration_minutes,
        attempted_questions: body.attempted_questions,
        correct_answers: body.correct_answers,
        wrong_answers: body.wrong_answers,
        accuracy: body.accuracy,
        rank: body.rank,
        percentile: body.percentile,
        test_date: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('Error inserting test attempt:', error)
      return NextResponse.json(
        { error: 'Failed to record test attempt' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in test attempt API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get student
    const { data: student } = await supabase
      .from('students')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    // Get test attempts
    const { data, error } = await supabase
      .from('test_attempts')
      .select('*')
      .eq('student_id', student.id)
      .order('test_date', { ascending: false })

    if (error) {
      console.error('Error fetching test attempts:', error)
      return NextResponse.json(
        { error: 'Failed to fetch test attempts' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in test attempt API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
