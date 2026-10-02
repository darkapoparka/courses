"use client";
import Link from "next/link";
import type { Course } from "../../lib/platform/types";
import { usePreview } from "./preview-store";
import { CourseCard } from "./course-card";
import styles from "./platform.module.css";
export function LearningLibrary({ courses, mode }: { courses: readonly Course[]; mode: "saved" | "started" }) {
  const { state, ready } = usePreview();
  const selected = courses.filter(course => mode === "saved" ? state.saved.includes(course.id) : course.lessons.some(lesson => Boolean(state.progress[lesson.id])));
  if (!ready) return <p role="status" className={styles.empty}>Loading this browser’s learning activity…</p>;
  if (!selected.length) return <div className={styles.empty}><h2>{mode === "saved" ? "Make a little room for curiosity." : "Your next chapter starts here."}</h2><p>{mode === "saved" ? "Save a course to keep it close. Saved courses are bookmarks, not purchases." : "Open a sample or a free demo lesson. Your reading and completion will appear here."}</p><Link className={styles.primaryButton} href="/learn">Explore courses</Link></div>;
  return <div className={styles.cardGrid}>{selected.map(course => {
    const done = course.lessons.filter(lesson => state.progress[lesson.id]?.completed).length;
    return <div key={course.id}><CourseCard course={course} />{mode === "started" && <div className={styles.courseProgress}><progress value={done} max={course.lessons.length} aria-label={`${course.title}: ${done} of ${course.lessons.length} lessons complete`} /><span>{done} of {course.lessons.length} complete in this browser</span></div>}</div>;
  })}</div>;
}
