"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type Dispatch, type MouseEvent, type ReactNode, type RefObject, type SetStateAction } from "react";
import { allTracks, capturedQueue, libraryTracks, radioStations, trackById, viralTracks, type Track } from "../lib/music-catalog";
import { isPage, sceneFromUrl, sceneUrl, type Menu, type Scene } from "../lib/music-scenes";

export type Playlist = { id: string; name: string; description: string; tracks: string[]; public: boolean };
export type LibraryState = { version: 1; favourites: string[]; favouriteArtists: string[]; favouriteAlbums: string[]; discouraged: string[]; songs: string[]; pinned: string[]; playlists: Playlist[]; hiddenNav: string[]; locale: "en" | "zh"; restrictions: boolean; cancelled: boolean; musicRating: "Clean" | "Explicit"; tvRating: string; movieRating: string };
const known = new Set(allTracks.map((track) => track.id));
const knownArtists = new Set(allTracks.flatMap(track => track.artist.split(", ")));
const initialLibrary: LibraryState = {
  version: 1, favouriteAlbums: [], favouriteArtists: ["Billie Eilish", "Olivia Rodrigo"], discouraged: [], songs: libraryTracks.map((track) => track.id), favourites: ["library-0", "library-2", "library-7", "album-2"], pinned: [],
  playlists: [{ id: "emotional", name: "Emotional Songs", description: "just in case I wanna cry", tracks: ["album-2", "playlist-cure", "drivers-license"], public: false }],
  hiddenNav: [], locale: "en", restrictions: false, cancelled: false, musicRating: "Clean", tvRating: "G", movieRating: "G",
};
function strings(value: unknown): string[] { return Array.isArray(value) ? [...new Set(value.filter((item): item is string => typeof item === "string" && known.has(item)))].slice(0, 500) : []; }
export function readLibrary(value: unknown): LibraryState | null {
  if (!value || typeof value !== "object" || !("version" in value) || value.version !== 1) return null;
  const row = value as Record<string, unknown>;
  return { version: 1, favouriteAlbums: Array.isArray(row.favouriteAlbums) ? row.favouriteAlbums.filter((name): name is string => typeof name === "string" && allTracks.some(track => track.album === name)) : [], favouriteArtists: Array.isArray(row.favouriteArtists) ? row.favouriteArtists.filter((name): name is string => typeof name === "string" && knownArtists.has(name)) : [], discouraged: strings(row.discouraged), songs: strings(row.songs), favourites: strings(row.favourites), pinned: strings(row.pinned),
    playlists: Array.isArray(row.playlists) ? row.playlists.slice(0, 100).flatMap((item: unknown) => {
      if (!item || typeof item !== "object") return [];
      const p = item as Record<string, unknown>;
      if (typeof p.id !== "string" || typeof p.name !== "string" || !p.name.trim()) return [];
      // Upgrade only the untouched, incorrect seed shipped by the old prototype.
      // User-created/edited playlists are deliberately not rewritten.
      if (p.id === "emotional" && p.name === "Emotional Songs" && p.description === "" && Array.isArray(p.tracks) && p.tracks.join("|") === "album-2|album-3|library-3") {
        return [{ id: "emotional", name: "Emotional Songs", description: "just in case I wanna cry", tracks: ["album-2", "playlist-cure", "drivers-license"], public: p.public === true }];
      }
      return [{ id: p.id.slice(0, 80), name: p.name.slice(0, 100), description: typeof p.description === "string" ? p.description.slice(0, 1000) : "", tracks: strings(p.tracks), public: p.public === true }];
    }) : [],
    hiddenNav: Array.isArray(row.hiddenNav) ? row.hiddenNav.filter((v): v is string => typeof v === "string" && ["library", "artists", "albums", "songs", "videos", "made-for-you"].includes(v)) : [],
    locale: row.locale === "zh" ? "zh" : "en", restrictions: row.restrictions === true, cancelled: row.cancelled === true, musicRating: row.musicRating === "Explicit" ? "Explicit" : "Clean", tvRating: typeof row.tvRating === "string" && ["G","PG","PG13","M18"].includes(row.tvRating) ? row.tvRating : "G", movieRating: typeof row.movieRating === "string" && ["G","PG","PG13","NC16","M18","R21"].includes(row.movieRating) ? row.movieRating : "G" };
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
  favouriteArtist: (name: string) => void; suggestLess: (id: string) => void;
  favourite: (id: string) => void; addToLibrary: (id: string) => void; pin: (id: string) => void;
  openMenu: (menu: Menu, event?: MouseEvent<HTMLElement>, id?: string) => void;
  menuTarget: string; menuTrack: Track; menuKeyboard: boolean; menuPosition: { x: number; y: number } | null;
  message: string; notify: (message: string) => void;
};
const Context = createContext<Controller | null>(null);
export function useMusic(): Controller { const value = useContext(Context); if (!value) throw new Error("Music controls require MusicProvider"); return value; }

