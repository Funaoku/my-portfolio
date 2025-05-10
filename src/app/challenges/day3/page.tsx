'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

// ボタン型の定義
type ButtonType = 'number' | 'operator' | 'equal' | 'clear';

// ボタン情報の型定義
interface ButtonInfo {
  type: ButtonType;
  value?: string;
  display: string;
  className?: string;
  colSpan?: number;
}

// 演算子の対応表
const operatorMap: { [key: string]: string } = {
  '/': '÷',
  '*': '×',
  '-': '-',
  '+': '+'
};

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);
  const [lastResult, setLastResult] = useState('');

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (operator: string) => {
    if (lastResult) {
      setEquation(lastResult + ' ' + operatorMap[operator] + ' ');
      setLastResult('');
    } else {
      setEquation(equation + display + ' ' + operatorMap[operator] + ' ');
    }
    setIsNewNumber(true);
  };

  const handleEqual = () => {
    if (!equation) {
      return;
    }
    
    try {
      const calcExpression = (equation + display)
        .replace(/÷/g, '/')
        .replace(/×/g, '*')
        .replace(/\s+/g, '');
      
      const result = eval(calcExpression);
      
      setDisplay(result.toString());
      setLastResult(result.toString());
      setEquation(equation + display + ' = ');
      setIsNewNumber(true);
    } catch (error) {
      console.error('計算エラー:', error);
      setDisplay('エラー');
      setEquation('');
      setLastResult('');
      setIsNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setLastResult('');
    setIsNewNumber(true);
  };

  // ボタンの配置を定義
  const buttons: ButtonInfo[] = [
    // 1行目: 7,8,9,÷
    { type: 'number', value: '7', display: '7' },
    { type: 'number', value: '8', display: '8' },
    { type: 'number', value: '9', display: '9' },
    { type: 'operator', value: '/', display: '÷' },
    
    // 2行目: 4,5,6,×
    { type: 'number', value: '4', display: '4' },
    { type: 'number', value: '5', display: '5' },
    { type: 'number', value: '6', display: '6' },
    { type: 'operator', value: '*', display: '×' },
    
    // 3行目: 1,2,3,-
    { type: 'number', value: '1', display: '1' },
    { type: 'number', value: '2', display: '2' },
    { type: 'number', value: '3', display: '3' },
    { type: 'operator', value: '-', display: '-' },
    
    // 4行目: 0,C,=,+
    { type: 'number', value: '0', display: '0' },
    { type: 'clear', display: 'C' },
    { type: 'equal', display: '=' },
    { type: 'operator', value: '+', display: '+' },
  ];

  // ボタンコンポーネント
  const CalcButton = ({ button, index }: { button: ButtonInfo; index: number }) => {
    let buttonClass = 'p-4 rounded ';
    let onClickHandler = () => {};

    // ボタンタイプに応じてスタイルとハンドラーを設定
    switch (button.type) {
      case 'number':
        buttonClass += 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600';
        onClickHandler = () => handleNumber(button.value!);
        break;
      case 'operator':
        buttonClass += 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500';
        onClickHandler = () => handleOperator(button.value!);
        break;
      case 'equal':
        buttonClass += 'bg-blue-500 hover:bg-blue-600 text-white';
        onClickHandler = handleEqual;
        break;
      case 'clear':
        buttonClass += 'bg-red-500 hover:bg-red-600 text-white';
        onClickHandler = handleClear;
        break;
    }

    // 追加のクラス名があれば適用
    if (button.className) {
      buttonClass += ' ' + button.className;
    }

    // col-span があれば適用
    if (button.colSpan) {
      buttonClass += ` col-span-${button.colSpan}`;
    }

    return (
      <button key={index} onClick={onClickHandler} className={buttonClass}>
        {button.display}
      </button>
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/challenges" className="text-gray-600 dark:text-gray-300 hover:underline">
              ← チャレンジ一覧に戻る
            </Link>
          </div>
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">電卓</h1>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="bg-white dark:bg-gray-700 p-4 rounded mb-4">
                <div className="text-right text-gray-500 dark:text-gray-400 text-sm h-6">
                  {equation}
                </div>
                <div className="text-right text-2xl font-bold">
                  {display}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {buttons.map((button, index) => (
                  <CalcButton key={index} button={button} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calculator;