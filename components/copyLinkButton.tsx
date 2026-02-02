'use client'

import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { IoIosLink, IoIosCheckmark } from 'react-icons/io'

interface Props {
  link: string
  tag?: string
  variant?: 'default' | 'outline'
}

export function CopyLinkButton({ link, tag, variant = 'default' }: Props) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const icon = copied ? (
    <IoIosCheckmark className="text-green-500 text-xl" />
  ) : (
    <IoIosLink className="text-black text-xl" />
  )

  const buttonClassName = cn(
    'rounded-full transition-all duration-200',
    variant === 'outline'
      ? 'w-10 h-10 border border-gray-300 bg-white/10 hover:bg-white/20 backdrop-blur-md'
      : 'w-14 h-14 bg-white border border-black hover:bg-gray-100 shadow-md'
  )

  return (
    <div className={cn('text-center', variant === 'outline' ? '' : 'space-y-2')}>
      <div className="flex justify-center">
        <Button
          onClick={handleCopy}
          className={buttonClassName}
          aria-live="polite"
          aria-label={copied ? 'Link copied' : 'Copy link'}
        >
          {icon}
        </Button>
      </div>
      {variant !== 'outline' && (
        <p className="text-sm text-gray-800 font-medium font-LinkSansMedium">
          {copied ? 'Copied!' : `Copy ${tag}`}
        </p>
      )}
    </div>
  )
}
