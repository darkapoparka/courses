"use client";

import { useEffect, useState, type ReactNode } from "react";
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
import { categories, chartTracks, coverArtwork, crop, features, libraryCovers, newMusicDailyFeatureArt, recentlyPlayed, topPicks, viralHitsFeatureArt, viralTracks, type Artwork, type Card } from "../lib/music-catalog";

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

// Direct Alpha and the continuous New→Alpha journey share one carousel. The
// predecessor is Viral Hits in that edition; keep its clean provider artwork
// beneath live glass instead of compensating for a different card with colour.
const currentFeatureSequence: Card[] = [
  ...features.map((card, index) => index === 3 ? {
    id: "viral-hits", kicker: "UPDATED PLAYLIST", title: "Viral Hits",
    subtitle: "Apple Music", destination: "chart", art: viralHitsFeatureArt,
  } : card),
  { id: "new-music-daily", kicker: "UPDATED PLAYLIST", title: "New Music Daily",
    subtitle: "Apple Music", destination: "category:New Music Daily", art: newMusicDailyFeatureArt },
];

// The initial archive exposes only the first 18px of this third card. Preserve
// exactly those source-backed pixels and visible live-text prefixes; do not
// substitute a later edition or invent metadata outside the frozen viewport.
const initialPartialFeature: Card = {
  id: "initial-feature-continuation",
  kicker: "NEW",
  title: "Le",
  subtitle: "He",
  destination: "new",
  metadataPartial: true,
  art: { ...crop("e72be564", 1422, 167, 18, 314), partial: true },
};

function Cards({ cards, label, className = "square-rail", initialIndex = 0, poster = false, artContents, artOverlays, onPositionChange, artOverlayPosition = "top" }: { cards: Card[]; label: string; className?: string; initialIndex?: number; poster?: boolean; artContents?: Partial<Record<string, ReactNode>>; onPositionChange?: (index: number) => void; artOverlays?: Partial<Record<number, Artwork>>; artOverlayPosition?: "top" | "bottom" }) {
  return <Rail label={label} className={className} initialIndex={initialIndex} onPositionChange={onPositionChange}>{cards.map((card, index) => <CardTile key={`${card.id}-${index}`} card={card} poster={poster} artContent={artContents?.[card.id]} artOverlay={artOverlays?.[index]} artOverlayPosition={artOverlayPosition} />)}</Rail>;
}
// London and Miami are outside the captured player: retain their full visible
// 189px. Middle columns must stop at 119px rather than embed player controls.
function CityCard({ city, index }: { city: string; index: number }) {
  const m = useMusic();
  return <article className="media-card city-card"><button type="button" className="card-art-button" aria-label={`Top 25: ${city}`} onClick={() => m.go(`category:Top 25: ${city}`)}><span className="city-art" data-art-partial={index > 0 && index < 4 || undefined}><Art art={crop("8b03c9d0", 286 + index * 227, 714, 208, index === 0 || index === 4 ? 189 : 119)} label={`Top 25 ${city}`} className="city-upper" /><Art art={crop("706de500", 286 + index * 227, 0, 208, 39)} label="" className="city-lower" /></span></button><button type="button" className="card-title" onClick={() => m.go(`category:Top 25: ${city}`)}>Top 25: {city}</button><p>Apple Music</p></article>;
}

const alphaPreviousEdge = {
  top: crop("54b01eab", 240, 167, 26, 132),
  middle: crop("54b01eab", 240, 299, 13, 50),
  bottom: crop("54b01eab", 240, 349, 26, 132),
};
function AlphaPreviousEdge() {
  return <span className="alpha-previous-edge" aria-hidden="true"><Art art={alphaPreviousEdge.top} label="" className="alpha-previous-edge-top" /><Art art={alphaPreviousEdge.middle} label="" className="alpha-previous-edge-middle" /><Art art={alphaPreviousEdge.bottom} label="" className="alpha-previous-edge-bottom" /></span>;
}

const alphaNextEdge = {
  top: crop("54b01eab", 1422, 167, 18, 132),
  middle: crop("54b01eab", 1434, 299, 6, 50),
  bottom: crop("54b01eab", 1422, 349, 18, 132),
};
function AlphaNextEdge() {
  return <span className="alpha-next-edge" aria-hidden="true"><Art art={alphaNextEdge.top} label="" className="alpha-next-edge-top" /><Art art={alphaNextEdge.middle} label="" className="alpha-next-edge-middle" /><Art art={alphaNextEdge.bottom} label="" className="alpha-next-edge-bottom" /></span>;
}

