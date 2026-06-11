# Examessy - Student Data Management Platform

## Project Overview

A comprehensive exam preparation platform for collecting and managing student data across JEE Mains, NEET, VIT, and CBT exams. The platform features a quick ₹99 Razorpay payment gateway followed by a complete dashboard for tracking student performance analytics.

## Architecture

### Technology Stack
- **Frontend**: Next.js 16 (App Router), React 19
- **Backend**: Next.js API Routes
- **Database**: Supabase PostgreSQL with Row Level Security (RLS)
- **Authentication**: Supabase Auth
- **Payments**: Razorpay (₹99 one-time payment)
- **UI**: shadcn/ui, Tailwind CSS v4, Lucide React icons
- **Styling**: Gradient dark theme (slate-900 to blue)

### Database Schema

#### Tables Created:
1. **students** - Core student profile data
   - `id` (UUID, PK)
   - `user_id` (FK to auth.users)
   - `name`, `email`, `phone`
   - `exam_type` (JEE_MAINS, NEET, VIT, CBT)
   - `target_score`, `created_at`, `updated_at`

2. **payments** - Payment tracking
   - `id` (UUID, PK)
   - `user_id`, `student_id` (FKs)
   - `razorpay_order_id`, `razorpay_payment_id`
   - `amount` (₹99 default), `currency` (INR)
   - `payment_status` (pending/completed/failed/refunded)
   - `created_at`, `updated_at`

3. **test_attempts** - Student test performance data
   - `id` (UUID, PK)
   - `student_id` (FK)
   - `exam_type`, `test_name`
   - `score`, `total_marks`, `duration_minutes`
   - `attempted_questions`, `correct_answers`, `wrong_answers`
   - `accuracy`, `rank`, `percentile`
   - `test_date`, `created_at`

4. **exam_metadata** - Exam configuration
   - `id` (UUID, PK)
   - `exam_type` (UNIQUE)
   - `total_questions`, `total_marks`, `duration_minutes`
   - `exam_description`, `passing_score`

**Security**: All tables have Row Level Security (RLS) enabled with policies ensuring users can only access their own data.

---

## Pages & Features

### 1. Landing Page (`/`)
- **Hero Section**: Showcases platform value proposition
- **Features Cards**: 4 key benefits (Fast Setup, Track Progress, Multiple Exams, Compete)
- **Exam Selection Grid**: 4 exam options with hover effects
- **CTA Button**: Disabled until exam is selected, then navigates to payment
- **Navigation**: Sign In button in header

**Visual Style**:
- Dark gradient background (slate-900 to slate-800)
- Blue/cyan gradient text for headings
- Interactive exam cards with border color change on selection
- Responsive grid layout (mobile: 1 col, tablet: 2 cols, desktop: 4 cols)

### 2. Payment Page (`/payment`)
- **Exam Display**: Shows selected exam name
- **Price Card**: ₹99 one-time payment with lifetime access note
- **Razorpay Integration**: 
  - Creates order on backend
  - Opens Razorpay checkout
  - Verifies payment signature
  - Records payment in database
- **Status Handling**: Shows loading, success, error, and idle states
- **Security Features**: Trust indicators (SSL, encryption messaging)

**Payment Flow**:
1. User selects exam on landing page
2. Click "Proceed to Payment - ₹99"
3. Backend creates Razorpay order
4. Razorpay payment gateway opens
5. On success, payment verified and stored
6. User redirected to dashboard

### 3. Dashboard (`/dashboard`)
- **Protected Route**: Requires authentication
- **Student Header**: Welcome message with exam type
- **Analytics Stats Cards**:
  - Total Tests Taken
  - Average Score
  - Average Accuracy
  - Best Rank
- **Test History Table**: Displays all previous test attempts with:
  - Test name and score
  - Accuracy percentage
  - Percentile ranking
  - Rank achieved
  - Test date
- **Navigation**: Logout button in sticky header

### 4. Authentication Pages
- **Login** (`/auth/login`): Email/password login form
- **Sign Up** (`/auth/sign-up`): User registration with email verification
- **Error Page** (`/auth/error`): Auth error handling
- **Callback Route** (`/auth/callback`): OAuth/email confirmation callback

---

## API Endpoints

### Razorpay Integration
- **POST `/api/razorpay/create-order`**
  - Creates order on Razorpay
  - Returns: `{orderId, key}`
  - Input: `{amount, currency, examType}`

