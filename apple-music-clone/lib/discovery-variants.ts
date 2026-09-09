import { crop, features, trackById, type Card } from "./music-catalog";

export const performanceFeature: Card = { id: "so-sick", kicker: "ONLY ON APPLE MUSIC", title: "So Sick (Live from Apple Music Studios)", subtitle: "Ne-Yo", destination: "video:so-sick", art: crop("1f9e170c",854,167,548,314) };
export const liveFeatures: Card[] = [
  { id: "coachella", kicker: "NEW LIVE ALBUM", title: "SWAG LIVE FROM COACHELLA (Weekend I)", subtitle: "Justin Bieber", destination: "category:SWAG LIVE FROM COACHELLA (Weekend I)", art: crop("8f029018",286,167,406,233) },
  { id: "a-list-pop", kicker: "UPDATED PLAYLIST", title: "A-List Pop", subtitle: "Apple Music Pop", destination: "category:A-List Pop", art: crop("8f029018",710,167,406,233) },
  features[4]!,
];
export const legacyFeatures = [
  { ...features[2]!, kicker: "UPDATED PLAYLIST" }, features[3]!, features[4]!, liveFeatures[1]!, features[5]!,
];
export const legacySongs = ["album-1", "album-2", "chart-2", "chart-3", "chart-4", "chart-5", "library-4", "chart-7", "chart-8", "chart-9", "chart-10", "chart-11"].map(id => trackById(id)!);
export const queueSongs = ["album-1", "august", "chart-8", "elizabeth-taylor", "viral-10", "chart-9", "album-2", "library-4", "chart-7", "chart-4", "chart-11", "viral-1"].map(id => trackById(id)!);

