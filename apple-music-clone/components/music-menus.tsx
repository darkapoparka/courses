"use client";

import { useLayoutEffect, useRef, useState, type ReactNode, type KeyboardEvent } from "react";
import { albumTitle, allTracks } from "../lib/music-catalog";
import { sceneUrl } from "../lib/music-scenes";
import { useMusic } from "./music-context";
import { SystemShareIcon } from "./music-share-icons";
import { Glyph, type GlyphName } from "./music-primitives";

export function MusicMenus() {
  const m = useMusic();
  const kind = m.scene.menu;
  const menu = useRef<HTMLDivElement>(null);
  const flyout = useRef<HTMLDivElement>(null);
  const [submenu, setSubmenu] = useState(false);
  const [copied, setCopied] = useState<"link" | "embed" | null>(m.scene.menu === "album" && m.scene.filled ? "link" : null);
  const [location, setLocation] = useState(m.scene.location ?? "");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [flyoutPosition, setFlyoutPosition] = useState({ x: 0, y: 0 });
  const close = () => m.patch({ menu: null });
  useLayoutEffect(() => {
    if (!kind || !menu.current) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const captured = m.scene.source;
    const fallback = kind === "share" && captured?.startsWith("56c2e39a") ? { x: 1200, y: 38 } : kind === "sort" ? { x: 1243, y: 14 } : kind === "artist" ? { x: 1201, y: captured?.startsWith("f24fda77") ? 302 : 276 } : kind === "profile" ? { x: 70, y: innerHeight - 162 } : kind === "station" && captured?.startsWith("37575452") ? { x: 618, y: 288 } : kind === "album" || kind === "share" ? { x: 1243, y: 22 } : m.scene.expanded ? { x: 592, y: 328 } : m.scene.page === "songs" ? { x: 625, y: 287 } : { x: 286, y: 186 };
    const anchor = m.menuPosition ?? fallback;
    const bounds = menu.current.getBoundingClientRect();
    setPosition({ x: Math.max(8, Math.min(anchor.x, innerWidth - bounds.width - 8)), y: Math.max(8, Math.min(anchor.y, innerHeight - bounds.height - 8)) });
    setSubmenu(Boolean(captured?.startsWith("0c6da10e")));
    setCopied(kind === "album" && m.scene.filled ? "link" : null);
    const focusTarget = menu.current.querySelector<HTMLElement>("input") ?? (m.menuKeyboard ? menu.current.querySelector<HTMLElement>("button") : menu.current);
    focusTarget?.focus({ preventScroll: true });
    return () => previous?.focus({ preventScroll: true });
  }, [kind, m.menuPosition, m.menuKeyboard]);
  useLayoutEffect(() => {
    if (!submenu || !flyout.current || !menu.current) return;
    const trigger = menu.current.querySelector<HTMLElement>("[data-playlist-trigger]");
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const width = flyout.current.offsetWidth;
    const height = flyout.current.offsetHeight;
    setFlyoutPosition({ x: rect.right + width < innerWidth - 8 ? rect.right + 1 : Math.max(8, rect.left - width - 1), y: Math.max(8, Math.min(rect.top, innerHeight - height - 8)) });
  }, [submenu, position]);
  if (!kind || (m.scene.page === "concerts" && (kind === "location" || kind === "genres"))) return null;
  const track = m.menuTrack;
  const artist = kind === "artist" ? m.menuTarget : track.artist;
  const ids = kind === "artist" ? allTracks.filter(t => t.artist === artist).map(t => t.id) : kind === "album" && m.scene.page === "playlist" ? m.library.playlists.find(p => p.id === (m.scene.category ?? "emotional"))?.tracks ?? [] : kind === "album" ? allTracks.filter(t => t.album === (m.scene.category ?? albumTitle)).map(t => t.id) : [track.id];
  const inLibrary = ids.length > 0 && ids.every(id => m.library.songs.includes(id));
  const addLibrary = () => m.setLibrary(data => ({ ...data, songs: inLibrary ? data.songs.filter(id => !ids.includes(id)) : [...new Set([...data.songs, ...ids])] }));
  const albumName = m.scene.category ?? albumTitle;
  const favourite = kind === "album" && m.scene.page === "album" ? m.library.favouriteAlbums.includes(albumName) : kind === "artist" ? m.library.favouriteArtists.includes(artist) : m.library.favourites.includes(track.id);
  const artistSuggestedLess = kind === "artist" && ids.length > 0 && ids.every(id => m.library.discouraged.includes(id));
  const favouriteAction = () => kind === "album" && m.scene.page === "album" ? m.setLibrary(data => ({ ...data, favouriteAlbums: favourite ? data.favouriteAlbums.filter(name => name !== albumName) : [...data.favouriteAlbums, albumName] })) : kind === "artist" ? m.favouriteArtist(artist) : m.favourite(track.id);
  const link = () => new URL(sceneUrl(kind === "artist" ? { page: "artist", category: artist } : kind === "station" ? { page: "radio" } : kind === "album" || kind === "share" ? { page: "album", category: albumName } : { page: "album", category: track.album, track: track.id }), window.location.origin).href;
  const copy = async (embed = false) => {
    try { await navigator.clipboard.writeText(embed ? `<iframe src="${link()}" title="Music reference preview" width="660" height="450"></iframe>` : link()); setCopied(embed ? "embed" : "link"); }
    catch { m.notify("Clipboard access was not allowed. Copy the page address from the address bar."); }
  };
  const share = () => { if (navigator.share) void navigator.share({ title: kind === "artist" ? artist : track.title, url: link() }).catch(e => { if (e?.name !== "AbortError") m.notify("Sharing could not be opened."); }); else void copy(); };
  const capturedSystemShare = kind === "share" && m.scene.page === "album";
  const systemShareAction = (label: string, icon: GlyphName, run: () => void) => <button type="button" role="menuitem" className="system-share-action" key={label} onClick={() => { run(); close(); }}><SystemShareIcon target={label} /><span>{label}</span></button>;
  // State labels change after mutation; stable keys retain keyboard focus.
  const actionKey = (label: string) => {
    const groups = [["Add to Library", "Delete from Library"], ["Favourite", "Undo Favourite"], ["Copy Link", "Link Copied"], ["Copy Embed Code", "Embed Code Copied"], ["Suggest Less", "Undo Suggest Less"]];
    return groups.find(group => group.includes(label))?.[0] ?? label;
  };
  const action = (label: string, icon: GlyphName | null, run: () => void, checked?: boolean, keepOpen = false) => <button type="button" role={checked === undefined ? "menuitem" : "menuitemradio"} aria-checked={checked} key={actionKey(label)} onClick={() => { run(); if (!keepOpen) close(); }}><span>{label}</span>{checked !== undefined ? checked && <Glyph name="check" size={15} /> : icon && <Glyph name={icon} size={16} />}</button>;
  const playlistAction = <button type="button" role="menuitem" data-playlist-trigger aria-haspopup="menu" aria-expanded={submenu} onMouseEnter={() => setSubmenu(true)} onClick={() => setSubmenu(true)} onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); setSubmenu(true); requestAnimationFrame(() => flyout.current?.querySelector<HTMLButtonElement>("button")?.focus()); } }}><span>Add to Playlist</span><Glyph name="playlist" size={16} /></button>;
  const queueAction = (next: boolean) => m.setQueue(current => next ? [...ids, ...current.filter(id => !ids.includes(id))] : [...current.filter(id => !ids.includes(id)), ...ids]);
  const stationAction = () => { m.setQueue(allTracks.filter(t => t.artist === artist && t.id !== track.id && !t.unavailable).map(t => t.id)); m.play(track); };
  let content: ReactNode;
  if (kind === "sort") {
    content = <>{action("Title", null, () => m.patch({ sortField: "title" }), m.scene.sortField !== "recent")}{action("Recently Added", null, () => m.patch({ sortField: "recent" }), m.scene.sortField === "recent")}<hr />{action("Ascending", null, () => m.patch({ sort: "ascending" }), m.scene.sort !== "descending")}{action("Descending", null, () => m.patch({ sort: "descending" }), m.scene.sort === "descending")}</>;
  } else if (kind === "profile") {
    content = <>{action("Help", "help", () => window.open("https://support.apple.com/music", "_blank", "noopener,noreferrer"))}{action("Settings", "settings", () => m.go("settings"))}{action("Transfer Music", "transfer", () => m.notify("Transfer Music is represented locally; no account transfer is performed."))}{action("Sign Out", null, () => { m.audio.current?.pause(); m.patch({ guest: true, namedProfile: false }); })}</>;
  } else if (kind === "location") {
    const matches = ["Chicago, IL", "Singapore", "Austin, TX", "Nashville, TN", "New York, NY", "London, United Kingdom"].filter(city => city.toLowerCase().includes(location.toLowerCase()));
    content = <><label className="menu-location-search"><Glyph name="search" size={15} /><input aria-label="Find a city" value={location} placeholder="Search city or postcode" onChange={event => setLocation(event.target.value)} /></label>{matches.map(city => action(city, "location", () => m.patch({ location: city, dateRange: undefined, genre: undefined })))}{!matches.length && <p className="menu-caption">No saved locations match your search.</p>}</>;
  } else if (kind === "genres") {
    content = <>{["All Genres", "Alternative", "Country", "Dance", "Hip-Hop/Rap", "Pop", "R&B/Soul", "Rock"].map(genre => action(genre, null, () => m.patch({ genre: genre === "All Genres" ? undefined : genre }), (m.scene.genre ?? "All Genres") === genre))}</>;
  } else if (kind === "station") {
    content = <>{action("View Schedule", "calendar", () => m.go("schedule"))}{action("Share", "share", share)}{action(copied === "link" ? "Link Copied" : "Copy Link", copied === "link" ? null : "link", () => { void copy(); }, undefined, true)}</>;
  } else if (kind === "share") {
    content = capturedSystemShare ? <><div className="system-share-url"><span className="system-share-page"><SystemShareIcon target="Page" /></span><strong>https://music.apple.com/sg/album/you-seem-pretty-sad-for-a-girl-s…</strong></div>{systemShareAction("Add to Reading List", "link", () => m.notify("Reading List is a system share destination. No browser reading list was changed."))}{systemShareAction("AirDrop", "radio", share)}{systemShareAction("Mail", "mail", share)}{systemShareAction("Messages", "lyrics", share)}{systemShareAction("Notes", "playlist", () => m.notify("Share target previewed."))}{systemShareAction("Open in News", "external", share)}{systemShareAction("Reminders", "check", () => m.notify("Share target previewed."))}{systemShareAction("Freeform", "new", () => m.notify("Share target previewed."))}{systemShareAction("Journal", "info", () => m.notify("Share target previewed."))}<hr />{systemShareAction("Copy", "link", () => { void copy(); })}{systemShareAction("Edit Extensions…", "more", () => m.notify("System share extensions are managed by your browser or OS."))}</> : <>{action("Share", "share", share)}{action("Copy Link", "link", () => { void copy(); })}{action(copied === "embed" ? "Embed Code Copied" : "Copy Embed Code", copied === "embed" ? null : "code", () => { void copy(true); }, undefined, true)}</>;
  } else if (kind === "track" && m.scene.page === "songs") {
    content = <>{action(m.library.pinned.includes(track.id) ? "Unpin Song" : "Pin Song", null, () => m.pin(track.id))}{action("Delete from Library", null, addLibrary)}{playlistAction}{action("Play Next", "play-next", () => queueAction(true))}{action("Play Last", "play-last", () => queueAction(false))}{action("Create Station", "radio", stationAction)}{action(favourite ? "Undo Favourite" : "Favourite", favourite ? "star-slash" : "star", favouriteAction)}{action("View Credits", "info", () => m.go(`credits:${track.id}`))}</>;
  } else {
    content = <>{kind === "track" && inLibrary && action(m.library.pinned.includes(track.id) ? "Unpin Song" : "Pin Song", null, () => m.pin(track.id))}{action(inLibrary ? "Delete from Library" : "Add to Library", inLibrary ? "close" : "plus", addLibrary, undefined, true)}{playlistAction}{action("Play Next", "play-next", () => queueAction(true))}{action("Play Last", "play-last", () => queueAction(false))}{kind !== "album" && action("Create Station", "radio", stationAction)}{!(kind === "artist" && artistSuggestedLess) && action(favourite ? "Undo Favourite" : "Favourite", favourite ? "star-slash" : "star", favouriteAction)}{kind !== "track" && action(artistSuggestedLess ? "Undo Suggest Less" : "Suggest Less", "thumb-down", () => ids.forEach(m.suggestLess), undefined, true)}{kind !== "album" && action("View Credits", "info", () => m.go(`credits:${track.id}`))}{action("Share", "share", share)}{action(copied === "link" ? "Link Copied" : "Copy Link", copied === "link" ? null : "link", () => { void copy(); }, undefined, true)}{action(copied === "embed" ? "Embed Code Copied" : "Copy Embed Code", copied === "embed" ? null : "code", () => { void copy(true); }, undefined, true)}</>;
  }
  const keyboard = (event: KeyboardEvent<HTMLDivElement>, child = false) => {
    if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); if (child) { setSubmenu(false); menu.current?.querySelector<HTMLElement>("[data-playlist-trigger]")?.focus(); } else close(); return; }
    if (event.key === "ArrowLeft" && child) { event.preventDefault(); setSubmenu(false); menu.current?.querySelector<HTMLElement>("[data-playlist-trigger]")?.focus(); return; }
    if (event.target instanceof HTMLInputElement) return;
    if (event.key === "Tab") { close(); return; }
    const host = child ? flyout.current : menu.current;
    const items = Array.from(host?.querySelectorAll<HTMLButtonElement>(":scope > button:not(:disabled)") ?? []);
    if (!items.length) return;
    const current = items.indexOf(document.activeElement as HTMLButtonElement);
    const index = event.key === "ArrowDown" ? (current + 1) % items.length : event.key === "ArrowUp" ? (current < 0 ? items.length - 1 : (current - 1 + items.length) % items.length) : event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : -1;
    if (index >= 0) { event.preventDefault(); items[index]?.focus(); }
  };
  return <div className="menu-layer">
    <button type="button" className="menu-dismiss" aria-label="Dismiss menu" tabIndex={-1} onClick={close} />
    <div ref={menu} className={`context-menu faithful-menu menu-${kind} ${capturedSystemShare ? "system-share-menu" : ""}`} role="menu" tabIndex={-1} data-copy-state={copied ?? undefined} aria-label={`${kind} actions`} style={{ left: position.x, top: position.y }} onKeyDown={event => keyboard(event)}>{content}</div>
    {submenu && <div ref={flyout} className="context-menu faithful-menu playlist-flyout" role="menu" aria-label="Add to playlist" style={{ left: flyoutPosition.x, top: flyoutPosition.y }} onKeyDown={event => keyboard(event, true)}>
      {action("New Playlist…", "plus", () => m.patch({ overlay: "new-playlist", menu: null, playlistSeed: ids }))}
      {m.library.playlists.map(playlist => action(playlist.name, null, () => {
        m.setLibrary(data => ({ ...data, playlists: data.playlists.map(p => p.id === playlist.id ? { ...p, tracks: [...new Set([...p.tracks, ...ids])] } : p) }));
        m.notify(`Added to ${playlist.name}.`);
      }))}
    </div>}
  </div>;
}
