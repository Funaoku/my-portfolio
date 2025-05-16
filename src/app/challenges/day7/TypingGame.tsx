"use client";
import { useState } from "react";
import { texts } from "./sample";

export default function TypingGame() {
    const [target] = useState(() => texts[0]);
    const [input, setInput] =useState("");

    return (
        <div className="w-full max-w-lg p-6 border rounded-xl">
            <h1 className="text-xl font-bold mb-4">Typing Speed Test</h1>
            <p className="mb-4">{target}</p>
            <textarea
                className="w-full h-32 p-4 border rounded-lg"
                value={input}
                onChange = {(e) => setInput(e.target.value)}
                placeholder="Start typing here..."
            />
        </div>
    )
}