import { truncateString } from '@/lib/utils'
import { CopyLinkButton } from "./copyLinkButton"
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type TrackInfo = {
  name: string
  artist: string
  cover: string
  duration: number
  spotifyEmbed: string
  appleMusicLink: string
}


interface ShareLinkPopupProps {
  trigger?: React.ReactNode
  title?: string
  description?: React.ReactNode
  label: string;
  href: string;
  className?: string;
  isBottom?: boolean;
  imageLink?: string;
  variant?: string;
  musicInfo?: TrackInfo;
}

export const ShareLinkPopup = ({
  label,
  href,
  className,
  isBottom,
  imageLink,
  variant,
  musicInfo,
  trigger,
  title,
  description,
}: ShareLinkPopupProps) => {
  const isWhite = variant === 'white'
  const isMusic = variant === 'music'

  const positionClass = isBottom ? 'bottom-0' : 'top-1/2'
  const triggerColorClass = isWhite ? 'text-white' : 'text-black'

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open share options"
            className={`absolute right-4 ${positionClass} -translate-y-1/2 rounded-full p-1.5 hover:bg-gray-100/40 shadow z-20 text-lg ${triggerColorClass} ${className ?? ''}`}
          >
            ⋮
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-center font-LinkSansBold">
              {title ?? 'Share Link'}
            </div>
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>

          <div className="flex justify-center text-center">
            {isMusic ? (
              <a href={href} target="_blank" rel="noopener noreferrer">
                <div className="py-5 px-10 sm:py-10 sm:px-20 rounded-xl border-gray-300 border-2 bg-gray-200">
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={musicInfo?.cover}
                      alt={musicInfo?.name ?? label}
                      className="rounded-lg sm:w-[250px] w-[150px] mx-auto"
                    />
                    <div className="text-center mt-2">
                      <h1 className="sm:text-xl text-lg text-black font-LinkSansBlack mb-2">
                        {label}
                      </h1>
                      <h1 className="sm:text-xl text-lg text-black font-LinkSansBold">
                        {musicInfo?.name}
                      </h1>
                      <p className="text-md text-black font-LinkSansLight">
                        by {musicInfo?.artist}
                      </p>
                      <p className="mt-2 text-md text-gray-500 font-LinkSansRegular">
                        {truncateString(href, 20)}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ) : (
              <div className="py-5 px-10 sm:py-10 sm:px-20 rounded-xl border-gray-300 border-2 bg-gray-200">
                <div className="flex justify-center">
                  {imageLink && (
                    <div
                      className="w-36 h-36 bg-black bg-center bg-cover rounded-lg"
                      style={{ backgroundImage: `url(${imageLink})` }}
                    />
                  )}
                </div>
                <h1 className="text-black font-LinkSansBlack text-2xl">{label}</h1>
                <p className="text-gray-500 font-LinkSansLight">{truncateString(href, 20)}</p>
              </div>
            )}
          </div>

          <div className="flex justify-center w-full py-10">
            <CopyLinkButton link={href} tag="Link" />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
