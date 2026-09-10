"use client";

import { useEffect, useRef, useState } from "react";
import type { Scene } from "../lib/music-scenes";
import { videoArt, trackById } from "../lib/music-catalog";
import { sourcePlaylistNavigation } from "../lib/reference-chrome";
import { MusicProvider, useMusic } from "./music-context";
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
function VideoPlayer() {
  const m = useMusic(); const video = useRef<HTMLVideoElement>(null);
  const source = m.audio.current?.getAttribute("src") || undefined;
  useEffect(() => {
    const element = video.current;
    if (!element || !source) return;
    m.audio.current?.pause();
    element.src = source;
    void element.play().catch(() => m.notify("Press Play to start the local video."));
    return () => element.pause();
  }, [source, m.audio, m.notify]);
  return <div className="video-player" aria-label="Video player"><IconButton icon="close" label="Close video" className="video-close" onClick={() => m.patch({ video: false })} />{source ? <video ref={video} controls playsInline aria-label="Local video playback" /> : <><Art art={m.activeId === "album-video" && m.active ? m.active.art : videoArt} label="Begged lyric video frame" className="video-reference-frame" /><button type="button" className="video-poster-action" aria-label="Choose local media to play" onClick={() => m.patch({ overlay: "media" })}><span className="sr-only">Choose local media to play</span></button><div className="video-reference-controls" aria-label="Video controls"><div className="video-progress-row"><span>0:06</span><input type="range" aria-label="Video position" min="0" max="224" value="6" readOnly /><span>-3:38</span></div><div className="video-control-row"><label className="video-volume-control"><Glyph name="volume" size={12} /><input type="range" aria-label="Video volume" min="0" max="1" step="0.01" value={m.volume} onChange={event => m.setVolume(Number(event.target.value))} /></label><div className="video-center-controls"><IconButton icon="rewind-10" label="Back 10 seconds" onClick={() => m.setElapsed(Math.max(0, m.elapsed - 10))} /><IconButton icon={m.playing ? "pause" : "play"} label={m.playing ? "Pause video" : "Play video"} onClick={m.togglePlayback} /><IconButton icon="forward-10" label="Forward 10 seconds" onClick={() => m.setElapsed(m.elapsed + 10)} /></div><IconButton icon="expand" label="Choose local media for fullscreen playback" onClick={() => m.patch({ overlay: "media" })} /></div></div></>}</div>;
}
function MusicShell() {
  const m = useMusic();
  const main = useRef<HTMLElement>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const zh = m.library.locale === "zh";
  const [fixturePlaylists] = useState(() => !m.scene.source || sourcePlaylistNavigation.has(m.scene.source));
  const [initialPlaylistCount] = useState(m.library.playlists.length);
  const showPlaylists = fixturePlaylists || m.library.playlists.length > initialPlaylistCount;
  const activePage = ["album", "artist", "chart", "credits", "nearby"].includes(m.scene.page) ? "new" : ["concerts", "concert", "nearby", "replay", "milestones", "milestone", "category"].includes(m.scene.page) ? "search" : m.scene.page === "schedule" ? "radio" : m.scene.page;
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
  const navigation = (page: string, label: string, icon: GlyphName) => <button type="button" key={page} className="sidebar-row" aria-current={activePage === page ? "page" : undefined} onClick={() => go(page)}><Glyph name={icon} size={17} /><span>{label}</span></button>;
  return <div className={`music-app ${m.scene.guest ? "guest-session" : "member-session"} ${m.scene.panel ? "with-player-panel" : ""} ${m.scene.checkout ? "checkout-stage" : ""}`} data-scene={m.scene.page} data-source={m.scene.source}>
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
          <nav aria-label="Music library">{libraryItems.map(([page, label, icon, chinese]) => m.scene.editingNav ? <label className="sidebar-row editable-row" key={page}><input type="checkbox" aria-label={`Show ${label}`} checked={!m.library.hiddenNav.includes(page)} onChange={() => m.setLibrary(data => ({ ...data, hiddenNav: data.hiddenNav.includes(page) ? data.hiddenNav.filter(id => id !== page) : [...data.hiddenNav, page] }))} /><Glyph name={icon} size={17} /><span>{zh ? chinese : label}</span></label> : !m.library.hiddenNav.includes(page) ? navigation(page, zh ? chinese : label, icon) : null)}</nav>
          <div className="sidebar-section-label"><span>{zh ? "播放列表" : "Playlists"}</span><IconButton icon="plus" label="Create playlist" onClick={() => m.patch({ overlay: "new-playlist", playlistSeed: [] })} /></div>
          <nav aria-label="Playlists">{navigation("playlists", zh ? "所有播放列表" : "All Playlists", "playlists")}{showPlaylists && <>{navigation("favourites", zh ? "喜爱歌曲" : "Favourite Songs", "favourites")}{m.library.playlists.map(playlist => <button type="button" className="sidebar-row" key={playlist.id} onClick={() => go(`playlist:${playlist.id}`)} aria-current={m.scene.page === "playlist" && (m.scene.category ?? "emotional") === playlist.id ? "page" : undefined}><Glyph name="playlist" size={17} /><span>{playlist.name}</span></button>)}</>}</nav>
        </>}
      </div>
      <div className="sidebar-footer"><a className="open-music" href="https://music.apple.com/" target="_blank" rel="noreferrer"><span className="open-music-icon"><Glyph name="song" size={11} /></span><span>{zh ? "在“音乐”中打开" : "Open in Music"}</span><Glyph name="external-arrow" size={9} /></a>{m.scene.guest && !m.scene.checkout ? <button type="button" className="profile-button guest-profile-button" aria-label="Sign In" onClick={() => m.patch({ overlay: "signin", formStep: 0 })}><span className="profile-avatar"><Glyph name="person" size={18} /></span></button> : <button type="button" className="profile-button" onClick={event => m.openMenu("profile", event)} aria-label="Account menu"><span className="profile-avatar"><Glyph name="person" size={18} /></span>{m.scene.namedProfile && <span>SmithAlex</span>}</button>}</div>
    </aside>
    <main id="music-main" ref={main} className="music-main" tabIndex={-1}><Content /></main>
    {!m.scene.expanded && !m.scene.video && <><Player /><PlayerPanel /></>}
    {m.scene.guest && m.scene.page !== "home" && !m.scene.checkout && !m.scene.expanded && !m.scene.video && <div className="trial-banner"><div><strong>Get over 100 million songs free for 1 month.</strong><small>Plus your entire music library on all your devices. 1 month free, then $10.98/month.</small><span className="sr-only">Local reference preview. No payment or subscription will be created.</span></div><button type="button" onClick={() => m.patch({ overlay: "signin", formStep: 0 })}>Try It Free</button></div>}
    {m.scene.expanded && <ExpandedPlayer />}{m.scene.video && <VideoPlayer />}
    {m.scene.overlay && <MusicOverlays key={m.scene.overlay} />}<MusicMenus />
    <div className={`music-toast ${m.message ? "visible" : ""}`} role="status" aria-live="polite">{m.message}</div>
  </div>;
}
export default function AppleMusicApp({ initialScene }: { initialScene: Scene }) { return <MusicProvider initialScene={initialScene}><MusicShell /></MusicProvider>; }
