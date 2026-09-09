"use client";

import { useMusic } from "./music-context";
import { Art, Footer, Glyph, IconButton, Rail, Section } from "./music-primitives";
import { CardTile, SongRow } from "./music-browse";
import { categories, chartTracks, crop, features, libraryCovers, recentlyPlayed, topPicks, viralTracks, type Artwork, type Card } from "../lib/music-catalog";

const listening: Card[] = [
  ["NMIXX Essentials", "Apple Music K-Pop"], ["Grasshopper Essentials", "Apple Music Cantopop"],
  ["Ariana Grande’s Eternal Sunshine Tour Set List", "Apple Music Pop"],
  ["Michael Jackson Essentials", "Apple Music Pop"], ["i-dle Essentials", "Apple Music K-Pop"],
].map(([title, subtitle], i) => ({ id: `listening-${i}`, title: title!, subtitle, destination: `category:${title}`, art: crop("8b03c9d0", 286 + i * 227, 66, 208, 208) }));
const daily: Card[] = ["Singapore", "Global", "Taiwan", "USA", "United Kingdom"].map((city, i) => ({ id: `top-100-${i}`, title: `Top 100: ${city}`, subtitle: "Apple Music", destination: "chart", art: crop("8b03c9d0", 286 + i * 227, 397, 208, 208) }));
const coming: Card[] = [
  ["The Real Me", "Future"], ["Lost Weekend", "Phoebe Bridgers"], ["Don’t Look Down", "Rod Wave"], ["BARAJA BENDITA", "Becky G"], ["Pylon", "beabadoobee"],
].map(([title, subtitle], i) => ({ id: `coming-${i}`, title: title!, subtitle, destination: `category:${title}`, art: crop("706de500", 286 + i * 227, 149, 208, 208) }));
const homePicks: Card[] = [...topPicks,
  { id: "easy-hits", title: "Today’s Easy Hits", art: crop("d5173715", 570, 135, 264, 353), destination: "category:Today’s Easy Hits" },
  { id: "ravyn", title: "Ravyn Lenae & Similar Artists", art: crop("d5173715", 854, 135, 264, 353), destination: "artist:Ravyn Lenae" },
  { id: "discovery", title: "Discovery Station", art: crop("d5173715", 1138, 135, 264, 353), destination: "station:discovery" },
];

