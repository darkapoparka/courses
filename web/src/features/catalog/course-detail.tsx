import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, LockKeyhole, Play } from "lucide-react";
import { Disclosure } from "@/components/ui/disclosure";
import { ContentShelf } from "@/components/ui/content-shelf";
import { CatalogCard } from "./catalog-card";
import { CourseActions } from "./course-actions";
import {
  courses,
  creatorSlug,
  curriculum,
  subjects,
  type SampleCourse,
} from "./catalog";
export function CourseDetail({
  course,
  sample,
  state,
}: {
  course: SampleCourse;
  sample: string;
  state: string;
}) {
  const owned = sample === "learner" || state === "completed";
  const lessons = curriculum(course);
  const nextId = course.id === "useful-ai" ? "lesson-4" : "lesson-2";
  const unavailable = state === "unavailable";
  return (
    <div className="course-detail">
      <div className="route-utility">
        <Link href="/browse" aria-label="Back to browse">
          <ArrowLeft size={19} />
        </Link>
        <span>Fictional course · design preview</span>
      </div>
      <section className="detail-hero" aria-labelledby="course-title">
        <div className={`detail-cover cover-${course.id}`}>
          <Image
            src={`/covers/${course.artwork}`}
            alt=""
            fill
            sizes="(max-width: 767px) 210px, 256px"
            preload
          />
          {course.coverTitle && (
            <span className="cover-title">{course.coverTitle}</span>
          )}
        </div>
        <div className="detail-identity">
          <p className="eyebrow">
            {subjects.find((subject) => subject.id === course.subject)?.label} ·{" "}
            {course.level}
          </p>
          <h1 id="course-title">{course.title}</h1>
          <Link
            className="creator-title"
            href={`/creators/${creatorSlug(course.creator)}`}
          >
            {course.creator}
          </Link>
          <p className="detail-meta">
            {course.lessons} lessons · {course.duration} · English
          </p>
          <p className="detail-description">{course.description}</p>
          <Disclosure
            title={course.title}
            description="About this fictional course"
            trigger="More about this course"
          >
            <p>{course.description}</p>
            <h3>What you would work on</h3>
            <ul className="outcome-list">
              {course.outcomes.map((outcome) => (
                <li key={outcome}>
                  <Check size={17} />
                  {outcome}
                </li>
              ))}
            </ul>
            <h3>Before you start</h3>
            <p>
              Bring a notebook and time to practice. This is a sample syllabus,
              not a published course or a professional qualification.
            </p>
            <p>
              Prices, access duration, final resources and commercial terms are
              not finalized. The sample media demonstrates the player rather
              than supplying this full syllabus.
            </p>
          </Disclosure>
          {unavailable ? (
            <p className="state-notice" role="status">
              This sample course is unavailable. No enrollment or purchase is
              possible.
            </p>
          ) : (
            <div className="detail-buttons">
              <Link
                className="primary-button pill"
                href={`/learn/${course.id}/${owned ? nextId : "lesson-1"}?sample=${owned ? "learner" : "visitor"}`}
              >
                <Play size={16} fill="currentColor" />
                {state === "completed"
                  ? "Review lessons"
                  : owned
                    ? "Continue learning"
                    : "Preview sample lesson"}
              </Link>
              <CourseActions course={course} offer={!owned} />
            </div>
          )}
          {owned && (
            <p className="sample-state">
              {state === "completed" ? "Completed-course" : "Returning-learner"}{" "}
              sample. This is not an access grant or purchase.
            </p>
          )}
        </div>
      </section>
      <section className="curriculum" aria-labelledby="curriculum-title">
        <div className="section-heading">
          <h2 id="curriculum-title">Course curriculum</h2>
          <span className="muted">Sample syllabus</span>
        </div>
        {Array.from(new Set(lessons.map((lesson) => lesson.module))).map(
          (module) => (
            <div className="curriculum-module" key={module}>
              <h3>{module}</h3>
              <ol className="lesson-list">
                {lessons
                  .filter((lesson) => lesson.module === module)
                  .map((lesson) => {
                    const index = lessons.indexOf(lesson);
                    const allowed = !unavailable && (owned || lesson.preview);
                    const contents = (
                      <>
                        <span className="lesson-number">
                          {state === "completed" ? (
                            <Check size={15} />
                          ) : (
                            String(index + 1).padStart(2, "0")
                          )}
                        </span>
                        <span className="lesson-name">
                          {lesson.title}
                          {lesson.preview && <small>Public UI sample</small>}
                        </span>
                        <span className="lesson-time">
                          {lesson.minutes} min
                        </span>
                        {allowed ? (
                          <Play size={15} />
                        ) : (
                          <LockKeyhole size={15} />
                        )}
                      </>
                    );
                    return (
                      <li key={lesson.id}>
                        {allowed ? (
                          <Link
                            className={`lesson-row ${owned && lesson.id === nextId ? "current" : ""}`}
                            href={`/learn/${course.id}/${lesson.id}?sample=${owned ? "learner" : "visitor"}`}
                          >
                            {contents}
                          </Link>
                        ) : (
                          <Disclosure
                            title="This lesson is locked"
                            description="Only the first sample lesson is public in visitor mode. No paid content or real enrollment is connected."
                            trigger={contents}
                            buttonClass="lesson-row locked"
                          >
                            <Link
                              className="primary-button"
                              href={`/courses/${course.id}?sample=learner`}
                            >
                              Review the learner sample
                            </Link>
                          </Disclosure>
                        )}
                      </li>
                    );
                  })}
              </ol>
            </div>
          ),
        )}
      </section>
      <section className="course-about">
        <div>
          <h2>What you would learn</h2>
          <ul className="outcome-list">
            {course.outcomes.map((outcome) => (
              <li key={outcome}>
                <Check size={18} />
                {outcome}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Good to know</h2>
          <p>
            This is fictional instruction with a sample syllabus.{" "}
            {course.subject === "finance"
              ? "Financial examples are educational, not investment advice."
              : course.subject === "fitness"
                ? "This interface is not medical advice or a prescribed exercise program."
                : "No certification or professional credential is offered."}
          </p>
          <Link className="text-link" href="/help">
            Preview limitations & help
          </Link>
        </div>
      </section>
      <section className="home-section">
        <ContentShelf title="More to explore">
          {courses
            .filter(
              (item) =>
                item.subject === course.subject && item.id !== course.id,
            )
            .map((item) => (
              <li key={item.id}>
                <CatalogCard course={item} />
              </li>
            ))}
        </ContentShelf>
      </section>
      <nav className="state-review" aria-label="Course sample states">
        <span>Review states</span>
        <Link href={`/courses/${course.id}`}>Visitor</Link>
        <Link href={`/courses/${course.id}?sample=learner`}>
          Returning learner
        </Link>
        <Link href={`/courses/${course.id}?state=completed`}>Completed</Link>
        <Link href={`/courses/${course.id}?state=unavailable`}>
          Unavailable
        </Link>
      </nav>
    </div>
  );
}
