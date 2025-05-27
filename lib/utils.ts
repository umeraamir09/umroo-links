import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getProfilePicture = async () => {
  const res = await fetch(`http://localhost:3000/api/instagram`)
  const data = await res.json();
  return data.profilePic                                                                      
}

export const getFullName = async () => {
  const res = await fetch(`http://localhost:3000/api/instagram`)
  const data = await res.json();
  return data.fullName                                                                    
}

export const truncateString = (str: string, maxLength: number): string => {
  return str.length <= maxLength ? str : str.slice(0, maxLength) + '...';
}

