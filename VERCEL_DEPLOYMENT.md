# Vercel Deployment Guide

This guide will help you deploy your Examessy student data application to Vercel with Supabase integration.

## Prerequisites

- A Vercel account (free at https://vercel.com)
- Your Supabase project credentials (already set up)
- Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Initialize Git Repository

If you haven't already, initialize a git repository:

```bash
cd "/Users/matul/Desktop/untitled folder/student-data-payment"
git init
git add .
git commit -m "Initial commit"
```

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (name it `student-data-payment` or similar)
3. Don't initialize with README (we already have files)
4. Click "Create repository"

## Step 3: Push to GitHub

```bash
cd "/Users/matul/Desktop/untitled folder/student-data-payment"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub details.

## Step 4: Deploy to Vercel

### Option A: Via Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
cd "/Users/matul/Desktop/untitled folder/student-data-payment"
vercel
```

4. Follow the prompts:
   - **Set up and deploy?** → `Y`
   - **Which scope?** → Select your account
   - **Link to existing project?** → `N`
   - **What's your project's name?** → `examessy-student-data` (or your choice)
   - **In which directory is your code located?** → `./` (default)
   - **Want to override the settings?** → `N`

5. Vercel will detect Next.js and deploy automatically

### Option B: Via Vercel Dashboard

1. Go to https://vercel.com/new
2. Click "Import" from your Git provider (GitHub)
3. Select your repository
4. Vercel will auto-detect Next.js
5. Click "Deploy"

## Step 5: Configure Environment Variables

### In Vercel Dashboard:

1. Go to your project in Vercel dashboard
2. Click **Settings** → **Environment Variables**
3. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://mqewsihnliezkhhvgbah.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xZXdzaWhubGllemtoaHZnYmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMDQzMjQsImV4cCI6MjA5NjU4MDMyNH0.Uu-p8aTluqQr5JN43noVjeiDjkKNutABDsiq0L50Q0I
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_SMWVxkicq1JNDaOCNs6dMQ_6IUt5SI4
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://your-project.vercel.app/auth/callback
```

**Important:** Replace `https://your-project.vercel.app` with your actual Vercel deployment URL.

### Via Vercel CLI:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste: https://mqewsihnliezkhhvgbah.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xZXdzaWhubGllemtoaHZnYmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMDQzMjQsImV4cCI6MjA5NjU4MDMyNH0.Uu-p8aTluqQr5JN43noVjeiDjkKNutABDsiq0L50Q0I

vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY production
# Paste: sb_publishable_SMWVxkicq1JNDaOCNs6dMQ_6IUt5SI4

vercel env add NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL production
# Paste: https://your-project.vercel.app/auth/callback
```

## Step 6: Update Supabase Redirect URL

1. Go to your Supabase dashboard
2. Click **Authentication** → **URL Configuration**
3. Add your Vercel URL to **Site URL** and **Redirect URLs**:
   - Site URL: `https://your-project.vercel.app`
   - Redirect URLs: `https://your-project.vercel.app/auth/callback`

## Step 7: Redeploy with Environment Variables

```bash
vercel --prod
```

Or in Vercel dashboard, click **Deployments** → **Redeploy**

## Step 8: Verify Deployment

1. Visit your Vercel URL (e.g., `https://examessy-student-data.vercel.app`)
2. Test sign-up flow
3. Test login flow
4. Test dashboard
5. Test PYQ pages

## Step 9: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update Supabase redirect URL with custom domain

## Step 10: Enable Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push
```

Vercel will automatically build and deploy.

## Troubleshooting

### Issue: Environment variables not working

**Solution:** Make sure all env vars start with `NEXT_PUBLIC_` for client-side access.

### Issue: Supabase auth redirect fails

**Solution:** Update Supabase redirect URL to match your Vercel domain.

### Issue: Build fails

**Solution:** Check Vercel build logs for errors. Common issues:
- Missing dependencies
- TypeScript errors
- Environment variable typos

### Issue: Storage upload fails in production

**Solution:** Update storage RLS policies to allow authenticated uploads (not public).

## Production Considerations

Before going to production:

1. **Security:**
   - Change storage bucket from public to private
   - Implement proper file upload validation
   - Add rate limiting
   - Review RLS policies

2. **Performance:**
   - Enable caching
   - Optimize images
   - Use CDN for static assets

3. **Monitoring:**
   - Set up error tracking (Sentry)
   - Enable analytics (Vercel Analytics)
   - Monitor Supabase usage

4. **Database:**
   - Enable database backups
   - Set up connection pooling
   - Monitor query performance

## Current Environment Variables Reference

From your `.env` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://mqewsihnliezkhhvgbah.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xZXdzaWhubGllemtoaHZnYmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMDQzMjQsImV4cCI6MjA5NjU4MDMyNH0.Uu-p8aTluqQr5JN43noVjeiDjkKNutABDsiq0L50Q0I
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_SMWVxkicq1JNDaOCNs6dMQ_6IUt5SI4
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

**Note:** Change `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` to your production URL in Vercel.
