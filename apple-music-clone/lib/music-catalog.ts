import archive from "../reference/originals/flow-screen-map.json";

/** The archive owns identity. Prefixes below are human-reviewed, unique anchors,
 * not array indices, inferred categories, or a modulo fallback. */
export const sourceIds = [...new Set(archive.flows.flatMap((flow) => flow.steps.map((step) => step.screenId)))];
export function sourceId(prefix: string): string {
  const matches = sourceIds.filter((id) => id.startsWith(prefix));
  if (matches.length !== 1) throw new Error(`Ambiguous or missing reference identity: ${prefix}`);
  return matches[0]!;
}
export type Artwork = { source: string; x: number; y: number; width: number; height: number };
export function crop(prefix: string, x: number, y: number, width: number, height: number): Artwork {
  if (x < 0 || y < 0 || width <= 0 || height <= 0 || x + width > 1440 || y + height > 903) {
    throw new Error(`Artwork crop is outside the application image: ${prefix}`);
  }
  return { source: sourceId(prefix), x, y, width, height };
}

export type Track = {
  id: string; title: string; artist: string; album: string; duration: number;
  art: Artwork; explicit?: boolean; unavailable?: boolean;
};
export type Card = { id: string; title: string; subtitle?: string; art: Artwork; destination: string; kicker?: string };
export const albumTitle = "you seem pretty sad for a girl so in love";
export const albumArt = crop("b620e4ab", 286, 42, 256, 256);
export const sourArt = crop("e757eb0f", 514, 305, 207, 207);

