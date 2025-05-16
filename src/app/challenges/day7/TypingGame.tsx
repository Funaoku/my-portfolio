/* app/challenges/day7/TypingGame.tsx */
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { texts } from "./sample";

type Phase = "ready" | "playing" | "finished";
type TimerID = ReturnType<typeof setInterval> | null;

export default function TypingGame() {
  /* ---------- state & refs ---------- */
  const [target,  setTarget]  = useState<string>(texts[0]);
  const [input,   setInput]   = useState("");
  const [phase,   setPhase]   = useState<Phase>("ready");
  const [seconds, setSeconds] = useState(0);          // 0.1 秒刻み
  const [wpm,     setWpm]     = useState<number>();
  const timerRef              = useRef<TimerID>(null);

  /* ---------- handlers ---------- */
  const handleKeyDown = () => {
    if (phase === "ready") {
      setPhase("playing");
      timerRef.current = setInterval(() => {
        setSeconds((s) => +(s + 0.1).toFixed(1));
      }, 100);
    }
  };

  const finish = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("finished");

    const words   = input.trim().split(/\s+/).filter(Boolean).length;
    const minutes = seconds / 60;
    const wpmVal  = minutes > 0 ? words / minutes : 0;
    setWpm(Math.round(wpmVal));
  }, [input, seconds]);

  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("ready");
    setInput("");
    setSeconds(0);
    setWpm(undefined);
    setTarget(texts[Math.floor(Math.random() * texts.length)]);
  };

  /* ---------- 自動終了 ---------- */
  useEffect(() => {
    if (phase === "playing" && (seconds >= 60 || input === target)) {
      finish();
    }
  }, [phase, seconds, input, target, finish]);

  /* ---------- UI ---------- */
  return (
    <div className="flex flex-col items-center justify-center">
      {/* カード */}
      <div className="w-full max-w-lg px-4 sm:px-8 py-8 bg-white dark:bg-slate-700 rounded-2xl shadow-2xl hover:shadow-amber-400/40 transition-shadow">
        <h1 className="text-2xl font-bold text-center mb-6">
          Typing Speed Test
        </h1>

        {/* お題文 */}
        <p className="mb-4 leading-relaxed break-all select-none">
          {target.split("").map((ch, i) =>
            i < input.length ? (
              <span
                key={i}
                className={input[i] === ch ? "text-emerald-500" : "text-red-500"}
              >
                {ch}
              </span>
            ) : (
              <span key={i} className="text-gray-400 opacity-50">
                {ch}
              </span>
            )
          )}
        </p>

        {/* 進捗バー */}
        <div className="h-2 mb-4 bg-gray-200 rounded-full">
          <div
            style={{ width: `${(input.length / target.length) * 100}%` }}
            className="h-full bg-emerald-400 rounded-full transition-all"
          />
        </div>

        {/* 入力欄 */}
        <textarea
          className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-emerald-400 dark:bg-slate-800"
          placeholder="Start typing here..."
          value={input}
          disabled={phase === "finished"}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* ステータス */}
        <div className="mt-4 flex justify-between text-sm">
          <span>Time: {seconds}s</span>
          <span>WPM: {wpm ?? "-"}</span>
        </div>

        {/* リセット / 再挑戦 */}
        <button
          onClick={reset}
          className="mt-6 w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition"
        >
          {phase === "finished" ? "Try Again" : "Reset"}
        </button>
      </div>
    </div>
  );
}
