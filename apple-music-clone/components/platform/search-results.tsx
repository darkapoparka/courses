"use client";

import Link from "next/link";
import { courses, courseById } from "../../lib/platform/catalog";
import { creators, topics } from "../../lib/platform/discovery";
import { libraryCourseIds, searchCatalog, searchHref, searchKinds, type SearchKind, type SearchScope } from "../../lib/platform/search";
import { usePreview, updatePreview } from "./preview-store";
import { CourseCard } from "./course-card";
import { CreatorCard, TopicCard } from "./discovery-cards";
import { Icon } from "./icon";
import styles from "./platform.module.css";

const labels: Record<SearchKind, string> = { all: "All", courses: "Courses", creators: "Creators", lessons: "Lessons", categories: "Categories" };
export function SearchResults({ query, scope, kind }: { query: string; scope: SearchScope; kind: SearchKind }) {
  const { state, ready, writable } = usePreview();
  const allowed = scope === "library" ? libraryCourseIds(state) : undefined;
  const all = searchCatalog(query, "all", allowed);
  const hits = kind === "all" ? all : all.filter(hit => hit.kind === kind);
  const foundCourses = courses.filter(course => hits.some(hit => hit.id === `course-${course.id}`));
  const foundCreators = creators.filter(creator => hits.some(hit => hit.id === `creator-${creator.id}`));
  const foundTopics = topics.filter(topic => hits.some(hit => hit.id === `category-${topic.slug}`));
  const foundLessons = hits.filter(hit => hit.kind === "lessons");
  return <>
    <nav className={styles.searchScopes} aria-label="Search scope">
      <Link href={searchHref(query, "catalog", kind)} aria-current={scope === "catalog" ? "page" : undefined}>All Courses</Link>
      <Link href={searchHref(query, "library", kind)} aria-current={scope === "library" ? "page" : undefined}>Your Library</Link>
    </nav>
    {scope === "library" && <p className={styles.scopeNote}>Saved and started courses in this browser. This is not an enrollment or purchase history.</p>}
    {query && <nav className={styles.resultKinds} aria-label="Result type">
      {searchKinds.map(item => <Link key={item} href={searchHref(query, scope, item)} aria-current={kind === item ? "page" : undefined}>
        {labels[item]} <span>{item === "all" ? all.length : all.filter(hit => hit.kind === item).length}</span>
      </Link>)}
    </nav>}
    {scope === "library" && !ready ? <p role="status">Loading this browser’s library…</p> : query ? <>
      <p role="status" className={styles.resultCount}>{hits.length} {hits.length === 1 ? "result" : "results"} for “{query}”</p>
      {!hits.length && <section className={styles.empty}><Icon name="search" width="36" height="36" /><h2>No results in this view.</h2>
        <p>Try another term, change the result type, or search the full catalog.</p>
        <Link className={styles.primaryButton} href={searchHref(query, "catalog")}>Search all types and courses</Link>
        <Link className={styles.textButton} href="/learn/search">Clear search and browse</Link>
      </section>}
      {foundCourses.length > 0 && <section className={styles.section}><div className={styles.sectionHeading}><h2>Courses matching “{query}”</h2></div>
        <div className={styles.cardGrid}>{foundCourses.map(course => <CourseCard key={course.id} course={course} />)}</div>
      </section>}
      {foundCreators.length > 0 && <section className={styles.section}><div className={styles.sectionHeading}><h2>Creators</h2></div>
        <div className={styles.creatorGrid}>{foundCreators.map(creator => <CreatorCard key={creator.id} creator={creator} />)}</div>
      </section>}
      {foundLessons.length > 0 && <section className={styles.section}><div className={styles.sectionHeading}><h2>Lessons</h2></div>
        <ol className={styles.searchLessons}>{foundLessons.map(hit => { const course = hit.courseId ? courseById(hit.courseId) : undefined; return <li key={hit.id}>
          <Link href={hit.href}><span className={`${styles.resultArtwork} ${course ? styles[course.cover] : ""}`}><Icon name={hit.available ? "book" : "lock"} /></span>
            <span><strong>{hit.title}</strong><small>{hit.detail}</small></span><Icon name="arrow" />
          </Link>
        </li>; })}</ol>
      </section>}
      {foundTopics.length > 0 && <section className={styles.section}><div className={styles.sectionHeading}><h2>Categories</h2></div>
        <div className={styles.topicGrid}>{foundTopics.map(topic => <TopicCard key={topic.slug} topic={topic} />)}</div>
      </section>}
    </> : <>
      {ready && state.recentSearches.length > 0 && <section className={styles.section} aria-label="Recent searches">
        <div className={styles.sectionHeading}><h2>Recent searches</h2><button type="button" className={styles.textButton} disabled={!writable}
          onClick={() => updatePreview(current => ({ ...current, recentSearches: [] }))}>Clear recent searches</button></div>
        <ul className={styles.recentSearches}>{state.recentSearches.map(text => <li key={text}>
          <Link href={searchHref(text, scope)}><Icon name="search" />{text}</Link>
          <button type="button" aria-label={`Remove recent search ${text}`} disabled={!writable}
            onClick={() => updatePreview(current => ({ ...current, recentSearches: current.recentSearches.filter(value => value !== text) }))}>×</button>
        </li>)}</ul><p className={styles.scopeNote}>Stored only in this browser. Private notes and discussions are not searched.</p>
      </section>}
      {scope === "catalog" ? <>
        <section className={styles.section}><div className={styles.sectionHeading}><h2>Browse categories</h2></div>
          <div className={styles.topicGrid}>{topics.map(topic => <TopicCard key={topic.slug} topic={topic} />)}</div>
        </section>
        <section className={styles.section}><div className={styles.sectionHeading}><h2>Explore courses</h2><Link className={styles.textButton} href="/learn/courses">See all ›</Link></div>
          <div className={styles.cardGrid}>{courses.map(course => <CourseCard key={course.id} course={course} />)}</div>
        </section>
      </> : <section className={styles.section}><h2>Your saved and started courses</h2>
        {allowed?.length ? <div className={styles.cardGrid}>{courses.filter(course => allowed.includes(course.id)).map(course => <CourseCard key={course.id} course={course} />)}</div>
          : <div className={styles.empty}><h2>Your library is ready for a first course.</h2><p>Save a course or open a demo lesson, then find it here.</p>
            <Link className={styles.primaryButton} href="/learn/courses">Explore courses</Link></div>}
      </section>}
    </>}
  </>;
}
