import Image from "next/image";
import { Info } from "lucide-react";
import { CourseInfo } from "./course-info";
import type { SampleCourse } from "./fixtures";

export function CourseCard({ course }: { course: SampleCourse }) {
  return (
    <article className="course-card">
      <CourseInfo course={course}>
        <span className={`course-art cover-${course.id}`}>
          <Image
            src={`/covers/${course.artwork}`}
            alt=""
            fill
            sizes="(max-width: 359px) 150px, (max-width: 767px) 172px, 209px"
          />
          {course.coverTitle && (
            <span className="cover-title" aria-hidden="true">
              {course.coverTitle}
            </span>
          )}
          <span className="artwork-info" aria-hidden="true">
            <Info size={16} />
            Course info
          </span>
        </span>
      </CourseInfo>
      <h3>{course.title}</h3>
      <p className="creator-name">{course.creator}</p>
      <p className="course-meta">
        {course.duration} <span aria-hidden="true">·</span> {course.level}
      </p>
      <p className="course-price">
        {course.price === 0 ? "Free" : `$${course.price}`}{" "}
        <span>sample price</span>
      </p>
    </article>
  );
}
