import Link from "next/link";
import type { Spot } from "@/lib/spots";

const COUNTRY_FLAGS: Record<string, string> = {
  フィリピン: "🇵🇭",
  タイ: "🇹🇭",
  インドネシア: "🇮🇩",
  モルディブ: "🇲🇻",
  日本: "🇯🇵",
  アメリカ: "🇺🇸",
  オーストラリア: "🇦🇺",
  パラオ: "🇵🇼",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  "初級": "bg-green-50 text-green-700 border-green-200",
  "初級〜中級": "bg-green-50 text-green-700 border-green-200",
  "中級〜上級": "bg-orange-50 text-orange-700 border-orange-200",
  "初級〜上級": "bg-blue-50 text-blue-700 border-blue-200",
};

export default function SpotCard({ spot }: { spot: Spot }) {
  const flag = COUNTRY_FLAGS[spot.country] || "🌏";
  const diffColor = DIFFICULTY_COLORS[spot.difficulty] || "bg-gray-50 text-gray-700 border-gray-200";

  return (
    <Link href={`/spots/${spot.id}`}>
      <div className="bg-white rounded-xl shadow hover:shadow-md transition-shadow border border-gray-100 p-4 sm:p-5 flex flex-col gap-3 h-full cursor-pointer group">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{spot.imageEmoji}</span>
            <div>
              <h3 className="font-bold text-gray-900 text-base group-hover:text-ocean-700 transition-colors leading-tight">
                {spot.name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                <span>{flag}</span>
                <span>{spot.country} / {spot.region}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{spot.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {spot.highlights.slice(0, 4).map((h) => (
            <span
              key={h}
              className="bg-ocean-50 text-ocean-700 text-xs px-2 py-0.5 rounded-full border border-ocean-100"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>🌡️ {spot.waterTemp.min}〜{spot.waterTemp.max}°C</span>
            <span>👁️ {spot.visibility}</span>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full border ${diffColor}`}>
            {spot.difficulty}
          </span>
        </div>
      </div>
    </Link>
  );
}
