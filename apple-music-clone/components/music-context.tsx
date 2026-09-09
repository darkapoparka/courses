"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type Dispatch, type MouseEvent, type ReactNode, type RefObject, type SetStateAction } from "react";
import { allTracks, libraryTracks, trackById, viralTracks, type Track } from "../lib/music-catalog";
import { isPage, sceneFromUrl, sceneUrl, type Menu, type Scene } from "../lib/music-scenes";

export type Playlist = { id: string; name: string; description: string; tracks: string[]; public: boolean };
export type LibraryState = { version: 1; favourites: string[]; songs: string[]; pinned: string[]; playlists: Playlist[]; hiddenNav: string[]; locale: "en" | "zh"; restrictions: boolean; cancelled: boolean };
const known = new Set(allTracks.map((track) => track.id));
const initialLibrary: LibraryState = {
  version: 1, songs: libraryTracks.map((track) => track.id), favourites: ["library-0", "library-2", "album-2", "library-7"], pinned: [],
  playlists: [{ id: "emotional", name: "Emotional Songs", description: "", tracks: ["album-2", "album-3", "library-3"], public: false }],
  hiddenNav: [], locale: "en", restrictions: false, cancelled: false,
};
function strings(value: unknown): string[] { return Array.isArray(value) ? [...new Set(value.filter((item): item is string => typeof item === "string" && known.has(item)))].slice(0, 500) : []; }
export function readLibrary(value: unknown): LibraryState | null {
  if (!value || typeof value !== "object" || !("version" in value) || value.version !== 1) return null;
  const row = value as Record<string, unknown>;
  return { version: 1, songs: strings(row.songs), favourites: strings(row.favourites), pinned: strings(row.pinned),
    playlists: Array.isArray(row.playlists) ? row.playlists.slice(0, 100).flatMap((item: unknown) => {
      if (!item || typeof item !== "object") return [];
      const p = item as Record<string, unknown>;
      if (typeof p.id !== "string" || typeof p.name !== "string" || !p.name.trim()) return [];
      return [{ id: p.id.slice(0, 80), name: p.name.slice(0, 100), description: typeof p.description === "string" ? p.description.slice(0, 1000) : "", tracks: strings(p.tracks), public: p.public === true }];
    }) : [],
    hiddenNav: Array.isArray(row.hiddenNav) ? row.hiddenNav.filter((v): v is string => typeof v === "string" && ["library", "artists", "albums", "songs", "videos", "made-for-you"].includes(v)) : [],
    locale: row.locale === "zh" ? "zh" : "en", restrictions: row.restrictions === true, cancelled: row.cancelled === true };
}
const toggle = (items: string[], id: string) => items.includes(id) ? items.filter((value) => value !== id) : [...items, id];
export type Controller = {
  scene: Scene; patch: (patch: Partial<Scene>) => void; go: (destination: string) => void;
  library: LibraryState; setLibrary: Dispatch<SetStateAction<LibraryState>>;
  active: Track | undefined; activeId: string | undefined; playing: boolean; snapshot: boolean;
  elapsed: number; duration: number; setElapsed: (value: number) => void;
  volume: number; setVolume: (value: number) => void; muted: boolean; setMuted: (value: boolean) => void;
  shuffle: boolean; setShuffle: (value: boolean) => void; repeat: boolean; setRepeat: (value: boolean) => void;
  queue: string[]; setQueue: Dispatch<SetStateAction<string[]>>;
  play: (track: Track | string) => void; togglePlayback: () => void; skip: (direction: number) => void;
  audio: RefObject<HTMLAudioElement | null>; loadMedia: (file: File) => Promise<void>; mediaName: string;
  favourite: (id: string) => void; addToLibrary: (id: string) => void; pin: (id: string) => void;
  openMenu: (menu: Menu, event?: MouseEvent<HTMLElement>, id?: string) => void;
  menuTrack: Track; menuPosition: { x: number; y: number } | null;
  message: string; notify: (message: string) => void;
};
const Context = createContext<Controller | null>(null);
export function useMusic(): Controller { const value = useContext(Context); if (!value) throw new Error("Music controls require MusicProvider"); return value; }

