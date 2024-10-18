import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

function HomeSection() {
  return (
    <div className='bg-gradient-to-b from-green-100 via-green-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-black h-[30rem] transition-colors duration-300'>
      <div className='w-full h-full'>
        <div className='flex flex-col w-full justify-center items-center h-full'>
          <Link href={"/home"}>
          <h1 className='font-bold text-5xl mb-4 text-gray-900 dark:text-white'>
            PlayPals
          </h1>
          </Link>
          <p className='font-semibold text-2xl mb-4 text-gray-700 dark:text-gray-300'>
            Bring Your Game, We Bring the Players
          </p>
          <Link href={"/sign-in"}>
          <Button className='bg-gray-800 text-white hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-600 '>
            Get Started
          </Button>
          </Link>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default HomeSection;
