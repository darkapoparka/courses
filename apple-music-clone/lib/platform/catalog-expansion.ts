import type { Course } from "./types";

/** Original, explicitly fictional reading courses. No commercial performance claims. */
export const additionalCourses: readonly Course[] = [
  {
    id: "systems", slug: "build-a-design-system", title: "Build a design system", subtitle: "Reusable decisions, not a folder of buttons.",
    category: "Design", creatorId: "maya", level: "Intermediate", minutes: 42, priceMinor: 6900, currency: "EUR", cover: "rose", coverLabel: "SYSTEMS\nTHAT SCALE.",
    outcome: "Turn repeated interface decisions into a small, documented component system.", prerequisites: "A few screens from the same product and basic interface design experience.",
    lessons: [{ id: "systems-inventory", title: "Find the decisions you repeat", minutes: 12, preview: true }, { id: "systems-tokens", title: "Name the decisions, not the colors", minutes: 14, preview: false }, { id: "systems-components", title: "Document a component in context", minutes: 16, preview: false }],
  },
  {
    id: "color", slug: "color-that-communicates", title: "Color that communicates", subtitle: "Build a palette with a purpose.",
    category: "Design", creatorId: "maya", level: "Beginner", minutes: 28, priceMinor: 0, currency: "EUR", cover: "rose", coverLabel: "COLOR\nWITH PURPOSE.",
    outcome: "Create a restrained interface palette with clear roles and non-color cues.", prerequisites: "A screen or sketch to work with. No specialist software needed.",
    lessons: [{ id: "color-roles", title: "Give every color a job", minutes: 8, preview: true }, { id: "color-cues", title: "Make meaning visible without color", minutes: 10, preview: false }, { id: "color-review", title: "Review the palette in real states", minutes: 10, preview: false }],
  },
  {
    id: "typescript", slug: "typescript-made-practical", title: "TypeScript, made practical", subtitle: "Describe the data. Make the edges explicit.",
    category: "Development", creatorId: "noah", level: "Intermediate", minutes: 45, priceMinor: 7900, currency: "EUR", cover: "blue", coverLabel: "TYPES\nWITH PURPOSE.",
    outcome: "Model the states and untrusted input of a small feature before writing its implementation.", prerequisites: "Comfort reading JavaScript objects, functions and arrays.",
    lessons: [{ id: "typescript-model", title: "Describe one valid state at a time", minutes: 12, preview: true }, { id: "typescript-input", title: "Validate the boundary", minutes: 15, preview: false }, { id: "typescript-errors", title: "Make failures part of the model", minutes: 18, preview: false }],
  },
  {
    id: "accessible", slug: "build-an-accessible-web", title: "Build an accessible web", subtitle: "A usable path through every interaction.",
    category: "Development", creatorId: "noah", level: "Intermediate", minutes: 32, priceMinor: 4900, currency: "EUR", cover: "blue", coverLabel: "OPEN\nTO EVERYONE.",
    outcome: "Review a small interface through its labels, keyboard path and recovery states.", prerequisites: "A browser and a basic understanding of HTML. This sample is a design review, not certification.",
    lessons: [{ id: "accessible-keyboard", title: "Take the keyboard-only route", minutes: 10, preview: true }, { id: "accessible-names", title: "Name controls by their purpose", minutes: 10, preview: false }, { id: "accessible-recovery", title: "Make feedback and recovery usable", minutes: 12, preview: false }],
  },
  {
    id: "story", slug: "tell-a-stronger-story", title: "Tell a stronger story", subtitle: "Give an idea a beginning, a turn and a point.",
    category: "Writing", creatorId: "leila", level: "Beginner", minutes: 30, priceMinor: 3900, currency: "EUR", cover: "amber", coverLabel: "MAKE\nIT MATTER.",
    outcome: "Shape a short account around a specific moment, a change and a useful takeaway.", prerequisites: "A true experience you are comfortable writing about.",
    lessons: [{ id: "story-moment", title: "Start with a moment, not a summary", minutes: 8, preview: true }, { id: "story-turn", title: "Find what changed", minutes: 10, preview: false }, { id: "story-ending", title: "End where the meaning lands", minutes: 12, preview: false }],
  },
  {
    id: "microcopy", slug: "words-that-guide", title: "Words that guide", subtitle: "Useful language for products people use.",
    category: "Writing", creatorId: "leila", level: "Intermediate", minutes: 24, priceMinor: 2900, currency: "EUR", cover: "amber", coverLabel: "THE RIGHT\nNEXT WORD.",
    outcome: "Write clear actions, instructions and recovery messages for one product journey.", prerequisites: "An interface flow or a sketch with a few controls.",
    lessons: [{ id: "microcopy-actions", title: "Say what the action does", minutes: 7, preview: true }, { id: "microcopy-errors", title: "Explain what went wrong", minutes: 8, preview: false }, { id: "microcopy-consistency", title: "Keep a consistent vocabulary", minutes: 9, preview: false }],
  },
  {
    id: "light", slug: "find-the-light", title: "Find the light", subtitle: "See how light changes an ordinary subject.",
    category: "Photography", creatorId: "elliot", level: "Beginner", minutes: 27, priceMinor: 4500, currency: "EUR", cover: "green", coverLabel: "FOLLOW\nTHE LIGHT.",
    outcome: "Compare light direction and softness using a window, one subject and any camera.", prerequisites: "A phone or camera, a small object and a safe indoor place near a window.",
    lessons: [{ id: "light-window", title: "Work with one window", minutes: 8, preview: true }, { id: "light-direction", title: "Move the subject, not every setting", minutes: 9, preview: false }, { id: "light-sequence", title: "Choose a consistent sequence", minutes: 10, preview: false }],
  },
  {
    id: "editing", slug: "edit-with-intention", title: "Edit with intention", subtitle: "Choose what a photograph needs, and stop there.",
    category: "Photography", creatorId: "elliot", level: "Intermediate", minutes: 36, priceMinor: 5900, currency: "EUR", cover: "green", coverLabel: "LOOK.\nREFINE.\nREPEAT.",
    outcome: "Build a repeatable edit review around subject, tone and consistency.", prerequisites: "Three photographs and a basic photo editor. The sample needs only the images.",
    lessons: [{ id: "editing-intent", title: "Write the intention before editing", minutes: 10, preview: true }, { id: "editing-tones", title: "Choose a tonal direction", minutes: 12, preview: false }, { id: "editing-review", title: "Compare a sequence, not a preset", minutes: 14, preview: false }],
  },
  {
    id: "interviews", slug: "ask-better-questions", title: "Ask better questions", subtitle: "Listen for the problem behind the request.",
    category: "Business", creatorId: "amara", level: "Beginner", minutes: 24, priceMinor: 0, currency: "EUR", cover: "violet", coverLabel: "ASK.\nLISTEN.\nLEARN.",
    outcome: "Prepare a short, non-leading conversation and separate observations from assumptions.", prerequisites: "A question about how someone currently works. Ask permission before taking notes.",
    lessons: [{ id: "interviews-past", title: "Ask about the last real example", minutes: 7, preview: true }, { id: "interviews-followup", title: "Follow the details", minutes: 8, preview: false }, { id: "interviews-synthesis", title: "Separate what you heard from what you think", minutes: 9, preview: false }],
  },
  {
    id: "offer", slug: "from-idea-to-first-offer", title: "From idea to first offer", subtitle: "Make the value specific before building more.",
    category: "Business", creatorId: "amara", level: "Intermediate", minutes: 48, priceMinor: 8900, currency: "EUR", cover: "violet", coverLabel: "MAKE\nVALUE CLEAR.",
    outcome: "Draft an offer with a clear audience, scope and honest limitations, then plan a small feedback test.", prerequisites: "An idea and a description of the problem it addresses. No income outcome is promised.",
    lessons: [{ id: "offer-scope", title: "Describe the smallest useful offer", minutes: 12, preview: true }, { id: "offer-evidence", title: "Connect the promise to evidence", minutes: 16, preview: false }, { id: "offer-feedback", title: "Test understanding before demand", minutes: 20, preview: false }],
  },
];
