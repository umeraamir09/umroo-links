import { NextRequest, NextResponse } from 'next/server'

const RAWG_API_KEY = process.env.RAWG_API_KEY

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const idsParam = searchParams.get('ids')

  if (!idsParam) {
    return NextResponse.json({ error: 'Missing ids parameter' }, { status: 400 })
  }

  if (!RAWG_API_KEY) {
    return NextResponse.json({ error: 'RAWG_API_KEY is not configured' }, { status: 500 })
  }

  const ids = idsParam.split(',').map((id) => id.trim()).filter(Boolean)

  if (!ids.length) {
    return NextResponse.json({ error: 'No valid ids provided' }, { status: 400 })
  }

  try {
    const games = await Promise.all(
      ids.map(async (id) => {
        const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${RAWG_API_KEY}`)
        if (!res.ok) {
          return null
        }
        const data = await res.json()
        return {
          id: data.id,
          name: data.name,
          slug: data.slug,
          image: data.background_image,
        }
      })
    )

    return NextResponse.json({
      games: games.filter(Boolean),
    })
  } catch (error) {
    console.error('Game info error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
