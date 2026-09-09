import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { courses, subjects, single } from "@/features/catalog/catalog";
export default async function PreviewsPage({
  searchParams,
}: PageProps<"/previews">) {
  const query = await searchParams;
  const subject = single(query.subject);
  const selected = courses
    .filter((course) => !subject || course.subject === subject)
    .slice(0, 12);
  return (
    <>
      <header className="page-heading">
        <h1>Lesson previews</h1>
        <span className="muted">Public interface samples</span>
      </header>
      <form className="filter-row" action="/previews">
        <label>
          Subject
          <select name="subject" defaultValue={subject}>
            <option value="">All subjects</option>
            {subjects.map((item) => (
              <option value={item.id} key={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <button className="secondary-button">Apply</button>
      </form>
      <p className="preview-media-note">
        These fictional lesson cards open the same original 24-second UI sample,
        not separate published course videos.
      </p>
      <div className="video-preview-grid">
        {selected.map((course) => (
          <article key={course.id}>
            <Link
              href={`/learn/${course.id}/lesson-1?sample=visitor`}
              className="video-preview-art"
              aria-label={`Preview ${course.title}`}
            >
              <Image
                src={`/covers/${course.artwork}`}
                alt=""
                fill
                sizes="(max-width:767px) 90vw, 360px"
              />
              <span>
                <Play fill="currentColor" />
              </span>
            </Link>
            <h2>
              <Link href={`/courses/${course.id}`}>{course.title}</Link>
            </h2>
            <p>{course.creator} · Public UI sample</p>
          </article>
        ))}
      </div>
    </>
  );
}

export const metadata = { title: "Lesson previews" };
