import { NextRequest, NextResponse } from 'next/server'

const DEFAULT_BLOG_URL = 'https://blog.umroo.dev'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email = body?.email
    const blogUrl = body?.blogUrl || DEFAULT_BLOG_URL

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const endpoint = `${blogUrl.replace(/\/$/, '')}/members/api/send-magic-link/`

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, emailType: 'subscribe' }),
    })

    const text = await res.text()

    if (!res.ok || text !== 'Created.') {
      return NextResponse.json({ error: text || 'Subscription failed' }, { status: 400 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Ghost subscribe error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
