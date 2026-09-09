import { courses, subjects, type SampleCourse } from "@/features/home/fixtures";
export { courses, subjects };
export type { SampleCourse };
export function findCourse(id: string) {
  return courses.find((course) => course.id === id);
}
export function creatorSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
export const creators = Array.from(
  new Set(courses.map((course) => course.creator)),
).map((name) => {
  const teaching = courses.filter((course) => course.creator === name);
  return {
    id: creatorSlug(name),
    name,
    courses: teaching,
    subject: teaching[0].subject,
    artwork: teaching[0].artwork,
    initials: name
      .split(" ")
      .map((part) => part[0])
      .join(""),
  };
});
export const ownedIds = ["useful-ai", "strength", "photography", "prompts"];
export type SampleLesson = {
  id: string;
  title: string;
  minutes: number;
  module: string;
  preview: boolean;
};
const syllabus: Record<string, string[]> = {
  "ai-coding": [
    "A clear starting point",
    "Meet the tools",
    "From an idea to a useful brief",
    "Give your prompts a little context",
    "Choose a good example",
    "Build a first draft",
    "Check the output",
    "Make a small improvement",
    "Work with a simple file",
    "Test another approach",
    "Put it all together",
    "Your next small project",
  ],
  fitness: [
    "Start with a steady foundation",
    "Find a comfortable starting point",
    "Prepare for your practice",
    "Notice the movement",
    "Choose your own pace",
    "Adapt the exercise",
    "Build a manageable routine",
    "Make room for recovery",
    "Reflect on your practice",
    "Plan the next week",
  ],
  business: [
    "Start with a question",
    "Define the idea",
    "Who are you making it for?",
    "Listen before you build",
    "Separate evidence from assumptions",
    "Make a first offer",
    "Plan a small experiment",
    "Review what you learned",
    "Communicate your idea",
    "Choose a useful next step",
  ],
  finance: [
    "A clearer starting point",
    "Work with a fictional example",
    "Understand the terms",
    "Group income and expenses",
    "Compare two scenarios",
    "Notice uncertainty",
    "Ask better questions",
    "Check a financial claim",
    "Reflect and review",
  ],
  creative: [
    "Make space to notice",
    "Look at what is already there",
    "Choose one simple idea",
    "Explore your materials",
    "Pay attention to the details",
    "Try a different perspective",
    "Make a first study",
    "Review your work",
    "Refine one thing",
    "Build a small collection",
  ],
};
export function curriculum(course: SampleCourse): SampleLesson[] {
  const titles = syllabus[course.subject];
  const base = Math.floor(course.minutes / course.lessons);
  return Array.from({ length: course.lessons }, (_, index) => ({
    id: `lesson-${index + 1}`,
    title: titles[index] ?? `Guided practice ${index - titles.length + 1}`,
    minutes: base + (index < course.minutes % course.lessons ? 1 : 0),
    module:
      index < 3
        ? "01 · Get started"
        : index < course.lessons - 2
          ? "02 · Put it into practice"
          : "03 · Bring it together",
    preview: index === 0,
  }));
}
export const single = (value: string | string[] | undefined) =>
  typeof value === "string" ? value : "";
export function safeReturn(value: string | string[] | undefined) {
  const path = single(value);
  return /^\/(?:courses\/[a-z0-9-]+|library|settings)(?:\?[a-z0-9=&-]*)?$/.test(
    path,
  )
    ? path
    : "/library";
}
