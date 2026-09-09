import { notFound } from "next/navigation";
import AppleMusicApp from "../../../components/apple-music-app";
import { screenScene } from "../../../lib/music-scenes";

export default async function ReferenceScreenPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scene = screenScene(id);
  if (!scene) notFound();
  return <AppleMusicApp key={id} initialScene={scene} />;
}
