import type { Course } from "./types";

export const collections = [
  { id: "bestsellers", title: "Bestsellers", description: "Demo merchandising selection — not ranked by real sales.", label: "Demo selection", ids: ["typescript", "systems", "photo", "story", "offer", "web"] },
  { id: "top", title: "Top courses", description: "Editor's picks for your next practical project.", label: "Editor's picks", ids: ["design", "accessible", "light", "microcopy", "interviews", "editing"] },
  { id: "free", title: "Start something for free", description: "Complete demo courses. Every lesson is open.", label: "Free courses", ids: [] },
  { id: "development", title: "Build your next idea", description: "Web development, thoughtful interfaces and stronger foundations.", label: "Development", ids: ["web", "typescript", "accessible"] },
] as const;
export type CollectionId = (typeof collections)[number]["id"];
export const collectionById = (id: string | undefined) => collections.find(collection => collection.id === id);

/** Explicit editorial/demo ordering. Replace the bestseller fixture with verified sales data before release. */
export function collectionCourses(id: CollectionId, catalog: readonly Course[]): Course[] {
  const collection = collectionById(id);
  if (!collection) return [];
  if (id === "free") return catalog.filter(course => course.priceMinor === 0);
  return collection.ids.flatMap(courseId => catalog.find(course => course.id === courseId) ?? []);
}

export const featuredIds = ["design", "photo", "web", "writing", "business"] as const;
