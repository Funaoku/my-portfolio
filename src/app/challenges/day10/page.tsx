import Link from 'next/link';

export default function Day10() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Day 10: ホームページUIの改良</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        今日はホームページのユーザーインターフェースを改良しました。
      </p>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">成果物</h2>
        <Link 
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          New Home を見る
        </Link>
      </div>
    </div>
  );
}