export type Category = "Design" | "Development" | "Writing" | "Photography" | "Business";
export type Lesson = Readonly<{ id: string; title: string; minutes: number; preview: boolean }>;
export type Course = Readonly<{
  id: string; slug: string; title: string; subtitle: string; category: Category;
  creatorId: string; level: "Beginner" | "Intermediate"; minutes: number;
  priceMinor: number; currency: "EUR"; cover: "rose" | "blue" | "amber" | "green" | "violet";
  coverLabel: string; outcome: string; prerequisites: string; lessons: readonly Lesson[];
}>;
export type LessonBody = Readonly<{ introduction: string; sections: readonly { title: string; body: string }[]; exercise: string }>;
export type PreviewPost = { id: string; courseId: string; title: string; body: string; createdAt: string };
export type PreviewReply = { id: string; postId: string; body: string; createdAt: string };
export type LessonProgress = { completed: boolean; updatedAt: string };
export type PreviewState = {
  version: 1; saved: string[]; progress: Record<string, LessonProgress>;
  notes: Record<string, string>; posts: PreviewPost[]; helpful: string[];
  // Additive v1 field: older saved previews without replies decode to an empty array.
  replies: PreviewReply[];
  // Additive preview preference. Following never grants course access.
  following: string[];
  resume: { courseId: string; lessonId: string } | null;
};
