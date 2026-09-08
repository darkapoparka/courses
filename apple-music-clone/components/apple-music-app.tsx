"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  flows,
  getScreenOverlay,
  getScreenVariant,
  screenIndex,
  type FlowSlug,
  type OverlayKind,
  type ScreenVariant,
} from "../lib/reference";
import { Icon, type IconName } from "./icons";

type View =
  | "home"
  | "new"
  | "search"
  | "library"
  | "radio"
  | "concerts"
  | "artist"
  | "playlist"
  | "lyrics"
  | "marketing"
  | "screen"
  | "flow";

type Scene = {
  view: View;
  screenId?: string;
  flow?: FlowSlug;
  step?: number;
};

export type AppleMusicAppProps = {
  initialScene: Scene;
};

type Track = {
  title: string;
  artist: string;
  album: string;
  time: string;
  tone: string;
};

const tracks: Track[] = [
  { title: "stupid song", artist: "Olivia Rodrigo", album: "you seem pretty sad for a girl so in love", time: "3:38", tone: "blue" },
  { title: "Olivia Rodrigo", artist: "Olivia Rodrigo", album: "SOUR", time: "3:28", tone: "pink" },
  { title: "End of Beginning", artist: "Djo", album: "DECIDE", time: "2:39", tone: "dark" },
  { title: "Houdini", artist: "Dua Lipa", album: "Radical Optimism", time: "3:05", tone: "violet" },
  { title: "So Far Gone (feat. ...) ", artist: "Olivia Dean", album: "The Art of Loving", time: "2:49", tone: "green" },
  { title: "Mat Kearney", artist: "Olivia Dean", album: "The Art of Loving", time: "3:04", tone: "yellow" },
  { title: "The Fate of Ophelia", artist: "Taylor Swift", album: "The Life of a Showgirl", time: "3:41", tone: "plum" },
  { title: "Love Me Not", artist: "Ravyn Lenae", album: "Bird's Eye", time: "3:33", tone: "orange" },
  { title: "WILDFLOWER", artist: "Billie Eilish", album: "HIT ME HARD AND SOFT", time: "4:21", tone: "green" },
  { title: "BIRDS OF A FEATHER", artist: "Billie Eilish", album: "HIT ME HARD AND SOFT", time: "3:30", tone: "blue" },
  { title: "Good Grief", artist: "Sara Bareilles", album: "Good Grief", time: "3:11", tone: "red" },
  { title: "WILDCHILD", artist: "Alex Warren", album: "WILDCHILD", time: "3:02", tone: "orange" },
];

const categories = [
  "Apple Music Radio",
  "Concerts",
  "Apple Music Live",
  "K-Pop",
  "J-Pop",
  "Hip-Hop/Rap",
  "Replay Monthly",
  "Charts",
  "Sing",
  "T-Pop",
  "Thai Music",
  "Indonesian Music",
  "Malayalam Music",
  "Mandopop",
  "Classical",
  "Spatial Audio",
];

const concerts = [
  ["Wale", "The 4orty / Washington", "red"],
  ["Ella Langley", "The Anthem / Washington", "orange"],
  ["J. Cole", "Capital One Arena", "dark"],
  ["Bad Bunny", "MetLife Stadium", "blue"],
  ["Alex Warren", "The Anthem", "yellow"],
  ["Don Toliver", "United Center", "plum"],
  ["Evanescence", "Capital One Arena", "violet"],
  ["Twenty One Revial", "The Fillmore", "green"],
] as const;

const navGroups: { label?: string; items: { id: View; label: string; icon: IconName }[] }[] = [
  {
    items: [
      { id: "search", label: "Search", icon: "search" },
      { id: "home", label: "Home", icon: "home" },
      { id: "new", label: "New", icon: "sparkle" },
      { id: "radio", label: "Radio", icon: "radio" },
    ],
  },
  {
    label: "Library",
    items: [
      { id: "library", label: "Recently Added", icon: "clock" },
      { id: "artist", label: "Artists", icon: "user" },
      { id: "playlist", label: "Albums", icon: "disc" },
      { id: "library", label: "Songs", icon: "music" },
      { id: "home", label: "Music Videos", icon: "video" },
      { id: "home", label: "Made for You", icon: "heart" },
    ],
  },
  {
    label: "Playlists",
    items: [
      { id: "playlist", label: "All Playlists", icon: "playlist" },
      { id: "playlist", label: "Favourite Songs", icon: "heart" },
      { id: "playlist", label: "Emotions Songs", icon: "sparkle" },
    ],
  },
];

const mobileNav: { id: View; label: string; icon: IconName }[] = [
  { id: "search", label: "Search", icon: "search" },
  { id: "home", label: "Home", icon: "home" },
  { id: "new", label: "New", icon: "sparkle" },
  { id: "radio", label: "Radio", icon: "radio" },
];

function sceneFromLocation(fallback: Scene): Scene {
  if (typeof window === "undefined") return fallback;
  const path = window.location.pathname;
  if (path.startsWith("/screen/")) {
    return { view: "screen", screenId: decodeURIComponent(path.slice("/screen/".length)) };
  }
  if (path.startsWith("/flows/")) {
    const flowParam = path.slice("/flows/".length);
    const flow: FlowSlug = flowParam === "starting-a-trial" || flowParam === "new" ? flowParam : "onboarding";
    const step = Number.parseInt(new URLSearchParams(window.location.search).get("step") ?? "0", 10);
    return { view: "flow", flow, step: Number.isFinite(step) ? step : 0 };
  }
  const view = new URLSearchParams(window.location.search).get("view") as View | null;
  return view && ["home", "new", "search", "library", "radio", "concerts", "artist", "playlist", "lyrics", "marketing"].includes(view)
    ? { view }
    : fallback;
}

