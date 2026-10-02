import Link from "next/link";
import { notFound } from "next/navigation";
import { creatorBySlug, creators, topics } from "../../../../lib/platform/discovery";
import { courses } from "../../../../lib/platform/catalog";
import { CourseCard } from "../../../../components/platform/course-card";
import { CreatorFollow } from "../../../../components/platform/creator-follow";
import { CreatorCard, LessonRows } from "../../../../components/platform/discovery-cards";
import { EditorialShelf } from "../../../../components/platform/editorial-shelf";
import styles from "../../../../components/platform/platform.module.css";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const creator = creatorBySlug((await params).slug);
  return { title: creator ? `${creator.name} — Courses` : "Creator not found — Courses" };
}
export default async function CreatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const creator = creatorBySlug((await params).slug);
  if (!creator) notFound();
  const catalog = courses.filter(course => course.creatorId === creator.id);
  const topic = topics.find(item => item.name === creator.category)!;
  return <div>
    <header className={`${styles.creatorHero} ${styles[creator.color]}`}>
      <Link className={styles.heroBack} href="/learn/creators">‹ Creators</Link>
      <span className={styles.heroMonogram} aria-hidden="true">{creator.initials}</span>
      <div className={styles.heroCopy}><p className={styles.eyebrow}>DEMO CREATOR · {creator.category.toUpperCase()}</p><h1>{creator.name}</h1><p>{creator.headline}</p></div>
    </header>
    <div className={styles.page}>
      <div className={styles.creatorToolbar}><Link className={styles.primaryButton} href={catalog[0] ? `/learn/courses/${catalog[0].slug}` : "/learn/courses"}>Explore courses</Link><CreatorFollow creator={creator} /></div>
      <div className={styles.creatorOverview}>
        <section aria-labelledby="creator-course"><div className={styles.sectionHeading}><h2 id="creator-course">Start here</h2></div>{catalog[0] && <CourseCard course={catalog[0]} />}</section>
        <section aria-labelledby="creator-lessons"><div className={styles.sectionHeading}><div><h2 id="creator-lessons">Open lessons</h2><p>Try a sample before choosing a course.</p></div></div><LessonRows courses={catalog} /></section>
      </div>
      <section className={styles.section}><div className={styles.sectionHeading}><h2>Courses by {creator.name}</h2><span className={styles.muted}>{catalog.length} demo course</span></div><EditorialShelf label={`${creator.name} courses`}>{catalog.map(course => <CourseCard key={course.id} course={course} />)}</EditorialShelf></section>
      <section className={`${styles.section} ${styles.creatorAbout}`}><div><h2>About {creator.name}</h2><p>{creator.about}</p><p className={styles.muted}>Fictional profile for this local preview. Original lesson content is provided by Courses Studio; no instructor credentials, followers, or sales are claimed.</p></div><div><p className={styles.eyebrow}>SUBJECT</p><Link className={styles.textButton} href={`/learn/categories/${topic.slug}`}>{topic.name} ›</Link><p className={styles.eyebrow}>FORMAT</p><p>Reading lessons and practical exercises</p></div></section>
      <section className={styles.section}><div className={styles.sectionHeading}><h2>More creators to explore</h2><Link className={styles.textButton} href="/learn/creators">See all ›</Link></div><EditorialShelf label="more creators" variant="creators">{creators.filter(item => item.id !== creator.id).map(item => <CreatorCard key={item.id} creator={item} />)}</EditorialShelf></section>
    </div>
  </div>;
}
