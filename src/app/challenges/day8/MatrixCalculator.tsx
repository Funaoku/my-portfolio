"use client";

import { useState } from "react";
import { Matrix } from "./types";
import { calculateMatrix } from "./matrixOperations";

export default function MatrixCalculator() {
  const [matrixA, setMatrixA] = useState<Matrix>([
    [0, 0],
    [0, 0],
  ]);
  const [matrixB, setMatrixB] = useState<Matrix>([
    [0, 0],
    [0, 0],
  ]);
  const [operation, setOperation] = useState<string>("add");
  const [result, setResult] = useState<Matrix | number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMatrixChange = (
    matrix: Matrix,
    setMatrix: React.Dispatch<React.SetStateAction<Matrix>>,
    row: number,
    col: number,
    value: string
  ) => {
    const newMatrix = matrix.map((r: number[], i: number) =>
      i === row
        ? r.map((c: number, j: number) => (j === col ? parseFloat(value) || 0 : c))
        : r
    );
    setMatrix(newMatrix);
  };

  const handleCalculate = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const calculatedResult = await calculateMatrix(matrixA, matrixB, operation);
      setResult(calculatedResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "計算中にエラーが発生しました");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 行列A */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">行列 A</h2>
          <div className="grid grid-cols-2 gap-2">
            {matrixA.map((row: number[], i: number) =>
              row.map((cell: number, j: number) => (
                <input
                  key={`A-${i}-${j}`}
                  type="number"
                  className="w-full p-2 border rounded"
                  value={cell}
                  onChange={(e) =>
                    handleMatrixChange(matrixA, setMatrixA, i, j, e.target.value)
                  }
                />
              ))
            )}
          </div>
        </div>

        {/* 行列B */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">行列 B</h2>
          <div className="grid grid-cols-2 gap-2">
            {matrixB.map((row: number[], i: number) =>
              row.map((cell: number, j: number) => (
                <input
                  key={`B-${i}-${j}`}
                  type="number"
                  className="w-full p-2 border rounded"
                  value={cell}
                  onChange={(e) =>
                    handleMatrixChange(matrixB, setMatrixB, i, j, e.target.value)
                  }
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* 演算子選択 */}
      <div className="flex justify-center space-x-4">
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="p-2 border rounded"
          disabled={isLoading}
        >
          <option value="add">加算 (A + B)</option>
          <option value="multiply">乗算 (A × B)</option>
          <option value="transpose">転置 (A^T)</option>
          <option value="determinant">行列式 (det(A))</option>
          <option value="inverse">逆行列 (A^-1)</option>
        </select>
        <button
          onClick={handleCalculate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? "計算中..." : "計算"}
        </button>
      </div>

      {/* エラー表示 */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* 結果表示 */}
      {result !== null && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">結果</h2>
          {typeof result === "number" ? (
            <div className="text-2xl">{result}</div>
          ) : (
            <div className="grid grid-cols-2 gap-2 w-fit">
              {result.map((row: number[], i: number) =>
                row.map((cell: number, j: number) => (
                  <div
                    key={`result-${i}-${j}`}
                    className="p-2 border rounded bg-gray-50"
                  >
                    {cell}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 