export function MusicProvider({ initialScene, children }: { initialScene: Scene; children: ReactNode }) {
  const [scene, setScene] = useState(initialScene);
  const referenceSession = useRef(Boolean(initialScene.source));
  const [library, setLibrary] = useState<LibraryState>(() => ({ ...initialLibrary,
    songs: initialScene.empty && initialScene.page === "library" ? [] : [...initialLibrary.songs],
    favourites: [...initialLibrary.favourites], playlists: initialLibrary.playlists.map((item) => ({ ...item, tracks: [...item.tracks, ...(initialScene.page === "playlist" && initialScene.filled ? ["viral-5"] : [])] })),
    pinned: initialScene.pinned ? ["album-2"] : [], hiddenNav: initialScene.hiddenNav ?? [], locale: initialScene.locale ?? "en", restrictions: initialScene.restrictions ?? false, cancelled: initialScene.cancelled ?? false }));
  const [hydrated, setHydrated] = useState(false);
  const [activeId, setActiveId] = useState(initialScene.track);
  const [realPlaying, setRealPlaying] = useState(false);
  const [snapshot, setSnapshot] = useState(Boolean(initialScene.snapshotPlaying));
  const [elapsed, updateElapsed] = useState(0);
  const [duration, updateDuration] = useState(0);
  const [volume, updateVolume] = useState(initialScene.volume ?? .7);
  const [muted, updateMuted] = useState(false);
  const [shuffle, setShuffle] = useState(Boolean(initialScene.shuffle));
  const [repeat, setRepeat] = useState(Boolean(initialScene.repeat));
  const [queue, setQueue] = useState<string[]>(initialScene.queueEmpty ? [] : viralTracks.slice(1).map((track) => track.id));
  const [menuTrackId, setMenuTrackId] = useState(initialScene.track ?? "album-2");
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [message, setMessage] = useState("");
  const [mediaName, setMediaName] = useState("");
  const messageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const media = useRef(new Map<string, { url: string; name: string }>());
  const storageWarning = useRef(false);
  const notify = useCallback((text: string) => { if (messageTimer.current) clearTimeout(messageTimer.current); setMessage(text); messageTimer.current = setTimeout(() => setMessage(""), 4500); }, []);
  const patch = useCallback((changes: Partial<Scene>) => setScene((current) => ({ ...current, source: undefined, scroll: undefined, ...changes })), []);

  useEffect(() => {
    if (!referenceSession.current) {
      try { const raw = localStorage.getItem("music-reference-library-v1"); const parsed = raw ? readLibrary(JSON.parse(raw)) : null; if (parsed) setLibrary(parsed); } catch { /* Invalid or blocked storage never prevents the app rendering. */ }
    }
    setHydrated(true);
    return () => { if (messageTimer.current) clearTimeout(messageTimer.current); for (const item of media.current.values()) URL.revokeObjectURL(item.url); };
  }, []);
  useEffect(() => {
    if (!hydrated || referenceSession.current) return;
    try { localStorage.setItem("music-reference-library-v1", JSON.stringify(library)); }
    catch { if (!storageWarning.current) { storageWarning.current = true; notify("Browser storage is unavailable. Changes are kept for this session only."); } }
  }, [library, hydrated, notify]);
  useEffect(() => {
    const onPop = () => { const next = sceneFromUrl(new URL(window.location.href)); if (next) setScene(next); };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  useEffect(() => { if (audio.current) { audio.current.volume = volume; audio.current.muted = muted; audio.current.loop = repeat; } }, [volume, muted, repeat]);

  const go = useCallback((destination: string) => {
    const [kind, ...rest] = destination.split(":");
    if (kind === "video") { patch({ video: true, overlay: null, menu: null }); return; }
    if (kind === "station") { setActiveId(destination); patch({ page: "radio", overlay: "media", menu: null }); return; }
    if (!kind || !isPage(kind)) { notify("That destination is not included in the saved reference collection."); return; }
    const next: Scene = { page: kind, namedProfile: true, guest: scene.guest, category: rest.join(":") || undefined };
    setScene(next);
    window.history.pushState({}, "", sceneUrl(next));
    document.getElementById("music-main")?.scrollTo({ top: 0 });
  }, [scene.guest, patch, notify]);
  const play = useCallback((target: Track | string) => {
    const id = typeof target === "string" ? target : target.id;
    const track = trackById(id);
    if (track?.unavailable) { notify("This track is unavailable in the saved catalog."); return; }
    const element = audio.current;
    element?.pause(); setActiveId(id); setSnapshot(false); updateElapsed(0); updateDuration(0);
    const local = media.current.get(id);
    if (!element || !local) { setRealPlaying(false); patch({ overlay: "media", menu: null }); return; }
    element.src = local.url; element.volume = volume; element.muted = muted; setMediaName(local.name);
    void element.play().catch(() => notify("Playback could not start. Try another supported audio file."));
  }, [muted, volume, notify, patch]);
  const togglePlayback = useCallback(() => {
    if (realPlaying) { audio.current?.pause(); return; }
    play(activeId ?? "album-2");
  }, [realPlaying, activeId, play]);
  const skip = useCallback((direction: number) => {
    const ids = [activeId ?? "album-2", ...queue];
    const index = direction < 0 ? ids.length - 1 : shuffle ? 1 + Math.floor(Math.random() * Math.max(1, queue.length)) : 1;
    const id = ids[index];
    if (id) { setQueue((current) => [...current.filter((value) => value !== id), ...(activeId ? [activeId] : [])]); play(id); }
  }, [activeId, queue, shuffle, play]);
  useEffect(() => {
    const element = audio.current; if (!element) return;
    const time = () => { updateElapsed(element.currentTime); updateDuration(Number.isFinite(element.duration) ? element.duration : 0); };
    const started = () => { setRealPlaying(true); setSnapshot(false); };
    const stopped = () => setRealPlaying(false);
    const failed = () => { setRealPlaying(false); notify("This media could not be decoded. Choose another local file."); };
    const ended = () => { setRealPlaying(false); if (queue.length) skip(1); };
    element.addEventListener("timeupdate", time); element.addEventListener("durationchange", time);
    element.addEventListener("play", started); element.addEventListener("pause", stopped); element.addEventListener("error", failed); element.addEventListener("ended", ended);
    return () => { element.removeEventListener("timeupdate", time); element.removeEventListener("durationchange", time); element.removeEventListener("play", started); element.removeEventListener("pause", stopped); element.removeEventListener("error", failed); element.removeEventListener("ended", ended); };
  }, [notify, queue.length, skip]);
  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if (event.target instanceof Element && event.target.closest("input, textarea, select, button, a, dialog, [contenteditable=true]")) return;
      if (event.code === "Space") { event.preventDefault(); togglePlayback(); }
      if (event.key === "Escape") patch({ expanded: false, panel: null, menu: null, video: false });
      if (event.key.toLowerCase() === "r" && event.shiftKey) patch({ overlay: "reference" });
    };
    window.addEventListener("keydown", keyboard); return () => window.removeEventListener("keydown", keyboard);
  }, [togglePlayback, patch]);
  const loadMedia = useCallback(async (file: File) => {
    if (file.size > 250 * 1024 * 1024) throw new Error("Choose a file smaller than 250 MB.");
    if (!file.type.startsWith("audio/") && !file.type.startsWith("video/") && !/\.(mp3|m4a|wav|ogg|flac|mp4|webm)$/i.test(file.name)) throw new Error("Choose a supported audio or video file.");
    const id = activeId ?? "album-2"; const element = audio.current;
    if (!element) throw new Error("The media player is not ready.");
    const previous = media.current.get(id); if (previous) URL.revokeObjectURL(previous.url);
    const url = URL.createObjectURL(file); media.current.set(id, { url, name: file.name });
    setActiveId(id); setMediaName(file.name); setSnapshot(false); element.src = url;
    try { await element.play(); patch({ overlay: null }); }
    catch { throw new Error("The browser could not play this file. Try MP3, WAV, or another supported format."); }
  }, [activeId, patch]);
  const openMenu = useCallback((menu: Menu, event?: MouseEvent<HTMLElement>, id?: string) => {
    if (id) setMenuTrackId(id);
    if (event) { const r = event.currentTarget.getBoundingClientRect(); setMenuPosition({ x: Math.max(8, Math.min(r.right - 218, window.innerWidth - 226)), y: Math.max(8, Math.min(r.bottom + 5, window.innerHeight - 340)) }); }
    else setMenuPosition(null);
    patch({ menu, overlay: null });
  }, [patch]);
  const favourite = (id: string) => { if (!known.has(id)) return; setLibrary((current) => ({ ...current, favourites: toggle(current.favourites, id) })); };
  const addToLibrary = (id: string) => { if (!known.has(id)) return; setLibrary((current) => ({ ...current, songs: toggle(current.songs, id) })); };
  const pin = (id: string) => { if (!known.has(id)) return; setLibrary((current) => ({ ...current, pinned: toggle(current.pinned, id) })); };
  const value: Controller = { scene, patch, go, library, setLibrary, active: activeId ? trackById(activeId) : undefined, activeId, playing: realPlaying || snapshot, snapshot,
    elapsed, duration, setElapsed: (time) => { if (audio.current && duration > 0) { audio.current.currentTime = Math.max(0, Math.min(duration, time)); updateElapsed(audio.current.currentTime); } },
    volume, setVolume: (value) => updateVolume(Math.max(0, Math.min(1, value))), muted, setMuted: updateMuted,
    shuffle, setShuffle, repeat, setRepeat, queue, setQueue, play, togglePlayback, skip, audio, loadMedia, mediaName,
    favourite, addToLibrary, pin, openMenu, menuTrack: trackById(menuTrackId) ?? allTracks[0]!, menuPosition, message, notify };
  return <Context.Provider value={value}><audio ref={audio} preload="metadata" /><div data-reference-ready={hydrated ? "true" : "false"}>{children}</div></Context.Provider>;
}
