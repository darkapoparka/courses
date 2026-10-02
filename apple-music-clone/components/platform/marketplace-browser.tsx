"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import { creatorById, creatorName } from "../../lib/platform/discovery";
import { marketplaceHref, marketplaceOptions, offerPrice, type MarketplaceOptions } from "../../lib/platform/marketplace";
import type { Course } from "../../lib/platform/types";
import { usePreview, updatePreview } from "./preview-store";
import { Icon } from "./icon";
import { CourseArtwork } from "./course-artwork";
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
  const filtered = Boolean(options.category || options.price !== "all");
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
    {!filtered && <MarketplaceFeatures courses={courses} saved={state.saved} writable={ready && writable} onPreview={preview} onSave={toggleSaved} />}
    <section className={styles.marketCatalog} aria-labelledby="marketplace-courses" aria-busy={pending}>
    <div className={styles.marketCatalogHeading}>
      <div><h2 id="marketplace-courses">{filtered ? "Find your next course" : "Courses to get you started"}</h2>
        <p>{courses.length} {courses.length === 1 ? "course" : "courses"} to explore. Sample prices. Checkout is not connected.</p></div>
      <Link className={styles.textButton} href="/learn/courses">Full catalog <Icon name="arrow" /></Link>
    </div>
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
      {courses.map(course => {
        const creator = creatorById(course.creatorId);
        const saved = state.saved.includes(course.id);
        return <article className={styles.marketCourseCard} key={course.id} data-market-course={course.id}>
          <div className={styles.marketCardArt}>
            <Link href={`/learn/courses/${course.slug}`} aria-label={`View ${course.title}`}>
              <CourseArtwork course={course} />
            </Link>


          </div>
          <div className={styles.marketCardHeading}><h3><Link href={`/learn/courses/${course.slug}`}>{course.title}</Link></h3><strong>{offerPrice(course)}</strong></div>
          <Link className={styles.marketTeacher} href={`/learn/creators/${creator?.slug}`}>{creatorName(course)}</Link>
          <p className={styles.marketCardMeta}>{course.level} · {course.lessons.length} lessons · {course.minutes} min</p>
          <div className={styles.marketCardBottom}>
            <button type="button" onClick={event => preview(course, event.currentTarget)} aria-label={`Preview ${course.title}`}>Preview <Icon name="arrow" /></button>
            <button type="button" className={styles.marketBookmark} aria-label={`${saved ? "Unsave" : "Save"} ${course.title}`}
              aria-pressed={saved} disabled={!ready || !writable} onClick={() => toggleSaved(course)}><Icon name={saved ? "check" : "saved"} /></button>
          </div>
        </article>;
      })}
    </div> : <div className={styles.marketEmpty}><Icon name="search" width="28" height="28" /><h3>No courses in this selection yet.</h3><p>Try another subject or include all prices.</p><Link className={styles.primaryButton} href="/learn/home">Browse all courses</Link></div>}
    <p role="status" className={styles.srOnly}>{pending ? "Updating courses" : message}</p>
    <dialog ref={dialog} className={styles.marketPreview} aria-labelledby={`${id}-title`} onKeyDown={containDialogFocus}
      onClose={() => { setSelected(null); trigger.current?.focus({ preventScroll: true }); }}>
      {selected && <CourseQuickPreview course={selected} titleId={`${id}-title`} introduction={sampleIntroductions[selected.id]} saved={state.saved.includes(selected.id)} writable={ready && writable} message={message} onSave={() => toggleSaved(selected)} onClose={() => dialog.current?.close()} />}
    </dialog>
  </section></>;
}
