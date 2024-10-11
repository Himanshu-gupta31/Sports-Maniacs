"use client"
import React, { useEffect, useState } from 'react'
// import location from "@/public/assest/location.svg"
import Image from 'next/image'
import { MapPin } from 'lucide-react'
interface Card {
    location: string,
    sports: string,
    numberofplayers: string,
    beginingtime: Date,  
    endingtime: Date,      
    contact: string,
    level: string,
}

function Connectwithpals() {
    const [connectcard, setConnectcard] = useState<Card[]>([])

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await fetch("/api/getpals")
                const data = await response.json()
                console.log(data)
                setConnectcard(data.getallcard || [])
            } catch (error) {
                console.error("An error occurred while fetching groups:", error);
            }
        }
        fetchCard()
    }, [])

    return (
        <div className='pt-6 px-8'>
            {connectcard?.length > 0 ? (
                <div className='grid grid-cols-3 gap-4'>
                    {connectcard.map((item, index) => (
                        <div key={index} className='border border-gray-300 w-[25rem] h-[15rem] rounded-2xl shadow-xl shadow-green-300 p-4 '>
                            <div className='flex items-center'>
                            <MapPin className='mr-2'/>
                            <h3 className='text-lg font-bold'>{item.location}</h3>
                            </div>
                            <p className='py-2'>Sport: {item.sports}</p>
                            <p className='py-2 font-semibold'>Pals Needed: {item.numberofplayers}</p>
                            <p className='py-2'>{new Date(item.beginingtime).toLocaleTimeString()}-{new Date(item.endingtime).toLocaleTimeString()}</p>
                            <p className='py-2 font-semibold'>Contact: {item.contact}</p>
                            <div className='border border-black bg-neutral-200 rounded-lg flex justify-center items-center dark:text-black'>
                                <p className='text-sm'>{item.level}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No Pals Request Right Now</p>
            )}
        </div>
    )
}

export default Connectwithpals
