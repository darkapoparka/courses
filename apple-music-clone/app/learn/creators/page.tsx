import Link from "next/link";
import { creators } from "../../../lib/platform/discovery";
import { CreatorDirectory } from "../../../components/platform/creator-directory";
import styles from "../../../components/platform/platform.module.css";

export const metadata = { title: "Creators — Courses" };
export default async function CreatorsPage({ searchParams }: { searchParams: Promise<{ view?: string; q?: string }> }) {
  const params = await searchParams;
  const followingOnly = params.view === "following";
  const query = typeof params.q === "string" ? params.q.trim().slice(0, 100) : "";
  const shown = creators.filter(creator => `${creator.name} ${creator.category}`.toLowerCase().includes(query.toLowerCase()));
  return <div className={styles.page}>
    <header className={styles.collectionHeader}><p className={styles.eyebrow}>A DIFFERENT WAY TO SEE IT</p><h1>Creators</h1><p>Explore the people behind your next course. These are fictional demo profiles.</p></header>
    <nav className={styles.categoryNav} aria-label="Creator collections">
      <Link href="/learn/creators" aria-current={!followingOnly ? "page" : undefined}>All creators</Link>
      <Link href="/learn/creators?view=following" aria-current={followingOnly ? "page" : undefined}>Following</Link>
    </nav>
    <CreatorDirectory creators={shown} followingOnly={followingOnly} />
  </div>;
}
