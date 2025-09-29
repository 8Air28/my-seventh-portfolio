"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const addHistory = (entry) => {
    setHistory([entry, ...history]);
  };

  const animateDraw = (callback) => {
    setIsAnimating(true);
    setResult("抽選中...");
    setTimeout(() => {
      callback();
      setIsAnimating(false);
    }, 1000); // 1秒のアニメーション
  };

  const flipCoin = () => {
    animateDraw(() => {
      const outcome = Math.random() < 0.5 ? "表" : "裏";
      setResult(`コインの結果: ${outcome}`);
      addHistory(`コイン: ${outcome}`);
    });
  };

  const rollDice = (sides = 6) => {
    animateDraw(() => {
      const outcome = Math.floor(Math.random() * sides) + 1;
      setResult(`サイコロ(${sides}面)の結果: ${outcome}`);
      addHistory(`サイコロ(${sides}面): ${outcome}`);
    });
  };

  const rangeDraw = (min, max) => {
    if (isNaN(min) || isNaN(max) || min > max) {
      setResult("範囲エラー");
      return;
    }
    animateDraw(() => {
      const outcome =
        Math.floor(Math.random() * (max - min + 1)) + parseInt(min);
      setResult(`範囲抽選(${min}～${max}): ${outcome}`);
      addHistory(`範囲抽選(${min}～${max}): ${outcome}`);
    });
  };

  const clearHistory = () => setHistory([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-600">くじ引きツール 🎲</h1>

      {/* ボタン群 */}
      <div className="mt-6 space-y-4">
        <motion.button
          onClick={flipCoin}
          whileTap={{ scale: 0.9 }}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isAnimating}
        >
          コインを投げる
        </motion.button>

        <motion.button
          onClick={() => rollDice(6)}
          whileTap={{ scale: 0.9 }}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          disabled={isAnimating}
        >
          6面サイコロを振る
        </motion.button>

        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="最小値"
            id="minValue"
            className="px-2 py-1 border rounded"
          />
          <input
            type="number"
            placeholder="最大値"
            id="maxValue"
            className="px-2 py-1 border rounded"
          />
          <motion.button
            onClick={() =>
              rangeDraw(
                document.getElementById("minValue").value,
                document.getElementById("maxValue").value
              )
            }
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            disabled={isAnimating}
          >
            範囲抽選
          </motion.button>
        </div>
      </div>

      {/* 結果表示 */}
      <motion.div
        key={result}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 p-4 bg-white shadow rounded w-full max-w-md text-center"
      >
        <p className="text-lg">{result}</p>
      </motion.div>

      {/* 履歴 */}
      <div className="mt-6 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">履歴</h2>
          <button
            onClick={clearHistory}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            全削除
          </button>
        </div>
        <ul className="mt-2 list-disc list-inside bg-white p-4 shadow rounded">
          {history.length === 0 && <li>履歴がありません</li>}
          {history.map((h, index) => (
            <li key={index}>{h}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
