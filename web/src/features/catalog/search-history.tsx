"use client";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Clock3, X } from "lucide-react";
import { readPreview, usePreviewValue, writePreview } from "./preview-storage";
function recentQueries(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value || "[]");
    return Array.isArray(parsed)
      ? parsed
          .filter(
            (item): item is string =>
              typeof item === "string" && item.length <= 100,
          )
          .slice(0, 6)
      : [];
  } catch {
    return [];
  }
}
export function SearchForm({
  action,
  children,
}: {
  action: string;
  children: ReactNode;
}) {
  return (
    <form
      action={action}
      role="search"
      className="catalog-search"
      onSubmit={(event) => {
        const q = String(new FormData(event.currentTarget).get("q") ?? "")
          .trim()
          .slice(0, 100);
        if (q)
          writePreview(
            "recent-searches",
            JSON.stringify(
              [
                q,
                ...recentQueries(readPreview("recent-searches")).filter(
                  (item) => item !== q,
                ),
              ].slice(0, 6),
            ),
          );
      }}
    >
      {children}
    </form>
  );
}
export function RecentSearches() {
  const queries = recentQueries(usePreviewValue("recent-searches"));
  const [message, setMessage] = useState("");
  if (!queries.length) return null;
  return (
    <section className="recent-searches" aria-labelledby="recent-heading">
      <div className="section-heading">
        <h2 id="recent-heading">Recently searched</h2>
        <button
          className="text-link"
          onClick={() => {
            if (!writePreview("recent-searches", "[]"))
              setMessage("Browser storage is unavailable.");
          }}
        >
          Clear
        </button>
      </div>
      <ul>
        {queries.map((q) => (
          <li key={q}>
            <Link href={`/search?q=${encodeURIComponent(q)}`}>
              <Clock3 size={19} />
              <span>
                {q}
                <small>Search in this tab</small>
              </span>
            </Link>
            <button
              aria-label={`Remove recent search ${q}`}
              onClick={() => {
                if (
                  !writePreview(
                    "recent-searches",
                    JSON.stringify(queries.filter((item) => item !== q)),
                  )
                )
                  setMessage("Browser storage is unavailable.");
              }}
            >
              <X size={15} />
            </button>
          </li>
        ))}
      </ul>
      {message && <p role="status">{message}</p>}
    </section>
  );
}
