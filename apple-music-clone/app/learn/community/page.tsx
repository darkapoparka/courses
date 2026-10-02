import { courses } from "../../../lib/platform/catalog";
import { CommunityFeed } from "../../../components/platform/community-feed";
import styles from "../../../components/platform/platform.module.css";
export default async function Community({ searchParams }: { searchParams: Promise<{ course?: string | string[] }> }) {
  const { course } = await searchParams;
  const initialCourse = typeof course === "string" && courses.some(item => item.id === course) ? course : "";
  return <div className={styles.page}><header className={styles.collectionHeader}><p className={styles.eyebrow}>KEEP THE CURIOSITY GOING</p><h1>Community</h1><p>Good questions deserve a place next to the learning that inspired them.</p></header><CommunityFeed key={initialCourse} courses={courses} initialCourse={initialCourse} /></div>;
}
