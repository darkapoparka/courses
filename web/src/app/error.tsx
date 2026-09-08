"use client";

import { useEffect } from "react";
import { CircleAlert } from "lucide-react";

export default function HomeError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Home render failed", {
      digest: error.digest ?? "client-render",
    });
  }, [error]);
  return (
    <section className="feedback-state" aria-labelledby="home-error-title">
      <CircleAlert aria-hidden="true" />
      <p className="eyebrow">DESIGN PREVIEW</p>
      <h1 id="home-error-title">Home couldn&apos;t load.</h1>
      <p>
        Try again, or return to the default sample Home. If you selected the
        simulated failure, return Home to leave that test.
      </p>
      <div className="feedback-actions">
        <button className="primary-button" type="button" onClick={retry}>
          Try again
        </button>
        {/* A full document navigation clears the failed same-path route boundary. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="text-link" href="/">
          Return to sample Home
        </a>
      </div>
    </section>
  );
}
