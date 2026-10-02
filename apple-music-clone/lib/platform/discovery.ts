import type { Category, Course } from "./types";

export type Creator = Readonly<{
  id: string;
  slug: string;
  name: string;
  initials: string;
  category: Category;
  color: Course["cover"];
  headline: string;
  about: string;
}>;

// Fictional demo identities, not real instructor credentials or endorsements.
export const creators: readonly Creator[] = [
  { id: "maya", slug: "maya-chen", name: "Maya Chen", initials: "MC", category: "Design", color: "rose", headline: "Make the important things feel obvious.", about: "This demo profile explores observation, visual hierarchy, and small experiments. Its sample course starts with an everyday interface and turns it into a deliberate design practice." },
  { id: "noah", slug: "noah-reed", name: "Noah Reed", initials: "NR", category: "Development", color: "blue", headline: "Build around a person, not a framework.", about: "This demo profile connects practical web ideas to complete user journeys. Start with a useful purpose, consider the difficult states, and build one thoughtful feature at a time." },
  { id: "leila", slug: "leila-morgan", name: "Leila Morgan", initials: "LM", category: "Writing", color: "amber", headline: "A clearer sentence. A stronger idea.", about: "This demo profile is a place to practice writing for a reader. Its sample lessons explore specific language, purposeful editing, and testing whether an explanation makes sense." },
  { id: "elliot", slug: "elliot-park", name: "Elliot Park", initials: "EP", category: "Photography", color: "green", headline: "Look again at what is already here.", about: "This demo profile explores subjects, framing, and everyday observation. The exercises work with an ordinary camera and make room for a new point of view." },
  { id: "amara", slug: "amara-cole", name: "Amara Cole", initials: "AC", category: "Business", color: "violet", headline: "Small beginnings. Useful questions.", about: "This demo profile explores practical problems and small tests. It emphasizes naming assumptions and learning from observations, rather than making promises about business results." },
];

export const topics: readonly { slug: string; name: Category; color: Course["cover"]; description: string }[] = [
  { slug: "design", name: "Design", color: "rose", description: "See the details. Shape a clearer experience." },
  { slug: "development", name: "Development", color: "blue", description: "Build useful things for the people who use them." },
  { slug: "writing", name: "Writing", color: "amber", description: "Find the words that bring an idea into focus." },
  { slug: "photography", name: "Photography", color: "green", description: "Make a little more of the everyday." },
  { slug: "business", name: "Business", color: "violet", description: "Start with a problem worth understanding." },
];

export const creatorById = (id: string) => creators.find(creator => creator.id === id);
export const creatorBySlug = (slug: string) => creators.find(creator => creator.slug === slug);
export const topicBySlug = (slug: string) => topics.find(topic => topic.slug === slug);
export const creatorName = (course: Course) => creatorById(course.creatorId)?.name ?? "Demo creator";
