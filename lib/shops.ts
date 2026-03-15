import { promises as fs } from "fs";
import path from "path";

export type Shop = {
  id: string;
  name: string;
  country: string;
  region: string;
  city: string;
  address: string;
  phone: string | null;
  email: string | null;
  website?: string | null;
  languages: string[];
  courses: string[];
  priceRange?: string | null;
  description: string;
  lat: number;
  lng: number;
  approved: boolean;
  createdAt: string;
};

const dataPath = path.join(process.cwd(), "data", "shops.json");

export async function readShops(): Promise<Shop[]> {
  const raw = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(raw);
}

export async function writeShops(shops: Shop[]): Promise<void> {
  await fs.writeFile(dataPath, JSON.stringify(shops, null, 2), "utf-8");
}

export async function filterShops(params: {
  country?: string;
  region?: string;
  course?: string;
  keyword?: string;
}): Promise<Shop[]> {
  let shops = await readShops();
  shops = shops.filter((s) => s.approved);

  if (params.country) {
    shops = shops.filter((s) => s.country === params.country);
  }
  if (params.region) {
    shops = shops.filter((s) => s.region === params.region);
  }
  if (params.course) {
    const cs = params.course.toLowerCase();
    shops = shops.filter((s) =>
      s.courses.some((c) => c.toLowerCase().includes(cs))
    );
  }
  if (params.keyword) {
    const kw = params.keyword.toLowerCase();
    shops = shops.filter(
      (s) =>
        s.name.toLowerCase().includes(kw) ||
        s.description.toLowerCase().includes(kw) ||
        s.city.toLowerCase().includes(kw) ||
        s.courses.some((c) => c.toLowerCase().includes(kw))
    );
  }

  return shops;
}

export async function findShop(id: string): Promise<Shop | null> {
  const shops = await readShops();
  return shops.find((s) => s.id === id && s.approved) ?? null;
}
