"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  Maximize2,
  Play,
  X,
} from "lucide-react";
import { CourseActions } from "@/features/catalog/course-actions";
import {
  readPreview,
  usePreviewValue,
  writePreview,
} from "@/features/catalog/preview-storage";
import type { SampleCourse, SampleLesson } from "@/features/catalog/catalog";
const panels = [
  "Curriculum",
  "Transcript",
  "Notes",
  "Resources",
  "Questions",
] as const;
type Panel = (typeof panels)[number];
const transcript = [
  { time: 0, text: "Start with a clear goal. What are you trying to make?" },
  {
    time: 6,
    text: "Add the context. Describe the audience, constraints and purpose.",
  },
  {
    time: 12,
    text: "Shape a useful result: a draft, a checklist, or a small example.",
  },
  {
    time: 18,
    text: "Read, question and improve. Check assumptions before using the result.",
  },
];
function applyCaptionPreference(element: HTMLVideoElement | null) {
  const track = element?.textTracks[0];
  if (track)
    track.mode = readPreview("captions") === "off" ? "disabled" : "showing";
}

export function LessonWorkspace({
  course,
  lesson,
  lessons,
  sample,
  state,
}: {
  course: SampleCourse;
  lesson: SampleLesson;
  lessons: SampleLesson[];
  sample: string;
  state: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const latestPosition = useRef(0);
  const positionInitialized = useRef(false);
  const captionPreference = usePreviewValue("captions");
  const [panel, setPanel] = useState<Panel>("Curriculum");
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(state === "error");
  const [message, setMessage] = useState("");
  const [noteMessage, setNoteMessage] = useState("");
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState("1");
  const [repeat, setRepeat] = useState(false);
  const noteKey = `note:${course.id}:${lesson.id}`;
  const doneKey = `complete:${course.id}:${lesson.id}`;
  const note = usePreviewValue(noteKey);
  const complete = usePreviewValue(doneKey) === "1";
  const index = lessons.findIndex((item) => item.id === lesson.id);
  const locked =
    state === "locked" || (sample !== "learner" && !lesson.preview);
  const processing = state === "processing";
  const href = (id: string) =>
    `/learn/${course.id}/${id}?sample=${sample === "learner" ? "learner" : "visitor"}`;
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    positionInitialized.current = false;
    const key = `position:${course.id}:${lesson.id}`;
    // Metadata can arrive before React hydrates (especially from the browser cache).
    // Synchronize both the already-ready case and the native metadata event once.
    function initializePosition() {
      if (!element || element.readyState < 1 || positionInitialized.current)
        return;
      const stored = sample === "learner" ? Number(readPreview(key)) : 0;
      const position =
        Number.isFinite(stored) && stored >= 0 && stored < element.duration - 1
          ? stored
          : 0;
      latestPosition.current = position;
      element.currentTime = position;
      positionInitialized.current = true;
      applyCaptionPreference(element);
    }
    function retainPosition() {
      if (positionInitialized.current && sample === "learner")
        writePreview(key, String(latestPosition.current));
    }
    element.addEventListener("loadedmetadata", initializePosition);
    initializePosition();
    window.addEventListener("pagehide", retainPosition);
    return () => {
      retainPosition();
      element.pause();
      positionInitialized.current = false;
      element.removeEventListener("loadedmetadata", initializePosition);
      window.removeEventListener("pagehide", retainPosition);
    };
  }, [course.id, lesson.id, sample, failed]);
  useEffect(() => {
    applyCaptionPreference(video.current);
  }, [captionPreference, failed]);
  function seek(value: number) {
    if (video.current) {
      video.current.currentTime = value;
      latestPosition.current = value;
      savePosition();
      setTime(value);
    }
  }
  function savePosition() {
    if (video.current && positionInitialized.current && sample === "learner")
      writePreview(
        `position:${course.id}:${lesson.id}`,
        String(video.current.currentTime),
      );
  }
  async function togglePlay() {
    const element = video.current;
    if (!element) return;
    if (!element.paused) element.pause();
    else {
      try {
        await element.play();
      } catch {
        setMessage("Playback did not start. Use the video controls to retry.");
      }
    }
  }
  return (
    <div className="lesson-workspace">
      <header className="lesson-topbar">
        <Link
          href={`/courses/${course.id}${sample === "learner" ? "?sample=learner" : ""}`}
          aria-label="Close lesson and return to course"
          onClick={() => {
            savePosition();
            video.current?.pause();
          }}
        >
          <X aria-hidden="true" />
        </Link>
        <span>{course.title}</span>
        <span className="workspace-sample">
          {sample === "learner" ? "Learner" : "Public preview"} · UI sample
        </span>
      </header>
      <div className="lesson-layout">
        <section className="lesson-main" aria-labelledby="lesson-title">
          <p className="eyebrow">
            LESSON {index + 1} OF {lessons.length} · SAMPLE WORKSPACE
          </p>
          <h1 id="lesson-title">{lesson.title}</h1>
          {locked ? (
            <div className="media-state">
              <h2>This lesson is locked</h2>
              <p>
                Visitor mode includes only the first public UI sample. No paid
                lesson content exists in this preview.
              </p>
              <Link className="primary-button" href={href("lesson-1")}>
                Back to the public sample
              </Link>
              <Link
                className="text-link"
                href={`/courses/${course.id}?sample=learner`}
              >
                Inspect the learner state
              </Link>
            </div>
          ) : processing ? (
            <div className="media-state">
              <h2>Sample media is processing</h2>
              <p>
                This is a processing-state demonstration, not a real upload.
              </p>
              <Link className="primary-button" href={href(lesson.id)}>
                Show ready sample
              </Link>
            </div>
          ) : failed ? (
            <div className="media-state" role="alert">
              <h2>The sample video could not load</h2>
              <p>
                No progress was lost on a server. Try loading the local media
                again.
              </p>
              <button
                className="primary-button"
                onClick={() => {
                  setFailed(false);
                  setMessage("");
                }}
              >
                Retry sample video
              </button>
            </div>
          ) : (
            <div className="media-frame">
              <video
                ref={video}
                controls
                playsInline
                preload="metadata"
                loop={repeat}
                aria-label="A better brief: original silent UI sample"
                poster="/sample/poster.png"
                onTimeUpdate={() => {
                  if (!positionInitialized.current) return;
                  latestPosition.current = video.current?.currentTime ?? 0;
                  setTime(latestPosition.current);
                }}
                onSeeked={savePosition}
                onPlay={() => setPlaying(true)}
                onPause={() => {
                  setPlaying(false);
                  savePosition();
                }}
                onError={() => setFailed(true)}
              >
                <source src="/sample/a-better-brief.webm" type="video/webm" />
                <track
                  kind="captions"
                  src="/sample/a-better-brief.vtt"
                  srcLang="en"
                  label="English"
                  default={captionPreference !== "off"}
                  onLoad={() => applyCaptionPreference(video.current)}
                />
                Your browser does not support this sample video.
              </video>
            </div>
          )}
          {!locked && !processing && !failed && (
            <div className="media-options">
              <button className="secondary-button" onClick={togglePlay}>
                <Play size={15} />
                {playing ? "Pause sample" : "Play sample"}
              </button>
              <label>
                Speed
                <select
                  aria-label="Playback speed"
                  value={speed}
                  onChange={(event) => {
                    setSpeed(event.target.value);
                    if (video.current)
                      video.current.playbackRate = Number(event.target.value);
                  }}
                >
                  <option value="0.75">0.75×</option>
                  <option value="1">1×</option>
                  <option value="1.25">1.25×</option>
                  <option value="1.5">1.5×</option>
                  <option value="2">2×</option>
                </select>
              </label>
              <button aria-pressed={repeat} onClick={() => setRepeat(!repeat)}>
                Repeat sample
              </button>
              <button
                className="icon-button"
                aria-label="Expand video to fullscreen"
                onClick={async () => {
                  try {
                    await video.current?.requestFullscreen();
                  } catch {
                    setMessage(
                      "Fullscreen is not available in this browser context.",
                    );
                  }
                }}
              >
                <Maximize2 />
              </button>
            </div>
          )}
          <p className="media-disclosure">
            Original, silent 24-second UI sample with English captions. Shared
            across these fictional courses; not the full lesson advertised in
            the sample syllabus.
          </p>
          <div className="lesson-bottom-actions">
            <button
              className="primary-button pill"
              disabled={locked || processing || failed}
              aria-pressed={complete}
              onClick={() => {
                const ok = writePreview(doneKey, complete ? "0" : "1");
                setMessage(
                  ok
                    ? complete
                      ? "Completion removed in this tab."
                      : "Marked complete in this tab only. Not saved to an account."
                    : "Storage is blocked. Completion was not saved.",
                );
              }}
            >
              {complete ? <Check size={16} /> : null}
              {complete ? "Complete in this tab" : "Mark sample complete"}
            </button>
            <CourseActions course={course} />
          </div>
          {message && (
            <p className="workspace-feedback" role="status">
              {message}
            </p>
          )}
          <nav className="lesson-pagination" aria-label="Lesson navigation">
            {index > 0 ? (
              <Link href={href(lessons[index - 1].id)}>
                <ArrowLeft size={16} />
                Previous lesson
              </Link>
            ) : (
              <span />
            )}
            {index + 1 < lessons.length ? (
              <Link href={href(lessons[index + 1].id)}>
                Next lesson
                <ArrowRight size={16} />
              </Link>
            ) : (
              <Link href={`/courses/${course.id}?state=completed`}>
                Review sample course
                <Check size={16} />
              </Link>
            )}
          </nav>
        </section>
        <aside className="study-panel">
          <div
            className="study-tabs"
            role="tablist"
            aria-label="Study tools"
            onKeyDown={(event) => {
              if (
                !["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)
              )
                return;
              const buttons = Array.from(
                event.currentTarget.querySelectorAll<HTMLButtonElement>(
                  "[role=tab]",
                ),
              );
              const current = panels.indexOf(panel);
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? panels.length - 1
                    : (current +
                        (event.key === "ArrowRight" ? 1 : -1) +
                        panels.length) %
                      panels.length;
              event.preventDefault();
              setPanel(panels[next]);
              buttons[next]?.focus();
            }}
          >
            {panels.map((name) => (
              <button
                key={name}
                role="tab"
                aria-selected={panel === name}
                tabIndex={panel === name ? 0 : -1}
                aria-controls="study-content"
                id={`tab-${name}`}
                onClick={() => setPanel(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <div
            id="study-content"
            className="study-content"
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`tab-${panel}`}
          >
            {panel === "Curriculum" && (
              <>
                <h2>Up next in this course</h2>
                <p className="muted">
                  {lessons.length} lessons · fictional syllabus
                </p>
                <ol className="study-curriculum">
                  {lessons.map((item, i) => (
                    <li key={item.id}>
                      <Link
                        href={href(item.id)}
                        aria-current={
                          item.id === lesson.id ? "step" : undefined
                        }
                      >
                        <span>{i + 1}</span>
                        <span>
                          {item.title}
                          <small>
                            {item.minutes} min{" "}
                            {item.preview ? "· Public sample" : ""}
                          </small>
                        </span>
                        {item.id === lesson.id && <Play size={14} />}
                      </Link>
                    </li>
                  ))}
                </ol>
              </>
            )}
            {panel === "Transcript" && (
              <>
                <h2>Sample transcript</h2>
                <p className="muted">
                  Select a passage to seek in the video. All text stays
                  readable.
                </p>
                <div className="transcript">
                  {transcript.map((line, i) => (
                    <button
                      key={line.time}
                      disabled={locked || processing || failed}
                      className={
                        time >= line.time &&
                        time < (transcript[i + 1]?.time ?? 25)
                          ? "active"
                          : ""
                      }
                      onClick={() => seek(line.time)}
                    >
                      <small>0:{String(line.time).padStart(2, "0")}</small>
                      {line.text}
                    </button>
                  ))}
                </div>
              </>
            )}
            {panel === "Notes" && (
              <>
                <h2>Your study note</h2>
                <p className="muted">
                  This note stays in this browser tab. It is not a private
                  account record or synced data.
                </p>
                <label className="field">
                  Note
                  <textarea
                    key={noteKey}
                    defaultValue={note}
                    maxLength={4000}
                    rows={9}
                    onBlur={(event) => {
                      const ok = writePreview(
                        noteKey,
                        event.currentTarget.value,
                      );
                      setNoteMessage(
                        ok
                          ? "Study note kept in this tab only."
                          : "Storage is blocked. Copy your note before leaving.",
                      );
                    }}
                  />
                </label>
                <p className="muted">
                  Leave the field to keep the note in this tab. Do not enter
                  sensitive information.
                </p>
                <p className="note-feedback" role="status">
                  {noteMessage}
                </p>
              </>
            )}
            {panel === "Resources" && (
              <>
                <h2>Practice resources</h2>
                <p>Original public worksheet for the sample video.</p>
                <a
                  className="resource-download"
                  href="/sample/brief-worksheet.txt"
                  download
                >
                  <Download size={18} />
                  <span>
                    A better brief<small>Plain-text practice worksheet</small>
                  </span>
                </a>
              </>
            )}
            {panel === "Questions" && (
              <>
                <h2>Questions about the lesson</h2>
                <p className="muted">
                  No live discussion is connected. Try drafting a question
                  without sending it.
                </p>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setMessage(
                      "Preview only: this question was not posted, sent or saved.",
                    );
                  }}
                >
                  <label className="field">
                    Your question
                    <textarea required rows={5} maxLength={1000} />
                  </label>
                  <button className="secondary-button">
                    Review draft (not sent)
                  </button>
                </form>
              </>
            )}
          </div>
        </aside>
      </div>
      <nav className="workspace-states" aria-label="Lesson review states">
        <Link href={href(lesson.id)}>Ready</Link>
        <Link href={`${href(lesson.id)}&state=locked`}>Locked</Link>
        <Link href={`${href(lesson.id)}&state=processing`}>Processing</Link>
        <Link href={`${href(lesson.id)}&state=error`}>Error</Link>
      </nav>
    </div>
  );
}
