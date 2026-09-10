"use client";

import { useState } from "react";
import { useMusic } from "./music-context";
import { localizedPicks, localizedRecents, localizedFeatures, localizedSongs, finalLoginSongs, homeAdditions } from "../lib/localized-discovery";
import styles from "./music-discovery-fixes.module.css";
import { legacyFeatures, legacySongs, liveFeatures, performanceFeature, queueSongs } from "../lib/discovery-variants";
import { Art, Footer, Glyph, IconButton, Section } from "./music-primitives";
import { Rail } from "./music-rail";
import { CardTile, SongRow } from "./music-browse";
import { categories, chartTracks, crop, features, libraryCovers, recentlyPlayed, topPicks, viralTracks, type Artwork, type Card } from "../lib/music-catalog";

const listening: Card[] = [
  ["NMIXX Essentials", "Apple Music K-Pop"], ["Grasshopper Essentials", "Apple Music Cantopop"],
  ["Ariana Grande’s Eternal Sunshine Tour Set List", "Apple Music Pop"],
  ["Michael Jackson Essentials", "Apple Music Pop"], ["i-dle Essentials", "Apple Music K-Pop"],
].map(([title, subtitle], i) => ({ id: `listening-${i}`, title: title!, subtitle, destination: `category:${title}`, art: crop("8b03c9d0", 286 + i * 227, 66, 208, 208) }));
const daily: Card[] = ["Singapore", "Global", "Taiwan", "USA", "UK"].map((city, i) => ({ id: `top-100-${i}`, title: `Top 100: ${city}`, subtitle: "Apple Music", destination: "chart", art: crop("8b03c9d0", 286 + i * 227, 397, 208, 208) }));
const coming: Card[] = [
  ["The Real Me", "Future"], ["Lost Weekend", "Phoebe Bridgers"], ["Don’t Look Down", "Rod Wave"], ["BARAJA BENDITA", "Becky G"], ["Pylon", "beabadoobee"],
].map(([title, subtitle], i) => ({ id: `coming-${i}`, title: title!, subtitle, destination: `category:${title}`, art: crop("706de500", 286 + i * 227, 149, 208, 208) }));
const homePicks: Card[] = [...topPicks,
  { id: "easy-hits", title: "Today’s Easy Hits", art: crop("d5173715", 570, 135, 264, 353), destination: "category:Today’s Easy Hits" },
  { id: "ravyn", title: "Ravyn Lenae & Similar Artists", art: crop("d5173715", 854, 135, 264, 353), destination: "artist:Ravyn Lenae" },
  { id: "discovery", title: "Discovery Station", art: crop("d5173715", 1138, 135, 264, 353), destination: "station:discovery" },
];
const homeTop100: Card[] = [
  ["Singapore", 0], ["Global", 1], ["USA", 3], ["UK", 4], ["South Korea", 4], ["Taiwan", 2],
].map(([city, artIndex], index) => ({ id: `home-top-100-${index}`, title: `Top 100: ${city}`, subtitle: "Apple Music", destination: "chart", art: crop("8b03c9d0", 286 + Number(artIndex) * 227, 397, 208, 208) }));

