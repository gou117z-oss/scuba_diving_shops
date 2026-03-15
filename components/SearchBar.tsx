"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const COUNTRIES = [
  "日本",
  "フィリピン",
  "タイ",
  "インドネシア",
  "モルディブ",
  "アメリカ（グアム）",
  "アメリカ（ハワイ）",
  "オーストラリア",
  "パラオ",
];

const REGIONS: Record<string, string[]> = {
  日本: ["東京", "千葉", "静岡", "東伊豆", "西伊豆", "南伊豆", "伊豆諸島", "小笠原諸島", "高知", "沖縄本島", "宮古島", "石垣島", "西表島"],
  フィリピン: ["セブ島", "ボホール島"],
  タイ: ["プーケット", "タオ島"],
  インドネシア: ["バリ島"],
  モルディブ: ["北マーレ環礁"],
  "アメリカ（グアム）": ["グアム"],
  "アメリカ（ハワイ）": ["オアフ島"],
  オーストラリア: ["ケアンズ・グレートバリアリーフ"],
  パラオ: ["コロール", "ペリリュー島"],
};

const COURSES = [
  // ── 基本コース ──
  "体験ダイビング",
  "ファンダイブ",
  "スノーケリング",
  // ── ライセンス取得 ──
  "オープンウォーター",
  "アドバンス",
  "レスキュー",
  "スペシャリティ",
  "ダイブマスター",
  "インストラクター開発コース",
  // ── スタイル ──
  "ドリフトダイビング",
  "ナイトダイブ",
  "ナイトロックス",
  "ビーチダイビング",
  "スキンダイビング",
  // ── ツアー・クルーズ ──
  "ダイブクルーズ",
  "ダイブサファリ",
  "ライブアボード",
  // ── その他 ──
  "マンツーマン",
  "水中写真",
  "リフレッシュコース",
  "イルカウォッチング",
];

type Props = {
  initialCountry?: string;
  initialRegion?: string;
  initialCourse?: string;
  initialKeyword?: string;
};

export default function SearchBar({
  initialCountry = "",
  initialRegion = "",
  initialCourse = "",
  initialKeyword = "",
}: Props) {
  const router = useRouter();
  const [country, setCountry] = useState(initialCountry);
  const [region, setRegion] = useState(initialRegion);
  const [course, setCourse] = useState(initialCourse);
  const [keyword, setKeyword] = useState(initialKeyword);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (country) params.set("country", country);
    if (region) params.set("region", region);
    if (course) params.set("course", course);
    if (keyword) params.set("keyword", keyword);
    router.push(`/shops?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col gap-3"
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1 font-medium">国・エリア</label>
          <select
            value={country}
            onChange={(e) => { setCountry(e.target.value); setRegion(""); }}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-ocean-400"
          >
            <option value="">すべての国</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1 font-medium">地域・島名</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-ocean-400"
          >
            <option value="">すべての地域</option>
            {(country ? REGIONS[country] || [] : Object.values(REGIONS).flat()).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1 font-medium">対応コース</label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-ocean-400"
          >
            <option value="">すべてのコース</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1 font-medium">キーワード</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="ショップ名など"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-ocean-400"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full sm:w-auto bg-ocean-600 hover:bg-ocean-700 text-white px-8 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            検索
          </button>
        </div>
      </div>
    </form>
  );
}
