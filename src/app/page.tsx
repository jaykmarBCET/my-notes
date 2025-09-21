'use client'
import { useAuthStore } from '@/store/AuthStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect } from 'react'


function Home() {

  const {user,current} = useAuthStore()
  const router = useRouter()

  const handelCurrent = useCallback(async()=>{
    current()
    if(user){
      router.replace("/dashboard")
    }
  },[])
  
  useEffect(()=>{
    handelCurrent()
  },[handelCurrent])
  
  return (
    <div className='flex flex-col items-center justify-center w-screen min-h-screen bg-gray-900 text-white p-4'>
      <div className='text-center mb-8'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold italic mb-2 tracking-wide'>
          Welcome to <span className='text-yellow-400'>Make Notes</span>
        </h1>
        <p className='text-sm md:text-base text-gray-400 font-light'>
          Your personal space for capturing ideas, thoughts, and to-do&apos;s.
        </p>
      </div>

      <div className='flex flex-col items-center space-y-4'>
        <Link href="/register" 
              className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 shadow-lg'>
          Create Account
        </Link>
        <p className='text-gray-500'>or</p>
        <Link href="/login" 
              className='bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 shadow-lg'>
          Login
        </Link>
      </div>
    </div>
  )
}

export default Home