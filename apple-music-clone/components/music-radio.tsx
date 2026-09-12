"use client";

import { crop, radioStations, type Card } from "../lib/music-catalog";
import { useMusic } from "./music-context";
import { Art, Footer, Glyph, IconButton, Section } from "./music-primitives";
import { Rail } from "./music-rail";
import styles from "./music-radio.module.css";

const episodes = [
  ["ESSENTIALS RADIO", "JÄY-Z, Reasonable Doubt: Essentials", "JÄY-Z’s unmatched legacy starts here."],
  ["THE EBRO SHOW", "JÄY-Z", "Jigga’s influence is everywhere."],
  ["THE DOTTY SHOW", "JÄY-Z Day", "A look at JÄY-Z’s big-upping women on the mic."],
  ["THE MATT WILKINSON SHOW", "JÄY-Z Day", "JÄY-Z collabs, cult classics, and hidden gems."],
  ["COLOR ME COUNTRY RADIO", "Ride At Dawn", "Shawnee Kish, Blanco Brown, Wyatt Flores and more."],
  ["RAP LIFE RADIO", "Rap Life’s Biggest Records", "Cue up and turn up the cuts making the most noise."],
];
const capturedEpisodes = [
  ["ESSENTIALS RADIO", "JÄY-Z, Reasonable Doubt: Essentials", "JÄY-Z’s unmatched legacy starts here."],
  ["THE EBRO SHOW", "JÄY-Z: The Impact", "Ebro spotlights songs that sampled or quoted Jigga."],
  ["THE DOTTY SHOW", "JÄY-Z: The Playboy", "Dotty spins through Jigga’s appreciation for the ladies."],
  ["THE MATT WILKINSON SHOW", "JÄY-Z Day", "JÄY-Z collabs, cult classics, and hidden gems."],
  ["COLOR ME COUNTRY RADIO", "Ride At Dawn", "Shawnee Kish, Blanco Brown, Wyatt Flores and more."],
  ["RAP LIFE RADIO", "Rap Life’s Biggest Records", "Cue up and turn up the cuts making the most noise."],
];
function StationCard({ station }: { station: Card }) {
  const m = useMusic();
  return <article className="media-card"><button type="button" className="card-art-button" aria-label={`Listen to ${station.title}`} onClick={() => m.go(station.destination)}><Art art={station.art} label={station.title} /><span className="card-play"><Glyph name="play" /></span></button><button type="button" className="card-title" onClick={() => m.go(station.destination)}>{station.title}</button><p>{station.subtitle}</p></article>;
}
export function RadioView() {
  const m = useMusic();
  const source = m.scene.source?.slice(0, 8);
  const captured = m.scene.radioEdition === "hits";
  const visibleEpisodes = captured ? capturedEpisodes : episodes;
  const takeoverNames = captured ? ["Pheelz", "Álvaro Díaz", "Justin Tranter", "Tyler White", "Fancy Hagood"] : ["Tyler White", "Fancy Hagood", "SIENNA SPIRO", "The Cowgays", "Shaboozey"];
  const cropSource = captured ? (["a9992e55", "47a07865", "37575452"].includes(source ?? "") ? source! : "a9992e55") : "4cb8f3aa";
  return <div className={`page-content radio-page ${styles.page}`} data-edition={captured ? "hits" : "launch"} data-station-menu={m.scene.menu === "station" || undefined}><h1>Radio</h1>
    <Section title="Live Radio"><p className="section-description">Tap a station to hear non-stop music and more.</p><Rail label="Live radio" className="station-rail">{radioStations.slice(0,6).map(station => { const selected = m.scene.selectedTrack === station.id; return <article className="station-card" data-selected={selected || undefined} key={station.id}><button type="button" className="card-art-button" aria-label={`Listen to ${station.title}`} onClick={() => m.go(station.destination)}><Art art={station.art} label={station.title} /><span className="card-play"><Glyph name="play" /></span></button><IconButton icon="more" label={`${station.title} options`} onClick={event => m.openMenu("station", event, station.id)} /></article>; })}</Rail></Section>
    <Section title="Latest Episodes" onMore={() => m.go("schedule")}><Rail label="Latest episodes" className={styles.episodesRail}><div className="episode-grid">{visibleEpisodes.map(([show,title,description],index) => <article className="episode" key={show}><button type="button" aria-label={`Listen to ${title}`} onClick={() => m.go("station:1")}><Art art={crop(cropSource,286+Math.floor(index/2)*378.5,392+(index%2)*115,92,92)} label={title!} /></button><div><small>{show}</small><button type="button" onClick={() => m.go("station:1")}>{title}</button><p>{description}</p></div><IconButton icon="more" label={`Options for ${title}`} onClick={event => m.openMenu("station", event, "station-1")} /></article>)}</div></Rail></Section>
    <Section title="Artists Take Over" onMore={() => m.go("category:Radio takeovers")}><Rail label="Artists take over" className="square-rail">{takeoverNames.map((name,index) => <StationCard key={name} station={{id:`takeover-${index}`,title:name,destination:"station:1",art:crop(cropSource,286+index*227,675,208,208)}} />)}</Rail></Section>
    <section id="radio-stations" data-reference-top="31" className={styles.section}><h2><button type="button" onClick={() => m.go("category:Top Stations")}>Top Stations<Glyph name="chevron" size={14} /></button></h2><Rail label="Top stations" className="square-rail">{radioStations.slice(6,11).map(station => <StationCard key={station.id} station={station} />)}</Rail></section>
    <section className={styles.section}><h2><button type="button" onClick={() => m.go("category:Stations by Genre")}>Stations by Genre<Glyph name="chevron" size={14} /></button></h2><Rail label="Stations by genre" className="square-rail">{radioStations.slice(11).map(station => <StationCard key={station.id} station={station} />)}</Rail></section>
    <section className={styles.section}><h2>More to Explore</h2><div className={styles.explore}>{["Acoustic","African","Alternative & Indie","Electronic","From Around the World","Hip-Hop","Latin","Metal","Pop"].map(title => <button key={title} type="button" onClick={() => m.go(`category:${title}`)}>{title}<Glyph name="chevron" size={14} /></button>)}</div></section>
    <Footer />
  </div>;
}
