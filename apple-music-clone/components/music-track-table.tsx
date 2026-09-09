"use client";

import { formatTime, type Track } from "../lib/music-catalog";
import { useMusic } from "./music-context";
import { Art, Glyph, IconButton } from "./music-primitives";

export function MusicTrackTable({ tracks, compact = false, label = "Songs" }: {
  tracks: Track[]; compact?: boolean; label?: string;
}) {
  const m = useMusic();
  return <div className={`track-table ${compact ? "library-song-table" : "chart-table"}`} role="table" aria-label={label}>
    <div className="track-table-head" role="row">
      {[compact ? "Name" : "Song", "Artist", "Album", "Time"].map(title => <span key={title} role="columnheader">{title}</span>)}
      <span className="sr-only" role="columnheader">Actions</span>
    </div>
    {tracks.map(track => <div role="row" key={track.id} className="track-table-row" data-unavailable={track.unavailable || undefined} data-playing={m.activeId === track.id && m.playing}>
      <div className="track-name" role="cell">
        <button type="button" className="favourite-marker" aria-label={`${m.library.favourites.includes(track.id) ? "Unfavourite" : "Favourite"} ${track.title}`} aria-pressed={m.library.favourites.includes(track.id)} onClick={() => m.favourite(track.id)}>{m.library.favourites.includes(track.id) && <Glyph name="star" size={10} />}</button>
        <button type="button" className="table-art" aria-label={`Play ${track.title}`} onClick={() => m.play(track)}><Art art={track.art} label={track.album} /></button>
        <button type="button" className="table-song-title" onClick={() => m.play(track)} disabled={track.unavailable}>{track.title}{track.explicit && <span className="explicit" aria-label="Explicit">E</span>}</button>
      </div>
      <div role="cell"><button type="button" className="table-text-link" onClick={() => m.go(`artist:${track.artist}`)}>{track.artist}</button></div>
      <div role="cell"><button type="button" className="table-text-link" onClick={() => m.go(`album:${track.album}`)}>{track.album}</button></div>
      <span role="cell" className="track-time">{track.duration ? formatTime(track.duration) : ""}</span>
      <div role="cell"><IconButton icon="more" label={`More actions for ${track.title}`} onClick={event => m.openMenu("track", event, track.id)} /></div>
    </div>)}
  </div>;
}
