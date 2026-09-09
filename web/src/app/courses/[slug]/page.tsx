import { notFound } from "next/navigation";
import { CourseDetail } from "@/features/catalog/course-detail";
import { findCourse, single } from "@/features/catalog/catalog";
export default async function CoursePage({
  params,
  searchParams,
}: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = findCourse(slug);
  if (!course) notFound();
  const query = await searchParams;
  return (
    <CourseDetail
      course={course}
      sample={single(query.sample)}
      state={single(query.state)}
    />
  );
}

export async function generateMetadata({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  return { title: findCourse(slug)?.title ?? "Course unavailable" };
}
