import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Gemini APIの初期化
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// 辞書APIを使用して単語の存在確認
async function checkWordExists(word: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    return response.ok;
  } catch (error) {
    console.error('Dictionary API error:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    // APIキーのチェック
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEYが設定されていません');
      return NextResponse.json(
        { error: 'API key is not set. Please check environment variables.' },
        { status: 500 }
      );
    }

    const { word, history } = await request.json();

    // 入力値の検証
    if (!word) {
      return NextResponse.json({ error: 'Please enter a word.' }, { status: 400 });
    }

    // 単語を小文字に変換
    const normalizedWord = word.toLowerCase().trim();

    // 単語の存在確認
    const wordExists = await checkWordExists(normalizedWord);
    if (!wordExists) {
      return NextResponse.json(
        { error: 'Game Over! This word does not exist in the dictionary.', gameOver: true },
        { status: 400 }
      );
    }

    // Word Chainのルールチェック
    if (history.length > 0) {
      const lastWord = history[history.length - 1].toLowerCase();
      const lastChar = lastWord.slice(-1);
      const firstChar = normalizedWord.charAt(0);

      if (lastChar !== firstChar) {
        return NextResponse.json(
          { error: `Game Over! The word must begin with the letter "${lastChar}".`, gameOver: true },
          { status: 400 }
        );
      }
    }

    // 同じ単語の使用チェック
    if (history.map((w: string) => w.toLowerCase()).includes(normalizedWord)) {
      return NextResponse.json(
        { error: 'Game Over! This word has already been used.', gameOver: true },
        { status: 400 }
      );
    }

    try {
      // Gemini APIを使用して応答を生成
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // 最後の文字を取得
      const lastChar = normalizedWord.slice(-1);

      const prompt = `
      Let's play Word Chain, a word game similar to the Japanese game "shiritori".

      Rules:
      1. You must respond with a single English word that begins with the letter "${lastChar}" (the last letter of the previous word).
      2. The word must be a common English noun.
      3. The word must not have been used before in this game.
      4. The word must exist in the English dictionary.
      5. Only respond with a single word, no explanation.

      Previously used words: ${history.join(', ')}${history.length > 0 ? ', ' : ''}${normalizedWord}

      Your response (one word only):
      `;

      const generationConfig = {
        temperature: 0.2,
        maxOutputTokens: 10,
      };

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig,
      });

      const response = result.response.text().trim().toLowerCase();
      console.log('AI response (raw):', response);

      // 応答の検証
      if (!response) {
        return NextResponse.json(
          { error: 'The AI couldn\'t generate a response. Please try again.' },
          { status: 500 }
        );
      }

      // 応答をクリーニング（余分な文字や説明を削除）
      let cleanedResponse = response.replace(/[".,:;!?]/g, '');
      cleanedResponse = cleanedResponse.split(/\s+/)[0] || response;

      // 先頭の文字チェック
      if (!cleanedResponse.startsWith(lastChar)) {
        return NextResponse.json(
          { error: `The AI generated an invalid word. It should start with "${lastChar}".`, gameOver: true },
          { status: 500 }
        );
      }

      // AIの応答が既に使用済みの単語かチェック
      if ([...history.map((w: string) => w.toLowerCase()), normalizedWord].includes(cleanedResponse)) {
        return NextResponse.json(
          { error: 'The AI used a word that has already been used. You win!', gameOver: true, playerWon: true },
          { status: 500 }
        );
      }

      // 英単語としての妥当性チェック (アルファベットのみ)
      const englishWordRegex = /^[a-z]+$/;
      if (!englishWordRegex.test(cleanedResponse)) {
        return NextResponse.json(
          { error: 'The AI generated an invalid response. You win!', gameOver: true, playerWon: true },
          { status: 500 }
        );
      }

      // AIの応答の単語の存在確認
      const aiWordExists = await checkWordExists(cleanedResponse);
      if (!aiWordExists) {
        return NextResponse.json(
          { error: 'The AI used a non-existent word. You win!', gameOver: true, playerWon: true },
          { status: 500 }
        );
      }

      return NextResponse.json({ response: cleanedResponse });
    } catch (apiError) {
      console.error('Gemini API Error:', apiError);
      return NextResponse.json(
        { error: 'Failed to communicate with the AI. Please check your API key.', details: apiError },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Server error details:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please check the console.' },
      { status: 500 }
    );
  }
}