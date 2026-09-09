"use client";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="route-error"><h1>This reference could not be opened</h1><p>Try loading the page again. Your saved library is kept in this browser.</p><button type="button" onClick={reset}>Try again</button><a href="/">Return to the app</a></main>;
}
