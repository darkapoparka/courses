"use client";

import { chartTracks, crop, formatTime } from "../lib/music-catalog";
import { useMusic } from "./music-context";
import { Art, Footer, Glyph, IconButton } from "./music-primitives";

export function ChartView() {
  const m = useMusic();
  const tracks = chartTracks.filter(track => !m.library.restrictions || m.library.musicRating === "Explicit" || !track.explicit);
  return <div className="page-content chart-page"><h1><Glyph name="star" size={34} />Favourite These Viral Hits</h1>
    <div className="track-table chart-table" role="table" aria-label="Favourite These Viral Hits">
      <div className="track-table-head" role="row"><span role="columnheader">Song</span><span role="columnheader">Artist</span><span role="columnheader">Album</span><span role="columnheader">Time</span></div>
      {tracks.map(track => <div role="row" key={track.id} className="track-table-row" data-unavailable={track.unavailable || undefined}>
        <div className="track-name" role="cell"><button type="button" className="favourite-marker" aria-label={`${m.library.favourites.includes(track.id) ? "Unfavourite" : "Favourite"} ${track.title}`} aria-pressed={m.library.favourites.includes(track.id)} onClick={() => m.favourite(track.id)}>{m.library.favourites.includes(track.id) && <Glyph name="star" size={10} />}</button><button type="button" className="table-art" aria-label={`Play ${track.title}`} onClick={() => m.play(track)}><Art art={track.art} label={track.album} /></button><button type="button" className="table-song-title" onClick={() => m.play(track)} disabled={track.unavailable}>{track.title}{track.explicit && <span className="explicit">E</span>}</button></div>
        <div role="cell"><button type="button" className="table-text-link" onClick={() => m.go(`artist:${track.artist}`)}>{track.artist}</button></div>
        <div role="cell"><button type="button" className="table-text-link" onClick={() => m.go(track.id.startsWith("album-") ? "album" : `album:${track.album}`)}>{track.album}</button></div>
        <span role="cell" className="track-time">{track.duration ? formatTime(track.duration) : ""}</span><IconButton icon="more" label={`More actions for ${track.title}`} onClick={event => m.openMenu("track", event, track.id)} />
      </div>)}
    </div><Footer />
  </div>;
}

export function ScheduleView() {
  const m = useMusic();
  return <div className="page-content schedule-page short-page"><h1><Glyph name="apple" size={18} />Music Hits Schedule</h1><div className="schedule-grid">{Array.from({ length: 13 }, (_, i) => {
    const hour = (8 + i * 2) % 24;
    const time = `${String(hour).padStart(2, "0")}:00–${String((hour + 2) % 24).padStart(2, "0")}:00`;
    return <article className="schedule-entry" key={i}><button type="button" className="schedule-art" onClick={() => m.go("station:1")} aria-label={`Listen at ${time}`}><Art art={crop("f49fce21", 286, 64, 92, 92)} label="Apple Music Hits" /></button><div><small className={i === 0 ? "text-accent" : ""}>{i === 0 ? "LIVE: " : ""}{time}</small><button type="button" onClick={() => m.go("station:1")}>Apple Music Hits</button><p>Songs you know and love.</p></div><IconButton icon="more" label={`Schedule options ${time} ${i}`} onClick={event => m.openMenu("station", event)} /></article>;
  })}</div><Footer /></div>;
}
