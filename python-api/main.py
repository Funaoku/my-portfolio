from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from typing import List
from pydantic import BaseModel

app = FastAPI()

ALLOWED_ORIGINS = [
    "https://my-portfolio-funaokus-projects.vercel.app",  # 本番環境のURL
    "http://localhost:3000"  # ローカル開発環境
]

# CORSの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Numbers(BaseModel):
    numbers: List[float]

@app.get("/")
async def root():
    return {"message": "NumPy Calculator API is running"}

@app.post("/calculate")
async def calculate(numbers: Numbers):
    try:
        # 数値の配列をNumPy配列に変換
        arr = np.array(numbers.numbers)
        
        # 基本的な統計計算を実行
        result = {
            'mean': float(np.mean(arr)),
            'median': float(np.median(arr)),
            'std': float(np.std(arr)),
            'sum': float(np.sum(arr))
        }
        
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 