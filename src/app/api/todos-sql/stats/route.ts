// src/app/api/todos-sql/stats/route.ts
// priorityカラムを使用しない統計API

import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

interface TodoStats {
  total: number
  completed: number
  remaining: number
  completionRate: number
}

export async function GET() {
  try {
    // completedフィールドのみを取得（priorityは除外）
    const { data: todos, error } = await supabaseServer
      .from('todos')
      .select('completed')

    if (error) {
      throw new Error(`統計データ取得エラー: ${error.message}`)
    }

    if (!todos || todos.length === 0) {
      // データがない場合のデフォルト値
      const emptyStats: TodoStats = {
        total: 0,
        completed: 0,
        remaining: 0,
        completionRate: 0
      }
      return NextResponse.json(emptyStats)
    }

    // JavaScript側で統計を計算
    const total = todos.length
    const completed = todos.filter(t => t.completed).length
    const remaining = total - completed
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    const stats: TodoStats = {
      total,
      completed,
      remaining,
      completionRate
    }

    return NextResponse.json(stats)

  } catch (err) {
    console.error('統計情報取得エラー:', err)
    
    // エラー時のデフォルト値
    const defaultStats: TodoStats = {
      total: 0,
      completed: 0,
      remaining: 0,
      completionRate: 0
    }

    return NextResponse.json(defaultStats)
  }
}