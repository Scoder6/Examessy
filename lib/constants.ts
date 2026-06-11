export const EXAM_TYPES = {
  JEE_MAINS: { label: 'JEE Mains', marks: 300, questions: 90, duration: 180 },
  NEET: { label: 'NEET', marks: 720, questions: 200, duration: 200 },
  VIT: { label: 'VIT', marks: 150, questions: 150, duration: 150 },
  CBT: { label: 'CBT', marks: 100, questions: 100, duration: 120 },
}

export const PAYMENT_CONFIG = {
  amount: 99 * 100, // Amount in paise (99 rupees)
  currency: 'INR',
  timeout: 600, // 10 minutes
}
