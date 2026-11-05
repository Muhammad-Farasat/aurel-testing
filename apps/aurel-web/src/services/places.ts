import { places, type Place, type PlaceKind } from "../data/places";
import { wait } from "./latency";

/** Mock autocomplete. Results are labelled Airport, Hotel or Address (REF-007). */
export async function searchPlaces(query: string, kind?: PlaceKind): Promise<Place[]> {
  await wait(220, 480);
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  const scored = places
    .filter((p) => !kind || p.kind === kind)
    .map((p) => {
      const hay = `${p.label} ${p.short} ${p.detail} ${p.code ?? ""}`.toLowerCase();
      if (!terms.every((t) => hay.includes(t))) return null;
      const starts = p.label.toLowerCase().startsWith(q) || p.short.toLowerCase().startsWith(q) ? 0 : 1;
      return { p, score: starts };
    })
    .filter((x): x is { p: Place; score: number } => x !== null)
    .sort((a, b) => a.score - b.score);
  return scored.slice(0, 6).map((x) => x.p);
}

export const kindLabel: Record<PlaceKind, string> = {
  airport: "Airport",
  hotel: "Hotel",
  address: "Address",
};
