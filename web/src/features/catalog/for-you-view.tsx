"use client";
import { useState } from "react";
import { UserRound } from "lucide-react";
import { courses, subjects } from "./catalog";
import { CatalogCard } from "./catalog-card";
import { CourseActions } from "./course-actions";
import { savedIds, usePreviewValue, writePreview } from "./preview-storage";
export function ForYouView() {
  const interests = savedIds(usePreviewValue("interests"));
  const hidden = savedIds(usePreviewValue("less-suggestions"));
  const [message, setMessage] = useState("");
  const selected = courses.filter(
    (course) =>
      interests.includes(course.subject) && !hidden.includes(course.id),
  );
  function toggle(id: string) {
    const next = interests.includes(id)
      ? interests.filter((item) => item !== id)
      : [...interests, id];
    setMessage(
      writePreview("interests", JSON.stringify(next))
        ? "Subject choices updated in this tab only."
        : "Storage is blocked. Choices were not saved.",
    );
  }
  return (
    <div className="for-you-view">
      <header className="page-heading">
        <h1>For you</h1>
        <span className="muted">Based only on your choices in this tab</span>
      </header>
      <div
        className="interest-options"
        role="group"
        aria-label="Choose your subjects"
      >
        {subjects.map((subject) => (
          <button
            key={subject.id}
            className="secondary-button"
            aria-pressed={interests.includes(subject.id)}
            onClick={() => toggle(subject.id)}
          >
            {subject.label}
          </button>
        ))}
      </div>
      {message && (
        <p role="status" className="action-feedback">
          {message}
        </p>
      )}
      {!interests.length ? (
        <section className="feedback-state">
          <UserRound />
          <h2>Your interests, your next discovery</h2>
          <p>
            Choose a subject above to see matching sample courses. No profile
            analysis or recommendation service is connected.
          </p>
        </section>
      ) : selected.length ? (
        <div className="catalog-grid for-you-courses">
          {selected.map((course) => (
            <article key={course.id}>
              <CatalogCard course={course} />
              <CourseActions course={course} />
            </article>
          ))}
        </div>
      ) : (
        <section className="feedback-state">
          <h2>No suggestions left in this selection</h2>
          <p>Choose another subject or restore hidden suggestions.</p>
        </section>
      )}
      <div className="state-review">
        <button
          onClick={() => {
            if (writePreview("less-suggestions", "[]"))
              setMessage("Hidden suggestions restored in this tab.");
            else setMessage("Storage is blocked.");
          }}
        >
          Restore hidden suggestions ({hidden.length})
        </button>
        <button
          onClick={() => {
            if (writePreview("interests", "[]"))
              setMessage("Subject choices cleared in this tab.");
            else setMessage("Storage is blocked.");
          }}
        >
          Clear subject choices
        </button>
      </div>
      <p className="flow-footnote">
        This is a deterministic browser-tab preview, not AI personalization,
        activity tracking or a real user profile. Saving and hiding suggestions
        do not change enrollment.
      </p>
    </div>
  );
}
