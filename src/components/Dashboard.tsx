'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  if (!user) {
    return null; // AuthProviderで認証チェックするため
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            ログアウト
          </button>
        </div>
        
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">ユーザー情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">メールアドレス</label>
              <p className="mt-1 text-sm text-gray-900">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ユーザーID</label>
              <p className="mt-1 text-sm text-gray-900 font-mono">{user.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">登録日時</label>
              <p className="mt-1 text-sm text-gray-900">
                {user.created_at ? new Date(user.created_at).toLocaleString('ja-JP') : '不明'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">最終ログイン</label>
              <p className="mt-1 text-sm text-gray-900">
                {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('ja-JP') : '不明'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                ログイン成功
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>認証システムが正常に動作しています。この画面はログインしたユーザーのみが表示できます。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}