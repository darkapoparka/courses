import Link from "next/link";
import { priceLabel } from "../../lib/platform/catalog";
import { creatorById, creatorName } from "../../lib/platform/discovery";
import type { Course } from "../../lib/platform/types";
import styles from "./platform.module.css";

export function Cover({ course }: { course: Course }) {
  return <div className={`${styles.cover} ${styles[course.cover]}`} aria-hidden="true"><span className={styles.coverKicker}>{course.category} / {creatorName(course)}</span><strong>{course.coverLabel}</strong><span className={styles.coverFooter}>A little learning. A new perspective.</span></div>;
}
export function CourseCard({ course }: { course: Course }) {
  const creator = creatorById(course.creatorId);
  return <article className={styles.courseCard}>
    <Link href={`/learn/courses/${course.slug}`} className={styles.cardLink}><Cover course={course} /><h3>{course.title}</h3></Link>
    <p className={styles.cardCreator}>{creator ? <Link href={`/learn/creators/${creator.slug}`}>{creator.name}</Link> : "Demo creator"} · {course.category}</p>
    <p className={styles.cardPrice}>{course.minutes} min · {priceLabel(course)}</p>
  </article>;
}
