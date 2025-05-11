'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

const WordChain = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [isLoser, setIsLoser] = useState(false);
  const historyEndRef = useRef<HTMLDivElement>(null);

  // 履歴が更新されたときに自動スクロール
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input || gameOver) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/day4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word: input,
          history: history,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'An error occurred');
        if (data.gameOver) {
          setGameOver(true);
          setIsLoser(!data.playerWon);
        }
        return;
      }
      
      if (data.error) {
        setError(data.error);
        if (data.gameOver) {
          setGameOver(true);
          setIsLoser(!data.playerWon);
        }
      } else {
        setHistory([...history, input, data.response]);
        setInput('');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to communicate with the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setInput('');
    setHistory([]);
    setError('');
    setGameOver(false);
    setIsLoser(false);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/challenges" className="text-gray-600 dark:text-gray-300 hover:underline">
              ← Back to Challenges
            </Link>
          </div>
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Word Chain</h1>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              {gameOver && (
                <div className={`mb-4 p-4 rounded-lg text-center ${
                  isLoser 
                    ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' 
                    : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                }`}>
                  <h2 className="text-2xl font-bold mb-2">
                    {isLoser ? 'Game Over!' : 'You Win!'}
                  </h2>
                  <p className="text-lg">
                    {isLoser 
                      ? '😢 Better luck next time!' 
                      : '🎉 Congratulations!'}
                  </p>
                </div>
              )}

              <div className="bg-white dark:bg-gray-700 p-4 rounded mb-4 min-h-[200px] max-h-[400px] overflow-y-auto">
                {history.map((word, index) => (
                  <div
                    key={index}
                    className={`p-2 mb-2 rounded ${
                      index % 2 === 0
                        ? 'bg-blue-100 dark:bg-blue-900'
                        : 'bg-green-100 dark:bg-green-900'
                    }`}
                  >
                    {word}
                  </div>
                ))}
                <div ref={historyEndRef} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={gameOver 
                      ? (isLoser 
                        ? "You lost! Click 'New Game' to try again" 
                        : "You won! Click 'New Game' to play again")
                      : "Enter a word"
                    }
                    className={`w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 ${
                      gameOver ? 'opacity-50' : ''
                    }`}
                    disabled={isLoading || gameOver}
                  />
                </div>
                {error && (
                  <div className={`text-sm ${
                    isLoser 
                      ? 'text-red-500' 
                      : 'text-green-500'
                  }`}>
                    {error}
                  </div>
                )}
                <div className="flex gap-2">
                  {!gameOver && (
                    <button
                      type="submit"
                      disabled={isLoading || !input}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded disabled:opacity-50"
                    >
                      {isLoading ? 'Thinking...' : 'Submit'}
                    </button>
                  )}
                  {gameOver && (
                    <button
                      type="button"
                      onClick={handleRestart}
                      className={`flex-1 p-2 rounded text-white ${
                        isLoser 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      New Game
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WordChain; 