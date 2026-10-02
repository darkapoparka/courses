import Link from "next/link";
import type { Course } from "../../lib/platform/types";
import { canReadDemoLesson } from "../../lib/platform/catalog";
import { creatorById, creatorName } from "../../lib/platform/discovery";
import { offerPrice } from "../../lib/platform/marketplace";
import { CourseArtwork } from "./course-artwork";
import { Icon } from "./icon";
import styles from "./platform.module.css";

type Props = { course: Course; titleId: string; introduction: string; saved: boolean;
  writable: boolean; message: string; onSave: () => void; onClose: () => void };

export function CourseQuickPreview({ course, titleId, introduction, saved, writable, message, onSave, onClose }: Props) {
  const creator = creatorById(course.creatorId);
  const sample = course.lessons.find(lesson => canReadDemoLesson(course, lesson.id));
  return <>
    <button type="button" autoFocus className={styles.marketPreviewClose} aria-label="Close course preview" onClick={onClose}>×</button>
    <header className={styles.quickPreviewHeader}>
      <CourseArtwork course={course} />
      <div><p className={styles.eyebrow}>{course.category} · COURSE PREVIEW</p>
        <h2 id={titleId}>{course.title}</h2>
        {creator && <Link className={styles.quickPreviewCreator} href={`/learn/creators/${creator.slug}`} onClick={onClose}>{creatorName(course)}</Link>}
        <p className={styles.quickPreviewMeta}>{course.level} · {course.lessons.length} reading lessons · {course.minutes} min</p>
        <strong className={styles.quickPreviewPrice}>{offerPrice(course)}</strong>
      </div>
    </header>
    <div className={styles.marketPreviewBody}>
      <p className={styles.quickPreviewOutcome}>{course.outcome}</p>
      <h3>A look inside</h3><p className={styles.marketSample}>{introduction}</p>
      <ol>{course.lessons.map((lesson, index) => <li key={lesson.id}>
        <span className={styles.quickLessonNumber}>{String(index + 1).padStart(2, "0")}</span>
        {canReadDemoLesson(course, lesson.id)
          ? <Link href={`/learn/courses/${course.slug}/lessons/${lesson.id}`} onClick={onClose}>{lesson.title}</Link>
          : <span>{lesson.title}</span>}
        {!canReadDemoLesson(course, lesson.id) && <Icon name="lock" />}
        <small>{lesson.minutes} min</small>
      </li>)}</ol>
      <div className={styles.actions}>
        <Link className={styles.primaryButton} href={`/learn/courses/${course.slug}`} onClick={onClose}>View course <Icon name="arrow" /></Link>
        {sample && <Link className={styles.secondaryButton} href={`/learn/courses/${course.slug}/lessons/${sample.id}`} onClick={onClose}>Read free sample</Link>}
        <button type="button" className={styles.previewSave} disabled={!writable} aria-pressed={saved} aria-label={`${saved ? "Unsave" : "Save"} preview ${course.title}`} onClick={onSave}><Icon name={saved ? "check" : "saved"} />{saved ? "Saved" : "Save"}</button>
      </div>
      <p role="status" className={styles.actionNote}>{message}</p>
      <p className={styles.marketPreviewDisclaimer}>Original demo course. Prices are illustrative; checkout is not connected.</p>
    </div>
  </>;
}
