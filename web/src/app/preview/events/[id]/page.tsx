import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, ArrowLeft } from "lucide-react";
import { Disclosure } from "@/components/ui/disclosure";
import { sampleEvents } from "@/features/patterns/sample-events";
export default async function EventDetailStudy({
  params,
}: PageProps<"/preview/events/[id]">) {
  const { id } = await params;
  const event = sampleEvents.find((item) => item.id === id);
  if (!event) notFound();
  return (
    <div className="event-detail-study">
      <Image
        src={`/covers/${event.image}`}
        alt=""
        fill
        sizes="100vw"
        className="event-background"
      />
      <div className="event-detail-inner">
        <Link className="event-back" href="/preview/events">
          <ArrowLeft size={17} />
          Workshop samples
        </Link>
        <p className="eyebrow">FICTIONAL EVENT · LAYOUT STUDY</p>
        <div className="event-portrait">
          <Image
            src={`/covers/${event.image}`}
            width={160}
            height={160}
            alt="Illustrative course artwork, not an instructor portrait"
          />
          <span className="date-badge">
            <small>{event.month}</small>
            {event.day}
          </span>
        </div>
        <h1>{event.title}</h1>
        <p>{event.creator}</p>
        <div className="event-buttons">
          <Disclosure
            title="Booking is not connected"
            description="This is a fictional event. No place, instructor or ticket can be reserved."
            trigger="View booking state"
            buttonClass="secondary-button"
          >
            <p>
              This screen demonstrates an event-detail action. No payment or
              booking service is contacted.
            </p>
            <button disabled className="primary-button">
              Booking unavailable
            </button>
          </Disclosure>
          <Link
            className="secondary-button"
            href={`/courses/${event.courseId}`}
          >
            Explore the sample course
          </Link>
        </div>
        <div className="event-information">
          <div>
            <span>
              <strong>{event.date}</strong>
              <small>{event.time} · sample time</small>
            </span>
            <CalendarDays />
          </div>
          <div>
            <span>
              <strong>{event.location}</strong>
              <small>Fictional location · no venue or meeting link</small>
            </span>
            <MapPin />
          </div>
        </div>
        <p className="event-description">{event.description}</p>
        <h2>More workshop samples</h2>
        <ul className="event-more">
          {sampleEvents
            .filter((item) => item.id !== id)
            .slice(0, 3)
            .map((item) => (
              <li key={item.id}>
                <Link href={`/preview/events/${item.id}`}>
                  <span className="date-badge">
                    <small>{item.month}</small>
                    {item.day}
                  </span>
                  <span>
                    {item.title}
                    <small>
                      {item.location} · {item.time}
                    </small>
                  </span>
                  <span>›</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
export const metadata = { title: "Workshop detail layout study" };
