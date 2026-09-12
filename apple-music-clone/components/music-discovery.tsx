"use client";

import { useState, type ReactNode } from "react";
import { StationArtwork } from "./station-artwork";
import { useMusic } from "./music-context";
import { partialDiscoveryRelease, partialPanelRelease, wideLegacyReleaseSource } from "../lib/panel-release-art";
import { localizedPicks, localizedRecents, localizedFeatures, localizedSongs, finalLoginSongs, homeAdditions } from "../lib/localized-discovery";
import styles from "./music-discovery-fixes.module.css";
import { legacyFeatures, legacySongs, liveFeatures, performanceFeature, queueSongs } from "../lib/discovery-variants";
import { Art, Footer, Glyph, IconButton, Section } from "./music-primitives";
import { Rail } from "./music-rail";
import { useRailUnderlay } from "./use-rail-underlay";
import { CardTile, SongRow } from "./music-browse";
import { categories, chartTracks, coverArtwork, crop, features, libraryCovers, recentlyPlayed, topPicks, viralTracks, type Artwork, type Card } from "../lib/music-catalog";

const listening: Card[] = [
  ["NMIXX Essentials", "Apple Music K-Pop"], ["Grasshopper Essentials", "Apple Music Cantopop"],
  ["Ariana Grande’s Eternal Sunshine Tour Set List", "Apple Music Pop"],
  ["Michael Jackson Essentials", "Apple Music Pop"], ["i-dle Essentials", "Apple Music K-Pop"],
].map(([title, subtitle], i) => ({ id: `listening-${i}`, title: title!, subtitle, destination: `category:${title}`, art: crop("8b03c9d0", 286 + i * 227, 66, 208, 208) }));
const daily: Card[] = ["Singapore", "Global", "Taiwan", "USA", "UK"].map((city, i) => ({ id: `top-100-${i}`, title: `Top 100: ${city}`, subtitle: "Apple Music", destination: "chart", art: crop("8b03c9d0", 286 + i * 227, 397, 208, 208) }));
const coming: Card[] = [
  ["The Real Me", "Future"], ["Lost Weekend", "Phoebe Bridgers"], ["Don’t Look Down", "Rod Wave"], ["BARAJA BENDITA", "Becky G"], ["Pylon", "beabadoobee"],
].map(([title, subtitle], i) => ({ id: `coming-${i}`, title: title!, subtitle, destination: `category:${title}`, explicit: i !== 1, art: crop("706de500", 286 + i * 227, 149, 208, 208) }));
const homePicks: Card[] = [...topPicks,
  { id: "easy-hits", title: "Today’s Easy Hits", art: crop("d5173715", 570, 135, 264, 353), destination: "category:Today’s Easy Hits" },
  { id: "ravyn", title: "Ravyn Lenae & Similar Artists", art: crop("d5173715", 854, 135, 264, 353), destination: "artist:Ravyn Lenae" },
  { id: "discovery", title: "Discovery Station", art: crop("d5173715", 1138, 135, 264, 353), destination: "station:discovery" },
];
const homeTop100: Card[] = [
  ["Singapore", 0], ["Global", 1], ["USA", 3], ["UK", 4], ["South Korea", 4], ["Taiwan", 2],
].map(([city, artIndex], index) => ({ id: `home-top-100-${index}`, title: `Top 100: ${city}`, subtitle: "Apple Music", destination: "chart", art: crop("8b03c9d0", 286 + Number(artIndex) * 227, 397, 208, 208) }));

