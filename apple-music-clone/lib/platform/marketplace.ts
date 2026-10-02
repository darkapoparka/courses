import { courses } from "./catalog";
import { topics } from "./discovery";
import type { Course } from "./types";

export type MarketplaceOptions = Readonly<{
  category: string;
  price: "all" | "free" | "under50";
  sort: "featured" | "price" | "duration";
}>;
export function marketplaceOptions(params: Record<string, unknown>): MarketplaceOptions {
  return {
    category: typeof params.category === "string" && topics.some(topic => topic.slug === params.category) ? params.category : "",
    price: params.price === "free" || params.price === "under50" ? params.price : "all",
    sort: params.sort === "price" || params.sort === "duration" ? params.sort : "featured",
  };
}
export function marketplaceHref(options: MarketplaceOptions): string {
  const query = new URLSearchParams();
  if (options.category) query.set("category", options.category);
  if (options.price !== "all") query.set("price", options.price);
  if (options.sort !== "featured") query.set("sort", options.sort);
  return `/learn/home${query.size ? `?${query}` : ""}`;
}
export function marketplaceCourses(options: MarketplaceOptions): readonly Course[] {
  const category = topics.find(topic => topic.slug === options.category)?.name;
  const found = courses.filter(course => (!category || course.category === category)
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
export function courseArtwork(id: string): string | undefined { return artwork[id]; }
