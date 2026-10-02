import { courses } from "../../../lib/platform/catalog";
import { LearningLibrary } from "../../../components/platform/learning-library";
import styles from "../../../components/platform/platform.module.css";
export default function Page() { return <div className={styles.page}><header className={styles.collectionHeader}><p className={styles.eyebrow}>YOUR OWN PACE</p><h1>My learning</h1><p>A little progress is still progress. Pick up an idea and keep going.</p></header><LearningLibrary courses={courses} mode="started" /></div>; }
