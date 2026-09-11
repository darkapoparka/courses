"use client";

import { useEffect, useRef } from "react";
import { albumArt, albumTitle, autoplayTracks, crop, formatTime, radioStations, trackById } from "../lib/music-catalog";
import { useMusic } from "./music-context";
import { Art, Glyph, IconButton } from "./music-primitives";
import { SongRow } from "./music-browse";
import { Lyrics } from "./music-lyrics";

function Transport({ large = false, radioStop = false }: { large?: boolean; radioStop?: boolean }) {
  const m = useMusic();
  return <div className={`transport ${large ? "transport-large" : ""}`}>
    <IconButton icon="shuffle" label="Shuffle" aria-pressed={m.shuffle} onClick={() => m.setShuffle(!m.shuffle)} />
    <IconButton icon="previous" label="Previous track" onClick={() => m.skip(-1)} />
    <IconButton icon={radioStop ? "stop" : m.playing ? "pause" : "play"} label={radioStop ? "Stop live radio" : m.playing ? "Pause" : "Play"} className="play-toggle" onClick={m.togglePlayback} />
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
  const capturedLive = Boolean(station && m.scene.source?.startsWith("47a07865"));
  const playerTitle = capturedLive ? "Gorgeous" : station?.title;
  const playerSubtitle = capturedLive ? "Doja Cat — Vie — Apple Music Hits" : "Live Radio";
  const playerArt = capturedLive ? crop("47a07865",704,842,33,33) : station?.art;
  const editingPlayerStyle = ["ee8db412", "8f029018", "de48a956", "4811dde3"].some(prefix => m.scene.source?.startsWith(prefix))
    ? { background: "rgb(249 249 251 / 38%)", backdropFilter: "blur(24px) saturate(1.4)", WebkitBackdropFilter: "blur(24px) saturate(1.4)" }
    : m.scene.source?.startsWith("54b01eab") ? { background: "rgb(249 249 251 / 84%)", backdropFilter: "blur(18px) saturate(1)", WebkitBackdropFilter: "blur(18px) saturate(1)" }
    : ["ffc18eb8", "3728aa07"].some(prefix => m.scene.source?.startsWith(prefix)) ? { background: "rgb(249 249 251 / 50%)", backdropFilter: "blur(22px) saturate(1)", WebkitBackdropFilter: "blur(22px) saturate(1)" } : undefined;
  return <div className={`floating-player ${m.activeId ? "has-track" : "is-idle"} ${m.scene.guest && m.scene.page !== "home" ? "with-trial" : ""}`} aria-label="Music player" data-snapshot={m.snapshot || undefined} data-volume-open={m.scene.volumeOpen || undefined} title={m.mediaName ? `Local file: ${m.mediaName}` : "Local UI reference. Shift+M opens media you own."} style={editingPlayerStyle}>
    <Transport radioStop={capturedLive && m.playing} />
    <button type="button" className="now-playing" disabled={!m.activeId} aria-label={m.active ? `Expand ${m.active.title}` : station ? `Expand ${station.title}` : "Expand player"} onClick={() => m.patch({ expanded: true, lyrics: !station })}>
      {m.activeId ? <><span className="player-cover"><Art art={m.active?.art ?? playerArt ?? albumArt} label={m.active?.album ?? playerTitle ?? "Music"} />{m.duration > 0 && <i style={{ width: `${m.elapsed / m.duration * 100}%` }} />}</span><span><strong>{m.active?.title ?? playerTitle}{m.library.favourites.includes(m.activeId) && <span className="small-star">★</span>}</strong><small>{station ? playerSubtitle : `${m.active?.artist} — ${m.active?.album}`}</small></span></> : <Glyph name="apple" size={28} />}
    </button>
    {capturedLive && <span className="player-live-badge">LIVE</span>}{m.activeId && m.scene.hero !== "listening" && !capturedLive && <IconButton icon="more" label="More current song actions" className="player-track-menu" onClick={event => m.openMenu(station ? "station" : "track", event, m.activeId)} />}
    <div className="player-utilities">{!m.scene.guest && <IconButton icon="lyrics" label="Show lyrics" aria-pressed={m.scene.panel === "lyrics"} onClick={() => m.patch({ panel: m.scene.panel === "lyrics" ? null : "lyrics" })} />}<IconButton icon="queue" label="Up Next" aria-pressed={m.scene.panel === "queue"} onClick={() => m.patch({ panel: m.scene.panel === "queue" ? null : "queue" })} /><Volume /></div>
  </div>;
}

