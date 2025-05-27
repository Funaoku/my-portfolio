'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';

// Todo型の定義
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  created_at: string;
}

export default function Day12() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 初期データの読み込み（実際のプロジェクトではSupabaseから取得）
  useEffect(() => {
    // ローカルストレージから読み込み（デモ用）
    const savedTodos = localStorage.getItem('day12-todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      // デモ用の初期データ
      const demoTodos: Todo[] = [
        {
          id: '1',
          text: '朝のコーヒーを淹れる',
          completed: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2', 
          text: 'Day 12のTodoアプリを完成させる',
          completed: false,
          created_at: new Date().toISOString()
        }
      ];
      setTodos(demoTodos);
    }
  }, []);

  // todosが変更されたらローカルストレージに保存
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('day12-todos', JSON.stringify(todos));
    }
  }, [todos]);

  // Todo追加機能
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    
    setIsLoading(true);
    
    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
      created_at: new Date().toISOString()
    };

    try {
      // 実際のプロジェクトでは以下のようにSupabaseにPOST
      /*
      const { data, error } = await supabase
        .from('todos')
        .insert([{
          text: todo.text,
          completed: todo.completed,
          user_id: user.id
        }]);
      
      if (error) throw error;
      */
      
      setTodos(prev => [todo, ...prev]);
      setNewTodo('');
    } catch (error) {
      console.error('Todo追加エラー:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Todo削除機能
  const deleteTodo = async (id: string) => {
    try {
      // 実際のプロジェクトでは以下のようにSupabaseからDELETE
      /*
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      */
      
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Todo削除エラー:', error);
    }
  };

  // 完了状態切り替え
  const toggleComplete = async (id: string) => {
    try {
      // 実際のプロジェクトでは以下のようにSupabaseをUPDATE
      /*
      const todo = todos.find(t => t.id === id);
      const { error } = await supabase
        .from('todos')
        .update({ completed: !todo.completed })
        .eq('id', id);
      
      if (error) throw error;
      */
      
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error('Todo更新エラー:', error);
    }
  };

  // Enterキーで追加
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      addTodo();
    }
  };

  // 統計情報
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const remainingTodos = totalTodos - completedTodos;

  return (
    <div className="max-w-2xl mx-auto">
      {/* ヘッダー */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          📝 Todo App
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Day 12: シンプルなタスク管理
        </p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalTodos}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">総タスク</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{completedTodos}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">完了</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{remainingTodos}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">残り</div>
        </div>
      </div>

      {/* Todo追加フォーム */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="新しいタスクを入力..."
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            disabled={isLoading}
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
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          💡 ヒント: チェックボックスをクリックして完了状態を切り替えられます
        </div>
      )}
    </div>
  );
}