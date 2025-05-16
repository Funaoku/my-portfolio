"use client";
import { useState } from "react";
import { texts } from "./sample";
import { useRef } from "react";
import { useEffect } from "react";
export default function TypingGame() {
    const [target, setTarget] = useState<string>(() => texts[0]);
    const [input, setInput] =useState("");
    const [phase, setPhase] = useState<"ready" | "playing" | "finished">("ready");
    const [seconds, setSeconds] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [wpm, setWpm] = useState(0);
    

    const handleKeyDown = () => {
        if (phase === "ready") {
            setPhase("playing");
            timerRef.current = setInterval(() => {
                setSeconds((s) => +(s + 0.1).toFixed(1));
            },100);
            //setInterval(fn, 1000) → 1000 ミリ秒ごとに fn を無限に呼び続ける
            //JavaScript のタイマーは OS やブラウザの負荷で数 ms〜十数 ms 遅れることがあるので、toFixed(1) → 小数点第1位までの数値を文字列に変換
            //先頭の + は 単項プラス演算子で、文字列を即座に数値へ変換
        }
    }

    const finish = () => {
        clearInterval(timerRef.current!);
        setPhase("finished");
        
        const wordsTyped = input.trim().split(" ").length;
        const minutes = seconds / 60;
        setWpm(Math.round(wordsTyped / minutes || 0));
    }
    const reset = () => {
        clearInterval(timerRef.current!);
        setPhase("ready");
        setInput("");
        setSeconds(0);
        setWpm(0);
        setTarget(texts[Math.floor(Math.random() * texts.length)]);
    }

    useEffect(() => {
        if (phase === "playing" && seconds >= 60){
            clearInterval(timerRef.current!);
            setPhase("finished");
        }
        if (phase === "playing" && input === target){
            finish();
        }
    },[phase, seconds,input, target]);
    //依存配列に指定した値が 変わったときだけ effectFn が再実行される（※ 初回マウント時は必ず 1 回実行）

    return (
        <div className="w-full max-w-lg p-6 border rounded-xl">
            <h1 className="text-xl font-bold mb-4">Typing Speed Test</h1>
            <p className="mb-4">{target}</p>
            <textarea
                className="w-full h-32 p-4 border rounded-lg"
                value={input}
                onKeyDown = {handleKeyDown}
                onChange = {(e) => setInput(e.target.value)}
                placeholder="Start typing here..."
            />
            
            <button onClick={reset} className="mt-6 w-full py-2 bg-amber-500 text-white rounded-xl">
                {phase === "finished" ? "Try Again" : "Reset"}
            </button>
            <div className="mt-4 flex justify-between text-sm">
                <span>Time: {seconds}s</span>
                <span>WPM: {wpm ?? "-"}</span>
            </div>
        </div>
        

    )
}
