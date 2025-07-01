'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      setSuccess(true)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md">
        <div className="border-4 border-black bg-yellow-200 p-8">
          <h2 className="text-2xl font-bold mb-4">CHECK YOUR EMAIL</h2>
          <p className="mb-4">
            We sent a verification link to <strong>{email}</strong>
          </p>
          <p>
            Click the link in the email to verify your account and start cancelling SaaS subscriptions.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="text-4xl font-bold mb-4">JOIN THE CLUB</h1>
      <p className="text-xl mb-8">
        Start saving $322/month instantly. Cancel anytime.
      </p>
      
      <form onSubmit={handleSignup} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            EMAIL
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 bg-white"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 bg-white"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
            CONFIRM PASSWORD
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 bg-white"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="border-2 border-red-600 bg-red-100 p-3 text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-black text-white font-bold hover:bg-white hover:text-black disabled:opacity-50"
        >
          {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p>
          Already a member?{' '}
          <Link href="/auth/login" className="underline font-bold">
            LOGIN
          </Link>
        </p>
      </div>

      <div className="mt-8 border-2 border-black p-4 bg-gray-100">
        <p className="text-sm">
          By signing up, you'll get access to:
        </p>
        <ul className="list-disc list-inside text-sm mt-2">
          <li>Daily SaaS replacement builds</li>
          <li>Source code downloads</li>
          <li>Community support</li>
          <li>Live building sessions</li>
          <li>$97/month (locked price for first 1000 members)</li>
        </ul>
      </div>
    </div>
  )
}