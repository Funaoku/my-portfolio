from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import calculator

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

# ルーターの登録
app.include_router(calculator.router, prefix="/api/v1/calculator", tags=["calculator"])

@app.get("/")
async def root():
    return {"message": "API is running"} 