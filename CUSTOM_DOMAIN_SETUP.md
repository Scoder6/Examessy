# Custom Domain Configuration Guide - examessy.com

This guide provides all configuration details for setting up `examessy.com` with Vercel and Supabase.

## Step 1: Add Custom Domain in Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Domains**
3. Click **Add Domain**
4. Enter: `examessy.com`
5. Click **Add**

Vercel will show you DNS records to add.

## Step 2: Update DNS Records

Go to your domain registrar (where you bought examessy.com) and add these DNS records:

### For examessy.com (Root Domain):

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600 (or default)
```

```
Type: A
Name: @
Value: 76.76.19.19
TTL: 3600 (or default)
```

### For www.examessy.com (Subdomain):

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or default)
```

**Note:** If your registrar doesn't support `@` for root domain, use the domain name itself (e.g., `examessy.com` instead of `@`).

## Step 3: Update Vercel Environment Variables

In Vercel dashboard → Settings → Environment Variables, update:

```
NEXT_PUBLIC_SUPABASE_URL=https://mqewsihnliezkhhvgbah.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xZXdzaWhubGllemtoaHZnYmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMDQzMjQsImV4cCI6MjA5NjU4MDMyNH0.Uu-p8aTluqQr5JN43noVjeiDjkKNutABDsiq0L50Q0I
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_SMWVxkicq1JNDaOCNs6dMQ_6IUt5SI4
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://examessy.com/auth/callback
```

**Important:** Change the redirect URL to your custom domain.

## Step 4: Update Supabase Configuration

### 4.1 Update Site URL

1. Go to Supabase dashboard
2. Click **Settings** → **General**
3. Find **Site URL**
4. Update to: `https://examessy.com`

### 4.2 Update Redirect URLs

1. Go to **Authentication** → **URL Configuration**
2. Update **Site URL**: `https://examessy.com`
3. Add to **Redirect URLs**:
   - `https://examessy.com/auth/callback`
   - `https://www.examessy.com/auth/callback`
4. Remove any localhost URLs if not needed for development

### 4.3 Update Email Templates (Optional)

If you want custom email templates with your domain:

1. Go to **Authentication** → **Email Templates**
2. Update **Confirm signup** template
3. Replace links with: `https://examessy.com/auth/callback`
4. Customize email content as needed

## Step 5: Enable HTTPS (Automatic)

Vercel automatically provisions SSL certificates for custom domains. This may take a few minutes to propagate.

1. In Vercel dashboard → Settings → Domains
2. Wait for certificate status to show "Valid"
3. Force HTTPS should be enabled by default

## Step 6: Test the Configuration

### DNS Propagation Check:

```bash
# Check A records
dig examessy.com +short

# Should return: 76.76.21.21 and 76.76.19.19

# Check CNAME for www
dig www.examessy.com +short

# Should return: cname.vercel-dns.com
```

### Access the Site:

1. Visit: `https://examessy.com`
2. Visit: `https://www.examessy.com`
3. Both should work and redirect to HTTPS

### Test Authentication:

1. Try sign-up at `https://examessy.com/auth/sign-up`
2. Check email confirmation link redirects correctly
3. Test login flow
4. Verify dashboard loads

## Step 7: Update Next.js Configuration (Optional)

If you want to enforce the custom domain, update `next.config.ts`:

```typescript
const nextConfig = {
  // Force redirect to custom domain
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

## Step 8: Set Up www Redirect (Optional)

To redirect `www.examessy.com` to `examessy.com`:

1. In Vercel dashboard → Settings → Domains
2. Click on `www.examessy.com`
3. Enable "Redirect to examessy.com"

## Step 9: Monitor and Verify

### Check Vercel Deployment:

1. Go to Vercel dashboard → Deployments
2. Verify latest deployment is successful
3. Check build logs for any errors

### Check SSL Certificate:

1. Vercel dashboard → Settings → Domains
2. Verify certificate status is "Valid"
3. Check expiration date

### Test All Pages:

- `https://examessy.com` - Home
- `https://examessy.com/auth/login` - Login
- `https://examessy.com/auth/sign-up` - Sign up
- `https://examessy.com/dashboard` - Dashboard
- `https://examessy.com/pyq` - PYQ section

## Step 10: Update Environment Variables Locally (Optional)

Update your local `.env` file to match production:

```env
NEXT_PUBLIC_SUPABASE_URL=https://mqewsihnliezkhhvgbah.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xZXdzaWhubGllemtoaHZnYmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMDQzMjQsImV4cCI6MjA5NjU4MDMyNH0.Uu-p8aTluqQr5JN43noVjeiDjkKNutABDsiq0L50Q0I
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_SMWVxkicq1JNDaOCNs6dMQ_6IUt5SI4
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://examessy.com/auth/callback
```

## DNS Configuration Summary

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 3600 |
| A | @ | 76.76.19.19 | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |

## Environment Variables Summary

| Variable | Value |
|----------|-------|
| NEXT_PUBLIC_SUPABASE_URL | https://mqewsihnliezkhhvgbah.supabase.co |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |
| NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY | sb_publishable_SMWVxkicq1JNDaOCNs6dMQ_6IUt5SI4 |
| NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL | https://examessy.com/auth/callback |

## Supabase Configuration Summary

- **Site URL**: `https://examessy.com`
- **Redirect URLs**: 
  - `https://examessy.com/auth/callback`
  - `https://www.examessy.com/auth/callback`

## Troubleshooting

### Issue: DNS not propagating

**Solution:** DNS changes can take 5-48 hours to propagate. Use `dig` command to check propagation.

### Issue: SSL certificate not issuing

**Solution:** 
1. Verify DNS records are correct
2. Wait up to 24 hours for certificate issuance
3. Check Vercel dashboard for certificate errors

### Issue: Redirect loops

**Solution:** Check that Supabase redirect URL matches your custom domain exactly.

### Issue: Authentication not working

**Solution:** 
1. Verify Supabase redirect URLs include your custom domain
2. Check environment variables in Vercel
3. Ensure HTTPS is enabled

### Issue: www not working

**Solution:** 
1. Verify CNAME record for www
2. Check Vercel domain settings
3. Enable www redirect if needed

## Production Checklist

- [ ] DNS records added and propagated
- [ ] Custom domain added in Vercel
- [ ] SSL certificate issued and valid
- [ ] Environment variables updated in Vercel
- [ ] Supabase site URL updated
- [ ] Supabase redirect URLs updated
- [ ] Email templates updated (optional)
- [ ] All pages tested on custom domain
- [ ] Authentication flow tested
- [ ] HTTPS enforced
- [ ] www redirect configured (optional)

## Security Considerations

1. **HTTPS Only**: Vercel automatically redirects HTTP to HTTPS
2. **HSTS**: Consider adding HSTS header for additional security
3. **CORS**: Ensure Supabase allows your custom domain
4. **Email Security**: Consider setting up SPF, DKIM, DMARC for email

## Performance Optimization

1. **CDN**: Vercel Edge Network provides global CDN
2. **Image Optimization**: Next.js automatically optimizes images
3. **Caching**: Vercel automatically caches static assets
4. **Analytics**: Enable Vercel Analytics for performance insights

## Monitoring

1. **Vercel Analytics**: Monitor page views and performance
2. **Supabase Logs**: Monitor authentication and database usage
3. **Uptime Monitoring**: Consider external uptime monitoring
4. **Error Tracking**: Consider adding Sentry for error tracking

After completing all steps, your site will be live at `https://examessy.com` with full Supabase integration.
