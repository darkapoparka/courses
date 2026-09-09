"use client";

// Recorded UI state is distinct from playback. Audio only plays after the user
// chooses their own local file; no recording, credentials, or billing is sent.
import { albumArt, albumTitle, allTracks, formatTime, radioStations } from "../lib/music-catalog";
import { useMusic } from "./music-context";
import { Art, Glyph, IconButton } from "./music-primitives";
import { SongRow } from "./music-browse";

function Transport({ large = false }: { large?: boolean }) {
  const m = useMusic();
  return <div className={`transport ${large ? "transport-large" : ""}`}>
    <IconButton icon="shuffle" label="Shuffle" aria-pressed={m.shuffle} onClick={()=>m.setShuffle(!m.shuffle)}/>
    <IconButton icon="previous" label="Previous track" onClick={()=>m.skip(-1)}/>
    <IconButton icon={m.playing?"pause":"play"} label={m.playing?(m.snapshot?"Preview playback controls":"Pause"):"Play"} className="play-toggle" onClick={m.togglePlayback}/>
    <IconButton icon="next" label="Next track" onClick={()=>m.skip(1)}/>
    <IconButton icon="repeat" label="Repeat" aria-pressed={m.repeat} onClick={()=>m.setRepeat(!m.repeat)}/>
  </div>;
}
function Volume({ expanded = false }: { expanded?: boolean }) {
  const m = useMusic();
  return <div className={`volume-control ${expanded?"volume-expanded":""}`}><IconButton icon={m.muted||m.volume===0?"muted":"volume"} label={expanded?(m.muted?"Unmute":"Mute"):"Volume"} aria-expanded={expanded?undefined:Boolean(m.scene.volumeOpen)} onClick={()=>expanded?m.setMuted(!m.muted):m.patch({volumeOpen:!m.scene.volumeOpen})}/>{(expanded||m.scene.volumeOpen)&&<input type="range" aria-label="Volume level" min="0" max="1" step="0.01" value={m.muted?0:m.volume} onChange={event=>{m.setMuted(false);m.setVolume(Number(event.target.value));}}/>}</div>;
}
export function Player() {
  const m=useMusic();
  return <div className={`floating-player ${m.activeId?"has-track":"is-idle"} ${m.scene.guest?"with-trial":""}`} aria-label="Music player" data-snapshot={m.snapshot||undefined}><Transport/><button type="button" className="now-playing" aria-label={m.active?`Expand ${m.active.title}`:"Expand player"} onClick={()=>m.patch({expanded:true,lyrics:true})}>{m.activeId?<><Art art={m.active?.art??radioStations[1]!.art} label={m.active?.album??"Apple Music Hits"}/><span><strong>{m.active?.title??"Apple Music Hits"}</strong><small>{m.active?.artist??"Live Radio"}</small></span></>:<Glyph name="apple" size={28}/>}</button><div className="player-utilities"><IconButton icon="lyrics" label="Show lyrics" aria-pressed={m.scene.panel==="lyrics"} onClick={()=>m.patch({panel:m.scene.panel==="lyrics"?null:"lyrics"})}/><IconButton icon="queue" label="Up Next" aria-pressed={m.scene.panel==="queue"} onClick={()=>m.patch({panel:m.scene.panel==="queue"?null:"queue"})}/><Volume/></div></div>;
}
export function ExpandedPlayer() {
  const m=useMusic();const art=m.active?.art??albumArt;const total=m.duration||m.active?.duration||209;const elapsed=m.snapshot?10:m.elapsed;
  return <div className={`expanded-player ${m.scene.lyrics?"with-lyrics":"without-lyrics"}`} aria-label="Expanded player"><div className="expanded-background"><Art art={art} label=""/></div><IconButton icon="close" label="Close expanded player" className="expanded-close" onClick={()=>m.patch({expanded:false})}/><div className="expanded-layout"><div className="expanded-left"><Art art={art} label={m.active?.album??albumTitle}/><div className="expanded-meta"><div><strong>{m.active?.title??"stupid song"}</strong><button type="button" onClick={()=>m.go("album")}>{m.active?.artist??"Olivia Rodrigo"} — {m.active?.album??albumTitle}</button></div><IconButton icon="star" label="Favourite current song" aria-pressed={m.library.favourites.includes(m.activeId??"album-2")} onClick={()=>m.favourite(m.activeId??"album-2")}/><IconButton icon="more" label="More song actions" onClick={event=>m.openMenu("track",event,m.activeId??"album-2")}/></div><div className="seek-control"><input type="range" aria-label="Playback position" min="0" max={total} step="0.1" value={Math.min(elapsed,total)} disabled={!m.duration} onChange={event=>m.setElapsed(Number(event.target.value))}/><div><span>{formatTime(elapsed)}</span><span>-{formatTime(Math.max(0,total-elapsed))}</span></div></div><Transport large/><Volume expanded/></div>{m.scene.lyrics&&<div className="expanded-lyrics" tabIndex={0} aria-label="Lyrics preview"><p>new york city’s never looked so blue</p><div className="lyric-placeholder" aria-hidden="true"><span/><span/><span/><span/></div><small>Reference excerpt. Full lyrics are not bundled with this preview.</small></div>}</div><IconButton icon="lyrics" label={m.scene.lyrics?"Hide lyrics":"Show lyrics"} className="expanded-lyrics-toggle" aria-pressed={Boolean(m.scene.lyrics)} onClick={()=>m.patch({lyrics:!m.scene.lyrics})}/></div>;
}
export function PlayerPanel() {
  const m=useMusic();if(!m.scene.panel)return null;
  return <aside className="player-panel" aria-label={m.scene.panel==="queue"?"Up Next queue":"Lyrics"}><header><h2>{m.scene.panel==="queue"?"Up next":"Lyrics"}</h2>{m.scene.panel==="queue"&&m.queue.length>0&&<button type="button" className="text-accent" onClick={()=>m.setQueue([])}>Clear</button>}<IconButton icon="close" label="Close player panel" onClick={()=>m.patch({panel:null})}/></header>{m.scene.panel==="queue"?<>{m.queue.length?<div className="queue-list">{m.queue.flatMap(id=>{const track=allTracks.find(t=>t.id===id);return track?[<SongRow key={track.id} track={track} showTime trailing={<IconButton icon="close" label={`Remove ${track.title} from queue`} onClick={()=>m.setQueue(ids=>ids.filter(value=>value!==track.id))}/>}/>]:[];})}</div>:<div className="queue-empty">No upcoming songs</div>}<div className="autoplay-setting"><button type="button" className="autoplay-button" aria-pressed={Boolean(m.scene.autoplay)} onClick={()=>m.patch({autoplay:!m.scene.autoplay})}>∞ <span>Autoplay</span></button>{m.scene.autoplay&&<p>Similar saved songs are suggested after the queue.</p>}</div></>:<div className="panel-lyrics"><p>new york city’s never looked so blue</p><p className="muted">Full lyrics are not bundled with this preview.</p></div>}</aside>;
}
