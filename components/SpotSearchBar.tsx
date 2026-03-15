"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const COUNTRIES = [
  "フィリピン", "タイ", "インドネシア", "モルディブ",
  "日本", "アメリカ", "オーストラリア", "パラオ",
];

const DIFFICULTIES = ["初級", "中級", "上級"];

export default function SpotSearchBar({
  initialCountry,
  initialDifficulty,
  initialKeyword,
}: {
  initialCountry?: string;
  initialDifficulty?: string;
  initialKeyword?: string;
}) {
  const router = useRouter();
  const [country, setCountry] = useState(initialCountry || "");
  const [difficulty, setDifficulty] = useState(initialDifficulty || "");
  const [keyword, setKeyword] = useState(initialKeyword || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (country) params.set("country", country);
    if (difficulty) params.set("difficulty", difficulty);
    if (keyword) params.set("keyword", keyword);
    router.push(`/spots?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <label className="block text-xs text-gray-500 mb-1">国・エリア</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:ring-2 focus:ring-ocean-400 focus:border-ocean-400 outline-none"
        >
          <option value="">すべての国</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-xs text-gray-500 mb-1">難易度</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:ring-2 focus:ring-ocean-400 focus:border-ocean-400 outline-none"
        >
          <option value="">すべてのレベル</option>
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-xs text-gray-500 mb-1">キーワード</label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="マンタ、サンゴ礁など"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-ocean-400 focus:border-ocean-400 outline-none"
        />
      </div>
      <div className="flex items-end">
        <button
          type="submit"
          className="w-full sm:w-auto bg-ocean-600 hover:bg-ocean-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          検索
        </button>
      </div>
    </form>
  );
}
