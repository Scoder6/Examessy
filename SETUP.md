# Examessy Setup Guide

## Quick Start

### 1. Environment Setup
The following are already configured:
- ✅ Supabase integration connected
- ✅ Database schema created with tables and RLS policies
- ✅ Supabase auth middleware configured
- ✅ Next.js 16 with App Router
- ✅ TailwindCSS v4 with dark theme
- ✅ shadcn/ui components

### 2. Add Razorpay Keys
You need to add Razorpay API keys to enable payments:

1. Go to **Settings** (top right) → **Vars**
2. Add these environment variables:
   ```
   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   ```
3. Get these from your Razorpay Dashboard: https://dashboard.razorpay.com/

### 3. Development Server
Server is already running on `http://localhost:3000`

To restart if needed:
```bash
pnpm dev
```

### 4. Test the Flow

#### Landing Page
- URL: `http://localhost:3000`
- Select an exam (JEE Mains, NEET, VIT, or CBT)
- Click "Proceed to Payment - ₹99"

#### Payment Page
- URL: `http://localhost:3000/payment`
- Shows selected exam and ₹99 price
- Click "Pay ₹99 with Razorpay" to open checkout
- Use test card: `4111 1111 1111 1111` (with any future date and any CVV)

#### Dashboard
- URL: `http://localhost:3000/dashboard`
- Shows student analytics after payment
- Displays test history (currently empty, ready for test data)
- Logout button in header

#### Authentication
- Sign Up: `http://localhost:3000/auth/sign-up`
- Login: `http://localhost:3000/auth/login`
- Email verification required before dashboard access

---

## Database Schema

### Students Table
Stores user exam selection and profile info:
```
id (UUID) | user_id (FK) | name | email | phone | exam_type | target_score | created_at | updated_at
```

### Payments Table
Tracks all ₹99 payments:
```
id | user_id | student_id | razorpay_order_id | razorpay_payment_id | amount | currency | payment_status | created_at | updated_at
```

### Test Attempts Table
Stores student test performance data:
```
id | student_id | exam_type | test_name | score | total_marks | duration_minutes | attempted_questions | correct_answers | wrong_answers | accuracy | rank | percentile | test_date | created_at
```

### Exam Metadata Table
Contains exam configuration:
```
id | exam_type | total_questions | total_marks | duration_minutes | exam_description | passing_score | created_at
```

---

## API Routes

### Create Razorpay Order
```
POST /api/razorpay/create-order
{
  "amount": 99,
  "currency": "INR",
  "examType": "JEE_MAINS"
}

Response:
{
  "orderId": "order_xxx",
  "key": "rzp_test_xxx"
}
```

### Verify Payment
```
POST /api/razorpay/verify-payment
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "sig_xxx",
  "examType": "JEE_MAINS"
}

Response:
{
  "success": true,
  "paymentId": "pay_xxx"
}
```

### Record Test Attempt
```
POST /api/test-attempts
{
  "testName": "JEE Mains Mock 1",
  "score": 250,
  "totalMarks": 300,
  "attemptedQuestions": 85,
  "correctAnswers": 75,
  "wrongAnswers": 10
}

Response:
{
  "id": "attempt_xxx",
  "student_id": "student_xxx",
  "accuracy": 88.24,
  ...
}
```

---

## Key Features

### ✨ Fast Payment Flow
- Single click exam selection
- Quick Razorpay checkout (handles actual payments securely)
- Instant student profile creation
- Auto-redirect to dashboard

### 📊 Analytics Dashboard
- Student profile with selected exam
- 4 key metrics: Total Tests, Average Score, Average Accuracy, Best Rank
- Complete test history table with sorting
- Real-time data from Supabase

### 🔒 Security
- Row-Level Security on all tables (RLS policies)
- Supabase Auth with password hashing
- Payment signature verification
- CORS protection
- Email verification required

### 📱 Responsive Design
- Mobile-first approach
- Tailwind CSS dark theme
- Gradient accents (blue/cyan)
- Smooth animations and transitions

---

## Troubleshooting

### Payment not working?
- Check Razorpay keys are added in Settings → Vars
- Verify Razorpay test account is active
- Check browser console for errors

### Dashboard not loading?
- Ensure you're logged in (completed payment)
- Check Supabase connection in browser dev tools
- Verify student record was created after payment

### Database errors?
- Check RLS policies in Supabase dashboard
- Verify auth user is properly set in session
- Look at Supabase logs for permission errors

### Styling issues?
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
- Rebuild: `pnpm build`
- Check Tailwind CSS utility classes are valid

---

## Next Steps

1. **Add Test Data**: Use test-attempts API to simulate test records
2. **Implement Admin Dashboard**: View all payments and user analytics
3. **Add Leaderboards**: Rank users by score/percentile
4. **Email Notifications**: Send test results and performance alerts
5. **Payment Reports**: Generate invoices for successful payments

---

## Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Razorpay Integration**: https://razorpay.com/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com

---

## File Locations

| File | Purpose |
|------|---------|
| `app/page.tsx` | Landing page with exam selection |
| `app/payment/page.tsx` | Payment gateway page |
| `app/dashboard/page.tsx` | Student analytics dashboard |
| `app/api/razorpay/create-order/route.ts` | Create payment order |
| `app/api/razorpay/verify-payment/route.ts` | Verify and record payment |
| `lib/supabase/queries.ts` | Database query functions |
| `middleware.ts` | Session management |
| `PROJECT_SUMMARY.md` | Full project documentation |

---

**Ready to launch! 🚀**
