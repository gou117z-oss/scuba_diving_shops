import { readSpots } from "@/lib/spots";
import SpotsClient from "./SpotsClient";

export default async function SpotsPage() {
  const allSpots = await readSpots();
  return <SpotsClient spots={allSpots} />;
}
