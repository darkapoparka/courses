"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useId, useState } from "react";
import { categories, priceLabel } from "../../lib/platform/catalog";
import { creatorById, creatorName } from "../../lib/platform/discovery";
import { catalogHref, catalogOptions, selectCourses, type CatalogOptions } from "../../lib/platform/search";
import type { Course } from "../../lib/platform/types";
import { usePreview, updatePreview } from "./preview-store";
import { CourseCard } from "./course-card";
import { Icon } from "./icon";
import styles from "./platform.module.css";

type Props = { courses: readonly Course[]; mode?: "all" | "saved" | "started"; options: CatalogOptions };
export function CatalogBrowser({ courses, mode = "all", options }: Props) {
  const { state, ready, writable } = usePreview();
  const pathname = usePathname(); const router = useRouter(); const id = useId();
  const [message, setMessage] = useState("");
  const owned = courses.filter(course => mode === "all" || (mode === "saved" ? state.saved.includes(course.id) : course.lessons.some(lesson => Boolean(state.progress[lesson.id]))));
  const selected = selectCourses(owned, options.filter, options.category, options.access, options.sort);
  const filtering = Boolean(options.filter || options.category || options.access !== "all");
  function toggle(course: Course) {
    const wasSaved = state.saved.includes(course.id);
    const ok = updatePreview(current => ({ ...current, saved: current.saved.includes(course.id) ? current.saved.filter(item => item !== course.id) : [...current.saved, course.id] }));
    setMessage(ok ? `${course.title}: ${wasSaved ? "removed from Saved" : "saved in this browser"}.` : "This change could not be saved. Previous data is unchanged.");
  }
  const saveControl = (course: Course) => <button type="button" className={styles.catalogSave} aria-label={`${state.saved.includes(course.id) ? "Unsave" : "Save"} ${course.title}`} aria-pressed={state.saved.includes(course.id)} disabled={!ready || !writable} onClick={() => toggle(course)}><Icon name={state.saved.includes(course.id) ? "check" : "saved"} /></button>;
  return <section aria-label="Course collection">
    <form key={JSON.stringify(options)} className={styles.catalogFilters} action={pathname} aria-label="Filter collection"
      onSubmit={event => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); router.push(catalogHref(pathname, catalogOptions(data))); }}>
      <div className={styles.filterField}><label htmlFor={`${id}-filter`}>Filter courses</label><input id={`${id}-filter`} name="filter" defaultValue={options.filter} maxLength={100} placeholder="Title or creator" /></div>
      <div className={styles.filterField}><label htmlFor={`${id}-category`}>Category</label><select id={`${id}-category`} name="category" defaultValue={options.category}><option value="">All categories</option>{categories.map(category => <option key={category}>{category}</option>)}</select></div>
      <div className={styles.filterField}><label htmlFor={`${id}-access`}>Availability</label><select id={`${id}-access`} name="access" defaultValue={options.access}><option value="all">All demo offers</option><option value="free">Free courses</option></select></div>
      <div className={styles.filterField}><label htmlFor={`${id}-sort`}>Sort by</label><select id={`${id}-sort`} name="sort" defaultValue={options.sort}><option value="featured">Featured order</option><option value="title">Title A–Z</option><option value="duration">Shortest first</option></select></div>
      <input type="hidden" name="view" value={options.view} /><button type="submit" className={styles.secondaryButton}>Apply filters</button>
    </form>
    <div className={styles.catalogUtility}>
      <p role="status">{mode !== "all" && !ready ? "Loading this browser’s collection…" : `${selected.length} ${selected.length === 1 ? "course" : "courses"}`}</p>
      {filtering && <Link className={styles.textButton} href={catalogHref(pathname, { ...catalogOptions({}), view: options.view })}>Clear filters</Link>}
      <nav className={styles.viewSwitch} aria-label="Collection view">
        <Link href={catalogHref(pathname, { ...options, view: "grid" })} aria-label="Grid view" aria-current={options.view === "grid" ? "page" : undefined}><Icon name="grid" /></Link>
        <Link href={catalogHref(pathname, { ...options, view: "list" })} aria-label="List view" aria-current={options.view === "list" ? "page" : undefined}><Icon name="list" /></Link>
      </nav>
    </div>
    {mode !== "all" && !ready ? null : !selected.length ? <div className={styles.empty}>
      <h2>{filtering ? "No courses match these filters." : mode === "saved" ? "Make a little room for curiosity." : "Your next chapter starts here."}</h2>
      <p>{filtering ? "Clear a filter or try a different title or creator." : mode === "saved" ? "Saved courses are bookmarks, not purchases." : "Open a sample or free lesson to start your learning collection."}</p>
      <Link className={styles.primaryButton} href={filtering ? pathname : "/learn"}>{filtering ? "Reset collection" : "Explore courses"}</Link>
    </div> : options.view === "list" ? <ul className={styles.catalogList} aria-label="Courses list">
      {selected.map(course => { const creator = creatorById(course.creatorId); return <li key={course.id}>
        <span className={`${styles.resultArtwork} ${styles[course.cover]}`} aria-hidden="true"><Icon name="book" /></span>
        <div><Link className={styles.listTitle} href={`/learn/courses/${course.slug}`}>{course.title}</Link><Link className={styles.listCreator} href={`/learn/creators/${creator?.slug ?? ""}`}>{creatorName(course)}</Link>{mode === "started" && <p className={styles.muted}>{course.lessons.filter(lesson => state.progress[lesson.id]?.completed).length} of {course.lessons.length} complete in this browser</p>}</div>
        <span className={styles.listCategory}>{course.category}</span><span className={styles.listOffer}>{course.minutes} min · {priceLabel(course)}</span>{saveControl(course)}
      </li>; })}
    </ul> : <div className={styles.cardGrid} data-catalog-grid>{selected.map(course => <div key={course.id} className={styles.collectionCard}>
      <CourseCard course={course} />{saveControl(course)}
      {mode === "started" && <div className={styles.courseProgress}><progress value={course.lessons.filter(lesson => state.progress[lesson.id]?.completed).length} max={course.lessons.length} aria-label={`${course.title} completion`} /><span>{course.lessons.filter(lesson => state.progress[lesson.id]?.completed).length} of {course.lessons.length} complete in this browser</span></div>}
    </div>)}</div>}
    <p role="status" className={styles.actionNote}>{message}</p>
  </section>;
}
