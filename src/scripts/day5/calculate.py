import sys
import json
import numpy as np

def calculate(numbers):
    # 数値の配列をNumPy配列に変換
    arr = np.array(numbers)
    
    # 基本的な統計計算を実行
    result = {
        'mean': float(np.mean(arr)),
        'median': float(np.median(arr)),
        'std': float(np.std(arr)),
        'sum': float(np.sum(arr))
    }
    
    return result

if __name__ == '__main__':
    # コマンドライン引数から数値の配列を取得
    numbers = json.loads(sys.argv[1])
    
    # 計算を実行して結果を出力
    result = calculate(numbers)
    print(json.dumps(result)) 