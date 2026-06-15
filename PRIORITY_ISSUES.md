# PRIORITY ISSUES — EXAMESSY

---

## 🔴 DISCUSS WITH CLIENT (no code fix possible — needs decision/content)

These cannot be fixed without client input or real credentials.

| # | Issue | Where | Why it needs the client |
|---|-------|--------|------------------------|
| 1 | **Razorpay keys missing** | `.env` / API routes | Payment fails in production. Client must provide live `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` |
| 2 | **Supabase not configured** | `.env.local` | Auth, dashboard, profile setup all broken without real `SUPABASE_URL` + `SUPABASE_ANON_KEY` |
| 3 | **Real student data** | `app/page.tsx` — toppers list | All 50 toppers are fake (placeholder names + stock photos). Client must confirm: use real data or keep as dummy |
| 4 | **Contact form does nothing** | `app/contact/page.tsx` | Form submits but sends nowhere. Needs email backend (Resend / SendGrid / Supabase Edge Function) — client picks provider |
| 5 | **Phone number is fake** | `components/footer.tsx` | `+91 1800-XXX-XXXX` is a placeholder. Client must provide actual support number |
| 6 | **Logo missing** | `/public/logo.png` | File exists but may not be final brand logo. Client to confirm |
| 7 | **Blog is static hardcoded** | `app/blog/page.tsx` | 4 hardcoded posts. If client wants real blog, needs CMS (Sanity / Contentful) — time + cost to build |
| 8 | **Test centers listed as "50+"** | Homepage / Footer | No actual center addresses. Client must provide list if needed on site |
| 9 | **Privacy Policy / Terms dates** | `/privacy`, `/terms` | "January 2025" and "June 2026" — client to confirm actual dates and review legal text |
| 10 | **Careers page jobs are fake** | `app/careers/page.tsx` | All 6 job listings are placeholder. Client must confirm real openings or remove the page |

---

## 🟠 HIGH PRIORITY — CODE FIXES (time needed, discuss with client)

These are technical issues that require dedicated build time.

| # | Issue | Impact | Estimated effort |
|---|-------|--------|-----------------|
| 1 | **No email verification flow** | After sign-up, user lands on `/auth/sign-up-success` which doesn't exist → 404 | 1 day — build success page + email template |
| 2 | **Dashboard data is real Supabase** | Without DB tables (`students`, `test_attempts`) created, dashboard crashes | 1 day — DB schema + seed data + migrations |
| 3 | **Payment success has no order tracking** | After payment, no receipt email, no order history in dashboard | 2 days — webhook handler + order table + email |
| 4 | **Profile setup skippable** | User can navigate directly to `/dashboard` without completing profile — crashes | 0.5 day — middleware route guard |
| 5 | **No password reset flow** | Login page has "Recovery?" link → goes to `#` (dead) | 1 day — Supabase reset email flow |
| 6 | **SEO / OG tags missing** | All pages share the same generic title/description. No og:image | 0.5 day — per-page metadata in each layout |
| 7 | **No loading state on page transitions** | 3D scenes take ~1s to mount, showing blank flash | 0.5 day — add Suspense skeleton screens |
| 8 | **Mobile nav doesn't close on route change** | Menu stays open after tapping a link on mobile | Already partially fixed — needs test |
| 9 | **Images use external Unsplash URLs** | If Unsplash goes down or rate-limits, all topper photos break. Also GDPR risk | 1 day — download + host locally in `/public` |
| 10 | **No 404 page** | `/_not-found` uses Next.js default, no branded design | 0.5 day — custom not-found.tsx |

---

## 🟡 MEDIUM PRIORITY — QUICK FIXES (can do now, no client input needed)

These can be resolved in the current codebase without discussion.

| # | Issue | Fix |
|---|-------|-----|
| 1 | `THREE.Clock` console warning | Suppressor added — ✅ done |
| 2 | `backgroundColor: currentColor` framer-motion warning | Fixed in CustomCursor — ✅ done |
| 3 | `IndexSizeError: arc radius negative` | Fixed in ScrollExplosion — ✅ done |
| 4 | Emoji fireworks (FloatingBurst) removed | ✅ done |
| 5 | Auth form submit broken (LiquidButton) | Fixed with `requestSubmit()` — ✅ done |
| 6 | Payment page orphaned code | Cleaned — ✅ done |

---

## REMOVED ✅
- Emoji floating burst (FloatingBurst) — removed from global effects

---

*Last updated: June 2026*
