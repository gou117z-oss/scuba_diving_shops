"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import ShopCard from "@/components/ShopCard";
import dynamic from "next/dynamic";
import type { Shop } from "@/lib/shops";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

function ShopsContent({ shops }: { shops: Shop[] }) {
  const searchParams = useSearchParams();
  const country = searchParams.get("country") ?? undefined;
  const region = searchParams.get("region") ?? undefined;
  const course = searchParams.get("course") ?? undefined;
  const keyword = searchParams.get("keyword") ?? undefined;

  const filtered = useMemo(() => {
    let result = shops;
    if (country) result = result.filter((s) => s.country === country);
    if (region) result = result.filter((s) => s.region === region);
    if (course) {
      const cs = course.toLowerCase();
      result = result.filter((s) =>
        s.courses.some((c) => c.toLowerCase().includes(cs))
      );
    }
    if (keyword) {
      const kw = keyword.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(kw) ||
          s.description.toLowerCase().includes(kw) ||
          s.city.toLowerCase().includes(kw) ||
          s.courses.some((c) => c.toLowerCase().includes(kw))
      );
    }
    return result;
  }, [shops, country, region, course, keyword]);

  const title = [country, region, course].filter(Boolean).join(" / ");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          {title ? `「${title}」のショップ一覧` : "すべてのショップ"}
          <span className="ml-2 text-base font-normal text-gray-400">
            ({filtered.length}件)
          </span>
        </h1>
        <SearchBar
          initialCountry={country}
          initialRegion={region}
          initialCourse={course}
          initialKeyword={keyword}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🤿</div>
          <p className="text-lg">ショップが見つかりませんでした</p>
          <p className="text-sm mt-1">条件を変えて検索してみてください</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2 xl:w-2/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {filtered.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 xl:w-3/5 lg:sticky lg:top-4 lg:self-start">
            <div className="h-[400px] lg:h-[600px] rounded-xl overflow-hidden shadow border border-gray-200">
              <MapView shops={filtered} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopsClient({ shops }: { shops: Shop[] }) {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-400">
          読み込み中...
        </div>
      }
    >
      <ShopsContent shops={shops} />
    </Suspense>
  );
}
