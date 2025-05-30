// src/lib/supabaseServer.ts
//-------------------------------------------------------------
// Supabase サーバーサイド専用クライアント（最小構成）
//-------------------------------------------------------------

import { createClient } from '@supabase/supabase-js'

// ① .env.local に必須の環境変数を用意する
// NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
// SUPABASE_SERVICE_ROLE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey   = process.env.SUPABASE_SERVICE_ROLE_KEY   // ← ★クライアント側に絶対出さない

// ② 環境変数チェック（ないときは即エラー）
if (!supabaseUrl || !serviceKey) {
  throw new Error(
    'Supabase の URL または Service Role Key が設定されていません。' +
    'env ファイル (.env.local など) を確認してください。'
  )
}

// ③ createClient して export ― これだけで OK
export const supabaseServer = createClient(supabaseUrl, serviceKey, {
  auth: {
    autoRefreshToken: false, // API なのでリフレッシュ不要
    persistSession : false   // Cookie も不要
  }
})
