import type { Course } from "./types";
import { additionalCourses } from "./catalog-expansion";
import { creatorName } from "./discovery";
// Original demonstration metadata. No invented ratings, revenue, or enrollment counts.
export const courses: readonly Course[] = [
  { id: "design", slug: "design-with-intention", title: "Design with intention", subtitle: "A small practice. A sharper eye.", category: "Design", creatorId: "maya", level: "Beginner", minutes: 24, priceMinor: 0, currency: "EUR", cover: "rose", coverLabel: "LESS,\nBUT BETTER.", outcome: "Turn a crowded interface into a clear, intentional experience.", prerequisites: "A notebook and a screen you would like to improve.", lessons: [
    { id: "design-observe", title: "Start by noticing", minutes: 7, preview: true }, { id: "design-hierarchy", title: "Give the important things room", minutes: 9, preview: false }, { id: "design-iterate", title: "Make one change, then test it", minutes: 8, preview: false },
  ] },
  { id: "web", slug: "build-for-the-web", title: "Build for the web", subtitle: "From a useful idea to a thoughtful interface.", category: "Development", creatorId: "noah", level: "Beginner", minutes: 26, priceMinor: 4900, currency: "EUR", cover: "blue", coverLabel: "HELLO,\nPOSSIBILITY.", outcome: "Plan a small web feature around real people, clear states, and useful feedback.", prerequisites: "Comfort using a browser. The sample requires no coding tools.", lessons: [
    { id: "web-purpose", title: "Give your page a purpose", minutes: 8, preview: true }, { id: "web-states", title: "Design the states between screens", minutes: 10, preview: false }, { id: "web-ship", title: "Ship a small, complete journey", minutes: 8, preview: false },
  ] },
  { id: "writing", slug: "make-your-ideas-clear", title: "Make your ideas clear", subtitle: "Write less. Say something that matters.", category: "Writing", creatorId: "leila", level: "Beginner", minutes: 20, priceMinor: 0, currency: "EUR", cover: "amber", coverLabel: "FIND\nYOUR WORDS.", outcome: "Rewrite a vague explanation into a clear, useful message.", prerequisites: "A paragraph you want someone to understand.", lessons: [
    { id: "writing-reader", title: "Write for one reader", minutes: 6, preview: true }, { id: "writing-edit", title: "Replace claims with specifics", minutes: 8, preview: false }, { id: "writing-read", title: "Read it as a stranger", minutes: 6, preview: false },
  ] },
  { id: "photo", slug: "frame-the-everyday", title: "Frame the everyday", subtitle: "Look again. There is more here.", category: "Photography", creatorId: "elliot", level: "Beginner", minutes: 22, priceMinor: 3500, currency: "EUR", cover: "green", coverLabel: "A NEW\nPOINT OF VIEW.", outcome: "Practice choosing a subject, simplifying a frame, and reviewing a sequence.", prerequisites: "Any camera, including a phone.", lessons: [
    { id: "photo-notice", title: "Choose what the picture is about", minutes: 7, preview: true }, { id: "photo-frame", title: "Simplify the frame", minutes: 8, preview: false }, { id: "photo-review", title: "Choose the picture that says more", minutes: 7, preview: false },
  ] },
  { id: "business", slug: "make-something-useful", title: "Make something useful", subtitle: "Start with a problem, not a pitch.", category: "Business", creatorId: "amara", level: "Beginner", minutes: 25, priceMinor: 5900, currency: "EUR", cover: "violet", coverLabel: "SMALL START.\nREAL VALUE.", outcome: "Describe a practical customer problem and design a small test of your idea.", prerequisites: "An idea you are willing to question. This is not financial advice.", lessons: [
    { id: "business-problem", title: "Name the problem precisely", minutes: 8, preview: true }, { id: "business-test", title: "Test your riskiest assumption", minutes: 9, preview: false }, { id: "business-learn", title: "Decide what to learn next", minutes: 8, preview: false },
  ] },
  ...additionalCourses,
];
export const categories = ["Design", "Development", "Writing", "Photography", "Business"] as const;
export function courseBySlug(slug: string): Course | undefined { return courses.find(course => course.slug === slug); }
export function courseById(id: string): Course | undefined { return courses.find(course => course.id === id); }
export function priceLabel(course: Course): string { return course.priceMinor === 0 ? "Free demo course" : `${new Intl.NumberFormat("en-IE", { style: "currency", currency: course.currency, maximumFractionDigits: 0 }).format(course.priceMinor / 100)} · sample price`; }
export function filterCourses(query: string, category: string): readonly Course[] {
  const needle = query.trim().toLocaleLowerCase("en").slice(0, 100);
  return courses.filter(course => (!category || course.category === category) && `${course.title} ${course.subtitle} ${course.category} ${creatorName(course)}`.toLocaleLowerCase("en").includes(needle));
}
/** Deliberate public demo policy, NOT an enrollment/entitlement implementation. */
export function canReadDemoLesson(course: Course, lessonId: string): boolean { const lesson = course.lessons.find(item => item.id === lessonId); return Boolean(lesson && (lesson.preview || course.priceMinor === 0)); }
