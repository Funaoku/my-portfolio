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

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # リクエストの長さを取得
        content_length = int(self.headers['Content-Length'])
        # リクエストボディを読み込み
        post_data = self.rfile.read(content_length)
        # JSONをパース
        data = json.loads(post_data.decode('utf-8'))
        
        try:
            # 計算を実行
            result = calculate(data['numbers'])
            
            # レスポンスを返す
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'result': result}).encode())
        except Exception as e:
            # エラーレスポンスを返す
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode()) 