"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { courseById } from "../../lib/platform/catalog";
import { usePreview } from "./preview-store";
import { Icon } from "./icon";
import styles from "./platform.module.css";
const navigation = [
  { href: "/learn", label: "Discover", icon: "discover" }, { href: "/learn/library", label: "My learning", icon: "library" },
  { href: "/learn/saved", label: "Saved", icon: "saved" }, { href: "/learn/community", label: "Community", icon: "community" },
] as const;
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
      <nav className={styles.navigation} aria-label="Main navigation">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}><Icon name={item.icon} /><span>{item.label}</span></Link>)}</nav>
      <div className={styles.sidebarBottom}><span className={styles.previewBadge}>LOCAL PREVIEW</span><p>Your ideas. Your next chapter.</p><small>Original demo courses. No account, purchase, or public posting.</small><Link href="/">Open music reference <span aria-hidden="true">↗</span></Link></div></aside>
    <main ref={main} id="learning-content" tabIndex={-1} className={styles.main}><div className={styles.previewNotice}>Learning preview <span>·</span> Sample catalog. Activity stays in this browser.</div>{snapshot.issue && <p role="status" className={styles.storageNotice}>{snapshot.issue}</p>}{children}<footer className={styles.footer}><strong>Make room for what comes next.</strong><p>Courses is an independent learning concept. Demo prices are illustrative; checkout is not connected.</p></footer></main>
    {!learning && course && lesson && <aside className={styles.resumeDock} aria-label="Continue learning"><span className={`${styles.resumeArtwork} ${styles[course.cover]}`}><Icon name="book" /></span><div><small>Pick up where you left off</small><strong>{lesson.title}</strong><span>{course.title}</span></div><Link className={styles.primaryButton} href={`/learn/courses/${course.slug}/lessons/${lesson.id}`}>Continue <Icon name="arrow" /></Link></aside>}
  </div>;
}
