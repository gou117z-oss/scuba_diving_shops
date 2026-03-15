import { readShops } from "@/lib/shops";
import ShopsClient from "./ShopsClient";

export default async function ShopsPage() {
  const allShops = (await readShops()).filter((s) => s.approved);
  return <ShopsClient shops={allShops} />;
}
