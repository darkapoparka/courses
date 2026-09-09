import { canonicalFlows, findFlow, sourceId, sourceIds } from "./music-catalog";

export const pages = ["new", "home", "search", "album", "artist", "chart", "radio", "schedule", "concerts", "concert", "nearby", "replay", "milestones", "milestone", "library", "artists", "albums", "songs", "videos", "made-for-you", "playlists", "playlist", "favourites", "credits", "settings", "connected", "subscription", "category"] as const;
export type Page = (typeof pages)[number];
export type Overlay = "signin" | "signup" | "verify" | "payment" | "article" | "new-playlist" | "dates" | "passcode" | "cancel-trial" | "cancelled" | "media" | "reference" | null;
export type Menu = "track" | "album" | "profile" | "sort" | "share" | "location" | "genres" | "station" | null;
export type Scene = {
  page: Page;
  source?: string;
  guest?: boolean;
  namedProfile?: boolean;
  hero?: "default" | "superbloom" | "alpha";
  scroll?: string;
  scrollOffset?: number;
  overlay?: Overlay;
  formStep?: number;
  filled?: boolean;
  expanded?: boolean;
  lyrics?: boolean;
  panel?: "queue" | "lyrics" | null;
  queueEmpty?: boolean;
  autoplay?: boolean;
  track?: string;
  snapshotPlaying?: boolean;
  favourite?: boolean;
  shuffle?: boolean;
  repeat?: boolean;
  volumeOpen?: boolean;
  volume?: number;
  menu?: Menu;
  empty?: boolean;
  query?: string;
  scope?: "catalog" | "library";
  selectedArtist?: string;
  sort?: "ascending" | "descending";
  pinned?: boolean;
  editingNav?: boolean;
  hiddenNav?: string[];
  location?: string;
  dateRange?: string;
  genre?: string;
  month?: string;
  cancelled?: boolean;
  restrictions?: boolean;
  locale?: "en" | "zh";
  category?: string;
  video?: boolean;
};
const base: Scene = { page: "new" };
const playing: Scene = { page: "new", namedProfile: true, hero: "superbloom", track: "album-2", snapshotPlaying: true };
const expanded: Scene = { ...playing, expanded: true, lyrics: true };
const account: Scene = { page: "settings", namedProfile: true };
const definitions: Record<string, Scene> = {
  "3731221f": { ...base, guest: true },
  "ee751367": { ...base, guest: true, overlay: "signin" },
  "bdc56e10": { ...base, guest: true, overlay: "signin", filled: true },
  "4a1d7759": { ...base, guest: true, overlay: "signup" },
  "cd34d1ac": { ...base, guest: true, overlay: "signup", filled: true },
  "eebd5ffb": { ...base, guest: true, overlay: "signup", formStep: 1 },
  "269160a4": { ...base, guest: true, overlay: "signup", formStep: 1, filled: true },
  "99af3033": { ...base, guest: true, overlay: "verify" },
  "dfce44a2": { ...base, guest: true, overlay: "verify", filled: true },
  "51c79ae2": { ...base, guest: true, overlay: "payment" },
  "b74d25cb": { ...base, guest: true, overlay: "payment", filled: true },
  "94b9d90d": { ...base, guest: true, overlay: "payment", formStep: 1 },
  "a728c2af": { ...base, guest: true, overlay: "payment", formStep: 1, filled: true },
  "06ea37ef": { ...base, guest: true, overlay: "payment", formStep: 1, filled: true, scrollOffset: 50 },
  "5175a910": { ...base, guest: true, overlay: "payment", formStep: 2 },
  "ecb33359": { ...base, guest: true, overlay: "payment", formStep: 2, scrollOffset: 60 },
  "bf099ae2": { ...base, guest: true, overlay: "payment", formStep: 3 },
  "e72be564": base,
  "a917d88f": { page: "home", namedProfile: true },
  "4f611a9e": { ...base, namedProfile: true },
  "54b01eab": { ...base, hero: "alpha", namedProfile: true },
  "8b03c9d0": { ...base, scroll: "essentials", namedProfile: true },
  "706de500": { ...base, scroll: "coming-soon", namedProfile: true },
  "8a234785": { page: "chart", namedProfile: true },
  "11803c64": { ...base, track: "album-2", namedProfile: true },
  "c98f8b54": { ...base, track: "album-2", namedProfile: true },
  "1f9e170c": { ...base, track: "album-2", snapshotPlaying: true, namedProfile: true },
  "9fbb38e1": { ...base, track: "album-2", snapshotPlaying: true, namedProfile: true },
  "afd02fa6": { ...base, track: "album-2", snapshotPlaying: true, namedProfile: true },
  "d83e96ba": { ...base, track: "viral-8", snapshotPlaying: true, namedProfile: true },
  "ad689c37": { ...base, track: "viral-8", namedProfile: true },
  "cf59e554": { ...playing, shuffle: true },
  "a229e38a": { ...playing, repeat: true },
  "6ac70c34": playing,
  "c939c9b8": expanded,
  "b3f29b6f": { ...expanded, favourite: true },
  "ac05c6b8": { ...expanded, favourite: true, menu: "track" },
  "96711b04": { ...expanded, favourite: true, menu: "track" },
  "0c6da10e": { ...expanded, favourite: true, menu: "track", formStep: 1 },
  "55ae9e4c": { ...expanded, overlay: "new-playlist" },
  "67446c83": { ...expanded, overlay: "new-playlist", filled: true },
  "3c1805b6": { ...expanded, overlay: "new-playlist", filled: true, formStep: 1 },
  "a4d30e7d": { ...expanded, favourite: true },
  "6337700d": { page: "credits", track: "album-2", snapshotPlaying: true, namedProfile: true },
  "2278b1d0": { page: "credits", track: "album-2", snapshotPlaying: true, namedProfile: true, scroll: "production" },
  "06a34864": { ...expanded, lyrics: false, favourite: true },
  "ee8db412": { ...playing, panel: "lyrics" },
  "8f029018": { ...playing, panel: "queue" },
  "de48a956": { ...playing, panel: "queue", queueEmpty: true },
  "4811dde3": { ...playing, panel: "queue", autoplay: true },
  "e4dad439": { ...playing, volumeOpen: true },
  "cbbdc344": { ...playing, volumeOpen: true, volume: 0.1 },
  "95ae6a8f": { ...playing, volumeOpen: true, volume: 1 },
  "b620e4ab": { page: "album", namedProfile: true },
  "ffd1356a": { page: "album", namedProfile: true, scroll: "other-versions" },
  "eb489e8d": { page: "album", namedProfile: true, scroll: "music-videos" },
  "32515da3": { page: "album", namedProfile: true, overlay: "article" },
  "9b43cccb": { page: "album", namedProfile: true, overlay: "article", scrollOffset: 300 },
  "56c2e39a": { page: "album", namedProfile: true, menu: "share" },
  "ef86b595": { page: "album", namedProfile: true, menu: "album" },
  "eca1baa1": { page: "album", namedProfile: true, menu: "album", filled: true },
  "484851bf": { page: "artist", namedProfile: true },
  "57f7c08e": { page: "artist", namedProfile: true, scroll: "essential-albums" },
  "edae3407": { page: "artist", namedProfile: true, scroll: "music-videos" },
  "c9a554f4": { page: "artist", namedProfile: true, scroll: "nearby-concerts" },
  "0c042c32": { page: "artist", namedProfile: true, scroll: "about-artist" },
  "9105a602": { page: "nearby", namedProfile: true },
  "653efa95": { page: "nearby", namedProfile: true, scroll: "more-concerts" },
  "bc773ae9": { page: "artist", namedProfile: true, menu: "track" },
  "f24fda77": { page: "artist", namedProfile: true, menu: "track", filled: true },
  "898ca766": { page: "artist", namedProfile: true, scroll: "music-videos" },
  "a4afd6e6": { page: "artist", namedProfile: true, video: true, snapshotPlaying: true },
  "035569a0": { page: "search", namedProfile: true },
  "812ba627": { page: "search", namedProfile: true, scroll: "more-categories" },
  "5b3ec96a": { page: "search", namedProfile: true, scope: "library", empty: true },
  "4b515439": { page: "search", namedProfile: true, query: "olivia", filled: true },
  "e70094e3": { page: "search", namedProfile: true, query: "olivia" },
  "bbb92581": { page: "search", namedProfile: true, query: "olivia", scope: "library" },
  "a0809fad": { page: "concerts", namedProfile: true },
  "70566e85": { page: "concerts", namedProfile: true, scroll: "nashville" },
  "dcafd99e": { page: "concert", namedProfile: true },
  "4f237528": { page: "concert", namedProfile: true, scroll: "more-concerts" },
  "bd89b0a1": { page: "concerts", namedProfile: true, menu: "location" },
  "1cd4d25b": { page: "concerts", namedProfile: true, menu: "location", location: "Singapore" },
  "f78d223e": { page: "concerts", namedProfile: true, menu: "location", location: "chicago" },
  "84b9db6f": { page: "concerts", namedProfile: true, location: "Chicago, IL" },
  "e1069ba9": { page: "concerts", namedProfile: true, location: "Chicago, IL", overlay: "dates" },
  "b896bf23": { page: "concerts", namedProfile: true, location: "Chicago, IL", overlay: "dates", formStep: 1 },
  "e1f20d4a": { page: "concerts", namedProfile: true, location: "Chicago, IL", overlay: "dates", formStep: 1, filled: true },
  "83bba8fd": { page: "concerts", namedProfile: true, location: "Chicago, IL", dateRange: "Jul 1–12" },
  "99ffee15": { page: "concerts", namedProfile: true, location: "Chicago, IL", dateRange: "Jul 1–12", menu: "genres" },
  "d6b9a1a7": { page: "concerts", namedProfile: true, location: "Chicago, IL", dateRange: "Jul 1–12", genre: "Alternative" },
  "f3fc07c5": { page: "replay", namedProfile: true, month: "Jul", empty: true },
  "3fed6760": { page: "replay", namedProfile: true, month: "May" },
  "b67b8895": { page: "replay", namedProfile: true, month: "May", scroll: "top-albums" },
  "18225175": { page: "replay", namedProfile: true, month: "May", scroll: "milestones" },
  "b0caf02f": { page: "replay", namedProfile: true, month: "May", scroll: "replay-year" },
  "cc18744f": { page: "milestones", namedProfile: true },
  "b5d31893": { page: "milestone", namedProfile: true },
  "aefa8502": { page: "home", guest: true },
  "2f5da478": { page: "home", namedProfile: true },
  "d5173715": { page: "home", namedProfile: true, hero: "alpha" },
  "42098642": { page: "home", namedProfile: true, scroll: "add-library" },
  "4cb8f3aa": { page: "radio", namedProfile: true },
  "0920d819": { page: "radio", namedProfile: true, scroll: "radio-stations" },
  "a9992e55": { page: "radio", namedProfile: true, track: "station-1" },
  "47a07865": { page: "radio", namedProfile: true, track: "station-1", snapshotPlaying: true },
  "7bd2ef54": { page: "radio", namedProfile: true, track: "station-1", snapshotPlaying: true, expanded: true },
  "37575452": { page: "radio", namedProfile: true, track: "station-1", menu: "station" },
  "f49fce21": { page: "schedule", namedProfile: true },
  "bdc69b59": { page: "library", empty: true },
  "e757eb0f": { page: "library", namedProfile: true },
  "0df0d2a2": { page: "artists", namedProfile: true, selectedArtist: "Ariana Grande" },
  "610af644": { page: "artists", namedProfile: true, selectedArtist: "Olivia Rodrigo" },
  "5d3db7ca": { page: "albums", namedProfile: true },
  "92589389": { page: "songs", namedProfile: true },
  "09b3600e": { page: "songs", namedProfile: true, menu: "sort" },
  "1d016f0f": { page: "songs", namedProfile: true, sort: "descending" },
  "e9bee76d": { page: "songs", namedProfile: true, track: "album-2" },
  "3884ff64": { page: "songs", namedProfile: true, track: "album-2", menu: "track" },
  "06be9f09": { page: "songs", namedProfile: true, pinned: true },
  "4e857921": { page: "videos", namedProfile: true },
  "0b0e3fbf": { page: "made-for-you", empty: true },
  "e379e3fe": { page: "made-for-you", namedProfile: true },
  "8a2a4241": { page: "playlists", namedProfile: true },
  "a573d1ab": { page: "playlist", namedProfile: true },
  "5044abe5": { page: "playlist", namedProfile: true, filled: true },
  "bde65d33": { page: "favourites", namedProfile: true },
  "f2e44e3b": { ...playing, track: undefined, snapshotPlaying: false },
  "ffc18eb8": { ...playing, track: undefined, snapshotPlaying: false, editingNav: true },
  "3728aa07": { ...playing, track: undefined, snapshotPlaying: false, editingNav: true, hiddenNav: ["library"] },
  "e5e8383f": { ...playing, track: undefined, snapshotPlaying: false, hiddenNav: ["library", "artists", "albums"] },
  "fc5d84bd": { ...base, namedProfile: true, menu: "profile" },
  "481cd568": account,
  "1e5b4763": { ...account, scroll: "account-access" },
  "01f96377": { ...account, scroll: "parental-controls" },
  "44101453": { ...account, scroll: "subscriptions" },
  "b2e0f231": { page: "connected", namedProfile: true },
  "f99d9583": { ...account, scroll: "parental-controls", overlay: "passcode" },
  "0da4882b": { ...account, scroll: "parental-controls", overlay: "passcode", filled: true },
  "8b9e8598": { ...account, scroll: "parental-controls", overlay: "passcode", formStep: 1 },
  "0260ef9f": { ...account, scroll: "parental-controls", overlay: "passcode", formStep: 1, filled: true },
  "5b34ad72": { ...account, scroll: "parental-controls", overlay: "passcode", formStep: 2 },
  "7437b956": { ...account, scroll: "parental-controls", overlay: "passcode", formStep: 3 },
  "6436de36": { ...account, scroll: "parental-controls", restrictions: true },
  "c0997fe5": { page: "subscription", namedProfile: true },
  "fd1c0c71": { page: "subscription", namedProfile: true, overlay: "cancel-trial" },
  "03157020": { page: "subscription", namedProfile: true, overlay: "cancelled" },
  "603983c7": { page: "subscription", namedProfile: true, cancelled: true, guest: true },
  "50fe374b": { ...account, locale: "zh" },
  "f4a8b5dc": { page: "search", namedProfile: true, locale: "zh" },
  "468b0465": { page: "home", namedProfile: true, locale: "zh" },
  "be864051": { ...base, namedProfile: true, locale: "zh" },
  "3131018d": { ...base, guest: true, overlay: "signin" },
  "417f6129": { ...base, guest: true, overlay: "signin", filled: true },
  "6aa4a9d7": { ...base, guest: true, overlay: "verify", formStep: 1 },
  "4e65c7c6": { ...base, guest: true, overlay: "verify", formStep: 1, filled: true },
  "97de6907": { ...base, guest: true, overlay: "verify", formStep: 2 },
  "e027fe6d": { ...base, namedProfile: true },
};
export const screenScenes: Readonly<Record<string, Scene>> = Object.fromEntries(
  Object.entries(definitions).map(([prefix, scene]) => { const source = sourceId(prefix); return [source, { ...scene, source }]; }),
);
export function screenScene(id: string): Scene | null { return screenScenes[id] ?? null; }
export function isPage(value: string): value is Page { return (pages as readonly string[]).includes(value); }
export function sceneFromUrl(url: URL): Scene | null {
  const parts = url.pathname.split("/").filter(Boolean);
  if (parts[0] === "screen") return parts.length === 2 ? screenScene(parts[1]!) : null;
  if (parts[0] === "flows" && parts.length === 2) {
    const flow = findFlow(parts[1]!);
    const raw = url.searchParams.get("step") ?? "0";
    if (!flow || !/^\d+$/.test(raw)) return null;
    const step = Number(raw);
    const screen = flow.steps[step];
    return screen ? screenScene(screen.screenId) : null;
  }
  if (parts.length) return null;
  const view = url.searchParams.get("view") ?? "new";
  const page = view === "lyrics" ? "new" : view === "marketing" ? "home" : isPage(view) ? view : null;
  if (!page) return null;
  return { page, namedProfile: true, guest: url.searchParams.get("guest") === "1", query: url.searchParams.get("q") ?? undefined,
    scope: url.searchParams.get("scope") === "library" ? "library" : "catalog",
    category: url.searchParams.get("category") ?? undefined,
    expanded: view === "lyrics", lyrics: view === "lyrics", track: view === "lyrics" ? "album-2" : undefined };
}
export function sceneUrl(scene: Scene): string {
  const query = new URLSearchParams({ view: scene.page });
  if (scene.guest) query.set("guest", "1");
  if (scene.query) query.set("q", scene.query);
  if (scene.scope === "library") query.set("scope", "library");
  if (scene.category) query.set("category", scene.category);
  return `/?${query}`;
}
export const referenceCoverage = {
  sources: sourceIds.length, mapped: Object.keys(screenScenes).length,
  flows: canonicalFlows.length, steps: canonicalFlows.reduce((count, flow) => count + flow.steps.length, 0),
};
