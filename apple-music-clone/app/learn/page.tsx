import Link from "next/link";
import { categories, courses, filterCourses } from "../../lib/platform/catalog";
import { CourseCard, Cover } from "../../components/platform/course-card";
import { creators, topics } from "../../lib/platform/discovery";
import { CreatorCard, TopicCard, LessonRows } from "../../components/platform/discovery-cards";
import { EditorialShelf } from "../../components/platform/editorial-shelf";
import { Icon } from "../../components/platform/icon";
import styles from "../../components/platform/platform.module.css";
export default async function Discover({ searchParams }: { searchParams: Promise<{ q?: string | string[]; category?: string | string[] }> }) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.slice(0, 100) : "";
  const category = typeof params.category === "string" && categories.some(item => item === params.category) ? params.category : "";
  const filtered = filterCourses(query, category); const filtering = Boolean(query || category);
  return <div className={styles.page}><header className={styles.pageHeader}><div><p className={styles.eyebrow}>FOLLOW YOUR CURIOSITY</p><h1>Discover</h1></div><form action="/learn" className={styles.search} role="search"><Icon name="search" /><label className={styles.srOnly} htmlFor="course-search">Search courses</label><input id="course-search" name="q" defaultValue={query} key={query} maxLength={100} placeholder="Find your next thing" />{category && <input type="hidden" name="category" value={category} />}<button type="submit">Search</button></form></header>
    {!filtering && <section aria-label="Featured courses"><EditorialShelf label="featured courses" variant="features">{courses.map((course, index) => <Link href={`/learn/courses/${course.slug}`} key={course.id} className={styles.featureCard}><div><span>{index === 0 ? "START SOMEWHERE GOOD" : "BUILD SOMETHING THAT MATTERS"}</span><h2>{course.title}</h2><p>{course.subtitle}</p></div><Cover course={course} /></Link>)}</EditorialShelf></section>}
    <section className={styles.section} aria-labelledby="browse-heading"><div className={styles.sectionHeading}><div><h2 id="browse-heading">{filtering ? "Find your next chapter" : "Small courses. Fresh perspectives."}</h2><p>{filtering ? `${filtered.length} ${filtered.length === 1 ? "course" : "courses"} found` : "Original sample lessons to explore, practice, and make your own."}</p></div>{filtering && <Link className={styles.textButton} href="/learn">Clear filters</Link>}</div>
      <nav className={styles.categoryNav} aria-label="Course categories"><Link href={`/learn${query ? `?q=${encodeURIComponent(query)}` : ""}`} aria-current={!category ? "page" : undefined}>All</Link>{categories.map(item => <Link key={item} href={`/learn?${new URLSearchParams({ ...(query ? { q: query } : {}), category: item })}`} aria-current={item === category ? "page" : undefined}>{item}</Link>)}</nav>
      {filtered.length ? <div className={styles.cardGrid}>{filtered.map(course => <CourseCard key={course.id} course={course} />)}</div> : <div className={styles.empty}><h2>A different search might open a door.</h2><p>No courses match “{query || category}”. Try a subject such as design or writing.</p><Link className={styles.primaryButton} href="/learn">Browse all courses</Link></div>}
    </section>
    {!filtering && <>
      <section className={styles.section}><div className={styles.sectionHeading}><h2>Meet your next teacher</h2><Link className={styles.textButton} href="/learn/creators">See all creators ›</Link></div><EditorialShelf label="featured creators" variant="creators">{creators.map(creator => <CreatorCard key={creator.id} creator={creator} />)}</EditorialShelf></section>
      <section className={styles.section}><div className={styles.sectionHeading}><h2>A little learning, right now</h2></div><LessonRows courses={courses.slice(0, 2)} /></section>
      <section className={styles.section}><div className={styles.sectionHeading}><h2>Browse categories</h2><Link className={styles.textButton} href="/learn/categories">See all categories ›</Link></div><div className={styles.topicGrid}>{topics.map(topic => <TopicCard key={topic.slug} topic={topic} />)}</div></section>
    </>}
    {!filtering && <section className={styles.communityCallout}><div className={styles.calloutMark}><Icon name="community" width="36" height="36" /></div><div><p className={styles.eyebrow}>BETTER TOGETHER</p><h2>Turn a lesson into a conversation.</h2><p>Ask a thoughtful question. Share an experiment. Keep the context.</p></div><Link className={styles.secondaryButton} href="/learn/community">Explore community <Icon name="arrow" /></Link></section>}
  </div>;
}
