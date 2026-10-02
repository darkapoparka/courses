import Link from "next/link";
import { priceLabel } from "../../lib/platform/catalog";
import type { Course } from "../../lib/platform/types";
import styles from "./platform.module.css";
export function Cover({ course }: { course: Course }) {
  return <div className={`${styles.cover} ${styles[course.cover]}`} aria-hidden="true"><span className={styles.coverKicker}>{course.category} / Courses Studio</span><strong>{course.coverLabel}</strong><span className={styles.coverFooter}>A little learning. A new perspective.</span></div>;
}
export function CourseCard({ course }: { course: Course }) {
  return <article className={styles.courseCard}><Link href={`/learn/courses/${course.slug}`} className={styles.cardLink}><Cover course={course} /><h3>{course.title}</h3><p>{course.creator} · {course.category}</p><p className={styles.cardMeta}>{course.minutes} min · {priceLabel(course)}</p></Link></article>;
}
