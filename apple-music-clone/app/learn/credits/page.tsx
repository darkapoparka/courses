import Link from "next/link";
import credits from "../../../public/course-art/credits.json";
import styles from "../../../components/platform/platform.module.css";
export const metadata = { title: "Photo credits — Courses" };
export default function Credits() {
  return <div className={styles.page}>
    <Link href="/learn/home" className={styles.backLink}>Back to browsing</Link>
    <header className={styles.collectionHeader}><h1>Photo credits</h1><p>Contextual imagery for the demo catalog, not course footage or creator endorsements.</p></header>
    <ul className={styles.catalogList}>{credits.map(photo => <li key={photo.file}>
      <span /><div><a href={photo.source} target="_blank" rel="noreferrer" className={styles.listTitle}>Photo by {photo.photographer}</a><a href={photo.license} target="_blank" rel="noreferrer" className={styles.textButton}>Unsplash License</a></div>
    </li>)}</ul>
  </div>;
}
