"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import { marketplaceHref, marketplaceOptions, type MarketplaceOptions } from "../../lib/platform/marketplace";
import type { Course } from "../../lib/platform/types";
import { usePreview, updatePreview } from "./preview-store";
import { Icon } from "./icon";
import { MarketplaceCourseCard } from "./marketplace-course-card";
import { MarketplaceCollections } from "./marketplace-collections";
import { collectionById, featuredIds } from "../../lib/platform/merchandising";
import { MarketplaceFeatures } from "./marketplace-features";
import { CourseQuickPreview } from "./course-quick-preview";
import { containDialogFocus } from "./dialog-focus";
import styles from "./platform.module.css";

type Props = {
  courses: readonly Course[];
  options: MarketplaceOptions;
  sampleIntroductions: Readonly<Record<string, string>>;
};

/** The catalog is server-selected. Only preview, bookmark and sort controls are client state. */
export function MarketplaceBrowser({ courses, options, sampleIntroductions }: Props) {
  const router = useRouter();
  const { state, ready, writable } = usePreview();
  const [pending, transition] = useTransition();
  const [selected, setSelected] = useState<Course | null>(null);
  const [message, setMessage] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const id = useId();
  const filtered = Boolean(options.category || options.price !== "all" || options.level || options.duration || options.collection || options.sort !== "featured");
  const collection = collectionById(options.collection);
  const featured = featuredIds.flatMap(id => courses.find(course => course.id === id) ?? []);
  useEffect(() => {
    if (selected && dialog.current && !dialog.current.open) {
      dialog.current.showModal();
      dialog.current.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    }
  }, [selected]);

  function toggleSaved(course: Course) {
    const saved = state.saved.includes(course.id);
    const ok = updatePreview(current => ({ ...current,
      saved: current.saved.includes(course.id) ? current.saved.filter(value => value !== course.id) : [...current.saved, course.id],
    }));
    setMessage(ok ? `${course.title}: ${saved ? "removed from Saved" : "saved for later"}.` : "Could not save this change. Your previous data is unchanged.");
  }
  function preview(course: Course, button: HTMLButtonElement) {
    trigger.current = button;
    setMessage("");
    setSelected(course);
  }

  return <>
    {!filtered && <MarketplaceFeatures courses={featured} saved={state.saved} writable={ready && writable} onPreview={preview} onSave={toggleSaved} />}
    {!filtered && <MarketplaceCollections courses={courses} options={options} saved={state.saved} writable={ready && writable} onPreview={preview} onSave={toggleSaved} />}
    <section className={styles.marketCatalog} aria-labelledby="marketplace-courses" aria-busy={pending}>
    <div className={styles.marketCatalogHeading}>
      <div><h2 id="marketplace-courses">{collection?.title ?? (filtered ? "Find your next course" : "Explore all courses")}</h2>
        {collection && <p>{collection.description}</p>}
        <p>{courses.length} {courses.length === 1 ? "course" : "courses"} to explore. Sample prices. Checkout is not connected.</p></div>
      <Link className={styles.textButton} href="/learn/courses">Full catalog <Icon name="arrow" /></Link>
    </div>
    {filtered && <nav className={styles.marketActiveFilters} aria-label="Active course filters">
      <Link href="/learn/home">Clear selection</Link>
      {options.collection && <Link aria-label="Remove collection" href={marketplaceHref({ ...options, collection: undefined })}>{collection?.title} &times;</Link>}
      {options.category && <Link aria-label="Remove subject" href={marketplaceHref({ ...options, category: "" })}>{options.category} &times;</Link>}
      {options.level && <Link aria-label="Remove experience level" href={marketplaceHref({ ...options, level: undefined })}>{options.level} &times;</Link>}
      {options.duration && <Link aria-label="Remove duration" href={marketplaceHref({ ...options, duration: undefined })}>Up to {options.duration} min &times;</Link>}
    </nav>}
    <div className={styles.marketFilters}>
      <nav aria-label="Course prices" className={styles.marketPriceFilters}>
        {([['all', 'All prices'], ['free', 'Free'], ['under50', 'Under €50']] as const).map(([price, label]) =>
          <Link key={price} href={marketplaceHref({ ...options, price })} aria-current={options.price === price ? "page" : undefined}>{label}</Link>)}
      </nav>
      <form action="/learn/home" onSubmit={event => {
        event.preventDefault();
        const next = marketplaceOptions(Object.fromEntries(new FormData(event.currentTarget)));
        transition(() => router.push(marketplaceHref(next), { scroll: false }));
      }}>
        <input type="hidden" name="collection" value={options.collection ?? ""} /><input type="hidden" name="level" value={options.level ?? ""} /><input type="hidden" name="duration" value={options.duration ?? ""} />
        <input type="hidden" name="category" value={options.category} />
        <input type="hidden" name="price" value={options.price} />
        <label htmlFor={`${id}-sort`}>Sort</label>
        <select id={`${id}-sort`} name="sort" defaultValue={options.sort} key={options.sort}
          onChange={event => event.currentTarget.form?.requestSubmit()}>
          <option value="featured">Featured</option><option value="price">Price: low to high</option><option value="duration">Shortest first</option>
        </select>
        <button type="submit" className={styles.marketSortApply}>Apply</button>
      </form>
    </div>
    {courses.length ? <div className={styles.marketCourseGrid}>
      {courses.map(course => <MarketplaceCourseCard key={course.id} course={course} saved={state.saved.includes(course.id)} writable={ready && writable} onSave={toggleSaved} onPreview={preview} />)}
    </div> : <div className={styles.marketEmpty}><Icon name="search" width="28" height="28" /><h3>No courses in this selection yet.</h3><p>Try another subject or include all prices.</p><Link className={styles.primaryButton} href="/learn/home">Browse all courses</Link></div>}
    <p role="status" className={styles.srOnly}>{pending ? "Updating courses" : message}</p>
    <dialog ref={dialog} className={styles.marketPreview} aria-labelledby={`${id}-title`} onKeyDown={containDialogFocus}
      onClose={() => { setSelected(null); trigger.current?.focus({ preventScroll: true }); }}>
      {selected && <CourseQuickPreview course={selected} titleId={`${id}-title`} introduction={sampleIntroductions[selected.id]} saved={state.saved.includes(selected.id)} writable={ready && writable} message={message} onSave={() => toggleSaved(selected)} onClose={() => dialog.current?.close()} />}
    </dialog>
  </section></>;
}
