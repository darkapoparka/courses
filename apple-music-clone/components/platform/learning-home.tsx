"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { courses } from "../../lib/platform/catalog";
import { creators, creatorName } from "../../lib/platform/discovery";
import { homePicks, learningEntries, shortLessons } from "../../lib/platform/home";
import type { Course } from "../../lib/platform/types";
import { updatePreview, usePreview } from "./preview-store";
import { CourseCard, Cover } from "./course-card";
import { CreatorCard } from "./discovery-cards";
import { EditorialShelf } from "./editorial-shelf";
import { Icon } from "./icon";
import styles from "./platform.module.css";

type Undo = { kind: "pick"; courseId: string } | { kind: "community" };
export function LearningHome() {
  const { state, ready, writable } = usePreview();
  const [minutes, setMinutes] = useState(10);
  const [includeCompleted, setIncludeCompleted] = useState(false);
  const [message, setMessage] = useState("");
  const [undo, setUndo] = useState<Undo | null>(null);
  const picksHeading = useRef<HTMLHeadingElement>(null);
  const savedHeading = useRef<HTMLHeadingElement>(null);
  const entries = learningEntries(state);
  const picks = homePicks(state);
  const quick = shortLessons(state, minutes, includeCompleted).slice(0, 6);
  const saved = [...state.saved].reverse().flatMap(id => courses.find(course => course.id === id) ?? []);
  const followed = courses.filter(course => state.following.includes(course.creatorId));
  function toggleSaved(course: Course) {
    const removing = state.saved.includes(course.id);
    const ok = updatePreview(current => ({ ...current, saved: current.saved.includes(course.id) ? current.saved.filter(id => id !== course.id) : [...current.saved, course.id] }));
    setMessage(ok ? `${course.title} ${removing ? "removed from Saved" : "saved for later"}. No enrollment changed.` : "The bookmark could not be saved. Previous data is unchanged.");
    if (ok) requestAnimationFrame(() => (removing ? savedHeading : picksHeading).current?.focus({ preventScroll: true }));
  }
  function hidePick(course: Course) {
    const ok = updatePreview(current => ({ ...current, homePreferences: { ...current.homePreferences, hiddenPicks: [...new Set([...current.homePreferences.hiddenPicks, course.id])] } }));
    if (ok) { setUndo({ kind: "pick", courseId: course.id }); requestAnimationFrame(() => picksHeading.current?.focus({ preventScroll: true })); }
    setMessage(ok ? `${course.title} hidden from Home picks. Its course and your learning data are unchanged.` : "The suggestion could not be hidden.");
  }
  function undoChange() {
    const change = undo;
    if (!change) return;
    const ok = updatePreview(current => ({ ...current, homePreferences: change.kind === "community"
      ? { ...current.homePreferences, communityDismissed: false }
      : { ...current.homePreferences, hiddenPicks: current.homePreferences.hiddenPicks.filter(id => id !== change.courseId) } }));
    if (ok) setUndo(null);
    setMessage(ok ? "Home suggestion restored." : "The suggestion could not be restored.");
  }
  if (!ready) return <div aria-busy="true"><p role="status">Loading this browser's Home...</p><div className={styles.loadingBlock} /></div>;
  return <>
    <div className={styles.homeFeedback}><p role="status">{message}</p>{undo && <button type="button" className={styles.textButton} disabled={!writable} onClick={undoChange}>Undo dismissal</button>}</div>
    <section className={styles.homeSection} aria-labelledby="continue-heading">
      <div className={styles.sectionHeading}><div><h2 id="continue-heading">Continue learning</h2><p>Your next step, not another search.</p></div><Link className={styles.textButton} href="/learn/library">My learning <Icon name="arrow" /></Link></div>
      {entries.length ? <div className={styles.homeContinueGrid}>{entries.slice(0, 4).map(entry => <article key={entry.course.id} className={styles.homeContinueCard} data-learning-course={entry.course.id}>
        <Link href={`/learn/courses/${entry.course.slug}`} className={styles.homeContinueCover} aria-label={`View ${entry.course.title} details`}><Cover course={entry.course} /></Link>
        <div><p className={styles.eyebrow}>{entry.status === "complete" ? "COURSE COMPLETE" : entry.status === "sample-finished" ? "SAMPLE FINISHED" : "YOUR NEXT LESSON"}</p><h3>{entry.lesson?.title ?? entry.course.title}</h3><p className={styles.homeMeta}>{entry.course.title} · {creatorName(entry.course)}</p>
          <div className={styles.courseProgress}><progress value={entry.completed} max={entry.total} aria-label={`${entry.course.title}: ${entry.completed} of ${entry.total} lessons complete`} /><span>{entry.completed} of {entry.total} lessons complete{entry.lesson ? ` · ${entry.lesson.minutes} min next` : ""}</span></div>
          {entry.status === "sample-finished" && <p className={styles.homeMeta}>Remaining lessons are not available in this preview.</p>}
          <Link className={styles.textButton} href={entry.href} aria-label={`${entry.status === "continue" ? "Continue" : entry.status === "complete" ? "Review" : "View"} ${entry.course.title}`}>{entry.status === "continue" ? "Continue lesson" : entry.status === "complete" ? "Review course" : "View course"}<Icon name="arrow" /></Link>
        </div>
      </article>)}</div> : <div className={styles.homeWelcome}><span className={styles.homeWelcomeIcon}><Icon name="book" width="32" height="32" /></span><div><h3>Your first lesson starts a new chapter.</h3><p>Try a free reading lesson. Home will remember your next step in this browser.</p></div><Link className={styles.primaryButton} href="/learn/courses/design-with-intention/lessons/design-observe">Try a free lesson <Icon name="arrow" /></Link></div>}
    </section>
    <section className={styles.homeSection} aria-labelledby="home-picks-heading">
      <div className={styles.sectionHeading}><div><h2 ref={picksHeading} tabIndex={-1} id="home-picks-heading">Picks for you</h2><p>Courses to explore, with a reason behind every pick.</p></div>
        {state.homePreferences.hiddenPicks.length > 0 && <button type="button" className={styles.textButton} disabled={!writable} onClick={() => {
          const ok = updatePreview(current => ({ ...current, homePreferences: { ...current.homePreferences, hiddenPicks: [] } }));
          if (ok) setUndo(null); setMessage(ok ? "Hidden picks restored." : "Picks could not be restored.");
        }}>Restore hidden picks ({state.homePreferences.hiddenPicks.length})</button>}
      </div>
      {picks.length ? <EditorialShelf label="Home picks" variant="posters">{picks.map(({ course, reason }) => <article key={course.id} className={styles.homePick} data-home-pick={course.id}>
        <Link className={styles.cardLink} href={`/learn/courses/${course.slug}`}><Cover course={course} /><h3>{course.title}</h3></Link>
        <p className={styles.homeMeta}>{creatorName(course)} · {course.priceMinor === 0 ? "Free demo" : "Open sample"}</p>
        <p className={styles.homeReason}>{reason}</p>
        <div className={styles.homePickActions}><button type="button" className={styles.textButton} disabled={!writable} aria-label={`Save ${course.title}`} onClick={() => toggleSaved(course)}><Icon name="saved" />Save for later</button><button type="button" className={styles.textButton} disabled={!writable} aria-label={`Hide suggestion ${course.title}`} onClick={() => hidePick(course)}>Not now</button></div>
      </article>)}</EditorialShelf> : <div className={styles.homeEmpty}><h3>You're caught up with these picks.</h3><p>Your saved and started courses are still here. Restore hidden picks or explore the catalog.</p><Link className={styles.textButton} href="/learn/courses">Explore all courses <Icon name="arrow" /></Link></div>}
    </section>
    <section className={styles.homeSection} aria-labelledby="quick-lessons-heading">
      <div className={styles.sectionHeading}><div><h2 id="quick-lessons-heading">A little learning, right now</h2><p>Open reading lessons that fit your time. Estimates, not a timer.</p></div></div>
      <div className={styles.homeQuickControls}><div className={styles.homeTimeChoice} role="group" aria-label="Time available">{[5, 10, 15].map(value => <button type="button" key={value} aria-pressed={minutes === value} onClick={() => setMinutes(value)}>{value} min</button>)}</div>
        <label className={styles.homeCheck}><input type="checkbox" checked={includeCompleted} onChange={event => setIncludeCompleted(event.target.checked)} />Include completed lessons</label>
      </div>
      {quick.length ? <ol className={styles.homeQuickList}>{quick.map(({ course, lesson }) => <li key={lesson.id}><Link href={`/learn/courses/${course.slug}/lessons/${lesson.id}`}><span className={`${styles.resultArtwork} ${styles[course.cover]}`}><Icon name={state.progress[lesson.id]?.completed ? "check" : "book"} /></span><span><strong>{lesson.title}</strong><small>{creatorName(course)} · {course.title}</small></span><span>{lesson.minutes} min</span><Icon name="arrow" /></Link></li>)}</ol> : <div className={styles.homeEmpty} role="status"><h3>No open lessons fit this view.</h3><p>Try a longer session or include completed lessons to revisit one.</p><button type="button" className={styles.textButton} onClick={() => { setMinutes(10); setIncludeCompleted(true); }}>Show lessons up to 10 minutes</button></div>}
    </section>
    <section className={styles.homeSection} aria-labelledby="home-saved-heading">
      <div className={styles.sectionHeading}><div><h2 id="home-saved-heading" ref={savedHeading} tabIndex={-1}>Saved for later</h2><p>Bookmarks, not enrollments. Pick one when the time is right.</p></div><Link className={styles.textButton} href="/learn/saved">See all saved <Icon name="arrow" /></Link></div>
      {saved.length ? <EditorialShelf label="Home saved courses">{saved.map(course => <div key={course.id} data-home-saved={course.id}><CourseCard course={course} /><button type="button" className={styles.textButton} disabled={!writable} aria-label={`Unsave ${course.title}`} onClick={() => toggleSaved(course)}><Icon name="check" />Saved</button></div>)}</EditorialShelf>
        : <div className={styles.homeEmpty}><h3>A place for your next possibilities.</h3><p>Save a pick above and it will appear here without starting or purchasing it.</p></div>}
    </section>
    <section className={styles.homeSection} aria-labelledby="home-following-heading">
      <div className={styles.sectionHeading}><div><h2 id="home-following-heading">From creators you follow</h2><p>{followed.length ? "Keep learning with the teachers you chose." : "Find a teacher whose work makes you curious."}</p></div><Link className={styles.textButton} href="/learn/creators">Explore creators <Icon name="arrow" /></Link></div>
      {followed.length ? <EditorialShelf label="Courses from followed creators">{followed.map(course => <CourseCard key={course.id} course={course} />)}</EditorialShelf>
        : <><p className={styles.homeMeta}>You are not following a creator yet. Open a profile to follow locally.</p><EditorialShelf label="Creators to explore" variant="creators">{creators.map(creator => <CreatorCard key={creator.id} creator={creator} />)}</EditorialShelf></>}
    </section>
    {!state.homePreferences.communityDismissed && <section className={styles.homeDiscussion} aria-labelledby="home-discussion-heading">
      <Icon name="community" width="32" height="32" /><div><p className={styles.eyebrow}>PUT IT INTO PRACTICE</p><h2 id="home-discussion-heading">Bring your next question</h2><p>{entries[0] ? `Keep the conversation next to ${entries[0].course.title}.` : "Ask a question or share a small experiment with its course context."} This discussion space is local, not a live feed.</p>
        <Link className={styles.textButton} href={entries[0] ? `/learn/community?course=${entries[0].course.id}` : "/learn/community"}>Open course discussion <Icon name="arrow" /></Link></div>
      <button type="button" className={styles.homeDismiss} disabled={!writable} aria-label="Dismiss discussion prompt" onClick={() => {
        const ok = updatePreview(current => ({ ...current, homePreferences: { ...current.homePreferences, communityDismissed: true } }));
        if (ok) { setUndo({ kind: "community" }); requestAnimationFrame(() => document.getElementById("home-title")?.focus({ preventScroll: true })); }
        setMessage(ok ? "Discussion prompt hidden. Customize Home can show it again." : "The prompt could not be hidden.");
      }}>×</button>
    </section>}
  </>;
}
