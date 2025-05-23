'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';

export default function ChallengesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isIndexPage = pathname === '/challenges';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-16">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isIndexPage ? 'py-8' : 'py-20'}`}>
          {!isIndexPage && (
            <div className="flex items-center gap-4 mb-8">
              <Link 
                href="/challenges" 
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                ← チャレンジ一覧に戻る
              </Link>
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}