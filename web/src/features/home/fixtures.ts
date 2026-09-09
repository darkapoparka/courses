// Public, fictional catalog for the Home preview. Never an integration fallback.
export type SampleView = "visitor" | "learner";
export type HomeState = "ready" | "empty" | "error" | "loading";
export type SubjectId =
  "ai-coding" | "fitness" | "business" | "finance" | "creative";
export type SampleCourse = {
  id: string;
  title: string;
  creator: string;
  subject: SubjectId;
  duration: string;
  minutes: number;
  lessons: number;
  level: string;
  price: number;
  artwork: string;
  coverTitle?: string;
  description: string;
  outcomes: readonly [string, string];
};
export const subjects = [
  {
    id: "ai-coding",
    label: "AI & coding",
    heading: "Build with AI & code",
    artwork: "code.webp",
  },
  {
    id: "fitness",
    label: "Fitness",
    heading: "Make time for movement",
    artwork: "motion.webp",
  },
  {
    id: "business",
    label: "Business",
    heading: "Give your ideas a future",
    artwork: "cafe.webp",
  },
  {
    id: "finance",
    label: "Finance education",
    heading: "Money, without the noise",
    artwork: "finance.webp",
  },
  {
    id: "creative",
    label: "Creative skills",
    heading: "See what you can make",
    artwork: "camera.webp",
  },
] as const;
export const courses: readonly SampleCourse[] = [
  {
    id: "useful-ai",
    title: "Everyday AI, thoughtfully applied",
    creator: "Maya Chen",
    subject: "ai-coding",
    duration: "2h 40m",
    minutes: 160,
    lessons: 12,
    level: "Beginner",
    price: 49,
    artwork: "code.webp",
    coverTitle: "Everyday\nAI",
    description:
      "Use AI for the work you already do. Turn a rough idea into a useful brief, a clear draft, and a repeatable workflow.",
    outcomes: [
      "Write prompts with a clear purpose and context.",
      "Check an answer before putting it to work.",
    ],
  },
  {
    id: "website",
    title: "Your first website, from scratch",
    creator: "Jamie Park",
    subject: "ai-coding",
    duration: "5h 30m",
    minutes: 330,
    lessons: 24,
    level: "Beginner",
    price: 79,
    artwork: "laptop.webp",
    coverTitle: "Build\nfor the web",
    description:
      "Make a small, responsive website while learning the HTML, CSS, and JavaScript behind it.",
    outcomes: [
      "Build an accessible page that works on a phone.",
      "Understand how structure, styles, and interactions fit together.",
    ],
  },
  {
    id: "prompts",
    title: "A better brief, a better AI answer",
    creator: "Maya Chen",
    subject: "ai-coding",
    duration: "35 min",
    minutes: 35,
    lessons: 5,
    level: "Beginner",
    price: 0,
    artwork: "workspace.webp",
    description:
      "A short introduction to giving AI the context it needs. Practice with a fictional project, not private work data.",
    outcomes: [
      "Turn an open-ended request into a specific brief.",
      "Compare and revise two different prompts.",
    ],
  },
  {
    id: "python",
    title: "Small automations with Python",
    creator: "Eli Carter",
    subject: "ai-coding",
    duration: "3h 20m",
    minutes: 200,
    lessons: 16,
    level: "Intermediate",
    price: 59,
    artwork: "abstract.webp",
    coverTitle: "Less busywork.\nMore Python.",
    description:
      "Write small scripts to organize files and work with public practice data. Build understanding one useful task at a time.",
    outcomes: [
      "Read, transform, and write a simple data file.",
      "Handle errors without losing the original data.",
    ],
  },
  {
    id: "strength",
    title: "The foundations of strength",
    creator: "Alex Rowan",
    subject: "fitness",
    duration: "3h 15m",
    minutes: 195,
    lessons: 15,
    level: "Beginner",
    price: 59,
    artwork: "strength.webp",
    coverTitle: "Move\nwell.",
    description:
      "Explore the basic movement patterns behind a considered strength routine, with an emphasis on form and gradual practice.",
    outcomes: [
      "Recognize the main movement patterns in a routine.",
      "Plan a manageable practice week around your starting point.",
    ],
  },
  {
    id: "running",
    title: "Find your running rhythm",
    creator: "Avery Brooks",
    subject: "fitness",
    duration: "2h 10m",
    minutes: 130,
    lessons: 10,
    level: "Beginner",
    price: 39,
    artwork: "run.webp",
    coverTitle: "Your\nown pace",
    description:
      "Start with the essentials of an easy running routine: pacing, preparation, and a plan you can adapt.",
    outcomes: [
      "Understand easy pacing and gradual progression.",
      "Build a weekly routine that leaves room for recovery.",
    ],
  },
  {
    id: "mobility",
    title: "A little more room to move",
    creator: "Riley Moss",
    subject: "fitness",
    duration: "45 min",
    minutes: 45,
    lessons: 6,
    level: "Beginner",
    price: 0,
    artwork: "motion.webp",
    description:
      "Explore a short collection of gentle movement ideas and learn how to adapt your practice to your comfort.",
    outcomes: [
      "Try a short, low-pressure movement sequence.",
      "Notice when to adapt or stop a movement.",
    ],
  },
  {
    id: "routine",
    title: "Make movement a habit",
    creator: "Avery Brooks",
    subject: "fitness",
    duration: "1h 20m",
    minutes: 80,
    lessons: 8,
    level: "All levels",
    price: 29,
    artwork: "run.webp",
    description:
      "Make space for regular movement without making it your whole life. A practical guide to planning and reflection.",
    outcomes: [
      "Choose a realistic place for movement in your week.",
      "Keep a simple practice log and adjust your plan.",
    ],
  },
  {
    id: "business",
    title: "From an idea to a small business",
    creator: "Nora Ellis",
    subject: "business",
    duration: "4h 10m",
    minutes: 250,
    lessons: 20,
    level: "Beginner",
    price: 69,
    artwork: "workspace.webp",
    coverTitle: "Start\nsomething.",
    description:
      "Explore an idea, understand the people it could serve, and put together a small, testable first offer.",
    outcomes: [
      "Write a clear description of your idea and its audience.",
      "Plan a small experiment before committing more resources.",
    ],
  },
  {
    id: "story",
    title: "Find the story in your idea",
    creator: "Nora Ellis",
    subject: "business",
    duration: "40 min",
    minutes: 40,
    lessons: 5,
    level: "Beginner",
    price: 15,
    artwork: "notebook.webp",
    description:
      "Practice explaining what you are making and why it matters, without a complicated pitch deck.",
    outcomes: [
      "Describe the problem your idea addresses.",
      "Write a short introduction in plain language.",
    ],
  },
  {
    id: "freelance",
    title: "A thoughtful start to freelancing",
    creator: "Theo Reed",
    subject: "business",
    duration: "2h 50m",
    minutes: 170,
    lessons: 14,
    level: "Beginner",
    price: 49,
    artwork: "workspace.webp",
    coverTitle: "Work\nyour way",
    description:
      "Define a service, plan a small portfolio, and learn the basics of a clear project conversation. No income promises.",
    outcomes: [
      "Shape a focused service and a practice portfolio.",
      "Describe a project scope and communicate expectations.",
    ],
  },
  {
    id: "research",
    title: "Ask better customer questions",
    creator: "Nora Ellis",
    subject: "business",
    duration: "55 min",
    minutes: 55,
    lessons: 7,
    level: "All levels",
    price: 19,
    artwork: "cafe.webp",
    description:
      "Learn to ask open questions, listen carefully, and separate observations from assumptions.",
    outcomes: [
      "Draft a short, non-leading interview guide.",
      "Organize what you heard into useful themes.",
    ],
  },
  {
    id: "money",
    title: "Personal finance, made clearer",
    creator: "Sam Rivera",
    subject: "finance",
    duration: "2h 20m",
    minutes: 140,
    lessons: 11,
    level: "Beginner",
    price: 39,
    artwork: "finance.webp",
    coverTitle: "Money,\nsimply.",
    description:
      "Understand everyday money concepts through fictional examples. Education only, not personalized financial advice.",
    outcomes: [
      "Read a simple budget and identify recurring costs.",
      "Understand the purpose of saving and the basics of financial risk.",
    ],
  },
  {
    id: "budget",
    title: "Build your first simple budget",
    creator: "Sam Rivera",
    subject: "finance",
    duration: "50 min",
    minutes: 50,
    lessons: 6,
    level: "Beginner",
    price: 0,
    artwork: "notebook.webp",
    description:
      "Use a fictional household to practice building a budget you can understand and revise.",
    outcomes: [
      "Group income and expenses in a simple worksheet.",
      "Compare a plan with what actually happened.",
    ],
  },
  {
    id: "risk",
    title: "Understand risk before returns",
    creator: "Jordan Vale",
    subject: "finance",
    duration: "1h 45m",
    minutes: 105,
    lessons: 9,
    level: "Beginner",
    price: 29,
    artwork: "mountains.webp",
    coverTitle: "The long\nview",
    description:
      "Learn the language of risk, diversification, and uncertainty. No investment recommendations or guaranteed outcomes.",
    outcomes: [
      "Distinguish risk, return, and uncertainty.",
      "Recognize common warning signs in financial claims.",
    ],
  },
  {
    id: "interest",
    title: "How interest actually works",
    creator: "Jordan Vale",
    subject: "finance",
    duration: "40 min",
    minutes: 40,
    lessons: 5,
    level: "Beginner",
    price: 15,
    artwork: "finance.webp",
    description:
      "Work through simple and compound interest with clear, fictional examples of saving and borrowing.",
    outcomes: [
      "Explain interest without relying on jargon.",
      "Compare how time and rates affect an example balance.",
    ],
  },
  {
    id: "photography",
    title: "Photography: a different way to see",
    creator: "Casey Lane",
    subject: "creative",
    duration: "2h 05m",
    minutes: 125,
    lessons: 12,
    level: "Beginner",
    price: 45,
    artwork: "mountains.webp",
    coverTitle: "Look\ncloser.",
    description:
      "Learn to notice light, arrange a frame, and make deliberate photographs with the camera you already have.",
    outcomes: [
      "Use light and framing to guide attention.",
      "Make a small photo series around one idea.",
    ],
  },
  {
    id: "pottery",
    title: "Clay, from the ground up",
    creator: "Rowan Hale",
    subject: "creative",
    duration: "3h 10m",
    minutes: 190,
    lessons: 14,
    level: "Beginner",
    price: 55,
    artwork: "pottery.webp",
    coverTitle: "Made\nby hand",
    description:
      "An introduction to clay, basic forms, and the patient process of making something by hand.",
    outcomes: [
      "Recognize the stages of working with clay.",
      "Plan and shape a simple practice form.",
    ],
  },
  {
    id: "writing",
    title: "Write so people understand",
    creator: "Robin Lee",
    subject: "creative",
    duration: "1h 45m",
    minutes: 105,
    lessons: 9,
    level: "All levels",
    price: 29,
    artwork: "notebook.webp",
    coverTitle: "Find\nyour words",
    description:
      "Make your everyday writing clearer. Practice structure, editing, and the small decisions that help a reader.",
    outcomes: [
      "Organize a message around one clear point.",
      "Edit a draft for clarity and rhythm.",
    ],
  },
  {
    id: "light",
    title: "A better eye for natural light",
    creator: "Casey Lane",
    subject: "creative",
    duration: "45 min",
    minutes: 45,
    lessons: 6,
    level: "Beginner",
    price: 15,
    artwork: "mountains.webp",
    description:
      "Use a short photo walk to explore direction, contrast, and the changing character of daylight.",
    outcomes: [
      "Notice how the direction of light changes a scene.",
      "Practice a simple before-and-after photo exercise.",
    ],
  },
];
export const starterIds = [
  "useful-ai",
  "strength",
  "business",
  "photography",
  "money",
  "pottery",
  "website",
  "writing",
];
export const shortCourses = courses
  .filter((course) => course.minutes <= 55)
  .slice(0, 6);
export const learningSamples = [
  {
    courseId: "useful-ai",
    lesson: "Lesson 4 of 12",
    nextLesson: "Give your prompts a little context",
    progress: 25,
    remaining: "8 min left",
  },
  {
    courseId: "strength",
    lesson: "Lesson 2 of 15",
    nextLesson: "Start with a steady foundation",
    progress: 7,
    remaining: "12 min left",
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
