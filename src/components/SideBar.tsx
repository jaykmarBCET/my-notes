'use client'
import { useAuthStore } from '@/store/AuthStore';
import { useSubjectStore } from '@/store/SubjectStore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {  Menu, X } from 'lucide-react';

export default function SideBar() {
    const { user, current } = useAuthStore();
    const [opened, setOpened] = useState<boolean>(false);
    console.log(user)
    useEffect(() => {
        current()
    }, [current])
    return (
        <div className="relative z-50">
            {/* Toggle Button */}
            <button
                className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
                onClick={() => setOpened((prev) => !prev)}  // ✅ Toggle Sidebar
            >
                {opened ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-screen w-72 bg-gray-900 text-white shadow-lg transform ${opened ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <Sections setOpened={setOpened} />
                {/* ✅ Correct prop name for clarity */}
            </div>
        </div>
    );
}

function Sections({ setOpened }: { setOpened: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { subject } = useSubjectStore();
    const { user,logout } = useAuthStore();

    return (
        <div className="flex flex-col h-full p-4">
            {/* User Info */}
            <div className="flex items-center space-x-3 pb-4 border-b border-gray-700">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full text-lg font-semibold">
                    {user?.name?.charAt(0) || "?"}
                </div>
                <h1 className="text-lg font-semibold">{user?.name || "Guest"}</h1>
            </div>

            {/* Subject Links */}
            <nav className="mt-4 overflow-auto scrollbar-hide flex flex-col space-y-2">
                {subject && subject.length > 0 ? (
                    subject.map((item, idx) => (
                        <Link
                            key={idx}
                            href={`/dashboard/subject/${item._id}?id=${item._id}`}
                            className="px-4 py-2 rounded-md hover:bg-gray-700 transition"
                        >
                            {item.name}
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-400">No subjects available</p>
                )}
            </nav>
            <div className='flex mt-auto gap-2'>

                <button className="mt-auto w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition" onClick={() => logout()}>LogOut</button>
                <button
                    className="mt-auto w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                    onClick={() => setOpened(false)}  // ✅ Correctly updates state
                >
                    Close
                </button>
            </div>
        </div>
    );
}
