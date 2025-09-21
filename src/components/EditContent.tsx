'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github.css";
import { useSubjectStore } from '@/store/SubjectStore';
import { ContentInfo } from '@/types/types';

function EditContent({
    item,
    closeModal
}: {
    item: ContentInfo;
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [data, setData] = useState<string>(item.content);
    const [title, setTitle] = useState<string>(item.title);
    const { updateContent, isLoading } = useSubjectStore();

    const handleSubmit = async () => {
        if (!title.trim() || !data.trim()) {
            alert("Title and content cannot be empty!");
            return;
        }
        await updateContent({ title, content: data, id: item._id });
        closeModal(false);
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-md z-50 flex items-center justify-center p-0">
            <div className="bg-gray-900 text-white w-full h-full rounded-none md:rounded-lg shadow-lg p-4 md:p-6 overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4 sticky top-0 bg-gray-900 z-10">
                    <h1 className="text-xl font-bold">Edit Content</h1>
                    <button
                        onClick={() => closeModal(false)}
                        className="text-gray-400 hover:text-white text-2xl leading-none font-bold"
                    >
                        &times;
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row gap-4 flex-grow overflow-hidden">
                    {/* Left - Editor */}
                    <div className="w-full md:w-1/2 flex flex-col overflow-hidden">
                        <h2 className="text-lg font-semibold mb-2">Write your notes</h2>
                        <input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="Enter heading"
                            className="w-full p-2 mb-3 bg-gray-800 rounded focus:outline-none"
                        />
                        <textarea
                            className="w-full h-48 md:h-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow overflow-auto resize-none"
                            placeholder="Write Markdown here..."
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="mt-4 bg-green-700 hover:bg-green-800 px-4 py-2 rounded disabled:opacity-50 self-start"
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </div>

                    {/* Right - Preview */}
                    <div className="w-full md:w-1/2 flex flex-col overflow-hidden">
                        <h2 className="text-lg font-semibold mb-2">Preview</h2>
                        <div className="bg-gray-800 p-4 rounded-lg overflow-auto flex-grow markdown-body">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                                components={{
                                    h1: ({ ...props }) => <h1 className="text-2xl font-bold mb-2" {...props} />,
                                    h2: ({ ...props }) => <h2 className="text-xl font-semibold mb-2" {...props} />,
                                    h3: ({ ...props }) => <h3 className="text-lg font-medium mb-2" {...props} />,
                                    h4: ({ ...props }) => <h4 className="text-md font-medium mb-2" {...props} />,
                                    h5: ({ ...props }) => <h5 className="text-sm font-medium mb-2" {...props} />,
                                    h6: ({ ...props }) => <h6 className="text-xs font-medium mb-2" {...props} />,
                                    p: ({ ...props }) => <p className="mb-2" {...props} />,
                                    ul: ({ ...props }) => <ul className="list-disc list-inside mb-2" {...props} />,
                                    ol: ({ ...props }) => <ol className="list-decimal list-inside mb-2" {...props} />,
                                    li: ({ ...props }) => <li className="ml-4" {...props} />,
                                    blockquote: ({ ...props }) => (
                                        <blockquote className="border-l-4 border-gray-500 pl-4 italic" {...props} />
                                    ),
                                    code: ({           
                                        children,
                                        ...props
                                    }:React.PropsWithChildren ) => {
                                        
                                        return (
                                            <pre className="p-3 rounded-lg bg-gray-800 overflow-auto">
                                                <code {...props}>
                                                    {children}
                                                </code>
                                            </pre>
                                        );
                                    }
                                }}
                            >
                                {data || "*Output will appear here...*"}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditContent;
