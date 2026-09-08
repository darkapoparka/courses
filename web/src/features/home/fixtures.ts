// Public, fictional fixtures for UI review. Not catalog or access records.
export type SampleView = "visitor" | "learner";
export type HomeState = "ready" | "empty" | "error" | "loading";
export type SampleCourse = {
  id: string;
  title: string;
  creator: string;
  subject: string;
  duration: string;
  level: string;
  price: string;
  artwork: string;
};

export const courses: readonly SampleCourse[] = [
  {
    id: "useful-ai",
    title: "Everyday AI, thoughtfully applied",
    creator: "Maya Chen",
    subject: "AI & coding",
    duration: "2h 40m",
    level: "Beginner",
    price: "$49",
    artwork: "ai.svg",
  },
  {
    id: "strength",
    title: "The foundations of strength",
    creator: "Alex Rowan",
    subject: "Fitness",
    duration: "3h 15m",
    level: "Beginner",
    price: "$59",
    artwork: "strength.jpg",
  },
  {
    id: "business",
    title: "From an idea to a small business",
    creator: "Nora Ellis",
    subject: "Business",
    duration: "4h 10m",
    level: "Beginner",
    price: "$69",
    artwork: "business.svg",
  },
  {
    id: "money",
    title: "A calmer approach to personal finance",
    creator: "Sam Rivera",
    subject: "Finance education",
    duration: "2h 20m",
    level: "Beginner",
    price: "$39",
    artwork: "money.svg",
  },
  {
    id: "website",
    title: "Your first website, from the ground up",
    creator: "Jamie Park",
    subject: "AI & coding",
    duration: "5h 30m",
    level: "Beginner",
    price: "$79",
    artwork: "code.svg",
  },
  {
    id: "writing",
    title: "Write so people understand",
    creator: "Robin Lee",
    subject: "Communication",
    duration: "1h 45m",
    level: "All levels",
    price: "$29",
    artwork: "writing.svg",
  },
  {
    id: "movement",
    title: "Make movement an everyday habit",
    creator: "Avery Brooks",
    subject: "Fitness",
    duration: "1h 20m",
    level: "Beginner",
    price: "$35",
    artwork: "movement.svg",
  },
  {
    id: "perspective",
    title: "See your world differently",
    creator: "Casey Lane",
    subject: "Photography",
    duration: "2h 05m",
    level: "Beginner",
    price: "$45",
    artwork: "perspective.jpg",
  },
];

export const shortCourses = [
  {
    title: "A better brief, a better AI answer",
    creator: "Maya Chen",
    subject: "AI & coding",
    duration: "35 min",
    artwork: "ai.svg",
  },
  {
    title: "Find the story in your idea",
    creator: "Nora Ellis",
    subject: "Business",
    duration: "45 min",
    artwork: "business.svg",
  },
  {
    title: "Build your first simple budget",
    creator: "Sam Rivera",
    subject: "Finance education",
    duration: "50 min",
    artwork: "money.svg",
  },
] as const;

export const learningSamples = [
  {
    title: "Everyday AI, thoughtfully applied",
    nextLesson: "Give your prompts a little context",
    creator: "Maya Chen",
    lesson: "Lesson 4 of 12",
    progress: 25,
    remaining: "8 min left in lesson",
    artwork: "ai.svg",
  },
  {
    title: "The foundations of strength",
    nextLesson: "Start with a steady foundation",
    creator: "Alex Rowan",
    lesson: "Lesson 2 of 15",
    progress: 7,
    remaining: "12 min left in lesson",
    artwork: "strength.jpg",
  },
] as const;

export function parseHomePreview(
  query: Record<string, string | string[] | undefined>,
): { sample: SampleView; state: HomeState } {
  return {
    sample: query.sample === "learner" ? "learner" : "visitor",
    state:
      query.state === "empty" ||
      query.state === "error" ||
      query.state === "loading"
        ? query.state
        : "ready",
  };
}
