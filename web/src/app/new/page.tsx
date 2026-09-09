import Image from "next/image";
import Link from "next/link";
import { ContentShelf } from "@/components/ui/content-shelf";
import { CatalogCard } from "@/features/catalog/catalog-card";
import { courses } from "@/features/catalog/catalog";
const featured = [
  {
    id: "business",
    label: "A SMALL BEGINNING",
    title: "Give your next idea a future.",
    image: "cafe.webp",
    text: "A first offer. A useful question. A place to start.",
  },
  {
    id: "photography",
    label: "A FRESH PERSPECTIVE",
    title: "See the everyday differently.",
    image: "mountains.webp",
    text: "Explore light, composition and creative practice.",
  },
];
export default function NewPage() {
  return (
    <>
      <header className="page-heading">
        <h1>New</h1>
        <span className="muted">Editorial sample selection</span>
      </header>
      <section
        className="new-editorials"
        aria-label="Featured course selections"
      >
        {featured.map((item) => (
          <article key={item.id}>
            <p className="eyebrow">{item.label}</p>
            <h2>{item.title}</h2>
            <Link href={`/courses/${item.id}`}>
              <Image
                src={`/covers/${item.image}`}
                alt=""
                fill
                sizes="(max-width:767px) 85vw, 550px"
                preload
              />
              <span>{item.text}</span>
            </Link>
          </article>
        ))}
      </section>
      <section className="home-section">
        <div className="section-heading">
          <h2>A small skill for today</h2>
        </div>
        <ul className="new-compact-grid">
          {courses
            .filter((course) => course.minutes < 60)
            .slice(0, 6)
            .map((course) => (
              <li key={course.id}>
                <Link href={`/courses/${course.id}`}>
                  <Image
                    src={`/covers/${course.artwork}`}
                    alt=""
                    width={44}
                    height={44}
                  />
                  <span>
                    {course.title}
                    <small>
                      {course.creator} · {course.duration}
                    </small>
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </section>
      <section className="home-section">
        <ContentShelf title="Fresh places to begin">
          {courses
            .filter((course) => course.level === "Beginner")
            .slice(0, 8)
            .map((course) => (
              <li key={course.id}>
                <CatalogCard course={course} />
              </li>
            ))}
        </ContentShelf>
      </section>
      <p className="flow-footnote">
        This is a curated fixture, not a claim of new real releases, popularity
        or enrollment activity.
      </p>
    </>
  );
}

export const metadata = { title: "New" };
