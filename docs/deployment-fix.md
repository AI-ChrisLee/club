# Fixing CloudFront 403 Error

## The Problem

You're getting a CloudFront 403 error because your Next.js app contains:
- API routes (`/api/create-checkout-session`, `/api/webhooks/stripe`)
- Dynamic routes with authentication
- Server-side features

But it's being deployed to a static-only environment.

## Solution: Deploy to Vercel (Recommended)

Your app MUST be deployed to a platform that supports Next.js server-side features:

### Option 1: Deploy to Vercel (Best for Next.js)

1. **Go to [vercel.com/new](https://vercel.com/new)**

2. **Import your GitHub repository**
   - Select "AI-ChrisLee/club"
   - Click "Import"

3. **Configure project**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_value
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_value
   STRIPE_SECRET_KEY=your_value
   STRIPE_WEBHOOK_SECRET=your_value
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_value
   NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Option 2: Other Platforms That Support Next.js

- **Netlify** (with Next.js plugin)
- **Railway**
- **Render**
- **Fly.io**
- **AWS Amplify** (with SSR support)

### Why CloudFront/Static Hosting Won't Work

Your app uses:
1. **API Routes** - Require Node.js runtime
2. **Middleware** - Runs on the server
3. **Dynamic Auth** - Server-side session handling
4. **Stripe Webhooks** - Need POST endpoint

These features cannot run on static hosting or CDNs like CloudFront.

## Quick Checklist

1. **Remove any static export configuration**
   - Don't use `next export`
   - Don't set `output: 'export'` in next.config.ts

2. **Ensure you're deploying to a Node.js platform**
   - Vercel (recommended)
   - Any platform with Node.js support

3. **Test locally first**
   ```bash
   npm run build
   npm run start
   ```
   Visit http://localhost:3000 to ensure it works

## Vercel Deployment URL

After deploying to Vercel, you'll get a URL like:
- `https://your-project.vercel.app`
- `https://your-project-git-main-your-username.vercel.app`

Use this URL, not CloudFront.

## Need Custom Domain?

After deploying to Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration steps
4. Vercel handles SSL automatically

## Still Having Issues?

1. Check Vercel deployment logs
2. Ensure all environment variables are set
3. Verify your API routes work locally first
4. Join Vercel Discord for support