import React from 'react'
import { Button } from './ui/button'
import { SiApplemusic } from "react-icons/si";
import { FaSpotify } from "react-icons/fa";
import { CiShare1 } from "react-icons/ci";
import { FaSoundcloud } from "react-icons/fa6";
import { SiYoutubemusic } from "react-icons/si";
import { SiAmazonmusic } from "react-icons/si";

type links = {
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

interface Props {
    variant?: string;
    links?: links;
}


export const ListenOnButtons = ({variant, links} : Props) => {
    if (variant == "apple") {
        return (
            <a href={links?.appleMusic} target='_blank'>
            <Button variant={'outline'} className='w-full text-sm text-black font-LinkSansBold mb-2'>
                <div className='flex justify-start items-center w-full space-x-1'>
                    < SiApplemusic color='#FF0436'/> <span>Apple Music</span>
                    <CiShare1 className='absolute right-8' />
                </div>
            </Button>
            </a>
        )
    }

    if (variant == "youtube") {
         return (
            <a href={links?.youtube} target='_blank'>
            <Button variant={'outline'} className='w-full text-sm text-black font-LinkSansBold mb-2'>
                <div className='flex justify-start items-center w-full space-x-1'>
                    <SiYoutubemusic color='#FF0000'/> <span>Youtube Music</span>
                    <CiShare1 className='absolute right-8' />
                </div>
            </Button>
            </a>
        )
    }

    if (variant == "amazon") {
         return (
            <a href={links?.amazonMusic} target='_blank'>
            <Button variant={'outline'} className='w-full text-sm text-black font-LinkSansBold mb-2'>
                <div className='flex justify-start items-center w-full space-x-1'>
                    < SiAmazonmusic color='#0DBFF5'/> <span>Amazon Music</span>
                    <CiShare1 className='absolute right-8' />
                </div>
            </Button>
            </a>
        )
    }

    if (variant == "soundcloud") {
         return (
            <a href={links?.soundcloud} target='_blank'>
            <Button variant={'outline'} className='w-full text-sm text-black font-LinkSansBold mb-2'>
                <div className='flex justify-start items-center w-full space-x-1'>
                    < FaSoundcloud color='#ff5500'/> <span>SoundCloud</span>
                    <CiShare1 className='absolute right-8' />
                </div>
            </Button>
            </a>
        )
    }

    return (
            <a href={links?.spotify} target='_blank'>
            <Button variant={'outline'} className='w-full text-sm text-black font-LinkSansBold mb-2'>
                <div className='flex justify-start items-center w-full space-x-1'>
                    < FaSpotify color='#1DB954'/> <span>Spotify</span>
                    <CiShare1 className='absolute right-8' />
                </div>
            </Button>
            </a>
        )
}