function RadioTransport() {
  const m = useMusic();
  return <div className="radio-transport" aria-label="Live radio controls"><IconButton icon="previous" label="Previous station item" onClick={() => m.skip(-1)} /><IconButton icon="stop" label="Stop live radio" className="radio-stop" onClick={m.togglePlayback} /><IconButton icon="next" label="Next station item" onClick={() => m.skip(1)} /></div>;
}
export function ExpandedPlayer() {
  const m = useMusic();
  const station = m.activeId?.startsWith("station") ? radioStations.find(item => item.id === m.activeId) : undefined;
  const radioReference = Boolean(station && m.scene.source?.startsWith("7bd2ef54"));
  const stationTitle = radioReference ? "Gorgeous" : station?.title;
  const stationSubtitle = radioReference ? "Doja Cat — Vie — Apple Music Hits" : "Live Radio";
  const art = radioReference ? crop("7bd2ef54",461,106,518,519) : m.scene.playerArt ?? (station ? station.art : m.activeId === "album-2" || !m.activeId ? crop("c939c9b8",144,134,461,462) : m.active?.art ?? albumArt);
  const total = m.duration;
  const hasLyrics = Boolean(m.scene.lyrics && !station);
  return <div className={`expanded-player faithful-expanded ${hasLyrics ? "with-lyrics" : "without-lyrics"} ${radioReference ? "radio-reference" : ""}`} data-local-media={m.mediaName || undefined} aria-label="Expanded player">
    {radioReference && <Art art={art} label="" className="radio-reference-backdrop" />}
    <IconButton icon="close" label="Close expanded player" className="expanded-close" onClick={() => m.patch({ expanded: false })} />
    <div className="expanded-layout"><div className="expanded-left">
      <Art art={art} label={m.active?.album ?? stationTitle ?? albumTitle} />
      <div className="expanded-meta"><div><strong>{m.active?.title ?? stationTitle ?? "stupid song"}</strong><button type="button" onClick={() => m.go(station ? "radio" : `album:${m.active?.album ?? albumTitle}`)}>{station ? stationSubtitle : `${m.active?.artist ?? "Olivia Rodrigo"} — ${m.active?.album ?? albumTitle}`}</button></div>
        {!station && <IconButton icon="star" label="Favourite current song" aria-pressed={m.library.favourites.includes(m.activeId ?? "album-2")} onClick={() => m.favourite(m.activeId ?? "album-2")} />}
        {!radioReference && <IconButton icon="more" label="More song actions" onClick={event => m.openMenu(station ? "station" : "track", event, m.activeId ?? "album-2")} />}
      </div>
      {!station && <div className="seek-control"><input type="range" aria-label="Playback position" min="0" max={total || 1} step="0.1" value={Math.min(m.elapsed, total)} disabled={!total} style={{ backgroundSize: `${total ? m.elapsed / total * 100 : 0}% 100%` }} onChange={event => m.setElapsed(Number(event.target.value))} /><div><span>{formatTime(m.elapsed)}</span><span>-{formatTime(Math.max(0, total - m.elapsed))}</span></div></div>}
      {station && <div className={`live-progress ${radioReference ? "radio-live-progress" : ""}`}>{radioReference ? <><span>--:--</span><span>LIVE</span></> : <span>LIVE</span>}</div>}
      {station ? <RadioTransport /> : <Transport large />}<Volume expanded />
    </div>{hasLyrics && <div className="expanded-lyrics"><Lyrics /></div>}</div>
    {!station && <IconButton icon="lyrics" label={hasLyrics ? "Hide lyrics" : "Show lyrics"} className="expanded-lyrics-toggle" aria-pressed={hasLyrics} onClick={() => m.patch({ lyrics: !hasLyrics })} />}
    <span className="sr-only">This is a local reference player. Without a user-owned file, transport controls preview UI state silently. Shift+M opens local media.</span>
  </div>;
}
export function PlayerPanel() {
  const m = useMusic();
  if (!m.scene.panel) return null;
  const queue = m.queue.flatMap(id => { const track = trackById(id); return track ? [track] : []; });
  const panelStyle = m.scene.source?.startsWith("ee8db412") ? { backgroundColor: "rgb(255 255 255 / 46%)", backdropFilter: "blur(15px) saturate(1.6)", WebkitBackdropFilter: "blur(15px) saturate(1.6)" } : undefined;
  return <aside className={`player-panel faithful-panel ${m.scene.panel === "lyrics" ? "lyrics-panel" : "queue-panel"}`} aria-label={m.scene.panel === "queue" ? "Up Next queue" : "Lyrics"} style={panelStyle}>
    <IconButton icon="close" label="Close player panel" className="panel-keyboard-close" onClick={() => m.patch({ panel: null })} />
    {m.scene.panel === "lyrics" ? <Lyrics panel /> : <>
      <header><h2>Up next</h2>{queue.length > 0 && <button type="button" className="text-accent" onClick={() => m.setQueue([])}>Clear</button>}<button type="button" className="autoplay-toggle" aria-label="Autoplay" aria-pressed={Boolean(m.scene.autoplay)} onClick={() => m.patch({ autoplay: !m.scene.autoplay })}>∞</button></header>
      {queue.length ? <div className="queue-list">{queue.map(track => <SongRow key={track.id} track={track} showTime trailing={<IconButton icon="close" label={`Remove ${track.title} from queue`} className="queue-remove" onClick={() => m.setQueue(ids => ids.filter(id => id !== track.id))} />} />)}</div> : <div className="queue-empty">No upcoming songs</div>}
      {m.scene.autoplay && <section className="autoplay-setting"><h3><span>∞</span>AutoPlay</h3><p>Similar music will keep playing</p>{autoplayTracks.map(track => <SongRow key={track.id} track={track} showTime trailing={<></>} />)}</section>}
    </>}
  </aside>;
}
