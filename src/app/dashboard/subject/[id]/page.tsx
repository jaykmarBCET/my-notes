'use client'

import { useSubjectStore } from '@/store/SubjectStore'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github.css";
import EditContent from '@/components/EditContent';
import AddContent from '@/components/AddContent';
import { SubjectInfo } from '../../page';
import { useRouter, useSearchParams } from 'next/navigation';

interface ContentInfo {
    title: string;
    _id: string;
    subjectId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

function Page() {
    const params = useSearchParams()
    const id = params.get("id")
    const [currentContent, seCurrentContent] = useState<ContentInfo | null>(null)
    const [open, setOpen] = useState(false)
    const [openA, setOpenA] = useState(false)
    const { subject, getContent, content, deleteContent, getSubject } = useSubjectStore()
    const currentSubject = subject?.find((item: SubjectInfo) => item._id === id)
    const router = useRouter()
    useEffect(() => {
        if (id) {
            getSubject()
            getContent({ id })
        }
    }, [id, getContent, getSubject])

    return (
        <div className='flex flex-col min-h-screen items-center w-full bg-gray-900 text-gray-300 p-4 md:p-6'>
            <h1 className='bg-gray-800 px-4 md:px-6 mt-8 md:mt-14 py-2 md:py-3 rounded-lg text-lg font-semibold shadow-md'>
                {currentSubject?.name || "Subject not found"}
            </h1>

            <div className='grid min-h-[50vh] grid-cols-1 md:grid-cols-8 mt-4 gap-4 w-full max-w-7xl'>
                <div className='col-span-1 md:col-span-6 w-full rounded bg-gray-800 p-4 text-gray-300 shadow-md '>
                    {currentContent && (
                        <div className='flex justify-between items-center mb-2'>
                            <h1 className='text-xl font-semibold'>{currentContent?.title}</h1>
                            <button className='px-3 py-1 bg-blue-500 rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400' onClick={() => router.push("/dashboard")}>Dashboard</button>
                        </div>
                    )}
                    <div className='prose prose-sm md:prose-base text-wrap overflow-auto'>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                                h1: (props) => <h1 className="text-2xl font-bold mb-2" {...props} />,
                                h2: (props) => <h2 className="text-xl font-semibold mb-2" {...props} />,
                                h3: (props) => <h3 className="text-lg font-medium mb-2" {...props} />,
                                p: (props) => <p className="mb-2" {...props} />,
                                ul: (props) => <ul className="list-disc list-inside mb-2" {...props} />,
                                ol: (props) => <ol className="list-decimal list-inside mb-2" {...props} />,
                                li: (props) => <li className="ml-4" {...props} />,
                                blockquote: (props) => <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-400" {...props} />,
                                code: (props) => (
                                    <code className="bg-gray-700  rounded block p-2 text-gray-200 overflow-x-auto" {...props} />
                                ),
                            }}
                        >
                            {currentContent?.content}
                        </ReactMarkdown>
                        {currentContent?.content ? (
                            open ? (
                                <div className=" inset-0 bg-black bg-opacity-50 absolute w-screen h-screen backdrop-blur-sm flex items-center justify-center z-50">
                                    <EditContent item={currentContent} closeModal={setOpen} />
                                </div>
                            ) : (
                                <div className='flex justify-center gap-4 mt-4'>
                                    <button className='px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base' onClick={() => setOpen(true)}>Edit</button>
                                    <button onClick={() => deleteContent({ id: currentContent._id })} className='px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm md:text-base'>DELETE</button>
                                </div>
                            )
                        ) : (
                            <p className="text-gray-400 mt-4">Select a content item to view.</p>
                        )}
                    </div>
                </div>

                <div className='col-span-1 md:col-span-2 rounded bg-gray-800 p-4 text-gray-300 shadow-md'>
                    <h2 className="text-lg font-semibold mb-3">Content List</h2>
                    <button className='bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md my-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 w-full' onClick={() => setOpenA(true)}>ADD Content</button>
                    {id && openA && (
                        <div className=" inset-0 bg-black bg-opacity-50  absolute left-0 top-0 backdrop-blur-sm flex items-center justify-center z-50">
                            <AddContent id={id} closeModal={setOpenA} />
                        </div>
                    )}

                    <div className='overflow-y-auto max-h-96'>
                        {content ? (
                            content.map((item: ContentInfo, idx: number) => (
                                <div
                                    key={idx}
                                    onClick={() => seCurrentContent(item)}
                                    className={`cursor-pointer  hover:bg-gray-700 p-2 rounded transition my-1 ${currentContent?._id === item._id ? 'border border-gray-700 bg-gray-800' : 'bg-gray-900'}`}
                                >
                                    <h1 className="text-sm font-medium truncate">{item.title}</h1>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No content available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page