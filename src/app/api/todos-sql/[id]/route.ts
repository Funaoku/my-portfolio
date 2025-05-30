import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

// ---------------- 共通ユーティリティ ----------------
const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

// ---------------------------------------------------------------- //
// GET: 個別 Todo 取得
// ---------------------------------------------------------------- //
export async function GET(
  _req: Request,
  { params }: { params: any }        // ← ★型を付けない（or any）
) {
  const { id } = params
  if (!uuidRegex.test(id)) {
    return NextResponse.json({ error: '無効な ID' }, { status: 400 })
  }

  const { data, error } = await supabaseServer
    .from('todos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    const status = error.code === 'PGRST116' ? 404 : 500
    return NextResponse.json({ error: '取得失敗' }, { status })
  }
  return NextResponse.json(data)
}

// ---------------------------------------------------------------- //
// PUT: 更新
// ---------------------------------------------------------------- //
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  if (!uuidRegex.test(id)) {
    return NextResponse.json({ error: '無効なTodo IDです' }, { status: 400 })
  }

  const body = (await request.json()) as {
    text?: string
    completed?: boolean
  }

  const updateData: { text?: string; completed?: boolean } = {}
  if (typeof body.completed === 'boolean') updateData.completed = body.completed
  if (typeof body.text === 'string' && body.text.trim())
    updateData.text = body.text.trim()

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: '更新内容がありません' }, { status: 400 })
  }

  const { data, error } = await supabaseServer
    .from('todos')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    const status = error.code === 'PGRST116' ? 404 : 500
    return NextResponse.json({ error: 'Todoの更新に失敗しました' }, { status })
  }

  return NextResponse.json(data)
}

// ---------------------------------------------------------------- //
// DELETE: 削除
// ---------------------------------------------------------------- //
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  if (!uuidRegex.test(id)) {
    return NextResponse.json({ error: '無効なTodo IDです' }, { status: 400 })
  }

  const { error } = await supabaseServer.from('todos').delete().eq('id', id)
  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: 'Todoの削除に失敗しました' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Todo を削除しました', id })
}
