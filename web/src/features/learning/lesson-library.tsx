"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Pin, PinOff, ArrowUpDown } from "lucide-react";
import * as Menu from "@radix-ui/react-dropdown-menu";
import { courses, curriculum, ownedIds } from "@/features/catalog/catalog";
import {
  savedIds,
  usePreviewValue,
  writePreview,
} from "@/features/catalog/preview-storage";
const rows = courses
  .filter((course) => ownedIds.includes(course.id))
  .flatMap((course) =>
    curriculum(course).map((lesson) => ({
      course,
      lesson,
      key: `${course.id}--${lesson.id}`,
    })),
  );
export function LessonLibrary({
  sort,
  q,
  pinnedOnly,
}: {
  sort: string;
  q: string;
  pinnedOnly: boolean;
}) {
  const pinned = savedIds(usePreviewValue("pinned-lessons"));
  const [message, setMessage] = useState("");
  let visible = rows.filter(
    (row) =>
      (!pinnedOnly || pinned.includes(row.key)) &&
      `${row.lesson.title} ${row.course.title} ${row.course.creator}`
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
  if (sort === "title")
    visible = [...visible].sort((a, b) =>
      a.lesson.title.localeCompare(b.lesson.title),
    );
  if (sort === "title-desc")
    visible = [...visible].sort((a, b) =>
      b.lesson.title.localeCompare(a.lesson.title),
    );
  if (sort === "duration")
    visible = [...visible].sort((a, b) => a.lesson.minutes - b.lesson.minutes);
  const href = (value: string) =>
    `/library/lessons?sort=${value}&q=${encodeURIComponent(q)}${pinnedOnly ? "&pinned=1" : ""}`;
  return (
    <>
      <header className="page-heading">
        <h1>{pinnedOnly ? "Pinned lessons" : "Lessons"}</h1>
        <Menu.Root>
          <Menu.Trigger asChild>
            <button className="round-action" aria-label="Sort lessons">
              <ArrowUpDown />
            </button>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Content className="context-menu" align="end" sideOffset={8}>
              {[
                ["", "Course order"],
                ["title", "Title A–Z"],
                ["title-desc", "Title Z–A"],
                ["duration", "Shortest first"],
              ].map(([value, label]) => (
                <Menu.Item key={value} asChild>
                  <Link href={href(value)}>
                    {label}
                    {sort === value ? "✓" : ""}
                  </Link>
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Portal>
        </Menu.Root>
      </header>
      <nav className="content-tabs">
        <Link
          href="/library/lessons"
          aria-current={!pinnedOnly ? "page" : undefined}
        >
          All sample lessons
        </Link>
        <Link
          href="/library/lessons?pinned=1"
          aria-current={pinnedOnly ? "page" : undefined}
        >
          Pinned in this tab
        </Link>
      </nav>
      <form action="/library/lessons" className="lesson-library-search">
        <label className="sr-only" htmlFor="lesson-search">
          Search lessons
        </label>
        <input
          id="lesson-search"
          type="search"
          name="q"
          defaultValue={q}
          maxLength={100}
          placeholder="Search lesson, course or creator"
        />
        <input type="hidden" name="sort" value={sort} />
        {pinnedOnly && <input type="hidden" name="pinned" value="1" />}
        <button className="secondary-button">Search</button>
      </form>
      {message && (
        <p role="status" className="action-feedback">
          {message}
        </p>
      )}
      <div
        className="lesson-library-table"
        role="table"
        aria-label="Sample lesson library"
      >
        <div className="lesson-library-heading" role="row">
          <span role="columnheader">Lesson</span>
          <span role="columnheader">Course</span>
          <span role="columnheader">Time</span>
          <span role="columnheader">Pin</span>
        </div>
        {visible.map(({ course, lesson, key }) => (
          <div className="lesson-library-row" role="row" key={key}>
            <Link
              role="cell"
              className="table-course"
              href={`/learn/${course.id}/${lesson.id}?sample=learner`}
            >
              <Image
                src={`/covers/${course.artwork}`}
                width={38}
                height={38}
                alt=""
              />
              <span>
                {lesson.title}
                <small>{course.creator}</small>
              </span>
            </Link>
            <Link
              role="cell"
              className="lesson-course-cell"
              href={`/courses/${course.id}?sample=learner`}
            >
              {course.title}
            </Link>
            <span role="cell">{lesson.minutes} min</span>
            <div role="cell">
              <button
                className="round-action"
                aria-pressed={pinned.includes(key)}
                aria-label={`${pinned.includes(key) ? "Unpin" : "Pin"} ${lesson.title}`}
                onClick={() => {
                  const next = pinned.includes(key)
                    ? pinned.filter((id) => id !== key)
                    : [...pinned, key];
                  setMessage(
                    writePreview("pinned-lessons", JSON.stringify(next))
                      ? "Pinned lessons updated in this tab only."
                      : "Storage is unavailable. The pin was not changed.",
                  );
                }}
              >
                {pinned.includes(key) ? <PinOff /> : <Pin />}
              </button>
            </div>
          </div>
        ))}
      </div>
      {!visible.length && (
        <div className="feedback-state">
          <h2>No lessons here yet</h2>
          <p>Pin a lesson or clear the search to find it here.</p>
          <Link className="primary-button" href="/library/lessons">
            Show all sample lessons
          </Link>
        </div>
      )}
      <p className="flow-footnote">
        Fictional curriculum for the sample library. Pins stay only in this tab
        and never change course access.
      </p>
    </>
  );
}
