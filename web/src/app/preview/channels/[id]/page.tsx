import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { subjects, courses, single } from "@/features/catalog/catalog";
import { CourseActions } from "@/features/catalog/course-actions";
export default async function ChannelSchedule({
  params,
  searchParams,
}: PageProps<"/preview/channels/[id]">) {
  const { id } = await params;
  const subject = subjects.find((item) => item.id === id);
  if (!subject) notFound();
  const query = await searchParams;
  const day = ["today", "tomorrow", "weekend"].includes(single(query.day))
    ? single(query.day)
    : "today";
  const selected = courses.filter((course) => course.subject === id);
  return (
    <div className="channel-schedule">
      <Link className="back-link" href="/preview/channels">
        ‹ All session samples
      </Link>
      <header className="channel-header">
        <div className={`channel-tile tone-${id}`}>
          <strong>{subject.label}</strong>
          <span>Courses sessions</span>
        </div>
        <div>
          <p className="eyebrow">FICTIONAL CHANNEL / SCHEDULE STUDY</p>
          <h1>{subject.label} sessions</h1>
          <p>Listen, watch, and find a fresh perspective.</p>
          <Link
            className="primary-button pill"
            href={`/learn/${selected[0].id}/lesson-1?sample=visitor`}
          >
            Play the original UI sample
          </Link>
          <p className="muted">On-demand sample video, not a live stream.</p>
        </div>
      </header>
      <nav className="content-tabs" aria-label="Sample schedule date">
        {[
          ["today", "Today"],
          ["tomorrow", "Tomorrow"],
          ["weekend", "Weekend"],
        ].map(([value, label]) => (
          <Link
            key={value}
            href={`/preview/channels/${id}?day=${value}`}
            aria-current={day === value ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
      <p className="muted">
        Illustrative schedule · all times UTC · no real program is scheduled
      </p>
      <ul className="schedule-rows">
        {selected.map((course, index) => (
          <li key={course.id}>
            <span className="schedule-time">
              {String(9 + index * 2 + (day === "tomorrow" ? 1 : 0)).padStart(
                2,
                "0",
              )}
              :00
            </span>
            <Image
              src={`/covers/${course.artwork}`}
              width={70}
              height={70}
              alt=""
            />
            <div>
              <Link href={`/courses/${course.id}`}>{course.title}</Link>
              <p>
                {course.creator} · {course.duration} course
              </p>
              <span>Sample session</span>
            </div>
            <CourseActions course={course} />
          </li>
        ))}
      </ul>
    </div>
  );
}
export const metadata = { title: "Schedule layout study" };
