import { notFound } from "next/navigation";
import AppleMusicApp from "../components/apple-music-app";
import { sceneFromUrl } from "../lib/music-scenes";

export default async function HomePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const values = await searchParams;
  const url = new URL("http://reference.local/");
  for (const [key, value] of Object.entries(values)) if (typeof value === "string") url.searchParams.set(key, value);
  const scene = sceneFromUrl(url);
  if (!scene) notFound();
  return <AppleMusicApp key={url.search} initialScene={scene} />;
}
