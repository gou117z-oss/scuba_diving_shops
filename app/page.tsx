import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { readSpots } from "@/lib/spots";

const QUICK_LINKS = [
  { country: "日本", region: "沖縄", label: "🇯🇵 沖縄" },
  { country: "日本", region: "伊豆", label: "🇯🇵 伊豆" },
  { country: "フィリピン", region: "セブ島", label: "🇵🇭 セブ島" },
  { country: "タイ", region: "プーケット", label: "🇹🇭 プーケット" },
  { country: "インドネシア", region: "バリ島", label: "🇮🇩 バリ島" },
  { country: "モルディブ", region: "", label: "🇲🇻 モルディブ" },
  { country: "アメリカ（グアム）", region: "", label: "🇬🇺 グアム" },
  { country: "パラオ", region: "", label: "🇵🇼 パラオ" },
];

export default async function Home() {
  const spots = await readSpots();
  const featuredSpots = spots.slice(0, 6);
  return (
    <div>
      {/* Hero */}
      <section
        className="relative bg-gradient-to-b from-ocean-900 via-ocean-800 to-ocean-700 text-white"
        style={{ minHeight: "420px" }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 pt-16 pb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
            日本語対応のダイビングショップを探す
          </h1>
          <p className="text-ocean-200 text-base sm:text-lg mb-10">
            国内・海外のダイビングショップを国・地域から検索できます
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          人気エリアから探す
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK_LINKS.map((link) => {
            const params = new URLSearchParams({ country: link.country });
            if (link.region) params.set("region", link.region);
            return (
              <Link
                key={link.label}
                href={`/shops?${params.toString()}`}
                className="bg-white hover:bg-ocean-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:text-ocean-700 hover:border-ocean-300 transition-all text-center shadow-sm"
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Spots */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-700">
            人気ダイビングスポット
          </h2>
          <Link
            href="/spots"
            className="text-sm text-ocean-600 hover:text-ocean-800"
          >
            すべて見る →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {featuredSpots.map((spot) => (
            <Link
              key={spot.id}
              href={`/spots/${spot.id}`}
              className="bg-white hover:bg-ocean-50 border border-gray-200 rounded-xl px-4 py-3 hover:border-ocean-300 transition-all shadow-sm group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{spot.imageEmoji}</span>
                <span className="font-medium text-sm text-gray-700 group-hover:text-ocean-700">
                  {spot.name}
                </span>
              </div>
              <p className="text-xs text-gray-400 ml-9">
                {spot.country} / {spot.region}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl mb-2">🗣️</div>
            <h3 className="font-bold mb-1">日本語対応</h3>
            <p className="text-sm text-gray-500">
              日本語スタッフが常駐。初心者も安心して楽しめます。
            </p>
          </div>
          <div>
            <div className="text-3xl mb-2">🌏</div>
            <h3 className="font-bold mb-1">世界各地のショップ</h3>
            <p className="text-sm text-gray-500">
              アジア、太平洋など主要ダイビングスポットを網羅。
            </p>
          </div>
          <div>
            <div className="text-3xl mb-2">📝</div>
            <h3 className="font-bold mb-1">ショップ登録無料</h3>
            <p className="text-sm text-gray-500">
              オーナーの方は無料でショップを掲載できます。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
