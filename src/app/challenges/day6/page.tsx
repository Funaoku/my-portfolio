/* app/page.tsx */
"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import BackLink from "@/components/BackLink";

export default function MarkdownPlayground() {
  const [text, setText] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="pt-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-6">
          <BackLink href="/challenges" label="← チャレンジ一覧に戻る" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Markdown プレビュー
        </h1>

        {/* ② DeepL 風 2 カラム（スマホは縦並び） */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row">
            {/* --- 左：入力欄 --- */}
            <textarea
              className="flex-1 p-6 resize-none focus:outline-none border-r dark:border-gray-700 min-h-[40vh] lg:min-h-[70vh]"
              placeholder="ここに Markdown を書いてください..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* --- 右：プレビュー --- */}
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              <article className="prose dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
              </article>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
