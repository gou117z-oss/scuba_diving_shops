import { promises as fs } from "fs";
import path from "path";

export type Spot = {
  id: string;
  name: string;
  country: string;
  region: string;
  description: string;
  waterTemp: { min: number; max: number };
  visibility: string;
  bestSeason: string;
  highlights: string[];
  difficulty: string;
  depthRange: string;
  lat: number;
  lng: number;
  imageEmoji: string;
  officialUrl?: string | null;
  portalUrl?: string | null;
};

const dataPath = path.join(process.cwd(), "data", "spots.json");

export async function readSpots(): Promise<Spot[]> {
  const raw = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(raw);
}

export async function filterSpots(params: {
  country?: string;
  difficulty?: string;
  keyword?: string;
}): Promise<Spot[]> {
  let spots = await readSpots();

  if (params.country) {
    spots = spots.filter((s) => s.country === params.country);
  }
  if (params.difficulty) {
    spots = spots.filter((s) => s.difficulty.includes(params.difficulty!));
  }
  if (params.keyword) {
    const kw = params.keyword.toLowerCase();
    spots = spots.filter(
      (s) =>
        s.name.toLowerCase().includes(kw) ||
        s.description.toLowerCase().includes(kw) ||
        s.region.toLowerCase().includes(kw) ||
        s.highlights.some((h) => h.toLowerCase().includes(kw))
    );
  }

  return spots;
}

export async function findSpot(id: string): Promise<Spot | null> {
  const spots = await readSpots();
  return spots.find((s) => s.id === id) ?? null;
}
