import Link from "next/link";
import type { Course } from "../../lib/platform/types";
import { collections, collectionCourses } from "../../lib/platform/merchandising";
import { marketplaceHref, type MarketplaceOptions } from "../../lib/platform/marketplace";
import { EditorialShelf } from "./editorial-shelf";
import { MarketplaceCourseCard } from "./marketplace-course-card";
import { Icon } from "./icon";
import styles from "./platform.module.css";

type Props = { courses: readonly Course[]; options: MarketplaceOptions; saved: readonly string[]; writable: boolean;
  onSave: (course: Course) => void; onPreview: (course: Course, trigger: HTMLButtonElement) => void };
export function MarketplaceCollections({ courses, options, saved, writable, onSave, onPreview }: Props) {
  return <div className={styles.marketCollections}>
    {collections.map(collection => {
      const shown = collectionCourses(collection.id, courses);
      if (!shown.length) return null;
      return <section key={collection.id} data-market-collection={collection.id} aria-labelledby={`collection-${collection.id}`} className={styles.marketCollection}>
        <div className={styles.collectionHeading}>
          <div><h2 id={`collection-${collection.id}`}>{collection.title}{collection.id === "bestsellers" && <span className={styles.demoCollectionLabel}>Demo selection</span>}</h2><p>{collection.description}</p></div>
          <Link className={styles.textButton} href={marketplaceHref({ ...options, collection: collection.id })} aria-label={`See all ${collection.title}`}>See all <Icon name="arrow" /></Link>
        </div>
        <EditorialShelf label={`${collection.title} courses`}>
          {shown.map(course => <MarketplaceCourseCard key={course.id} course={course} saved={saved.includes(course.id)} writable={writable} placement={collection.title} onSave={onSave} onPreview={onPreview} />)}
        </EditorialShelf>
      </section>;
    })}
  </div>;
}
