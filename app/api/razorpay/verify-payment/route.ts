import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, examType } = await request.json()

    // Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Get current user
    const supabase = createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Create or update student record
    const { data: existingStudent } = await supabase
      .from('students')
      .select('id')
      .eq('user_id', user.id)
      .single()

    let studentId = existingStudent?.id

    if (!studentId) {
      const { data: newStudent, error: createError } = await supabase
        .from('students')
        .insert({
          user_id: user.id,
          name: user.user_metadata?.name || user.email,
          email: user.email,
          exam_type: examType,
        })
        .select('id')
        .single()

      if (createError) {
        console.error('Error creating student:', createError)
        return NextResponse.json(
          { success: false, error: 'Failed to create student record' },
          { status: 500 }
        )
      }

      studentId = newStudent.id
    }

    // Record payment
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        student_id: studentId,
        razorpay_order_id,
        razorpay_payment_id,
        amount: 99,
        currency: 'INR',
        payment_status: 'completed',
      })

    if (paymentError) {
      console.error('Error recording payment:', paymentError)
      return NextResponse.json(
        { success: false, error: 'Failed to record payment' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { success: false, error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}
