"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import type { ReactNode } from "react";
import type { SampleCourse } from "./fixtures";

// A Home card disclosure, not a course-detail route or a lesson preview.
export function CourseInfo({
  course,
  children,
  className = "",
}: {
  course: SampleCourse;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={`course-trigger ${className}`}
          aria-label={`Course information: ${course.title}`}
        >
          {children}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content course-dialog">
          <Dialog.Close asChild>
            <button
              type="button"
              className="icon-button dialog-close"
              aria-label="Close course information"
            >
              <X aria-hidden="true" />
            </button>
          </Dialog.Close>
          <div className="course-dialog-grid">
            <div className={`dialog-cover cover-${course.id}`}>
              <Image
                src={`/covers/${course.artwork}`}
                alt=""
                fill
                sizes="(max-width: 767px) 130px, 220px"
              />
            </div>
            <div className="course-dialog-copy">
              <p className="eyebrow">Sample course · Home preview</p>
              <Dialog.Title>{course.title}</Dialog.Title>
              <p className="dialog-creator">
                With {course.creator} <span>· fictional creator</span>
              </p>
              <Dialog.Description>{course.description}</Dialog.Description>
              <dl className="course-facts">
                <div>
                  <dt>Level</dt>
                  <dd>{course.level}</dd>
                </div>
                <div>
                  <dt>Learning time</dt>
                  <dd>{course.duration}</dd>
                </div>
                <div>
                  <dt>Sample syllabus</dt>
                  <dd>{course.lessons} lessons</dd>
                </div>
                <div>
                  <dt>Example price</dt>
                  <dd>
                    {course.price === 0 ? "Free" : `$${course.price} USD`}
                  </dd>
                </div>
              </dl>
              <h3>What you would work on</h3>
              <ul className="course-outcomes">
                {course.outcomes.map((outcome) => (
                  <li key={outcome}>
                    <Check aria-hidden="true" />
                    {outcome}
                  </li>
                ))}
              </ul>
              <p className="preview-limitation">
                This is fictional course information. Open the full course page
                to explore its sample curriculum and lesson player. Enrollment
                and purchases remain unavailable.
              </p>
              <Link className="primary-button" href={`/courses/${course.id}`}>
                View course & curriculum
              </Link>
              <Dialog.Close asChild>
                <button className="secondary-button" type="button">
                  Back to browsing
                </button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