function Cards({ cards, label, className = "square-rail", initialIndex = 0, poster = false, artOverlays, artOverlayPosition = "top" }: { cards: Card[]; label: string; className?: string; initialIndex?: number; poster?: boolean; artOverlays?: Partial<Record<number, Artwork>>; artOverlayPosition?: "top" | "bottom" }) {
  return <Rail label={label} className={className} initialIndex={initialIndex}>{cards.map((card, index) => <CardTile key={card.id} card={card} poster={poster} artOverlay={artOverlays?.[index]} artOverlayPosition={artOverlayPosition} />)}</Rail>;
}
function CityCard({ city, index }: { city: string; index: number }) {
  const m = useMusic();
  return <article className="media-card city-card"><button type="button" className="card-art-button" aria-label={`Top 25: ${city}`} onClick={() => m.go(`category:Top 25: ${city}`)}><span className="city-art"><Art art={crop("8b03c9d0", 286 + index * 227, 714, 208, 119)} label={`Top 25 ${city}`} className="city-upper" /><Art art={crop("706de500", 286 + index * 227, 0, 208, 39)} label="" className="city-lower" /></span></button><button type="button" className="card-title" onClick={() => m.go(`category:Top 25: ${city}`)}>Top 25: {city}</button><p>Apple Music</p></article>;
}
export function NewView() {
  const m = useMusic();
  const [finalLogin] = useState(() => m.scene.source?.startsWith("e027fe6d"));
  const legacy = finalLogin || m.scene.catalog === "legacy" || m.scene.hero === "superbloom";
  const queue = m.scene.catalog === "queue";
  const legacyCards = m.scene.panel ? legacyFeatures.map((card, i) => i < 2 ? { ...card, art: crop("ee8db412", i === 0 ? 286 : 710, 167, 406, 233) } : card) : legacyFeatures;
  const source = m.scene.source?.slice(0, 8);
  const currentFeatures = source === "4f611a9e"
    ? features.map((card, index) => index < 2 ? { ...card, art: crop("4f611a9e", index === 0 ? 286 : 854, 167, 548, 314) } : card)
    : features;
  const featureCards = m.library.locale === "zh" ? localizedFeatures : queue ? liveFeatures : legacy ? legacyCards : m.scene.hero === "listening" ? [currentFeatures[0]!, performanceFeature, ...currentFeatures.slice(1)] : currentFeatures;
  const initialIndex = !legacy && !queue && m.scene.hero === "alpha" ? 4 : 0;
  const songs = m.library.locale === "zh" ? localizedSongs : finalLogin ? finalLoginSongs : queue ? queueSongs : legacy ? legacySongs : viralTracks;
  const visible = songs.filter(track => (!m.library.restrictions || m.library.musicRating === "Explicit" || !track.explicit) && !m.library.discouraged.includes(track.id));
  const zh = m.library.locale === "zh";
  const longToyStoryTitle = source === "4f611a9e" || source === "54b01eab";
  const visibleSongs = !zh && !legacy && !queue && longToyStoryTitle ? visible.map(track => track.id === "viral-1" ? { ...track, title: `I Knew It, I Knew You (From "Toy Story 5")` } : track) : visible;
  const newThisWeek = [9, 4, 1, 5, 7].map(index => libraryCovers[index]!);
  const releaseStripSource = source && ["e72be564", "4f611a9e", "54b01eab", "f2e44e3b", "be864051", "e027fe6d"].includes(source) ? source : undefined;
  const releaseArtOverlays: Partial<Record<number, Artwork>> | undefined = releaseStripSource ? {
    0: crop(releaseStripSource, 286, 840, 208, 63),
    4: crop(releaseStripSource, 1194, 840, 208, 63),
  } : undefined;
  return <div className="page-content new-page capture-discovery" data-catalog={queue ? "queue" : legacy ? "legacy" : "current"}><h1>{zh ? "新发现" : "New"}</h1>
    <Rail label="Featured music" className="feature-rail" initialIndex={initialIndex}>{featureCards.map(card => <article className="feature-card" key={card.id}><div className="feature-caption"><small>{card.kicker}</small><button type="button" onClick={() => m.go(zh ? card.destination : card.id === "singapore" ? "chart" : `category:${card.title}`)}>{card.title}</button><span>{card.subtitle || "\u00a0"}</span></div><button className="card-art-button" type="button" aria-label={`Open ${card.title}`} onClick={() => m.go(zh ? card.destination : card.id === "singapore" ? "chart" : `category:${card.title}`)}><Art art={card.art} label={card.title} /></button></article>)}</Rail>
    <Section title="☆ Favourite These Viral Hits" onMore={() => m.go("chart")}><Rail label="Viral songs" className="song-rail"><div className="viral-grid">{visibleSongs.map(track => <SongRow key={track.id} track={track} showFavourite={legacy || queue || zh} showAdd={!legacy && !queue && m.scene.hero === "listening"} />)}</div></Rail></Section>
    <Section title={zh ? "本周新发行" : "New This Week"} id="new-this-week" onMore={() => m.go("category:New This Week")}><Cards cards={newThisWeek} label="New releases" artOverlays={releaseArtOverlays} /></Section>
    <Section title={zh ? "大家都在听…" : "Everyone’s Listening To…"} id="essentials" onMore={() => m.go(`category:${zh ? "大家都在听" : "Everyone’s Listening To"}`)}><Cards cards={listening} label="Everyone’s listening" /></Section>
    <Section title={zh ? "每日百强榜" : "Daily Top 100"} id="daily-top" onMore={() => m.go("chart")}><Cards cards={daily} label="Daily Top 100" /></Section>
    <Section title={zh ? "城市排行榜" : "City Charts"} id="city-charts" onMore={() => m.go("category:City Charts")}><Rail label="City Charts" className="square-rail">{["London", "New York City", "Seoul", "Tokyo", "Miami"].map((city, index) => <CityCard city={city} index={index} key={city} />)}</Rail></Section>
    <Section title={zh ? "即将推出" : "Coming Soon"} id="coming-soon" onMore={() => m.go("category:Coming Soon")}><Cards cards={coming} label="Coming soon" /></Section>
    <Section title={zh ? "更多探索" : "More to Explore"} id="more-to-explore"><div className="explore-grid">{["Concerts", "Browse by Genre", "Decades", "Moods and Activities", "Worldwide", "Charts", "Spatial Audio"].map(title => <button type="button" key={title} onClick={() => m.go(title === "Concerts" ? "concerts" : title === "Charts" ? "chart" : `category:${title}`)}>{title}<Glyph name="chevron" size={14} /></button>)}</div></Section><Footer />
  </div>;
}
export function HomeView() {
  const m = useMusic();
  const [hideConcerts,setHideConcerts] = useState(false);
  const zh = m.library.locale === "zh";
  const source = m.scene.source?.slice(0, 8);
  const topPickCards = zh ? localizedPicks : source === "2f5da478" ? homePicks.map((card, index) => index === 2 ? { ...card, art: crop("2f5da478", 854, 135, 264, 353) } : card) : homePicks;
  const homeTop100Overlays: Partial<Record<number, Artwork>> | undefined = source === "42098642" ? Object.fromEntries([286, 513, 740, 967, 1194].map((x, index) => [index, crop("42098642", x, 0, 208, 95)])) : undefined;
  if (m.scene.guest) return <div className="membership-home capture-membership"><div className="brand"><Glyph name="apple" />Music</div><h1>Discover new music<br />every day.</h1><Art art={crop("aefa8502", 246, 220, 1194, 450)} label="Apple Music discovery illustration" className="membership-hero-art" /><p>Get playlists and albums inspired by the artists and genres you’re listening to. 1 month free, then $10.99/month.</p><button type="button" className="pill white" onClick={() => m.patch({ overlay: "signin" })}>Try It Free</button></div>;
  return <div className="page-content home-page capture-home"><h1>{zh ? "主页" : "Home"}</h1><Section title={zh ? "专属精选推荐" : "Top Picks for You"}><Cards cards={topPickCards} label="Top picks" className="poster-rail" poster initialIndex={m.scene.hero === "alpha" ? 3 : 0} /></Section><Section title={zh ? "最近播放" : "Recently Played"} onMore={() => m.go("library")}><Cards cards={zh ? localizedRecents : recentlyPlayed} label="Recently played" /></Section><Section title={zh ? "运动健身" : "Pop"} onMore={() => m.go(zh ? "category:Fitness" : "category:Pop")}><Cards cards={libraryCovers.filter((_, i) => i > 3 && i !== 8)} label="Pop" /></Section>{!zh && <Section title="Top 100" className="home-top-100" onMore={() => m.go("chart")}><Cards cards={homeTop100} label="Top 100" artOverlays={homeTop100Overlays} artOverlayPosition="bottom" /></Section>}<Section title={zh ? "加入资料库" : "Add to Your Library"} id="add-library" onMore={() => m.go("library")}><p className={styles.additionsDescription}>The best recent albums we love.</p><Cards cards={homeAdditions} label="Albums for your library" /></Section>{!hideConcerts && <Section title="Concerts"><div className={styles.concertCard}><div><span><Glyph name="ticket" size={28} /></span><div><h3>Find Concerts Nearby</h3><p>Upcoming shows will appear here.</p></div></div><IconButton icon="close" label="Dismiss concert suggestion" onClick={() => setHideConcerts(true)} /><button type="button" className={styles.setLocation} onClick={() => m.go("concerts")}>Set Location</button></div></Section>}<Footer /></div>;
}
