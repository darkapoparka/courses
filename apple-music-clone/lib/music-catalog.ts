import archive from "../reference/originals/flow-screen-map.json";
import { replayAlbums, replaySongSeeds } from "./replay-data";

/** The archive owns identity. Prefixes below are unique anchors,
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
export type Card = { id: string; title: string; subtitle?: string; art: Artwork; destination: string; kicker?: string; background?: string; portrait?: Artwork; plain?: boolean; explicit?: boolean; year?: string };
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
  duration: i === 0 ? 209 : 0, explicit,
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
/** Visible rows in the frozen chart detail. Unknown/unavailable duration is null-like 0. */
const chartRows: [string, string, string, string, number, boolean?, boolean?][] = [
  ["album-1", "drop dead", "Olivia Rodrigo", albumTitle, 224],
  ["album-2", "stupid song", "Olivia Rodrigo", albumTitle, 209],
  ["chart-2", "End of Beginning", "Djo", "DECIDE", 159],
  ["chart-3", "Iris", "The Goo Goo Dolls", "Dizzy Up the Girl", 289],
  ["chart-4", "Opalite", "Taylor Swift", "The Life of a Showgirl", 235],
  ["chart-5", "Golden", "HUNTR/X, EJAE, AUDREY NUNA, REI AMI, KPop Demon Hunters Cast", "KPop Demon Hunters (Soundtrack from the Netflix Film)", 194],
  ["library-4", "So Easy (To Fall In Love)", "Olivia Dean", "The Art of Loving", 169],
  ["chart-7", "Man I Need", "Olivia Dean", "The Art of Loving", 184],
  ["chart-8", "The Fate of Ophelia", "Taylor Swift", "The Life of a Showgirl", 226],
  ["chart-9", "Love Me Not", "Ravyn Lenae", "Bird’s Eye", 213],
  ["chart-10", "WHERE IS MY HUSBAND!", "RAYE", "WHERE IS MY HUSBAND! - Single", 197],
  ["chart-11", "DAISIES", "Justin Bieber", "SWAG", 176],
  ["chart-12", "Kiss It Better", "Rihanna", "ANTI (Deluxe)", 0, true, true],
  ["chart-13", "What's Up?", "4 Non Blondes", "Bigger, Better, Faster, More!", 295],
  ["chart-14", "Die On This Hill", "SIENNA SPIRO", "Die On This Hill - Single", 217],
];
export const chartTracks: Track[] = chartRows.map(([id, title, artist, album, duration, explicit, unavailable], i) => ({
  id, title, artist, album, duration, explicit, unavailable,
  art: crop("8a234785", 293, 132 + i * 51.45, 37, 37),
}));
const searchTrack: Track = { id: "search-olivia", title: "Olivia", artist: "One Direction", album: "Made In The A.M.", duration: 0, art: crop("e70094e3", 676, 248, 86, 86) };
/** The library flows have clean versions and suggestions not present in the
 * album's restricted track list. Keep those identities separate. */
