"use client"

import { useState } from "react"

export default function MarkdownPage() {
    const [left,setLeft] = useState<string>();
    const [right,setRight] = useState<string>();
    return (
        <div className='grid grid-cols-2 gap-4'>
            <textarea
                className="p-2 border rounded"
                placeholder="Markdown here..."
                value={left}
                onChange={(e) => setLeft(e.target.value)}
            />{}
            <textarea
                className="p-2 border rounded"
                placeholder="Plain text here..."
                value={right}
                onChange={(e) => setRight(e.target.value)}
            />{}
        </div>
    )
}