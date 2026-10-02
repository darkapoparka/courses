import Link from "next/link";
import { courses } from "../../../lib/platform/catalog";
import { catalogOptions } from "../../../lib/platform/search";
import { CatalogBrowser } from "../../../components/platform/catalog-browser";
import styles from "../../../components/platform/platform.module.css";

export const metadata = { title: "All courses — Courses" };
export default async function CoursesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <div className={styles.page}>
    <header className={styles.collectionHeader}><p className={styles.eyebrow}>MAKE ROOM FOR SOMETHING NEW</p><h1>Courses</h1><p>Explore the complete demo catalog.</p></header>
    <Link className={styles.textButton} href="/learn/categories">Browse by category ›</Link>
    <CatalogBrowser courses={courses} options={catalogOptions(await searchParams)} />
  </div>;
}
