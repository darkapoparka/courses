"use client";
import Image from "next/image";
import Link from "next/link";
import { Grid2X2, List, Play } from "lucide-react";
import { courses, ownedIds, subjects } from "./catalog";
import { CatalogCard } from "./catalog-card";
import { CourseActions } from "./course-actions";
import { EmptyState } from "./empty-state";
import { savedIds, usePreviewValue } from "./preview-storage";
export function LibraryView({
  tab,
  layout,
  sort,
  q,
  empty,
  visitor,
}: {
  tab: string;
  layout: string;
  sort: string;
  q: string;
  empty: boolean;
  visitor: boolean;
}) {
  const saved = savedIds(usePreviewValue("saved"));
  const ids = tab === "saved" ? saved : ownedIds;
  let selected =
    empty || visitor
      ? []
      : courses.filter(
          (course) =>
            ids.includes(course.id) &&
            `${course.title} ${course.creator}`
              .toLowerCase()
              .includes(q.toLowerCase()),
        );
  if (sort === "title")
    selected = [...selected].sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "shortest")
    selected = [...selected].sort((a, b) => a.minutes - b.minutes);
  const query = (view: string) =>
    `/library?tab=${tab}&layout=${view}&sort=${sort}&q=${encodeURIComponent(q)}`;
  return (
    <div className="library-view">
      <header className="page-heading">
        <h1>{tab === "saved" ? "Saved courses" : "My courses"}</h1>
        <span className="muted">
          {tab === "saved"
            ? "Saved in this tab · not enrolled"
            : "Returning-learner sample"}
        </span>
      </header>
      <nav className="content-tabs" aria-label="Library sections">
        <Link
          href="/library"
          aria-current={tab !== "saved" ? "page" : undefined}
        >
          My courses
        </Link>
        <Link
          href="/library?tab=saved"
          aria-current={tab === "saved" ? "page" : undefined}
        >
          Saved
        </Link>
        <Link href="/collections">Learning lists</Link>
      </nav>
      <div className="library-toolbar">
        <form action="/library">
          <input type="hidden" name="tab" value={tab} />
          <input type="hidden" name="layout" value={layout} />
          <label className="sr-only" htmlFor="library-search">
            Search your library
          </label>
          <input
            id="library-search"
            name="q"
            type="search"
            placeholder="Search your library"
            defaultValue={q}
            maxLength={100}
          />
          <label className="sr-only" htmlFor="library-sort">
            Sort library
          </label>
          <select id="library-sort" name="sort" defaultValue={sort}>
            <option value="">Added order</option>
            <option value="title">Title A–Z</option>
            <option value="shortest">Shortest first</option>
          </select>
          <button className="secondary-button">Apply</button>
        </form>
        <div className="view-controls">
          <Link
            className={layout !== "list" ? "selected" : ""}
            aria-label="Grid view"
            href={query("grid")}
          >
            <Grid2X2 />
          </Link>
          <Link
            className={layout === "list" ? "selected" : ""}
            aria-label="List view"
            href={query("list")}
          >
            <List />
          </Link>
        </div>
      </div>
      {!selected.length ? (
        <EmptyState
          title={
            tab === "saved"
              ? "Make room for your next discovery"
              : "Add courses to your library"
          }
          description={
            tab === "saved"
              ? "Save a course from its detail page to collect it here. Saving is a browser-tab preview, not enrollment."
              : "This library state has no sample courses. Browse the catalog or restore the returning-learner fixture."
          }
          href={
            q
              ? `/library?tab=${tab}`
              : visitor || empty
                ? "/library"
                : "/browse"
          }
          action={
            q
              ? "Clear search"
              : visitor || empty
                ? "Restore sample library"
                : "Browse courses"
          }
        />
      ) : layout === "list" ? (
        <div
          className="course-table"
          role="table"
          aria-label="Your sample courses"
        >
          <div className="course-table-heading" role="row">
            <span role="columnheader">Course</span>
            <span role="columnheader">Creator</span>
            <span role="columnheader">Time</span>
            <span role="columnheader">Actions</span>
          </div>
          {selected.map((course) => (
            <div className="course-table-row" role="row" key={course.id}>
              <Link
                role="cell"
                className="table-course"
                href={`/courses/${course.id}?sample=learner`}
              >
                <Image
                  src={`/covers/${course.artwork}`}
                  alt=""
                  width={48}
                  height={48}
                />
                <span>
                  {course.title}
                  <small>
                    {subjects.find((item) => item.id === course.subject)?.label}
                  </small>
                </span>
              </Link>
              <span role="cell">{course.creator}</span>
              <span role="cell">{course.duration}</span>
              <div role="cell">
                <CourseActions course={course} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="catalog-grid">
          {selected.map((course) => (
            <div key={course.id}>
              <CatalogCard course={course} />
              {tab !== "saved" && (
                <Link
                  className="library-resume"
                  href={`/learn/${course.id}/${course.id === "useful-ai" ? "lesson-4" : "lesson-1"}?sample=learner`}
                >
                  <Play size={13} />
                  Continue sample
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
      <nav className="state-review" aria-label="Library sample states">
        <span>Review states</span>
        <Link href="/library">Populated</Link>
        <Link href="/library?state=empty">Empty</Link>
        <Link href="/library?sample=visitor">Visitor</Link>
      </nav>
      <p className="flow-footnote">
        The enrolled-course list is a fixture, not a purchase record. Saved
        courses and lists persist only within this browser tab. No paid access
        is granted.
      </p>
    </div>
  );
}
