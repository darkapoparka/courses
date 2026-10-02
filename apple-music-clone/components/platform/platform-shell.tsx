"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { SearchToolbar, SearchToolbarFallback } from "./search-toolbar";
import { courseById } from "../../lib/platform/catalog";
import { usePreview } from "./preview-store";
import { PlatformNavigation } from "./platform-navigation";
import { Icon } from "./icon";
import styles from "./platform.module.css";
export function PlatformShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); const main = useRef<HTMLElement>(null); const previous = useRef(pathname);
  const snapshot = usePreview(); const resume = snapshot.state.resume;
  const course = resume ? courseById(resume.courseId) : undefined;
  const lesson = course?.lessons.find(item => item.id === resume?.lessonId);
  const learning = pathname.includes("/lessons/");
  useEffect(() => { if (previous.current !== pathname) { main.current?.scrollTo({ top: 0 }); main.current?.focus({ preventScroll: true }); previous.current = pathname; } }, [pathname]);
  return <div className={styles.shell} data-course-platform="true">
    <a className={styles.skipLink} href="#learning-content">Skip to content</a>
    <aside className={styles.sidebar} aria-label="Courses navigation"><Link href="/learn" className={styles.brand}><span className={styles.brandMark}><Icon name="book" /></span>Courses</Link><p className={styles.sidebarCaption}>A place to keep growing.</p>
      <PlatformNavigation pathname={pathname} />
      <div className={styles.sidebarBottom}><span className={styles.previewBadge}>LOCAL PREVIEW</span><p>Your ideas. Your next chapter.</p><small>Original demo courses. No account, purchase, or public posting.</small><Link href="/">Open music reference <span aria-hidden="true">↗</span></Link></div></aside>
    <main ref={main} id="learning-content" tabIndex={-1} className={styles.main}><Suspense fallback={<SearchToolbarFallback />}><SearchToolbar /></Suspense><div className={styles.previewNotice}>Learning preview <span>·</span> Sample catalog. Activity stays in this browser.</div>{snapshot.issue && <p role="status" className={styles.storageNotice}>{snapshot.issue}</p>}{children}<footer className={styles.footer}><strong>Make room for what comes next.</strong><p>Courses is an independent learning concept. Demo prices are illustrative; checkout is not connected.</p></footer></main>
    {!learning && course && lesson && <aside className={styles.resumeDock} aria-label="Continue learning"><span className={`${styles.resumeArtwork} ${styles[course.cover]}`}><Icon name="book" /></span><div><small>Pick up where you left off</small><strong>{lesson.title}</strong><span>{course.title}</span></div><Link className={styles.primaryButton} href={`/learn/courses/${course.slug}/lessons/${lesson.id}`}>Continue <Icon name="arrow" /></Link></aside>}
  </div>;
}
