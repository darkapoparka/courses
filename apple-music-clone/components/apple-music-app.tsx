"use client";

import { useEffect, useRef, useState } from "react";
import type { Scene } from "../lib/music-scenes";
import { trackById } from "../lib/music-catalog";
import { sourcePlaylistNavigation } from "../lib/reference-chrome";
import { MusicProvider, useMusic } from "./music-context";
import { SidebarGlyph, ProfileAvatar } from "./music-sidebar-icons";
import { VideoPlayer } from "./music-video-player";
import { Art, Glyph, IconButton, type GlyphName } from "./music-primitives";
import { CategoryView } from "./music-browse";
import { AlbumView } from "./music-album";
import { RadioView } from "./music-radio";
import { ArtistView } from "./music-artist";
import { CreditsView } from "./music-credits";
import { MilestonesView, ReplayView } from "./music-replay";
import { ConcertsView, ConcertView, NearbyView } from "./music-concerts";
import { ExpandedPlayer, Player, PlayerPanel } from "./music-player";
import { SettingsView, ConnectedView, SubscriptionView } from "./music-account";
import { ChartView, ScheduleView } from "./music-chart-schedule";
import { SearchView } from "./music-search";
import { NewView, HomeView } from "./music-discovery";
import { MusicOverlays } from "./music-overlays";
import { MusicMenus } from "./music-menus";
import { LibraryView } from "./music-library";
import { PlaylistView } from "./music-playlist";

