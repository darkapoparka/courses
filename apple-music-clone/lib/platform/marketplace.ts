import { courses } from "./catalog";
import { topics } from "./discovery";
import { collectionById, collectionCourses, type CollectionId } from "./merchandising";
import type { Course } from "./types";

export type MarketplaceOptions = Readonly<{
  category: string;
  collection?: CollectionId;
  level?: Course["level"];
  duration?: 30 | 45;
  price: "all" | "free" | "under50";
  sort: "featured" | "price" | "duration";
}>;
export function marketplaceOptions(params: Record<string, unknown>): MarketplaceOptions {
  return {
    ...(typeof params.collection === "string" && collectionById(params.collection) ? { collection: params.collection as CollectionId } : {}),
    ...(params.level === "Beginner" || params.level === "Intermediate" ? { level: params.level } : {}),
    ...(params.duration === "30" || params.duration === 30 ? { duration: 30 as const } : params.duration === "45" || params.duration === 45 ? { duration: 45 as const } : {}),
    category: typeof params.category === "string" && topics.some(topic => topic.slug === params.category) ? params.category : "",
    price: params.price === "free" || params.price === "under50" ? params.price : "all",
    sort: params.sort === "price" || params.sort === "duration" ? params.sort : "featured",
  };
}
export function marketplaceHref(options: MarketplaceOptions): string {
  const query = new URLSearchParams();
  if (options.collection) query.set("collection", options.collection);
  if (options.level) query.set("level", options.level);
  if (options.duration) query.set("duration", String(options.duration));
  if (options.category) query.set("category", options.category);
  if (options.price !== "all") query.set("price", options.price);
  if (options.sort !== "featured") query.set("sort", options.sort);
  return `/learn/home${query.size ? `?${query}` : ""}`;
}
export function marketplaceCourses(options: MarketplaceOptions): readonly Course[] {
  const category = topics.find(topic => topic.slug === options.category)?.name;
  const source = options.collection ? collectionCourses(options.collection, courses) : courses;
  const found = source.filter(course => (!category || course.category === category)
    && (!options.level || course.level === options.level)
    && (!options.duration || course.minutes <= options.duration)
    && (options.price !== "free" || course.priceMinor === 0)
    && (options.price !== "under50" || course.priceMinor < 5000));
  if (options.sort === "price") found.sort((a, b) => a.priceMinor - b.priceMinor);
  if (options.sort === "duration") found.sort((a, b) => a.minutes - b.minutes);
  return found;
}
export function offerPrice(course: Course): string {
  return course.priceMinor === 0 ? "Free" : new Intl.NumberFormat("en-IE", {
    style: "currency", currency: course.currency, maximumFractionDigits: 0,
  }).format(course.priceMinor / 100);
}
/** Licensed contextual photos, not instructor portraits or a claim of course footage. */
const artwork: Record<string, string> = {
  design: "/course-art/design.webp", web: "/course-art/web.webp",
  writing: "/course-art/writing.webp", photo: "/course-art/photo.webp",
  business: "/course-art/business.webp",
};
export function courseArtwork(id: string): string | undefined {
  const category = courses.find(course => course.id === id)?.category;
  const family: Record<string, string> = { Design: "design", Development: "web", Writing: "writing", Photography: "photo", Business: "business" };
  return artwork[id] ?? (category ? artwork[family[category]] : undefined);
}
