'use client'
import React, { forwardRef } from 'react'
import { ShareLinkPopup } from "./ShareLinkPopup"
import { useEffect, useState } from 'react'
import { Button } from "./ui/button"
import { MdAlternateEmail } from "react-icons/md"
import { FaLink, FaMapMarkerAlt } from "react-icons/fa"
import { ListenOnButtons } from "./ListenOnButtons"
import { TriggerDialog } from "./TriggerDialog"
import { TriggerDrawer } from "./TriggerDrawer"
import { IoLogoDiscord } from "react-icons/io5"
import { useMediaQuery } from "../lib/useMediaQuery"
import { FaDiscord } from "react-icons/fa6"
import { NewsletterPopup } from "./NewsletterPopup"


interface Props {
  label: string;
  href: string;
  type?: string;
  imageLink?: string;
  contactName?: string;
  contactEmail?: string;
  contactNumber?: string;
  description?: string;
  commnityTitle?: string;
  trackId?: string;
  gameIds?: string[];
}

type TrackInfo = {
  name: string
  artist: string
  cover: string
  duration: number
  spotifyEmbed: string
  links: {
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
}

type GameInfo = {
  id: number
  name: string
  slug: string
  image?: string
}

const ContactContent = ({ contactEmail }: { contactEmail?: string }) => (
  <div className="px-6 py-4 text-black text-center font-LinkSansBold">
    <h2 className="mt-2 text-xl font-bold">Umer Aamir</h2>
    <p className="text-gray-500 mt-1">He · Him</p>

    <div className="mt-6 space-y-4 text-left">
      <div className="flex items-center space-x-3">
        <MdAlternateEmail className="text-xl" />
        <span className="text-sm break-all">{contactEmail ?? 'Not available'}</span>
      </div>
      <div className="flex items-start space-x-3">
        <FaDiscord className="text-base mt-1" />
        <span className="text-sm leading-snug">umrooo</span>
      </div>
      <div className="flex items-start space-x-3">
        <FaMapMarkerAlt className="text-base mt-1" />
        <span className="text-sm leading-snug">🟩 Karachi, Pakistan</span>
      </div>
      <div className="flex items-center space-x-3">
        <FaLink className="text-base" />
        <a href="https://umroo.art/links" target="_blank" rel="noopener noreferrer" className="text-sm underline">
          umroo.art/links
        </a>
      </div>
    </div>
  </div>
)

const MusicTrigger = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { label: string; cover?: string }
>(({ label, cover, ...props }, ref) => (
    <div ref={ref} {...props} className={`relative w-full ${props.className ?? ''}`}>
      <div className="base-link-btn pl-16">
        {cover && (
          <img
            src={cover}
            width={45}
            height={45}
            className="rounded-full absolute left-3"
            alt="Track cover"
            loading="lazy"
            decoding="async"
          />
        )}
        <span className="z-10 pointer-events-auto">{label}</span>
      </div>
    </div>
  )
)
MusicTrigger.displayName = 'MusicTrigger'

const MusicContent = ({ trackInfo }: { trackInfo: TrackInfo | null }) => (
  <>
    <div className="flex justify-center mt-3">
      {trackInfo?.spotifyEmbed ? (
        <iframe
          src={`${trackInfo.spotifyEmbed}?utm_source=generator`}
          width="100%"
          height="300"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify embed"
        ></iframe>
      ) : (
        <div className="text-center text-sm text-gray-500">Embed not available.</div>
      )}
    </div>
    <div className="w-full">
      <h1 className="text-xl text-gray-500 font-LinkSansMedium">Listen On</h1>
      <div className="space-y-2">
        <ListenOnButtons variant="spotify" links={trackInfo?.links} />
        <ListenOnButtons variant="apple" links={trackInfo?.links} />
        <ListenOnButtons variant="youtube" links={trackInfo?.links} />
        <ListenOnButtons variant="soundcloud" links={trackInfo?.links} />
        <ListenOnButtons variant="amazon" links={trackInfo?.links} />
      </div>
    </div>
  </>
)

const DiscordTrigger = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { label: string; imageLink?: string; description?: string }
>(({ label, imageLink, description, ...props }, ref) => (
    <div ref={ref} {...props} className={`relative w-full ${props.className ?? ''}`}>
      <div className="base-link-btn h-96 rounded-3xl">
        <span className="z-10 pointer-events-auto text-center absolute top-6">{label}</span>
        <FaDiscord size={25} className="absolute top-5 left-5" />
        {imageLink && (
          <img
            className="h-48 rounded-xl"
            src={imageLink}
            alt="Discord server"
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="flex items-center justify-center bg-white/40 px-2 rounded-full backdrop-blur-md text-sm absolute bottom-[5.2rem]">
          <FaDiscord className="text-[#5865F2] mr-2" size={25} />Join My Discord
        </div>
        <h1 className="absolute bottom-10 font-bold">{"Umroo's Gang"}</h1>
        <p className="absolute text-sm text-gray-600 bottom-5 font-LinkSansLight">{description}</p>
      </div>
    </div>
  )
)
DiscordTrigger.displayName = 'DiscordTrigger'

const DiscordContent = ({ href, imageLink, description }: { href: string; imageLink?: string; description?: string }) => (
  <div className="relative rounded-xl overflow-hidden text-center font-sans w-full max-w-md mx-auto">
    <div className="relative aspect-square w-full">
      {imageLink ? (
        <img
          src={imageLink}
          alt="server icon"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="w-full h-full bg-gray-200" />
      )}

      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <div className="absolute bottom-0 left-0 w-full flex flex-col items-center px-6 pb-6 text-black z-10 space-y-2">
        <div className="flex items-center space-x-2 text-sm text-black bg-white p-2 rounded-full">
          <IoLogoDiscord className="text-[#5865F2]" size={20} />
          <span className="font-LinkSansBold">Discord Server</span>
        </div>
        <h1 className="text-xl md:text-2xl font-LinkSansBold">{"Umroo's Gang"}</h1>
        <div className="font-LinkSansLight text-gray-800 text-2xl">Free</div>

        <a href={href} className="w-full flex justify-center" target="_blank" rel="noopener noreferrer">
          <Button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 w-[80%] h-11">
            Join server for free
          </Button>
        </a>

        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </div>
)

const GameTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { label: string; games?: GameInfo[] }
>(({ label, games, ...props }, ref) => (
  <div ref={ref} {...props} className={`relative w-full ${props.className ?? ''}`}>
    <div className="base-link-btn relative gap-3">
      <div className="flex items-center gap-2 mr-auto">
        {games?.slice(0, 3).map((game) => (
          <div
            key={game.id}
            className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden border border-black/10"
          >
            {game.image ? (
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-full h-full bg-gray-300" />
            )}
          </div>
        ))}
      </div>
      <span className="z-10 pointer-events-auto text-center absolute left-1/2 -translate-x-1/2">
        {label}
      </span>
    </div>
  </div>
))
GameTrigger.displayName = 'GameTrigger'

const GameContent = ({ games }: { games: GameInfo[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {games.map((game) => (
      <div key={game.id} className="rounded-xl border border-gray-200 bg-white p-3 text-center">
        <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
          {game.image ? (
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>
        <div className="mt-2 text-sm text-center font-LinkSansBold text-black">{game.name}</div>
      </div>
    ))}
  </div>
)



export const LinkButton = ({
  label,
  href,
  type,
  imageLink,
  contactEmail,
  trackId,
  description,
  gameIds
}: Props) => {

  const isMobile = useMediaQuery("(max-width: 513px)")
  const isMusic = type === 'music'
  const isGame = type === 'game'

  const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [games, setGames] = useState<GameInfo[]>([])
  const [gamesLoading, setGamesLoading] = useState(false)
  const [gamesError, setGamesError] = useState<string | null>(null)

  useEffect(() => {
    if (!isMusic) return

    setLoading(true)
    setError(null)

    if (!trackId) {
      setLoading(false)
      setError('Missing track id')
      return
    }

    const controller = new AbortController()

    const fetchTrackInfo = async () => {
      try {
        const res = await fetch(`/api/track-info?trackId=${trackId}`, {
          signal: controller.signal,
        })
        const data = await res.json()

        if (!res.ok) throw new Error(data.error || 'Failed to fetch track info')

        setTrackInfo(data)
      } catch (err: any) {
        if (err?.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchTrackInfo()
    return () => controller.abort()
  }, [isMusic, trackId])

  useEffect(() => {
    if (!isGame) return

    setGamesLoading(true)
    setGamesError(null)

    if (!gameIds || gameIds.length === 0) {
      setGamesLoading(false)
      setGamesError('Missing game ids')
      return
    }

    const controller = new AbortController()

    const fetchGames = async () => {
      try {
        const ids = gameIds.join(',')
        const res = await fetch(`/api/game-info?ids=${encodeURIComponent(ids)}`, {
          signal: controller.signal,
        })
        const data = await res.json()

        if (!res.ok) throw new Error(data.error || 'Failed to fetch games')

        setGames(data.games || [])
      } catch (err: any) {
        if (err?.name !== 'AbortError') {
          setGamesError(err.message)
        }
      } finally {
        setGamesLoading(false)
      }
    }

    fetchGames()
    return () => controller.abort()
  }, [isGame, gameIds])

  if (type === 'thumbnail') {

    return (
      <div className="relative w-full">
        <a href={href}>
          <div
            className="relative w-full h-72 bg-center bg-cover rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(0,0,0)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)] hover:translate-x-[2px] hover:translate-y-[2px] text-white font-LinkSansBold transition duration-200 text-lg sm:text-base flex items-center justify-center px-6 border-2 border-black before:content-[''] before:absolute before:inset-0 before:bg-black/50 before:rounded-[2.5rem] before:z-0"
            style={{ backgroundImage: `url(${imageLink})` }}
          >
            <span className="z-10 pointer-events-auto absolute bottom-8 left-8 text-xl">
              {label}
            </span>
          </div>
        </a>
        <ShareLinkPopup label={label} href={href} imageLink={imageLink} variant="white" isBottom />
      </div>
    );
  }

  if (type === 'contact') {
    const content = <ContactContent contactEmail={contactEmail} />
    if (isMobile) {
      return (
              <TriggerDrawer
          trigger={<div className="relative w-full">
              <div className="base-link-btn">
                <span className="z-10 pointer-events-auto text-center">{label}</span>
              </div>
            </div>}
          title={label}
          description={content}
        />
      )
    }

    return (
      <TriggerDialog
        title={label}
        trigger={<div className="relative w-full">
            <div className="base-link-btn">
              <span className="z-10 pointer-events-auto text-center">{label}</span>
            </div>
          </div>}
        description={content}
      />
    );
  }

  if (type === 'music') {
    const trigger = <MusicTrigger label={label} cover={trackInfo?.cover} />

    const content = loading ? (
      <div className="py-6 text-center text-sm text-gray-500">Loading track info...</div>
    ) : error ? (
      <div className="py-6 text-center text-sm text-red-500">{error}</div>
    ) : (
      <MusicContent trackInfo={trackInfo} />
    )

    if (isMobile) {
      return <TriggerDrawer trigger={trigger} title={label} description={content} />
    }

    return <TriggerDialog trigger={trigger} title={label} description={content} />
  }
if (type === 'discord') {

  if (isMobile) {
    return (
    <TriggerDrawer
      trigger={<DiscordTrigger label={label} imageLink={imageLink} description={description} />}
      title="Discord server"
      description={<DiscordContent href={href} imageLink={imageLink} description={description} />}
    />
  );
  }
  return (
    <TriggerDialog
      trigger={<DiscordTrigger label={label} imageLink={imageLink} description={description} />}
      title="Discord server"
      description={<DiscordContent href={href} imageLink={imageLink} description={description} />}
    />
  );
}

  if (type === 'game') {
    const trigger = <GameTrigger label={label} games={games} />

    const content = gamesLoading ? (
      <div className="py-6 text-center text-sm text-gray-500">Loading games...</div>
    ) : gamesError ? (
      <div className="py-6 text-center text-sm text-red-500">{gamesError}</div>
    ) : games.length ? (
      <GameContent games={games} />
    ) : (
      <div className="py-6 text-center text-sm text-gray-500">No games found.</div>
    )

    if (isMobile) {
      return <TriggerDrawer trigger={trigger} title={label} description={content} />
    }

    return <TriggerDialog trigger={trigger} title={label} description={content} />
  }

  if (type === 'newsletter') {
    const trigger = (
      <div className="relative w-full">
        <div className="base-link-btn">
          <span className="z-10 pointer-events-auto text-center">{label}</span>
        </div>
      </div>
    )

    const content = <NewsletterPopup title={label} profilePicUrl={imageLink} />

    if (isMobile) {
      return <TriggerDrawer trigger={trigger} title={label} description={content} />
    }

    return <TriggerDialog trigger={trigger} title={label} description={content} />
  }





  
  if (type == 'download') {
    
  }

  // default link button
  return (
    <div className="relative w-full">
      <a href={href}>
        <div className="base-link-btn">
          <span className="z-10 pointer-events-auto text-center">{label}</span>
        </div>
      </a>
      <ShareLinkPopup label={label} href={href} />
    </div>
  );
};
