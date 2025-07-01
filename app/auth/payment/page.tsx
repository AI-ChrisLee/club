import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function PaymentPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Check if user already has active subscription
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_active, is_founding_member')
    .eq('id', user.id)
    .single()

  if (profile?.is_active) {
    redirect('/vault')
  }

  // Get current member count for founding member status
  const { count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  const isFoundingMember = (count || 0) < 1000

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8">COMPLETE YOUR MEMBERSHIP</h1>
      
      <div className="border-4 border-black bg-yellow-200 p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {isFoundingMember ? 'FOUNDING MEMBER PRICING' : 'MEMBERSHIP PRICING'}
        </h2>
        <p className="text-3xl font-bold mb-2">$97/month</p>
        <p className="text-lg">
          Cancel anytime. No bullshit cancellation flow.
        </p>
        {isFoundingMember && (
          <p className="text-sm mt-4 font-bold">
            🔒 LOCKED FOREVER - You're member #{(count || 0) + 1} of 1000
          </p>
        )}
      </div>

      <div className="space-y-4 mb-8">
        <h3 className="text-xl font-bold">WHAT YOU GET:</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Daily SaaS replacement builds (30/month)</li>
          <li>Full source code access</li>
          <li>Implementation support</li>
          <li>Live building sessions</li>
          <li>Community access</li>
          <li>Save $322+/month immediately</li>
        </ul>
      </div>

      <form action="/api/create-checkout-session" method="POST">
        <input type="hidden" name="userId" value={user.id} />
        <input type="hidden" name="email" value={user.email} />
        <input type="hidden" name="isFoundingMember" value={isFoundingMember.toString()} />
        
        <button
          type="submit"
          className="w-full py-4 bg-black text-white font-bold text-xl hover:bg-white hover:text-black border-4 border-black"
        >
          START MEMBERSHIP → PAY WITH STRIPE
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Secure payment by Stripe. We never see your card details.
        </p>
        <p className="mt-4">
          <Link href="/auth/logout" className="underline">
            Not you? Logout
          </Link>
        </p>
      </div>
    </div>
  )
}