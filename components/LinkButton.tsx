'use client'
import { ShareLinkPopup } from "./ShareLinkPopup";
import { useEffect, useState } from 'react'
import { Button } from "./ui/button";
import { CopyLinkButton } from "./copyLinkButton";
import { MdAccessTime, MdAlternateEmail } from "react-icons/md";
import { FaLink, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { ListenOnButtons } from "./ListenOnButtons";
import { TriggerDialog } from "./TriggerDialog";
import { TriggerDrawer } from "./TriggerDrawer";
import { IoLogoDiscord } from "react-icons/io5";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Skeleton } from "./ui/skeleton";
import { FaDiscord } from "react-icons/fa6";


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


export const LinkButton = ({
  label,
  href,
  type,
  imageLink,
  contactEmail,
  contactName,
  contactNumber,
  trackId,
  commnityTitle,
  description
}: Props) => {

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
    return (
      <TriggerDialog
        title={label}
        trigger={<div className="relative w-full">
            <div className="base-link-btn">
              <span className="z-10 pointer-events-auto text-center">{label}</span>
            </div>
          </div>}
        description={
  <div className="px-6 py-4 text-black text-center font-LinkSansBold">
    <h2 className="mt-2 text-xl font-bold">Umer Aamir</h2>
    <p className="text-gray-500 mt-1">He · Him</p>

    <div className="mt-6 space-y-4 text-left">
      <div className="flex items-center space-x-3">
        <MdAlternateEmail className="text-xl" />
        <span className="text-sm break-all">{contactEmail}</span>
      </div>
      <div className="flex items-center space-x-3">
        <FaPhoneAlt className="text-sm" />
        <span className="text-sm">{contactNumber}</span>
      </div>
      <div className="flex items-start space-x-3">
        <FaDiscord className="text-base mt-1" />
        <span className="text-sm leading-snug">
          umrooo
        </span>
      </div>
      <div className="flex items-start space-x-3">
        <FaMapMarkerAlt className="text-base mt-1" />
        <span className="text-sm leading-snug">
          Karachi, Pakistan, 75300
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <FaLink className="text-base" />
        <a href="" target="_blank" rel="noopener noreferrer" className="text-sm underline">
          umroo.art/links
        </a>
      </div>
    </div>

    <button className="mt-6 border border-black text-black text-sm px-4 py-2 rounded-full hover:bg-black hover:text-white transition">
      Save to contacts
    </button>
  </div>
}
      />
    );
  }

  if (type === 'music') {
    const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

useEffect(() => {
  const fetchTrackInfo = async () => {
    try {
      const res = await fetch(`/api/track-info?trackId=${trackId}`)
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Failed to fetch track info')

      setTrackInfo(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  fetchTrackInfo()
}, [trackId])

    return (
      <TriggerDialog
        trigger={<div className="relative w-full">
            <div className="base-link-btn pl-16"> {/* add space for image */}
              {trackInfo?.cover && (
                <img src={trackInfo.cover} width={45} className="rounded-full absolute left-3" />
              )}
              <span className="z-10 pointer-events-auto">{label}</span>
            </div>
            <div onClick={(e) => e.stopPropagation}>
            </div>
          </div>}
        title={label}
        description={<><div className="flex justify-center mt-3">
                <iframe
                  src={`${trackInfo?.spotifyEmbed}?utm_source=generator`}
                  width="100%" height="300"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
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
              </div></>}
      
      />
    );
  }
if (type === 'discord') {
  return (
    <TriggerDialog
      trigger={
        <div className="relative w-full">
          <div className="base-link-btn h-96 rounded-3xl">
            <span className="z-10 pointer-events-auto text-center absolute top-6">{label}</span>
            <FaDiscord size={25}  className="absolute top-5 left-5" />
            <img className=" h-48 rounded-xl" src={imageLink} />
              <div className="flex items-center justify-center bg-white/40 px-2 rounded-full backdrop-blur-md text-sm absolute bottom-[5.2rem]" style={{}}><FaDiscord className="text-[#5865F2] mr-2" size={25} />Join My Discord</div>
            <h1 className="absolute bottom-10 font-bold">{"Umroo's Gang"}</h1>
            <p className="absolute text-sm text-gray-600 bottom-5 font-LinkSansLight">{description}</p>
          </div>
          <div>
          </div>
        </div>
      }
      title="Discord server"
      description={
        <div className="relative rounded-xl overflow-hidden text-center font-sans w-full max-w-md mx-auto">
          {/* Background image with fade overlay */}
          <div className="relative aspect-square w-full">
            <img
              src={imageLink}
              alt="server icon"
              className="w-full h-full object-cover"
            />

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent pointer-events-none" />

            {/* Overlayed text content */}
            <div className="absolute bottom-0 left-0 w-full flex flex-col items-center px-6 pb-6 text-black z-10 space-y-2">
              {/* Title */}

              {/* Discord + Free */}
              <div className="flex items-center space-x-2 text-sm text-black">
                <IoLogoDiscord className="text-[#5865F2]" size={20} />
                <span className="font-LinkSansBold">Discord server</span>
              </div>
              <h1 className="text-xl md:text-2xl font-LinkSansBold">{"Umroo's Gang"}</h1>
              <div className="font-LinkSansLight text-gray-800 text-2xl">Free</div>

              {/* Join Button */}
              <a href={href} className="w-full flex justify-center">
                <Button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 w-[80%] h-11">
                  Join server for free
                </Button>
              </a>

              {/* Description */}
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
        </div>
      }
    />
  );
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
