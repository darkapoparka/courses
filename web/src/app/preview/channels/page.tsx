import Image from "next/image";
import Link from "next/link";
import { subjects, courses } from "@/features/catalog/catalog";
import { sampleEvents } from "@/features/patterns/sample-events";
export default function ChannelStudy() {
  return (
    <>
      <header className="page-heading">
        <h1>Creator sessions</h1>
        <Link className="muted" href="/preview">
          Channel layout study
        </Link>
      </header>
      <section className="home-section">
        <h2>Explore a subject</h2>
        <p className="muted">Sample channels, not live broadcasts.</p>
        <div className="channel-grid">
          {subjects.map((subject) => (
            <article key={subject.id}>
              <Link
                href={`/preview/channels/${subject.id}`}
                className={`channel-tile tone-${subject.id}`}
              >
                <strong>{subject.label}</strong>
                <span>Courses sessions</span>
              </Link>
              <Link
                className="text-link"
                href={`/preview/channels/${subject.id}`}
              >
                View sample schedule
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="home-section">
        <h2>Session samples</h2>
        <div className="channel-session-grid">
          {sampleEvents.map((event) => (
            <Link key={event.id} href={`/preview/events/${event.id}`}>
              <Image
                src={`/covers/${event.image}`}
                width={92}
                height={92}
                alt=""
              />
              <span>
                <small>{event.creator.toUpperCase()}</small>
                <strong>{event.title}</strong>
                <span>{event.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="home-section">
        <h2>Start with a preview</h2>
        <div className="video-preview-grid">
          {courses
            .filter((course) => course.minutes < 60)
            .slice(0, 3)
            .map((course) => (
              <article key={course.id}>
                <Link
                  className="video-preview-art"
                  aria-label={"Preview " + course.title}
                  href={`/learn/${course.id}/lesson-1?sample=visitor`}
                >
                  <Image
                    src={`/covers/${course.artwork}`}
                    alt=""
                    fill
                    sizes="(max-width:767px) 90vw, 360px"
                  />
                </Link>
                <h3>{course.title}</h3>
                <p>{course.creator} · UI sample</p>
              </article>
            ))}
        </div>
      </section>
      <p className="flow-footnote">
        These are reference-pattern studies. No radio station, livestream,
        instructor availability or real program schedule is connected.
      </p>
    </>
  );
}
export const metadata = { title: "Channel layout study" };
