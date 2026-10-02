"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { Course, PreviewPost } from "../../lib/platform/types";
import { MAX_POSTS, validatePost } from "../../lib/platform/preview-state";
import { usePreview, updatePreview } from "./preview-store";
import { discussionPrompts as prompts } from "../../lib/platform/community-seeds";
import { ReplyThread } from "./reply-thread";
import styles from "./platform.module.css";

export function CommunityFeed({ courses, initialCourse }: { courses: readonly Course[]; initialCourse: string }) {
  const { state, ready, writable } = usePreview();
  const [filter, setFilter] = useState(initialCourse); const [courseId, setCourseId] = useState(initialCourse || courses[0].id);
  const [title, setTitle] = useState(""); const [body, setBody] = useState(""); const [message, setMessage] = useState(""); const [error, setError] = useState("");
  const feed = [...state.posts, ...prompts].filter(post => !filter || post.courseId === filter);
  function submit(event: FormEvent) {
    event.preventDefault(); const invalid = validatePost(title, body, courseId);
    if (invalid) { setError(invalid); return; }
    const post: PreviewPost = { id: `local-${crypto.randomUUID()}`, courseId, title: title.trim(), body: body.trim(), createdAt: new Date().toISOString() };
    let full = false;
    const ok = updatePreview(current => { if (current.posts.length >= MAX_POSTS) { full = true; return current; } return { ...current, posts: [post, ...current.posts] }; });
    if (!ok || full) { setError(full ? "This preview holds 40 local posts. Existing posts have been kept." : "The post could not be saved. Your draft is still here."); return; }
    setTitle(""); setBody(""); setError(""); setFilter(courseId); setMessage("Post saved locally. It has not been published or sent to anyone.");
  }
  return <div className={styles.communityLayout}><section aria-label="Course discussions"><div className={styles.filters}><label htmlFor="discussion-filter">Course</label><select id="discussion-filter" value={filter} onChange={event => setFilter(event.target.value)}><option value="">All courses</option>{courses.map(course => <option key={course.id} value={course.id}>{course.title}</option>)}</select></div>
    {feed.length ? feed.map(post => { const course = courses.find(item => item.id === post.courseId)!; const helpful = state.helpful.includes(post.id); return <article className={styles.post} key={post.id}>
      <div className={styles.postMeta}><span className={styles.avatar}>{post.id.startsWith("seed-") ? "CS" : "YO"}</span><div><strong>{post.id.startsWith("seed-") ? "Courses Studio" : "You · local draft space"}</strong><span>{post.id.startsWith("seed-") ? "Demo discussion prompt" : "Visible only in this browser"}</span></div><Link href={`/learn/courses/${course.slug}`} className={styles.topic}>{course.category}</Link></div>
      <h2>{post.title}</h2><p className={styles.postBody}>{post.body}</p><div className={styles.postActions}><button className={styles.textButton} aria-pressed={helpful} disabled={!ready || !writable} onClick={() => { const ok = updatePreview(current => ({ ...current, helpful: current.helpful.includes(post.id) ? current.helpful.filter(id => id !== post.id) : [...current.helpful, post.id] })); if (!ok) setMessage("Your reaction could not be saved."); }}>{helpful ? "Marked helpful" : "Mark helpful"}</button><Link href={`/learn/courses/${course.slug}`}>Open course <span aria-hidden="true">↗</span></Link></div><ReplyThread postId={post.id} postTitle={post.title} /></article>;
    }) : <div className={styles.empty}><h2>Start with a good question.</h2><p>No local discussions for this course yet. Write a question in the form.</p></div>}
    </section><aside className={styles.composer}><h2>Learn it. Try it. Share it.</h2><p>Connect an idea to the course it came from. This is a local prototype, not a live community.</p>
      <form onSubmit={submit}><label htmlFor="post-course">About this course</label><select id="post-course" value={courseId} onChange={event => setCourseId(event.target.value)}>{courses.map(course => <option key={course.id} value={course.id}>{course.title}</option>)}</select>
        <label htmlFor="post-title">Your question or observation</label><input id="post-title" required minLength={3} maxLength={100} value={title} onChange={event => setTitle(event.target.value)} placeholder="What are you working through?" />
        <label htmlFor="post-body">Add some context</label><textarea id="post-body" required minLength={10} maxLength={2000} rows={6} value={body} onChange={event => setBody(event.target.value)} placeholder="What did you try, and what did you notice?" />
        <button type="submit" className={styles.primaryButton} disabled={!ready || !writable}>Post to local preview</button>{error && <p role="alert" className={styles.errorText}>{error}</p>}<p role="status" className={styles.actionNote}>{message || "No notifications are sent. Do not include sensitive information."}</p>
      </form></aside></div>;
}
