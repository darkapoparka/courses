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

const families: Record<Course["category"], keyof typeof identities> = { Design: "design", Development: "web", Writing: "writing", Photography: "photo", Business: "business" };
const additionalTitles: Record<string, string> = {
  "systems": "Build a\ndesign system.",
  "color": "Color that\ncommunicates.",
  "typescript": "TypeScript,\nmade practical.",
  "accessible": "Build an\naccessible web.",
  "story": "Tell a\nstronger story.",
  "microcopy": "Words\nthat guide.",
  "light": "Find\nthe light.",
  "editing": "Edit with\nintention.",
  "interviews": "Ask better\nquestions.",
  "offer": "From idea\nto first offer."
};
/** Original course cover compositions, not instructor portraits or course footage. */
export function CourseArtwork({ course, format = "square", priority = false }: Props) {
  const family = families[course.category];
  const identity = identities[family];
  const photographic = family === "web" || family === "photo";
  return <div className={`${styles.cover} ${styles.courseJacket} ${identity ? styles[identity.style] : styles.jacketDesign}`}
    data-course-art={course.id} data-art-format={format} data-long-title={Boolean(additionalTitles[course.id]) || undefined} aria-hidden="true">
    {photographic && <img className={styles.jacketPhotoLayer} src={courseArtwork(family)} alt=""
      width="1200" height="800" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />}
    <div className={styles.jacketFigure}>
      {family === "design" && <span className={styles.jacketDesignMark}>D</span>}
      {family === "web" && <span className={styles.jacketCode}>&#123; &#125;</span>}
      {family === "writing" && <span className={styles.jacketLetter}>Aa</span>}
      {family === "photo" && <span className={styles.jacketViewfinder} />}
      {family === "business" && <span className={styles.jacketSteps}><i /><i /><i /><b /></span>}
    </div>
    <div className={styles.jacketMasthead}><span>courses</span><span>STUDIO EDITIONS</span></div>
    <div className={styles.jacketTitle} data-art-title>{additionalTitles[course.id] ?? identity?.title ?? course.title}</div>
    <div className={styles.jacketByline}><span>{identity?.edition ?? course.category.toUpperCase()}</span><span>{creatorName(course)}</span></div>
  </div>;
}
