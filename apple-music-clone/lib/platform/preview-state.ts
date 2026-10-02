import { canReadDemoLesson, courses } from "./catalog";
import { creatorById } from "./discovery";
import { discussionPrompts } from "./community-seeds";
import { recentQueries } from "./search";
import type { PreviewState, PreviewPost, PreviewReply } from "./types";
export const STORAGE_KEY = "courses:learning-preview:v1";
export const MAX_POSTS = 40;
export const MAX_REPLIES = 80;
export const MAX_STORAGE_LENGTH = 400000;
export const MAX_NOTE_LENGTH = 6000;
export const emptyState = (): PreviewState => ({ version: 1, saved: [], progress: {}, notes: {}, posts: [], helpful: [], replies: [], following: [], recentSearches: [], resume: null });
const courseIds = new Set(courses.map(course => course.id));
const lessonIds = new Set(courses.flatMap(course => course.lessons.filter(lesson => canReadDemoLesson(course, lesson.id)).map(lesson => lesson.id)));
const object = (value: unknown): value is Record<string, unknown> => Boolean(value && typeof value === "object" && !Array.isArray(value));
const date = (value: unknown): value is string => typeof value === "string" && value.length <= 32 && Number.isFinite(Date.parse(value));
export function decodePreview(raw: string | null): { state: PreviewState; writable: boolean; issue: string | null } {
  if (!raw) return { state: emptyState(), writable: true, issue: null };
  try {
    if (raw.length > MAX_STORAGE_LENGTH) throw new Error("oversized");
    const value: unknown = JSON.parse(raw);
    if (!object(value) || value.version !== 1 || !Array.isArray(value.saved) || !object(value.progress) || !object(value.notes) || !Array.isArray(value.posts) || !Array.isArray(value.helpful)) throw new Error("unsupported");
    const state = emptyState();
    if (value.recentSearches !== undefined && !Array.isArray(value.recentSearches)) throw new Error("invalid recent searches");
    state.recentSearches = recentQueries((value.recentSearches ?? []) as unknown[]);
    if (value.following !== undefined && !Array.isArray(value.following)) throw new Error("invalid following");
    state.following = [...new Set(((value.following ?? []) as unknown[]).filter((id): id is string => typeof id === "string" && Boolean(creatorById(id))))];
    state.saved = [...new Set(value.saved.filter((id): id is string => typeof id === "string" && courseIds.has(id)))];
    for (const id of lessonIds) {
      const progress = value.progress[id];
      if (object(progress) && typeof progress.completed === "boolean" && date(progress.updatedAt)) state.progress[id] = { completed: progress.completed, updatedAt: progress.updatedAt };
      if (typeof value.notes[id] === "string") state.notes[id] = value.notes[id].slice(0, MAX_NOTE_LENGTH);
    }
    state.posts = value.posts.filter((post): post is PreviewPost => object(post) && typeof post.id === "string" && /^local-[a-z0-9-]{1,80}$/.test(post.id) && typeof post.courseId === "string" && courseIds.has(post.courseId) && typeof post.title === "string" && post.title.trim().length >= 3 && post.title.length <= 100 && typeof post.body === "string" && post.body.trim().length >= 10 && post.body.length <= 2000 && date(post.createdAt)).slice(0, MAX_POSTS);
    state.posts = state.posts.filter((post, index, all) => all.findIndex(item => item.id === post.id) === index);
    const parents = new Set([...state.posts, ...discussionPrompts].map(post => post.id));
    if (value.replies !== undefined && !Array.isArray(value.replies)) throw new Error("invalid replies");
    const replies = (value.replies ?? []) as unknown[];
    state.replies = replies.filter((reply): reply is PreviewReply => object(reply) && typeof reply.id === "string" && /^reply-[a-z0-9-]{1,80}$/.test(reply.id) && typeof reply.postId === "string" && parents.has(reply.postId) && typeof reply.body === "string" && reply.body.trim().length >= 3 && reply.body.length <= 2000 && date(reply.createdAt)).filter((reply, index, all) => all.findIndex(item => object(item) && item.id === reply.id) === index).slice(0, MAX_REPLIES).map(({ id, postId, body, createdAt }) => ({ id, postId, body, createdAt }));
    state.helpful = [...new Set(value.helpful.filter((id): id is string => typeof id === "string" && /^(seed|local)-[a-z0-9-]{1,80}$/.test(id)))].slice(0, 100);
    if (object(value.resume) && typeof value.resume.courseId === "string" && typeof value.resume.lessonId === "string") {
      const resume = value.resume;
      const course = courses.find(item => item.id === resume.courseId);
      if (course && canReadDemoLesson(course, value.resume.lessonId)) state.resume = { courseId: course.id, lessonId: value.resume.lessonId };
    }
    return { state, writable: true, issue: null };
  } catch {
    // Never erase unknown-version or unreadable user data to make the UI appear healthy.
    return { state: emptyState(), writable: false, issue: "This browser has unreadable or newer preview data. It has been preserved; saving is paused." };
  }
}
export function validatePost(title: string, body: string, courseId: string): string | null {
  if (!courseIds.has(courseId)) return "Choose a course for this discussion.";
  if (title.trim().length < 3 || title.trim().length > 100) return "Use a title between 3 and 100 characters.";
  if (body.trim().length < 10 || body.trim().length > 2000) return "Write between 10 and 2,000 characters.";
  return null;
}

export function validateReply(body: string): string | null {
  return body.trim().length < 3 || body.trim().length > 2000 ? "Write a reply between 3 and 2,000 characters." : null;
}
