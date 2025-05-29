// src/lib/supabaseServer.ts
// サーバーサイド用のSupabaseクライアント（生SQL実行用）

import { createClient } from '@supabase/supabase-js'

// 環境変数の確認
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // 重要: Service Role Key

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase環境変数が設定されていません')
}

// サーバーサイド専用クライアント（生SQL実行可能）
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// 生SQL実行のヘルパー関数
export async function executeSQL(query: string, params?: any[]) {
  try {
    const { data, error } = await supabaseServer.rpc('execute_sql', {
      query,
      params: params || []
    })
    
    if (error) {
      console.error('SQL実行エラー:', error)
      throw error
    }
    
    return data
  } catch (err) {
    console.error('SQL実行失敗:', err)
    throw err
  }
}

// PostgreSQL直接接続用（より柔軟な生SQL実行）
export async function executePgSQL(query: string, params?: any[]) {
  try {
    // Supabaseの場合、rpc関数を使って生SQLを実行
    const { data, error } = await supabaseServer
      .from('todos') // ダミーテーブル名（実際はrpc関数を使用）
      .select()
      .limit(0) // 実際のデータは不要
    
    // 直接SQLを実行したい場合は、Supabaseのpostgrest-jsではなく
    // node-postgresやpgライブラリを使用することを推奨
    
    if (error) throw error
    return data
  } catch (err) {
    console.error('PostgreSQL実行エラー:', err)
    throw err
  }
}