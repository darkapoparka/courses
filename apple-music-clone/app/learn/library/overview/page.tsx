import type { Metadata } from "next";
import Link from "next/link";
import { LearningHome } from "../../../../components/platform/learning-home";
import { HomePreferencesDialog } from "../../../../components/platform/home-preferences";
import styles from "../../../../components/platform/platform.module.css";

export const metadata: Metadata = { title: "Learning overview — Courses" };
export default function LearningOverviewPage() {
  return <div className={styles.page} data-learning-home>
    <header className={`${styles.pageHeader} ${styles.homeHeader}`}>
      <div><h1 id="home-title" tabIndex={-1}>Learning overview</h1><p className={styles.homeSubtitle}>A place to return to. A reason to keep going.</p></div>
      <HomePreferencesDialog />
    </header>
    <nav className={styles.libraryTabs} aria-label="My learning views"><Link href="/learn/library">Your courses</Link><Link href="/learn/library/overview" aria-current="page">Learning overview</Link></nav>
    <nav className={styles.homeShortcuts} aria-label="Home shortcuts">
      <Link href="#continue-heading">Continue learning</Link>
      <Link href="#home-picks-heading">Picks for you</Link>
      <Link href="#quick-lessons-heading">Short lessons</Link>
      <Link href="/learn">Discover something new</Link>
    </nav>
    <LearningHome />
  </div>;
}
