import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  BookOpen,
  Compass,
  Info,
  Play,
} from "lucide-react";
import { ContentShelf } from "@/components/ui/content-shelf";
import {
  courses,
  learningSamples,
  shortCourses,
  starterIds,
  subjects,
  type SampleView,
} from "./fixtures";
import { CourseCard } from "./course-card";
import { CourseInfo } from "./course-info";
import { PreviewInfo } from "./preview-info";

const picks = [
  {
    subject: "ai-coding",
    artwork: "abstract.webp",
    theme: "ai",
    cover: "Everyday\nAI",
    label: "AI & CODING",
    title: "Make the possibilities practical.",
    description: "Learn the tools. Make something useful.",
  },
  {
    subject: "fitness",
    artwork: "motion.webp",
    theme: "fitness",
    cover: "",
    label: "FITNESS",
    title: "A stronger everyday.",
    description: "Start with good form. Find your own rhythm.",
  },
  {
    subject: "business",
    artwork: "cafe.webp",
    theme: "business",
    cover: "Start\nsomething.",
    label: "BUSINESS",
    title: "An idea is a beginning.",
    description: "Turn your next what-if into a first step.",
  },
  {
    subject: "creative",
    artwork: "camera.webp",
    theme: "creative",
    cover: "Look\ncloser.",
    label: "CREATIVE SKILLS",
    title: "See things a little differently.",
    description: "Find your eye for light, color, and composition.",
  },
  {
    subject: "finance",
    artwork: "finance.webp",
    theme: "finance",
    cover: "",
    label: "FINANCE EDUCATION",
    title: "A clearer view of money.",
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
          <li key={pick.subject}>
            <Link
              className={`editorial-card editorial-${pick.theme}`}
              href={`#${pick.subject}`}
              aria-label={`Explore ${subjects.find((subject) => subject.id === pick.subject)?.label} courses on Home`}
            >
              <Image
                src={`/covers/${pick.artwork}`}
                alt=""
                fill
                sizes="(max-width: 767px) 280px, 265px"
                preload={index < 2}
              />
              <span className="editorial-brand" aria-hidden="true">
                <BookOpen size={14} />
                Courses
              </span>
              {pick.cover && (
                <span className="editorial-cover-type" aria-hidden="true">
                  {pick.cover}
                </span>
              )}
              <span className="editorial-caption">
                <span className="editorial-label">{pick.label}</span>
                <strong>{pick.title}</strong>
                <span className="editorial-description">
                  {pick.description}
                </span>
              </span>
              <span className="editorial-arrow" aria-hidden="true">
                <ArrowRight size={18} />
              </span>
            </Link>
          </li>
        ))}
      </ContentShelf>
    </section>
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
        {learningSamples.map((learning) => {
          const course = courses.find((item) => item.id === learning.courseId);
          if (!course) return null;
          return (
            <li key={course.id}>
              <article className="continue-card">
                <div className="continue-art">
                  <Image
                    src={`/covers/${course.artwork}`}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 76px, 112px"
                  />
                </div>
                <div className="continue-details">
                  <p className="eyebrow">{learning.lesson}</p>
                  <h3>{learning.nextLesson}</h3>
                  <p className="creator-name">{course.title}</p>
                  <progress
                    max={100}
                    value={learning.progress}
                    aria-label={`${course.title}: sample completion`}
                  >
                    {learning.progress}%
                  </progress>
                  <span className="progress-label">
                    {learning.remaining}{" "}
                    <span>· {learning.progress}% complete</span>
                  </span>
                </div>
                <button
                  className="resume-button"
                  type="button"
                  disabled
                  aria-label={`Resume ${course.title}: unavailable in preview`}
                >
                  <Play size={18} aria-hidden="true" />
                  <span>Soon</span>
                </button>
              </article>
            </li>
          );
        })}
      </ul>
      <p className="continue-note">
        Your place, all in one place. Lessons are unavailable in this preview.
      </p>
    </section>
  );
}
function ShortCourses() {
  return (
    <section
      id="short-courses"
      className="home-section"
      aria-labelledby="short-heading"
    >
      <div className="section-heading">
        <h2 id="short-heading">A little learning goes a long way</h2>
        <span className="section-note">Under an hour</span>
      </div>
      <ul className="short-course-list">
        {shortCourses.map((course) => (
          <li key={course.id}>
            <CourseInfo className="short-course-trigger" course={course}>
              <span className="short-art">
                <Image
                  src={`/covers/${course.artwork}`}
                  alt=""
                  fill
                  sizes="52px"
                />
              </span>
              <span className="short-copy">
                <span className="short-title">{course.title}</span>
                <span className="creator-name">
                  {course.creator} · {course.duration}
                </span>
              </span>
              <Info size={17} aria-hidden="true" />
            </CourseInfo>
          </li>
        ))}
      </ul>
    </section>
  );
}
function Topics() {
  return (
    <section
      id="topics"
      className="home-section"
      aria-labelledby="topics-heading"
    >
      <div className="section-heading">
        <h2 id="topics-heading">Follow your curiosity</h2>
        <span className="section-note">Explore subjects</span>
      </div>
      <ul className="topic-grid">
        {subjects.map((subject) => (
          <li key={subject.id}>
            <Link
              href={`#${subject.id}`}
              className={`topic-card topic-${subject.id}`}
            >
              <Image
                src={`/covers/${subject.artwork}`}
                alt=""
                fill
                sizes="(max-width: 767px) 50vw, 220px"
              />
              <span>
                {subject.label}
                <ArrowRight size={18} aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
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
            There are no courses to show in this sample state. Restore the
            sample selection to continue exploring.
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
              {starterIds.map((id) => {
                const course = courses.find((item) => item.id === id);
                return course ? (
                  <li key={id}>
                    <CourseCard course={course} />
                  </li>
                ) : null;
              })}
            </ContentShelf>
          </section>
          <ShortCourses />
          <Topics />
          {subjects.map((subject) => (
            <section
              id={subject.id}
              className="home-section subject-section"
              key={subject.id}
              aria-label={subject.heading}
            >
              <ContentShelf title={subject.heading}>
                {courses
                  .filter((course) => course.subject === subject.id)
                  .map((course) => (
                    <li key={course.id}>
                      <CourseCard course={course} />
                    </li>
                  ))}
              </ContentShelf>
            </section>
          ))}
        </>
      )}
      <footer id="preview-options" className="home-footer">
        <div>
          <p>All courses, creators and prices shown are fictional samples.</p>
          <p>
            Course information opens on Home. Lessons, enrollment, Search,
            Library, and account features are unavailable.
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
