import { notFound } from "next/navigation";
import { findCourse, curriculum, single } from "@/features/catalog/catalog";
import { LessonWorkspace } from "@/features/learning/lesson-workspace";
export default async function LessonPage({
  params,
  searchParams,
}: PageProps<"/learn/[courseId]/[lessonId]">) {
  const { courseId, lessonId } = await params;
  const course = findCourse(courseId);
  if (!course) notFound();
  const lessons = curriculum(course);
  const lesson = lessons.find((item) => item.id === lessonId);
  if (!lesson) notFound();
  const query = await searchParams;
  return (
    <LessonWorkspace
      key={`${courseId}/${lessonId}/${query.sample}/${query.state}`}
      course={course}
      lesson={lesson}
      lessons={lessons}
      sample={single(query.sample)}
      state={single(query.state)}
    />
  );
}

export const metadata = { title: "Lesson workspace" };
