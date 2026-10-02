"use client";
import Link from "next/link";
import { useState } from "react";
import type { Course } from "../../lib/platform/types";
import { usePreview, updatePreview } from "./preview-store";
import { Icon } from "./icon";
import styles from "./platform.module.css";
export function CourseActions({ course }: { course: Course }) {
  const { state, ready, writable } = usePreview();
  const [message, setMessage] = useState("");
  const saved = state.saved.includes(course.id);
  const lesson = state.resume?.courseId === course.id ? course.lessons.find(item => item.id === state.resume?.lessonId) : undefined;
  const destination = lesson ?? course.lessons[0];
  function toggleSave() {
    const ok = updatePreview(current => ({ ...current, saved: current.saved.includes(course.id) ? current.saved.filter(id => id !== course.id) : [...current.saved, course.id] }));
    setMessage(ok ? (saved ? "Removed from Saved." : "Saved in this browser. Saving does not enroll you.") : "This change could not be saved.");
  }
  return <div><div className={styles.actions}><Link className={styles.primaryButton} href={`/learn/courses/${course.slug}/lessons/${destination.id}`}><Icon name="book" />{lesson ? "Continue learning" : course.priceMinor === 0 ? "Start free demo" : "Read sample lesson"}</Link><button className={styles.secondaryButton} aria-pressed={saved} disabled={!ready || !writable} onClick={toggleSave}><Icon name={saved ? "check" : "saved"} />{saved ? "Saved" : "Save course"}</button></div><p className={styles.actionNote} role="status">{message || (course.priceMinor ? "Sample lesson is open. Paid access and checkout are not connected." : "All three demo lessons are open. No sign-in or enrollment is required.")}</p></div>;
}
