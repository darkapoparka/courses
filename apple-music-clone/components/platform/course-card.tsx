import Link from "next/link";
import { priceLabel } from "../../lib/platform/catalog";
import { creatorById, creatorName } from "../../lib/platform/discovery";
import { CourseArtwork } from "./course-artwork";
import type { Course } from "../../lib/platform/types";
import styles from "./platform.module.css";

export function Cover({ course }: { course: Course }) {
  return <CourseArtwork course={course} />;
}
export function CourseCard({ course }: { course: Course }) {
  const creator = creatorById(course.creatorId);
  return <article className={styles.courseCard}>
    <Link href={`/learn/courses/${course.slug}`} className={styles.cardLink}><Cover course={course} /><h3>{course.title}</h3></Link>
    <p className={styles.cardCreator}>{creator ? <Link href={`/learn/creators/${creator.slug}`}>{creator.name}</Link> : "Demo creator"} · {course.category}</p>
    <p className={styles.cardPrice}>{course.minutes} min · {priceLabel(course)}</p>
  </article>;
}
