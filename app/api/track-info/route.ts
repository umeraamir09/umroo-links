// app/api/track-info/route.ts
import { NextRequest, NextResponse } from 'next/server'

interface PlatformDetails {
  url?: string;
  [key: string]: unknown;
}

interface Artist {
  name: string;
  [key: string]: unknown;
}



// Spotify credentials from environment
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!

// Get Spotify token
async function getSpotifyAccessToken(): Promise<string> {
  const tokenUrl = 'https://accounts.spotify.com/api/token'
  const credentials = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')

  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })

  const data = await res.json()
  return data.access_token
}

// Get Odesli (Songlink) data for all platforms
async function getSongLinksFromSonglink(trackId: string): Promise<Record<string, string>> {
  const url = `https://api.song.link/v1-alpha.1/links?url=https://open.spotify.com/track/${trackId}`

  const res = await fetch(url)
  const data = await res.json()

  const links: Record<string, string> = {}

  if (data.linksByPlatform) {
    for (const [platform, details] of Object.entries(data.linksByPlatform)) {
      // only extract url if present
    if (typeof details === 'object' && details && 'url' in details) {
      links[platform] = (details as PlatformDetails).url!;
    }
    }
  }

  return links
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const trackId = searchParams.get('trackId')

  if (!trackId) {
    return NextResponse.json({ error: 'Missing trackId' }, { status: 400 })
  }

  try {
    const accessToken = await getSpotifyAccessToken()

    const spotifyRes = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!spotifyRes.ok) {
      return NextResponse.json({ error: 'Invalid Spotify track ID' }, { status: 404 })
    }

    const track = await spotifyRes.json()

    const name: string = track.name
    const artist: string = track.artists.map((a: Artist) => a.name).join(', ')
    const cover: string = track.album.images[0]?.url
    const duration: number = track.duration_ms
    const spotifyEmbed = `https://open.spotify.com/embed/track/${trackId}`

    const links = await getSongLinksFromSonglink(trackId)

    return NextResponse.json({
      name,
      artist,
      cover,
      duration,
      spotifyEmbed,
      links
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
