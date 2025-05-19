"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

type MatrixResult = number[][] | number | string | null;

export default function Day8() {
  // テーブルUI用: 2次元配列で管理
  const [matrixA, setMatrixA] = useState<number[][]>([
    [1, 2],
    [3, 4],
  ]);
  const [matrixB, setMatrixB] = useState<number[][]>([
    [5, 6],
    [7, 8],
  ]);
  const [operation, setOperation] = useState<string>("add");
  const [result, setResult] = useState<MatrixResult>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // テーブルセル編集
  const handleMatrixChange = (
    setter: React.Dispatch<React.SetStateAction<number[][]>>,
    matrix: number[][],
    row: number,
    col: number,
    value: string
  ) => {
    const newMatrix = matrix.map((r, i) =>
      i === row ? r.map((c, j) => (j === col ? Number(value) : c)) : r
    );
    setter(newMatrix);
  };

  // 行追加
  const addRow = (setter: React.Dispatch<React.SetStateAction<number[][]>>, matrix: number[][]) => {
    const cols = matrix[0]?.length || 2;
    setter([...matrix, Array(cols).fill(0)]);
  };
  // 列追加
  const addCol = (setter: React.Dispatch<React.SetStateAction<number[][]>>, matrix: number[][]) => {
    setter(matrix.map((row) => [...row, 0]));
  };
  // 行削除
  const removeRow = (setter: React.Dispatch<React.SetStateAction<number[][]>>, matrix: number[][]) => {
    if (matrix.length > 1) setter(matrix.slice(0, -1));
  };
  // 列削除
  const removeCol = (setter: React.Dispatch<React.SetStateAction<number[][]>>, matrix: number[][]) => {
    if (matrix[0].length > 1) setter(matrix.map((row) => row.slice(0, -1)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("https://my-portfolio-a30e.onrender.com/matrix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matrixA,
          matrixB,
          operation,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "計算中にエラーが発生しました");
      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "予期せぬエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  // テーブル入力UI
  const renderMatrixInput = (
    label: string,
    matrix: number[][],
    setter: React.Dispatch<React.SetStateAction<number[][]>>
  ) => (
    <div className="mb-6 flex flex-col items-center min-w-[220px] md:min-w-[260px]">
      <div className="flex flex-wrap items-center mb-2 gap-2 justify-center">
        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">{label}</span>
        <button type="button" onClick={() => addRow(setter, matrix)} className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 whitespace-nowrap">+行</button>
        <button type="button" onClick={() => removeRow(setter, matrix)} className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 whitespace-nowrap">-行</button>
        <button type="button" onClick={() => addCol(setter, matrix)} className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 whitespace-nowrap">+列</button>
        <button type="button" onClick={() => removeCol(setter, matrix)} className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 whitespace-nowrap">-列</button>
      </div>
      <div className="overflow-x-auto">
        <table className="border border-gray-300 dark:border-gray-600">
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="p-1 border border-gray-300 dark:border-gray-600">
                    <input
                      type="number"
                      value={cell}
                      onChange={e => handleMatrixChange(setter, matrix, i, j, e.target.value)}
                      className="w-16 p-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

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
              ← チャレンジ一覧に戻る
            </Link>
          </div>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              行列計算機
            </h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
                  <div className="flex-1 flex justify-center">
                    {renderMatrixInput("行列A", matrixA, setMatrixA)}
                  </div>
                  <div className="flex-1 flex justify-center">
                    {renderMatrixInput("行列B", matrixB, setMatrixB)}
                  </div>
                </div>
                <div>
                  <label 
                    htmlFor="operation" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    演算
                  </label>
                  <select
                    id="operation"
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                    className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                  {Array.isArray(result) && Array.isArray(result[0]) ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-300 dark:border-gray-600 text-center">
                        <tbody>
                          {result.map((row: number[], i: number) => (
                            <tr key={i}>
                              {row.map((cell: number, j: number) => (
                                <td key={j} className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <pre className="bg-white dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}