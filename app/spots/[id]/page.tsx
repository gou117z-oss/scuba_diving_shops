import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { findSpot, readSpots } from "@/lib/spots";
import { filterShops } from "@/lib/shops";
import BackLink from "@/components/BackLink";

export async function generateStaticParams() {
  const spots = await readSpots();
  return spots.map((s) => ({ id: s.id }));
}

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

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

export default async function SpotDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const spot = await findSpot(params.id);
  if (!spot) notFound();

  const flag = COUNTRY_FLAGS[spot.country] || "🌏";

  // Find nearby shops in the same country
  const nearbyShops = await filterShops({ country: spot.country });

  // MapView-compatible object
  const mapItem = {
    id: spot.id,
    name: spot.name,
    country: spot.country,
    region: spot.region,
    city: spot.region,
    address: `${spot.country} ${spot.region}`,
    phone: null,
    email: null,
    languages: [],
    courses: spot.highlights,
    priceRange: spot.difficulty,
    description: spot.description,
    lat: spot.lat,
    lng: spot.lng,
    approved: true,
    createdAt: "",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <BackLink fallbackHref="/spots" label="戻る" />

      <div className="grid lg:grid-cols-5 gap-8">
        {/* メイン情報 */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-start gap-3">
            <span className="text-5xl">{spot.imageEmoji}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{spot.name}</h1>
              <p className="text-gray-500 text-sm mt-0.5">
                {flag} {spot.country} / {spot.region}
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{spot.description}</p>

          {/* スポット情報テーブル */}
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            <InfoRow label="水温" value={`${spot.waterTemp.min}〜${spot.waterTemp.max}°C`} />
            <InfoRow label="透明度" value={spot.visibility} />
            <InfoRow label="ベストシーズン" value={spot.bestSeason} highlight />
            <InfoRow label="難易度" value={spot.difficulty} />
            <InfoRow label="水深" value={spot.depthRange} />
          </div>

          {/* 見どころ */}
          <div>
            <h2 className="font-bold text-gray-800 mb-2">見どころ・見られる生物</h2>
            <div className="flex flex-wrap gap-2">
              {spot.highlights.map((h) => (
                <span
                  key={h}
                  className="bg-ocean-50 text-ocean-700 border border-ocean-100 text-sm px-3 py-1 rounded-full"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* 近くのショップ */}
          {nearbyShops.length > 0 && (
            <div>
              <h2 className="font-bold text-gray-800 mb-3">
                {spot.country}のダイビングショップ
              </h2>
              <div className="space-y-2">
                {nearbyShops.slice(0, 5).map((shop) => (
                  <Link
                    key={shop.id}
                    href={`/shops/${shop.id}`}
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-ocean-300 hover:bg-ocean-50 transition-all group"
                  >
                    <div>
                      <span className="font-medium text-sm text-gray-800 group-hover:text-ocean-700">
                        {shop.name}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">
                        {shop.region} / {shop.city}
                      </span>
                    </div>
                    <span className="text-xs text-ocean-600">詳細 →</span>
                  </Link>
                ))}
              </div>
              {nearbyShops.length > 5 && (
                <Link
                  href={`/shops?country=${encodeURIComponent(spot.country)}`}
                  className="inline-block mt-2 text-sm text-ocean-600 hover:text-ocean-800"
                >
                  すべてのショップを見る →
                </Link>
              )}
            </div>
          )}
        </div>

        {/* 地図 */}
        <div className="lg:col-span-2">
          <h2 className="font-bold text-gray-800 mb-2">場所</h2>
          <div className="h-[300px] lg:h-[350px] rounded-xl overflow-hidden shadow border border-gray-200">
            <MapView shops={[mapItem]} selectedId={spot.id} />
          </div>
          <p className="text-xs text-gray-400 mt-1.5">
            {spot.country} {spot.region}
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex gap-3 px-4 py-3">
      <span className="text-sm text-gray-500 w-28 flex-shrink-0">{label}</span>
      <span className={`text-sm ${highlight ? "text-ocean-700 font-bold" : "text-gray-800"}`}>
        {value}
      </span>
    </div>
  );
}
