import { LessonLibrary } from "@/features/learning/lesson-library";
import { single } from "@/features/catalog/catalog";
export default async function LessonsPage({ searchParams }: PageProps<"/library/lessons">) { const query=await searchParams; return <LessonLibrary sort={single(query.sort)} q={single(query.q).slice(0,100)} pinnedOnly={query.pinned === "1"} />; }

export const metadata = { title: "Lessons" };
