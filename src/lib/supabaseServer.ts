// src/lib/supabaseServer.ts
//-------------------------------------------------------------
// Supabase サーバーサイド専用クライアント（最小構成）
//-------------------------------------------------------------

import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey   = process.env.SUPABASE_SERVICE_ROLE_KEY   // ← ★クライアント側に絶対出さない

if (!supabaseUrl || !serviceKey) {
  throw new Error(
    'Supabase の URL または Service Role Key が設定されていません。' +
    'env ファイル (.env.local など) を確認してください。'
  )
}

// createClient して export ― これだけで OK
export const supabaseServer = createClient(supabaseUrl, serviceKey, {
  auth: {
    autoRefreshToken: false, // API なのでリフレッシュ不要
    persistSession : false   // Cookie も不要
  }
})
