// src/app/api/todos-sql/[id]/route.ts
// 個別Todo操作API（更新・削除）

import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

interface RouteParams {
  params: {
    id: string
  }
}

// PUT: Todo更新（完了状態切り替えなど）
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params
    const body = await request.json()

    // UUID形式チェック
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: '無効なTodo IDです' },
        { status: 400 }
      )
    }

    // 更新可能なフィールドを抽出
    const updateData: any = {}
    
    if (typeof body.completed === 'boolean') {
      updateData.completed = body.completed
    }
    
    if (body.title && typeof body.title === 'string') {
      updateData.title = body.title.trim()
    }
    
    if (body.text && typeof body.text === 'string') {
      updateData.title = body.text.trim() // textをtitleとして更新
    }
    
    if (body.priority && typeof body.priority === 'number') {
      updateData.priority = Math.max(1, Math.min(5, body.priority))
    }

    // 更新するフィールドがない場合
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: '更新する項目がありません' },
        { status: 400 }
      )
    }

    // updated_atは自動で更新される（トリガー）
    const { data, error } = await supabaseServer
      .from('todos')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Todo更新エラー:', error)
      
      // レコードが見つからない場合
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Todo が見つかりません' },
          { status: 404 }
        )
      }
      
      return NextResponse.json(
        { error: 'Todoの更新に失敗しました' },
        { status: 500 }
      )
    }

    // Day 12との互換性
    const todoWithText = {
      ...data,
      text: data.title
    }

    return NextResponse.json(todoWithText)

  } catch (err) {
    console.error('Todo更新での予期せぬエラー:', err)
    return NextResponse.json(
      { error: '予期せぬエラーが発生しました' },
      { status: 500 }
    )
  }
}

// DELETE: 個別Todo削除
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params

    // UUID形式チェック
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: '無効なTodo IDです' },
        { status: 400 }
      )
    }

    const { error } = await supabaseServer
      .from('todos')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Todo削除エラー:', error)
      
      // レコードが見つからない場合でも成功として扱う
      if (error.code === 'PGRST116') {
        return NextResponse.json({ 
          message: 'Todo は既に削除されています' 
        })
      }
      
      return NextResponse.json(
        { error: 'Todoの削除に失敗しました' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'Todo を削除しました',
      id 
    })

  } catch (err) {
    console.error('Todo削除での予期せぬエラー:', err)
    return NextResponse.json(
      { error: '予期せぬエラーが発生しました' },
      { status: 500 }
    )
  }
}

// GET: 個別Todo取得（オプション）
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params

    // UUID形式チェック
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: '無効なTodo IDです' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer
      .from('todos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Todo取得エラー:', error)
      
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Todo が見つかりません' },
          { status: 404 }
        )
      }
      
      return NextResponse.json(
        { error: 'Todoの取得に失敗しました' },
        { status: 500 }
      )
    }

    // Day 12との互換性
    const todoWithText = {
      ...data,
      text: data.title
    }

    return NextResponse.json(todoWithText)

  } catch (err) {
    console.error('Todo取得での予期せぬエラー:', err)
    return NextResponse.json(
      { error: '予期せぬエラーが発生しました' },
      { status: 500 }
    )
  }
}