'use client';

import { useAuth } from '@/contexts/AuthContext';
import Auth from '@/components/Auth';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {user ? <Dashboard /> : <Auth />}
    </main>
  );
}