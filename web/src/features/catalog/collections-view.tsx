"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  Layers,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { courses } from "./catalog";
import { readLists, type LearningList } from "./collections-data";
import { usePreviewValue, writePreview } from "./preview-storage";
import { EmptyState } from "./empty-state";
export function CollectionsView({ id }: { id?: string }) {
  const lists = readLists(usePreviewValue("lists"));
  const list = id ? lists.find((item) => item.id === id) : undefined;
  const [panel, setPanel] = useState<"create" | "edit" | "delete" | null>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();
  function persist(next: LearningList[]) {
    const ok = writePreview("lists", JSON.stringify(next));
    setMessage(
      ok
        ? "Updated in this browser tab only."
        : "Browser storage is blocked. Your change was not saved.",
    );
    return ok;
  }
  function shift(courseId: string, amount: number) {
    if (!list) return;
    const ids = [...list.courseIds];
    const from = ids.indexOf(courseId);
    const to = from + amount;
    if (to < 0 || to >= ids.length) return;
    [ids[from], ids[to]] = [ids[to], ids[from]];
    persist(
      lists.map((item) =>
        item.id === id ? { ...item, courseIds: ids } : item,
      ),
    );
  }
  return (
    <div className="collections-view">
      {id && (
        <Link className="back-link" href="/collections">
          <ArrowLeft size={16} />
          Learning lists
        </Link>
      )}
      <header className="page-heading">
        <h1>{list?.title ?? "Learning lists"}</h1>
        <button
          className="secondary-button"
          onClick={() => {
            setMessage("");
            setPanel(list ? "edit" : "create");
          }}
        >
          <Plus size={16} />
          {list ? "Edit list" : "New list"}
        </button>
      </header>
      <p className="muted">
        {list?.description ??
          "A place for courses you want to come back to. Lists are kept in this browser tab only."}
      </p>
      {message && (
        <p className="action-feedback" role="status">
          {message}
        </p>
      )}
      {id && !list ? (
        <EmptyState
          title="This list is not in this tab"
          description="It may have been removed, or created in a different browser tab."
          href="/collections"
          action="Back to learning lists"
        />
      ) : list ? (
        <>
          <ul className="collection-course-list">
            {list.courseIds.map((courseId, index) => {
              const course = courses.find((item) => item.id === courseId);
              return course ? (
                <li key={courseId}>
                  <Link className="table-course" href={`/courses/${courseId}`}>
                    <Image
                      src={`/covers/${course.artwork}`}
                      width={52}
                      height={52}
                      alt=""
                    />
                    <span>
                      {course.title}
                      <small>
                        {course.creator} · {course.duration}
                      </small>
                    </span>
                  </Link>
                  <div className="collection-row-actions">
                    <button
                      className="icon-button"
                      disabled={index === 0}
                      aria-label={`Move ${course.title} up`}
                      onClick={() => shift(courseId, -1)}
                    >
                      <ArrowUp />
                    </button>
                    <button
                      className="icon-button"
                      disabled={index === list.courseIds.length - 1}
                      aria-label={`Move ${course.title} down`}
                      onClick={() => shift(courseId, 1)}
                    >
                      <ArrowDown />
                    </button>
                    <button
                      className="icon-button"
                      aria-label={`Remove ${course.title} from list`}
                      onClick={() =>
                        persist(
                          lists.map((item) =>
                            item.id === id
                              ? {
                                  ...item,
                                  courseIds: item.courseIds.filter(
                                    (value) => value !== courseId,
                                  ),
                                }
                              : item,
                          ),
                        )
                      }
                    >
                      <X />
                    </button>
                  </div>
                </li>
              ) : null;
            })}
          </ul>
          {!list.courseIds.length && (
            <EmptyState
              title="Your list starts here"
              description="Add sample courses below or from a course's More options menu."
            />
          )}
          <section className="suggested-courses">
            <h2>Add a course to this list</h2>
            <div className="suggested-grid">
              {courses
                .filter((course) => !list.courseIds.includes(course.id))
                .slice(0, 6)
                .map((course) => (
                  <button
                    key={course.id}
                    onClick={() =>
                      persist(
                        lists.map((item) =>
                          item.id === id
                            ? {
                                ...item,
                                courseIds: [...item.courseIds, course.id],
                              }
                            : item,
                        ),
                      )
                    }
                  >
                    <Image
                      src={`/covers/${course.artwork}`}
                      width={42}
                      height={42}
                      alt=""
                    />
                    <span>
                      {course.title}
                      <small>{course.creator}</small>
                    </span>
                    <Plus size={17} />
                  </button>
                ))}
            </div>
          </section>
          <button
            className="text-link danger-text"
            onClick={() => setPanel("delete")}
          >
            <Trash2 size={16} />
            Delete this list
          </button>
        </>
      ) : (
        <div className="learning-list-grid">
          {lists.map((item) => (
            <Link href={`/collections/${item.id}`} key={item.id}>
              <div className="list-mosaic">
                {item.courseIds.slice(0, 4).map((courseId) => {
                  const course = courses.find((item) => item.id === courseId);
                  return course ? (
                    <Image
                      key={courseId}
                      src={`/covers/${course.artwork}`}
                      width={150}
                      height={150}
                      alt=""
                    />
                  ) : null;
                })}
                {!item.courseIds.length && <Layers />}
              </div>
              <h2>{item.title}</h2>
              <p>{item.courseIds.length} sample courses</p>
            </Link>
          ))}
        </div>
      )}
      <Dialog.Root
        open={panel !== null}
        onOpenChange={(open) => {
          if (!open) setPanel(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content flow-dialog">
            <Dialog.Close asChild>
              <button
                className="icon-button dialog-close"
                aria-label="Close list dialog"
              >
                <X />
              </button>
            </Dialog.Close>
            <Dialog.Title>
              {panel === "delete"
                ? "Delete learning list?"
                : panel === "edit"
                  ? "Edit learning list"
                  : "New learning list"}
            </Dialog.Title>
            <Dialog.Description>
              Only this browser tab changes. Courses and enrolled access are
              unaffected.
            </Dialog.Description>
            {panel === "delete" ? (
              <>
                <p>
                  {list?.title} will be removed from this tab. This cannot be
                  undone.
                </p>
                <button
                  className="primary-button"
                  onClick={() => {
                    if (persist(lists.filter((item) => item.id !== id))) {
                      setPanel(null);
                      router.push("/collections");
                    }
                  }}
                >
                  Delete list
                </button>
              </>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const data = new FormData(event.currentTarget);
                  const title = String(data.get("title") ?? "").trim();
                  const description = String(
                    data.get("description") ?? "",
                  ).trim();
                  if (!title || title.length > 80 || description.length > 240) {
                    setMessage("Enter a title between 1 and 80 characters.");
                    return;
                  }
                  if (panel === "create" && lists.length >= 30) {
                    setMessage("This preview supports up to 30 lists per tab.");
                    return;
                  }
                  const newId = list?.id ?? `list-${Date.now()}`;
                  const next = list
                    ? lists.map((item) =>
                        item.id === id ? { ...item, title, description } : item,
                      )
                    : [
                        ...lists,
                        { id: newId, title, description, courseIds: [] },
                      ];
                  if (persist(next)) {
                    setPanel(null);
                    router.push(`/collections/${newId}`);
                  }
                }}
              >
                <label className="field">
                  Title
                  <input
                    name="title"
                    required
                    maxLength={80}
                    defaultValue={panel === "edit" ? list?.title : ""}
                  />
                </label>
                <label className="field">
                  Description
                  <textarea
                    name="description"
                    rows={3}
                    maxLength={240}
                    defaultValue={panel === "edit" ? list?.description : ""}
                  />
                </label>
                <button className="primary-button">
                  {panel === "edit"
                    ? "Apply changes in this tab"
                    : "Create in this tab"}
                </button>
              </form>
            )}
            {message && (
              <p role="status" className="action-feedback">
                {message}
              </p>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <p className="flow-footnote">
        Learning lists organize sample courses. They are not purchases,
        enrollments, playlists of paid content, or permanent account records.
      </p>
    </div>
  );
}
