// src/app/api/todos-sql/init/route.ts
// 修正版：実際に動作するデータベース初期化

import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

export async function POST() {
  try {
    // まず、テーブルが存在するか確認
    const { error: checkError } = await supabaseServer
      .from('todos')
      .select('id')
      .limit(1)

    // エラーがない場合、テーブルは既に存在
    if (!checkError) {
      return NextResponse.json({ 
        message: 'Todosテーブルは既に存在します',
        status: 'ready',
        tableExists: true
      })
    }

    // テーブルが存在しない場合のSQL
    const createTableSQL = `
      -- Todosテーブル作成
      CREATE TABLE IF NOT EXISTS todos (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        priority INTEGER DEFAULT 3 CHECK (priority >= 1 AND priority <= 5),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
      );

      -- インデックス作成
      CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed);
      CREATE INDEX IF NOT EXISTS idx_todos_priority ON todos(priority);
      CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at DESC);

      -- Row Level Security を有効化
      ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

      -- 公開アクセスポリシー（開発用）
      CREATE POLICY "Enable all operations for all users" ON todos
        FOR ALL USING (true)
        WITH CHECK (true);

      -- updated_at自動更新用のトリガー関数
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = TIMEZONE('utc'::text, NOW());
        RETURN NEW;
      END;
      $$ language 'plpgsql';

      -- トリガー作成
      CREATE TRIGGER update_todos_updated_at
        BEFORE UPDATE ON todos
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `

    // Supabase Dashboard経由での実行を案内
    return NextResponse.json({
      message: 'Todosテーブルが存在しません。以下の手順で作成してください：',
      tableExists: false,
      setupInstructions: {
        step1: 'Supabaseダッシュボード（https://app.supabase.com）にログイン',
        step2: 'プロジェクトを選択',
        step3: 'SQL Editor タブを開く',
        step4: '以下のSQLを実行',
        step5: 'ページをリロードして再度確認'
      },
      sql: createTableSQL,
      alternativeMethod: {
        title: 'または、Table Editorを使用：',
        steps: [
          '1. Table Editor タブを開く',
          '2. "New Table" をクリック',
          '3. テーブル名: todos',
          '4. 以下のカラムを追加：',
          '   - id (uuid, primary key, default: gen_random_uuid())',
          '   - title (varchar, not null)',
          '   - completed (boolean, default: false)',
          '   - priority (int4, default: 3)',
          '   - created_at (timestamptz, default: now())',
          '   - updated_at (timestamptz, default: now())',
          '5. RLSを有効化して、適切なポリシーを設定'
        ]
      }
    }, { status: 200 })

  } catch (err) {
    console.error('初期化エラー:', err)
    return NextResponse.json(
      { 
        error: '初期化チェックに失敗しました',
        details: err instanceof Error ? err.message : '不明なエラー',
        hint: '環境変数とSupabase接続を確認してください'
      },
      { status: 500 }
    )
  }
}