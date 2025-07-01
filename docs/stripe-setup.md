# Stripe Setup Guide for Build What You Need Club

This guide covers the complete Stripe integration setup for both development and production environments.

## Table of Contents
1. [Environment Setup](#environment-setup)
2. [Webhook Configuration](#webhook-configuration)
3. [Product & Pricing Setup](#product--pricing-setup)
4. [Test Mode vs Live Mode](#test-mode-vs-live-mode)
5. [Testing Guide](#testing-guide)
6. [Production Deployment](#production-deployment)
7. [Troubleshooting](#troubleshooting)

---

## Environment Setup

### Required Environment Variables

Add these to your `.env.local` file:

```env
# Stripe Test Mode (Development)
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_TEST_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
STRIPE_PRICE_ID=price_YOUR_PRICE_ID  # Optional if creating dynamically

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Change to your domain in production
```

### Getting Your API Keys

1. Log in to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers → API keys**
3. Copy your test mode keys (they start with `sk_test_` and `pk_test_`)
4. Keep your live mode keys secure for production

---

## Webhook Configuration

### Local Development Setup

1. **Install Stripe CLI**
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe
   
   # Windows (using scoop)
   scoop install stripe
   
   # Linux
   # Download from https://github.com/stripe/stripe-cli/releases
   ```

2. **Login to Stripe**
   ```bash
   stripe login
   ```

3. **Forward webhooks to local server**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   
   This will output:
   ```
   > Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
   ```

4. **Update your `.env.local`**
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```

5. **Keep the Stripe CLI running** while developing

### Production Webhook Setup

1. Go to **Stripe Dashboard → Developers → Webhooks**
2. Click **"Add endpoint"**
3. Configure the endpoint:
   - **Endpoint URL**: `https://yourdomain.com/api/webhooks/stripe`
   - **Events to listen for**:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
4. After creation, click on the webhook to reveal the **Signing secret**
5. Copy the signing secret (starts with `whsec_`) to your production environment

---

## Product & Pricing Setup

### Option 1: Dashboard Setup (Recommended)

1. Go to **Stripe Dashboard → Products**
2. Click **"+ Add product"**
3. Configure the product:
   - **Name**: Build What You Need Club Membership
   - **Description**: Monthly membership for SaaS replacement builds
4. Add pricing:
   - **Price**: $97.00
   - **Billing period**: Monthly
   - **Currency**: USD
5. Copy the **Price ID** (starts with `price_`)
6. Add to `.env.local`:
   ```env
   STRIPE_PRICE_ID=price_xxxxxxxxxxxxx
   ```

### Option 2: Dynamic Pricing (Current Implementation)

The current code creates prices on-the-fly during checkout. This works but is less ideal for production as it creates duplicate products.

---

## Test Mode vs Live Mode

### Understanding Test Mode

**Test Mode Characteristics:**
- Uses fake card numbers for testing
- No real money is processed
- Completely isolated from live data
- Perfect for development and testing
- Test API keys start with `_test_`

**Test Card Numbers:**
- **Success**: `4242 4242 4242 4242`
- **Declined**: `4000 0000 0000 0002`
- **Authentication Required**: `4000 0025 0000 3155`
- Use any future date for expiry, any 3 digits for CVC

### Transitioning to Live Mode

**Important**: Test mode and live mode are completely separate. You cannot transfer data between them.

1. **Create products in live mode**
   - Recreate all products and prices
   - Note down new price IDs

2. **Set up production webhooks**
   - Add new endpoint with your production URL
   - Get new webhook signing secret

3. **Update environment variables**
   ```env
   # Production (Live Mode)
   STRIPE_SECRET_KEY=sk_live_xxxxx
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
   STRIPE_WEBHOOK_SECRET=whsec_live_xxxxx
   STRIPE_PRICE_ID=price_live_xxxxx
   ```

4. **Test with a real card**
   - Make a real purchase
   - You can refund yourself afterward

---

## Testing Guide

### Complete Flow Testing Checklist

1. **User Registration**
   - [ ] Sign up with email
   - [ ] Receive verification email
   - [ ] Click verification link
   - [ ] Redirect to payment page

2. **Payment Flow**
   - [ ] Payment page shows correct pricing ($97/month)
   - [ ] Founding member status displays (if < 1000 members)
   - [ ] Stripe checkout loads
   - [ ] Use test card: `4242 4242 4242 4242`
   - [ ] Payment succeeds
   - [ ] Redirect to success page

3. **Post-Payment Verification**
   - [ ] Database updated (check Supabase):
     - `is_active = true`
     - `stripe_customer_id` populated
     - `stripe_subscription_id` populated
     - `subscription_status = 'active'`
   - [ ] User can access protected routes (/vault)
   - [ ] Non-subscribers redirected to payment

4. **Webhook Testing**
   ```bash
   # Trigger test webhook events
   stripe trigger checkout.session.completed
   stripe trigger customer.subscription.deleted
   ```

### Testing Different Scenarios

1. **New User Flow**
   ```
   Sign up → Verify Email → Pay → Access Content
   ```

2. **Existing User Without Subscription**
   ```
   Login → Redirect to Payment → Pay → Access Content
   ```

3. **Active Subscriber**
   ```
   Login → Direct Access to Protected Content
   ```

4. **Cancelled Subscription**
   ```
   Webhook Updates → is_active = false → Redirect to Payment
   ```

---

## Production Deployment

### Pre-Deployment Checklist

1. **Domain Requirements**
   - [ ] Domain configured with SSL (HTTPS required)
   - [ ] Environment variables set in hosting platform
   - [ ] Database connection configured

2. **Stripe Configuration**
   - [ ] Live mode products created
   - [ ] Production webhook endpoint added
   - [ ] Live API keys in production environment
   - [ ] Webhook signing secret updated

3. **Security Considerations**
   - [ ] Never commit API keys to git
   - [ ] Use environment variables only
   - [ ] Enable Stripe webhook signature verification
   - [ ] Set up proper CORS policies

### Vercel Deployment

1. **Add environment variables in Vercel Dashboard**
   - Go to Project Settings → Environment Variables
   - Add all Stripe keys for production environment

2. **Verify webhook endpoint**
   - Deploy first
   - Test webhook at `https://yourdomain.com/api/webhooks/stripe`
   - Check Stripe webhook logs for successful delivery

---

## Troubleshooting

### Common Issues and Solutions

1. **Webhook Signature Verification Failed**
   - Ensure webhook secret matches exactly (no extra spaces)
   - Check you're using the correct secret for your environment
   - Verify raw body is being used (not parsed JSON)

2. **Customer Not Found**
   - Check Stripe customer ID is saved to database
   - Ensure you're in the correct mode (test/live)
   - Verify customer wasn't deleted in Stripe

3. **Subscription Not Updating**
   - Check webhook events are being received
   - Verify database connection in webhook handler
   - Look for errors in Vercel/server logs

4. **Payment Redirects Not Working**
   - Ensure `NEXT_PUBLIC_APP_URL` is set correctly
   - Check success/cancel URLs in checkout session
   - Verify middleware is not blocking redirects

### Debugging Commands

```bash
# View webhook attempts
stripe webhooks list

# Check specific event
stripe events retrieve evt_xxxxx

# Test webhook locally
stripe trigger checkout.session.completed \
  --add checkout_session:metadata.userId=test-user-id

# View logs
stripe logs tail
```

### Monitoring

1. **Stripe Dashboard**
   - Check Events & Webhooks section
   - Monitor failed webhook deliveries
   - Set up email alerts for failures

2. **Application Logs**
   - Log webhook events received
   - Track subscription status changes
   - Monitor payment failures

---

## Security Best Practices

1. **API Key Management**
   - Never hardcode keys
   - Use different keys for each environment
   - Rotate keys periodically
   - Restrict key permissions in Stripe

2. **Webhook Security**
   - Always verify webhook signatures
   - Use HTTPS for webhook endpoints
   - Implement idempotency
   - Handle replay attacks

3. **Database Security**
   - Use Row Level Security (RLS)
   - Validate user permissions
   - Sanitize webhook data
   - Log security events

---

## Support Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe CLI Reference](https://stripe.com/docs/stripe-cli)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

*Last updated: January 2025*