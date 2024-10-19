import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function HomeSection() {
  return (
    <div className='bg-gradient-to-b from-green-100 via-green-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-[30rem] transition-colors duration-300 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-4xl'>
        <div className='flex flex-col items-center text-center'>
          <Link href="/home">
            <h1 className='font-bold text-3xl sm:text-4xl md:text-5xl mb-4 text-gray-900 dark:text-white transition-colors duration-300'>
              PlayPals
            </h1>
          </Link>
          <p className='font-semibold text-lg sm:text-xl md:text-2xl mb-6 text-gray-700 dark:text-gray-300 transition-colors duration-300 max-w-2xl'>
            Bring Your Game, We Bring the Players
          </p>
          <Link href="/sign-in">
            <Button className='bg-gray-800 text-white hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-600 transition-colors duration-300 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3'>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}