const albumRows: [string, number, boolean?, boolean?][] = [
  ["drop dead", 224], ["stupid song", 209], ["honeybee", 223],
  ["maggots for brains", 240], ["u + me = <3", 0, true, true],
  ["my way", 0, true, true], ["purple", 240], ["the cure", 0, true, true],
  ["begged", 217], ["what’s wrong with me", 224], ["less", 193],
  ["expectations", 221], ["cigarette smoke", 0, true, true],
];
export const albumTracks: Track[] = albumRows.map(([title, duration, explicit, unavailable], i) => ({
  id: `album-${i + 1}`, title, artist: i === 9 ? "Olivia Rodrigo, Robert Smith" : "Olivia Rodrigo",
  album: albumTitle, duration, art: albumArt, explicit, unavailable,
}));
const viralRows: [string, string, boolean?][] = [
  ["stupid song", "Olivia Rodrigo"], ["I Knew It, I Knew You", "Taylor Swift"],
  ["hate that i made you love me", "Ariana Grande"], ["Spend Dat", "Yung Miami", true],
  ["Billie Jean", "Michael Jackson"], ["Shabang", "Drake", true],
  ["Mexico Honey", "Kacey Musgraves", true], ["Amazing Shape", "Drake, Popcaan", true],
  ["Lush Life", "Zara Larsson"], ["White Keys", "Dominic Fike"],
  ["YUKON", "Justin Bieber"], ["Raindance", "Dave, Tems"],
];
export const viralTracks: Track[] = viralRows.map(([title, artist, explicit], i) => ({
  id: i === 0 ? "album-2" : `viral-${i}`, title, artist, album: i === 0 ? albumTitle : title,
  duration: i === 0 ? 209 : 180 + i * 7, explicit,
  art: i === 0 ? albumArt : crop("e72be564", [286, 665, 1043][Math.floor(i / 4)]!, 564 + (i % 4) * 52.3, 37, 37),
}));
const libraryRows: [string, string, string, number][] = [
  ["BIRDS OF A FEATHER", "Billie Eilish", "HIT ME HARD AND SOFT", 210],
  ["Cruel Summer", "Taylor Swift", "Lover", 178],
  ["deja vu", "Olivia Rodrigo", "SOUR (Video Version)", 215],
  ["jealousy, jealousy", "Olivia Rodrigo", "SOUR (Video Version)", 173],
  ["So Easy (To Fall In Love)", "Olivia Dean", "The Art of Loving", 169],
  ["stupid song", "Olivia Rodrigo", albumTitle, 209],
  ["we can't be friends (wait for your love)", "Ariana Grande", "eternal sunshine", 228],
  ["WILDFLOWER", "Billie Eilish", "HIT ME HARD AND SOFT", 261],
];
export const libraryTracks: Track[] = libraryRows.map(([title, artist, album, duration], i) => ({
  id: i === 5 ? "album-2" : `library-${i}`, title, artist, album, duration,
  art: i === 5 ? albumArt : crop("92589389", 286, 66 + i * 42, 34, 34),
}));
export const allTracks = [...new Map([...viralTracks, ...libraryTracks, ...albumTracks].map((track) => [track.id, track])).values()];
export function trackById(id: string) { return allTracks.find((track) => track.id === id); }
export function formatTime(value: number) {
  const seconds = Math.max(0, Math.floor(Number.isFinite(value) ? value : 0));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export const features: Card[] = [
  { id: "singapore", kicker: "LISTEN NOW", title: "Top 100: Singapore", subtitle: "Apple Music", art: crop("e72be564", 286, 167, 548, 314), destination: "chart" },
  { id: "paradise", kicker: "NEW ALBUM", title: "No Sleep In Paradise", subtitle: "Naomi Sharon", art: crop("e72be564", 854, 167, 548, 314), destination: "album" },
  { id: "superbloom", kicker: "ESSENTIAL ALBUM", title: "Superbloom", subtitle: "Apple Music Pop", art: crop("cf59e554", 286, 167, 548, 314), destination: "album" },
  { id: "anniversaries", kicker: "ESSENTIAL ALBUM", title: "Doja Cat created a world in her own image on Planet Her.", subtitle: "", art: crop("cf59e554", 854, 167, 548, 314), destination: "album" },
  { id: "alpha", kicker: "LISTEN NOW", title: "Alpha Women", subtitle: "Apple Music", art: crop("54b01eab", 286, 167, 548, 314), destination: "chart" },
  { id: "viral", kicker: "TOP PLAYLIST", title: "Viral Chart", subtitle: "Shazam", art: crop("54b01eab", 854, 167, 548, 314), destination: "chart" },
];
export const topPicks: Card[] = [
  { id: "love", title: "Love", subtitle: "Mood for You", art: crop("a917d88f", 286, 135, 264, 353), destination: "playlist" },
  { id: "livies", title: "livies radio", subtitle: "Olivia Rodrigo", art: crop("a917d88f", 570, 135, 264, 353), destination: "artist" },
  { id: "alex", title: "Alex’s Station", art: crop("a917d88f", 854, 135, 264, 353), destination: "radio" },
  { id: "new-music", title: "New Music", art: crop("a917d88f", 1138, 135, 264, 353), destination: "new" },
];
export const recentlyPlayed: Card[] = [
  ["hits", "Apple Music Hits", "Live Station", "radio"],
  ["joseph", "Live at Apple Music Radio", "Joseph Lawrence", "radio"],
  ["parris", "Takeover: Parris Goebel (DJ Mix)", "Apple Music Dance", "radio"],
  ["pop", "Pop", "Pop Station", "radio"],
  ["pheelz", "Pheelz Radio Takeover", "Pheelz", "radio"],
].map(([id, title, subtitle, destination], i) => ({ id: id!, title: title!, subtitle, destination: destination!, art: crop("a917d88f", 286 + i * 227, 572, 207, 207) }));
const categoryNames = ["Apple Music Radio", "Concerts", "Apple Music Live", "K-Pop", "J-Rock", "Hip-Hop/Rap", "Replay Monthly", "Charts", "Sing", "T-Pop", "Thai Music", "Indonesian Music", "Malaysian Music", "Mandopop", "Pop", "Spatial Audio"];
export const categories: Card[] = categoryNames.map((title, i) => ({
  id: `category-${i}`, title,
  destination: i === 1 ? "concerts" : i === 6 ? "replay" : i === 7 ? "chart" : i < 3 ? "radio" : `category:${title}`,
  art: crop("035569a0", 286 + (i % 4) * 284, 246 + Math.floor(i / 4) * 168, 264, 147),
}));
export const libraryCovers: Card[] = [
  ["Unknown Album", "Taylor Swift", "video"], ["Lover", "Taylor Swift", "album"],
  ["Unknown Album", "Sabrina Carpenter", "video"], ["Unknown Album", "Olivia Rodrigo", "video"],
  ["eternal sunshine", "Ariana Grande", "album"], ["HIT ME HARD AND SOFT", "Billie Eilish", "album"],
  ["SOUR (Video Version)", "Olivia Rodrigo", "album"], ["The Art of Loving", "Olivia Dean", "album"],
  ["Emotional Songs", "Alex Smith", "playlist"], [albumTitle, "Olivia Rodrigo", "album"],
].map(([title, subtitle, destination], i) => ({
  id: `cover-${i}`, title: title!, subtitle, destination: destination!,
  art: crop("e757eb0f", 286 + (i % 5) * 227, 31 + Math.floor(i / 5) * 274, 207, 207),
}));
export const radioStations: Card[] = ["1", "Hits", "Country", "Música Uno", "Club", "Chill"].map((name, i) => ({
  id: `station-${i}`, title: `Apple Music ${name}`, destination: `station:${i}`,
  art: crop("4cb8f3aa", 286 + i * 190, 148, 169, 169),
}));
export const artistHero = crop("484851bf", 246, 0, 1190, 465);
export const emotionalArt = crop("a573d1ab", 286, 42, 256, 256);
export const favouriteArt = crop("bde65d33", 286, 42, 256, 256);
export const videoArt = crop("a4afd6e6", 0, 40, 1440, 751);

export const canonicalFlows = archive.flows.map((flow) => ({
  ...flow, slug: flow.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
}));
export function findFlow(value: string) { return canonicalFlows.find((flow) => flow.slug === value || flow.id === value); }