function scenePath(scene: Scene) {
  if (scene.view === "screen" && scene.screenId) return `/screen/${scene.screenId}`;
  if (scene.view === "flow" && scene.flow) return `/flows/${scene.flow}?step=${scene.step ?? 0}`;
  return scene.view === "home" ? "/" : `/?view=${scene.view}`;
}

function Art({ label, tone = "red", className = "" }: { label: string; tone?: string; className?: string }) {
  return (
    <div className={`art art--${tone} ${className}`} role="img" aria-label={`${label} artwork`}>
      <span className="art-label">{label}</span>
    </div>
  );
}

function Sidebar({ activeView, onNavigate, onSignIn }: { activeView: View; onNavigate: (view: View) => void; onSignIn: () => void }) {
  const isCurrent = (item: { id: View; label: string }) => {
    if (item.id !== activeView) return false;
    if (activeView === "home") return item.label === "Home";
    if (activeView === "library") return item.label === "Songs";
    if (activeView === "playlist") return item.label === "All Playlists";
    return true;
  };
  return (
    <aside className="app-sidebar" aria-label="Apple Music navigation">
      <button className="brand" type="button" onClick={() => onNavigate("home")} aria-label="Apple Music home">
        <span className="brand-mark">♪</span>
        <span>Music</span>
      </button>
      <nav className="sidebar-nav">
        {navGroups.map((group, groupIndex) => (
          <div className={group.label ? "sidebar-group" : "sidebar-nav"} key={group.label ?? groupIndex}>
            {group.label ? <p className="sidebar-label">{group.label}</p> : null}
            {group.items.map((item, itemIndex) => (
              <button
                className="nav-item"
                type="button"
                key={`${item.label}-${itemIndex}`}
                aria-current={isCurrent(item) ? "page" : undefined}
                onClick={() => onNavigate(item.id)}
              >
                <Icon name={item.icon} size={15} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="open-music" type="button" onClick={() => onNavigate("home")}>
          <Icon name="external" size={14} />
          <span>Open in Music</span>
        </button>
        <button className="signin-button" type="button" onClick={onSignIn}>
          <Icon name="user" size={15} />
          <span>Sign In</span>
        </button>
      </div>
    </aside>
  );
}

function MobileHeader({ activeView, onNavigate, onSignIn }: { activeView: View; onNavigate: (view: View) => void; onSignIn: () => void }) {
  return (
    <header className="mobile-header">
      <div className="mobile-header-top">
        <button className="brand" type="button" onClick={() => onNavigate("home")}>
          <span className="brand-mark">♪</span>
          <span>Music</span>
        </button>
        <div className="mobile-header-actions">
          <button className="icon-button" type="button" aria-label="Open search" onClick={() => onNavigate("search")}>
            <Icon name="search" size={18} />
          </button>
          <button className="icon-button" type="button" aria-label="Sign in" onClick={onSignIn}>
            <Icon name="user" size={18} />
          </button>
        </div>
      </div>
      <nav className="mobile-header-nav" aria-label="Primary navigation">
        {mobileNav.map((item) => <button key={item.id} className="mobile-header-nav-item" type="button" aria-current={activeView === item.id ? "page" : undefined} onClick={() => onNavigate(item.id)}><Icon name={item.icon} size={14} /><span>{item.label}</span></button>)}
      </nav>
      <div className="sr-only" aria-live="polite">{activeView}</div>
    </header>
  );
}

function Section({ title, action, children }: { title: string; action?: string; children: ReactNode }) {
  return (
    <section className="section-block">
      <div className="section-heading">
        <h2>{title}</h2>
        {action ? <button type="button">{action} <span aria-hidden="true">›</span></button> : null}
      </div>
      {children}
    </section>
  );
}

function FeatureCard({ tone, kicker, title, copy, label }: { tone: string; kicker: string; title: string; copy: string; label: string }) {
  return (
    <article className={`feature-card feature-card--${tone}`}>
      <span className="hero-art-label">{label}</span>
      <div className="feature-card-content">
        <p className="feature-card-kicker">{kicker}</p>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
    </article>
  );
}

function SongRow({ track, active, onPlay, onMore }: { track: Track; active?: boolean; onPlay: () => void; onMore?: () => void }) {
  return (
    <div className="song-row" data-active={active} role="button" tabIndex={0} onClick={onPlay} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onPlay(); }}>
      <Art label={track.title.slice(0, 5)} tone={track.tone} className="song-row-art" />
      <div className="song-row-copy">
        <strong className="song-row-title">{track.title}</strong>
        <span className="song-row-artist">{track.artist}</span>
      </div>
      <span className="song-row-time">{track.time}</span>
      {onMore ? <button className="icon-button" type="button" aria-label={`More actions for ${track.title}`} onClick={(event) => { event.stopPropagation(); onMore(); }}><Icon name="more" size={16} /></button> : null}
    </div>
  );
}

function NewView({ onPlay, activeTrack, onMore }: { onPlay: (track: Track) => void; activeTrack: Track; onMore?: (track: Track) => void }) {
  return (
    <div className="content-measure">
      <div className="page-heading">
        <div>
          <h1>New</h1>
          <p>Discover the artists, albums, playlists, and stories moving music forward.</p>
        </div>
      </div>
      <div className="hero-rail">
        <FeatureCard tone="superbloom" kicker="Featured album" title="SUPERBLOOM" copy="New music from the artists shaping the week." label="SUPERBLOOM" />
        <FeatureCard tone="anniversary" kicker="Essentials album" title="Essentials Anniversaries" copy="Milestones, remastered and ready to revisit." label="5 YEARS" />
      </div>
      <Section title="Favourite These Viral Hits" action="See All">
        <div className="song-rail">
          {tracks.slice(0, 9).map((track) => <SongRow key={track.title} track={track} active={activeTrack.title === track.title} onPlay={() => onPlay(track)} onMore={onMore ? () => onMore(track) : undefined} />)}
        </div>
      </Section>
      <Section title="New This Week" action="See All">
        <div className="rail">
          {[
            ["Tap 100 Singapore", "Apple Music", "red"],
            ["No Sleep in Paradise", "Singapore", "dark"],
            ["So Sick Live from Apple Music Studios", "Apple Music", "orange"],
            ["New Music Daily", "Apple Music", "blue"],
            ["Fresh Sounds", "New releases", "violet"],
          ].map(([title, meta, tone]) => (
            <article className="rail-card" key={title}>
              <Art label={title.split(" ").slice(0, 2).join(" ")} tone={tone} className="rail-card-art" />
              <strong className="rail-card-title">{title}</strong>
              <span className="rail-card-meta">{meta}</span>
            </article>
          ))}
        </div>
      </Section>
      <Section title="More to Explore">
        <div className="category-grid">
          {categories.slice(0, 8).map((category) => <button className="category-tile" type="button" key={category}>{category}</button>)}
        </div>
      </Section>
    </div>
  );
}

function HomeView({ onNavigate, onPlay, activeTrack }: { onNavigate: (view: View) => void; onPlay: (track: Track) => void; activeTrack: Track }) {
  return (
    <div className="content-measure">
      <div className="page-heading">
        <div>
          <h1>Home</h1>
          <p>Listen to the songs, albums, and playlists you love.</p>
        </div>
        <div className="page-heading-actions"><button className="button-secondary" type="button" onClick={() => onNavigate("search")}><Icon name="search" size={15} /> Browse</button></div>
      </div>
      <div className="hero-rail">
        <FeatureCard tone="singapore" kicker="Daily Top 100" title="Top 100 Singapore" copy="The songs everyone is listening to right now." label="TOP 100" />
        <FeatureCard tone="paradise" kicker="New album" title="No Sleep in Paradise" copy="A new world is waiting in every song." label="NEW MUSIC" />
      </div>
      <Section title="Favourite These Viral Hits" action="See All">
        <div className="song-rail">
          {tracks.slice(0, 8).map((track) => <SongRow key={track.title} track={track} active={activeTrack.title === track.title} onPlay={() => onPlay(track)} />)}
        </div>
      </Section>
      <Section title="Listen Again" action="See All">
        <div className="rail">
          {["Good Grief", "WILDCHILD", "The Art of Loving", "HIT ME HARD AND SOFT", "SOUR"].map((title, index) => (
            <article className="rail-card" key={title}>
              <Art label={title} tone={tracks[index + 4]?.tone ?? "red"} className="rail-card-art" />
              <strong className="rail-card-title">{title}</strong>
              <span className="rail-card-meta">Recently played</span>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}

function SearchView({ query, setQuery, onPlay }: { query: string; setQuery: (value: string) => void; onPlay: (track: Track) => void }) {
  const filtered = tracks.filter((track) => `${track.title} ${track.artist} ${track.album}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="content-measure">
      <div className="page-heading">
        <div>
          <h1>Search</h1>
          <p>Find artists, albums, songs, playlists, and more.</p>
        </div>
      </div>
      <label className="search-bar" htmlFor="search-input">
        <Icon name="search" size={17} />
        <input id="search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Apple Music" autoComplete="off" />
      </label>
      {query ? (
        <div className="search-results" aria-live="polite">
          {filtered.length ? filtered.map((track) => <SongRow key={`${track.title}-${track.artist}`} track={track} onPlay={() => onPlay(track)} />) : <div className="empty-state"><div><strong>No results</strong>Try another search.</div></div>}
        </div>
      ) : (
        <>
          <Section title="Recently Searched">
            <div className="rail">
              <article className="rail-card"><Art label="Ariana Grande" tone="dark" className="rail-card-art" /><strong className="rail-card-title">Ariana Grande</strong><span className="rail-card-meta">Artist</span></article>
              <article className="rail-card"><Art label="Billie Eilish" tone="blue" className="rail-card-art" /><strong className="rail-card-title">Billie Eilish</strong><span className="rail-card-meta">Artist</span></article>
            </div>
          </Section>
          <Section title="Browse Categories">
            <div className="category-grid">
              {categories.map((category) => <button className="category-tile" type="button" key={category}>{category}</button>)}
            </div>
          </Section>
        </>
      )}
    </div>
  );
}

function TrackTable({ onPlay, activeTrack, onMore, title = "Songs" }: { onPlay: (track: Track) => void; activeTrack: Track; onMore?: (track: Track) => void; title?: string }) {
  return (
    <div className="table-shell" aria-label={title}>
      <div className="table-heading"><span>#</span><span>Title</span><span>Artist</span><span>Album</span><span>Time</span><span /></div>
      {tracks.map((track, index) => (
        <div className="table-row" data-active={activeTrack.title === track.title} key={`${track.title}-${index}`} role="button" tabIndex={0} onClick={() => onPlay(track)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onPlay(track); }}>
          <span>{index + 1}</span>
          <div className="track-cell"><Art label={track.title.slice(0, 3)} tone={track.tone} className="song-row-art" /><div className="track-cell-copy"><strong>{track.title}</strong><span>{track.artist}</span></div></div>
          <span>{track.artist}</span>
          <span>{track.album}</span>
          <span>{track.time}</span>
          {onMore ? <button className="icon-button" type="button" aria-label={`More actions for ${track.title}`} onClick={(event) => { event.stopPropagation(); onMore(track); }}><Icon name="more" size={16} /></button> : <span />}
        </div>
      ))}
    </div>
  );
}

function LibraryView({ onPlay, activeTrack, onMore }: { onPlay: (track: Track) => void; activeTrack: Track; onMore: (track: Track) => void }) {
  return (
    <div className="content-measure">
      <div className="page-heading"><div><h1>Songs</h1><p>Your library, ready when you are.</p></div><div className="page-heading-actions"><button className="button-secondary" type="button"><Icon name="shuffle" size={15} /> Shuffle</button></div></div>
      <TrackTable onPlay={onPlay} activeTrack={activeTrack} onMore={onMore} />
    </div>
  );
}

function PlaylistView({ onPlay, activeTrack, onMore }: { onPlay: (track: Track) => void; activeTrack: Track; onMore?: (track: Track) => void }) {
  return (
    <div className="content-measure">
      <div className="artist-hero"><div className="artist-avatar"><Art label="Favourite" tone="pink" className="artist-avatar" /></div><div><p className="feature-card-kicker">Playlist</p><h1>Favourite These Viral Hits</h1><p>Olivia Rodrigo, Taylor Swift, Billie Eilish, and more.</p><div className="page-heading-actions" style={{ marginTop: 16 }}><button className="button-primary" type="button" onClick={() => onPlay(tracks[0])}><Icon name="play" size={14} /> Play</button><button className="button-secondary" type="button"><Icon name="heart" size={14} /> Add</button></div></div></div>
      <div style={{ height: 24 }} />
      <TrackTable onPlay={onPlay} activeTrack={activeTrack} onMore={onMore} title="Favourite These Viral Hits" />
    </div>
  );
}

function RadioView({ onPlay, activeTrack }: { onPlay: (track: Track) => void; activeTrack: Track }) {
  return (
    <div className="content-measure">
      <div className="page-heading"><div><h1>Radio</h1><p>Live stations, shows, and new episodes from Apple Music.</p></div></div>
      <div className="hero-rail"><FeatureCard tone="red" kicker="Live now" title="Apple Music 1" copy="The world's biggest artists, live and on demand." label="RADIO" /><FeatureCard tone="violet" kicker="Featured show" title="The Zane Lowe Show" copy="Interviews, premieres, and the stories behind the music." label="LIVE" /></div>
      <Section title="Listen to Live Radio Now"><div className="rail">{["Apple Music 1", "Apple Music Hits", "Apple Music Country", "Apple Música Uno", "Apple Music Club"].map((title, index) => <article className="rail-card" key={title}><Art label="Music" tone={tracks[index].tone} className="rail-card-art" /><strong className="rail-card-title">{title}</strong><span className="rail-card-meta">Apple Music</span></article>)}</div></Section>
      <Section title="New Radio Episodes"><div className="song-rail">{tracks.slice(0, 6).map((track) => <SongRow key={track.title} track={track} active={activeTrack.title === track.title} onPlay={() => onPlay(track)} />)}</div></Section>
    </div>
  );
}

function ArtistView({ onPlay, activeTrack }: { onPlay: (track: Track) => void; activeTrack: Track }) {
  return (
    <div className="content-measure">
      <div className="artist-hero"><div className="artist-avatar" /><div><p className="feature-card-kicker">Artist</p><h1>Olivia Rodrigo</h1><p>California · Pop</p><div className="page-heading-actions" style={{ marginTop: 16 }}><button className="button-primary" type="button" onClick={() => onPlay(tracks[0])}><Icon name="play" size={14} /> Play</button><button className="button-secondary" type="button"><Icon name="heart" size={14} /> Follow</button></div></div></div>
      <div className="credit-groups"><div className="credit-group"><strong>Composition &amp; Lyrics</strong><div className="credit-people"><span className="credit-person"><i className="credit-dot" />Olivia Rodrigo</span><span className="credit-person"><i className="credit-dot" />Daniel Nigro</span></div></div><div className="credit-group"><strong>Production &amp; Engineering</strong><div className="credit-people"><span className="credit-person"><i className="credit-dot" />Daniel Nigro</span><span className="credit-person"><i className="credit-dot" />Chris Kasych</span><span className="credit-person"><i className="credit-dot" />Miley McCarthy</span></div></div></div>
      <Section title="More by Olivia Rodrigo"><div className="rail">{["you seem pretty sad for a girl so in love", "SOUR", "brutal", "GUTS", "bad idea right?"].map((title, index) => <article className="rail-card" key={title}><Art label={title} tone={tracks[index].tone} className="rail-card-art" /><strong className="rail-card-title">{title}</strong><span className="rail-card-meta">Olivia Rodrigo</span></article>)}</div></Section>
      <Section title="Top Songs"><div className="song-rail">{tracks.slice(0, 8).map((track) => <SongRow key={track.title} track={track} active={activeTrack.title === track.title} onPlay={() => onPlay(track)} />)}</div></Section>
    </div>
  );
}

function LyricsView({ onPlay, activeTrack }: { onPlay: (track: Track) => void; activeTrack: Track }) {
  return (
    <div className="content-measure">
      <div className="page-heading"><div><h1>you seem pretty sad for a girl so in love</h1><p>Olivia Rodrigo · The Art of Loving</p></div><button className="button-primary" type="button" onClick={() => onPlay(tracks[0])}><Icon name="play" size={14} /> Play</button></div>
      <div className="lyrics-copy" style={{ maxWidth: 720, borderLeft: "0", borderTop: "1px solid var(--border)", padding: "24px 0" }}><strong>you seem pretty sad for a girl so in love</strong><span>Olivia Rodrigo</span><span>you seem pretty sad for a girl so in love<br />my friends are smoking blunts in the bathroom<br />they say that honest love is a cage that makes you feel free</span><span>and all the girls at this party are so cool<br />I don't know what to do with myself<br />when the music fades away</span><span>Keep the story moving. Press play to return to the player.</span></div>
      <Section title="Next in your queue"><div className="song-rail">{tracks.slice(1, 6).map((track) => <SongRow key={track.title} track={track} active={activeTrack.title === track.title} onPlay={() => onPlay(track)} />)}</div></Section>
    </div>
  );
}

function ConcertsView() {
  const [city, setCity] = useState("Chicago");
  return (
    <div className="content-measure">
      <div className="page-heading"><div><h1>Concerts</h1><p>Discover concerts near you.</p></div><button className="button-secondary" type="button"><Icon name="calendar" size={15} /> View calendar</button></div>
      <div className="concert-filter">{["Chicago", "Jul 1 – Jul 17", "Genres"].map((label, index) => <button key={label} className="chip-button" type="button" aria-pressed={index === 0 && city === "Chicago"} onClick={() => index === 0 && setCity(city === "Chicago" ? "New York" : "Chicago")}>{label}</button>)}</div>
      <Section title={`Popular in ${city}`}><div className="concert-grid">{concerts.slice(0, 5).map(([artist, venue, tone], index) => <article className="concert-card" key={artist}><Art label={artist} tone={tone} className="concert-art" /><div className="concert-copy"><strong>{artist}</strong><span>{venue}</span><span>May {10 + index}, 7:00 PM</span></div></article>)}</div></Section>
      <Section title="All Upcoming"><div className="upcoming-grid">{concerts.map(([artist, venue], index) => <article className="upcoming-item" key={`${artist}-${venue}`}><div className="date-tile"><strong>{10 + index}</strong><span>May</span></div><div className="upcoming-copy"><strong>{artist}</strong><span>{venue} · {city}</span></div><Icon name="chevron" size={17} /></article>)}</div></Section>
    </div>
  );
}

function MarketingView({ onStart }: { onStart: () => void }) {
  return <div className="content-measure"><div className="marketing-hero"><div><p className="feature-card-kicker">Music</p><h1>Discover new music every day.</h1><span className="music-note" aria-hidden="true">♪</span><p className="marketing-note">Get playlists and albums inspired by the artists and genres you're listening to. 1 month free, then $10.99/month.</p><button className="button-secondary" type="button" onClick={onStart}>Try It Free</button></div></div></div>;
}

function QueuePanel({ activeTrack, onClose, onPlay }: { activeTrack: Track; onClose: () => void; onPlay: (track: Track) => void }) {
  return <aside className="queue-panel" aria-label="Up Next" role="dialog" aria-modal="true"><div className="queue-heading"><div><h2>Up Next</h2><span className="song-row-artist">Playing after {activeTrack.title}</span></div><button className="icon-button" type="button" aria-label="Close queue" onClick={onClose}><Icon name="close" size={18} /></button></div><div className="queue-list">{tracks.slice(1, 8).map((track) => <SongRow key={track.title} track={track} onPlay={() => onPlay(track)} />)}</div></aside>;
}

function Player({ activeTrack, isPlaying, setIsPlaying, onQueue, onLyrics }: { activeTrack: Track; isPlaying: boolean; setIsPlaying: (value: boolean) => void; onQueue: () => void; onLyrics: () => void }) {
  return <div className="player-bar" role="region" aria-label="Music player"><div className="player-track"><Art label={activeTrack.title.slice(0, 4)} tone={activeTrack.tone} className="player-track-art" /><div className="player-copy"><strong>{activeTrack.title}</strong><span>{activeTrack.artist}</span></div></div><div className="player-controls"><button className="icon-button" type="button" aria-label="Shuffle"><Icon name="shuffle" size={15} /></button><button className="icon-button" type="button" aria-label="Previous"><Icon name="previous" size={15} /></button><button className="player-play" type="button" aria-label={isPlaying ? "Pause" : "Play"} onClick={() => setIsPlaying(!isPlaying)}><Icon name={isPlaying ? "pause" : "play"} size={15} /></button><button className="icon-button" type="button" aria-label="Next"><Icon name="next" size={15} /></button><button className="icon-button" type="button" aria-label="Repeat"><Icon name="repeat" size={15} /></button></div><div className="player-tools"><button className="icon-button" type="button" aria-label="Lyrics" onClick={onLyrics}><Icon name="music" size={15} /></button><button className="icon-button" type="button" aria-label="Up Next" onClick={onQueue}><Icon name="queue" size={15} /></button><button className="icon-button" type="button" aria-label="Volume"><Icon name="volume" size={15} /></button></div><div className="progress-line" aria-hidden="true"><span /></div></div>;
}

function TrialBanner({ onStart }: { onStart: () => void }) {
  return <aside className="trial-banner" aria-label="Apple Music trial offer"><div className="trial-copy"><strong>Get over 100 million songs free for 1 month.</strong><span>Plus your entire music library on all your devices. 1 month free, then $10.99/month.</span></div><button className="button-secondary" type="button" onClick={onStart}>Try It Free</button></aside>;
}

function ModalShell({ title, children, onClose, className = "" }: { title: string; children: ReactNode; onClose: () => void; className?: string }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className={`modal-card ${className}`} role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" type="button" aria-label="Close dialog" onClick={onClose}><Icon name="close" size={16} /></button><div className="modal-brand"><span className="brand-mark">♪</span></div><h2 id="modal-title">{title}</h2>{children}</section></div>;
}

function AccountDialog({ kind, onClose, onAdvance }: { kind: "create" | "email" | "verification"; onClose: () => void; onAdvance: (kind: OverlayKind) => void }) {
  if (kind === "verification") return <ModalShell title="Enter Verification Code" onClose={onClose}><p>Enter the code we sent to your email address.</p><div className="code-grid">{Array.from({ length: 6 }, (_, index) => <input key={index} aria-label={`Verification digit ${index + 1}`} inputMode="numeric" maxLength={1} defaultValue={index < 2 ? String(index + 9) : ""} />)}</div><div className="modal-actions"><button className="button-secondary" type="button" onClick={() => onAdvance("email")}>Back</button><button className="button-primary" type="button" onClick={() => onAdvance("subscription")}>Continue</button></div></ModalShell>;
  if (kind === "email") return <ModalShell title="Continue with Email Address" onClose={onClose}><p>We'll use your email to create an Apple Account for Apple Music.</p><div className="modal-form"><div className="field"><label htmlFor="account-email">Apple Account</label><input id="account-email" type="email" placeholder="name@example.com" autoFocus /></div><div className="modal-actions"><button className="button-secondary" type="button" onClick={() => onAdvance("create")}>Back</button><button className="button-primary" type="button" onClick={() => onAdvance("verification")}>Continue</button></div></div></ModalShell>;
  return <ModalShell title="Create your account" onClose={onClose}><p>You'll use this account to access Apple services.</p><div className="modal-form"><div className="field"><label htmlFor="account-name">Apple Account</label><input id="account-name" type="email" placeholder="name@example.com" autoFocus /></div><div className="field"><label htmlFor="account-password">Password</label><input id="account-password" type="password" placeholder="••••••••" /></div><div className="field"><label htmlFor="first-name">First name</label><input id="first-name" placeholder="Alex" /></div><div className="field"><label htmlFor="last-name">Last name</label><input id="last-name" placeholder="Smith" /></div><div className="modal-actions"><button className="button-secondary" type="button" onClick={onClose}>Back</button><button className="button-primary" type="button" onClick={() => onAdvance("email")}>Continue</button></div></div></ModalShell>;
}

function TrialDialog({ kind, onClose, onAdvance }: { kind: "subscription" | "payment" | "billing" | "confirm"; onClose: () => void; onAdvance: (kind: OverlayKind) => void }) {
  if (kind === "subscription") return <ModalShell title="Choose a plan" onClose={onClose}><p>Enjoy one month free, then choose the plan that fits your listening.</p><div className="subscription-card"><div className="subscription-card-row"><strong>Individual</strong><span>$10.99 / month</span></div><span>Apple Music · 1-month free trial</span></div><div className="modal-actions"><button className="button-primary" type="button" onClick={() => onAdvance("payment")}>Continue</button></div></ModalShell>;
  if (kind === "payment") return <ModalShell title="Payment Method" onClose={onClose}><p>Add a payment method to start your trial.</p><div className="modal-form"><div className="field"><label htmlFor="card-number">Card number</label><input id="card-number" placeholder="1234 5678 9012 3456" inputMode="numeric" autoFocus /></div><div className="modal-form" style={{ gridTemplateColumns: "1fr 1fr" }}><div className="field"><label htmlFor="expiry">Expiry</label><input id="expiry" placeholder="MM / YY" /></div><div className="field"><label htmlFor="security">Security code</label><input id="security" placeholder="CVC" /></div></div><div className="field"><label htmlFor="holder">Cardholder name</label><input id="holder" placeholder="Alex Smith" /></div><div className="modal-actions"><button className="button-secondary" type="button" onClick={() => onAdvance("subscription")}>Back</button><button className="button-primary" type="button" onClick={() => onAdvance("billing")}>Continue</button></div></div></ModalShell>;
  if (kind === "billing") return <ModalShell title="Billing Address" onClose={onClose}><p>Enter the address used for your payment method.</p><div className="modal-form"><div className="modal-form" style={{ gridTemplateColumns: "1fr 1fr" }}><div className="field"><label htmlFor="billing-first">First name</label><input id="billing-first" placeholder="Alex" autoFocus /></div><div className="field"><label htmlFor="billing-last">Last name</label><input id="billing-last" placeholder="Smith" /></div></div><div className="field"><label htmlFor="billing-address">Address</label><input id="billing-address" placeholder="75 Ayer Rajah Crescent" /></div><div className="modal-form" style={{ gridTemplateColumns: "1fr 1fr" }}><div className="field"><label htmlFor="billing-city">City</label><input id="billing-city" placeholder="Singapore" /></div><div className="field"><label htmlFor="billing-postal">Postal code</label><input id="billing-postal" placeholder="139953" /></div></div><div className="modal-actions"><button className="button-secondary" type="button" onClick={() => onAdvance("payment")}>Back</button><button className="button-primary" type="button" onClick={() => onAdvance("confirm")}>Continue</button></div></div></ModalShell>;
  return <ModalShell title="Confirm Subscription" onClose={onClose}><p>Review your trial before you finish.</p><div className="subscription-card"><div className="subscription-card-row"><strong>Music Individual</strong><span>1 Month Free Trial</span></div><div className="subscription-card-row"><span>Then $10.99 per month</span><span>May 08, 2026</span></div></div><p>By continuing, you agree to the Apple Media Services Terms and Conditions.</p><div className="modal-actions"><button className="button-secondary" type="button" onClick={() => onAdvance("billing")}>Back</button><button className="button-primary" type="button" onClick={() => onAdvance(null)}>Start Trial</button></div></ModalShell>;
}

function LyricsDialog({ article, onClose }: { article: boolean; onClose: () => void }) {
  return <ModalShell title={article ? "you seem pretty sad for a girl so in love" : "Lyrics"} onClose={onClose} className="lyrics-panel"><p>Olivia Rodrigo · The Art of Loving</p><div className="lyrics-copy"><strong>you seem pretty sad for a girl so in love</strong><span>Olivia Rodrigo</span><span>A pop song about learning to let your heart lead.</span><span>Olivia Rodrigo has tried and many times since she cried through the suburbs in the bathroom together in a "friends since" life. These songs are a small diary of a life moving quickly.</span><span>With her third album, you seem pretty sad for a girl so in love, Rodrigo is eager to share what she's learned. The story moves from a quiet room to a full chorus.</span><span>Keep listening to find the next line.</span></div></ModalShell>;
}

function ContextMenu({ onClose, onToast }: { onClose: () => void; onToast: (message: string) => void }) {
  const items = [["Add to Playlist", "playlist"], ["Play Next", "next"], ["Play Last", "next"], ["Create Station", "radio"], ["Love", "heart"], ["Show Credits", "user"]] as const;
  return <div className="context-menu" style={{ top: "42%", left: "56%" }} role="menu" aria-label="Song actions">{items.map(([label, icon]) => <button key={label} type="button" role="menuitem" onClick={() => { onToast(`${label} selected`); onClose(); }}><Icon name={icon as IconName} size={15} />{label}</button>)}</div>;
}

function VariantScene({ variant, onNavigate, onPlay, activeTrack, onMore, onStart }: { variant: ScreenVariant; onNavigate: (view: View) => void; onPlay: (track: Track) => void; activeTrack: Track; onMore: (track: Track) => void; onStart: () => void }) {
  switch (variant) {
    case "search": return <SearchView query="" setQuery={() => undefined} onPlay={onPlay} />;
    case "playlist": return <PlaylistView onPlay={onPlay} activeTrack={activeTrack} onMore={onMore} />;
    case "lyrics": return <LyricsView onPlay={onPlay} activeTrack={activeTrack} />;
    case "article": return <PlaylistView onPlay={onPlay} activeTrack={activeTrack} onMore={onMore} />;
    case "concerts": return <ConcertsView />;
    case "marketing": return <MarketingView onStart={onStart} />;
    case "artist": return <ArtistView onPlay={onPlay} activeTrack={activeTrack} />;
    case "songs-menu": return <LibraryView onPlay={onPlay} activeTrack={activeTrack} onMore={onMore} />;
    case "radio": return <RadioView onPlay={onPlay} activeTrack={activeTrack} />;
    case "charts": return <PlaylistView onPlay={onPlay} activeTrack={activeTrack} onMore={onMore} />;
    case "loading": return <NewView onPlay={onPlay} activeTrack={activeTrack} onMore={onMore} />;
    default: return <NewView onPlay={onPlay} activeTrack={activeTrack} onMore={onMore} />;
  }
}

function FlowScene({ scene, onStep, onNavigate, onPlay, activeTrack, onMore, onStart }: { scene: Scene; onStep: (step: number) => void; onNavigate: (view: View) => void; onPlay: (track: Track) => void; activeTrack: Track; onMore: (track: Track) => void; onStart: () => void }) {
  const flow = flows[scene.flow ?? "onboarding"];
  const index = Math.min(Math.max(scene.step ?? 0, 0), flow.steps.length - 1);
  const step = flow.steps[index];
  return <div className="content-measure"><div className="flow-strip"><div><strong>{flow.title}</strong><br /><span>{step.label} · screen {index + 1} of {flow.total}</span></div><div className="flow-controls"><button className="icon-button" type="button" aria-label="Previous flow screen" disabled={index === 0} onClick={() => onStep(index - 1)}><Icon name="arrow-left" size={16} /></button><button className="icon-button" type="button" aria-label="Next flow screen" disabled={index === flow.steps.length - 1} onClick={() => onStep(index + 1)}><Icon name="arrow-right" size={16} /></button></div></div><p className="flow-step-note">{step.note}</p><VariantScene variant={step.variant} onNavigate={onNavigate} onPlay={onPlay} activeTrack={activeTrack} onMore={onMore} onStart={onStart} /></div>;
}

export default function AppleMusicApp({ initialScene }: AppleMusicAppProps) {
  const initialOverlay = initialScene.view === "screen" && initialScene.screenId
    ? getScreenOverlay(getScreenVariant(initialScene.screenId))
    : initialScene.view === "flow"
      ? flows[initialScene.flow ?? "onboarding"].steps[Math.min(initialScene.step ?? 0, flows[initialScene.flow ?? "onboarding"].steps.length - 1)]?.overlay ?? null
      : null;
  const [scene, setScene] = useState<Scene>(initialScene);
  const [overlay, setOverlay] = useState<OverlayKind>(initialOverlay);
  const [queueOpen, setQueueOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState<Track>(tracks[0]);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const parsed = sceneFromLocation(initialScene);
    if (scenePath(parsed) !== scenePath(initialScene)) setScene(parsed);
    const onPopState = () => {
      const next = sceneFromLocation(initialScene);
      setScene(next);
      setOverlay(next.view === "screen" && next.screenId ? getScreenOverlay(getScreenVariant(next.screenId)) : next.view === "flow" ? flows[next.flow ?? "onboarding"].steps[Math.min(next.step ?? 0, flows[next.flow ?? "onboarding"].steps.length - 1)]?.overlay ?? null : null);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [initialScene]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 2300);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (!overlay) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeOverlay();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    if (!queueOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setQueueOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [queueOpen]);

  const navigate = useCallback((next: Scene, replace = false) => {
    if (typeof window !== "undefined") window.history[replace ? "replaceState" : "pushState"]({}, "", scenePath(next));
    setScene(next);
    setQueueOpen(false);
    if (next.view === "screen" && next.screenId) setOverlay(getScreenOverlay(getScreenVariant(next.screenId)));
    else if (next.view === "flow" && next.flow) setOverlay(flows[next.flow].steps[Math.min(next.step ?? 0, flows[next.flow].steps.length - 1)]?.overlay ?? null);
    else setOverlay(null);
  }, []);

  const navigateView = (view: View) => navigate({ view });
  const openOverlay = (kind: OverlayKind) => {
    if (kind) lastTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOverlay(kind);
  };
  function closeOverlay() {
    setOverlay(null);
    window.setTimeout(() => lastTrigger.current?.focus(), 0);
  }
  const advanceOverlay = (kind: OverlayKind) => {
    if (!kind) {
      closeOverlay();
      setToast("Your local trial state is ready.");
      return;
    }
    setOverlay(kind);
  };
  const playTrack = (track: Track) => {
    setActiveTrack(track);
    setIsPlaying(true);
    setToast(`Playing ${track.title}`);
  };
  const startTrial = () => openOverlay("create");
  const activeView: View = scene.view === "screen" ? ({
    new: "new", search: "search", playlist: "playlist", lyrics: "lyrics", article: "playlist", concerts: "concerts", marketing: "home", artist: "artist", "songs-menu": "library", radio: "radio", charts: "new", loading: "new", "account-create": "new", "account-email": "new", verification: "new", subscription: "new", payment: "new", billing: "new", confirm: "new",
  } as Record<ScreenVariant, View>)[getScreenVariant(scene.screenId ?? "")] : scene.view === "flow" ? "new" : scene.view;

  let content: ReactNode;
  if (scene.view === "screen") {
    content = <VariantScene variant={getScreenVariant(scene.screenId ?? "")} onNavigate={navigateView} onPlay={playTrack} activeTrack={activeTrack} onMore={() => openOverlay("context")} onStart={startTrial} />;
  } else if (scene.view === "flow") {
    content = <FlowScene scene={scene} onStep={(step) => navigate({ ...scene, step })} onNavigate={navigateView} onPlay={playTrack} activeTrack={activeTrack} onMore={() => openOverlay("context")} onStart={startTrial} />;
  } else {
    content = {
      home: <HomeView onNavigate={navigateView} onPlay={playTrack} activeTrack={activeTrack} />,
      new: <NewView onPlay={playTrack} activeTrack={activeTrack} onMore={(track) => { setActiveTrack(track); openOverlay("context"); }} />,
      search: <SearchView query={query} setQuery={setQuery} onPlay={playTrack} />,
      library: <LibraryView onPlay={playTrack} activeTrack={activeTrack} onMore={(track) => { setActiveTrack(track); openOverlay("context"); }} />,
      radio: <RadioView onPlay={playTrack} activeTrack={activeTrack} />,
      concerts: <ConcertsView />,
      artist: <ArtistView onPlay={playTrack} activeTrack={activeTrack} />,
      playlist: <PlaylistView onPlay={playTrack} activeTrack={activeTrack} onMore={(track) => { setActiveTrack(track); openOverlay("context"); }} />,
      lyrics: <LyricsView onPlay={playTrack} activeTrack={activeTrack} />,
      marketing: <MarketingView onStart={startTrial} />,
      screen: null,
      flow: null,
    }[scene.view];
  }

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onNavigate={navigateView} onSignIn={() => openOverlay("email")} />
      <MobileHeader activeView={activeView} onNavigate={navigateView} onSignIn={() => openOverlay("email")} />
      <main className="app-content">{content}</main>
      <Player activeTrack={activeTrack} isPlaying={isPlaying} setIsPlaying={setIsPlaying} onQueue={() => setQueueOpen(true)} onLyrics={() => openOverlay("lyrics")} />
      <TrialBanner onStart={startTrial} />
      {queueOpen ? <QueuePanel activeTrack={activeTrack} onClose={() => setQueueOpen(false)} onPlay={playTrack} /> : null}
      {overlay === "context" ? <ContextMenu onClose={closeOverlay} onToast={setToast} /> : null}
      {overlay === "create" || overlay === "email" || overlay === "verification" ? <AccountDialog kind={overlay} onClose={closeOverlay} onAdvance={advanceOverlay} /> : null}
      {overlay === "subscription" || overlay === "payment" || overlay === "billing" || overlay === "confirm" ? <TrialDialog kind={overlay} onClose={closeOverlay} onAdvance={advanceOverlay} /> : null}
      {overlay === "lyrics" || overlay === "article" ? <LyricsDialog article={overlay === "article"} onClose={closeOverlay} /> : null}
      {toast ? <div className="toast" role="status">{toast}</div> : null}
    </div>
  );
}
