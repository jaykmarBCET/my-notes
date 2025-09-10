'use client';

import { useAuthStore } from '@/store/AuthStore';
import { useSubjectStore } from '@/store/SubjectStore';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BounceLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

export interface SubjectInfo {
    userId: string,
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
function Dashboard() {
    const { user } = useAuthStore();
    const { subject, getSubject, createSubject, isLoading, deleteSubject } = useSubjectStore();
    const [name, setName] = useState<string | null>(null);
    const router = useRouter()
    const handleSubmit = async () => {
        if (!name) return;
        await createSubject({ name });
        setName(null); // Reset input after submission
    };


    useEffect(()=>{
        if(!user){
            router.replace("/login")
        }
    },[])
    useEffect(() => {
        getSubject();
    }, [getSubject]);

    return (
        <div className="w-screen min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-6">
            {/* Header */}
            <h1 className="text-center px-6 py-3 rounded-md text-2xl font-semibold bg-gray-800 shadow-md border border-gray-700">
                Hello, {user?.name || "Guest"}
            </h1>

            {/* Input Form */}
            <div className="mt-6 w-full max-w-lg flex items-center gap-2">
                <input
                    type="text"
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Subject Name"
                    className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition"
                    disabled={isLoading}
                >
                    {isLoading ? <BounceLoader size={20} color="white" /> : "Add"}
                </button>
            </div>

            {/* Subject Cards */}
            <div className="mt-6 w-full  max-w-8xl grid grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-6 md:gap-2 lg:gap-2.6">
                {subject && subject.length > 0 ? (
                    subject.map((item: SubjectInfo, idx: number) => (
                        <div key={idx} className="p-4 mx-auto my-2 max-w-72 flex flex-col items-center gap-4 bg-gray-800 border border-gray-700 rounded-md shadow-md hover:bg-gray-700 transition">
                            <Link href={`/dashboard/subject/${item._id}?id=${item._id}`} className="flex-1">
                                <h3 className="text-lg font-semibold italic  text-center">{item.name}</h3>
                            </Link>
                            <div className='flex gap-4 '>

                                <button className="text-white hover:bg-blue-600 bg-gray-700 text-sm px-4 py-1 rounded-2xl">
                                    Update
                                </button>
                                <button
                                    onClick={() => deleteSubject({ id: item._id })}
                                    className="text-white hover:bg-red-600 bg-gray-700  text-sm px-4 py-1 rounded-2xl"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="mt-4 text-gray-400 text-lg">No subjects available</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
