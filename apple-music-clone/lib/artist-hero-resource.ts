import type { ArtistHeroResourceId } from "./artist-hero-resources";

export const artistHeroResourceId = "artist-hero-olivia-rodrigo-2026" satisfies ArtistHeroResourceId;

const frames = {
  "484851bf": {
    screenId: "484851bf-bc23-4088-8a34-4078c4d6b4ff",
    currentTime: 29.736667,
  },
  "bc773ae9": {
    screenId: "bc773ae9-a55f-495b-a49f-d5b683feee73",
    currentTime: 27.505,
  },
  "f24fda77": {
    screenId: "f24fda77-5050-411c-8071-906043dcea9c",
    currentTime: 26.675,
  },
} as const;

export function artistHeroFrame(source?: string) {
  const prefix = source?.slice(0, 8) as keyof typeof frames | undefined;
  return prefix && frames[prefix] ? frames[prefix] : frames["484851bf"];
}
