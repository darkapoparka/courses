"use client";

import { useEffect, useRef, useState } from "react";
import { albumArt, albumTitle, allTracks, categories, zhCategories, crop, libraryCovers, libraryTracks, type Artwork } from "../lib/music-catalog";
import { useMusic } from "./music-context";
import { Art, EmptyState, Footer, Glyph, IconButton, Section } from "./music-primitives";
import { Rail } from "./music-rail";
import { CardTile, SongRow } from "./music-browse";

const artists = ["Olivia Rodrigo", "Olivia Dean", "Olivia Ong", "OLIVIA", "OLIVIA", "Olivia Belli", "Olivia O’Brien", "Olivia Newton-John"].map((name, i) => ({ id: `artist-${i}`, name, art: crop("e70094e3", [286, 428, 570, 712, 854, 996, 1138, 1280][i]!, 422, 122, 122) }));
const defaultRecents = ["Ariana Grande", "Billie Eilish"];
export function SearchView() {
  const m = useMusic();
  const source = useRef(m.scene.source);
  const [focused, setFocused] = useState(Boolean(m.scene.filled));
  const [recents, setRecents] = useState(() => m.library.locale === "zh" ? ["1989 (Taylor’s Version)", ...defaultRecents] : defaultRecents);
  const [ready, setReady] = useState(false);
  const [activeOption, setActiveOption] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const query = m.scene.query ?? "";
  const scope = m.scene.scope ?? "catalog";
  const isOlivia = query.trim().toLowerCase().startsWith("olivia");
  const results = allTracks.filter(track => (scope !== "library" || m.library.songs.includes(track.id)) && (!m.library.restrictions || m.library.musicRating === "Explicit" || !track.explicit) && `${track.title} ${track.artist} ${track.album}`.toLowerCase().includes(query.trim().toLowerCase()));
  const update = (changes: { query?: string; scope?: "catalog" | "library" }, submit = false) => {
    m.patch({ ...changes, filled: false, empty: false });
    const next = { query, scope, ...changes };
    const search = new URLSearchParams({ view: "search" });
    if (next.query) search.set("q", next.query);
    if (next.scope === "library") search.set("scope", "library");
    window.history.replaceState({}, "", `/?${search}`);
    if (submit) { setFocused(false); input.current?.blur(); setActiveOption(-1); }
  };
  useEffect(() => {
    if (!source.current) { try { const saved: unknown = JSON.parse(localStorage.getItem("music-reference-recents-v1") ?? "null"); if (Array.isArray(saved)) setRecents(saved.filter((x): x is string => typeof x === "string" && x.length <= 100).slice(0, 8)); } catch { /* Storage is optional. */ } }
    setReady(true);
  }, []);
  useEffect(() => { if (ready && !source.current) { try { localStorage.setItem("music-reference-recents-v1", JSON.stringify(recents)); } catch { /* Session state remains usable. */ } } }, [recents, ready]);
  const remember = (value: string) => setRecents(current => [value, ...current.filter(item => item !== value)].slice(0, 8));
  const navigateArtist = (name: string) => { remember(name); m.go(`artist:${name}`); };
  const suggestionRows = isOlivia ? [
    { title: "Olivia Rodrigo", subtitle: "Artist", art: crop("4b515439", 600, 136, 44, 44), round: true, action: () => navigateArtist("Olivia Rodrigo") },
    { title: "Olivia Dean", subtitle: "Artist", art: crop("4b515439", 600, 193, 44, 44), round: true, action: () => navigateArtist("Olivia Dean") },
    { title: "drop dead", subtitle: "Song · Olivia Rodrigo", art: crop("4b515439", 600, 251, 44, 44), round: false, action: () => m.play("album-1") },
    { title: "honeybee", subtitle: "Song · Olivia Rodrigo", art: crop("4b515439", 600, 309, 44, 44), round: false, action: () => m.play("album-3") },
    { title: "Olivia Ong", subtitle: "Artist", art: crop("4b515439", 600, 368, 44, 44), round: true, action: () => navigateArtist("Olivia Ong") },
    { title: "Man I Need", subtitle: "Song · Olivia Dean", art: crop("4b515439", 600, 426, 44, 44), round: false, action: () => m.play("chart-7") },
    { title: "So Easy (To Fall In Love)", subtitle: "Song · Olivia Dean", art: crop("4b515439", 600, 484, 44, 44), round: false, action: () => m.play("library-4") },
    { title: albumTitle, subtitle: "Album · Olivia Rodrigo", art: crop("4b515439", 600, 542, 44, 44), round: false, action: () => m.go("album") },
  ] : results.slice(0, 7).map(track => ({ title: track.title, subtitle: track.artist, art: track.art, round: false, action: () => m.play(track) }));
  const querySuggestions = isOlivia ? [`${query} rodrigo`, `${query} dean`, query] : [query];
  const topResults: { title: string; subtitle: string; art: Artwork; round?: boolean; action: () => void }[] = [
    { title: "Olivia Rodrigo", subtitle: "Artist", art: crop("e70094e3", 297, 116, 86, 86), round: true, action: () => navigateArtist("Olivia Rodrigo") },
    { title: "Olivia Dean", subtitle: "Artist", art: crop("e70094e3", 676, 116, 86, 86), round: true, action: () => navigateArtist("Olivia Dean") },
    { title: "drop dead", subtitle: "Song · Olivia Rodrigo", art: albumArt, action: () => m.play("album-1") },
    { title: albumTitle, subtitle: "Album · Olivia Rodrigo", art: albumArt, action: () => m.go("album") },
    { title: "Olivia", subtitle: "Song · One Direction", art: crop("e70094e3", 676, 248, 86, 86), action: () => m.play("search-olivia") },
    { title: "Olivia Rodrigo: The Zane Lowe Interview", subtitle: "Radio Station", art: crop("e70094e3", 1054, 248, 86, 86), action: () => m.go("station:olivia-interview") },
  ];
  const renderArtist = (artist: typeof artists[number]) => <button type="button" key={artist.id} onClick={() => navigateArtist(artist.name)}><Art art={artist.art} label={artist.name} /><span>{artist.name}{artist.name === "Olivia Rodrigo" && <i>★</i>}</span></button>;
  return <div className={`page-content search-page capture-search ${scope === "library" ? "library-search-results short-page" : ""}`}><div className="search-toolbar"><form className="search-field" role="search" onSubmit={event => { event.preventDefault(); if (activeOption >= 0 && suggestionRows[activeOption]) suggestionRows[activeOption]!.action(); else { update({ query: query.trim() }, true); if (query.trim()) remember(query.trim()); } }}><Glyph name="search" size={15} /><input ref={input} aria-label="Search Apple Music" role="combobox" aria-expanded={Boolean(focused && query)} aria-controls={focused && query ? "search-options" : undefined} aria-activedescendant={activeOption >= 0 ? `search-option-${activeOption}` : undefined} value={query} placeholder={m.library.locale === "zh" ? "搜索" : "Search"} autoComplete="off" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={event => { update({ query: event.target.value }); setActiveOption(-1); }} onKeyDown={event => { if (event.key === "ArrowDown") { event.preventDefault(); setFocused(true); setActiveOption(i => (i + 1) % Math.max(1, suggestionRows.length)); } if (event.key === "ArrowUp") { event.preventDefault(); setActiveOption(i => (i - 1 + suggestionRows.length) % Math.max(1, suggestionRows.length)); } if (event.key === "Escape") { event.preventDefault(); setFocused(false); setActiveOption(-1); } }} />{query && <IconButton icon="close" label="Clear search" onClick={() => update({ query: "" }, true)} />}</form><div className="segmented" aria-label="Search scope"><button type="button" aria-pressed={scope === "catalog"} onClick={() => update({ scope: "catalog" }, true)}>Apple Music</button><button type="button" aria-pressed={scope === "library"} onClick={() => update({ scope: "library" }, true)}>{m.library.locale === "zh" ? "你的资料库" : "Your Library"}</button></div></div>
    {focused && query && <div className="capture-suggestions" id="search-options" role="listbox" aria-label="Search suggestions">{querySuggestions.map((value, i) => <button type="button" className="capture-query-suggestion" role="option" aria-selected={false} key={`${value}-${i}`} onMouseDown={e => e.preventDefault()} onClick={() => update({ query: value }, true)}><Glyph name="search" size={15} />{value}</button>)}<hr />{suggestionRows.map((row, i) => <button type="button" className="capture-entity-suggestion" id={`search-option-${i}`} role="option" aria-selected={activeOption === i} key={`${row.title}-${i}`} onMouseDown={e => e.preventDefault()} onClick={row.action}><Art art={row.art} label={row.title} className={row.round ? "round" : ""} /><span>{row.title}{row.title === "Olivia Rodrigo" && <i>★</i>}<small>{row.subtitle}</small></span></button>)}</div>}
    {query && !focused ? scope === "library" ? <>{results.length ? <><Section title="Songs"><div className="library-result-songs">{[...results].sort((a, b) => ["album-2", "library-4", "library-3", "library-2"].indexOf(a.id) - ["album-2", "library-4", "library-3", "library-2"].indexOf(b.id)).map(track => <SongRow key={track.id} track={track} />)}</div></Section><Section title="Artists"><div className="capture-artist-rail">{artists.slice(0, 2).reverse().filter(artist => results.some(track => track.artist === artist.name)).map(renderArtist)}</div></Section></> : <EmptyState icon="search" title="No results" description={`No songs in your library match “${query}”.`} />}</> : <>{results.length || isOlivia ? <><Section title="Top Results" onMore={() => m.go("chart")}><div className="capture-top-results">{(isOlivia ? topResults : results.slice(0, 6).map(track => ({ title: track.title, subtitle: `Song · ${track.artist}`, art: track.art, action: () => m.play(track), round: false }))).map((result, i) => <button type="button" className="capture-result" key={`${result.title}-${i}`} onClick={result.action}><Art art={result.art} label={result.title} className={result.round ? "round" : ""} /><span>{result.title}{result.title === "Olivia Rodrigo" && <i>★</i>}<small>{result.subtitle}</small></span></button>)}</div></Section><Section title="Artists" onMore={() => m.go("artists")}><div className="capture-artist-rail">{(isOlivia ? artists : [...new Map(results.map(track => [track.artist, { id: track.artist, name: track.artist, art: track.art }])).values()].slice(0, 8)).map(renderArtist)}</div></Section><Section title="Albums" onMore={() => m.go("albums")}><Rail label="Search albums" className="square-rail">{(isOlivia ? [
      { id: "album-original", title: albumTitle, subtitle: "Olivia Rodrigo", art: albumArt, destination: "album" },
      { id: "olivia-dean", title: "Olivia Dean", subtitle: "Olivia Dean", art: crop("e70094e3", 513, 645, 208, 183), destination: "artist:Olivia Dean" },
      { id: "made-in-am", title: "Made In The A.M.", subtitle: "One Direction", art: crop("e70094e3", 676, 248, 86, 86), destination: "artist:One Direction" },
      { id: "olivia", title: "Olivia", subtitle: "OLIVIA", art: crop("e70094e3", 968, 645, 208, 184), destination: "artist:OLIVIA" },
      { id: "olivia-ep", title: "Olivia - EP", subtitle: "Olivia Holt", art: crop("e70094e3", 1194, 645, 208, 208), destination: "artist:Olivia Holt" },
    ] : libraryCovers.filter(card => `${card.title} ${card.subtitle}`.toLowerCase().includes(query.toLowerCase()))).map(card => <CardTile card={card} key={card.id} />)}</Rail></Section></> : <EmptyState icon="search" title="No results" description={`No saved catalog results for “${query}”. Try a song, album, or artist name.`} />}</> : scope === "library" ? <EmptyState icon="search" description="Search in Library" /> : <><Section title={m.library.locale === "zh" ? "最近搜索" : "Recently Searched"}><button type="button" className="clear-recents" onClick={() => setRecents([])}>{m.library.locale === "zh" ? "清除" : "Clear"}</button><div className="recent-searches">{recents.map((name, i) => <button type="button" key={`${name}-${i}`} onClick={() => update({ query: name }, true)}><Art art={m.library.locale === "zh" && ["1989 (Taylor’s Version)", "Ariana Grande", "Billie Eilish"].includes(name) ? crop("f4a8b5dc", 299 + ["1989 (Taylor’s Version)", "Ariana Grande", "Billie Eilish"].indexOf(name) * 284, 116, 40, 40) : name === "Ariana Grande" ? crop("035569a0", 299, 116, 40, 40) : name === "Billie Eilish" ? crop("035569a0", 583, 116, 40, 40) : artists.find(a => a.name === name)?.art ?? albumArt} label={name} /><span>{m.library.locale === "zh" && name.startsWith("1989") ? "1989 (Taylor's Version)…" : name}{name === "Billie Eilish" && <i>★</i>}<small>{m.library.locale === "zh" ? name.startsWith("1989") ? "专辑 · Taylor Swift" : "艺人" : "Artist"}</small></span></button>)}</div></Section><Section title={m.library.locale === "zh" ? "类别浏览" : "Browse Categories"}><div className="category-grid">{(m.library.locale === "zh" ? zhCategories : categories).map((card, i) => <div key={card.id} id={i === 20 ? "more-categories" : undefined}><CardTile card={card} poster /></div>)}</div></Section></>}
    <Footer />
  </div>;
}
