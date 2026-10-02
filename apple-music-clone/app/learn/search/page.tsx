import Link from "next/link";
import { filterCourses } from "../../../lib/platform/catalog";
import { creators, topics } from "../../../lib/platform/discovery";
import { CreatorCard, TopicCard } from "../../../components/platform/discovery-cards";
import { CourseCard } from "../../../components/platform/course-card";
import styles from "../../../components/platform/platform.module.css";

export const metadata = { title: "Search — Courses" };
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim().slice(0, 100) : "";
  const found = filterCourses(query, "");
  const people = query ? creators.filter(creator => `${creator.name} ${creator.category}`.toLowerCase().includes(query.toLowerCase())) : [];
  return <div className={styles.page}>
    <header className={styles.pageHeader}><h1>Search</h1><form role="search" action="/learn/search" className={styles.search}><label className={styles.srOnly} htmlFor="search-everything">Search courses</label><input id="search-everything" name="q" key={query} defaultValue={query} maxLength={100} placeholder="Courses, creators, and subjects" /><button type="submit">Search</button></form></header>
    {!query && <section><div className={styles.sectionHeading}><h2>Browse categories</h2></div><div className={styles.topicGrid}>{topics.map(topic => <TopicCard key={topic.slug} topic={topic} />)}</div></section>}
    {people.length > 0 && <section className={styles.section}><div className={styles.sectionHeading}><h2>Creators</h2></div><div className={styles.creatorGrid}>{people.map(creator => <CreatorCard key={creator.id} creator={creator} />)}</div></section>}
    <section className={styles.section}><div className={styles.sectionHeading}><h2>{query ? `Courses matching “${query}”` : "Explore courses"}</h2><Link className={styles.textButton} href="/learn/courses">See all ›</Link></div>
      {found.length ? <div className={styles.cardGrid}>{found.map(course => <CourseCard key={course.id} course={course} />)}</div> : <div className={styles.empty}><h2>No courses match this search.</h2><p>Try a creator name or a subject such as design.</p><Link className={styles.primaryButton} href="/learn/search">Browse categories</Link></div>}
    </section>
  </div>;
}
