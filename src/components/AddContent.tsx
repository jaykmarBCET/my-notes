'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import { useSubjectStore } from '@/store/SubjectStore';
import EditorDialog from './EditorDialog';

interface AddContentProps {
    id: string;
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddContent: React.FC<AddContentProps> = ({ id, closeModal }) => {
    const [data, setData] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const { createContent, isLoading } = useSubjectStore();

    const handleSubmit = async () => {
        if (!title.trim() || !data.trim()) return;
        await createContent({ title, content: data, id });
        closeModal(false);
    };

    return (
        <div className="bg-gray-900 w-screen  absolute left-0 top-0  text-white flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-6 border-r border-gray-700">
                <h1 className="text-xl font-bold mb-4 ml-14">Write your notes</h1>

                <div className='flex gap-2 flex-wrap'>
                    <span>Note :-</span>
                    <p className="text-xl font-bold"><span className="text-3xl"># h1</span></p>
                    <p className="text-lg font-semibold"><span className="text-2xl">## h2</span></p>
                    <p className="text-md font-medium"><span className="text-xl">### h3</span></p>
                    <p className="font-bold"><span className="text-base">**bold**</span></p>
                    <p className="font-semibold"><span className="text-base">__bold__</span></p>
                    <p className="text-blue-500">
                        <a href="https://example.com" className="hover:underline">[link](https://example.com)</a>
                    </p>
                    <p>language: ```java ```</p>
                </div>

                <input
                    type="text"
                    placeholder="Enter title..."
                    className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <EditorDialog code={data} setCode={setData} />

                <div className="flex justify-between mt-4">
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition"
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : "Add"}
                    </button>
                    <button
                        onClick={() => closeModal(false)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            {/* Right Section - Output */}
            <div className="w-full md:w-1/2 p-6 overflow-scroll">
                <h1 className="text-xl font-bold mb-4">Preview</h1>
                <div className="bg-gray-800 p-4 rounded-lg overflow-auto min-h-64 markdown-body">
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
                            blockquote: (props) => <blockquote className="border-l-4 border-gray-500 pl-4 italic" {...props} />,
                            code: ({  children, ...props }:React.PropsWithChildren) => (
                                <code
                                    className={`bg-gray-700 p-1 rounded`}
                                    {...props}
                                >
                                    {children}
                                </code>
                            ),
                        }}
                    >
                        {data || "*Output will appear here...*"}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default AddContent;
