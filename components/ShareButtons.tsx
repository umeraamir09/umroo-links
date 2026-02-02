'use client'
import React from 'react'
import { Button } from './ui/button'

interface ShareButtonsProps {
  url: string
  title?: string
}

type SharePlatform = 'whatsapp' | 'discord' | 'instagram'

const PLATFORM_CONFIG: Record<SharePlatform, { label: string; className: string; getUrl: (encodedText: string) => string }> = {
  whatsapp: {
    label: 'Share on WhatsApp',
    className: 'bg-green-500 text-white hover:bg-green-600',
    getUrl: (encodedText) => `https://wa.me/?text=${encodedText}`,
  },
  discord: {
    label: 'Share on Discord',
    className: 'bg-indigo-500 text-white hover:bg-indigo-600',
    getUrl: () => 'https://discord.com/channels/@me',
  },
  instagram: {
    label: 'Share on Instagram',
    className: 'bg-pink-500 text-white hover:bg-pink-600',
    getUrl: () => 'https://www.instagram.com/',
  },
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title = "Check this out!" }) => {
  const encodedText = encodeURIComponent(`${title} ${url}`)

  const handleShare = (platform: SharePlatform) => {
    const shareUrl = PLATFORM_CONFIG[platform].getUrl(encodedText)
    window.open(shareUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex gap-4">
      {(Object.keys(PLATFORM_CONFIG) as SharePlatform[]).map((platform) => (
        <Button
          key={platform}
          onClick={() => handleShare(platform)}
          className={`px-4 py-2 rounded-lg ${PLATFORM_CONFIG[platform].className}`}
        >
          {PLATFORM_CONFIG[platform].label}
        </Button>
      ))}
    </div>
  )
}
