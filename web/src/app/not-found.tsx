import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="feedback-state">
      <Compass aria-hidden="true" />
      <p className="eyebrow">DESIGN PREVIEW</p>
      <h1>Only Home, for now.</h1>
      <p>
        This destination is not part of this preview. Head back to explore the
        sample courses.
      </p>
      <Link className="primary-button" href="/">
        Back to Home
      </Link>
    </section>
  );
}
