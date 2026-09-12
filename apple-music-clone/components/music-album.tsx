"use client";

import { useState } from "react";
import { albumTitle, albumTracks, crop, type Artwork } from "../lib/music-catalog";
import { useMusic } from "./music-context";
import { Art, Footer, Glyph, IconButton } from "./music-primitives";
import { AlbumView as CatalogAlbumView } from "./music-browse";
import styles from "./music-album.module.css";
const standardAlbum = crop("b620e4ab", 286, 42, 256, 256);
const videos = [
  { title: "the cure", art: crop("eb489e8d",286,69,359,202), explicit: true },
  { title: albumTitle, art: crop("eb489e8d",664,69,359,202), explicit: false },
  { title: "drop dead (stalked you on the internet)", art: crop("eb489e8d",1042,69,359,202), explicit: false },
];
function RelatedCard({ title, art, destination, artist = "Olivia Rodrigo", explicit = false }: { title: string; art: Artwork; destination: string; artist?: string; explicit?: boolean }) {
  const m = useMusic();
  return <article className={styles.card}><button type="button" className={styles.art} aria-label={`Open ${title}`} onClick={() => m.go(destination)}><Art art={art} label={title} /></button><button type="button" className={styles.caption} onClick={() => m.go(destination)}>{title}{explicit && <span className="explicit">E</span>}</button><span>{artist}</span></article>;
}
export function AlbumView() {
  const m = useMusic();
  const [capturedHover, setCapturedHover] = useState(() => Boolean(m.scene.source?.startsWith("b620e4ab")));
  const clearCapturedHover = capturedHover ? () => setCapturedHover(false) : undefined;
  const captured = !m.scene.category || [albumTitle, "cover-9", "album-original"].includes(m.scene.category);
  if (!captured) return <CatalogAlbumView />;
  const videoVersion = m.scene.category !== "album-original";
  const ids = albumTracks.map(track => track.id);
  const added = ids.every(id => m.library.songs.includes(id));
  const addAlbum = () => m.setLibrary(data => ({ ...data, songs: added ? data.songs.filter(id => !ids.includes(id)) : [...new Set([...data.songs, ...ids])] }));
  const play = (shuffle = false) => { m.setShuffle(shuffle); m.setQueue(albumTracks.filter(track => !track.unavailable && track.id !== "album-2").map(track => track.id)); m.play("album-2"); };
  return <div className={styles.page} onPointerMoveCapture={clearCapturedHover} onKeyDownCapture={clearCapturedHover}>
    <div className={styles.tools} data-album-tools><IconButton icon="share" label={`Share ${albumTitle}`} onClick={event => m.openMenu("share", event, "album-2")} /><IconButton icon="more" label={`More actions for ${albumTitle}`} onClick={event => m.openMenu("album", event, "album-2")} /></div>
    <header className={styles.header}><Art art={standardAlbum} label={albumTitle} /><div className={styles.info}><h1>{albumTitle}<span className="explicit">E</span></h1><button type="button" className={styles.artist} onClick={() => m.go("artist:Olivia Rodrigo")}>Olivia Rodrigo</button><p className={styles.meta}>Pop · 2026</p><div className={styles.summary}><strong>A pop savant raises her game and her standards on her third album.</strong><p>Olivia Rodrigo has loved and lost many times since she cried through the suburbs as the heartbroken teenager in “drivers license”. She’s grown up, and her standards have gotten higher—<button type="button" onClick={() => m.patch({ overlay: "article" })}>MORE</button></p></div><div className={styles.actions}><IconButton icon="shuffle" label="Shuffle album" onClick={() => play(true)} /><button type="button" className={styles.play} onClick={() => play()}><Glyph name="play" size={13} />Play</button><IconButton icon={added ? "check" : "plus"} label={added ? "Remove album from library" : "Add album to library"} onClick={addAlbum} /></div></div></header>
    <div className={styles.tracks} role="table" aria-label="Album songs">{albumTracks.map((track,index) => <div key={track.id} className={styles.row} role="row" data-current={(m.activeId ?? "album-2") === track.id} data-unavailable={track.unavailable || undefined}>
      <button type="button" className={styles.marker} data-captured-hover={capturedHover && m.scene.source?.startsWith("b620e4ab") && track.id === "album-2" || undefined} aria-label={`${m.library.favourites.includes(track.id) ? "Unfavourite" : "Favourite"} ${track.title}`} aria-pressed={m.library.favourites.includes(track.id)} onClick={() => m.favourite(track.id)}><Glyph name="star" size={9} />{!m.library.favourites.includes(track.id) && ([0,7].includes(index) || (m.activeId ?? "album-2") === track.id) ? <i /> : null}</button><span className={styles.trackNumber} role="cell">{index + 1}</span><div role="cell" className={styles.songCell}><button type="button" disabled={track.unavailable} onClick={() => m.play(track)}>{track.title}{track.explicit && <span className="explicit">E</span>}</button>{track.artist.includes(",") && <span>{track.artist}</span>}</div><span className={styles.time} role="cell">{track.duration ? `${Math.floor(track.duration/60)}:${String(track.duration%60).padStart(2,"0")}` : ""}</span><IconButton icon="more" label={`More actions for ${track.title}`} onClick={event => m.openMenu("track", event, track.id)} />
    </div>)}{videoVersion && <div className={styles.row} role="row"><span className={styles.trackNumber} role="cell">14</span><div role="cell" className={styles.songCell}><button type="button" onClick={() => {m.play("album-video");m.patch({video:true});}}><Glyph name="video" size={18} />{albumTitle}</button></div><span className={styles.time} role="cell">0:20</span><IconButton icon="more" label="More actions for album video" onClick={event => m.openMenu("track", event, "album-video")} /></div>}</div>
    <div className={styles.release}><p>12 June 2026</p><p>{videoVersion ? "14 songs, 51 minutes" : "13 songs"}</p><p>℗ 2026 Olivia Rodrigo, under exclusive license to Geffen Records</p><a href="https://music.apple.com/" target="_blank" rel="noreferrer">Also available in the iTunes Store<Glyph name="external" size={11} /></a></div>
    <div className={styles.related}>
      <section id="other-versions" data-reference-top="329" className={styles.versions}><h2>Other Versions</h2><div className={styles.fiveGrid}><RelatedCard title={albumTitle} artist="13 songs" destination="album:album-original" art={crop("ffd1356a",286,401,208,208)} /></div></section>
      <section id="music-videos" data-reference-top="35" className={styles.section}><h2>Music Videos</h2><div className={styles.threeGrid}>{videos.map(video => <RelatedCard key={video.title} title={video.title} art={video.art} destination="video" explicit={video.explicit} />)}</div></section>
      <section className={styles.section}><h2>More to See</h2><div className={styles.threeGrid}><RelatedCard title="Olivia Rodrigo on “drop dead”" art={crop("eb489e8d",286,379,359,202)} destination="video" /></div></section>
      <section className={styles.section}><h2>More to Hear</h2><div className={styles.fiveGrid}>{["Olivia Rodrigo: The Zane Lowe Interview","livies radio","Olivia Rodrigo: How We Got Here"].map((title,index) => <RelatedCard key={title} title={title} art={crop("eb489e8d",286+index*227,689,208,207)} destination="station:1" />)}</div></section>
    </div>
    <Footer />
  </div>;
}
