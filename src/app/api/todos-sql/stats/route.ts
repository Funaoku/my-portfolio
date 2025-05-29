// src/app/api/todos-sql/stats/route.ts
// Todo統計情報API

import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

interface TodoStats {
  total: number
  completed: number
  remaining: number
  highPriority: number
  completionRate: number
  averagePriority: number
}

export async function GET() {
  try {
    // 基本統計を並行取得
    const [
      totalResult,
      completedResult,
      highPriorityResult,
      avgPriorityResult
    ] = await Promise.all([
      // 総数
      supabaseServer
        .from('todos')
        .select('id', { count: 'exact', head: true }),
      
      // 完了済み数
      supabaseServer
        .from('todos')
        .select('id', { count: 'exact', head: true })
        .eq('completed', true),
      
      // 高優先度（4以上）
      supabaseServer
        .from('todos')
        .select('id', { count: 'exact', head: true })
        .gte('priority', 4),
      
      // 平均優先度
      supabaseServer
        .from('todos')
        .select('priority')
    ])

    // エラーチェック
    if (totalResult.error) {
      throw new Error(`総数取得エラー: ${totalResult.error.message}`)
    }
    if (completedResult.error) {
      throw new Error(`完了数取得エラー: ${completedResult.error.message}`)
    }
    if (highPriorityResult.error) {
      throw new Error(`高優先度取得エラー: ${highPriorityResult.error.message}`)
    }
    if (avgPriorityResult.error) {
      throw new Error(`平均優先度取得エラー: ${avgPriorityResult.error.message}`)
    }

    // 統計値計算
    const total = totalResult.count || 0
    const completed = completedResult.count || 0
    const remaining = total - completed
    const highPriority = highPriorityResult.count || 0
    
    // 完了率（百分率）
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
    
    // 平均優先度
    const priorities = avgPriorityResult.data?.map(item => item.priority) || []
    const averagePriority = priorities.length > 0 
      ? Math.round((priorities.reduce((sum, p) => sum + p, 0) / priorities.length) * 10) / 10
      : 0

    const stats: TodoStats = {
      total,
      completed,
      remaining,
      highPriority,
      completionRate,
      averagePriority
    }

    return NextResponse.json(stats)

  } catch (err) {
    console.error('統計情報取得エラー:', err)
    
    // エラー時はデフォルト値を返す
    const defaultStats: TodoStats = {
      total: 0,
      completed: 0,
      remaining: 0,
      highPriority: 0,
      completionRate: 0,
      averagePriority: 0
    }

    return NextResponse.json(defaultStats)
  }
}