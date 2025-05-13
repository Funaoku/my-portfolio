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
      const response = await fetch('https://your-python-api.onrender.com/calculate', {
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
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/challenges" className="text-gray-600 dark:text-gray-300 hover:underline">
              ← Back to Challenges
            </Link>
          </div>
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">NumPy計算機</h1>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="numbers" className="block text-sm font-medium mb-2">
                    数値をカンマ区切りで入力してください
                  </label>
                  <input
                    type="text"
                    id="numbers"
                    value={numbers}
                    onChange={(e) => setNumbers(e.target.value)}
                    placeholder="例: 1, 2, 3, 4, 5"
                    className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded disabled:opacity-50"
                >
                  {isLoading ? '計算中...' : '計算実行'}
                </button>
              </form>

              {error && (
                <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
                  {error}
                </div>
              )}

              {result && (
                <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded">
                  <h2 className="text-xl font-bold mb-4">計算結果</h2>
                  <dl className="space-y-2">
                    <div>
                      <dt className="font-medium">平均値:</dt>
                      <dd>{result.mean}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">中央値:</dt>
                      <dd>{result.median}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">標準偏差:</dt>
                      <dd>{result.std}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">合計:</dt>
                      <dd>{result.sum}</dd>
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