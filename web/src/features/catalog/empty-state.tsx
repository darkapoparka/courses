import Link from "next/link";
import { BookOpen } from "lucide-react";
export function EmptyState({
  title,
  description,
  href = "/browse",
  action = "Browse courses",
}: {
  title: string;
  description: string;
  href?: string;
  action?: string;
}) {
  return (
    <section className="feedback-state">
      <BookOpen aria-hidden="true" />
      <h2>{title}</h2>
      <p>{description}</p>
      <Link className="primary-button" href={href}>
        {action}
      </Link>
    </section>
  );
}
