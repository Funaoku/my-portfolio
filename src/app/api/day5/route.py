from http.server import BaseHTTPRequestHandler
import json
import numpy as np
from typing import Dict, Any

def calculate(numbers: list) -> Dict[str, float]:
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

def handler(request):
    # CORSヘッダーを設定
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    }

    # OPTIONSリクエストの処理
    if request.method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }

    if request.method == 'POST':
        try:
            # リクエストボディを読み込み
            data = json.loads(request.body)
            
            # 計算を実行
            result = calculate(data['numbers'])
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'result': result})
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': headers,
                'body': json.dumps({'error': str(e)})
            }
    
    return {
        'statusCode': 405,
        'headers': headers,
        'body': json.dumps({'error': 'Method not allowed'})
    } 