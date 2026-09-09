import { LibraryView } from "@/features/catalog/library-view";
import { single } from "@/features/catalog/catalog";
export default async function LibraryPage({
  searchParams,
}: PageProps<"/library">) {
  const q = await searchParams;
  return (
    <LibraryView
      tab={q.tab === "saved" ? "saved" : "courses"}
      layout={single(q.layout)}
      sort={single(q.sort)}
      q={single(q.q).slice(0, 100)}
      empty={q.state === "empty"}
      visitor={q.sample === "visitor"}
    />
  );
}

export const metadata = { title: "Library" };
