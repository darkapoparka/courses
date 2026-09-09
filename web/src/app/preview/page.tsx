import Link from "next/link";
import { patternLinks } from "@/features/patterns/sample-events";
export default function PreviewIndex() {
  return (
    <div className="settings-page">
      <header>
        <h1>Reference pattern studies</h1>
        <p className="muted">
          Additional requested visual families, kept separate from the
          course-marketplace roadmap.
        </p>
      </header>
      <div className="pattern-index">
        {patternLinks.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
            <span>Open working UI study →</span>
          </Link>
        ))}
      </div>
      <p className="flow-footnote">
        Events, channels and recap metrics are explicitly fictional. There are
        no live broadcasts, scheduled instructors, bookings, analytics or
        account achievements. These studies do not adopt new marketplace
        features or create production records.
      </p>
      <Link className="text-link" href="/help">
        Core preview limitations
      </Link>
    </div>
  );
}
export const metadata = { title: "Reference pattern studies" };
