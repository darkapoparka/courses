"use client";

import { albumTitle, crop, trackById, type Artwork } from "../lib/music-catalog";
import { useMusic } from "./music-context";
import { Art, Footer, Glyph, IconButton } from "./music-primitives";
import { Rail } from "./music-rail";
import styles from "./music-credits.module.css";

type Credit = { name: string; role: string; initials?: string; art?: Artwork };
const olivia = crop("6337700d", 600, 562, 44, 44);
const daniel = crop("6337700d", 878, 562, 44, 44);
const performers: Credit[] = [
  { name: "Olivia Rodrigo", role: "Vocals", art: olivia },
  { name: "Daniel Nigro", role: "Background Vocals, Bass, Programming, Guitar, Drum Programming", art: daniel },
  { name: "Noah Conrad", role: "Piano", initials: "NC" },
  { name: "Sterling Mitchell Laws", role: "Drums", initials: "SL" },
  { name: "Bryn Bliska", role: "Programming", initials: "BB" },
  { name: "Paul Cartwright", role: "Violin, Viola", initials: "PC" },
];
const writers: Credit[] = [
  { name: "Olivia Rodrigo", role: "Songwriter", art: olivia },
  { name: "Daniel Nigro", role: "Songwriter, String Arranger", art: daniel },
];
const production: Credit[] = [
  { name: "Daniel Nigro", role: "Producer, Engineer", art: daniel },
  { name: "Chris Kasych", role: "Engineer", initials: "CK" },
  { name: "Mitch McCarthy", role: "Mixing Engineer", initials: "MM" },
  { name: "Mike Bozzi", role: "Mastering Engineer", initials: "MB" },
  { name: "Prash 'Engine-Earz' Mistry", role: "Immersive Mixing Engineer", initials: "PM" },
  { name: "Lavar Bullard", role: "Immersive Mixing Engineer", initials: "LB" },
  { name: "Jack Doutt", role: "Mastering Engineer", art: crop("2278b1d0", 600, 355, 44, 44) },
];
function CreditPeople({ people }: { people: Credit[] }) {
  return <div className={styles.people}>{people.map(person => <div className={styles.person} key={person.name}>
    {person.art ? <Art resolution="standard" art={person.art} label={person.name} /> : <span className={styles.initials} aria-hidden="true">{person.initials}</span>}
    <div><strong>{person.name}</strong><span>{person.role}</span></div>
  </div>)}</div>;
}
export function CreditsView() {
  const m = useMusic();
  const track = trackById(m.scene.category ?? m.scene.track ?? "album-2");
  const captured = track?.id === "album-2";
  if (!track) return <div className="route-error"><h1>Credits unavailable</h1><button type="button" onClick={() => m.go("new")}>Back to New</button></div>;
  return <div className={styles.page}>
    <div className={styles.actions}><IconButton icon="star" label="Favourite credited song" aria-pressed={m.library.favourites.includes(track.id)} onClick={() => m.favourite(track.id)} /><IconButton icon="more" label="More credited song actions" onClick={event => m.openMenu("track", event, track.id)} /></div>
    <header className={styles.header}>
      <Art resolution="standard" art={captured ? crop("6337700d", 286, 56, 286, 286) : track.art} label={track.album} className={styles.cover} />
      <div><h1>{track.title}</h1><p>{track.album} · {track.artist}{captured ? " · 12 June 2026" : ""}</p><button type="button" className={styles.play} onClick={() => m.play(track)}><Glyph name="play" size={12} />Play</button></div>
    </header>
    {captured ? <>
      <section className={`${styles.section} ${styles.lyrics}`}><h2>Lyrics</h2><div><p>new york city's never looked so blue<br />my friends are smoking blunts in the bathroom</p><button type="button" onClick={() => m.patch({ expanded: true, lyrics: true })}>View Full Lyrics<Glyph name="chevron" size={12} /></button></div></section>
      <section className={`${styles.section} ${styles.performers}`}><h2>Performing Artists</h2><CreditPeople people={performers} /></section>
      <section className={`${styles.section} ${styles.writers}`}><h2>Composition &amp; Lyrics</h2><CreditPeople people={writers} /></section>
      <section id="production" data-reference-top="195" className={`${styles.section} ${styles.production}`}><h2>Production &amp; Engineering</h2><CreditPeople people={production} /></section>
      <section className={styles.more} aria-label="More By Olivia Rodrigo"><h2><button type="button" onClick={() => m.go("artist:Olivia Rodrigo")}>More By Olivia Rodrigo<Glyph name="chevron" size={14} /></button></h2>
        <Rail label="More By Olivia Rodrigo" className="square-rail">{[albumTitle, "SOUR", "drivers license - Single", "GUTS", "SOUR"].map((title, index) => <article key={`${title}-${index}`} className={styles.related}>
          <button type="button" className={styles.relatedArt} aria-label={`Open ${title}`} onClick={() => m.go(index === 0 ? "album" : `album:${title}`)}><Art resolution="standard" art={crop("2278b1d0", 286 + index * 227, 554, 207, 207)} label={title} /></button>
          <button type="button" className={styles.relatedTitle} onClick={() => m.go(index === 0 ? "album" : `album:${title}`)}>{title}</button>
        </article>)}</Rail>
      </section>
    </> : <p className={styles.unavailable}>The supplied capture does not include credits for this song. No credits from another recording have been substituted.</p>}
    <Footer />
  </div>;
}
