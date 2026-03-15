import Link from "next/link";
import type { Shop } from "@/lib/shops";

const COUNTRY_FLAGS: Record<string, string> = {
  フィリピン: "🇵🇭",
  タイ: "🇹🇭",
  インドネシア: "🇮🇩",
  モルディブ: "🇲🇻",
  日本: "🇯🇵",
  アメリカ: "🇺🇸",
  オーストラリア: "🇦🇺",
  グアム: "🇬🇺",
  パラオ: "🇵🇼",
};

export default function ShopCard({ shop }: { shop: Shop }) {
  const flag = COUNTRY_FLAGS[shop.country] || "🌏";

  return (
    <Link href={`/shops/${shop.id}`}>
      <div className="bg-white rounded-xl shadow hover:shadow-md transition-shadow border border-gray-100 p-4 sm:p-5 flex flex-col gap-3 h-full cursor-pointer group">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-gray-900 text-base group-hover:text-ocean-700 transition-colors leading-tight">
            {shop.name}
          </h3>
          <span className="text-2xl flex-shrink-0">{flag}</span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <span>📍</span>
          <span>
            {shop.country} / {shop.region}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{shop.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {shop.courses.slice(0, 3).map((course) => (
            <span
              key={course}
              className="bg-ocean-50 text-ocean-700 text-xs px-2 py-0.5 rounded-full border border-ocean-100"
            >
              {course}
            </span>
          ))}
          {shop.courses.length > 3 && (
            <span className="text-xs text-gray-400 px-2 py-0.5">
              +{shop.courses.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
          <div className="flex flex-wrap gap-1">
            {shop.languages.map((lang) => (
              <span
                key={lang}
                className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full"
              >
                {lang}
              </span>
            ))}
          </div>
          <span className="text-ocean-700 font-semibold text-sm">
            {shop.priceRange}
          </span>
        </div>
      </div>
    </Link>
  );
}
