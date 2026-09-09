"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMusic } from "./music-context";
import { Glyph, type GlyphName } from "./music-primitives";

export function MusicMenus() {
  const m = useMusic();
  const menu = useRef<HTMLDivElement>(null);
  const [submenu, setSubmenu] = useState("");
  const [location, setLocation] = useState(m.scene.location ?? "");
  const kind = m.scene.menu;
  useEffect(() => {
    if (!kind) return;
    setSubmenu("");
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = requestAnimationFrame(() => menu.current?.querySelector<HTMLElement>("input, button")?.focus());
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { event.preventDefault(); m.patch({ menu: null }); } };
    window.addEventListener("keydown", close);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("keydown", close); previous?.focus(); };
  }, [kind, m.patch]);
  if (!kind) return null;
  const close = () => m.patch({ menu: null });
  const track = m.menuTrack;
  const action = (label: string, icon: GlyphName, run: () => void, options: { checked?: boolean; keep?: boolean; danger?: boolean } = {}) => <button type="button" role={options.checked === undefined ? "menuitem" : "menuitemcheckbox"} aria-checked={options.checked} className={options.danger ? "destructive" : ""} key={label} onClick={() => { run(); if (!options.keep) close(); }}><span>{label}</span><Glyph name={icon} size={15} /></button>;
  const copyLink = async () => {
    const url = new URL("/", window.location.origin);
    url.searchParams.set("view", kind === "album" ? "album" : "album");
    url.searchParams.set("track", track.id);
    try { await navigator.clipboard.writeText(url.href); m.notify("Link copied."); }
    catch { m.notify("The browser did not allow clipboard access. Copy the page address from your address bar."); }
    close();
  };
  let content: ReactNode;
  if (kind === "location") {
    const matches = ["Chicago, IL", "Singapore", "Austin, TX", "Nashville, TN", "New York, NY", "London, United Kingdom"].filter(city => city.toLowerCase().includes(location.toLowerCase()));
    content = <><label className="menu-location-search"><Glyph name="search" size={15} /><input aria-label="Find a city" value={location} placeholder="Search city or postcode" onChange={event => setLocation(event.target.value)} /></label><p className="menu-caption">Locations in the reference preview</p>{matches.map(city => action(city, "location", () => m.patch({ location: city, dateRange: undefined, genre: undefined })))}{!matches.length && <p className="menu-caption">No saved locations match your search.</p>}</>;
  } else if (kind === "genres") {
    content = <>{["All Genres", "Alternative", "Country", "Dance", "Hip-Hop/Rap", "Pop", "R&B/Soul", "Rock"].map(genre => action(genre, m.scene.genre === genre ? "check" : "song", () => m.patch({ genre: genre === "All Genres" ? undefined : genre }), { checked: (m.scene.genre ?? "All Genres") === genre }))}</>;
  } else if (kind === "sort") {
    content = <>{action("Ascending", "sort", () => m.patch({ sort: "ascending" }), { checked: m.scene.sort !== "descending" })}{action("Descending", "sort", () => m.patch({ sort: "descending" }), { checked: m.scene.sort === "descending" })}</>;
  } else if (kind === "profile") {
    content = <>{action("Settings", "person", () => m.go("settings"))}{action("Reference screens and flows", "new", () => m.patch({ overlay: "reference", menu: null }), { keep: true })}<hr />{action("Sign Out", "external", () => { m.patch({ guest: true, namedProfile: false }); m.notify("Signed out of the local preview. No Apple account was connected."); })}</>;
  } else if (kind === "station") {
    content = <>{action("Play", "play", () => m.go("station:1"), { keep: true })}{action("View Full Schedule", "calendar", () => m.go("schedule"))}{action("Copy Link", "share", () => { void copyLink(); })}</>;
  } else if (kind === "share" || submenu === "share") {
    content = <>{action("Copy Link", "share", () => { void copyLink(); })}{action("Share…", "external", () => {
      const data = { title: track.title, url: window.location.href };
      if (navigator.share) void navigator.share(data).catch(error => { if (!(error instanceof DOMException && error.name === "AbortError")) m.notify("Sharing could not be opened. Use Copy Link instead."); });
      else void copyLink();
    })}</>;
  } else if (submenu === "playlist") {
    content = <>{action("‹ Back", "back", () => setSubmenu(""), { keep: true })}{m.library.playlists.map(playlist => action(playlist.name, "playlist", () => {
      m.setLibrary(data => ({ ...data, playlists: data.playlists.map(item => item.id === playlist.id ? { ...item, tracks: [...new Set([...item.tracks, track.id])] } : item) }));
      m.notify(`Added to ${playlist.name}.`);
    }))}<hr />{action("New Playlist…", "plus", () => m.patch({ overlay: "new-playlist", menu: null }), { keep: true })}</>;
  } else {
    content = <>{action(m.library.favourites.includes(track.id) ? "Undo Favourite" : "Favourite", "star", () => m.favourite(track.id))}{action(m.library.songs.includes(track.id) ? "Remove from Library" : "Add to Library", m.library.songs.includes(track.id) ? "close" : "plus", () => m.addToLibrary(track.id))}{action("Add to Playlist", "chevron", () => setSubmenu("playlist"), { keep: true })}{action(m.library.pinned.includes(track.id) ? "Unpin" : "Pin", "pin", () => m.pin(track.id))}<hr />{action("Play Next", "next", () => { m.setQueue(ids => [track.id, ...ids.filter(id => id !== track.id)]); m.notify("Added to play next."); })}{action("Play Last", "queue", () => { m.setQueue(ids => [...ids.filter(id => id !== track.id), track.id]); m.notify("Added to the end of the queue."); })}<hr />{action("Go to Album", "albums", () => m.go("album"))}{action("Go to Artist", "artist", () => m.go(`artist:${track.artist}`))}{action("View Credits", "song", () => m.go("credits"))}{action("Share", "chevron", () => setSubmenu("share"), { keep: true })}</>;
  }
  const fallback = kind === "profile" ? { left: 22, bottom: 66 } : kind === "location" || kind === "genres" ? { left: 286, top: m.scene.location ? 128 : 186 } : kind === "sort" ? { right: 20, top: 39 } : m.scene.expanded ? { left: "min(580px, calc(100vw - 240px))", top: "min(460px, calc(100dvh - 420px))" } : { right: 44, top: 60 };
  return <div className="menu-layer"><button type="button" className="menu-dismiss" aria-label="Dismiss menu" tabIndex={-1} onClick={close} /><div ref={menu} className={`context-menu menu-${kind}`} role="menu" aria-label={`${kind} actions`} style={m.menuPosition ? { left: m.menuPosition.x, top: m.menuPosition.y } : fallback} onKeyDown={event => {
    if (event.target instanceof HTMLInputElement) return;
    const items = Array.from(menu.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? []);
    const current = items.indexOf(document.activeElement as HTMLButtonElement);
    let next = current;
    if (event.key === "ArrowDown") next = (current + 1) % items.length;
    else if (event.key === "ArrowUp") next = (current - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else if (event.key === "Tab") { close(); return; }
    else return;
    event.preventDefault(); items[next]?.focus();
  }}>{content}</div></div>;
}
