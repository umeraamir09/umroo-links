import { NextRequest, NextResponse } from 'next/server'
import { adminClient } from '@/sanity/lib/adminClient'

const MAX_ORDER_QUERY = `*[_type == "buttons"].order | order(desc)[0]`

const parseTrackIdFromUrl = (url: string) => {
  try {
    const parsed = new URL(url)
    const segments = parsed.pathname.split('/').filter(Boolean)
    const trackIndex = segments.findIndex((segment) => segment === 'track')
    if (trackIndex >= 0 && segments[trackIndex + 1]) {
      return segments[trackIndex + 1]
    }
  } catch {
    return null
  }

  return null
}

const resolveTrackId = async (input: string) => {
  const trimmed = input.trim()

  const spotifyUriMatch = trimmed.match(/spotify:track:([a-zA-Z0-9]+)/)
  if (spotifyUriMatch?.[1]) return spotifyUriMatch[1]

  const directMatch = trimmed.match(/track\/([a-zA-Z0-9]+)/)
  if (directMatch?.[1]) return directMatch[1]

  const parsedFromUrl = parseTrackIdFromUrl(trimmed)
  if (parsedFromUrl) return parsedFromUrl

  try {
    const parsed = new URL(trimmed)
    const host = parsed.hostname

    if (host.includes('spotify.link') || host.includes('spotify.app.link')) {
      const res = await fetch(trimmed, { redirect: 'follow' })
      const finalUrl = res.url
      const idFromRedirect = parseTrackIdFromUrl(finalUrl)
      if (idFromRedirect) return idFromRedirect
    }
  } catch {
    // ignore invalid URLs
  }

  return trimmed
}

type IncomingItem = { label?: string; trackId?: string }
type NormalizedItem = { label: string; trackId: string }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const items: IncomingItem[] = Array.isArray(body?.items) ? body.items : []

    if (!items.length) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    const maxOrder = (await adminClient.fetch<number | null>(MAX_ORDER_QUERY)) ?? 0
    const baseOrder = Math.max(maxOrder, 10)

    const normalized: NormalizedItem[] = items
      .map((item) => ({
        label: item?.label?.trim(),
        trackId: item?.trackId?.trim(),
      }))
      .filter((item): item is NormalizedItem => Boolean(item.label && item.trackId))

    if (!normalized.length) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 })
    }

    const tx = adminClient.transaction()

    for (let index = 0; index < normalized.length; index += 1) {
      const item = normalized[index]
      const trackId = await resolveTrackId(item.trackId)

      if (!trackId) {
        return NextResponse.json({ error: `Invalid track id for: ${item.label}` }, { status: 400 })
      }

      const href = `https://open.spotify.com/track/${trackId}`

      tx.create({
        _type: 'buttons',
        label: item.label,
        type: 'music',
        href,
        spotifyTrackId: trackId,
        order: baseOrder + index + 1,
      })
    }

    const result = await tx.commit()

    return NextResponse.json({ ok: true, created: result.results.length })
  } catch (error) {
    console.error('Bulk songs error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
