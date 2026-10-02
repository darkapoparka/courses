import Link from "next/link";
import { courses } from "../../../lib/platform/catalog";
import { CourseCard } from "../../../components/platform/course-card";
import styles from "../../../components/platform/platform.module.css";

export const metadata = { title: "All courses — Courses" };
export default function CoursesPage() {
  return <div className={styles.page}>
    <header className={styles.collectionHeader}>
      <p className={styles.eyebrow}>MAKE ROOM FOR SOMETHING NEW</p>
      <h1>Courses</h1><p>Explore the complete demo catalog.</p>
    </header>
    <Link className={styles.textButton} href="/learn/categories">Browse by category ›</Link>
    <div className={styles.cardGrid}>{courses.map(course => <CourseCard key={course.id} course={course} />)}</div>
  </div>;
}
