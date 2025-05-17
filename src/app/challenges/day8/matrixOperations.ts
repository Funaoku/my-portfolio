import { Matrix, MatrixOperation } from "./types";

export async function calculateMatrix(
  matrixA: Matrix,
  matrixB: Matrix,
  operation: MatrixOperation
): Promise<Matrix | number> {
  const response = await fetch("/api/matrix", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ matrixA, matrixB, operation }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "計算中にエラーが発生しました");
  }

  return response.json();
} 