export const playlistTracks: Track[] = [
  { id: "playlist-cure", title: "the cure", artist: "Olivia Rodrigo", album: albumTitle, duration: 297, art: crop("a573d1ab", 293, 425, 38, 38) },
  { id: "drivers-license", title: "drivers license", artist: "Olivia Rodrigo", album: "SOUR (Video Version)", duration: 242, art: crop("a573d1ab", 293, 477, 38, 38) },
  { id: "vampire", title: "vampire", artist: "Olivia Rodrigo", album: "GUTS (spilled)", duration: 219, art: crop("5044abe5", 293, 528, 38, 38) },
  { id: "style-tv", title: "Style (Taylor's Version)", artist: "Taylor Swift", album: "1989 (Taylor's Version)", duration: 0, art: crop("a573d1ab", 305, 759, 38, 38) },
  { id: "bad-guy", title: "bad guy", artist: "Billie Eilish", album: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?", duration: 0, art: crop("a573d1ab", 305, 811, 38, 38) },
  { id: "survive", title: "Survive", artist: "Lewis Capaldi", album: "Survive", duration: 0, art: crop("a573d1ab", 853, 707, 38, 38) },
  { id: "as-it-was", title: "As It Was", artist: "Harry Styles", album: "Harry’s House", duration: 0, art: crop("a573d1ab", 853, 811, 38, 22) },
  { id: "dont-start-now", title: "Don't Start Now", artist: "Dua Lipa", album: "Future Nostalgia", duration: 0, art: crop("5044abe5", 853, 811, 38, 22) },
];
export const suggestionOrder = ["library-2", "style-tv", "bad-guy", "survive", "vampire", "as-it-was", "dont-start-now"];

const queueRows: [string, string, number][] = [
  ["So Easy (To Fall In Love)", "Olivia Dean", 169], ["Man I Need", "Olivia Dean", 184],
  ["Opalite", "Taylor Swift", 235], ["DAISIES", "Justin Bieber", 176],
  ["I Knew It, I Knew You", "Taylor Swift", 178], ["Golden", "HUNTR/X, EJAE, AUDREY NUNA", 194],
  ["YUKON", "Justin Bieber", 163], ["Beauty and a Beat (feat. Nicki Minaj)", "Justin Bieber", 227],
  ["Shape of a Woman", "Lady Gaga", 209], ["Purple Rain", "Prince & The Revolution", 521],
  ["In The Dark", "Selena Gomez", 185], ["MILLION DOLLAR BABY", "Tommy Richman", 155],
];
export const capturedQueue: Track[] = queueRows.map(([title, artist, duration], i) => ({
  id: ["library-4", "chart-7", "chart-4", "chart-11", "viral-1", "chart-5", "viral-10"][i] ?? `queue-${i}`, title, artist, album: title, duration, art: crop("8f029018",1174,60+i*52.3,38,38),
}));
export const additionalViral: Track[] = [
  { id: "august", title: "august", artist: "Taylor Swift", album: "folklore", duration: 0, art: crop("8f029018",286,534,38,38) },
  { id: "elizabeth-taylor", title: "Elizabeth Taylor", artist: "Taylor Swift", album: "The Life of a Showgirl", duration: 0, art: crop("8f029018",286,639,38,38) },
];
export const autoplayTracks: Track[] = [
  { id: "autoplay-0", title: "Bunker/Preroll", artist: "mynameisntjmack & To…", album: "Bunker/Preroll", duration: 120, art: crop("4811dde3",1174,747,38,38) },
  { id: "autoplay-1", title: "Money Trees (feat. Jay …)", artist: "Kendrick Lamar", album: "Money Trees", duration: 386, art: crop("4811dde3",1174,799,38,38) },
  { id: "autoplay-2", title: "ORANGE SODA", artist: "Baby Keem", album: "ORANGE SODA", duration: 129, art: crop("4811dde3",1174,851,38,38) },
];

const queueDurations = new Map(capturedQueue.map(track => [track.id, track.duration]));
export const replayTracks: Track[] = replaySongSeeds.map(seed => ({
  id: `replay-${seed.rank}`, title: seed.title, artist: seed.artist,
  album: seed.album !== null ? replayAlbums[seed.album].title : seed.title,
  duration: 0, explicit: seed.explicit,
  art: seed.rank === 1 ? crop("b67b8895", 513, 213, 207, 208)
    : crop("b67b8895", 286 + Math.floor((seed.rank - 1) / 4) * 378.5,
      8 + (((seed.rank - 1) % 4) - 1) * 52.3, 38, 38),
}));

export const albumVideoTrack: Track = { id: "album-video", title: albumTitle, artist: "Olivia Rodrigo", album: albumTitle, duration: 20, art: crop("eb489e8d", 664, 69, 359, 202) };
export const allTracks = [...new Map([albumVideoTrack, ...replayTracks, searchTrack, ...capturedQueue, ...additionalViral, ...autoplayTracks, ...playlistTracks, ...chartTracks, ...viralTracks, ...libraryTracks, ...albumTracks].map((track) => [track.id, { ...track, duration: track.duration || queueDurations.get(track.id) || 0 }])).values()];
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
  { id: "alpha", kicker: "UPDATED PLAYLIST", title: "Alpha Women", subtitle: "Alpha Women", art: crop("54b01eab", 286, 167, 548, 314), destination: "chart" },
  { id: "viral", kicker: "NEW PLAYLIST", title: "Viral Chart", subtitle: "Shazam", art: crop("54b01eab", 854, 167, 548, 314), destination: "chart" },
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
  ["parris", "Takeover: Parris Goebel (DJ Mix)", "Parris Goebel", "radio"],
  ["pop", "Pop Station", "Apple Music Pop", "radio"],
  ["pheelz", "Pheelz", "Radio Takeover", "radio"],
].map(([id, title, subtitle, destination], i) => ({ id: id!, title: title!, subtitle, destination: destination!, art: crop("a917d88f", 286 + i * 227, 572, 207, 207) }));
const categoryNames = ["Apple Music Radio", "Concerts", "Apple Music Live", "K-Pop", "J-Rock", "Hip-Hop/Rap", "Replay Monthly", "Charts", "Sing", "T-Pop", "Thai Music", "Indonesian Music", "Malaysian Music", "Mandopop", "Pop", "Spatial Audio"];
export const categories: Card[] = categoryNames.map((title, i) => ({
  id: `category-${i}`, title,
  destination: i === 1 ? "concerts" : i === 6 ? "replay" : i === 7 ? "chart" : i < 3 ? "radio" : `category:${title}`,
  art: crop("035569a0", 286 + (i % 4) * 284, 246 + Math.floor(i / 4) * 168, 264, 148),
  // The fourth row is covered by the captured floating player. Reuse only
  // its unobscured portrait, not the player controls baked into the source.
  ...(i >= 12 ? { portrait: crop("035569a0", 286 + (i % 4) * 284, 750, 264, 78), background: ["#007986", "#00812e", "#f44b7a", "#ff003a"][i % 4] } : {}),
}));
// These mood covers are only partially captured; preserve their named slots
// without substituting unrelated album artwork. Their full artwork is unverified.
categories.push(...["Feel Good", "Love", "Motivation", "Party"].map((title, i): Card => ({
  id: `mood-${i}`, title, destination: `category:${title}`, plain: true,
  background: ["#ead2bd", "#d9decf", "#cfb8c0", "#d39aaf"][i],
  art: crop("812ba627", 286 + i * 284, 0, 264, 28),
})));
categories.push(...["Wellbeing", "Fitness", "Kids", "Music Videos", "Alternative", "Rock", "Dance", "Electronic", "Country", "Tamil", "Bollywood", "Jazz", "Mandopop"].map((title, i): Card => ({
  id: `more-category-${i}`, title, destination: title === "Music Videos" ? "videos" : `category:${title}`,
  art: crop("812ba627", 286 + (i % 4) * 284, 47 + Math.floor(i / 4) * 168, 264, 148),
})));
export const zhCategories: Card[] = [
  ["电台", "radio"], ["另类音乐", "category:另类音乐"], ["R&B", "category:R&B"], ["演唱会", "concerts"],
  ["Apple Music Live", "radio"], ["K-Pop", "category:K-Pop"], ["日系摇滚", "category:日系摇滚"], ["嘻哈/说唱", "category:嘻哈/说唱"],
  ["月度音乐回忆", "replay"], ["排行榜", "chart"], ["唱歌", "category:唱歌"], ["泰国流行", "category:泰国流行"],
  ["泰语音乐", "category:泰语音乐"], ["印尼音乐", "category:印尼音乐"], ["马来西亚音乐", "category:马来西亚音乐"], ["菲律宾流行音乐", "category:菲律宾流行音乐"],
].map(([title, destination], index) => ({ id: `zh-category-${index}`, title: title!, destination: destination!,
  art: crop("f4a8b5dc", 286 + (index % 4) * 284, 245 + Math.floor(index / 4) * 168, 264, 148) }));

