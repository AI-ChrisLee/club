# Vercel Deployment Guide

## Troubleshooting 404 Error

If you're seeing a 404 error on Vercel, follow these steps:

### 1. Check Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and log in
2. Find your project in the dashboard
3. Check if the deployment status shows as "Ready"
4. Click on the deployment to see build logs

### 2. Common Causes & Solutions

#### A. Project Not Deployed
- Make sure you've connected your GitHub repository to Vercel
- Check if automatic deployments are enabled
- Try manually deploying from Vercel dashboard

#### B. Environment Variables Missing
Required environment variables for production:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
```

Add these in: **Vercel Dashboard → Project Settings → Environment Variables**

#### C. Build Errors
Check the build logs in Vercel for errors. Common issues:
- Missing dependencies
- TypeScript errors
- Environment variable issues

### 3. Manual Deployment Steps

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy from local**
   ```bash
   cd /path/to/001-club
   vercel
   ```

3. **Follow prompts**
   - Set up and deploy? Yes
   - Which scope? (select your account)
   - Link to existing project? No (if first time)
   - Project name? build-what-you-need-club
   - Directory? ./ (current directory)
   - Override settings? No

### 4. Verify Deployment

After deployment, check:
1. Build logs show "Build completed"
2. Functions tab shows API routes
3. Environment variables are set
4. Domain is accessible

### 5. Debug Commands

```bash
# Check deployment status
vercel ls

# View logs
vercel logs

# Redeploy
vercel --prod
```

### 6. Required Files Check

Ensure these files exist in your repository:
- ✅ package.json
- ✅ next.config.ts
- ✅ app/layout.tsx
- ✅ app/page.tsx

### 7. API Routes Check

Verify these routes are accessible:
- `/api/create-checkout-session`
- `/api/webhooks/stripe`

Test: `https://your-domain.vercel.app/api/webhooks/stripe` should return 405 (Method Not Allowed) for GET requests.

## Quick Fix Steps

1. **Re-deploy from Vercel Dashboard**
   - Go to your project
   - Click "Redeploy"
   - Select "Redeploy with existing Build Cache"

2. **Check GitHub Integration**
   - Ensure Vercel has access to your repository
   - Check if the latest commit is deployed

3. **Environment Variables**
   - Add all required variables
   - Ensure no typos or extra spaces
   - Use production values (not localhost)

## If Still Not Working

1. Create a new Vercel project
2. Import from GitHub
3. Add environment variables
4. Deploy

## Support

- [Vercel Support](https://vercel.com/support)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- Check deployment logs for specific errors