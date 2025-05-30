"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { Plus, Trash2, Check } from 'lucide-react';

// Todo型の定義
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  created_at: string;
}

interface TodoStats {
  total: number;
  completed: number;
  remaining: number;
  completionRate?: number;
}

export default function Day13() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<TodoStats>({ total: 0, completed: 0, remaining: 0 });
  const [error, setError] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // 初期化：テーブル作成とデータ読み込み
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        
        // データベーステーブルを初期化
        await fetch('/api/todos-sql/init', { method: 'POST' });
        
        // Todoとステータスを並行取得
        await Promise.all([
          fetchTodos(),
          fetchStats()
        ]);
        
        setIsInitialized(true);
      } catch (error) {
        console.error('App initialization failed:', error);
        setError('アプリケーションの初期化に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Todoリストを取得
  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos-sql');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTodos(data);
      setError('');
    } catch (err) {
      const errorMessage = 'Todoの取得に失敗しました';
      setError(errorMessage);
      console.error('Fetch todos error:', err);
    }
  };

  // 統計情報を取得
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/todos-sql/stats');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Fetch stats error:', err);
      // 統計情報のエラーは表示に影響しないようにする
    }
  };

  // Todo追加機能
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/todos-sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newTodo.trim() // Day 12との互換性
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Todoの作成に失敗しました');
      }

      const newTodoItem = await response.json();
      
      // リストの先頭に追加
      setTodos(prev => [newTodoItem, ...prev]);
      setNewTodo('');
      setError('');
      
      // 統計情報を更新
      await fetchStats();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Todoの追加に失敗しました';
      setError(errorMessage);
      console.error('Add todo error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Todo削除機能
  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos-sql/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Todoの削除に失敗しました');
      }

      // UIから即座に削除
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setError('');
      
      // 統計情報を更新
      await fetchStats();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Todoの削除に失敗しました';
      setError(errorMessage);
      console.error('Delete todo error:', err);
    }
  };

  // 完了状態切り替え
  const toggleComplete = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    // 楽観的更新：UIを先に更新
    setTodos(prev => 
      prev.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

    try {
      const response = await fetch(`/api/todos-sql/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      if (!response.ok) {
        // エラーの場合は元に戻す
        setTodos(prev => 
          prev.map(t => 
            t.id === id ? { ...t, completed: todo.completed } : t
          )
        );
        
        const errorData = await response.json();
        throw new Error(errorData.error || 'Todoの更新に失敗しました');
      }

      setError('');
      
      // 統計情報を更新
      await fetchStats();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Todoの更新に失敗しました';
      setError(errorMessage);
      console.error('Toggle complete error:', err);
    }
  };

  // Enterキーで追加
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      addTodo();
    }
  };

  // 完了済みTodoを一括削除
  const clearCompleted = async () => {
    if (stats.completed === 0) return;
    
    try {
      const response = await fetch('/api/todos-sql', {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '完了済みTodoの削除に失敗しました');
      }

      // 完了していないTodoだけ残す
      setTodos(prev => prev.filter(todo => !todo.completed));
      setError('');
      
      // 統計情報を更新
      await fetchStats();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '完了済みTodoの削除に失敗しました';
      setError(errorMessage);
      console.error('Clear completed error:', err);
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="pt-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">データベースを初期化中...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center gap-4 mb-8">
            <Link 
              href="/challenges" 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              ← チャレンジ一覧に戻る
            </Link>
          </div>

          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              📝 Todo App (Supabase版)
            </h1>            
          </div>

          {/* エラー表示 */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 rounded-lg">
              {error}
            </div>
          )}

          {/* 統計カード */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">総タスク</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">完了</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.remaining}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">残り</div>
            </div>
          </div>

          {/* Todo追加フォーム */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="新しいタスクを入力..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                disabled={isLoading}
                maxLength={255}
              />
              <button
                onClick={addTodo}
                disabled={isLoading || !newTodo.trim()}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                {isLoading ? '追加中...' : '追加'}
              </button>
            </div>
            
            {/* 一括操作ボタン */}
            {stats.completed > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={clearCompleted}
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  完了済み{stats.completed}件を削除
                </button>
              </div>
            )}
          </div>

          {/* Todoリスト */}
          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  まだタスクがありません
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                  上のフォームから新しいタスクを追加してみましょう
                </p>
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border-l-4 transition-all duration-200 ${
                    todo.completed
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-blue-500 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* 完了ボタン */}
                    <button
                      onClick={() => toggleComplete(todo.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-colors flex items-center justify-center ${
                        todo.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                      }`}
                    >
                      {todo.completed && <Check size={14} />}
                    </button>

                    {/* Todoテキスト */}
                    <div className="flex-1">
                      <p
                        className={`transition-all ${
                          todo.completed
                            ? 'text-gray-500 dark:text-gray-400 line-through'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {todo.text}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {new Date(todo.created_at).toLocaleString('ja-JP')}
                      </p>
                    </div>

                    {/* 削除ボタン */}
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* フッター */}
          {todos.length > 0 && (
            <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm space-y-2">
              <p>チェックボックスをクリックして完了状態を切り替えられます</p>              
              {stats.completionRate !== undefined && stats.completionRate > 0 && (
                <p className="text-green-600 dark:text-green-400">
                  📊 完了率: {stats.completionRate}%
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}