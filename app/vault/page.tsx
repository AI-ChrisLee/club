import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function VaultPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Check if user has active subscription
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_active')
    .eq('id', user.id)
    .single()

  if (!profile?.is_active) {
    redirect('/auth/payment')
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">THE VAULT</h1>
      <p className="text-xl mb-4">
        Welcome to the vault! This is where the daily builds will be displayed.
      </p>
      <div className="border-4 border-black p-8 bg-yellow-200">
        <p className="text-lg">
          🚧 Under construction - Daily builds coming soon!
        </p>
      </div>
    </div>
  )
}