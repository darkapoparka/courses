"use client";

import { useState } from "react";
import { emotionalArt, favouriteArt, suggestionOrder, trackById } from "../lib/music-catalog";
import { useMusic } from "./music-context";
import { Art, EmptyState, Footer, Glyph, IconButton } from "./music-primitives";
import { MusicTrackTable } from "./music-track-table";
import { SongRow } from "./music-browse";

export function PlaylistView() {
  const m = useMusic();
  const favourites = m.scene.page === "favourites";
  const playlist = m.library.playlists.find(p => p.id === (m.scene.category ?? "emotional"));
  const [refresh, setRefresh] = useState(0);
  if (!favourites && !playlist) return <div className="page-content"><EmptyState icon="playlist" title="Playlist not found" action="All Playlists" onAction={() => m.go("playlists")} /></div>;
  const title = favourites ? "Favourite Songs" : playlist!.name;
  const trackIds = favourites ? m.library.favourites : playlist!.tracks;
  const tracks = trackIds.flatMap(id => { const t = trackById(id); return t && (!m.library.restrictions || m.library.musicRating === "Explicit" || !t.explicit) ? [t] : []; });
  const suggestedIds = suggestionOrder.filter(id => !trackIds.includes(id));
  const reordered = playlist?.tracks.includes("vampire") ? ["library-2", "style-tv", "bad-guy", "survive", "dont-start-now", "as-it-was"] : suggestedIds;
  const suggested = [...reordered.slice(refresh % reordered.length), ...reordered.slice(0, refresh % reordered.length)].filter(id => !trackIds.includes(id)).slice(0, 6).flatMap(id => { const t = trackById(id); return t ? [t] : []; });
  const start = (shuffle = false) => {
    if (!tracks.length) return;
    m.setShuffle(shuffle);
    m.setQueue(tracks.slice(1).map(t => t.id));
    m.play(tracks[0]!);
  };
  return <div className={`page-content playlist-detail ${favourites ? "favourite-detail" : ""}`}>
    <div className="detail-tools">{!favourites && <IconButton icon="share" label={`Share ${title}`} onClick={event => m.openMenu("share", event)} />}<IconButton icon="more" label={`More actions for ${title}`} onClick={event => m.openMenu("album", event)} /></div>
    <header className="playlist-header">
      {favourites || playlist?.id === "emotional" ? <Art art={favourites ? favouriteArt : emotionalArt} label={title} /> : <div className="created-playlist-cover"><strong>{title}</strong><Glyph name="playlist" size={84} /></div>}
      <div className="playlist-information"><h1>{title}{favourites && <span className="small-star">★</span>}</h1>
        {!favourites && <p className="playlist-owner">Alex Smith</p>}
        <p className="playlist-updated">Updated Today</p>
        {!favourites && <p className="playlist-description">{playlist?.description}</p>}
        <div className="album-actions"><IconButton icon="shuffle" label={`Shuffle ${title}`} className="round-button" onClick={() => start(true)} /><button type="button" className="pill dark" disabled={!tracks.length} onClick={() => start()}><Glyph name="play" size={16} />Play</button><IconButton icon="check" label="Playlist is in your library" className="round-button" onClick={() => m.go("playlists")} /></div>
      </div>
    </header>
    <MusicTrackTable tracks={tracks} label={title} />
    <p className="playlist-count">{tracks.length} {tracks.length === 1 ? "song" : "songs"}, {Math.floor(tracks.reduce((n, t) => n + t.duration, 0) / 60)} minutes</p>
    {!favourites && <section className="playlist-suggestions" aria-label="Suggested Songs">
      <header><div><h2>Suggested Songs</h2><p>Preview and add to playlist</p></div><button type="button" className="text-accent" onClick={() => setRefresh(value => value + 1)}><Glyph name="repeat" size={14} />Refresh</button></header>
      <div className="playlist-suggestion-grid">{suggested.map(track => <SongRow key={track.id} track={track} showFavourite trailing={<button type="button" className="add-suggestion" aria-label={`Add ${track.title} to ${title}`} onClick={() => m.setLibrary(data => ({ ...data, playlists: data.playlists.map(p => p.id === playlist?.id ? { ...p, tracks: [...new Set([...p.tracks, track.id])] } : p) }))}><Glyph name="plus" size={12} /></button>} />)}</div>
    </section>}
    <Footer compact />
  </div>;
}
