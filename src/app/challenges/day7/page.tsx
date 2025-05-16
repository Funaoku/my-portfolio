import TypingGame from "./TypingGame";
import Header from "@/components/Header";
import BackLink from "@/components/BackLink";
export default function Day7() {
    return (
      <div className="min-h-screen flex flex-col
                      bg-gradient-to-br from-indigo-50 to-emerald-100
                      dark:from-slate-800 dark:to-slate-900">
        <Header />
  
        <main className="pt-16 flex flex-col flex-1">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-6">
              <BackLink href="/challenges" label="← チャレンジ一覧に戻る" />
            </div>
  
            <h1 className="text-3xl font-bold text-center mb-6
                           text-gray-900 dark:text-white">
              タイピングゲーム
            </h1>
          </div>
  
          {/* ここが“中央に膨らむ”エリア */}
          <div className="flex-1 flex items-center justify-center
                          w-full px-4 sm:px-6 lg:px-8">
            <TypingGame />
          </div>
        </main>
      </div>
    );
  }
  