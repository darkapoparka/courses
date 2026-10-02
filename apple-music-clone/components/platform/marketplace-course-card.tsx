import Link from "next/link";
import type { Course } from "../../lib/platform/types";
import { creatorById, creatorName } from "../../lib/platform/discovery";
import { offerPrice } from "../../lib/platform/marketplace";
import { CourseArtwork } from "./course-artwork";
import { Icon } from "./icon";
import styles from "./platform.module.css";

type Props = { course: Course; saved: boolean; writable: boolean; placement?: string;
  onSave: (course: Course) => void; onPreview: (course: Course, trigger: HTMLButtonElement) => void };
export function MarketplaceCourseCard({ course, saved, writable, placement, onSave, onPreview }: Props) {
  const creator = creatorById(course.creatorId);
  const suffix = placement ? ` in ${placement}` : "";
  return <article className={styles.marketCourseCard} data-market-course={!placement ? course.id : undefined} data-shelf-course={placement ? course.id : undefined}>
    <div className={styles.marketCardArt}><Link href={`/learn/courses/${course.slug}`} aria-label={`View ${course.title}${suffix}`}><CourseArtwork course={course} /></Link></div>
    <div className={styles.marketCardHeading}><h3><Link href={`/learn/courses/${course.slug}`}>{course.title}</Link></h3><strong>{offerPrice(course)}</strong></div>
    {creator && <Link className={styles.marketTeacher} href={`/learn/creators/${creator.slug}`}>{creatorName(course)}</Link>}
    <p className={styles.marketCardMeta}>{course.level} · {course.lessons.length} lessons · {course.minutes} min</p>
    <div className={styles.marketCardBottom}>
      <button type="button" onClick={event => onPreview(course, event.currentTarget)} aria-label={`Preview ${course.title}${suffix}`}>Preview <Icon name="arrow" /></button>
      <button type="button" className={styles.marketBookmark} aria-label={`${saved ? "Unsave" : "Save"} ${course.title}${suffix}`} aria-pressed={saved} disabled={!writable} onClick={() => onSave(course)}><Icon name={saved ? "check" : "saved"} /></button>
    </div>
  </article>;
}
