"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import * as Menu from "@radix-ui/react-dropdown-menu";
import {
  Bookmark,
  Check,
  Copy,
  Flag,
  Info,
  ListPlus,
  MoreHorizontal,
  ThumbsDown,
  Share2,
  X,
} from "lucide-react";
import type { SampleCourse } from "./catalog";
import { readLists } from "./collections-data";
import {
  readPreview,
  savedIds,
  usePreviewValue,
  writePreview,
} from "./preview-storage";

type Panel = "share" | "list" | "credits" | "report" | "offer" | null;
export function CourseActions({
  course,
  offer = false,
}: {
  course: SampleCourse;
  offer?: boolean;
}) {
  const saved = savedIds(usePreviewValue("saved"));
  const lists = readLists(usePreviewValue("lists"));
  const isSaved = saved.includes(course.id);
  const [panel, setPanel] = useState<Panel>(null);
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const origin = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  function open(value: Panel) {
    const active = document.activeElement;
    returnFocus.current =
      active instanceof HTMLElement && !active.closest('[role="menu"]')
        ? active
        : origin.current;
    setMessage("");
    setUrl(`${window.location.origin}/courses/${course.id}`);
    setPanel(value);
  }
  function toggleSaved() {
    const ids = savedIds(readPreview("saved"));
    const already = ids.includes(course.id);
    const ok = writePreview(
      "saved",
      JSON.stringify(
        already ? ids.filter((id) => id !== course.id) : [...ids, course.id],
      ),
    );
    setMessage(
      ok
        ? already
          ? "Removed from this tab's saved courses."
          : "Saved for this browser tab only. Not enrolled."
        : "Browser storage is unavailable. Nothing was saved.",
    );
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Local preview link copied.");
    } catch {
      setMessage("Copy was blocked. Select and copy the link above.");
    }
  }
  const titles: Record<Exclude<Panel, null>, string> = {
    share: "Share this course",
    list: "Add to a learning list",
    credits: "About this sample",
    report: "Report a concern",
    offer: "Review the sample offer",
  };
  return (
    <div className="course-actions">
      {offer && (
        <button className="secondary-button" onClick={() => open("offer")}>
          {course.price ? `Buy course · $${course.price}` : "Enroll free"}
        </button>
      )}
      <button
        className="round-action"
        type="button"
        aria-pressed={isSaved}
        aria-label={`${isSaved ? "Unsave" : "Save"} ${course.title}`}
        onClick={toggleSaved}
      >
        {isSaved ? (
          <Check aria-hidden="true" />
        ) : (
          <Bookmark aria-hidden="true" />
        )}
      </button>
      <button
        className="round-action"
        type="button"
        aria-label={`Share ${course.title}`}
        onClick={() => open("share")}
      >
        <Share2 aria-hidden="true" />
      </button>
      <Menu.Root>
        <Menu.Trigger asChild>
          <button
            ref={origin}
            className="round-action"
            aria-label={`More options for ${course.title}`}
          >
            <MoreHorizontal aria-hidden="true" />
          </button>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Content
            className="context-menu"
            sideOffset={6}
            align="end"
            collisionPadding={12}
            onCloseAutoFocus={(event) => {
              if (panel) event.preventDefault();
            }}
          >
            <Menu.Item onSelect={toggleSaved}>
              {isSaved ? "Remove from Saved" : "Save for later"}
              <Bookmark />
            </Menu.Item>
            <Menu.Item onSelect={() => open("list")}>
              Add to learning list
              <ListPlus />
            </Menu.Item>
            <Menu.Item
              onSelect={() => {
                const hidden = savedIds(readPreview("less-suggestions"));
                const ok = writePreview(
                  "less-suggestions",
                  JSON.stringify(Array.from(new Set([...hidden, course.id]))),
                );
                setMessage(
                  ok
                    ? "Hidden from For you in this tab. You can restore it there."
                    : "Storage is blocked. Nothing was changed.",
                );
              }}
            >
              Show less in For you
              <ThumbsDown />
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item onSelect={() => open("share")}>
              Share / copy link
              <Copy />
            </Menu.Item>
            <Menu.Item onSelect={() => open("credits")}>
              About this sample
              <Info />
            </Menu.Item>
            <Menu.Item onSelect={() => open("report")}>
              Report a concern
              <Flag />
            </Menu.Item>
          </Menu.Content>
        </Menu.Portal>
      </Menu.Root>
      {!panel && message && (
        <p className="action-feedback" role="status">
          {message}
        </p>
      )}
      <Dialog.Root
        open={panel !== null}
        onOpenChange={(open) => {
          if (!open) setPanel(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content
            className="dialog-content flow-dialog"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              returnFocus.current?.focus();
            }}
          >
            <Dialog.Close asChild>
              <button
                className="icon-button dialog-close"
                aria-label="Close course action"
              >
                <X aria-hidden="true" />
              </button>
            </Dialog.Close>
            <Dialog.Title>
              {panel ? titles[panel] : "Course action"}
            </Dialog.Title>
            <Dialog.Description>
              {course.title} · {course.creator}
            </Dialog.Description>
            {panel === "share" && (
              <>
                <label className="field">
                  Local preview link
                  <input
                    readOnly
                    value={url}
                    onFocus={(event) => event.target.select()}
                  />
                </label>
                <button className="primary-button" onClick={copy}>
                  Copy link
                </button>
                <p className="muted">
                  This loopback URL works on the computer running the preview.
                </p>
              </>
            )}
            {panel === "list" && (
              <>
                <p className="muted">
                  Learning lists are stored only in this browser tab. They do
                  not grant course access.
                </p>
                <ul className="list-choices">
                  {lists.map((list) => (
                    <li key={list.id}>
                      <button
                        disabled={list.courseIds.includes(course.id)}
                        onClick={() => {
                          const ok = writePreview(
                            "lists",
                            JSON.stringify(
                              lists.map((item) =>
                                item.id === list.id
                                  ? {
                                      ...item,
                                      courseIds: [...item.courseIds, course.id],
                                    }
                                  : item,
                              ),
                            ),
                          );
                          setMessage(
                            ok
                              ? `Added to ${list.title} in this tab.`
                              : "Storage is blocked. Nothing was added.",
                          );
                        }}
                      >
                        {list.title}
                        {list.courseIds.includes(course.id) ? (
                          <Check />
                        ) : (
                          <ListPlus />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
                <Link
                  className="text-link"
                  href="/collections"
                  onClick={() => setPanel(null)}
                >
                  Manage learning lists
                </Link>
              </>
            )}
            {panel === "credits" && (
              <>
                <p>
                  This course, syllabus and creator identity are fictional
                  fixtures. The photographs illustrate subjects; they are not
                  portraits of these instructors.
                </p>
                <p>
                  Licensed cover credits are recorded in the repository at
                  web/public/covers/README.md. The sample lesson media is
                  original to this preview.
                </p>
              </>
            )}
            {panel === "report" && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setMessage(
                    "Preview only: your report was not sent or saved. No support service is connected.",
                  );
                }}
              >
                <label className="field">
                  Reason
                  <select>
                    <option>Misleading content</option>
                    <option>Rights or attribution</option>
                    <option>Accessibility problem</option>
                    <option>Something else</option>
                  </select>
                </label>
                <label className="field">
                  Describe the concern
                  <textarea required maxLength={1000} rows={4} />
                </label>
                <p className="muted">
                  Do not include personal or sensitive information. This form
                  demonstrates the report interface only.
                </p>
                <button className="primary-button">
                  Review report (not sent)
                </button>
              </form>
            )}
            {panel === "offer" && (
              <>
                <div className="offer-line">
                  <span>Example course price</span>
                  <strong>
                    {course.price ? `$${course.price} USD` : "Free"}
                  </strong>
                </div>
                <p>
                  No payment provider, enrollment service, seller terms, or real
                  course is connected. This preview cannot charge you or create
                  access.
                </p>
                <button className="primary-button" disabled>
                  Checkout / enrollment unavailable
                </button>
                <Link
                  className="text-link"
                  href={`/courses/${course.id}?sample=learner`}
                  onClick={() => setPanel(null)}
                >
                  Inspect the returning-learner sample instead
                </Link>
              </>
            )}
            {message && (
              <p className="action-feedback" role="status">
                {message}
              </p>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