export function MusicProvider({ initialScene, children }: { initialScene: Scene; children: ReactNode }) {
  const [scene, setScene] = useState(initialScene);
  const referenceSession = useRef(Boolean(initialScene.source));
  const [library, setLibrary] = useState<LibraryState>(() => ({ ...initialLibrary,
    discouraged: initialScene.page === "artist" && initialScene.filled ? allTracks.filter(track => track.artist.split(", ").includes("Olivia Rodrigo")).map(track => track.id) : [...initialLibrary.discouraged],
    favouriteArtists: initialScene.source && initialScene.page === "artist" ? [] : [...initialLibrary.favouriteArtists],
    songs: initialScene.librarySeed === "song" ? ["album-2"] : initialScene.librarySeed || initialScene.empty && initialScene.page === "library" ? [] : [...initialLibrary.songs],
    favourites: initialScene.favourite === false ? initialLibrary.favourites.filter(id => id !== "album-2") : [...initialLibrary.favourites], playlists: initialScene.librarySeed === "empty" || initialScene.librarySeed === "song" ? [] : initialScene.librarySeed === "playlist" ? [{ id: "emotional", name: "Emotional Songs", description: "just in case I wanna cry", tracks: ["album-2"], public: true }] : initialLibrary.playlists.map((item) => ({ ...item, tracks: [...item.tracks, ...(initialScene.page === "playlist" && initialScene.filled ? ["vampire"] : [])] })),
    pinned: initialScene.pinned ? ["album-2"] : [], hiddenNav: initialScene.hiddenNav ?? [], locale: initialScene.locale ?? "en", restrictions: initialScene.restrictions ?? false, cancelled: initialScene.cancelled ?? false }));
  const [hydrated, setHydrated] = useState(false);
  const [activeId, setActiveId] = useState(initialScene.track);
  const [realPlaying, setRealPlaying] = useState(false);
  const [snapshot, setSnapshot] = useState(Boolean(initialScene.snapshotPlaying));
  const [elapsed, updateElapsed] = useState(initialScene.elapsed ?? 0);
  const [demoRunning, setDemoRunning] = useState(false);
  const [duration, updateDuration] = useState(0);
  const [volume, updateVolume] = useState(initialScene.volume ?? .5);
  const [muted, updateMuted] = useState(false);
  const [shuffle, setShuffle] = useState(Boolean(initialScene.shuffle));
  const [repeat, setRepeat] = useState(Boolean(initialScene.repeat));
  const [queue, setQueue] = useState<string[]>(initialScene.queueEmpty ? [] : (initialScene.queuePreset ? capturedQueue : viralTracks.slice(1)).map((track) => track.id));
  const [menuTrackId, setMenuTrackId] = useState(initialScene.page === "artist" || initialScene.menu === "artist" ? "Olivia Rodrigo" : initialScene.track ?? "album-2");
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [menuKeyboard, setMenuKeyboard] = useState(false);
  const [message, setMessage] = useState("");
  const [mediaName, setMediaName] = useState("");
  const messageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const media = useRef(new Map<string, { url: string; name: string }>());
  const history = useRef<string[]>([]);
  const storageWarning = useRef(false);
  const previewNoticeShown = useRef(false);
  const notify = useCallback((text: string) => { if (messageTimer.current) clearTimeout(messageTimer.current); setMessage(text); messageTimer.current = setTimeout(() => setMessage(""), 4500); }, []);
  const patch = useCallback((changes: Partial<Scene>) => setScene((current) => ({ ...current, source: undefined, scroll: undefined, ...changes })), []);
  useEffect(() => {
    if (window.location.pathname === "/") window.history.replaceState(window.history.state, "", sceneUrl(scene));
  }, [scene.page, scene.query, scene.scope, scene.sort, scene.sortField, scene.selectedArtist]);

  useEffect(() => {
    if (!referenceSession.current) {
      try { const raw = localStorage.getItem("music-reference-library-v1"); const parsed = raw ? readLibrary(JSON.parse(raw)) : null; if (parsed) setLibrary(parsed); } catch { /* Invalid or blocked storage never prevents rendering. */ }
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
    if (kind === "station") {
      const id = destination.replace(":", "-");
      if (!radioStations.some(station => station.id === id)) { notify("This station is not in the saved catalog."); return; }
      audio.current?.pause(); setActiveId(id); setSnapshot(true); setDemoRunning(false);
      patch({ page: "radio", selectedTrack: undefined, overlay: null, menu: null });
      if (!referenceSession.current && !previewNoticeShown.current) { previewNoticeShown.current = true; notify("Silent radio UI preview. Press Shift+M to open your own local media."); }
      return;
    }
    if (!kind || !isPage(kind)) { notify("That destination is not included in the saved reference collection."); return; }
    const next: Scene = { page: kind, namedProfile: true, guest: scene.guest, category: rest.join(":") || undefined };
    setScene(next);
    window.history.pushState({}, "", sceneUrl(next));
    document.getElementById("music-main")?.scrollTo({ top: 0 });
  }, [scene.guest, patch, notify]);
  const play = useCallback((target: Track | string, remember = true) => {
    const id = typeof target === "string" ? target : target.id;
    const track = trackById(id);
    if (track?.explicit && library.restrictions && library.musicRating === "Clean") { notify("This track is excluded by the local clean-content setting."); return; }
    if (track?.unavailable) { notify("This track is unavailable in the saved catalog."); return; }
    const element = audio.current;
    if (remember && activeId && activeId !== id) history.current = [...history.current, activeId].slice(-100);
    element?.pause(); setDemoRunning(false); setActiveId(id); setSnapshot(false); updateElapsed(0); updateDuration(0);
    const local = media.current.get(id);
    if (!element || !local) {
      setRealPlaying(false); setSnapshot(true); setDemoRunning(true);
      patch({ overlay: null, menu: null, lyricIndex: undefined, playerArt: undefined });
      if (!referenceSession.current && !previewNoticeShown.current) {
        previewNoticeShown.current = true;
        notify("Silent UI playback preview. Press Shift+M to play a file you own; nothing is streamed or uploaded.");
      }
      return;
    }
    element.src = local.url; element.volume = volume; element.muted = muted; setMediaName(local.name);
    void element.play().catch(() => notify("Playback could not start. Try another supported audio file."));
  }, [muted, volume, notify, patch, activeId, library.restrictions, library.musicRating]);
  const togglePlayback = useCallback(() => {
    const element = audio.current;
    if (realPlaying || snapshot) { element?.pause(); setSnapshot(false); setDemoRunning(false); return; }
    const local = activeId ? media.current.get(activeId) : undefined;
    if (element && local && element.getAttribute("src") === local.url) {
      void element.play().catch(() => notify("Playback could not resume. Try the Play button again."));
      return;
    }
    if (activeId && !local) { patch({ lyricIndex: undefined }); setSnapshot(true); setDemoRunning(true); return; }
    play(activeId ?? "album-2");
  }, [realPlaying, snapshot, activeId, play, notify]);
  const skip = useCallback((direction: number) => {
    if (direction < 0) {
      const previous = history.current.pop();
      if (previous) { setQueue(current => [...(activeId ? [activeId] : []), ...current.filter(id => id !== previous && id !== activeId)]); play(previous, false); }
      else { if (audio.current?.src && media.current.has(activeId ?? "")) audio.current.currentTime = 0; updateElapsed(0); }
      return;
    }
    const next = queue[shuffle ? Math.floor(Math.random() * queue.length) : 0];
    if (next) { setQueue(current => current.filter(id => id !== next)); play(next); }
  }, [activeId, queue, shuffle, play]);
  const displayDuration = duration || (activeId === "album-2" ? 210 : trackById(activeId ?? "")?.duration ?? 0);
  useEffect(() => {
    if (!demoRunning || !displayDuration) return;
    const timer = window.setInterval(() => updateElapsed(value => Math.min(displayDuration, value + 0.25)), 250);
    return () => window.clearInterval(timer);
  }, [demoRunning, displayDuration]);
  useEffect(() => {
    if (!demoRunning || !displayDuration || elapsed < displayDuration) return;
    if (repeat) { updateElapsed(0); return; }
    setDemoRunning(false); setSnapshot(false);
    if (queue.length) skip(1);
  }, [demoRunning, elapsed, displayDuration, repeat, queue.length, skip]);
  useEffect(() => {
    const element = audio.current; if (!element) return;
    const time = () => { updateElapsed(element.currentTime); updateDuration(Number.isFinite(element.duration) ? element.duration : 0); };
    const started = () => { setRealPlaying(true); setSnapshot(false); };
    const stopped = () => setRealPlaying(false);
    const failed = () => { setRealPlaying(false); notify("This media could not be decoded. Choose another local file."); };
    const ended = () => {
      setRealPlaying(false);
      if (queue.length) skip(1);
      else if (scene.autoplay) {
        const next = allTracks.find(track => track.id !== activeId && !track.unavailable && !library.discouraged.includes(track.id) && (!library.restrictions || library.musicRating === "Explicit" || !track.explicit));
        if (next) play(next);
      }
    };
    element.addEventListener("timeupdate", time); element.addEventListener("durationchange", time);
    element.addEventListener("play", started); element.addEventListener("pause", stopped); element.addEventListener("error", failed); element.addEventListener("ended", ended);
    return () => { element.removeEventListener("timeupdate", time); element.removeEventListener("durationchange", time); element.removeEventListener("play", started); element.removeEventListener("pause", stopped); element.removeEventListener("error", failed); element.removeEventListener("ended", ended); };
  }, [notify, queue.length, skip, scene.autoplay, activeId, play, library.discouraged, library.restrictions, library.musicRating]);
  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const element = event.target instanceof Element ? event.target : null;
      if (event.key === "Escape" && !document.querySelector("dialog[open]")) {
        if (document.querySelector(".menu-layer")) patch({ menu: null });
        else if (document.querySelector('.volume-control[data-open="true"]')) patch({ volumeOpen: false });
        else patch({ expanded: false, panel: null, video: false, volumeOpen: false });
        return;
      }
      if (!element?.closest("input, textarea, select, [contenteditable=true]") && event.shiftKey) {
        if (event.key.toLowerCase() === "r") { event.preventDefault(); patch({ overlay: "reference" }); return; }
        if (event.key.toLowerCase() === "m") { event.preventDefault(); patch({ overlay: "media" }); return; }
      }
      if (element?.closest("input, textarea, select, button, a, dialog, [contenteditable=true]")) return;
      if (event.code === "Space") { event.preventDefault(); togglePlayback(); }
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
    setActiveId(id); setMediaName(file.name); setDemoRunning(false); setSnapshot(false); element.src = url;
    try { await element.play(); patch({ overlay: null }); }
    catch { throw new Error("The browser could not play this file. Try MP3, WAV, or another supported format."); }
  }, [activeId, patch]);
  const openMenu = useCallback((menu: Menu, event?: MouseEvent<HTMLElement>, id?: string) => {
    if (id) setMenuTrackId(id);
    setMenuKeyboard(event?.type === "click" && event.detail === 0);
    if (event) {
      const r = event.currentTarget.getBoundingClientRect();
      const stationCard = menu === "station" && event.currentTarget.closest(".station-card");
      const albumTools = (menu === "album" || menu === "share") && event.currentTarget.closest("[data-album-tools]");
      const anchor = stationCard ? { x: r.left + 10, y: r.top + 7 }
        : albumTools && menu === "share" ? { x: innerWidth - 240, y: r.bottom - 1 }
        : albumTools ? { x: r.right - 186, y: r.top + 14 }
        : { x: r.right - 176, y: r.bottom + 5 };
      setMenuPosition(anchor);
    }
    else setMenuPosition(null);
    patch({ menu, overlay: null, ...(menu === "station" && id ? { selectedTrack: id } : {}) });
  }, [patch]);
  const favouriteArtist = (name: string) => { if (!knownArtists.has(name)) { notify("This artist is not in the saved catalog."); return; } setLibrary(current => ({ ...current, favouriteArtists: toggle(current.favouriteArtists, name) })); };
  const suggestLess = (id: string) => { if (!known.has(id)) return; setLibrary(current => ({ ...current, discouraged: toggle(current.discouraged, id) })); notify(library.discouraged.includes(id) ? "Song restored to local recommendations." : "This song is hidden from local recommendations."); };
  const favourite = (id: string) => { if (!known.has(id)) return; setLibrary((current) => ({ ...current, favourites: toggle(current.favourites, id) })); };
  const addToLibrary = (id: string) => { if (!known.has(id)) return; setLibrary((current) => ({ ...current, songs: toggle(current.songs, id) })); };
  const pin = (id: string) => { if (!known.has(id)) return; setLibrary((current) => ({ ...current, pinned: toggle(current.pinned, id) })); };
  const value: Controller = { scene, patch, go, library, setLibrary, active: activeId ? trackById(activeId) : undefined, activeId, playing: realPlaying || snapshot, snapshot,
    elapsed, duration: displayDuration, setElapsed: (time) => {
      const next = Math.max(0, Math.min(displayDuration, time));
      if (audio.current && duration > 0 && media.current.has(activeId ?? "")) audio.current.currentTime = next;
      updateElapsed(next); patch({ lyricIndex: undefined });
    },
    volume, setVolume: (value) => updateVolume(Math.max(0, Math.min(1, value))), muted, setMuted: updateMuted,
    shuffle, setShuffle, repeat, setRepeat, queue, setQueue, play, togglePlayback, skip, audio, loadMedia, mediaName,
    favouriteArtist, suggestLess, favourite, addToLibrary, pin, openMenu, menuTarget: menuTrackId, menuTrack: trackById(menuTrackId) ?? allTracks[0]!, menuPosition, menuKeyboard, message, notify };
  return <Context.Provider value={value}><audio ref={audio} preload="metadata" /><div data-reference-ready={hydrated ? "true" : "false"}>{children}</div></Context.Provider>;
}
