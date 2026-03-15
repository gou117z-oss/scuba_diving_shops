"use client";

import { useEffect } from "react";
import type { Shop } from "@/lib/shops";

type Props = {
  shops: Shop[];
  selectedId?: string;
};

// Leafletはブラウザ専用のためdynamic importで読み込む
export default function MapView({ shops, selectedId }: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let map: any;

    async function initMap() {
      const L = (await import("leaflet")).default;

      // デフォルトアイコン修正
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const container = document.getElementById("map");
      if (!container) return;

      // 既存のマップを破棄
      if ((container as any)._leaflet_id) {
        (container as any)._leaflet_map?.remove();
      }

      const center =
        shops.length > 0
          ? ([shops[0].lat, shops[0].lng] as [number, number])
          : ([20, 100] as [number, number]);

      map = L.map("map", { center, zoom: shops.length === 1 ? 13 : 4 });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const selectedIcon = L.divIcon({
        html: `<div style="background:#1665d0;width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>`,
        iconSize: [20, 20],
        className: "",
      });

      const normalIcon = L.divIcon({
        html: `<div style="background:#3a9af5;width:16px;height:16px;border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3)"></div>`,
        iconSize: [16, 16],
        className: "",
      });

      shops.forEach((shop) => {
        const icon = shop.id === selectedId ? selectedIcon : normalIcon;
        const marker = L.marker([shop.lat, shop.lng], { icon }).addTo(map);
        const detailPath = shop.id.startsWith("spot-") ? `/spots/${shop.id}` : `/shops/${shop.id}`;
        marker.bindPopup(
          `<div style="font-family:sans-serif;min-width:160px">
            <strong style="font-size:14px">${shop.name}</strong><br/>
            <span style="color:#666;font-size:12px">${shop.country} / ${shop.region}</span><br/>
            ${shop.priceRange ? `<span style="color:#1665d0;font-size:12px;font-weight:bold">${shop.priceRange}</span><br/>` : ""}
            <a href="${detailPath}" style="color:#1665d0;font-size:12px;text-decoration:underline;margin-top:4px;display:inline-block">詳細を見る →</a>
          </div>`
        );
        if (shop.id === selectedId) {
          marker.openPopup();
        }
      });

      if (shops.length > 1) {
        const group = L.featureGroup(
          shops.map((s) => L.marker([s.lat, s.lng]))
        );
        map.fitBounds(group.getBounds().pad(0.2));
      }

      (container as any)._leaflet_map = map;
    }

    initMap();

    return () => {
      map?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shops.map((s) => s.id).join(","), selectedId]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div id="map" className="w-full h-full rounded-xl" />
    </>
  );
}
