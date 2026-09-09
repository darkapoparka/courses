"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { crop, replayTracks } from "../lib/music-catalog";
import { replayAlbums, replayArtists, replayMilestones, replaySongSeeds } from "../lib/replay-data";
import { useMusic } from "./music-context";
import { Art, Footer, Glyph, IconButton } from "./music-primitives";
import { Rail } from "./music-rail";
import styles from "./music-replay.module.css";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] as const;
const defaultMilestone = replayMilestones[0];
const badge = (index: number) => crop("cc18744f", 286 + (index % 5) * 227, 54 + Math.floor(index / 5) * 278, 207, 207);

function useReplayActions() {
  const m = useMusic();
  const visit = (collection?: string) => {
    m.go(collection ? `replay:${collection}` : "replay");
    m.patch({ month: "May" });
    const url = new URL(location.href); url.searchParams.set("month", "May");
    history.replaceState({}, "", url);
  };
  const share = async (title: string) => {
    try {
      await navigator.clipboard.writeText(location.href);
      m.notify(`${title} link copied.`);
    } catch { m.notify("Clipboard access was denied. Copy this page’s address to share it."); }
  };
  return { m, visit, share };
}

function ReplaySongRows() {
  const m = useMusic();
  return <div className={styles.songGrid} aria-label="Top songs in May">
    {Array.from({ length: 12 }, (_, index) => {
      const rank = index + 1;
      const seed = replaySongSeeds.find(item => item.rank === rank);
      const track = replayTracks.find(item => item.id === `replay-${rank}`);
      if (!seed || !track) return <div className={styles.unrecordedSong} key={rank}>
        <span>{rank}</span><span>Not visible in the saved capture</span>
      </div>;
      return <div className={styles.song} key={rank}>
        <button type="button" className={styles.songArt} aria-label={`Play ${track.title}`} onClick={() => m.play(track)}><Art resolution="standard" art={track.art} label={track.album} /></button>
        <span className={styles.rank}>{rank}</span>
        <div className={styles.songCopy}>
          <button type="button" onClick={() => m.play(track)}>{track.title}{track.explicit && <span className="explicit">E</span>}</button>
          <span>{track.artist}{seed.plays !== null ? ` · ${seed.plays} Plays` : ""}</span>
        </div>
        <IconButton icon="more" label={`More actions for ${track.title}`} onClick={event => m.openMenu("track", event, track.id)} />
      </div>;
    })}
  </div>;
}
function ReplaySectionHeading({ children, onClick }: { children: string; onClick?: () => void }) {
  return <h2 className={styles.sectionHeading}>{onClick ? <button type="button" onClick={onClick}>{children}<Glyph name="chevron" size={14} /></button> : children}</h2>;
}

