// app/api/instagram/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const username = 'heisumroo'

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://instagram-profile1.p.rapidapi.com/getprofile/${username}`, {
      headers: {
        'X-RapidAPI-Host': 'instagram-profile1.p.rapidapi.com',
        'X-RapidAPI-Key': '513009cc69msh62102e283edcae6p1d52dcjsn570c0ce20b09',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch profile' }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json({ profilePic: data.profile_pic_url_hd, fullName: data.full_name });
  } catch (error) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
