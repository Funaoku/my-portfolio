from fastapi import APIRouter, HTTPException
import numpy as np
from typing import List
from pydantic import BaseModel

router = APIRouter()

class MatrixRequest(BaseModel):
    matrixA: List[List[float]]
    matrixB: List[List[float]]
    operation: str

@router.post("/matrix")
async def calculate_matrix(request: MatrixRequest):
    try:
        # NumPy配列に変換
        a = np.array(request.matrixA)
        b = np.array(request.matrixB)

        result = None
        if request.operation == "add":
            result = a + b
        elif request.operation == "subtract":
            result = a - b
        elif request.operation == "multiply":
            result = a * b
        elif request.operation == "dot":
            result = np.dot(a, b)
        else:
            raise HTTPException(status_code=400, detail="無効な演算です")

        return {"result": result.tolist()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 