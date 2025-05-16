import TypingGame from "./TypingGame";
import Header from "@/components/Header";
import BackLink from "@/components/BackLink";

export default function Day7() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />

            <main className="pt-16">
                <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center gap-4 mb-6">
                    <BackLink href="/challenges" label="← チャレンジ一覧に戻る" />
                    </div>
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                        タイピングゲーム
                    </h1>
                    <main className="min-h-screen flex items-center justify-centere">
                        <TypingGame />
                    </main>
                </div>
            </main>
        </div>
    );
}