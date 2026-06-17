# Backend Architecture Recommendation

## Overview
This document outlines the recommended backend architecture for the Examessy student data application, focusing on speed, scalability, security, and minimal configuration.

## Recommended Stack

### Database: PostgreSQL (via Supabase)
**Why PostgreSQL?**
- **Fast**: Optimized for complex queries, excellent indexing
- **Scalable**: Handles millions of records efficiently
- **Relational**: Perfect for student data structure
- **Feature-rich**: JSONB support for flexible data (questions, test results)
- **Secure**: Row-level security, encryption at rest
- **Mature**: Battle-tested, extensive ecosystem

### Backend: Supabase (PostgreSQL + Edge Functions)
**Why Supabase?**
- **Already in use**: You're using Supabase auth in the frontend
- **Minimal config**: Zero backend setup required
- **Fast**: PostgreSQL + Edge functions (Vercel Edge Network)
- **Scalable**: Auto-scaling, no server management
- **Secure**: Built-in RLS policies, authentication
- **Real-time**: Live updates for test results, leaderboards
- **Storage**: Built-in file storage for photos, documents
- **API**: Auto-generated REST & GraphQL APIs

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                        │
│  - Sign-up/Sign-in (Supabase Auth)                           │
│  - Student Profile Forms                                     │
│  - Test Series Interface                                     │
│  - PYQ Display (/pyq/jee_advanced)                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Supabase Client SDK
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                    Supabase Platform                         │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Authentication (Auth)                                │  │
│  │  - Email/Password signup                              │  │
│  │  - Session management                                 │  │
│  │  - User metadata storage                              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  PostgreSQL Database                                   │  │
│  │                                                        │  │
│  │  Tables:                                               │  │
│  │  - profiles (student personal data)                   │  │
│  │  - academic_records (10th, 12th marks)               │  │
│  │  - test_results (test series performance)             │  │
│  │  - questions (PYQ data with JSONB)                    │  │
│  │  - test_series (test definitions)                      │  │
│  │  - coaching_institutes (reference data)               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Edge Functions (Custom Backend Logic)                │  │
│  │  - Complex business logic                             │  │
│  │  - Payment processing integration                      │  │
│  │  - Analytics aggregation                               │  │
│  │  - External API calls                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Storage (File Storage)                                │  │
│  │  - Student photos                                      │  │
│  │  - Question images/diagrams                           │  │
│  │  - Documents                                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Real-time (WebSockets)                                │  │
│  │  - Live test updates                                   │  │
│  │  - Leaderboard changes                                 │  │
│  │  - Notification system                                 │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

## Database Schema

### Tables

#### 1. `profiles` (Student Personal Data)
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  student_mobile TEXT NOT NULL UNIQUE,
  father_mobile TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  address TEXT NOT NULL,
  photo_url TEXT,
  preparation_mode TEXT NOT NULL, -- 'online_coaching', 'offline', 'self_study'
  coaching_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_mobile ON profiles(student_mobile);
```

#### 2. `academic_records` (Academic Information)
```sql
CREATE TABLE academic_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tenth_marks NUMERIC(5,2) NOT NULL,
  twelfth_status TEXT NOT NULL, -- 'appearing', 'pass'
  twelfth_percentage NUMERIC(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id)
);

CREATE INDEX idx_academic_profile ON academic_records(profile_id);
```

#### 3. `test_series` (Test Definitions)
```sql
CREATE TABLE test_series (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  exam_type TEXT NOT NULL, -- 'jee_advanced', 'jee_mains', 'neet', etc.
  subject TEXT NOT NULL,
  total_marks INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_test_series_exam ON test_series(exam_type);
```

#### 4. `test_results` (Student Test Performance)
```sql
CREATE TABLE test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  test_series_id UUID NOT NULL REFERENCES test_series(id) ON DELETE CASCADE,
  marks_obtained NUMERIC(5,2) NOT NULL,
  percentage NUMERIC(5,2) NOT NULL,
  rank INTEGER,
  slab_marks JSONB, -- {1: 85, 2: 78, 3: 92, ...} for 10 slabs
  attempted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, test_series_id)
);

CREATE INDEX idx_test_results_profile ON test_results(profile_id);
CREATE INDEX idx_test_results_series ON test_results(test_series_id);
```

#### 5. `questions` (PYQ Data)
```sql
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_type TEXT NOT NULL, -- 'jee_advanced', 'jee_mains', etc.
  year INTEGER NOT NULL,
  subject TEXT NOT NULL,
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  options JSONB, -- {A: "option1", B: "option2", C: "option3", D: "option4"}
  correct_answer TEXT,
  explanation TEXT,
  difficulty TEXT, -- 'easy', 'medium', 'hard'
  topics TEXT[], -- Array of topics
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_questions_exam_year ON questions(exam_type, year);
CREATE INDEX idx_questions_subject ON questions(subject);
CREATE INDEX idx_questions_topics ON questions USING GIN(topics);
```

#### 6. `user_progress` (Track User Learning Progress)
```sql
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  attempted BOOLEAN DEFAULT FALSE,
  correct BOOLEAN,
  time_spent_seconds INTEGER,
  attempted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, question_id)
);

