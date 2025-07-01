import Stripe from 'stripe'

// Initialize Stripe lazily to avoid build-time errors
let stripeInstance: Stripe | null = null

export const getStripe = () => {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-05-28.basil',
      typescript: true,
    })
  }
  return stripeInstance
}

export const stripe = new Proxy({} as Stripe, {
  get(target, prop, receiver) {
    const instance = getStripe()
    return Reflect.get(instance, prop, instance)
  }
})

export const getStripePrice = async () => {
  // For simplicity, we'll create the price on-demand or use a hardcoded price ID
  // In production, you'd create this in Stripe dashboard and use the price ID
  return process.env.STRIPE_PRICE_ID || 'price_monthly_97'
}