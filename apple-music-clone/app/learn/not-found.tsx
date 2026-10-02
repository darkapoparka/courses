import Link from "next/link";
import styles from "../../components/platform/platform.module.css";
export default function NotFound() { return <div className={styles.empty}><h1>That chapter isn’t here.</h1><p>The course or lesson could not be found. Your saved learning has not changed.</p><Link href="/learn" className={styles.primaryButton}>Explore courses</Link></div>; }
