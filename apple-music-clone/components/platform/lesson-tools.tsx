"use client";
import { useEffect, useRef, useState } from "react";
import { MAX_NOTE_LENGTH } from "../../lib/platform/preview-state";
import { updatePreview, usePreview } from "./preview-store";
import { Icon } from "./icon";
import styles from "./platform.module.css";
export function LessonTools({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const { state, ready, writable } = usePreview();
  const [draft, setDraft] = useState<string | null>(null);
  const [message, setMessage] = useState(""); const [conflict, setConflict] = useState(false);
  const noteAtEdit = useRef(""); const note = state.notes[lessonId] ?? "";
  const complete = state.progress[lessonId]?.completed ?? false;
  useEffect(() => {
    if (!ready || !writable) return;
    updatePreview(current => ({ ...current, resume: { courseId, lessonId }, progress: { ...current.progress, [lessonId]: { ...(current.progress[lessonId] ?? { completed: false, updatedAt: new Date().toISOString() }), lastOpenedAt: new Date().toISOString() } } }));
  }, [courseId, lessonId, ready, writable]);
  function saveNote() {
    let collided = false;
    const ok = updatePreview(current => {
      if ((current.notes[lessonId] ?? "") !== noteAtEdit.current) { collided = true; return current; }
      return { ...current, notes: { ...current.notes, [lessonId]: (draft ?? note).slice(0, MAX_NOTE_LENGTH) } };
    });
    if (collided) { setConflict(true); setMessage("This note changed in another tab. Your draft is preserved. Copy it before loading the saved version."); return; }
    if (ok) { setDraft(null); setConflict(false); setMessage("Note saved in this browser."); }
    else setMessage("Note was not saved. Your draft is still here; copy it before leaving.");
  }
  function editNote(value: string) { if (draft === null) noteAtEdit.current = note; setDraft(value); }
  useEffect(() => {
    if (draft === null) return;
    const onUnload = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    const onNavigate = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest?.("a[href]");
      if (anchor && !anchor.getAttribute("href")?.startsWith("#") && !window.confirm("Your note has unsaved changes. Leave without saving this draft?")) { event.preventDefault(); event.stopPropagation(); }
    };
    const onSearchNavigate = (event: Event) => { if (!window.confirm("Your note has unsaved changes. Leave without saving this draft?")) event.preventDefault(); };
    window.addEventListener("courses:before-navigate", onSearchNavigate);
    window.addEventListener("beforeunload", onUnload); document.addEventListener("click", onNavigate, true);
    return () => { window.removeEventListener("courses:before-navigate", onSearchNavigate); window.removeEventListener("beforeunload", onUnload); document.removeEventListener("click", onNavigate, true); };
  }, [draft]);
  return <section className={styles.lessonTools} aria-labelledby="practice-progress"><h2 id="practice-progress">Make it part of your practice</h2><button className={styles.primaryButton} aria-pressed={complete} disabled={!ready || !writable} onClick={() => {
    const ok = updatePreview(current => ({ ...current, progress: { ...current.progress, [lessonId]: { ...current.progress[lessonId], completed: !current.progress[lessonId]?.completed, updatedAt: new Date().toISOString() } } }));
    setMessage(ok ? (complete ? "Marked as unfinished." : "Lesson marked complete in this browser.") : "Completion could not be saved.");
  }}><Icon name="check" />{complete ? "Completed · undo" : "Mark lesson complete"}</button>
    <label htmlFor="lesson-note">Your lesson notes <span>Only in this browser, not an account</span></label>
    <textarea id="lesson-note" rows={5} maxLength={MAX_NOTE_LENGTH} value={draft ?? note} onChange={event => editNote(event.target.value)} placeholder="What will you try next?" />
    <div className={styles.actions}><button className={styles.secondaryButton} disabled={!ready || !writable || draft === null} onClick={saveNote}>Save note</button>{conflict && <button className={styles.textButton} onClick={() => { setDraft(null); setConflict(false); setMessage("Loaded the saved note."); }}>Discard draft and load saved note</button>}<span className={styles.muted}>{(draft ?? note).length} / {MAX_NOTE_LENGTH}</span></div>
    <p className={styles.actionNote} role="status">{message || "Save before navigating away. Anyone using this browser may see these notes."}</p>
  </section>;
}
