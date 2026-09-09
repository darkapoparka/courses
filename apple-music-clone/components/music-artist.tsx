"use client";

import { useState } from "react";
import { albumArt, albumTitle, albumTracks, allTracks, crop, type Artwork } from "../lib/music-catalog";
import { oliviaTour } from "../lib/concert-catalog";
import { TourRow } from "./music-concerts";
import { useMusic } from "./music-context";
import { Art, Footer, Glyph, IconButton } from "./music-primitives";
import { Rail } from "./music-rail";
import { SongRow } from "./music-browse";
import styles from "./music-artist.module.css";

type Entry = { title: string; detail?: string; year?: string; art: Artwork; destination: string; explicit?: boolean };
const albumEntries: Entry[] = [
  { title: albumTitle, year: "2026", destination: "album", art: crop("57f7c08e",286,430,208,208) },
  { title: "The Hunger Games: The Ballad of Songbirds & Snakes (Music From The Motion Picture)", year: "2023", destination: "album:The Hunger Games", art: crop("57f7c08e",513,430,208,208) },
  { title: "GUTS (spilled)", year: "2023", destination: "album:GUTS (spilled)", art: crop("57f7c08e",740,430,208,208) },
  { title: "SOUR (Video Version)", year: "2021", destination: "album:SOUR (Video Version)", art: crop("57f7c08e",967,430,208,208) },
];
const videoEntries: Entry[] = [
  { title: "Olivia Rodrigo: The Zane Lowe Interview", year: "2026", explicit: true, destination: "video", art: crop("edae3407",286,72,264,148) },
  { title: "Begged (Lyric Video)", year: "2026", destination: "video", art: crop("edae3407",570,72,264,148) },
  { title: "cigarette smoke (Lyric Video)", year: "2026", explicit: true, destination: "video", art: crop("edae3407",854,72,264,148) },
  { title: "expectations (Lyric Video)", year: "2026", destination: "video", art: crop("edae3407",1138,72,264,148) },
];
const artistPlaylists: Entry[] = [
  { title: "Olivia Rodrigo Essentials", destination: "category:Olivia Rodrigo Essentials", art: crop("edae3407",286,329,264,264) },
  { title: "Olivia Rodrigo Video Essentials", destination: "videos", art: crop("edae3407",570,329,264,264) },
  { title: "Olivia Rodrigo’s GUTS World Tour Set List", detail: "Olivia Rodrigo spills her “GUTS” on tour. Listen to the set list.", destination: "category:GUTS World Tour Set List", art: crop("edae3407",854,329,264,264) },
  { title: "Olivia Rodrigo Influences", detail: "The Top 40 and alt-rock songs that shaped her confessional, hooky pop.", destination: "category:Olivia Rodrigo Influences", art: crop("edae3407",1138,329,264,264) },
];
const moreToHear: Entry[] = [
  { title: "Olivia Rodrigo: The Zane Lowe Interview", detail: "The “drop dead” superstar discusses…", destination: "video", art: crop("c9a554f4",286,491,208,208) },
  { title: "livies radio", detail: "We break down Olivia Rodrigo’s third studio album.", explicit: true, destination: "station:1", art: crop("c9a554f4",513,491,208,208) },
  { title: "Essential Album: Sour", detail: "Olivia Rodrigo’s classic debut took the world for a ride.", explicit: true, destination: "album:SOUR", art: crop("c9a554f4",740,491,208,208) },
  { title: "Olivia Rodrigo: How We Got Here", detail: "The road to Olivia’s new album…", explicit: true, destination: "album", art: crop("c9a554f4",967,491,208,208) },
  { title: "Olivia Rodrigo, St. Vincent", detail: "St. Vincent was impressed—and so are we.", explicit: true, destination: "station:1", art: crop("c9a554f4",1194,491,208,208) },
];
const moreToSee: Entry[] = [
  { title: "Olivia Rodrigo on “drop dead”", detail: "15:34", destination: "video", art: crop("c9a554f4",286,822,264,81) },
  { title: "Olivia Rodrigo on GUTS", detail: "9:42", destination: "video", art: crop("c9a554f4",570,822,264,81) },
  { title: "Olivia Rodrigo chats to Zane about her song “vampire”", detail: "11:13", destination: "video", art: crop("c9a554f4",854,822,264,81) },
  { title: "At Home With Olivia Rodrigo", detail: "10:57", destination: "video", art: crop("c9a554f4",1138,822,264,81) },
];
const similar = ["Sabrina Carpenter", "Billie Eilish", "Taylor Swift", "Gracie Abrams", "Conan Gray", "Joshua Bassett", "Tate McRae", "Harry Styles"];
function Heading({ title, onClick }: { title: string; onClick?: () => void }) {
  return <h2 className={styles.heading}>{onClick ? <button type="button" onClick={onClick}>{title}<Glyph name="chevron" size={14} /></button> : title}</h2>;
}
function EntryCard({ entry, width = "five", continuation }: { entry: Entry; width?: "four" | "five"; continuation?: number }) {
  const m = useMusic();
  return <article className={`${styles.entry} ${width === "four" ? styles.four : styles.five}`}>
    <button type="button" className={continuation !== undefined ? styles.stitchedVideo : styles.entryArt} aria-label={`Open ${entry.title}`} onClick={() => m.go(entry.destination)}>
      <Art resolution="standard" art={entry.art} label={entry.title} />
      {continuation !== undefined && <Art resolution="standard" art={crop("0c042c32", 286 + continuation * 284, 0, 264, 110)} label="" />}
    </button>
    <button type="button" className={styles.entryTitle} onClick={() => m.go(entry.destination)}>{entry.title}{entry.explicit && <span className="explicit">E</span>}</button>
    {entry.year && <span className={styles.entryMeta}>{entry.year}</span>}
    {entry.detail && <span className={styles.entryMeta}>{entry.detail}</span>}
  </article>;
}
export function ArtistView() {
  const m = useMusic();
  const [expandedBio, setExpandedBio] = useState(false);
  const name = !m.scene.category || m.scene.category === "livies" ? "Olivia Rodrigo" : m.scene.category;
  const related = allTracks.filter(track => track.artist.split(", ").includes(name));
  if (name !== "Olivia Rodrigo") return <div className="page-content"><h1>{name}</h1><section className={styles.genericSongs}><Heading title="Songs in the saved catalog" />{related.length ? related.map(track => <SongRow key={track.id} track={track} />) : <p>No dedicated artist capture was supplied for this artist.</p>}</section><Footer /></div>;
  const topSongs = [albumTracks[1]!, albumTracks[0]!, albumTracks[7]!, albumTracks[2]!, albumTracks[3]!, albumTracks[4]!];
  const add = () => m.setLibrary(data => ({ ...data, songs: [...new Set([...data.songs, ...albumTracks.map(track => track.id)])] }));
  const added = albumTracks.every(track => m.library.songs.includes(track.id));
  return <div className={styles.page}>
    <header className={styles.hero}>
      <Art resolution="standard" art={crop("484851bf", 247, 0, 1189, 374)} label="Olivia Rodrigo artist artwork" className={styles.heroPhoto} />
      <div className={styles.heroBase}><Art resolution="standard" art={crop("484851bf", 247, 367, 1189, 7)} label="" /></div>
      <div className={styles.heroControls}><button type="button" className={styles.concertShortcut} onClick={() => m.go("nearby")}><Glyph name="ticket" size={12} />Nearby Concerts</button><div className={styles.titleRow}><button type="button" className={styles.playArtist} aria-label="Play Olivia Rodrigo" onClick={() => m.play(albumTracks[1]!)}><Glyph name="play" size={17} /></button><h1>Olivia Rodrigo</h1><IconButton icon="star" label="Favourite Olivia Rodrigo" aria-pressed={m.library.favouriteArtists.includes(name)} onClick={() => m.favouriteArtist(name)} /><IconButton icon="more" label="More artist actions" onClick={event => m.openMenu("artist", event, "album-2")} /></div></div>
    </header>
    <div className={styles.body}>
      <div className={styles.overview}>
        <section><Heading title="Latest Release" /><div className={styles.latest}><button type="button" aria-label={`Open ${albumTitle}`} onClick={() => m.go("album")}><Art resolution="standard" art={crop("484851bf",286,534,157,158)} label={albumTitle} /></button><div><small>12 JUN 2026</small><button type="button" onClick={() => m.go("album")}>{albumTitle}</button><span>13 songs</span><button type="button" className={styles.add} onClick={add}><Glyph name={added ? "check" : "plus"} size={13} />{added ? "Added" : "Add"}</button></div></div></section>
        <section><Heading title="Top Songs" onClick={() => m.go("chart")} /><div className={styles.topSongs}>{topSongs.map(track => <div key={track.id} className={styles.topSong}><button type="button" aria-label={`Play ${track.title}`} className={styles.topSongArt} onClick={() => m.play(track)}><Art resolution="standard" art={albumArt} label={albumTitle} /></button><div><button type="button" onClick={() => m.play(track)}>{track.title}</button><span>{albumTitle}</span></div><IconButton icon="more" label={`More actions for ${track.title}`} onClick={event => m.openMenu("track", event, track.id)} /></div>)}</div></section>
      </div>
      <section id="essential-albums" data-reference-top="24" className={styles.section}><Heading title="Essential Albums" /><div className={styles.essential}><EntryCard width="four" entry={{ title: "SOUR (Video Version)", year: "2021", destination: "album:SOUR (Video Version)", art: crop("57f7c08e",286,57,264,264) }} /></div></section>
      <section className={styles.section}><Heading title="Albums" /><Rail label="Olivia Rodrigo albums" className="square-rail">{albumEntries.map(entry => <EntryCard key={entry.title} entry={entry} />)}</Rail></section>
      <section id="music-videos" data-reference-top="39" className={styles.section}><Heading title="Music Videos" onClick={() => m.go("videos")} /><Rail label="Olivia Rodrigo music videos" className="poster-rail">{videoEntries.map(entry => <EntryCard key={entry.title} entry={entry} width="four" />)}</Rail></section>
      <section className={styles.section}><Heading title="Artist Playlists" /><Rail label="Artist playlists" className="poster-rail">{artistPlaylists.map(entry => <EntryCard key={entry.title} entry={entry} width="four" />)}</Rail></section>
      <section className={styles.section}><Heading title="Singles & EPs" onClick={() => m.go("category:Olivia Rodrigo Singles & EPs")} /><Rail label="Captured singles artwork" className="square-rail">{[0,1,2,3,4].map(index => <button type="button" className={`${styles.entry} ${styles.five} ${styles.partialSingle}`} key={index} aria-label={`Open single ${index + 1} from the captured collection`} onClick={() => m.go("category:Olivia Rodrigo Singles & EPs")}><Art resolution="standard" art={crop("edae3407", 286 + index * 227, 716, 207, 117)} label="Captured single artwork" /></button>)}</Rail></section>
      <section id="nearby-concerts" data-reference-top="32" className={styles.section}><Heading title="Nearby Concerts" /><div className={styles.tourGrid}>{oliviaTour.filter(show => show.city === "Chicago").slice(0,2).map(show => <TourRow key={show.id} show={show} compactTime />)}</div></section>
      <section className={styles.section}><Heading title="All Upcoming Concerts" onClick={() => m.go("nearby")} /><div className={styles.tourGrid}>{oliviaTour.slice(0,8).map(show => <TourRow key={show.id} show={show} compactTime />)}</div></section>
      <section className={styles.section}><Heading title="More To Hear" onClick={() => m.go("radio")} /><Rail label="More to hear from Olivia Rodrigo" className="square-rail">{moreToHear.map(entry => <EntryCard key={entry.title} entry={entry} />)}</Rail></section>
      <section className={styles.section}><Heading title="More To See" /><Rail label="More to see from Olivia Rodrigo" className="poster-rail">{moreToSee.map((entry,index) => <EntryCard key={entry.title} entry={entry} width="four" continuation={index} />)}</Rail></section>
    </div>
    <section id="about-artist" data-reference-top="186" className={styles.about}>
      <Heading title="About Olivia Rodrigo" />
      <div className={styles.biography}><div><p>Olivia Rodrigo recognises that the yearning, melancholy aspect of her love songs is key to their intense emotional appeal—beginning with 2021’s weepy smash, “drivers license”. “I think that grounds it in something real,” she told Apple Music’s Zane Lowe in 2026, “and that’s why we resonate with those types of songs so much.”</p><p>Born in 2003 in Murrieta, California, Rodrigo juggled childhood lessons in piano, voice and acting before starring in High School Musical: The Musical: The Series and eventually turning to pop music with an abashed passion for seething ’90s alt-rock. {!expandedBio && <button type="button" onClick={() => setExpandedBio(true)}>MORE</button>}</p>{expandedBio && <><p className={styles.contentLimit}>Only the visible biography excerpt is included in the saved reference.</p><button type="button" onClick={() => setExpandedBio(false)}>LESS</button></>}</div><dl><dt>FROM</dt><dd>Murrieta, CA, United States</dd><dt>BORN</dt><dd>20 February 2003</dd><dt>GENRE</dt><dd>Pop</dd></dl></div>
      <div className={styles.similar}><Heading title="Similar Artists" onClick={() => m.go("category:Similar Artists")} /><Rail label="Similar artists" className={styles.similarRail}>{similar.map((artist,index) => <button type="button" key={artist} onClick={() => m.go(`artist:${artist}`)}><Art resolution="standard" art={crop("0c042c32",286+index*142,483,124,124)} label={artist} /><span>{artist}</span></button>)}</Rail></div>
    </section>
    <div className={styles.footer}><a href="https://music.apple.com/artist/olivia-rodrigo/979458609" target="_blank" rel="noreferrer">Olivia Rodrigo on Apple<Glyph name="external" size={10} /></a><Footer /></div>
  </div>;
}
