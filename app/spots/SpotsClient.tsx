"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import SpotSearchBar from "@/components/SpotSearchBar";
import SpotCard from "@/components/SpotCard";
import dynamic from "next/dynamic";
import type { Spot } from "@/lib/spots";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

function SpotsContent({ spots }: { spots: Spot[] }) {
  const searchParams = useSearchParams();
  const country = searchParams.get("country") ?? undefined;
  const difficulty = searchParams.get("difficulty") ?? undefined;
  const keyword = searchParams.get("keyword") ?? undefined;

  const filtered = useMemo(() => {
    let result = spots;
    if (country) result = result.filter((s) => s.country === country);
    if (difficulty) result = result.filter((s) => s.difficulty.includes(difficulty));
    if (keyword) {
      const kw = keyword.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(kw) ||
          s.description.toLowerCase().includes(kw) ||
          s.region.toLowerCase().includes(kw) ||
          s.highlights.some((h) => h.toLowerCase().includes(kw))
      );
    }
    return result;
  }, [spots, country, difficulty, keyword]);

  const title = [country, keyword].filter(Boolean).join(" / ");

  const mapItems = filtered.map((s) => ({
    id: s.id,
    name: s.name,
    country: s.country,
    region: s.region,
    city: s.region,
    address: `${s.country} ${s.region}`,
    phone: null,
    email: null,
    languages: [] as string[],
    courses: s.highlights,
    priceRange: s.difficulty,
    description: s.description,
    lat: s.lat,
    lng: s.lng,
    approved: true,
    createdAt: "",
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          {title ? `「${title}」のスポット` : "すべてのスポット"}
          <span className="ml-2 text-base font-normal text-gray-400">
            ({filtered.length}件)
          </span>
        </h1>
        <SpotSearchBar
          initialCountry={country}
          initialDifficulty={difficulty}
          initialKeyword={keyword}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🗺️</div>
          <p className="text-lg">スポットが見つかりませんでした</p>
          <p className="text-sm mt-1">条件を変えて検索してみてください</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2 xl:w-2/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {filtered.map((spot) => (
                <SpotCard key={spot.id} spot={spot} />
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 xl:w-3/5 lg:sticky lg:top-4 lg:self-start">
            <div className="h-[400px] lg:h-[600px] rounded-xl overflow-hidden shadow border border-gray-200">
              <MapView shops={mapItems} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SpotsClient({ spots }: { spots: Spot[] }) {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-400">
          読み込み中...
        </div>
      }
    >
      <SpotsContent spots={spots} />
    </Suspense>
  );
}
