import Image from 'next/image';
import { LinkButton } from '@/components/LinkButton';
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { Button } from '@/components/ui/button';
import { FaArrowLeft } from 'react-icons/fa';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { TriggerDialog } from '@/components/TriggerDialog';
import { CopyLinkButton } from '@/components/copyLinkButton';
import { MdOutlineInsertLink } from 'react-icons/md';
import { metadata } from '../layout';

metadata.title = "Songs Playlist"

const PROFILE_QUERY = `*[_type == "profile" && slug.current == 'umroo'][0]`;
const BUTTONS_QUERY = `*[_type== "buttons" && order >= 9] | order(order asc)`
const options = { next: { revalidate: 30 } };
 
export default async function Home() {
  const profile = await client.fetch<SanityDocument>(PROFILE_QUERY, {}, options);
  const buttons = await client.fetch<SanityDocument[]>(BUTTONS_QUERY, {}, options);
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            `url('https://i.ibb.co/393VCq02/Untitled-1.png')`,
        }}
      />

      {/* Overlay */}
      <div className="relative z-10 min-h-screen flex justify-center items-start py-20 px-4 bg-black/50">
        {/* Main Content Box */}
        <div className="w-full max-w-xl rounded-2xl text-white">
          <div className='flex justify-between'>
            <a href={process.env.BASE_URL}><Button className='w-10 h-10 rounded-full bg-black/40'><FaArrowLeft /></Button></a>
            
            <TriggerDialog
              trigger={<Button className='w-10 h-10 rounded-full bg-black/40'><IoEllipsisHorizontal /></Button>}
              title={'Share My Links'}
              description={<>
                <div className='bg-[#f2c679] p-5 rounded-2xl text-black text-center w-[80%] mx-auto my-2'>
                  <Image src={profile.profilepicurl} alt="" className='w-[100px] mx-auto rounded-full' />
                  <h1 className='text-3xl font-LinkSansBlack text-black mt-3'>{profile.fullname}</h1>
                  <div className='flex justify-center'> 
                    <h1 className='flex items-center font-LinkSansMedium text-lg'><MdOutlineInsertLink className='text-bold text-3xl mr-1' />umroo.art/links</h1>
                  </div>
                </div>
                <CopyLinkButton link={process.env.BASE_URL!} tag='Link' />
              </>}
            
            />

          </div>
          {/* Profile Image */}
          <div className="flex justify-center mb-4">
            <img src={profile.profilepicurl || 'https://pbs.twimg.com/profile_banners/1850808694365122560/1748177961/1500x500'} width={100} height={100} alt='image' className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-sm text-white">
            </img>
          </div>

          {/* Username */}
          <h1 className="text-center text-xl font-bold mb-1">{"Playlist"}</h1>

          {/* Bio */}
          <p className="text-center text-sm text-white/70 mb-4">
            🎸 These are all of my favourite songs enjoy :) 🎵
          </p>
          


          {/* Links */}
          <div className="space-y-3">
          
            {buttons.map((button) => (
              <LinkButton key={button._id} label={button.label} href={button.href} type={button.type} imageLink={button.imgurl} contactName={profile.contactname} contactNumber={profile.contactnumber} contactEmail={profile.contactEmail} trackId={button.spotifyTrackId} description={button.description} commnityTitle={button.communityTitle}></LinkButton>   
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}