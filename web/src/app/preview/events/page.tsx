import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { sampleEvents } from "@/features/patterns/sample-events";
import { single, subjects } from "@/features/catalog/catalog";
export default async function EventStudy({
  searchParams,
}: PageProps<"/preview/events">) {
  const query = await searchParams;
  const location = single(query.location);
  const month = single(query.month);
  const subject = single(query.subject);
  const selected = sampleEvents.filter(
    (event) =>
      (!location || event.location === location) &&
      (!month || event.month === month) &&
      (!subject || event.subject === subject),
  );
  return (
    <div className="event-study">
      <header className="page-heading">
        <h1>Workshops</h1>
        <Link className="muted" href="/preview">
          Layout study · not real events
        </Link>
      </header>
      <form className="event-filters" action="/preview/events">
        <label>
          <MapPin size={16} />
          Location
          <select name="location" defaultValue={location}>
            <option value="">Choose a sample location</option>
            <option>Online</option>
            <option>London</option>
            <option>New York</option>
          </select>
        </label>
        <label>
          Dates
          <select name="month" defaultValue={month}>
            <option value="">All sample dates</option>
            <option value="Sep">September</option>
            <option value="Oct">October</option>
            <option value="Nov">November</option>
          </select>
        </label>
        <label>
          Subject
          <select name="subject" defaultValue={subject}>
            <option value="">All subjects</option>
            {subjects.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <button className="secondary-button">Apply</button>
        <Link className="text-link" href="/preview/events">
          Reset
        </Link>
      </form>
      {!location && (
        <div className="event-location-prompt">
          <MapPin />
          <h2>Discover a different perspective</h2>
          <p>
            Select a sample location. No location permission or real event
            service is requested.
          </p>
        </div>
      )}
      {selected.length ? (
        Array.from(new Set(selected.map((event) => event.location))).map(
          (city) => (
            <section className="home-section" key={city}>
              <h2>
                {city === "Online"
                  ? "Online workshop samples"
                  : `Workshop samples in ${city}`}
              </h2>
              <div className="event-grid">
                {selected
                  .filter((event) => event.location === city)
                  .map((event) => (
                    <article key={event.id}>
                      <Link
                        href={`/preview/events/${event.id}`}
                        className="event-cover"
                      >
                        <Image
                          src={`/covers/${event.image}`}
                          alt=""
                          fill
                          sizes="(max-width:767px) 45vw, 220px"
                        />
                        <span className="date-badge">
                          <small>{event.month}</small>
                          {event.day}
                        </span>
                      </Link>
                      <h3>
                        <Link href={`/preview/events/${event.id}`}>
                          {event.title}
                        </Link>
                      </h3>
                      <p>{event.creator}</p>
                      <p>
                        {event.date} · {event.time}
                      </p>
                    </article>
                  ))}
              </div>
            </section>
          ),
        )
      ) : (
        <section className="feedback-state">
          <MapPin />
          <h2>No matching sample workshops</h2>
          <p>Try another location, date, or subject.</p>
          <Link className="primary-button" href="/preview/events">
            Clear filters
          </Link>
        </section>
      )}
      <p className="flow-footnote">
        All dates, locations, instructors and availability on this page are
        fictional. No booking, directions or calendar invitation is created.
      </p>
    </div>
  );
}
export const metadata = { title: "Workshop layout study" };
