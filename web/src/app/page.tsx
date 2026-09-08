import { HomeView } from "@/features/home/home-view";
import { parseHomePreview } from "@/features/home/fixtures";

export default async function Home({ searchParams }: PageProps<"/">) {
  const { sample, state } = parseHomePreview(await searchParams);
  // Explicit UI review states, never a backend fallback.
  if (state === "error") throw new Error("UI-001 simulated Home load failure");
  if (state === "loading")
    await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <HomeView
      sample={sample}
      empty={state === "empty"}
      slow={state === "loading"}
    />
  );
}
