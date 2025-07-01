import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const params = await searchParams
  
  if (!params.session_id) {
    redirect('/auth/payment')
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <div className="border-4 border-black bg-green-200 p-8 mb-8">
        <h1 className="text-4xl font-bold mb-4">WELCOME TO THE CLUB!</h1>
        <p className="text-xl mb-4">
          Your membership is active. Time to start cancelling SaaS.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">WHAT HAPPENS NEXT:</h2>
          <ol className="text-left max-w-md mx-auto space-y-3">
            <li>1. Check your email for receipt</li>
            <li>2. Browse today's build in the Vault</li>
            <li>3. Download the source code</li>
            <li>4. Cancel your first SaaS subscription</li>
            <li>5. Share your success in Threads</li>
          </ol>
        </div>

        <Link
          href="/vault"
          className="inline-block border-4 border-black bg-black text-white px-8 py-4 text-xl font-bold hover:bg-white hover:text-black"
        >
          GO TO THE VAULT →
        </Link>

        <p className="text-sm text-gray-600">
          New builds drop daily at 7 AM. You'll save $322 this month alone.
        </p>
      </div>
    </div>
  )
}