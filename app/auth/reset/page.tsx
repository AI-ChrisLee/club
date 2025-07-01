'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
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
            We sent a password reset link to <strong>{email}</strong>
          </p>
          <p>
            Click the link in the email to reset your password.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="text-4xl font-bold mb-8">RESET PASSWORD</h1>
      
      <form onSubmit={handleReset} className="space-y-6">
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
          {loading ? 'SENDING...' : 'SEND RESET LINK'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p>
          Remember your password?{' '}
          <Link href="/auth/login" className="underline font-bold">
            LOGIN
          </Link>
        </p>
      </div>
    </div>
  )
}