export function ReplayView() {
  const { m, visit, share } = useReplayActions();
  const month = m.scene.month ?? "Jul";
  const monthButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const [yearOpen, setYearOpen] = useState(false);
  const yearRegion = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!yearOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !yearRegion.current?.contains(event.target)) setYearOpen(false);
    };
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") { setYearOpen(false); yearRegion.current?.querySelector<HTMLButtonElement>("button")?.focus(); }
    };
    document.addEventListener("pointerdown", dismiss); document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", escape); };
  }, [yearOpen]);
  const collection = m.scene.category;
  const selectMonth = (next: string) => {
    m.patch({ month: next, empty: next !== "May" });
    const url = new URL(location.href); url.searchParams.set("month", next);
    if (url.pathname.startsWith("/screen/") || url.pathname.startsWith("/flows/")) {
      url.pathname = "/"; url.search = new URLSearchParams({ view: "replay", month: next }).toString();
    }
    history.replaceState({}, "", url);
  };
  const monthKey = (event: KeyboardEvent, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % months.length;
    else if (event.key === "ArrowLeft") next = (index + months.length - 1) % months.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = months.length - 1;
    else return;
    event.preventDefault(); selectMonth(months[next]!); monthButtons.current[next]?.focus();
  };
  const hasStats = month === "May";
  const show = (name: string) => !collection || collection === name;
  return <div className={`${styles.replay} ${!hasStats ? styles.empty : ""}`}>
    <div className={styles.ambient} aria-hidden="true" />
    <header ref={yearRegion} className={styles.header}><h1>{collection ? `Your Top ${collection === "year" ? "Songs of 2026" : collection.charAt(0).toUpperCase() + collection.slice(1)}` : "Replay"}</h1>
      <div className={styles.headerActions}><button type="button" className={styles.yearButton} aria-expanded={yearOpen} aria-controls="replay-year-picker" onClick={() => setYearOpen(!yearOpen)}>2026<Glyph name="down" size={17} /></button><IconButton icon="share" label="Share Replay" onClick={() => void share("Replay")} /></div>
      {yearOpen && <div id="replay-year-picker" className={styles.yearMenu} role="menu"><button type="button" role="menuitemradio" aria-checked="true" onClick={() => setYearOpen(false)}>2026<Glyph name="check" size={14} /></button><span>Only 2026 is included in this capture.</span></div>}
    </header>
    {collection ? <button type="button" className={styles.backLink} onClick={() => visit()}>‹ Replay</button> : <div className={styles.months} role="tablist" aria-label="Replay month">
      {months.map((value, index) => <button type="button" role="tab" key={value} ref={element => { monthButtons.current[index] = element; }} aria-selected={month === value} tabIndex={month === value ? 0 : -1} aria-controls="replay-month-panel" onKeyDown={event => monthKey(event, index)} onClick={() => selectMonth(value)}>{value}</button>)}
    </div>}
    <div id="replay-month-panel" className={styles.monthPanel} role={collection ? undefined : "tabpanel"} aria-label={`${month} Replay`}>
      {!hasStats ? <p className={styles.inProgress}>{month === "Jul" ? "July Replay is still in progress. Check back in early August." : `${month} listening statistics are not included in the saved reference.`}</p> : <>
        {!collection && <p className={styles.summary}>You listened for <strong>3,834 minutes</strong> in May.</p>}
        {show("artists") && <section className={styles.artistSection} aria-label="Your Top Artists">
          {!collection && <ReplaySectionHeading onClick={() => visit("artists")}>Your Top Artists</ReplaySectionHeading>}
          <Rail label="May top artists" className={`poster-rail ${styles.artistRail}`}>
            {replayArtists.map((artist, index) => <button type="button" className={styles.artistPoster} key={artist.name} onClick={() => m.go(`artist:${artist.name}`)} aria-label={`${index + 1}. ${artist.name}, ${artist.minutes} minutes`}><Art resolution="standard" art={crop("3fed6760", 286 + index * 284, 417, 264, 353)} label={artist.name} /></button>)}
          </Rail>
        </section>}
        {(show("songs") || collection === "year") && <section className={styles.songSection} aria-label="Your Top Songs">
          {!collection && <ReplaySectionHeading onClick={() => visit("songs")}>Your Top Songs</ReplaySectionHeading>}
          <ReplaySongRows />
        </section>}
        {show("albums") && <section id="top-albums" data-reference-top="181" className={styles.albumSection} aria-label="Your Top Albums">
          {!collection && <ReplaySectionHeading onClick={() => visit("albums")}>Your Top Albums</ReplaySectionHeading>}
          <div className={styles.albumGrid}>{replayAlbums.map((album, index) => <article key={album.title}>
            <button type="button" className={styles.albumArt} onClick={() => m.go(`album:${album.title}`)} aria-label={`Open ${album.title}`}><Art resolution="standard" art={crop("b67b8895", 286 + index * 227, 213, 207, 208)} label={album.title} /></button>
            <strong>{index + 1}</strong><button type="button" className={styles.albumTitle} onClick={() => m.go(`album:${album.title}`)}>{album.title}{album.explicit && <span className="explicit">E</span>}</button>
            <button type="button" className={styles.albumArtist} onClick={() => m.go(`artist:${album.artist}`)}>{album.artist}</button><span>{album.minutes} minutes</span>
          </article>)}</div>
        </section>}
        {!collection && <>
          <section id="milestones" data-reference-top="205" className={styles.milestoneSection} aria-label="Your Milestones">
            <ReplaySectionHeading onClick={() => m.go("milestones")}>Your Milestones</ReplaySectionHeading>
            <Rail label="Recent milestones" className={`poster-rail ${styles.milestoneRail}`}>
              {replayMilestones.slice(0, 4).map((milestone, index) => <button type="button" key={milestone.id} className={styles.milestoneCard} aria-label={`${milestone.value} ${milestone.detail}, reached ${milestone.date}`} onClick={() => m.go(`milestone:${milestone.id}`)}>
                <Art resolution="standard" art={crop("18225175", 286 + index * 284, 237, 264, 353)} label={`${milestone.value} ${milestone.detail}`} />
              </button>)}
            </Rail>
          </section>
          <section id="replay-year" data-reference-top="171" className={styles.yearSection} aria-label="Replay Your Top Songs of 2026">
            <ReplaySectionHeading>Replay Your Top Songs of 2026</ReplaySectionHeading>
            <button type="button" className={styles.yearArtwork} aria-label="Open Replay 2026 playlist" onClick={() => visit("year")}><Art resolution="standard" art={crop("b0caf02f", 286, 204, 1116, 478)} label="Replay ’26. Spiritbox, ILLENIUM, Martin Garrix, Two Door Cinema Club and more" /></button>
          </section>
        </>}
      </>}
    </div>
    <Footer />
  </div>;
}

export function MilestonesView() {
  const { m, visit, share } = useReplayActions();
  const single = m.scene.page === "milestone";
  const index = Math.max(0, replayMilestones.findIndex(item => item.id === (m.scene.category ?? defaultMilestone.id)));
  const selected = replayMilestones[index]!;
  return <div className={`${styles.awardsPage} ${single ? styles.singleAward : ""}`}>
    <header className={styles.awardsHeader}><IconButton icon="back" label={single ? "Back to milestones" : "Back to Replay"} onClick={() => single ? m.go("milestones") : visit()} /><div><h1>{single ? selected.detail : "Milestones"}</h1>{!single && <span>2026</span>}</div>{single && <IconButton icon="share" label="Share milestone" onClick={() => void share(selected.detail)} />}</header>
    {single ? <div className={styles.awardDetail}>
      <Art resolution="standard" art={index === 0 ? crop("b5d31893", 712, 222, 264, 254) : badge(index)} label={`${selected.value} ${selected.detail}`} className={styles.detailBadge} />
      <h2>{selected.detail}</h2><p>{selected.achieved ? `Reached ${selected.date}` : "In Progress"}</p>
    </div> : <div className={styles.awardGrid}>
      {replayMilestones.map((milestone, position) => <button type="button" key={milestone.id} className={styles.awardTile} onClick={() => m.go(`milestone:${milestone.id}`)} aria-label={`${milestone.value} ${milestone.kind}, ${milestone.achieved ? `reached ${milestone.date}` : "in progress"}`}>
        <Art resolution="standard" art={badge(position)} label={`${milestone.value} ${milestone.kind}`} />
        <span>{milestone.date?.toUpperCase() ?? "IN PROGRESS"}</span><strong>{milestone.kind}</strong>
      </button>)}
    </div>}
    <Footer />
  </div>;
}
