import React from 'react'
import { FaInstagram, FaSpotify } from 'react-icons/fa'
import { FaThreads } from 'react-icons/fa6';
import { SlSocialSpotify } from "react-icons/sl";
import { TriggeTooltip } from './TriggerTooltip';


export const LinkIcons = () => {
  return (
    <div className='flex justify-center items-center'>
    <div className='flex space-x-3 mb-4'>
        <TriggeTooltip
        trigger={<a href='/songs'><SlSocialSpotify className='text-[2.5rem]' /></a>}
        content={'More of my favourite songs'}

        />
         <TriggeTooltip
        trigger={<a href='https://instagram.com/umrooishe'><FaInstagram className='text-[2.5rem]' /></a>}
        content={'Second instagram account for my close friends'}

        />
         <TriggeTooltip
        trigger={<a href='https://threads.com/heisumroo/'><FaThreads className='text-[2.5rem]' /></a>}
        content={'Threads'}

        />
    </div>
    </div>
  )
}
