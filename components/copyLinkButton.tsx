'use client'

import { Button } from './ui/button'
import { useState } from 'react'
import { IoIosLink } from 'react-icons/io'
import { IoIosCheckmark } from 'react-icons/io'

interface Props {
  link: string
  tag?: string
  variant?: string
}

export function CopyLinkButton({ link, tag, variant }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const icon = copied ? <IoIosCheckmark className="text-green-500 text-xl" /> : <IoIosLink className="text-gray-700 text-xl" />

  if (variant === 'outline') {
    return (
      <div className="text-center">
        <Button
          onClick={handleCopy}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-200"
        >
          {icon}
        </Button>
      </div>
    )
  }

  return (
    <div className="text-center space-y-2">
      <div className='flex justify-center'>
      <Button
        onClick={handleCopy}
        className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-gray-500 via-gray-200 to-gray-300 hover:from-gray-500 hover:to-white text-gray-900 shadow-md transition-all duration-200"
      >
        {icon}
      </Button>
      </div>
      <p className="text-sm text-gray-800 font-medium font-LinkSansMedium">{copied ? 'Copied!' : `Copy ${tag}`}</p>
    </div>
  )
}