// The named-profile/listening captures share one current New This Week edition.
// Preserve that catalog after local controls clear the fixture URL. Clean full
// middle covers remain provider-backed, while source-owned artwork fragments
// restore only the pixels visible outside the captured floating player.
const currentReleaseEditionSources = new Set([
  "4f611a9e", "54b01eab", "11803c64", "c98f8b54", "1f9e170c",
  "9fbb38e1", "afd02fa6", "d83e96ba", "ad689c37", "fc5d84bd",
]);

function releaseFragmentOverlay(prefix: string, position: number): Artwork {
  const x = 286 + position * 227;
  if (position === 0 || position === 4) return crop(prefix, x, 840, 208, 63);
  const belowPlayer = "linear-gradient(transparent 0 76.190477%,#000 76.190477% 100%)";
  const edge = position === 1
    ? ",linear-gradient(90deg,#000 0 6.25%,transparent 6.25% 100%)"
    : position === 3
      ? ",linear-gradient(90deg,transparent 0 93.269231%,#000 93.269231% 100%)"
      : "";
  return { ...crop(prefix, x, 840, 208, 63), visibleMask: belowPlayer + edge, partial: true };
}

// Complete provider covers matching the frozen release edition. Live glass
// must sample the actual album, not an unrelated library cover or a stretched strip.
const marenHeroRelease: Card = {
  id: "maren-hero-second-wind", title: "HERO: A Second Wind", subtitle: "Maren Morris",
  destination: "category:HERO: A Second Wind", art: coverArtwork("cover-maren-hero-second-wind"),
};
const museWowRelease: Card = {
  id: "muse-wow-signal", title: "The Wow! Signal", subtitle: "Muse",
  destination: "category:The Wow! Signal", art: coverArtwork("cover-muse-wow-signal"),
};
const lemonTangRelease: Card = {
  id: "hearts-lemon-tang", title: "Lemon Tang - The 2nd Mini Album - EP", subtitle: "Hearts2Hearts",
  destination: "category:Lemon Tang - The 2nd Mini Album - EP", art: coverArtwork("cover-hearts-lemon-tang"),
};
const kwnPrideRelease: Card = {
  id: "kwn-all-pride-aside", title: "and all pride aside", subtitle: "kwn",
  destination: "category:and all pride aside", art: coverArtwork("cover-kwn-all-pride-aside"),
};
const goldenHourRelease: Card = {
  id: "ateez-golden-hour-five", title: "GOLDEN HOUR : Part.5 - EP", subtitle: "ATEEZ",
  destination: "category:GOLDEN HOUR : Part.5 - EP", art: coverArtwork("cover-ateez-golden-hour-five"),
};
const initialReleaseContinuation: Card = {
  id: "initial-release-continuation", title: "Archived release continuation",
  destination: "new", metadataPartial: true,
  art: { ...crop("e72be564", 1422, 840, 18, 63), partial: true },
};

