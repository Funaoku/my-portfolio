import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { numbers } = await request.json() as { numbers: number[] };

    // 数値の配列を計算
    const arr = numbers;
    const mean = arr.reduce((a: number, b: number) => a + b, 0) / arr.length;
    const sorted = [...arr].sort((a: number, b: number) => a - b);
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];
    const sum = arr.reduce((a: number, b: number) => a + b, 0);
    const std = Math.sqrt(
      arr.reduce((a: number, b: number) => a + Math.pow(b - mean, 2), 0) / arr.length
    );

    return NextResponse.json({
      result: {
        mean,
        median,
        std,
        sum
      }
    });
  } catch {
    return NextResponse.json({ error: 'リクエストの処理中にエラーが発生しました' }, { status: 500 });
  }
} 