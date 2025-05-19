"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

interface MatrixResult {
  result: number[][];
  error?: string;
}

export default function Day8() {
  const [matrixA, setMatrixA] = useState<string>("[[1,2],[3,4]]");
  const [matrixB, setMatrixB] = useState<string>("[[5,6],[7,8]]");
  const [operation, setOperation] = useState<string>("add");
  const [result, setResult] = useState<MatrixResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const matrixAArray = JSON.parse(matrixA);
      const matrixBArray = JSON.parse(matrixB);

      const response = await fetch("/api/day8", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matrixA: matrixAArray,
          matrixB: matrixBArray,
          operation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "計算中にエラーが発生しました");
        return;
      }

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("入力データの形式が正しくありません");
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
            <Link href="/challenges" className="text-gray-600 dark:text-gray-300 hover:underline">
              ← チャレンジ一覧に戻る
            </Link>
          </div>
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">行列計算機</h1>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="matrixA" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    行列A（JSON形式）
                  </label>
                  <input
                    type="text"
                    id="matrixA"
                    value={matrixA}
                    onChange={(e) => setMatrixA(e.target.value)}
                    className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="matrixB" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    行列B（JSON形式）
                  </label>
                  <input
                    type="text"
                    id="matrixB"
                    value={matrixB}
                    onChange={(e) => setMatrixB(e.target.value)}
                    className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="operation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    演算
                  </label>
                  <select
                    id="operation"
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                    className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="add">加算 (A + B)</option>
                    <option value="subtract">減算 (A - B)</option>
                    <option value="multiply">要素ごとの乗算 (A * B)</option>
                    <option value="dot">行列積 (A @ B)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "計算中..." : "計算実行"}
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
                  <pre className="bg-white dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(result.result, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 