const libraryItems: [string, string, GlyphName, string][] = [
  ["library", "Recently Added", "recent", "最近添加"], ["artists", "Artists", "artist", "艺人"],
  ["albums", "Albums", "albums", "专辑"], ["songs", "Songs", "song", "歌曲"],
  ["videos", "Music Videos", "video", "音乐视频"], ["made-for-you", "Made for You", "made-for-you", "专属推荐"],
];
function Content() {
  const { scene } = useMusic();
  if (scene.checkout) return <div className="checkout-background" />;
  switch (scene.page) {
    case "new": return <NewView />;
    case "home": return <HomeView />;
    case "search": return <SearchView />;
    case "album": return <AlbumView />;
    case "playlist": case "favourites": return <PlaylistView />;
    case "artist": return <ArtistView />;
    case "chart": return <ChartView />;
    case "radio": return <RadioView />;
    case "schedule": return <ScheduleView />;
    case "concerts": return <ConcertsView />;
    case "concert": return <ConcertView />;
    case "nearby": return <NearbyView />;
    case "replay": return <ReplayView />;
    case "milestones": case "milestone": return <MilestonesView />;
    case "library": case "artists": case "albums": case "songs": case "videos": case "made-for-you": case "playlists": return <LibraryView />;
    case "settings": return <SettingsView />;
    case "connected": return <ConnectedView />;
    case "subscription": return <SubscriptionView />;
    case "credits": return <CreditsView />;
    case "category": return <CategoryView />;
  }
}
function MusicShell() {
  const m = useMusic();
  const main = useRef<HTMLElement>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const zh = m.library.locale === "zh";
  const [fixturePlaylists, revealPlaylists] = useState(() => !m.scene.source || sourcePlaylistNavigation.has(m.scene.source));
  const [initialPage] = useState(m.scene.page);
  // Preserve captured chrome through menus, but expose the actual library once
  // the user navigates. A first-frame fixture must not hide saved playlists forever.
  useEffect(() => { if (m.scene.page !== initialPage) revealPlaylists(true); }, [m.scene.page, initialPage]);
  const [initialPlaylistCount] = useState(m.library.playlists.length);
  const showPlaylists = fixturePlaylists || m.library.playlists.length > initialPlaylistCount;
  const sourcePrefix = m.scene.source?.slice(0, 8);
  const cancellationProfile = m.scene.page === "subscription" || ["fd1c0c71", "03157020", "603983c7"].includes(sourcePrefix ?? "");
  const loginOffer = m.scene.flow === "logging-in" || ["3131018d", "417f6129", "6aa4a9d7", "4e65c7c6", "97de6907"].includes(sourcePrefix ?? "");
  const cancelledOffer = loginOffer || sourcePrefix === "603983c7" || (m.scene.page === "subscription" && m.scene.guest && (m.library.cancelled || m.scene.cancelled));
  const activePage = ["481cd568", "1e5b4763"].includes(sourcePrefix ?? "") ? "radio" : ["settings", "connected", "subscription"].includes(m.scene.page) ? "new" : ["album", "artist", "chart", "credits", "nearby", "replay", "milestones", "milestone"].includes(m.scene.page) ? "new" : ["concerts", "concert", "nearby", "category"].includes(m.scene.page) ? "search" : m.scene.page === "schedule" ? "radio" : m.scene.page;
  const go = (destination: string) => { m.go(destination); setMobileNav(false); };
  useEffect(() => {
    const element = main.current; if (!element) return;
    const frame = requestAnimationFrame(() => {
      if (m.scene.page === "settings" || m.scene.page === "connected" || m.scene.page === "subscription") return;
      if (m.scene.scrollOffset && !m.scene.overlay && ["concert", "nearby"].includes(m.scene.page)) { element.scrollTo({ top: m.scene.scrollOffset }); }
      else if (m.scene.scroll) {
        const target = document.getElementById(m.scene.scroll);
        if (target) element.scrollTo({ top: element.scrollTop + target.getBoundingClientRect().top - element.getBoundingClientRect().top - (target.dataset.referenceTop && window.innerWidth > 1180 ? Number(target.dataset.referenceTop) : (m.scene.source?.startsWith("812ba627") ? 47 : m.scene.scroll === "add-library" ? 170 : m.scene.scroll === "nashville" ? 30 : m.scene.scroll === "coming-soon" ? 113 : m.scene.scroll === "essentials" ? 32 : 24)) });
      } else if (m.scene.source) element.scrollTo({ top: 0 });
    });
    return () => cancelAnimationFrame(frame);
  }, [m.scene.source, m.scene.scroll, m.scene.page]);
  const navigation = (page: string, label: string, icon: GlyphName) => <button type="button" key={page} className="sidebar-row" aria-current={activePage === page ? "page" : undefined} onClick={() => go(page)}><SidebarGlyph name={icon} size={19} /><span>{label}</span></button>;
  return <div className={`music-app ${m.scene.guest ? "guest-session" : "member-session"} ${m.scene.panel ? "with-player-panel" : ""} ${m.scene.checkout ? "checkout-stage" : ""}`} lang={zh ? "zh-Hans" : "en-SG"} data-scene={m.scene.page} data-source={m.scene.source} data-flow={m.scene.flow} data-form-step={m.scene.formStep ?? 0}>
    <a className="skip-link" href="#music-main">Skip to content</a>
    <header className="mobile-header"><IconButton icon="queue" label="Open navigation" aria-expanded={mobileNav} aria-controls="music-sidebar" onClick={() => setMobileNav(!mobileNav)} /><button type="button" className="brand" onClick={() => go("new")}><Glyph name="apple" size={25} />Music</button><IconButton icon="person" label="Account" onClick={event => m.scene.guest ? m.patch({ overlay: "signin" }) : m.openMenu("profile", event)} /></header>
    {mobileNav && <button type="button" className="mobile-nav-backdrop" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}
    <aside id="music-sidebar" className={`music-sidebar ${mobileNav ? "mobile-open" : ""}`} aria-label="Main navigation">
      <button type="button" className="brand sidebar-brand" onClick={() => go("new")} title="Apple Music reference preview"><Glyph name="apple" size={25} /><span>Music</span></button>
      <div className="sidebar-scroll">
        <nav aria-label="Browse music">{navigation("search", zh ? "搜索" : "Search", "search")}{navigation("home", zh ? "主页" : "Home", "home")}{navigation("new", zh ? "新发现" : "New", "new")}{navigation("radio", zh ? "广播" : "Radio", "radio")}</nav>
        {!m.scene.guest && <>
          <div className="sidebar-section-label library-section-label"><span>{zh ? "资料库" : "Library"}</span><button type="button" onClick={() => m.patch({ editingNav: !m.scene.editingNav })}>{m.scene.editingNav ? "Done" : "Edit"}</button></div>
          {m.library.pinned.length > 0 && <nav className="sidebar-pins" aria-label="Pins"><div className="sidebar-pins-label"><Glyph name="down" size={10} /><Glyph name="pin" size={16} /><span>Pins</span></div>{m.library.pinned.map(id => { const pinnedTrack = trackById(id); return <button type="button" className="sidebar-row pinned-row" key={id} onClick={() => m.play(id)}>{pinnedTrack ? <Art art={pinnedTrack.art} label={pinnedTrack.album} /> : <Glyph name="pin" size={16} />}<span>{pinnedTrack?.title ?? "Pinned song"}</span></button>; })}</nav>}
          <nav aria-label="Music library">{libraryItems.map(([page, label, icon, chinese]) => m.scene.editingNav ? <label className="sidebar-row editable-row" key={page}><input type="checkbox" aria-label={`Show ${label}`} checked={!m.library.hiddenNav.includes(page)} onChange={() => m.setLibrary(data => ({ ...data, hiddenNav: data.hiddenNav.includes(page) ? data.hiddenNav.filter(id => id !== page) : [...data.hiddenNav, page] }))} /><SidebarGlyph name={icon} size={19} /><span>{zh ? chinese : label}</span></label> : !m.library.hiddenNav.includes(page) ? navigation(page, zh ? chinese : label, icon) : null)}</nav>
          <div className="sidebar-section-label"><span>{zh ? "播放列表" : "Playlists"}</span><IconButton icon="plus" label="Create playlist" onClick={() => m.patch({ overlay: "new-playlist", playlistSeed: [] })} /></div>
          <nav aria-label="Playlists">{navigation("playlists", zh ? "所有播放列表" : "All Playlists", "playlists")}{showPlaylists && <>{navigation("favourites", zh ? "喜爱歌曲" : "Favourite Songs", "favourites")}{m.library.playlists.map(playlist => <button type="button" className="sidebar-row" key={playlist.id} onClick={() => go(`playlist:${playlist.id}`)} aria-current={m.scene.page === "playlist" && (m.scene.category ?? "emotional") === playlist.id ? "page" : undefined}><SidebarGlyph name="playlist" size={19} /><span>{playlist.name}</span></button>)}</>}</nav>
        </>}
      </div>
      <div className="sidebar-footer"><a className="open-music" href="https://music.apple.com/" target="_blank" rel="noreferrer"><span className="open-music-icon"><Glyph name="apple-music" size={13} /></span><span>{zh ? "在“音乐”中打开" : "Open in Music"}</span><Glyph name="external-arrow" size={9} /></a>{m.scene.guest && !m.scene.checkout && !cancellationProfile ? <button type="button" className="sidebar-signin" aria-label="Sign In" onClick={() => m.patch({ overlay: "signin", formStep: 0 })}><Glyph name="person" size={13} /><span>Sign In</span></button> : <button type="button" className="profile-button" onClick={event => m.scene.guest ? m.patch({ overlay: "signin", formStep: 0 }) : m.openMenu("profile", event)} aria-label={m.scene.guest ? "Sign In" : "Account menu"}><span className="profile-avatar"><ProfileAvatar /></span>{(m.scene.namedProfile || cancellationProfile) && <span>{cancellationProfile ? "Alex Smith" : "SmithAlex"}</span>}</button>}</div>
    </aside>
    <main id="music-main" ref={main} className="music-main" tabIndex={-1}><Content /></main>
    {!m.scene.expanded && !m.scene.video && <><Player /><PlayerPanel /></>}
    {m.scene.guest && m.scene.page !== "home" && !m.scene.checkout && !m.scene.expanded && !m.scene.video && <div className="trial-banner"><div><strong>{cancelledOffer ? "Over 100 million songs. All ad-free." : "Get over 100 million songs free for 1 month."}</strong><small>{cancelledOffer ? "Plus your entire music library on all your devices. Plan auto-renews for $10.98/month." : "Plus your entire music library on all your devices. 1 month free, then $10.98/month."}</small><span className="sr-only">Local reference preview. No payment or subscription will be created.</span></div><button type="button" onClick={() => m.patch({ overlay: "signin", formStep: 0 })}>{cancelledOffer ? "Try It Now" : "Try It Free"}</button></div>}
    {m.scene.expanded && <ExpandedPlayer />}{m.scene.video && <VideoPlayer />}
    {m.scene.overlay && <MusicOverlays key={m.scene.overlay} />}<MusicMenus />
    <div className={`music-toast ${m.message ? "visible" : ""}`} role="status" aria-live="polite">{m.message}</div>
  </div>;
}
export default function AppleMusicApp({ initialScene }: { initialScene: Scene }) { return <MusicProvider initialScene={initialScene}><MusicShell /></MusicProvider>; }
