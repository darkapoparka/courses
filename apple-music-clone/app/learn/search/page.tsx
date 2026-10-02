import { normalizeQuery, searchKind, searchScope } from "../../../lib/platform/search";
import { SearchResults } from "../../../components/platform/search-results";
import styles from "../../../components/platform/platform.module.css";

export const metadata = { title: "Search — Courses" };
export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const query = normalizeQuery(params.q);
  return <div className={styles.page}>
    <header className={styles.collectionHeader}><p className={styles.eyebrow}>FIND YOUR NEXT CHAPTER</p><h1>Search</h1><p>Courses, creators, lessons, and subjects. Keep exploring.</p></header>
    <SearchResults query={query} scope={searchScope(params.scope)} kind={searchKind(params.type)} />
  </div>;
}
