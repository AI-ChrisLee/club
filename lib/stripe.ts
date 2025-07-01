import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
  typescript: true,
})

export const getStripePrice = async () => {
  // For simplicity, we'll create the price on-demand or use a hardcoded price ID
  // In production, you'd create this in Stripe dashboard and use the price ID
  return process.env.STRIPE_PRICE_ID || 'price_monthly_97'
}