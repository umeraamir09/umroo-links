'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

type ParsedItem = { label: string; trackId: string }

const parseLines = (input: string): ParsedItem[] => {
  return input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separator = line.includes('|') ? '|' : line.includes(',') ? ',' : null
      if (!separator) return null
      const [label, trackId] = line.split(separator).map((part) => part.trim())
      if (!label || !trackId) return null
      return { label, trackId }
    })
    .filter((item): item is ParsedItem => Boolean(item))
}

export function SongBulkAdd() {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    setSuccess('')

    const items = parseLines(value)

    if (!items.length) {
      setError('Add at least one line in the format: Song Name | SpotifyTrackId')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/bulk-songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || 'Bulk add failed')
      }

      setSuccess(`Added ${data.created ?? items.length} songs.`)
      setValue('')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl bg-white/90 text-black p-4 mb-6">
      <div className="text-lg font-LinkSansBold">Quick Add Songs</div>
      <p className="text-sm text-gray-600 mt-1">
        Paste lines as: Song Name | Spotify Track ID (or link). One per line.
      </p>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={`Hurt | 6rqhFgbbKwnb9MLmUQDhG6\nAfter Dark | 7M4XZ5z6rZjqxCQKn9w7Y0`}
        className="mt-3 w-full min-h-[120px] rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
      <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3">
        <Button onClick={handleSubmit} disabled={loading} className="bg-black text-white">
          {loading ? 'Adding...' : 'Add Songs'}
        </Button>
        {success && <span className="text-sm text-green-700">{success}</span>}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    </div>
  )
}
