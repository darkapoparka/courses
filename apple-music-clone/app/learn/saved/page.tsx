import { catalogOptions } from "../../../lib/platform/search";
import { courses } from "../../../lib/platform/catalog";
import { LearningLibrary } from "../../../components/platform/learning-library";
import styles from "../../../components/platform/platform.module.css";
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) { return <div className={styles.page}><header className={styles.collectionHeader}><p className={styles.eyebrow}>YOUR OWN PACE</p><h1>Saved</h1><p>Keep your next possibilities close. Bookmarks are separate from learning access.</p></header><LearningLibrary options={catalogOptions(await searchParams)} courses={courses} mode="saved" /></div>; }
