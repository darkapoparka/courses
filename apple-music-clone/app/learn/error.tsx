"use client";
import Link from "next/link";
import styles from "../../components/platform/platform.module.css";
export default function LearningError({ reset }: { reset: () => void }) { return <div role="alert" className={styles.empty}><h1>Let’s try that chapter again.</h1><p>This view could not load. Your saved browser activity has not been cleared.</p><button className={styles.primaryButton} onClick={reset}>Try again</button><Link href="/learn">Return to Discover</Link></div>; }
