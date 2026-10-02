import Link from "next/link";
import { notFound } from "next/navigation";
import { canReadDemoLesson, courseBySlug, priceLabel } from "../../../../lib/platform/catalog";
import { Cover } from "../../../../components/platform/course-card";
import { CourseActions } from "../../../../components/platform/course-actions";
import { Icon } from "../../../../components/platform/icon";
import styles from "../../../../components/platform/platform.module.css";
export default async function CourseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courseBySlug(slug); if (!course) notFound();
  return <div className={styles.page}><Link href="/learn" className={styles.backLink}>‹ Discover</Link><section className={styles.detailHero}><Cover course={course} /><div><p className={styles.eyebrow}>{course.category} · ORIGINAL DEMO COURSE</p><h1>{course.title}</h1><p className={styles.lead}>{course.subtitle}</p><p className={styles.creator}>{course.creator}</p><div className={styles.facts}><span>{course.level}</span><span>{course.lessons.length} reading lessons</span><span>{course.minutes} min estimated</span></div><strong className={styles.price}>{priceLabel(course)}</strong><CourseActions course={course} /></div></section>
    <div className={styles.detailColumns}><section aria-labelledby="curriculum-heading"><div className={styles.sectionHeading}><div><h2 id="curriculum-heading">Your next three steps</h2><p>A short sequence. Space to put it into practice.</p></div></div><ol className={styles.curriculum}>{course.lessons.map((lesson, index) => <li key={lesson.id}><Link href={`/learn/courses/${course.slug}/lessons/${lesson.id}`}><span className={styles.lessonNumber}>{String(index + 1).padStart(2, "0")}</span><div><strong>{lesson.title}</strong><span>{lesson.minutes} min read {lesson.preview ? "· Open sample" : course.priceMinor ? "· Not available in preview" : "· Free demo lesson"}</span></div><Icon name={canReadDemoLesson(course, lesson.id) ? "arrow" : "lock"} /></Link></li>)}</ol></section><aside className={styles.aboutCourse}><h2>What you’ll practice</h2><p>{course.outcome}</p><h3>Bring along</h3><p>{course.prerequisites}</p><h3>A little context</h3><p>This is original demonstration content by Courses Studio, not a verified commercial instructor offering. Reading times and prices are illustrative.</p><Link className={styles.textButton} href={`/learn/community?course=${course.id}`}>Discuss this course <Icon name="arrow" /></Link></aside></div>
  </div>;
}