CREATE INDEX idx_progress_profile ON user_progress(profile_id);
CREATE INDEX idx_progress_question ON user_progress(question_id);
```

## Security Features

### Row Level Security (RLS) Policies
```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Questions are public (no RLS needed)
-- Test results are private to user
CREATE POLICY "Users can view own results" ON test_results
  FOR SELECT USING (auth.uid() = profile_id);
```

## Implementation Steps

### Phase 1: Database Setup (Supabase)
1. Create Supabase project (if not already done)
2. Create tables using SQL above
3. Set up RLS policies
4. Create indexes for performance
5. Configure storage buckets for photos

### Phase 2: Backend Integration
1. Install Supabase client in Next.js:
   ```bash
   npm install @supabase/supabase-js
   ```

2. Create Supabase client:
   ```typescript
   // lib/supabase/client.ts
   import { createClient } from '@supabase/supabase-js'
   
   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   
   export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   ```

3. Update sign-up to save data (already implemented in current code)

### Phase 3: API Endpoints (if needed)
For complex logic, use Supabase Edge Functions:
```typescript
// supabase/functions/save-test-result/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )
  
  // Custom logic here
  const { data, error } = await supabase
    .from('test_results')
    .insert({ /* data */ })
  
  return new Response(JSON.stringify({ data, error }))
})
```

### Phase 4: PYQ Integration
1. Import PYQ data into `questions` table
2. Create API route to fetch questions:
   ```typescript
   // app/api/pyq/jee-advanced/route.ts
   import { supabase } from '@/lib/supabase/client'
   
   export async function GET(request: Request) {
     const { searchParams } = new URL(request.url)
     const year = searchParams.get('year')
     const subject = searchParams.get('subject')
     
     let query = supabase
       .from('questions')
       .select('*')
       .eq('exam_type', 'jee_advanced')
     
     if (year) query = query.eq('year', parseInt(year))
     if (subject) query = query.eq('subject', subject)
     
     const { data, error } = await query
     return Response.json({ data, error })
   }
   ```

## Performance Optimization

### Database Indexes
- All foreign keys indexed
- Frequently queried columns indexed
- GIN index for array fields (topics)
- Composite indexes for common query patterns

### Caching Strategy
- Use Supabase real-time for live data
- Implement Next.js caching for static PYQ data
- Edge functions for dynamic data

### CDN Integration
- Supabase Storage automatically uses CDN
- Question images cached globally
- Student photos cached

## Scalability

### Vertical Scaling
- Supabase auto-scales database resources
- Edge functions scale automatically

### Horizontal Scaling
- Read replicas for high read load
- Connection pooling
- Load balancing (handled by Supabase)

## Why This is the Best Choice

### Speed
- **PostgreSQL**: One of the fastest relational databases
- **Edge Functions**: Deployed globally, low latency
- **CDN**: Static assets cached worldwide
- **Indexes**: Optimized query performance

### Minimal Configuration
- **Zero backend setup**: Supabase handles everything
- **Auto-generated APIs**: No need to build REST endpoints
- **Built-in Auth**: No separate auth service needed
- **Storage included**: No separate file storage setup

### Scalability
- **Auto-scaling**: Handles 1 to 1M+ users
- **Real-time**: WebSocket support for live features
- **Edge deployment**: Global coverage

### Security
- **RLS Policies**: Database-level security
- **Encryption**: Data encrypted at rest
- **Authentication**: Built-in, secure auth
- **API Keys**: Secure key management

### Cost-Effective
- **Free tier**: 500MB database, 1GB storage
- **Pay-as-you-grow**: Only pay for what you use
- **No server costs**: No infrastructure management

## Alternative Options Considered

### MongoDB + Express
- ❌ More configuration required
- ❌ Less secure by default
- ❌ No built-in auth
- ❌ More expensive at scale

### Firebase
- ❌ NoSQL (less suitable for relational data)
- ❌ Limited query capabilities
- ❌ No PostgreSQL features
- ❌ More expensive

### Custom Node.js + PostgreSQL
- ❌ Requires server management
- ❌ More configuration
- ❌ No built-in auth
- ❌ Higher maintenance

## Next Steps

1. **Set up Supabase project** (if not done)
2. **Create database schema** using SQL provided
3. **Configure RLS policies** for security
4. **Test sign-up flow** with current frontend
5. **Plan PYQ data migration** to questions table
6. **Implement PYQ API endpoint** for /pyq/jee_advanced
7. **Add Edge Functions** for complex logic (if needed)

## Conclusion

**Supabase (PostgreSQL + Edge Functions)** is the optimal choice because:
- You're already using Supabase auth
- Minimal configuration required
- Fastest setup time
- Excellent performance
- Built-in security
- Auto-scaling
- Cost-effective
- Perfect for your use case (student data + PYQ)

This architecture will handle your current needs and scale seamlessly as you grow.
