import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Play } from "lucide-react";
import { creators, subjects, curriculum } from "@/features/catalog/catalog";
import { CatalogCard } from "@/features/catalog/catalog-card";
import { Disclosure } from "@/components/ui/disclosure";
export default async function CreatorPage({
  params,
}: PageProps<"/creators/[slug]">) {
  const { slug } = await params;
  const creator = creators.find((item) => item.id === slug);
  if (!creator) notFound();
  const subject = subjects.find((item) => item.id === creator.subject);
  const featured = creator.courses[0];
  return (
    <div className="creator-page">
      <section className="creator-hero">
        <Image
          src={`/covers/${creator.artwork}`}
          alt="Illustrative subject photograph, not a portrait of this fictional creator"
          fill
          sizes="(max-width: 767px) 100vw, 85vw"
          preload
        />
        <Link className="creator-back" href="/creators">
          <ArrowLeft />
          Creators
        </Link>
        <div>
          <p>FICTIONAL CREATOR · {subject?.label.toUpperCase()}</p>
          <h1>{creator.name}</h1>
          <span>Independent perspectives. Practical things to learn.</span>
        </div>
      </section>
      <div className="creator-content">
        <div className="creator-intro">
          <div>
            <h2>A little about {creator.name.split(" ")[0]}</h2>
            <p>
              A sample creator exploring {subject?.label.toLowerCase()}. This
              profile demonstrates the creator experience; it does not claim a
              real identity, credentials or endorsements.
            </p>
          </div>
          <Disclosure
            title={`About ${creator.name}`}
            description="Fictional creator profile"
            trigger="Read more"
          >
            <p>
              The profile and course descriptions are public design fixtures.
              Photography illustrates the subject rather than showing this
              person. No follower counts, testimonials, qualifications or live
              teaching services are claimed.
            </p>
          </Disclosure>
        </div>
        <div className="creator-featured">
          <section>
            <h2>Featured course</h2>
            <Link
              className="featured-course-link"
              href={`/courses/${featured.id}`}
            >
              <Image
                src={`/covers/${featured.artwork}`}
                alt=""
                width={155}
                height={155}
              />
              <span>
                <strong>{featured.title}</strong>
                <span>
                  {featured.lessons} lessons · {featured.duration}
                </span>
                <span className="text-link">Explore course</span>
              </span>
            </Link>
          </section>
          <section>
            <h2>Start with a preview</h2>
            <div className="preview-rows">
              {creator.courses.slice(0, 3).map((course) => (
                <Link
                  href={`/learn/${course.id}/lesson-1?sample=visitor`}
                  key={course.id}
                >
                  <Play size={16} />
                  <span>
                    <strong>{curriculum(course)[0].title}</strong>
                    <small>{course.title}</small>
                  </span>
                  <small>UI sample</small>
                </Link>
              ))}
            </div>
          </section>
        </div>
        <section>
          <div className="section-heading">
            <h2>Courses by {creator.name}</h2>
            <span className="muted">
              {creator.courses.length} sample courses
            </span>
          </div>
          <div className="catalog-grid">
            {creator.courses.map((course) => (
              <CatalogCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export const metadata = { title: "Creator" };
