import numpy as np
import json
import sys
from typing import Union, List, Tuple

def calculate_matrix(
    matrix_a: List[List[float]],
    matrix_b: List[List[float]],
    operation: str
) -> Union[List[List[float]], float]:
    """
    行列演算を行う関数
    
    Args:
        matrix_a: 行列A
        matrix_b: 行列B
        operation: 演算の種類 ("add", "multiply", "transpose", "determinant", "inverse")
    
    Returns:
        演算結果（行列またはスカラー値）
    """
    a = np.array(matrix_a)
    b = np.array(matrix_b)
    
    try:
        if operation == "add":
            return (a + b).tolist()
        elif operation == "multiply":
            return (a @ b).tolist()
        elif operation == "transpose":
            return a.T.tolist()
        elif operation == "determinant":
            return float(np.linalg.det(a))
        elif operation == "inverse":
            return np.linalg.inv(a).tolist()
        else:
            raise ValueError(f"Unknown operation: {operation}")
    except np.linalg.LinAlgError as e:
        raise ValueError(f"Matrix operation failed: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print(json.dumps({"error": "Invalid number of arguments"}))
        sys.exit(1)

    try:
        matrix_a = json.loads(sys.argv[1])
        matrix_b = json.loads(sys.argv[2])
        operation = sys.argv[3]

        result = calculate_matrix(matrix_a, matrix_b, operation)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1) 