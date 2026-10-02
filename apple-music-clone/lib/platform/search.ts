import { canReadDemoLesson, courses } from "./catalog";
import { creatorName, creators, topics } from "./discovery";
import type { Course, PreviewState } from "./types";

export const searchKinds = ["all", "courses", "creators", "lessons", "categories"] as const;
export type SearchKind = typeof searchKinds[number];
export type SearchScope = "catalog" | "library";
export type SearchHit = Readonly<{ id: string; kind: Exclude<SearchKind, "all">; title: string; detail: string; href: string; courseId?: string; available?: boolean }>;
export const normalizeQuery = (value: unknown): string => typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, 100) : "";
export const searchKind = (value: unknown): SearchKind => searchKinds.find(kind => kind === value) ?? "all";
export const searchScope = (value: unknown): SearchScope => value === "library" ? "library" : "catalog";
export function searchHref(query: string, scope: SearchScope = "catalog", kind: SearchKind = "all"): string {
  const params = new URLSearchParams();
  const text = normalizeQuery(query);
  if (text) params.set("q", text);
  if (scope !== "catalog") params.set("scope", scope);
  if (kind !== "all") params.set("type", kind);
  return `/learn/search${params.size ? `?${params}` : ""}`;
}
export function libraryCourseIds(state: PreviewState): readonly string[] {
  return courses.filter(course => state.saved.includes(course.id) || course.lessons.some(lesson => Boolean(state.progress[lesson.id]))).map(course => course.id);
}
/** Public metadata only. Private notes and protected lesson bodies are never indexed. */
export function searchCatalog(query: string, kind: SearchKind = "all", allowedCourseIds?: readonly string[]): readonly SearchHit[] {
  const needle = normalizeQuery(query).toLocaleLowerCase("en");
  if (!needle) return [];
  const included = courses.filter(course => !allowedCourseIds || allowedCourseIds.includes(course.id));
  const index: SearchHit[] = included.flatMap(course => [
    { id: `course-${course.id}`, kind: "courses" as const, title: course.title, detail: `${creatorName(course)} · ${course.category}`, href: `/learn/courses/${course.slug}`, courseId: course.id },
    ...course.lessons.map(lesson => ({ id: `lesson-${lesson.id}`, kind: "lessons" as const, title: lesson.title, detail: `${course.title} · ${creatorName(course)} · ${lesson.minutes} min · ${canReadDemoLesson(course, lesson.id) ? "Open lesson" : "Not in preview"}`, href: `/learn/courses/${course.slug}/lessons/${lesson.id}`, courseId: course.id, available: canReadDemoLesson(course, lesson.id) })),
  ]);
  index.push(...creators.filter(creator => included.some(course => course.creatorId === creator.id)).map(creator => ({ id: `creator-${creator.id}`, kind: "creators" as const, title: creator.name, detail: `${creator.category} · Demo creator`, href: `/learn/creators/${creator.slug}` })));
  index.push(...topics.filter(topic => included.some(course => course.category === topic.name)).map(topic => ({ id: `category-${topic.slug}`, kind: "categories" as const, title: topic.name, detail: topic.description, href: `/learn/categories/${topic.slug}` })));
  return index.filter(hit => (kind === "all" || hit.kind === kind) && `${hit.title} ${hit.detail}`.toLocaleLowerCase("en").includes(needle))
    .sort((a, b) => Number(b.title.toLocaleLowerCase("en").startsWith(needle)) - Number(a.title.toLocaleLowerCase("en").startsWith(needle)));
}
export function recentQueries(value: readonly unknown[]): string[] {
  const seen = new Set<string>();
  return value.flatMap(item => {
    const query = normalizeQuery(item); const key = query.toLocaleLowerCase("en");
    if (!query || seen.has(key)) return [];
    seen.add(key); return [query];
  }).slice(0, 8);
}
export type CatalogSort = "featured" | "title" | "duration";
export function selectCourses(items: readonly Course[], query: string, category: string, access: string, sort: CatalogSort): readonly Course[] {
  const needle = normalizeQuery(query).toLocaleLowerCase("en");
  const result = items.filter(course => (!category || course.category === category) && (access !== "free" || course.priceMinor === 0) && `${course.title} ${creatorName(course)} ${course.category}`.toLocaleLowerCase("en").includes(needle));
  if (sort === "title") result.sort((a, b) => a.title.localeCompare(b.title, "en"));
  if (sort === "duration") result.sort((a, b) => a.minutes - b.minutes || a.title.localeCompare(b.title, "en"));
  return result;
}

export type CatalogOptions = Readonly<{ filter: string; category: string; access: "all" | "free"; sort: CatalogSort; view: "grid" | "list" }>;
export function catalogOptions(params: Record<string, unknown>): CatalogOptions {
  return { filter: normalizeQuery(params.filter), category: topics.some(topic => topic.name === params.category) ? String(params.category) : "", access: params.access === "free" ? "free" : "all", sort: params.sort === "title" || params.sort === "duration" ? params.sort : "featured", view: params.view === "list" ? "list" : "grid" };
}
export function catalogHref(path: string, options: CatalogOptions): string {
  const base = ["/learn/courses", "/learn/library", "/learn/saved"].includes(path) ? path : "/learn/courses";
  const params = new URLSearchParams();
  if (options.filter) params.set("filter", normalizeQuery(options.filter));
  if (options.category) params.set("category", options.category);
  if (options.access !== "all") params.set("access", options.access);
  if (options.sort !== "featured") params.set("sort", options.sort);
  if (options.view !== "grid") params.set("view", options.view);
  return base + (params.size ? `?${params}` : "");
}
