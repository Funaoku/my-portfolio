import sys
import json
import numpy as np

def calculate_matrix_operations(matrix_a, matrix_b, operation):
    try:
        # NumPy配列に変換
        a = np.array(matrix_a)
        b = np.array(matrix_b)

        result = None
        if operation == "add":
            result = a + b
        elif operation == "subtract":
            result = a - b
        elif operation == "multiply":
            result = a * b
        elif operation == "dot":
            result = np.dot(a, b)
        else:
            return {"error": "無効な演算です"}

        return {"result": result.tolist()}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print(json.dumps({"error": "引数の数が不正です"}))
        sys.exit(1)

    try:
        matrix_a = json.loads(sys.argv[1])
        matrix_b = json.loads(sys.argv[2])
        operation = sys.argv[3]

        result = calculate_matrix_operations(matrix_a, matrix_b, operation)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1) 