- **POST `/api/razorpay/verify-payment`**
  - Verifies payment signature
  - Records payment to Supabase
  - Creates student profile on first payment
  - Returns: `{success, paymentId}`
  - Input: `{razorpay_order_id, razorpay_payment_id, razorpay_signature, examType}`

### Student Data
- **POST/GET `/api/test-attempts`**
  - Records test performance
  - Retrieves student's test history
  - Requires authentication

---

## Key Features

### 1. Quick Payment Gateway
- Single ₹99 payment to unlock access
- Razorpay integration for secure transactions
- Payment status tracking (pending/completed/failed)
- Instant access after verification

### 2. Student Data Collection
- Automatic student profile creation after payment
- Profile linked to authenticated user via Supabase Auth
- Support for 4 exam types
- Optional target score setting

### 3. Performance Analytics
- Real-time dashboard with key metrics
- Test attempt history with detailed results
- Accuracy calculations (percentage of correct answers)
- Rank and percentile tracking
- Average score across all tests

### 4. Security & Privacy
- Supabase RLS ensures data isolation
- Row-level policies prevent unauthorized access
- Secure payment handling via Razorpay
- Email verification on signup
- Password hashing via Supabase Auth

---

## User Flows

### First-Time User (Landing → Payment → Dashboard)
1. Visit landing page
2. Select exam (JEE Mains, NEET, VIT, or CBT)
3. Click "Proceed to Payment - ₹99"
4. Complete Razorpay checkout
5. Payment verified and recorded
6. Student profile auto-created
7. Redirected to dashboard

### Returning User (Login → Dashboard)
1. Click "Sign In" on landing
2. Enter email and password
3. Authenticated and redirected to dashboard
4. View analytics and test history

---

## Directory Structure

```
app/
├── page.tsx                          # Landing page
├── layout.tsx                        # Root layout with metadata
├── payment/
│   └── page.tsx                      # Payment page
├── dashboard/
│   └── page.tsx                      # Protected dashboard
├── auth/
│   ├── login/page.tsx                # Login form
│   ├── sign-up/page.tsx              # Sign-up form
│   ├── error/page.tsx                # Error page
│   └── callback/route.ts             # OAuth callback
└── api/
    ├── razorpay/
    │   ├── create-order/route.ts     # Create Razorpay order
    │   └── verify-payment/route.ts   # Verify payment & create student
    └── test-attempts/
        └── route.ts                  # Test attempt API
        
lib/
├── supabase/
│   ├── client.ts                     # Browser Supabase client
│   ├── server.ts                     # Server Supabase client
│   ├── proxy.ts                      # Session proxy handler
│   └── queries.ts                    # Database query functions
├── constants.ts                      # App constants (exams, pricing)
└── utils.ts                          # Utility functions

middleware.ts                         # Session management
components/ui/
└── button.tsx                        # shadcn Button component
```

---

## Environment Variables Required

```
# Supabase (auto-provided by integration)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Razorpay (user to add in Settings)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

---

## Future Enhancements

1. **Test Generation Module**: Integrate actual test questions and test taking interface
2. **Leaderboards**: Rank students globally or by exam
3. **Performance Reports**: PDF export of analytics
4. **Notifications**: Email updates on performance milestones
5. **Admin Dashboard**: Manage exams, monitor payments, view analytics
6. **Mobile App**: React Native version for iOS/Android
7. **Multiple Payment Methods**: Credit card, UPI, etc.
8. **Batch Uploads**: CSV import for test results
9. **Study Resources**: Link study materials to exams
10. **Progress Tracking**: Goal-based tracking and recommendations

---

## Technical Highlights

✅ **Production-Ready**:
- Proper error handling and validation
- RLS for data security
- Payment verification with signatures
- Auto-profile creation triggers
- Responsive design (mobile-first)

✅ **Performance**:
- Next.js 16 with Turbopack
- Optimized images and fonts
- Tailwind CSS v4 (minimal CSS)
- Server-side rendering where possible

✅ **Developer Experience**:
- TypeScript for type safety
- Modular component structure
- Clear separation of concerns
- Documented database schema
- Consistent styling patterns

---

## Testing the Platform

1. **Landing Page**: Select an exam and observe button state change
2. **Payment Flow**: Complete Razorpay test payment (use test card: 4111 1111 1111 1111)
3. **Dashboard**: View analytics after payment
4. **Authentication**: Test login/signup flows
5. **Data Persistence**: Verify data persists across page reloads

---

*Built with v0 | Powered by Next.js 16, Supabase, and Razorpay*
