/**
 * 2次元配列を表す型
 */
export type Matrix = Array<Array<number>>;

/**
 * 行列演算の種類
 */
export type MatrixOperation = "add" | "multiply" | "transpose" | "determinant" | "inverse"; 