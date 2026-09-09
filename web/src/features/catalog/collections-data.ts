export type LearningList = {
  id: string;
  title: string;
  description: string;
  courseIds: string[];
};
export const sampleLists: LearningList[] = [
  {
    id: "a-little-every-day",
    title: "A little every day",
    description: "Short courses for a curious week.",
    courseIds: ["prompts", "budget", "light"],
  },
  {
    id: "my-next-chapter",
    title: "My next chapter",
    description: "Ideas worth making time for.",
    courseIds: ["business", "writing", "photography"],
  },
];
export function readLists(value: string): LearningList[] {
  if (!value) return sampleLists;
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return sampleLists;
    return parsed
      .filter((item): item is LearningList => {
        if (typeof item !== "object" || !item) return false;
        return (
          typeof item.id === "string" &&
          /^[a-z0-9-]{1,80}$/.test(item.id) &&
          typeof item.title === "string" &&
          item.title.length <= 80 &&
          typeof item.description === "string" &&
          item.description.length <= 240 &&
          Array.isArray(item.courseIds) &&
          item.courseIds.length <= 100 &&
          item.courseIds.every(
            (id: unknown) =>
              typeof id === "string" && /^[a-z0-9-]{1,50}$/.test(id),
          )
        );
      })
      .slice(0, 30);
  } catch {
    return sampleLists;
  }
}