function Cards({ cards, label, className = "square-rail", initialIndex = 0, poster = false, artContents, artOverlays, onPositionChange, artOverlayPosition = "top" }: { cards: Card[]; label: string; className?: string; initialIndex?: number; poster?: boolean; artContents?: Partial<Record<string, ReactNode>>; onPositionChange?: (index: number) => void; artOverlays?: Partial<Record<number, Artwork>>; artOverlayPosition?: "top" | "bottom" }) {
  return <Rail label={label} className={className} initialIndex={initialIndex} onPositionChange={onPositionChange}>{cards.map((card, index) => <CardTile key={card.id} card={card} poster={poster} artContent={artContents?.[card.id]} artOverlay={artOverlays?.[index]} artOverlayPosition={artOverlayPosition} />)}</Rail>;
}
// London and Miami are outside the captured player: retain their full visible
// 189px. Middle columns must stop at 119px rather than embed player controls.
function CityCard({ city, index }: { city: string; index: number }) {
  const m = useMusic();
  return <article className="media-card city-card"><button type="button" className="card-art-button" aria-label={`Top 25: ${city}`} onClick={() => m.go(`category:Top 25: ${city}`)}><span className="city-art" data-art-partial={index > 0 && index < 4 || undefined}><Art art={crop("8b03c9d0", 286 + index * 227, 714, 208, index === 0 || index === 4 ? 189 : 119)} label={`Top 25 ${city}`} className="city-upper" /><Art art={crop("706de500", 286 + index * 227, 0, 208, 39)} label="" className="city-lower" /></span></button><button type="button" className="card-title" onClick={() => m.go(`category:Top 25: ${city}`)}>Top 25: {city}</button><p>Apple Music</p></article>;
}
export function NewView() {
  const m = useMusic();
  const underlay = useRailUnderlay(".feature-rail");
  const [finalLogin] = useState(() => m.scene.source?.startsWith("e027fe6d"));
  const queue = m.scene.catalog === "queue";
  const legacy = !queue && (finalLogin || m.scene.catalog === "legacy" || m.scene.hero === "superbloom");
  const legacyCards = m.scene.panel ? legacyFeatures.map((card, i) => i < 2 ? { ...card, art: crop("ee8db412", i === 0 ? 286 : 710, 167, 406, 233) } : i === 2 && m.scene.panel === "lyrics" && legacy ? legacyFeatures[3]! : i === 3 && m.scene.panel === "lyrics" && legacy ? legacyFeatures[2]! : card) : legacyFeatures;
  // A local control clears source routing, not the visible catalog/artwork edition.
  const [source] = useState(() => m.scene.source?.slice(0, 8));
  const currentFeatures = ["4f611a9e", "fc5d84bd"].includes(source ?? "")
    ? features.map((card, index) => index < 2 ? { ...card, art: crop(source!, index === 0 ? 286 : 854, 167, 548, 314) } : card)
    : features;
  const sourceFeatures = source === "54b01eab" ? currentFeatures.map((card, index) => index === 3 ? { ...card, art: currentFeatures[5]!.art } : card) : currentFeatures;
  const featureCards = m.library.locale === "zh" ? localizedFeatures : queue ? liveFeatures : legacy ? legacyCards : m.scene.hero === "listening" ? [sourceFeatures[0]!, performanceFeature, ...sourceFeatures.slice(1)] : sourceFeatures;
  const initialIndex = !legacy && !queue && m.scene.hero === "alpha" ? 4 : 0;
  const [featureIndex, setFeatureIndex] = useState(initialIndex);
  const songs = m.library.locale === "zh" ? localizedSongs : finalLogin ? finalLoginSongs : queue ? queueSongs : legacy ? legacySongs : viralTracks;
  const visible = songs.filter(track => (!m.library.restrictions || m.library.musicRating === "Explicit" || !track.explicit) && !m.library.discouraged.includes(track.id));
  const zh = m.library.locale === "zh";
  const longToyStoryTitle = source === "4f611a9e" || source === "54b01eab";
  const [capturedSongOrder] = useState(() => ["6ac70c34", "cf59e554", "a229e38a"].includes(source ?? "")
    ? ["album-1", "album-2", "chart-2", "chart-3", "chart-4", "chart-8", "chart-5", "chart-7", "chart-9", "library-4", "chart-10", "chart-11"]
    : source === "ee8db412" ? ["album-1", "album-2", "chart-2", "chart-3", "chart-4", "chart-8", "chart-5", "chart-7", "chart-9", "chart-10", "chart-11"] : undefined);
  const capturedPanelSongs = capturedSongOrder ? capturedSongOrder.flatMap(id => [...legacySongs, ...chartTracks].find(track => track.id === id) ?? []) : visible;
  const visibleSongs = !zh && !legacy && !queue && longToyStoryTitle ? capturedPanelSongs.map(track => track.id === "viral-1" ? { ...track, title: `I Knew It, I Knew You (From "Toy Story 5")` } : track) : capturedPanelSongs;
  const cleanReleases: Partial<Record<number, Card>> = legacy ? {
    0: { id: "better-broken", title: "Better Broken (Extended Version)", subtitle: "Sarah McLachlan", destination: "category:Better Broken (Extended Version)", art: coverArtwork("cover-better-broken") },
    3: { id: "simply-red-live", title: "Holding Back the Years (Live in Santiago)", subtitle: "Simply Red", destination: "category:Holding Back the Years (Live in Santiago)", art: coverArtwork("cover-simply-red-live") },
  } : queue ? {
    0: { id: "coachella-weekend-one", title: "SWAG LIVE FROM COACHELLA (Weekend I)", subtitle: "Justin Bieber", destination: "category:SWAG LIVE FROM COACHELLA (Weekend I)", art: coverArtwork("cover-coachella-weekend-one") },
    2: { id: "sting-night-watch", title: "The Night Watch (Live at the Rijksmuseum)", subtitle: "Sting", destination: "category:The Night Watch (Live at the Rijksmuseum)", art: coverArtwork("cover-sting-night-watch") },
  } : {};
  const releaseEdition = m.scene.panel ? (queue ? "8f029018" : legacy ? "ee8db412" : undefined) : undefined;
  const wideReleaseSource = !m.scene.panel && legacy && !zh ? wideLegacyReleaseSource(source) : undefined;
  const partialReleases = releaseEdition || wideReleaseSource ? Object.fromEntries([9, 4, 1, 5, 7].flatMap((index, position) => cleanReleases[position] ? [] : [[position, releaseEdition ? partialPanelRelease(releaseEdition, position, libraryCovers[index]!) : partialDiscoveryRelease(wideReleaseSource!, position, libraryCovers[index]!)]])) : {};
  const newThisWeek = [9, 4, 1, 5, 7].map((index, position) => cleanReleases[position] ?? partialReleases[position]?.card ?? libraryCovers[index]!);
  const releaseStripSource = source && ["e72be564", "4f611a9e", "54b01eab", "f2e44e3b", "be864051", "e027fe6d", "fc5d84bd"].includes(source) ? source : undefined;
  const panelReleaseSource = releaseEdition;
  const releaseArtOverlays: Partial<Record<number, Artwork>> | undefined = panelReleaseSource || wideReleaseSource
    ? Object.fromEntries(Object.entries(partialReleases).map(([index, value]) => [index, value.overlay]))
    : releaseStripSource ? {
      0: crop(releaseStripSource, 286, 840, 208, 63),
      4: crop(releaseStripSource, 1194, 840, 208, 63),
    } : undefined;
  return <div ref={underlay.ref} className="page-content new-page capture-discovery" data-catalog={queue ? "queue" : legacy ? "legacy" : "current"} data-feature-scrolled={featureIndex > 0 || undefined} data-feature-underlay={(featureIndex > 0 && underlay.visible) || undefined} data-feature-alpha={featureCards[featureIndex]?.id === "alpha" || undefined}><h1>{zh ? "新发现" : "New"}</h1>
    <Rail label="Featured music" className="feature-rail" initialIndex={initialIndex} onPositionChange={setFeatureIndex}>{featureCards.map(card => <article className="feature-card" key={card.id}><div className="feature-caption"><small>{card.kicker}</small><button type="button" onClick={() => m.go(zh ? card.destination : card.id === "singapore" ? "chart" : `category:${card.title}`)}>{card.title}</button><span>{card.subtitle || "\u00a0"}</span></div><button className="card-art-button" type="button" aria-label={`Open ${card.title}`} onClick={() => m.go(zh ? card.destination : card.id === "singapore" ? "chart" : `category:${card.title}`)}><Art art={card.art} label={card.title} /></button></article>)}</Rail>
    <Section title="☆ Favourite These Viral Hits" onMore={() => m.go("chart")}><Rail label="Viral songs" className="song-rail"><div className="viral-grid">{visibleSongs.map(track => <SongRow key={track.id} track={track} showFavourite={legacy || queue || zh} showAdd={(!legacy && !queue && m.scene.hero === "listening") || source === "6ac70c34"} />)}</div></Rail></Section>
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
  const underlay = useRailUnderlay(".poster-rail", !m.scene.guest);
  const [hideConcerts,setHideConcerts] = useState(false);
  const zh = m.library.locale === "zh";
  const source = m.scene.source?.slice(0, 8);
  // Preserve the observed artwork edition through local overlays and controls.
  const [homeFrame] = useState(() => m.scene.source?.slice(0, 8));
  const [homeIndex, setHomeIndex] = useState(m.scene.hero === "alpha" ? 3 : 0);
  const laterFrame = homeIndex > 0;
  const topPickCards = zh ? localizedPicks : homePicks.map(card => {
    if (card.id === "alex" && (laterFrame || homeFrame === "2f5da478")) return { ...card, art: crop("2f5da478", 854, 135, 264, 353) };
    if (card.id === "new-music" && laterFrame) return { ...card, art: crop("d5173715", 286, 135, 264, 353) };
    if (card.id === "new-music" && homeFrame === "2f5da478") return { ...card, art: crop("2f5da478", 1138, 135, 264, 353) };
    return card;
  });
  const recentsSource = laterFrame ? "d5173715" : homeFrame === "2f5da478" ? "2f5da478" : "a917d88f";
  const homeRecents = recentlyPlayed.map((card, index) => ({ ...card, art: crop(recentsSource, 286 + index * 227, 571, 208, 208), explicit: card.id === "parris" }));
  const homeTop100Overlays: Partial<Record<number, Artwork>> | undefined = source === "42098642" ? Object.fromEntries([286, 513, 740, 967, 1194].map((x, index) => [index, crop("42098642", x, 0, 208, 95)])) : undefined;
  if (m.scene.guest) return <div className="membership-home capture-membership"><div className="brand"><Glyph name="apple" />Music</div><h1>Discover new music<br />every day.</h1><Art art={crop("aefa8502", 246, 220, 1194, 450)} label="Apple Music discovery illustration" className="membership-hero-art" /><p>Get playlists and albums inspired by the artists and genres you’re listening to. 1 month free, then $10.99/month.</p><button type="button" className="pill white" onClick={() => m.patch({ overlay: "signin" })}>Try It Free</button></div>;
  return <div ref={underlay.ref} className="page-content home-page capture-home" data-home-scrolled={laterFrame || undefined} data-home-underlay={(laterFrame && underlay.visible) || undefined}><h1>{zh ? "主页" : "Home"}</h1><Section title={zh ? "专属精选推荐" : "Top Picks for You"}><Cards cards={topPickCards} artContents={!zh && laterFrame ? { alex: <StationArtwork /> } : undefined} label="Top picks" className="poster-rail" poster initialIndex={m.scene.hero === "alpha" ? 3 : 0} onPositionChange={setHomeIndex} /></Section><Section title={zh ? "最近播放" : "Recently Played"} onMore={() => m.go("library")}><Cards cards={zh ? localizedRecents : homeRecents} label="Recently played" /></Section><Section title={zh ? "运动健身" : "Pop"} onMore={() => m.go(zh ? "category:Fitness" : "category:Pop")}><Cards cards={libraryCovers.filter((_, i) => i > 3 && i !== 8)} label="Pop" /></Section>{!zh && <Section title="Top 100" className="home-top-100" onMore={() => m.go("chart")}><Cards cards={homeTop100} label="Top 100" artOverlays={homeTop100Overlays} artOverlayPosition="bottom" /></Section>}<Section title={zh ? "加入资料库" : "Add to Your Library"} id="add-library"><p className={styles.additionsDescription}>The best recent albums we love.</p><Cards cards={homeAdditions} label="Albums for your library" /></Section>{!hideConcerts && <Section title="Concerts"><div className={styles.concertCard}><div><span><Glyph name="concert-tickets" size={30} /></span><div><h3>Find Concerts Nearby</h3><p>Upcoming shows will appear here.</p></div></div><IconButton icon="close" label="Dismiss concert suggestion" onClick={() => setHideConcerts(true)} /><button type="button" className={styles.setLocation} onClick={() => m.go("concerts")}>Set Location</button></div></Section>}<Footer /></div>;
}
