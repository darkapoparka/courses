import { catalogOptions } from "../../../lib/platform/search";
import { courses } from "../../../lib/platform/catalog";
import { LearningLibrary } from "../../../components/platform/learning-library";
import styles from "../../../components/platform/platform.module.css";
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) { return <div className={styles.page}><header className={styles.collectionHeader}><p className={styles.eyebrow}>YOUR OWN PACE</p><h1>My learning</h1><p>A little progress is still progress. Pick up an idea and keep going.</p></header><LearningLibrary options={catalogOptions(await searchParams)} courses={courses} mode="started" /></div>; }
