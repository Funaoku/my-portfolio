'use client';

import { useState } from 'react';
import Link from 'next/link';

const Day2Page = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link href="/challenges" className="inline-block mb-8 text-gray-600 dark:text-gray-300 hover:underline">
          ← チャレンジ一覧に戻る
        </Link>
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">Day 2: カウンター</h1>
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
            <p className="text-6xl font-bold mb-8">{count}</p>
            <button
              onClick={() => setCount(count + 1)}
              className="bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Up
            </button>
            <button 
              onClick={() => setCount(count - 1)}
              className="bg-white text-black dark:bg-black dark:text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Down
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Day2Page; 