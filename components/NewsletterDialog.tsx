'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FaRegBell } from 'react-icons/fa'
import { TriggerDialog } from '@/components/TriggerDialog'
import { NewsletterPopup } from '@/components/NewsletterPopup'

interface NewsletterDialogProps {
  profilePicUrl?: string
  blogUrl?: string
  title?: string
  autoOpenParam?: string
}

export function NewsletterDialog({
  profilePicUrl,
  blogUrl = 'https://blog.umroo.dev',
  title = 'Newsletter',
  autoOpenParam = 'newsletter',
}: NewsletterDialogProps) {
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!searchParams) return
    const shouldOpen = searchParams.get(autoOpenParam) === '1'
    if (shouldOpen) setOpen(true)
  }, [searchParams, autoOpenParam])

  return (
    <TriggerDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button className="w-10 h-10 rounded-full bg-black/40">
          <FaRegBell />
        </Button>
      }
      title={title}
      description={
        <NewsletterPopup
          profilePicUrl={profilePicUrl}
          blogUrl={blogUrl}
          title={title}
        />
      }
    />
  )
}
