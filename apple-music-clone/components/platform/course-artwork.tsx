import type { Course } from "../../lib/platform/types";
import { creatorName } from "../../lib/platform/discovery";
import { courseArtwork } from "../../lib/platform/marketplace";
import styles from "./platform.module.css";

export type ArtworkFormat = "square" | "poster";
type Props = { course: Course; format?: ArtworkFormat; priority?: boolean };

const identities = {
  design: { style: "jacketDesign", title: "Design with\nintention.", edition: "THE DESIGN SERIES" },
  web: { style: "jacketWeb", title: "Build for\nthe web.", edition: "IDEAS INTO INTERFACES" },
  writing: { style: "jacketWriting", title: "Make your\nideas clear.", edition: "THE WRITING SERIES" },
  photo: { style: "jacketPhoto", title: "Frame the\neveryday.", edition: "A DIFFERENT PERSPECTIVE" },
  business: { style: "jacketBusiness", title: "Make something\nuseful.", edition: "THE BUSINESS SERIES" },
} as const;

/** Original course cover compositions, not instructor portraits or course footage. */
export function CourseArtwork({ course, format = "square", priority = false }: Props) {
  const identity = identities[course.id as keyof typeof identities];
  const photographic = course.id === "web" || course.id === "photo";
  return <div className={`${styles.cover} ${styles.courseJacket} ${identity ? styles[identity.style] : styles.jacketDesign}`}
    data-course-art={course.id} data-art-format={format} aria-hidden="true">
    {photographic && <img className={styles.jacketPhotoLayer} src={courseArtwork(course.id)} alt=""
      width="1200" height="800" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />}
    <div className={styles.jacketFigure}>
      {course.id === "design" && <span className={styles.jacketDesignMark}>D</span>}
      {course.id === "web" && <span className={styles.jacketCode}>&#123; &#125;</span>}
      {course.id === "writing" && <span className={styles.jacketLetter}>Aa</span>}
      {course.id === "photo" && <span className={styles.jacketViewfinder} />}
      {course.id === "business" && <span className={styles.jacketSteps}><i /><i /><i /><b /></span>}
    </div>
    <div className={styles.jacketMasthead}><span>courses</span><span>STUDIO EDITIONS</span></div>
    <div className={styles.jacketTitle} data-art-title>{identity?.title ?? course.title}</div>
    <div className={styles.jacketByline}><span>{identity?.edition ?? course.category.toUpperCase()}</span><span>{creatorName(course)}</span></div>
  </div>;
}
