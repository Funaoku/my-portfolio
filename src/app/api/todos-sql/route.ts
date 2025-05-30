// src/app/api/todos-sql/route.ts
// priorityカラムを使用しないTodo API

import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'



// GET: 全Todo取得
export async function GET() {
  try {
    console.log('🔍 Todo取得開始...')
    
    const { data, error } = await supabaseServer
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Supabase Todo取得エラー:', error)
      
      return NextResponse.json(
        { 
          error: 'Todoの取得に失敗しました',
          details: error.message,
          code: error.code,
          hint: error.hint,
          troubleshooting: [
            '1. 環境変数 NEXT_PUBLIC_SUPABASE_URL を確認',
            '2. 環境変数 SUPABASE_SERVICE_ROLE_KEY を確認',
            '3. Supabaseプロジェクトがアクティブか確認',
            '4. todosテーブルが作成されているか確認'
          ]
        },
        { status: 500 }
      )
    }

    console.log('✅ Todo取得成功:', data?.length, '件')

    return NextResponse.json(data || [])
  } catch (err) {
    console.error('❌ 予期せぬエラー:', err)
    return NextResponse.json(
      { 
        error: '予期せぬエラーが発生しました',
        details: err instanceof Error ? err.message : '不明なエラー',
        troubleshooting: [
          '開発サーバーを再起動してください',
          '.env.localファイルを確認してください',
          'Supabaseプロジェクトの状態を確認してください'
        ]
      },
      { status: 500 }
    )
  }
}

// POST: 新規Todo作成
export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Todo作成開始...')
    
    const body = await request.json()
    const { text } = body

    // textが必須
    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: 'テキストは必須です' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer
      .from('todos')
      .insert([{
        text: text.trim(),
        completed: false
      }])
      .select()
      .single()

    if (error) {
      console.error('❌ Supabase Todo作成エラー:', error)
      return NextResponse.json(
        { 
          error: 'Todoの作成に失敗しました',
          details: error.message,
          code: error.code
        },
        { status: 500 }
      )
    }

    console.log('✅ Todo作成成功:', data)

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error('❌ Todo作成での予期せぬエラー:', err)
    return NextResponse.json(
      { 
        error: '予期せぬエラーが発生しました',
        details: err instanceof Error ? err.message : '不明なエラー'
      },
      { status: 500 }
    )
  }
}

// DELETE: 完了済みTodoを一括削除
export async function DELETE() {
  try {
    console.log('🔍 完了済みTodo削除開始...')
    
    const { error } = await supabaseServer
      .from('todos')
      .delete()
      .eq('completed', true)

    if (error) {
      console.error('❌ 完了済みTodo削除エラー:', error)
      return NextResponse.json(
        { 
          error: '完了済みTodoの削除に失敗しました',
          details: error.message 
        },
        { status: 500 }
      )
    }

    console.log('✅ 完了済みTodo削除成功')
    return NextResponse.json({ message: '完了済みTodoを削除しました' })
  } catch (err) {
    console.error('❌ 一括削除での予期せぬエラー:', err)
    return NextResponse.json(
      { 
        error: '予期せぬエラーが発生しました',
        details: err instanceof Error ? err.message : '不明なエラー'
      },
      { status: 500 }
    )
  }
}