import Image from "next/image";
import Link from "next/link";
import { courses, single } from "@/features/catalog/catalog";
const months = ["September", "August", "July"];
export default async function RecapStudy({
  searchParams,
}: PageProps<"/preview/recap">) {
  const query = await searchParams;
  const month = months.includes(single(query.month))
    ? single(query.month)
    : months[0];
  const index = months.indexOf(month);
  return (
    <div className="recap-study">
      <header className="recap-hero">
        <p>COURSES / FICTIONAL RECAP</p>
        <h1>Your month of learning</h1>
        <span>Illustrative activity, not measured account history.</span>
      </header>
      <nav className="content-tabs" aria-label="Recap month">
        {months.map((item) => (
          <Link
            key={item}
            href={`/preview/recap?month=${item}`}
            aria-current={month === item ? "page" : undefined}
          >
            {item}
          </Link>
        ))}
      </nav>
      <section className="recap-summary">
        <p>{month} · sample month</p>
        <h2>Time for a little discovery.</h2>
        <div>
          <span>
            <strong>{[180, 120, 90][index]}</strong>Example minutes
          </span>
          <span>
            <strong>{[4, 3, 2][index]}</strong>Sample courses
          </span>
          <span>
            <strong>{[3, 2, 2][index]}</strong>Sample subjects
          </span>
        </div>
      </section>
      <section className="home-section">
        <h2>Courses in this sample recap</h2>
        <div className="recap-course-grid">
          {courses.slice(index * 2, index * 2 + 5).map((course, i) => (
            <Link href={`/courses/${course.id}`} key={course.id}>
              <div>
                <Image
                  src={`/covers/${course.artwork}`}
                  alt=""
                  fill
                  sizes="(max-width:767px) 43vw, 200px"
                />
              </div>
              <strong>{i + 1}</strong>
              <span>{course.title}</span>
              <small>{course.creator}</small>
            </Link>
          ))}
        </div>
      </section>
      <section className="home-section">
        <h2>Milestone layout examples</h2>
        <div className="milestone-grid">
          {[
            ["first-step", "1", "First sample lesson"],
            ["curiosity", "3", "Subjects explored"],
            ["practice", "5", "Practice sessions"],
            ["reflection", "10", "Reflection notes"],
          ].map(([id, number, label]) => (
            <Link href={`/preview/recap/${id}`} key={id}>
              <span className={`milestone-medallion milestone-${id}`}>
                {number}
              </span>
              <strong>{label}</strong>
              <small>Illustrative, not earned</small>
            </Link>
          ))}
        </div>
      </section>
      <Link className="text-link" href="/preview">
        Back to reference studies
      </Link>
    </div>
  );
}
export const metadata = { title: "Recap layout study" };
