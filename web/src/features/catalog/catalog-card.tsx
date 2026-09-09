import Image from "next/image";
import Link from "next/link";
import { creatorSlug, type SampleCourse } from "./catalog";
export function CatalogCard({ course }: { course: SampleCourse }) {
  return (
    <article className="catalog-card">
      <Link
        className={`catalog-art cover-${course.id}`}
        href={`/courses/${course.id}`}
        aria-label={`View ${course.title}`}
      >
        <Image
          src={`/covers/${course.artwork}`}
          alt=""
          fill
          sizes="(max-width: 767px) 45vw, 220px"
        />
        {course.coverTitle && (
          <span className="cover-title" aria-hidden="true">
            {course.coverTitle}
          </span>
        )}
      </Link>
      <h3>
        <Link href={`/courses/${course.id}`}>{course.title}</Link>
      </h3>
      <p>
        <Link href={`/creators/${creatorSlug(course.creator)}`}>
          {course.creator}
        </Link>
      </p>
      <p>
        {course.duration} · {course.level}
      </p>
      <span className="sample-price">
        {course.price ? `$${course.price}` : "Free"} · sample price
      </span>
    </article>
  );
}
