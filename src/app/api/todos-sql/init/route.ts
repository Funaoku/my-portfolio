// src/app/api/todos-sql/init/route.ts
// データベーステーブル初期化API

import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

export async function POST() {
  try {
    // 生SQLでテーブルを作成（存在しない場合のみ）
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS todos (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        priority INTEGER DEFAULT 3 CHECK (priority >= 1 AND priority <= 5),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
      );
    `

    // インデックス作成（パフォーマンス向上）
    const createIndexSQL = `
      CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed);
      CREATE INDEX IF NOT EXISTS idx_todos_priority ON todos(priority);
      CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at DESC);
    `

    // RLS（Row Level Security）の設定
    const enableRLSSQL = `
      ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
    `

    // 公開アクセス用のポリシー（デモ用）
    const createPolicySQL = `
      CREATE POLICY IF NOT EXISTS "Public Access" ON todos
      FOR ALL USING (true);
    `

    // トリガー関数（updated_at自動更新）
    const createTriggerFunctionSQL = `
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = TIMEZONE('utc'::text, NOW());
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `

    const createTriggerSQL = `
      DROP TRIGGER IF EXISTS update_todos_updated_at ON todos;
      CREATE TRIGGER update_todos_updated_at
        BEFORE UPDATE ON todos
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `

    // 実際にはSupabaseのダッシュボードでSQL実行するか、
    // rpc関数を経由して実行する必要があります
    
    // Supabaseクライアントを使用してテーブル存在確認
    const { data: tables, error: tableError } = await supabaseServer
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_name', 'todos')
      .eq('table_schema', 'public')

    if (tableError) {
      console.log('テーブル確認エラー（通常は問題なし）:', tableError)
    }

    // テーブルが存在しない場合は手動作成を促す
    if (!tables || tables.length === 0) {
      console.log('Todosテーブルが見つかりません。Supabaseダッシュボードで作成してください。')
      
      return NextResponse.json({
        message: 'テーブル初期化が必要です',
        sql: {
          createTable: createTableSQL,
          createIndex: createIndexSQL,
          enableRLS: enableRLSSQL,
          createPolicy: createPolicySQL,
          createTriggerFunction: createTriggerFunctionSQL,
          createTrigger: createTriggerSQL
        },
        instructions: [
          '1. Supabaseダッシュボードにログイン',
          '2. Project → SQL Editor',
          '3. 上記のSQLを順番に実行',
          '4. このAPIを再度呼び出し'
        ]
      })
    }

    return NextResponse.json({ 
      message: 'テーブルは既に存在します',
      status: 'ready'
    })

  } catch (err) {
    console.error('初期化エラー:', err)
    return NextResponse.json(
      { 
        error: '初期化に失敗しました',
        details: err instanceof Error ? err.message : '不明なエラー'
      },
      { status: 500 }
    )
  }
}