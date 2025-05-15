"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * 汎用「戻る」リンク
 *
 * @param href   戻り先（未指定なら履歴 1 ステップ戻る挙動）
 * @param label  画面に出すテキスト
 */
export default function BackLink({
  href,
  label = "← 戻る",
}: {
  href?: string;
  label?: string;
}) {
  const pathname = usePathname();

  // ルート直下では非表示にする例
  if (pathname === "/") return null;

  // href が指定されていれば Next.js の通常リンク
  if (href) {
    return (
      <Link
        href={href}
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        {label}
      </Link>
    );
  }

  // href 未指定なら履歴を 1 つ戻す
  return (
    <button
      onClick={() => history.back()}
      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      {label}
    </button>
  );
}
