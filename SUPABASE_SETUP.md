# Supabase Setup Guide

This guide will walk you through setting up Supabase for the Examessy student data application.

## Prerequisites
- A Supabase account (free at https://supabase.com)
- Your current Next.js project with Supabase auth already configured

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in the details:
   - **Name**: examessy-student-data
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose the region closest to your users
   - **Pricing Plan**: Free tier is fine for development
4. Click "Create new project"
5. Wait for the project to be created (2-3 minutes)

## Step 2: Get Project Credentials

1. Go to your project dashboard
2. Click **Settings** → **API**
3. Copy the following values:
   - **Project URL**: e.g., `https://xyz.supabase.co`
   - **anon public key**: e.g., `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
4. Add these to your `.env` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## Step 3: Create Database Tables

Go to **SQL Editor** in Supabase dashboard and run the following SQL commands:

### 3.1 Create Profiles Table
```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  student_mobile TEXT NOT NULL UNIQUE,
  father_mobile TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  address TEXT NOT NULL,
  photo_url TEXT,
  preparation_mode TEXT NOT NULL CHECK (preparation_mode IN ('online_coaching', 'offline', 'self_study')),
  coaching_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_mobile ON profiles(student_mobile);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### 3.2 Create Academic Records Table
```sql
-- Create academic_records table
CREATE TABLE academic_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tenth_marks NUMERIC(5,2) NOT NULL CHECK (tenth_marks >= 0 AND tenth_marks <= 100),
  twelfth_status TEXT NOT NULL CHECK (twelfth_status IN ('appearing', 'pass')),
  twelfth_percentage NUMERIC(5,2) CHECK (twelfth_percentage >= 0 AND twelfth_percentage <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id)
);

-- Create index
CREATE INDEX idx_academic_profile ON academic_records(profile_id);

-- Enable RLS
ALTER TABLE academic_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own academic records" ON academic_records
  FOR SELECT USING (auth.uid() = (SELECT id FROM profiles WHERE id = profile_id));

CREATE POLICY "Users can insert own academic records" ON academic_records
  FOR INSERT WITH CHECK (auth.uid() = (SELECT id FROM profiles WHERE id = profile_id));

CREATE POLICY "Users can update own academic records" ON academic_records
  FOR UPDATE USING (auth.uid() = (SELECT id FROM profiles WHERE id = profile_id));
```

### 3.3 Create Test Series Table
```sql
-- Create test_series table
CREATE TABLE test_series (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  exam_type TEXT NOT NULL CHECK (exam_type IN ('jee_mains', 'jee_advanced', 'neet', 'vit', 'bitsat', 'manipal')),
  subject TEXT NOT NULL,
  total_marks INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index
CREATE INDEX idx_test_series_exam ON test_series(exam_type);

-- Enable RLS (public read access for now)
ALTER TABLE test_series ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view test series" ON test_series
  FOR SELECT USING (true);
```

### 3.4 Create Test Results Table
```sql
-- Create test_results table
CREATE TABLE test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  test_series_id UUID NOT NULL REFERENCES test_series(id) ON DELETE CASCADE,
  marks_obtained NUMERIC(5,2) NOT NULL,
  percentage NUMERIC(5,2) NOT NULL,
  rank INTEGER,
  slab_marks JSONB DEFAULT '{}',
  attempted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, test_series_id)
);

-- Create indexes
CREATE INDEX idx_test_results_profile ON test_results(profile_id);
CREATE INDEX idx_test_results_series ON test_results(test_series_id);

-- Enable RLS
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own test results" ON test_results
  FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own test results" ON test_results
  FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own test results" ON test_results
  FOR UPDATE USING (auth.uid() = profile_id);
```

### 3.5 Create Questions Table (for PYQ)
```sql
-- Create questions table
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_type TEXT NOT NULL CHECK (exam_type IN ('jee_mains', 'jee_advanced', 'neet', 'vit', 'bitsat', 'manipal')),
  year INTEGER NOT NULL,
  subject TEXT NOT NULL,
  chapter TEXT NOT NULL,
  question_number INTEGER,
  question_text TEXT NOT NULL,
  options JSONB,
  correct_answer TEXT,
  explanation TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  topics TEXT[],
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_questions_exam_year ON questions(exam_type, year);
CREATE INDEX idx_questions_subject ON questions(subject);
CREATE INDEX idx_questions_chapter ON questions(chapter);
CREATE INDEX idx_questions_topics ON questions USING GIN(topics);

-- Enable RLS (public read access for questions)
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view questions" ON questions
  FOR SELECT USING (true);
```

### 3.6 Create User Progress Table
```sql
-- Create user_progress table
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

-- Create indexes
CREATE INDEX idx_progress_profile ON user_progress(profile_id);
CREATE INDEX idx_progress_question ON user_progress(question_id);

-- Enable RLS
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = profile_id);
```

## Step 4: Create Storage Bucket for Photos

1. Go to **Storage** in Supabase dashboard
2. Click "Create a new bucket"
3. Name it: `student-photos`
4. Make it **Public** (for now, for development)
5. Click "Create bucket"

### Storage Policies
```sql
-- Enable RLS on storage
ALTER STORAGE student-photos ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow public read access
CREATE POLICY "Public can view photos" ON storage.objects
  FOR SELECT USING (true);

-- Allow users to delete own photos
CREATE POLICY "Users can delete own photos" ON storage.objects
  FOR DELETE USING (auth.uid()::text = (storage.foldername(name))[1]);
```

## Step 5: Update Sign-Up to Save Data

Your current sign-up form already sends data to Supabase auth. Now we need to:

1. Create a trigger to automatically create profile row when user signs up
2. Update the sign-up to save additional data

### 5.1 Create Trigger for Auto Profile Creation

Run this in SQL Editor:
```sql
-- Create a function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, student_name, father_name, student_mobile, father_mobile, email, address, photo_url, preparation_mode, coaching_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'student_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'father_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'student_mobile', ''),
    COALESCE(NEW.raw_user_meta_data->>'father_mobile', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'address', ''),
    COALESCE(NEW.raw_user_meta_data->>'photo_url', NULL),
    COALESCE(NEW.raw_user_meta_data->>'preparation_mode', ''),
    COALESCE(NEW.raw_user_meta_data->>'coaching_name', '')
  );
  
  -- Also create academic record
  INSERT INTO public.academic_records (profile_id, tenth_marks, twelfth_status, twelfth_percentage)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'tenth_marks')::NUMERIC, 0),
    COALESCE(NEW.raw_user_meta_data->>'twelfth_status', 'appearing'),
    COALESCE((NEW.raw_user_meta_data->>'twelfth_percentage')::NUMERIC, NULL)
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Step 6: Test the Setup

1. Go to your sign-up page: `http://localhost:3000/auth/sign-up`
2. Fill out the form and submit
3. Check Supabase dashboard:
   - Go to **Authentication** → **Users** - you should see the new user
   - Go to **Table Editor** → **profiles** - you should see the profile data
   - Go to **Table Editor** → **academic_records** - you should see the academic data

## Step 7: Verify Environment Variables

Make sure your `.env` file has:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

## Step 8: Update Supabase Client (if needed)

Ensure your `lib/supabase/client.ts` looks like this:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Common Issues & Solutions

### Issue: "Profile not found" after sign-up
**Solution**: Check if the trigger was created successfully. Run:
```sql
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
```

### Issue: RLS blocking inserts
**Solution**: Temporarily disable RLS for testing:
```sql
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
-- Test, then re-enable:
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
```

### Issue: Photo upload fails
**Solution**: Check storage bucket policies and ensure it's public for development

### Issue: Data not saving in sign-up
**Solution**: Check browser console for errors. Verify the `options.data` object in your sign-up form matches the trigger expectations.

## Next Steps

After completing this setup:
1. Test the complete sign-up flow
2. Verify data is saved correctly in Supabase
3. Implement photo upload to storage
4. Create API routes for fetching PYQ data from questions table
5. Implement test result saving functionality

## Security Notes for Production

Before going to production:
1. Change storage bucket to private
2. Implement proper file upload validation
3. Add rate limiting
4. Use service role key for server-side operations
5. Review and tighten RLS policies
6. Enable database backups
7. Set up proper error handling
