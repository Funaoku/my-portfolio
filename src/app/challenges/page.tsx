import Link from 'next/link';
import Header from '@/components/Header';

const ChallengesPage = () => (
  <div className="min-h-screen">
    <Header />
    <main className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:underline">
            ← ホームに戻る
          </Link>
        </div>
        <div className="max-w-md mx-auto text-center">
            <h1 className="text-4xl font-bold">100 Days Challenge</h1>
        </div>        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-20">
          <Link href="/" className="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Day 1</h2>
            <p className="text-gray-600 dark:text-gray-300">ホーム画面</p>
          </Link>
          <Link href="/challenges/day2" className="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Day 2</h2>
            <p className="text-gray-600 dark:text-gray-300">カウンター</p>
          </Link>
          <Link href="/challenges/day3" className="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Day 3</h2>
            <p className="text-gray-600 dark:text-gray-300">電卓</p>
          </Link>
          <Link href="/challenges/day4" className="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Day  4</h2>
            <p className="text-gray-600 dark:text-gray-300">Word Chain</p>
          </Link>
          <Link href="/challenges/day5" className="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Day  5</h2>
            <p className="text-gray-600 dark:text-gray-300">Python 計算</p>
          </Link>
          <Link href="/challenges/day6" className="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Day  6</h2>
            <p className="text-gray-600 dark:text-gray-300">Markdown プレビュー</p>
          </Link>
          <Link href="/challenges/day7" className="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Day  7</h2>
            <p className="text-gray-600 dark:text-gray-300">タイピングゲーム</p>
          </Link>
          <Link href="/challenges/day8" className="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Day  8</h2>
            <p className="text-gray-600 dark:text-gray-300">二次元配列計算機</p>
          </Link>
          <Link href="/challenges/day9" className="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Day  9</h2>
            <p className="text-gray-600 dark:text-gray-300">Supabase 認証</p>
          </Link>
          <Link href="/challenges/day10" className="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Day  10</h2>
            <p className="text-gray-600 dark:text-gray-300">ホームページUIの改良</p>
          </Link>
          {/* 今後追加されるチャレンジのリンク */}
        </div>
      </div>
    </main>
  </div>
);

export default ChallengesPage; 