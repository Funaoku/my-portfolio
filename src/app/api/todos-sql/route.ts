// src/app/api/todos-sql/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { TodoDatabase } from '@/lib/database'

// GET: 全てのTodoを取得
export async function GET() {
  try {
    const todos = await TodoDatabase.getAll()
    return NextResponse.json(todos)
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json(
      { error: 'Todoの取得に失敗しました' },
      { status: 500 }
    )
  }
}

// POST: 新しいTodoを作成
export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json()

    if (!title) {
      return NextResponse.json(
        { error: 'タイトルは必須です' },
        { status: 400 }
      )
    }

    const todo = await TodoDatabase.create(title, content)
    return NextResponse.json(todo, { status: 201 })
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json(
      { error: 'Todoの作成に失敗しました' },
      { status: 500 }
    )
  }
}