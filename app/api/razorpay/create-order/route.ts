import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, examType } = await request.json()

    const order = await razorpayInstance.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency: currency || 'INR',
      receipt: `exam_${examType}_${Date.now()}`,
      notes: {
        examType,
      },
    })

    return NextResponse.json({
      orderId: order.id,
      key: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
