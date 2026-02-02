import React from 'react'
import { Button } from './ui/button'
import { SiApplemusic, SiAmazonmusic, SiYoutubemusic } from "react-icons/si"
import { FaSpotify } from "react-icons/fa"
import { CiShare1 } from "react-icons/ci"
import { FaSoundcloud } from "react-icons/fa6"

type Links = {
    spotify?: string
    appleMusic?: string
    youtube?: string
    amazonMusic?: string
    deezer?: string
    tidal?: string
    soundcloud?: string
    pandora?: string
    [key: string]: string | undefined // fallback for any extra platforms
}

type PlatformKey = 'spotify' | 'apple' | 'youtube' | 'amazon' | 'soundcloud'

interface Props {
    variant?: PlatformKey
    links?: Links
}


const PLATFORM_CONFIG: Record<PlatformKey, { label: string; hrefKey: keyof Links; color: string; Icon: React.ComponentType<{ color?: string }> }> = {
  spotify: { label: 'Spotify', hrefKey: 'spotify', color: '#1DB954', Icon: FaSpotify },
  apple: { label: 'Apple Music', hrefKey: 'appleMusic', color: '#FF0436', Icon: SiApplemusic },
  youtube: { label: 'YouTube Music', hrefKey: 'youtube', color: '#FF0000', Icon: SiYoutubemusic },
  amazon: { label: 'Amazon Music', hrefKey: 'amazonMusic', color: '#0DBFF5', Icon: SiAmazonmusic },
  soundcloud: { label: 'SoundCloud', hrefKey: 'soundcloud', color: '#ff5500', Icon: FaSoundcloud },
}

export const ListenOnButtons = ({ variant = 'spotify', links }: Props) => {
  const platform = PLATFORM_CONFIG[variant]
  const href = links?.[platform.hrefKey]

  if (!href) return null

  return (
    <Button
      asChild
      variant="outline"
      className="w-full text-sm text-black font-LinkSansBold mb-2"
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <span className="flex items-center w-full gap-2">
          <platform.Icon color={platform.color} />
          <span>{platform.label}</span>
          <CiShare1 className="ml-auto" />
        </span>
      </a>
    </Button>
  )
}
