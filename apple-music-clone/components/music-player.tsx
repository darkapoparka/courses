"use client";

import { useEffect, useRef } from "react";
import { albumArt, albumTitle, autoplayTracks, crop, formatTime, radioStations, trackById } from "../lib/music-catalog";
import { useMusic } from "./music-context";
import { Art, Glyph, IconButton } from "./music-primitives";
import { SongRow } from "./music-browse";
import { Lyrics } from "./music-lyrics";

function Transport({ large = false }: { large?: boolean }) {
  const m = useMusic();
  return <div className={`transport ${large ? "transport-large" : ""}`}>
    <IconButton icon="shuffle" label="Shuffle" aria-pressed={m.shuffle} onClick={() => m.setShuffle(!m.shuffle)} />
    <IconButton icon="previous" label="Previous track" onClick={() => m.skip(-1)} />
    <IconButton icon={m.playing ? "pause" : "play"} label={m.playing ? "Pause" : "Play"} className="play-toggle" onClick={m.togglePlayback} />
    <IconButton icon="next" label="Next track" onClick={() => m.skip(1)} />
    <IconButton icon="repeat" label="Repeat" aria-pressed={m.repeat} onClick={() => m.setRepeat(!m.repeat)} />
  </div>;
}
function Volume({ expanded = false }: { expanded?: boolean }) {
  const m = useMusic();
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (expanded || !m.scene.volumeOpen) return;
    const dismiss = (event: PointerEvent) => { if (event.target instanceof Node && !host.current?.contains(event.target)) m.patch({ volumeOpen: false }); };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [expanded, m.scene.volumeOpen, m.patch]);
  return <div ref={host} className={`volume-control ${expanded ? "volume-expanded" : ""}`} data-open={m.scene.volumeOpen || undefined}>
    <IconButton icon={m.muted || m.volume === 0 ? "muted" : "volume"} label={expanded ? (m.muted ? "Unmute" : "Mute") : "Volume"} aria-expanded={expanded ? undefined : Boolean(m.scene.volumeOpen)} onClick={() => expanded ? m.setMuted(!m.muted) : m.patch({ volumeOpen: !m.scene.volumeOpen })} />
    {(expanded || m.scene.volumeOpen) && <input type="range" aria-label="Volume level" min="0" max="1" step="0.01" value={m.muted ? 0 : m.volume} style={{ backgroundSize: `${(m.muted ? 0 : m.volume) * 100}% 100%` }} onChange={event => { m.setMuted(false); m.setVolume(Number(event.target.value)); }} />}
  </div>;
}
export function Player() {
  const m = useMusic();
  const station = m.activeId?.startsWith("station") ? radioStations.find(item => item.id === m.activeId) : undefined;
  return <div className={`floating-player ${m.activeId ? "has-track" : "is-idle"} ${m.scene.guest ? "with-trial" : ""}`} aria-label="Music player" data-snapshot={m.snapshot || undefined} data-volume-open={m.scene.volumeOpen || undefined} title={m.mediaName ? `Local file: ${m.mediaName}` : "Local UI reference. Shift+M opens media you own."}>
    <Transport />
    <button type="button" className="now-playing" disabled={!m.activeId} aria-label={m.active ? `Expand ${m.active.title}` : station ? `Expand ${station.title}` : "Expand player"} onClick={() => m.patch({ expanded: true, lyrics: !station })}>
      {m.activeId ? <><span className="player-cover"><Art art={m.active?.art ?? station?.art ?? albumArt} label={m.active?.album ?? station?.title ?? "Music"} />{m.duration > 0 && <i style={{ width: `${m.elapsed / m.duration * 100}%` }} />}</span><span><strong>{m.active?.title ?? station?.title}{m.library.favourites.includes(m.activeId) && <span className="small-star">★</span>}</strong><small>{station ? "Live Radio" : `${m.active?.artist} — ${m.active?.album}`}</small></span></> : <Glyph name="apple" size={28} />}
    </button>
    {m.activeId && <IconButton icon="more" label="More current song actions" className="player-track-menu" onClick={event => m.openMenu(station ? "station" : "track", event, m.activeId)} />}
    <div className="player-utilities">{!m.scene.guest && <IconButton icon="lyrics" label="Show lyrics" aria-pressed={m.scene.panel === "lyrics"} onClick={() => m.patch({ panel: m.scene.panel === "lyrics" ? null : "lyrics" })} />}<IconButton icon="queue" label="Up Next" aria-pressed={m.scene.panel === "queue"} onClick={() => m.patch({ panel: m.scene.panel === "queue" ? null : "queue" })} /><Volume /></div>
  </div>;
}
export function ExpandedPlayer() {
  const m = useMusic();
  const station = m.activeId?.startsWith("station") ? radioStations.find(item => item.id === m.activeId) : undefined;
  const art = m.scene.playerArt ?? (station ? station.art : m.activeId === "album-2" || !m.activeId ? crop("c939c9b8",144,134,461,462) : m.active?.art ?? albumArt);
  const total = m.duration;
  const hasLyrics = Boolean(m.scene.lyrics && !station);
  return <div className={`expanded-player faithful-expanded ${hasLyrics ? "with-lyrics" : "without-lyrics"}`} data-local-media={m.mediaName || undefined} aria-label="Expanded player">
    <IconButton icon="close" label="Close expanded player" className="expanded-close" onClick={() => m.patch({ expanded: false })} />
    <div className="expanded-layout"><div className="expanded-left">
      <Art art={art} label={m.active?.album ?? station?.title ?? albumTitle} />
      <div className="expanded-meta"><div><strong>{m.active?.title ?? station?.title ?? "stupid song"}</strong><button type="button" onClick={() => m.go(station ? "radio" : `album:${m.active?.album ?? albumTitle}`)}>{station ? "Live Radio" : `${m.active?.artist ?? "Olivia Rodrigo"} — ${m.active?.album ?? albumTitle}`}</button></div>
        {!station && <IconButton icon="star" label="Favourite current song" aria-pressed={m.library.favourites.includes(m.activeId ?? "album-2")} onClick={() => m.favourite(m.activeId ?? "album-2")} />}
        <IconButton icon="more" label="More song actions" onClick={event => m.openMenu(station ? "station" : "track", event, m.activeId ?? "album-2")} />
      </div>
      {!station && <div className="seek-control"><input type="range" aria-label="Playback position" min="0" max={total || 1} step="0.1" value={Math.min(m.elapsed, total)} disabled={!total} style={{ backgroundSize: `${total ? m.elapsed / total * 100 : 0}% 100%` }} onChange={event => m.setElapsed(Number(event.target.value))} /><div><span>{formatTime(m.elapsed)}</span><span>-{formatTime(Math.max(0, total - m.elapsed))}</span></div></div>}
      {station && <div className="live-progress"><span>LIVE</span></div>}
      <Transport large /><Volume expanded />
    </div>{hasLyrics && <div className="expanded-lyrics"><Lyrics /></div>}</div>
    {!station && <IconButton icon="lyrics" label={hasLyrics ? "Hide lyrics" : "Show lyrics"} className="expanded-lyrics-toggle" aria-pressed={hasLyrics} onClick={() => m.patch({ lyrics: !hasLyrics })} />}
    <span className="sr-only">This is a local reference player. Without a user-owned file, transport controls preview UI state silently. Shift+M opens local media.</span>
  </div>;
}
export function PlayerPanel() {
  const m = useMusic();
  if (!m.scene.panel) return null;
  const queue = m.queue.flatMap(id => { const track = trackById(id); return track ? [track] : []; });
  return <aside className={`player-panel faithful-panel ${m.scene.panel === "lyrics" ? "lyrics-panel" : "queue-panel"}`} aria-label={m.scene.panel === "queue" ? "Up Next queue" : "Lyrics"}>
    <IconButton icon="close" label="Close player panel" className="panel-keyboard-close" onClick={() => m.patch({ panel: null })} />
    {m.scene.panel === "lyrics" ? <Lyrics panel /> : <>
      <header><h2>Up next</h2>{queue.length > 0 && <button type="button" className="text-accent" onClick={() => m.setQueue([])}>Clear</button>}<button type="button" className="autoplay-toggle" aria-label="Autoplay" aria-pressed={Boolean(m.scene.autoplay)} onClick={() => m.patch({ autoplay: !m.scene.autoplay })}>∞</button></header>
      {queue.length ? <div className="queue-list">{queue.map(track => <SongRow key={track.id} track={track} showTime trailing={<IconButton icon="close" label={`Remove ${track.title} from queue`} className="queue-remove" onClick={() => m.setQueue(ids => ids.filter(id => id !== track.id))} />} />)}</div> : <div className="queue-empty">No upcoming songs</div>}
      {m.scene.autoplay && <section className="autoplay-setting"><h3><span>∞</span>AutoPlay</h3><p>Similar music will keep playing</p>{autoplayTracks.map(track => <SongRow key={track.id} track={track} showTime trailing={<></>} />)}</section>}
    </>}
  </aside>;
}