export function NewView() {
  const m = useMusic();
  const underlay = useRailUnderlay(".feature-rail");
  const [finalLogin] = useState(() => (m.scene.discoveryOrigin ?? m.scene.source)?.startsWith("e027fe6d"));
  const queue = m.scene.catalog === "queue";
  const legacy = !queue && (finalLogin || m.scene.catalog === "legacy" || m.scene.hero === "superbloom");
  const legacyCards = m.scene.panel ? legacyFeatures.map((card, i) => i < 2 ? { ...card, art: crop("ee8db412", i === 0 ? 286 : 710, 167, 406, 233) } : i === 2 && m.scene.panel === "lyrics" && legacy ? legacyFeatures[3]! : i === 3 && m.scene.panel === "lyrics" && legacy ? legacyFeatures[2]! : card) : legacyFeatures;
  // A local control clears source routing, not the visible catalog/artwork edition.
  const [source] = useState(() => (m.scene.discoveryOrigin ?? m.scene.source)?.slice(0, 8));
  const currentFeatures = currentFeatureSequence.map((card, index) => {
    if ((m.scene.featureEdge === "initial" || m.scene.guest) && index === 2) {
      return m.scene.guest ? { ...initialPartialFeature, art: { ...crop("3731221f", 1422, 167, 18, 314), partial: true } } : initialPartialFeature;
    }
    // The public edition retains the same editorial artwork identities,
    // using its signed-out animation frame without resetting catalog data.
    if (m.scene.guest && index < 2) {
      return { ...card, art: crop("3731221f", index === 0 ? 286 : 854, 167, 548, 314) };
    }
    if (["4f611a9e", "fc5d84bd"].includes(source ?? "") && index < 2) {
      return { ...card, art: crop(source!, index === 0 ? 286 : 854, 167, 548, 314) };
    }
    return card;
  });
  const featureCards = m.library.locale === "zh" ? localizedFeatures : queue ? liveFeatures : legacy ? legacyCards : m.scene.hero === "listening" ? [currentFeatures[0]!, performanceFeature, ...currentFeatures.slice(1)] : currentFeatures;
  const initialIndex = !legacy && !queue && m.scene.hero === "alpha" ? 4 : 0;
  const [featureIndex, setFeatureIndex] = useState(initialIndex);
  const [initialViralPointer, setInitialViralPointer] = useState(() =>
    Boolean(m.scene.viralRailActive || m.scene.hero === "listening"));
  useEffect(() => {
    if (!initialViralPointer) return;
    const leaveRail = (event: Event) => {
      if (!(event.target instanceof Element) || !event.target.closest(".viral-hits-section")) {
        setInitialViralPointer(false);
      }
    };
    const events = ["pointermove", "pointerdown", "focusin"] as const;
    events.forEach(name => window.addEventListener(name, leaveRail));
    return () => events.forEach(name => window.removeEventListener(name, leaveRail));
  }, [initialViralPointer]);
  const alphaActive = featureCards[featureIndex]?.id === "alpha";
  const songs = m.library.locale === "zh" ? localizedSongs : finalLogin ? finalLoginSongs : queue ? queueSongs : legacy ? legacySongs : viralTracks;
  const visible = songs.filter(track => (!m.library.restrictions || m.library.musicRating === "Explicit" || !track.explicit) && !m.library.discouraged.includes(track.id));
  const zh = m.library.locale === "zh";
  const longToyStoryTitle = m.scene.hero === "listening" || currentReleaseEditionSources.has(source ?? "");
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
  const currentReleaseEdition = !legacy && !queue && currentReleaseEditionSources.has(source ?? "");
  const initialReleaseEdition = !legacy && !queue && !zh && !currentReleaseEdition;
  const releaseIndexes = currentReleaseEdition ? [9, 1, 9, 5, 7] : initialReleaseEdition ? [9, 9, 5, 7, 7] : [9, 4, 1, 5, 7];
  const partialReleases = releaseEdition || wideReleaseSource ? Object.fromEntries(releaseIndexes.flatMap((index, position) => cleanReleases[position] ? [] : [[position, releaseEdition ? partialPanelRelease(releaseEdition, position, libraryCovers[index]!) : partialDiscoveryRelease(wideReleaseSource!, position, libraryCovers[index]!)]])) : {};
  const newThisWeek = releaseIndexes.map((index, position) => {
    if (initialReleaseEdition || currentReleaseEdition) {
      if (position === 0) return lemonTangRelease;
      if (currentReleaseEdition && position === 1) return goldenHourRelease;
      if (position === (currentReleaseEdition ? 3 : 2)) return kwnPrideRelease;
      if (position === (currentReleaseEdition ? 4 : 3)) return marenHeroRelease;
      if (initialReleaseEdition && position === 4) return museWowRelease;
    }
    return cleanReleases[position] ?? partialReleases[position]?.card ?? libraryCovers[index]!;
  });
  if (currentReleaseEdition) newThisWeek.push(museWowRelease);
  else if (initialReleaseEdition) newThisWeek.push(initialReleaseContinuation);
  // Ordinary sidebar navigation has no fixture ID; retain the current catalog artwork.
  const currentReleaseSource = !m.scene.panel && !legacy && !queue ? (zh ? "be864051" : "e72be564") : undefined;
  const releaseStripSource = source && (["e72be564", "f2e44e3b", "be864051", "e027fe6d"].includes(source) || currentReleaseEditionSources.has(source)) ? source : currentReleaseSource;
  const panelReleaseSource = releaseEdition;
  const releaseArtOverlays: Partial<Record<number, Artwork>> | undefined = panelReleaseSource || wideReleaseSource
    ? Object.fromEntries(Object.entries(partialReleases).map(([index, value]) => [index, value.overlay]))
    : releaseStripSource
      ? Object.fromEntries([0, 1, 2, 3, 4].map(position => [position, releaseFragmentOverlay(releaseStripSource, position)]))
      : undefined;
  return <div ref={underlay.ref} className="page-content new-page capture-discovery" data-catalog={queue ? "queue" : legacy ? "legacy" : "current"} data-feature-scrolled={featureIndex > 0 || undefined} data-feature-underlay={(featureIndex > 0 && underlay.visible) || undefined} data-feature-alpha={alphaActive || undefined} data-viral-rail-active={initialViralPointer || undefined}><h1>{zh ? "新发现" : "New"}</h1>
    <Rail label="Featured music" className="feature-rail" initialIndex={initialIndex} onPositionChange={setFeatureIndex}>{featureCards.map((card, index) => <article className="feature-card" key={card.id} data-feature-partial={card.metadataPartial || undefined}><div className="feature-caption"><small>{card.kicker}</small><button type="button" aria-disabled={card.metadataPartial || undefined} aria-label={card.metadataPartial ? "Archived feature continuation; metadata is outside the frozen reference frame" : undefined} onClick={() => { if (!card.metadataPartial) m.go(zh ? card.destination : card.id === "singapore" ? "chart" : `category:${card.title}`); }}>{card.title}</button><span>{card.subtitle || "\u00a0"}</span></div><button className="card-art-button" type="button" aria-disabled={card.metadataPartial || undefined} aria-label={card.metadataPartial ? "Archived feature artwork; only the visible source fragment is available" : `Open ${card.title}`} onClick={() => { if (!card.metadataPartial) m.go(zh ? card.destination : card.id === "singapore" ? "chart" : `category:${card.title}`); }}><Art art={card.art} label={card.metadataPartial ? "Partial archived feature artwork" : card.title} />{alphaActive && index === featureIndex - 1 && <AlphaPreviousEdge />}{alphaActive && card.id === "new-music-daily" && <AlphaNextEdge />}</button></article>)}</Rail>
    <Section title="Favourite These Viral Hits" icon="star" className="viral-hits-section" onMore={() => m.go("chart")}><Rail label="Viral songs" className="song-rail"><div className="viral-grid">{visibleSongs.map(track => <SongRow key={track.id} track={track} showFavourite={legacy || queue || zh} showAdd={(!legacy && !queue && m.scene.hero === "listening") || source === "6ac70c34"} />)}</div></Rail></Section>
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
  // The art-only crop includes the complete note shadow, ending before offer copy.
  if (m.scene.guest) return <div className="membership-home capture-membership"><div className="brand"><Glyph name="apple" />Music</div><h1>Discover new music<br />every day.</h1><Art art={crop("aefa8502", 246, 220, 1194, 488)} label="Apple Music discovery illustration" className="membership-hero-art" /><p>Get playlists and albums inspired by the artists and genres you’re listening to. 1 month free, then $10.99/month.</p><button type="button" className="pill white" onClick={() => m.patch({ overlay: "signin" })}>Try It Free</button></div>;
  return <div ref={underlay.ref} className="page-content home-page capture-home" data-home-scrolled={laterFrame || undefined} data-home-underlay={(laterFrame && underlay.visible) || undefined}><h1>{zh ? "主页" : "Home"}</h1><Section title={zh ? "专属精选推荐" : "Top Picks for You"}><Cards cards={topPickCards} artContents={!zh && laterFrame ? { alex: <StationArtwork /> } : undefined} label="Top picks" className="poster-rail" poster initialIndex={m.scene.hero === "alpha" ? 3 : 0} onPositionChange={setHomeIndex} /></Section><Section title={zh ? "最近播放" : "Recently Played"} onMore={() => m.go("library")}><Cards cards={zh ? localizedRecents : homeRecents} label="Recently played" /></Section><Section title={zh ? "运动健身" : "Pop"} onMore={() => m.go(zh ? "category:Fitness" : "category:Pop")}><Cards cards={libraryCovers.filter((_, i) => i > 3 && i !== 8)} label="Pop" /></Section>{!zh && <Section title="Top 100" className="home-top-100" onMore={() => m.go("chart")}><Cards cards={homeTop100} label="Top 100" artOverlays={homeTop100Overlays} artOverlayPosition="bottom" /></Section>}<Section title={zh ? "加入资料库" : "Add to Your Library"} id="add-library"><p className={styles.additionsDescription}>The best recent albums we love.</p><Cards cards={homeAdditions} label="Albums for your library" /></Section>{!hideConcerts && <Section title="Concerts"><div className={styles.concertCard}><div><span><Glyph name="concert-tickets" size={30} /></span><div><h3>Find Concerts Nearby</h3><p>Upcoming shows will appear here.</p></div></div><IconButton icon="close" label="Dismiss concert suggestion" onClick={() => setHideConcerts(true)} /><button type="button" className={styles.setLocation} onClick={() => m.go("concerts")}>Set Location</button></div></Section>}<Footer /></div>;
}
