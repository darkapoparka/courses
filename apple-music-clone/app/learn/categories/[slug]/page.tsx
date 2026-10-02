import Link from "next/link";
import { notFound } from "next/navigation";
import { topics, topicBySlug, creators } from "../../../../lib/platform/discovery";
import { courses } from "../../../../lib/platform/catalog";
import { CourseCard } from "../../../../components/platform/course-card";
import { CreatorCard, LessonRows, TopicCard } from "../../../../components/platform/discovery-cards";
import { EditorialShelf } from "../../../../components/platform/editorial-shelf";
import styles from "../../../../components/platform/platform.module.css";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const topic = topicBySlug((await params).slug);
  return { title: topic ? `${topic.name} courses — Courses` : "Category not found — Courses" };
}
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const topic = topicBySlug((await params).slug);
  if (!topic) notFound();
  const catalog = courses.filter(course => course.category === topic.name);
  return <div className={styles.page}>
    <Link className={styles.backLink} href="/learn/categories">‹ Categories</Link>
    <header className={`${styles.categoryHero} ${styles[topic.color]}`}><p className={styles.eyebrow}>EXPLORE A SUBJECT</p><h1>{topic.name}</h1><p>{topic.description}</p><span>{catalog.length} demo course · {catalog.reduce((sum, course) => sum + course.lessons.length, 0)} lessons</span></header>
    <section className={styles.section}><div className={styles.sectionHeading}><h2>{topic.name} courses</h2><Link className={styles.textButton} href={`/learn?category=${topic.name}`}>View courses ›</Link></div><EditorialShelf label={`${topic.name} courses`}>{catalog.map(course => <CourseCard key={course.id} course={course} />)}</EditorialShelf></section>
    <section className={styles.section}><div className={styles.sectionHeading}><h2>Start with an open lesson</h2></div><LessonRows courses={catalog} /></section>
    <section className={styles.section}><div className={styles.sectionHeading}><h2>Meet the creators</h2></div><EditorialShelf label={`${topic.name} creators`} variant="creators">{creators.filter(creator => creator.category === topic.name).map(creator => <CreatorCard key={creator.id} creator={creator} />)}</EditorialShelf></section>
    <section className={styles.section}><div className={styles.sectionHeading}><h2>Keep exploring</h2></div><div className={styles.topicGrid}>{topics.filter(item => item.slug !== topic.slug).map(item => <TopicCard key={item.slug} topic={item} />)}</div></section>
  </div>;
}
