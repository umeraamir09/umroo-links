'use client'
import React from 'react'

interface ShareButtonsProps {
  url: string
  title?: string
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title = "Check this out!" }) => {
  const encodedText = encodeURIComponent(`${title} ${url}`)

  const handleShare = (platform: 'whatsapp' | 'discord' | 'instagram') => {
    let shareUrl = ''

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}`
        break
      case 'discord':
        // Discord doesn't allow web-based sharing, so best we can do is open a new message or prompt copy
        shareUrl = `https://discord.com/channels/@me`
        break
      case 'instagram':
        // Instagram doesn't support direct web share. We redirect to app or open profile
        shareUrl = `https://www.instagram.com/`
        break
    }

    window.open(shareUrl, '_blank')
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={() => handleShare('whatsapp')}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        Share on WhatsApp
      </button>

      <button
        onClick={() => handleShare('discord')}
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
      >
        Share on Discord
      </button>

      <button
        onClick={() => handleShare('instagram')}
        className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
      >
        Share on Instagram
      </button>
    </div>
  )
}
