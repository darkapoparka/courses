"use client";
import Link from "next/link";
import type { Course } from "../../lib/platform/types";
import { offerPrice } from "../../lib/platform/marketplace";
import { CourseArtwork } from "./course-artwork";
import { EditorialShelf } from "./editorial-shelf";
import { Icon } from "./icon";
import styles from "./platform.module.css";

type Props = { courses: readonly Course[]; saved: readonly string[]; writable: boolean;
  onPreview: (course: Course, trigger: HTMLButtonElement) => void; onSave: (course: Course) => void };

const featuredOrder = new Map(["design", "photo", "web", "writing", "business"].map((id, index) => [id, index]));

export function MarketplaceFeatures({ courses, saved, writable, onPreview, onSave }: Props) {
  return <section className={styles.editorialFeatures} aria-labelledby="featured-courses-title">
    <div className={styles.editorialHeading}><h2 id="featured-courses-title">Featured courses</h2><span>Something worth getting into.</span></div>
    <EditorialShelf label="Marketplace features" variant="posters">
      {[...courses].sort((a, b) => (featuredOrder.get(a.id) ?? featuredOrder.size) - (featuredOrder.get(b.id) ?? featuredOrder.size)).map((course, index) => <article key={course.id} className={styles.featurePoster} data-feature-course={course.id}>
        <Link className={styles.featurePosterLink} href={`/learn/courses/${course.slug}`} aria-label={`Explore ${course.title}`}>
          <CourseArtwork course={course} format="poster" priority={index === 0} />
          <span className={styles.featureOffer}>{offerPrice(course)}</span>
        </Link>
        <div className={styles.featurePosterActions}>
          <button type="button" aria-label={`Preview featured ${course.title}`} onClick={event => onPreview(course, event.currentTarget)}><Icon name="book" /></button>
          <button type="button" aria-label={`${saved.includes(course.id) ? "Unsave" : "Save"} featured ${course.title}`} aria-pressed={saved.includes(course.id)} disabled={!writable} onClick={() => onSave(course)}><Icon name={saved.includes(course.id) ? "check" : "saved"} /></button>
        </div>
      </article>)}
    </EditorialShelf>
  </section>;
}
