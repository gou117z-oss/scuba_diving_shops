import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { findShop, readShops } from "@/lib/shops";
import BackLink from "@/components/BackLink";

export async function generateStaticParams() {
  const shops = await readShops();
  return shops.filter((s) => s.approved).map((s) => ({ id: s.id }));
}

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

function getFlag(country: string): string {
  if (country.includes("フィリピン")) return "🇵🇭";
  if (country.includes("タイ")) return "🇹🇭";
  if (country.includes("インドネシア")) return "🇮🇩";
  if (country.includes("モルディブ")) return "🇲🇻";
  if (country.includes("パラオ")) return "🇵🇼";
  if (country.includes("グアム") || country.includes("サイパン")) return "🇬🇺";
  if (country.includes("ハワイ") || country.includes("アメリカ")) return "🇺🇸";
  if (country.includes("オーストラリア")) return "🇦🇺";
  if (country.includes("メキシコ")) return "🇲🇽";
  if (country.includes("フィジー")) return "🇫🇯";
  if (country.includes("エジプト")) return "🇪🇬";
  if (country.includes("バヌアツ")) return "🇻🇺";
  if (country.includes("日本")) return "🇯🇵";
  return "🌏";
}

export default async function ShopDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const shop = await findShop(params.id);
  if (!shop) notFound();

  const flag = getFlag(shop.country);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <BackLink fallbackHref="/shops" label="一覧に戻る" />

      <div className="grid lg:grid-cols-5 gap-8">
        {/* メイン情報 */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-start gap-3">
            <span className="text-4xl">{flag}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{shop.name}</h1>
              <p className="text-gray-500 text-sm mt-0.5">
                {shop.country} / {shop.region} / {shop.city}
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{shop.description}</p>

          {/* 詳細情報テーブル */}
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            <div className="flex gap-3 px-4 py-3">
              <span className="text-sm text-gray-500 w-24 flex-shrink-0">住所</span>
              <div className="text-sm text-gray-800">
                {shop.address}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-ocean-600 hover:text-ocean-800 underline whitespace-nowrap"
                >
                  Googleマップで開く
                </a>
              </div>
            </div>
            {shop.phone && <InfoRow label="電話" value={shop.phone} />}
            {shop.email && <InfoRow label="メール" value={shop.email} />}
            {shop.website && (
              <div className="flex gap-3 px-4 py-3">
                <span className="text-sm text-gray-500 w-24 flex-shrink-0">公式サイト</span>
                <a
                  href={shop.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ocean-600 hover:text-ocean-800 underline break-all"
                >
                  {shop.website}
                </a>
              </div>
            )}
            <InfoRow label="対応言語" value={shop.languages.join("、")} />
            {shop.priceRange && (
              <InfoRow label="料金目安" value={shop.priceRange} highlight />
            )}
          </div>

          {/* コース */}
          <div>
            <h2 className="font-bold text-gray-800 mb-2">対応コース・サービス</h2>
            <div className="flex flex-wrap gap-2">
              {shop.courses.map((course) => (
                <span
                  key={course}
                  className="bg-ocean-50 text-ocean-700 border border-ocean-100 text-sm px-3 py-1 rounded-full"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>

          {/* 公式サイトボタン */}
          {shop.website && (
            <a
              href={shop.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ocean-600 hover:bg-ocean-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
            >
              🌐 公式サイトを見る
            </a>
          )}
        </div>

        {/* 地図 */}
        <div className="lg:col-span-2">
          <h2 className="font-bold text-gray-800 mb-2">場所</h2>
          <div className="h-[300px] lg:h-[350px] rounded-xl overflow-hidden shadow border border-gray-200">
            <MapView shops={[shop]} selectedId={shop.id} />
          </div>
          <p className="text-xs text-gray-400 mt-1.5">{shop.address}</p>
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
      <span className="text-sm text-gray-500 w-24 flex-shrink-0">{label}</span>
      <span className={`text-sm ${highlight ? "text-ocean-700 font-bold" : "text-gray-800"}`}>
        {value}
      </span>
    </div>
  );
}
