import type { PreviewPost } from "./types";
/** Original prompts, explicitly labelled as demonstrations rather than member activity. */
export const discussionPrompts: readonly PreviewPost[] = [
  {
    id: "seed-design", courseId: "design",
    title: "What did you notice when you looked again?",
    body: "Choose one everyday interface. Share its main job, the first thing you noticed, and one change you would like to test. An observation is more useful than a perfect-looking redesign.",
    createdAt: "2026-10-02T00:00:00Z",
  },
  {
    id: "seed-writing", courseId: "writing", title: "One paragraph, a clearer idea",
    body: "Bring a sentence that is trying to do too much. Describe the reader and the question you are answering, then share a more specific version. Do not include private or identifying information.",
    createdAt: "2026-10-02T00:00:00Z",
  },
];
