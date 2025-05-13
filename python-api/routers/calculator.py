from fastapi import APIRouter, HTTPException
import numpy as np
from typing import List
from pydantic import BaseModel

router = APIRouter()

class Numbers(BaseModel):
    numbers: List[float]

@router.post("/calculate")
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