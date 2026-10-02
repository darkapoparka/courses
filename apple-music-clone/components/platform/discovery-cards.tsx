import Link from "next/link";
import { creatorName, type Creator, type topics } from "../../lib/platform/discovery";
import { canReadDemoLesson } from "../../lib/platform/catalog";
import type { Course } from "../../lib/platform/types";
import { Cover } from "./course-card";
import { Icon } from "./icon";
import styles from "./platform.module.css";

export function CreatorCard({ creator }: { creator: Creator }) {
  return <Link className={styles.creatorCard} href={`/learn/creators/${creator.slug}`}>
    <span className={`${styles.creatorPortrait} ${styles[creator.color]}`} aria-hidden="true"><span>{creator.initials}</span></span>
    <h3>{creator.name}</h3><p>{creator.category} · Demo creator</p>
  </Link>;
}

export function TopicCard({ topic }: { topic: (typeof topics)[number] }) {
  return <Link className={`${styles.topicCard} ${styles[topic.color]}`} href={`/learn/categories/${topic.slug}`}>
    <span>EXPLORE</span><h2>{topic.name}</h2><p>{topic.description}</p><Icon name="arrow" />
  </Link>;
}

export function LessonRows({ courses }: { courses: readonly Course[] }) {
  return <ol className={styles.lessonRows}>{courses.flatMap(course => course.lessons.filter(lesson => canReadDemoLesson(course, lesson.id)).map(lesson => ({ course, lesson }))).map(({ course, lesson }, index) =>
    <li key={lesson.id}><Link href={`/learn/courses/${course.slug}/lessons/${lesson.id}`}>
      <span className={styles.lessonNumber}>{String(index + 1).padStart(2, "0")}</span>
      <span className={styles.lessonThumb}><Cover course={course} /></span>
      <span className={styles.lessonRowCopy}><strong>{lesson.title}</strong><small>{creatorName(course)} · {course.title}</small></span>
      <span className={styles.lessonDuration}>{lesson.minutes} min</span><Icon name="arrow" />
    </Link></li>)}</ol>;
}
