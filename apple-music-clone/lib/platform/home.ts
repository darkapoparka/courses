import { canReadDemoLesson, categories, courses } from "./catalog";
import { creatorName } from "./discovery";
import type { Course, HomePreferences, Lesson, PreviewState } from "./types";

export const defaultHomePreferences = (): HomePreferences => ({
  interests: [], hiddenPicks: [], communityDismissed: false,
});

/** Additive v1 preferences. A malformed shape pauses writes instead of erasing it. */
export function decodeHomePreferences(value: unknown): HomePreferences {
  if (value === undefined) return defaultHomePreferences();
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid Home preferences");
  const raw = value as Record<string, unknown>;
  if (!Array.isArray(raw.interests) || !Array.isArray(raw.hiddenPicks) || typeof raw.communityDismissed !== "boolean") {
    throw new Error("Invalid Home preferences");
  }
  return {
    interests: categories.filter(category => (raw.interests as unknown[]).includes(category)),
    hiddenPicks: courses.filter(course => (raw.hiddenPicks as unknown[]).includes(course.id)).map(course => course.id),
    communityDismissed: raw.communityDismissed,
  };
}

export type LearningEntry = {
  course: Course; lesson?: Lesson; completed: number; total: number;
  status: "continue" | "complete" | "sample-finished";
  href: string; lastOpened: number;
};
const time = (value?: string) => value && Number.isFinite(Date.parse(value)) ? Date.parse(value) : 0;

/** Read-only projection: Home navigation never starts or completes a lesson. */
export function learningEntries(state: PreviewState): LearningEntry[] {
  return courses.flatMap(course => {
    const visited = course.lessons.filter(lesson => Boolean(state.progress[lesson.id]));
    if (!visited.length) return [];
    const completed = course.lessons.filter(lesson => state.progress[lesson.id]?.completed).length;
    const available = course.lessons.filter(lesson => canReadDemoLesson(course, lesson.id));
    const unfinished = available.filter(lesson => !state.progress[lesson.id]?.completed);
    const recent = [...unfinished].filter(lesson => state.progress[lesson.id])
      .sort((a, b) => time(state.progress[b.id]?.lastOpenedAt) - time(state.progress[a.id]?.lastOpenedAt))[0];
    const resume = state.resume?.courseId === course.id
      ? unfinished.find(lesson => lesson.id === state.resume?.lessonId) : undefined;
    const lesson = resume ?? recent ?? unfinished[0];
    const status: LearningEntry["status"] = completed === course.lessons.length ? "complete" : lesson ? "continue" : "sample-finished";
    return [{
      course, lesson, completed, total: course.lessons.length, status,
      href: lesson ? `/learn/courses/${course.slug}/lessons/${lesson.id}` : `/learn/courses/${course.slug}`,
      lastOpened: Math.max(...visited.map(item => time(state.progress[item.id]?.lastOpenedAt ?? state.progress[item.id]?.updatedAt))),
    }];
  }).sort((a, b) => {
    const rank = (entry: LearningEntry) => entry.status === "continue" ? 0 : 1;
    return rank(a) - rank(b) || Number(b.course.id === state.resume?.courseId) - Number(a.course.id === state.resume?.courseId)
      || b.lastOpened - a.lastOpened || a.course.id.localeCompare(b.course.id);
  });
}

export function homePicks(state: PreviewState): { course: Course; reason: string }[] {
  const started = new Set(learningEntries(state).map(entry => entry.course.id));
  const savedSubjects = new Set(courses.filter(course => state.saved.includes(course.id)).map(course => course.category));
  return courses.filter(course => !started.has(course.id) && !state.saved.includes(course.id) && !state.homePreferences.hiddenPicks.includes(course.id))
    .map((course, index) => {
      const follows = state.following.includes(course.creatorId);
      const interest = state.homePreferences.interests.includes(course.category);
      return { course, index, score: follows ? 3 : interest ? 2 : savedSubjects.has(course.category) ? 1 : 0,
        reason: follows ? `Because you follow ${creatorName(course)}` : interest ? `Because you chose ${course.category}`
          : savedSubjects.has(course.category) ? `Related to your saved ${course.category.toLowerCase()} courses` : "A starting point from our demo catalog" };
    }).sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ course, reason }) => ({ course, reason }));
}

export function shortLessons(state: PreviewState, minutes: number, includeCompleted = false) {
  const budget = [5, 10, 15].includes(minutes) ? minutes : 10;
  return courses.flatMap(course => course.lessons.filter(lesson =>
    canReadDemoLesson(course, lesson.id) && lesson.minutes <= budget && (includeCompleted || !state.progress[lesson.id]?.completed)
  ).map(lesson => ({ course, lesson }))).sort((a, b) =>
    Number(state.homePreferences.interests.includes(b.course.category)) - Number(state.homePreferences.interests.includes(a.course.category))
    || a.lesson.minutes - b.lesson.minutes || a.lesson.id.localeCompare(b.lesson.id)
  );
}
