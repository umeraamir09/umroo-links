'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface NewsletterPopupProps {
  blogUrl?: string
  profilePicUrl?: string
  title?: string
}

export function NewsletterPopup({
  blogUrl = 'https://blog.umroo.dev',
  profilePicUrl,
  title = 'Newsletter',
}: NewsletterPopupProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccess(false)

    if (!email) {
      setError('Please enter a valid email.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/ghost/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, blogUrl }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || 'Subscription failed')
      }

      setSuccess(true)
      setEmail('')
    } catch (err: any) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-5 rounded-2xl text-black text-center w-[80%] mx-auto my-2 bg-white">
      {true && (
        <Image
          src={profilePicUrl || "https://cdn.discordapp.com/avatars/738762036741406771/9576ac466aade07b6f8ddccded7484f5.png?size=4096"}
          width={100}
          height={100}
          alt=""
          className="w-[100px] mx-auto rounded-full"
        />
      )}
      <h1 className="text-3xl font-LinkSansBlack text-black mt-3">{title}</h1>
      <p className="text-sm text-gray-600 mt-1">
        Subscribe to my newsletter 'Terminal Adventures' for guides on linux, programming, and tech tips.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@terminaladventures.com"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <Button
          type="submit"
          className="w-full rounded-xl bg-black text-white"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send me the link'}
        </Button>
      </form>

      {success && (
        <p className="mt-3 text-sm text-green-600">Magic link sent. Check your email. Spam folder too!</p>
      )}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  )
}
