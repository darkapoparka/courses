import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Compass, Play } from "lucide-react";
import { ContentShelf } from "@/components/ui/content-shelf";
import {
  courses,
  learningSamples,
  shortCourses,
  type SampleCourse,
  type SampleView,
} from "./fixtures";
import { PreviewInfo } from "./preview-info";

function CourseCard({ course }: { course: SampleCourse }) {
  return (
    <article className="course-card">
      <div className="course-art">
        <Image
          src={`/artwork/${course.artwork}`}
          alt=""
          fill
          sizes="(max-width: 767px) 172px, 210px"
        />
        {course.id === "strength" && (
          <div className="photo-cover-title">
            <strong>
              Strength,
              <br />
              for life.
            </strong>
          </div>
        )}
        {course.id === "perspective" && (
          <div className="photo-cover-title">
            <strong>
              Look
              <br />
              again.
            </strong>
          </div>
        )}
      </div>
      <h3 title={course.title}>{course.title}</h3>
      <p
        className="course-byline"
        title={`${course.creator} · ${course.level} · ${course.duration}`}
      >
        <span>{course.creator}</span>
        <span aria-hidden="true"> · </span>
        <span>{course.duration}</span>
      </p>
    </article>
  );
}

function ContinueLearning() {
  return (
    <section
      className="home-section continue-section"
      aria-labelledby="continue-heading"
    >
      <div className="section-heading">
        <h2 id="continue-heading">Continue learning</h2>
        <span className="section-note">Sample progress</span>
      </div>
      <ul className="continue-grid">
        {learningSamples.map((course) => (
          <li key={course.title}>
            <article className="continue-card">
              <div className="continue-art">
                <Image
                  src={`/artwork/${course.artwork}`}
                  alt=""
                  fill
                  sizes="72px"
                />
              </div>
              <div className="continue-details">
                <h3>{course.nextLesson}</h3>
                <p className="creator-name">{course.title}</p>
                <p className="course-meta">
                  {course.lesson}
                  <span aria-hidden="true"> · </span>
                  {course.remaining}
                </p>
                <progress
                  max={100}
                  value={course.progress}
                  aria-label={`${course.title}: sample completion`}
                >
                  {course.progress}%
                </progress>
                <span className="progress-label">
                  {course.progress}% complete
                </span>
              </div>
              <button
                className="resume-button"
                type="button"
                disabled
                aria-label={`Resume ${course.title}: unavailable in preview`}
              >
                <Play aria-hidden="true" />
                <span>Soon</span>
              </button>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

const picks = [
  {
    artwork: "editorial-curiosity.svg",
    theme: "curiosity",
    cover: (
      <>
        Everyday
        <br />
        AI.
      </>
    ),
    label: "Everyday AI",
    title: "Small skills. New possibilities.",
    description: "A thoughtful introduction to a changing world.",
  },
  {
    artwork: "strength.jpg",
    theme: "strength",
    cover: (
      <>
        Strength,
        <br />
        for life.
      </>
    ),
    label: "Start with the foundations",
    title: "Make room for movement",
    description: "Good form and everyday fitness, at your own pace.",
  },
  {
    artwork: "editorial-begin.svg",
    theme: "begin",
    cover: (
      <>
        Start
        <br />
        something.
      </>
    ),
    label: "From idea to action",
    title: "Your next chapter",
    description: "Put that idea to work. Build a small business.",
  },
  {
    artwork: "perspective.jpg",
    theme: "perspective",
    cover: (
      <>
        Look
        <br />
        again.
      </>
    ),
    label: "See things differently",
    title: "A little creative curiosity",
    description: "Find a fresh perspective in the everyday.",
  },
  {
    artwork: "editorial-money.svg",
    theme: "money",
    cover: (
      <>
        Money,
        <br />
        made clear.
      </>
    ),
    label: "Build your understanding",
    title: "Money, made clearer",
    description: "Learn the fundamentals. Leave the hype behind.",
  },
];

function FeaturedPicks() {
  return (
    <section
      id="featured"
      className="home-section featured-section"
      aria-label="Top Picks for You"
    >
      <ContentShelf title="Top Picks for You" variant="editorial">
        {picks.map((pick, index) => (
          <li key={pick.theme}>
            <article className={`editorial-card editorial-${pick.theme}`}>
              <Image
                src={`/artwork/${pick.artwork}`}
                alt=""
                fill
                sizes="(max-width: 767px) 280px, 265px"
                preload={index === 0}
              />
              <span className="editorial-brand" aria-hidden="true">
                Courses
              </span>
              {pick.cover && (
                <div className="editorial-cover-type" aria-hidden="true">
                  {pick.cover}
                </div>
              )}
              <div className="editorial-caption">
                <p>{pick.label}</p>
                <h3>{pick.title}</h3>
                <p className="editorial-description">{pick.description}</p>
              </div>
            </article>
          </li>
        ))}
      </ContentShelf>
    </section>
  );
}

export function HomeView({
  sample,
  empty,
  slow,
}: {
  sample: SampleView;
  empty: boolean;
  slow: boolean;
}) {
  return (
    <>
      <header className="page-heading">
        <h1>Home</h1>
      </header>
      {slow && (
        <p className="state-notice" role="status">
          Slow-loading sample complete.{" "}
          <Link href={`/?sample=${sample}`}>Return to the normal preview</Link>
        </p>
      )}
      {empty ? (
        <section
          className="feedback-state empty-state"
          aria-labelledby="empty-heading"
        >
          <Compass aria-hidden="true" />
          <p className="eyebrow">EMPTY CATALOG SAMPLE</p>
          <h2 id="empty-heading">Room for your next discovery.</h2>
          <p>
            There are no courses to show in this sample state. Come back for a
            fresh selection, or restore the preview catalog.
          </p>
          <Link className="primary-button" href={`/?sample=${sample}`}>
            Restore sample courses
          </Link>
        </section>
      ) : (
        <>
          {sample === "learner" && <ContinueLearning />}
          <FeaturedPicks />
          <section
            id="essentials"
            className="home-section"
            aria-label="Start from scratch"
          >
            <ContentShelf title="Start from scratch">
              {courses.map((course) => (
                <li key={course.id}>
                  <CourseCard course={course} />
                </li>
              ))}
            </ContentShelf>
          </section>
          <section
            id="short-courses"
            className="home-section"
            aria-labelledby="short-heading"
          >
            <div className="section-heading">
              <h2 id="short-heading">Learn something in under an hour</h2>
            </div>
            <ul className="short-course-list">
              {shortCourses.map((course) => (
                <li key={course.title}>
                  <article className="short-course">
                    <div className="short-art">
                      <Image
                        src={`/artwork/${course.artwork}`}
                        alt=""
                        fill
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <h3>{course.title}</h3>
                      <p className="creator-name">
                        {course.creator}
                        <span aria-hidden="true"> · </span>
                        {course.duration}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
      <footer id="preview-options" className="home-footer">
        <div>
          <p>All courses, creators and prices shown are fictional samples.</p>
          <p>
            Course pages, lessons and destinations marked Soon are unavailable
            in this Home-only preview.
          </p>
        </div>
        <div className="sample-controls">
          <div
            className="sample-switch"
            role="group"
            aria-label="Sample view, not authentication"
          >
            <Link
              href="/?sample=visitor#main-content"
              aria-current={sample === "visitor" ? "true" : undefined}
            >
              Visitor
            </Link>
            <Link
              href="/?sample=learner#main-content"
              aria-current={sample === "learner" ? "true" : undefined}
            >
              Learner
            </Link>
          </div>
          <PreviewInfo sample={sample} />
        </div>
        <a
          href="#main-content"
          className="icon-button"
          aria-label="Back to top"
        >
          <ArrowUp aria-hidden="true" />
        </a>
      </footer>
    </>
  );
}