function Cards({ cards, label, className = "square-rail", initialIndex = 0, poster = false }: { cards: Card[]; label: string; className?: string; initialIndex?: number; poster?: boolean }) {
  return <Rail label={label} className={className} initialIndex={initialIndex}>{cards.map(card => <CardTile key={card.id} card={card} poster={poster} />)}</Rail>;
}
function CityCard({ city, index }: { city: string; index: number }) {
  const m = useMusic();
  return <article className="media-card city-card"><button type="button" className="card-art-button" aria-label={`Top 25: ${city}`} onClick={() => m.go(`category:Top 25: ${city}`)}><span className="city-art"><Art art={crop("8b03c9d0", 286 + index * 227, 714, 208, 119)} label={`Top 25 ${city}`} className="city-upper" /><Art art={crop("706de500", 286 + index * 227, 0, 208, 39)} label="" className="city-lower" /></span></button><button type="button" className="card-title" onClick={() => m.go(`category:Top 25: ${city}`)}>Top 25: {city}</button><p>Apple Music</p></article>;
}
export function NewView() {
  const m = useMusic();
  const initialIndex = m.scene.hero === "superbloom" ? 2 : m.scene.hero === "alpha" ? 4 : 0;
  const songs = m.scene.hero === "superbloom" ? chartTracks.slice(0, 12) : viralTracks;
  const visible = songs.filter(track => (!m.library.restrictions || m.library.musicRating === "Explicit" || !track.explicit) && !m.library.discouraged.includes(track.id));
  const zh = m.library.locale === "zh";
  return <div className="page-content new-page capture-discovery"><h1>{zh ? "新发现" : "New"}</h1>
    <Rail label="Featured music" className="feature-rail" initialIndex={initialIndex}>{features.map(card => <article className="feature-card" key={card.id}><div className="feature-caption"><small>{card.kicker}</small><button type="button" onClick={() => m.go(card.id === "singapore" ? "chart" : `category:${card.title}`)}>{card.title}</button><span>{card.subtitle || "\u00a0"}</span></div><button className="card-art-button" type="button" aria-label={`Open ${card.title}`} onClick={() => m.go(card.id === "singapore" ? "chart" : `category:${card.title}`)}><Art art={card.art} label={card.title} /></button></article>)}</Rail>
    <Section title={zh ? "收藏这些热门歌曲" : "☆ Favourite These Viral Hits"} onMore={() => m.go("chart")}><Rail label="Viral songs" className="song-rail"><div className="viral-grid">{visible.map(track => <SongRow key={track.id} track={track} />)}</div></Rail></Section>
    <Section title={zh ? "本周新作" : "New This Week"} id="new-this-week" onMore={() => m.go("category:New This Week")}><Cards cards={libraryCovers.filter((_, i) => [9, 4, 1, 5, 7].includes(i))} label="New releases" /></Section>
    <Section title={zh ? "大家都在听…" : "Everyone’s Listening To…"} id="essentials"><Cards cards={listening} label="Everyone’s listening" /></Section>
    <Section title={zh ? "每日百强榜" : "Daily Top 100"} id="daily-top" onMore={() => m.go("chart")}><Cards cards={daily} label="Daily Top 100" /></Section>
    <Section title={zh ? "城市排行榜" : "City Charts"} id="city-charts" onMore={() => m.go("category:City Charts")}><Rail label="City Charts" className="square-rail">{["London", "New York City", "Seoul", "Tokyo", "Miami"].map((city, index) => <CityCard city={city} index={index} key={city} />)}</Rail></Section>
    <Section title={zh ? "即将推出" : "Coming Soon"} id="coming-soon" onMore={() => m.go("category:Coming Soon")}><Cards cards={coming} label="Coming soon" /></Section>
    <Section title={zh ? "更多探索" : "More to Explore"} id="more-to-explore"><div className="explore-grid">{["Concerts", "Browse by Genre", "Decades", "Moods and Activities", "Worldwide", "Charts", "Spatial Audio"].map(title => <button type="button" key={title} onClick={() => m.go(title === "Concerts" ? "concerts" : title === "Charts" ? "chart" : `category:${title}`)}>{title}<Glyph name="chevron" size={14} /></button>)}</div></Section><Footer />
  </div>;
}
export function HomeView() {
  const m = useMusic();
  const zh = m.library.locale === "zh";
  if (m.scene.guest) return <div className="membership-home capture-membership"><div className="brand"><Glyph name="apple" />Music</div><h1>Discover new music<br />every day.</h1><div className="membership-note"><Glyph name="song" size={280} /></div><p>Get playlists and albums inspired by the artists and genres you’re streaming.</p><button type="button" className="pill white" onClick={() => m.patch({ overlay: "signin" })}>Try It Free</button><Footer /></div>;
  return <div className="page-content home-page capture-home"><h1>{zh ? "主页" : "Home"}</h1><Section title={zh ? "为你精选" : "Top Picks for You"}><Cards cards={homePicks} label="Top picks" className="poster-rail" poster initialIndex={m.scene.hero === "alpha" ? 3 : 0} /></Section><Section title={zh ? "最近播放" : "Recently Played"} onMore={() => m.go("library")}><Cards cards={recentlyPlayed} label="Recently played" /></Section><Section title="Pop" onMore={() => m.go("category:Pop")}><Cards cards={libraryCovers.filter((_, i) => i > 3 && i !== 8)} label="Pop" /></Section><Section title={zh ? "加入资料库" : "Add to Your Library"} id="add-library" onMore={() => m.go("library")}><Cards cards={[...libraryCovers].reverse()} label="Albums for your library" /></Section><Section title="Concerts"><div className="concert-callout"><Glyph name="ticket" size={32} /><div><strong>Find Concerts Nearby</strong><p>Upcoming shows of interest to you.</p></div><button type="button" onClick={() => m.go("concerts")}>Set Location</button></div></Section><Footer /></div>;
}
