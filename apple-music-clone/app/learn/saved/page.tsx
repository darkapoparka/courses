import { courses } from "../../../lib/platform/catalog";
import { LearningLibrary } from "../../../components/platform/learning-library";
import styles from "../../../components/platform/platform.module.css";
export default function Page() { return <div className={styles.page}><header className={styles.collectionHeader}><p className={styles.eyebrow}>YOUR OWN PACE</p><h1>Saved</h1><p>Keep your next possibilities close. Bookmarks are separate from learning access.</p></header><LearningLibrary courses={courses} mode="saved" /></div>; }
