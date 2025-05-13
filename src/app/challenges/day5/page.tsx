'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';

interface CalculationResult {
  mean: number;
  median: number;
  std: number;
  sum: number;
}

export default function CalculatePage() {
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      // 入力された文字列を数値の配列に変換
      const numberArray = numbers.split(',').map(n => parseFloat(n.trim()));

      // Python APIサーバーにリクエストを送信
      const response = await fetch('https://numpy-calculator-api.onrender.com/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numbers: numberArray }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || '計算中にエラーが発生しました');
      }

      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center gap-4 mb-8">
            <Link 
              href="/challenges" 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              ← Back to Challenges
            </Link>
          </div>
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              NumPy計算機
            </h1>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label 
                    htmlFor="numbers" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    数値をカンマ区切りで入力してください
                  </label>
                  <input
                    type="text"
                    id="numbers"
                    value={numbers}
                    onChange={(e) => setNumbers(e.target.value)}
                    placeholder="例: 1, 2, 3, 4, 5"
                    className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? '計算中...' : '計算実行'}
                </button>
              </form>

              {error && (
                <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 rounded-md">
                  {error}
                </div>
              )}

              {result && (
                <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    計算結果
                  </h2>
                  <dl className="space-y-3">
                    <div className="flex justify-between items-center">
                      <dt className="font-medium text-gray-700 dark:text-gray-300">平均値:</dt>
                      <dd className="text-gray-900 dark:text-white">{result.mean.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between items-center">
                      <dt className="font-medium text-gray-700 dark:text-gray-300">中央値:</dt>
                      <dd className="text-gray-900 dark:text-white">{result.median.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between items-center">
                      <dt className="font-medium text-gray-700 dark:text-gray-300">標準偏差:</dt>
                      <dd className="text-gray-900 dark:text-white">{result.std.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between items-center">
                      <dt className="font-medium text-gray-700 dark:text-gray-300">合計:</dt>
                      <dd className="text-gray-900 dark:text-white">{result.sum.toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 