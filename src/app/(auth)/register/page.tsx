'use client'

import { useAuthStore } from '@/store/AuthStore'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect } from 'react'
import {PropagateLoader} from 'react-spinners'

export default function RegisterPage() {
    const router = useRouter()
    const { user, register, current,isLoading } = useAuthStore()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!name || !email || !password) { 
            return;
        }
        await register({ name, email, password })
    }

    const handelCurrent = useCallback(async()=>{
            if (user) {
                router.push("/");
            } else {
                await current();
            }
        },[])

    useEffect(() => {
        handelCurrent()
    }, [handelCurrent])

    return (
        <div className='w-screen h-screen bg-[#111827] flex flex-col justify-center items-center px-4 sm:px-6'>
            <h1 className='text-2xl font-semibold text-white mb-6'>Register</h1>
            <div className="w-full max-w-md bg-gray-900 p-6 rounded-lg shadow-lg">
                <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <label className='text-white mb-1'>Name</label>
                        <input className='w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
                            type="text" name='name' placeholder='Enter name' required />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-white mb-1'>Email</label>
                        <input className='w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
                            type="email" name="email" placeholder='Enter email' required />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-white mb-1'>Password</label>
                        <input className='w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
                            type="password" name="password" placeholder='Enter password' required />
                    </div>
                    <button className='w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-300' 
                        type='submit'>
                        {isLoading?<PropagateLoader/>:"Register"}
                    </button>
                </form>
                <p className="text-gray-400 mt-4 text-center cursor-pointer hover:text-blue-400 transition" 
                    onClick={() => router.push("/login")}>
                    Already have an account? <span className="underline">Login</span>
                </p>
            </div>
        </div>
    )
}
