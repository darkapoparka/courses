import Image from "next/image";
import { SearchForm, RecentSearches } from "./search-history";
import Link from "next/link";
import { ArrowLeft, Search, X } from "lucide-react";
import { CatalogCard } from "./catalog-card";
import { EmptyState } from "./empty-state";
import { courses, creators, subjects, single } from "./catalog";

type Query = Record<string, string | string[] | undefined>;
export function TopicGrid() {
  return (
    <ul className="browse-topic-grid">
      {subjects.map((subject) => (
        <li key={subject.id}>
          <Link
            href={`/browse/${subject.id}`}
            className={`browse-topic topic-${subject.id}`}
          >
            <Image
              src={`/covers/${subject.artwork}`}
              alt=""
              fill
              sizes="(max-width: 767px) 45vw, 300px"
            />
            <span>{subject.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
export function CreatorTile({
  creator,
}: {
  creator: (typeof creators)[number];
}) {
  return (
    <Link className="creator-tile" href={`/creators/${creator.id}`}>
      <span className={`creator-avatar tone-${creator.subject}`}>
        {creator.initials}
      </span>
      <strong>{creator.name}</strong>
      <span>
        {subjects.find((subject) => subject.id === creator.subject)?.label}
      </span>
    </Link>
  );
}
export function CatalogView({
  query,
  category,
  search = false,
}: {
  query: Query;
  category?: string;
  search?: boolean;
}) {
  const q = single(query.q).trim().slice(0, 100);
  const subjectId = category ?? single(query.subject);
  const level = single(query.level);
  const price = single(query.price);
  const sort = single(query.sort);
  const type = single(query.type);
  const subject = subjects.find((item) => item.id === subjectId);
  let results = courses.filter(
    (course) =>
      (!subjectId || course.subject === subjectId) &&
      (!level || course.level === level) &&
      (price !== "free" || course.price === 0) &&
      (price !== "paid" || course.price > 0) &&
      `${course.title} ${course.creator} ${course.description} ${course.subject}`
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
  if (sort === "title")
    results = [...results].sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "shortest")
    results = [...results].sort((a, b) => a.minutes - b.minutes);
  if (sort === "price")
    results = [...results].sort((a, b) => a.price - b.price);
  if (query.state === "empty") results = [];
  const matchingCreators = creators.filter(
    (creator) =>
      (!subjectId || creator.subject === subjectId) &&
      `${creator.name} ${creator.subject}`
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
  const pathname = category
    ? `/browse/${category}`
    : search
      ? "/search"
      : "/browse";
  return (
    <div className="catalog-view">
      {search ? (
        <h1 className="sr-only">Search courses and creators</h1>
      ) : (
        <header className="page-heading">
          <h1>{subject?.label ?? "Browse"}</h1>
          <span className="muted">Sample catalog</span>
        </header>
      )}
      {category && (
        <Link className="back-link" href="/browse">
          <ArrowLeft size={16} />
          All subjects
        </Link>
      )}
      <SearchForm action={pathname}>
        <div className="search-input-wrap">
          <Search size={17} aria-hidden="true" />
          <label className="sr-only" htmlFor="catalog-query">
            Search courses and creators
          </label>
          <input
            id="catalog-query"
            name="q"
            type="search"
            placeholder="Search courses and creators"
            defaultValue={q}
            maxLength={100}
          />
          <button className="search-submit" type="submit">
            Search
          </button>
          {q && (
            <Link href={pathname} aria-label="Clear search">
              <X size={17} />
            </Link>
          )}
        </div>
        <div className="filter-row">
          {search && !q && <RecentSearches />}
          {!category && (
            <label>
              Subject
              <select name="subject" defaultValue={subjectId}>
                <option value="">All subjects</option>
                {subjects.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label>
            Level
            <select name="level" defaultValue={level}>
              <option value="">All levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>All levels</option>
            </select>
          </label>
          <label>
            Price
            <select name="price" defaultValue={price}>
              <option value="">Any price</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </label>
          {search && (
            <label>
              Show
              <select name="type" defaultValue={type}>
                <option value="">Courses & creators</option>
                <option value="courses">Courses</option>
                <option value="creators">Creators</option>
              </select>
            </label>
          )}
          <label>
            Sort
            <select name="sort" defaultValue={sort}>
              <option value="">Featured order</option>
              <option value="title">Title A–Z</option>
              <option value="shortest">Shortest first</option>
              <option value="price">Price: low to high</option>
            </select>
          </label>
          <button className="secondary-button" type="submit">
            Apply filters
          </button>
          <Link className="text-link" href={pathname}>
            Reset
          </Link>
        </div>
      </SearchForm>
      {!category && !q && !level && !price && (
        <section className="home-section">
          <h2>Browse categories</h2>
          <TopicGrid />
        </section>
      )}
      {search &&
        (q || type === "creators") &&
        type !== "courses" &&
        matchingCreators.length > 0 && (
          <section className="home-section">
            <div className="section-heading">
              <h2>Creators</h2>
              <span className="muted">Fictional identities</span>
            </div>
            <div className="creator-grid">
              {matchingCreators.map((creator) => (
                <CreatorTile key={creator.id} creator={creator} />
              ))}
            </div>
          </section>
        )}
      {type !== "creators" &&
        (results.length ? (
          <section>
            <div className="section-heading">
              <h2>
                {q
                  ? `Courses matching: ${q}`
                  : subject
                    ? subject.heading
                    : "Explore courses"}
              </h2>
              <span className="muted">{results.length} sample courses</span>
            </div>
            <div className="catalog-grid">
              {results.map((course) => (
                <CatalogCard course={course} key={course.id} />
              ))}
            </div>
          </section>
        ) : (
          <EmptyState
            title="No courses found"
            description="Try another search, subject, or level. Nothing matching these filters is in the sample catalog."
            href={pathname}
            action="Clear filters"
          />
        ))}
      {type === "creators" && matchingCreators.length === 0 && (
        <EmptyState
          title="No creators found"
          description="Try another name or clear the subject filter."
          href="/search"
          action="Clear search"
        />
      )}
      <p className="flow-footnote">
        Fictional courses, names, syllabus and prices. No ratings, enrollment
        counts or professional credentials are claimed.
      </p>
    </div>
  );
}
