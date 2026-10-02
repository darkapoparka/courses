import styles from "../../components/platform/platform.module.css";
export default function Loading() { return <div className={styles.page} role="status" aria-live="polite"><div className={styles.loadingBlock} /><p className={styles.muted}>Opening your next chapter…</p></div>; }
