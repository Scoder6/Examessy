import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

export async function GET(request: NextRequest) {
  const supabase = createClient()
  const searchParams = request.nextUrl.searchParams
  
  const examType = searchParams.get('examType')
  const subject = searchParams.get('subject')
  const chapter = searchParams.get('chapter')
  const year = searchParams.get('year')
  const difficulty = searchParams.get('difficulty')
  const limit = searchParams.get('limit')

  try {
    let query = supabase.from('questions').select('*')

    if (examType) query = query.eq('exam_type', examType)
    if (subject) query = query.eq('subject', subject)
    if (chapter) query = query.eq('chapter', chapter)
    if (year) query = query.eq('year', parseInt(year))
    if (difficulty) query = query.eq('difficulty', difficulty)
    if (limit) query = query.limit(parseInt(limit))

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data, count: data?.length || 0 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    )
  }
}