export const libraryCovers: Card[] = [
  ["Unknown Album", "Taylor Swift", "video"], ["Lover", "Taylor Swift", "album"],
  ["Unknown Album", "Billie Eilish", "video"], ["Unknown Album", "Olivia Rodrigo", "video"],
  ["eternal sunshine", "Ariana Grande", "album"], ["HIT ME HARD AND SOFT", "Billie Eilish", "album"],
  ["SOUR (Video Version)", "Olivia Rodrigo", "album"], ["The Art of Loving", "Olivia Dean", "album"],
  ["Emotional Songs", "Alex Smith", "playlist"], [albumTitle, "Olivia Rodrigo", "album"],
].map(([title, subtitle, destination], i) => ({
  id: `cover-${i}`, title: title!, subtitle, destination: destination!,
  art: crop("e757eb0f", 286 + (i % 5) * 227, 30 + Math.floor(i / 5) * 274, 208, 208),
  explicit: i === 4 || i === 9, year: ({1: "2019", 4: "2024", 5: "2024", 6: "2021", 7: "2025", 9: "2026"} as Record<number, string>)[i],
}));
export const radioStations: Card[] = ["1", "Hits", "Country", "Música Uno", "Club", "Chill"].map((name, i) => ({
  id: `station-${i}`, title: `Apple Music ${name}`, destination: `station:${i}`,
  art: crop("4cb8f3aa", 286 + i * 189.4, 148, 169, 169),
}));
radioStations.push(...["Pop", "K-Pop", "Chill", "Hits", "Piano"].map((name, index): Card => ({
  id: `station-${6 + index}`, title: `${name} Station`, subtitle: name === "Piano" ? "Piano Station" : `Apple Music ${name}`,
  destination: `station:${6 + index}`, art: crop("0920d819", 286 + index * 227, 64, 208, 209),
})), ...["Mandopop", "C-Pop", "K-Pop", "Classical", "Cantopop"].map((name, index): Card => ({
  id: `station-${11 + index}`, title: `${name} Station`, subtitle: `Apple Music ${name}`,
  destination: `station:${11 + index}`, art: crop("0920d819", 286 + index * 227, 380, 208, 209),
})));
export const artistHero = crop("484851bf", 246, 0, 1190, 400);
export const emotionalArt = crop("a573d1ab", 286, 42, 256, 256);
export const favouriteArt = crop("bde65d33", 286, 42, 256, 256);
export const videoArt = crop("a4afd6e6", 0, 40, 1440, 751);

export const canonicalFlows = archive.flows.map((flow) => ({
  ...flow, slug: flow.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
}));
export function findFlow(value: string) { return canonicalFlows.find((flow) => flow.slug === value || flow.id === value); }
