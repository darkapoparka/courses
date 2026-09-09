import { notFound } from "next/navigation";
import AppleMusicApp from "../../../components/apple-music-app";
import { findFlow } from "../../../lib/music-catalog";
import { screenScene } from "../../../lib/music-scenes";

export default async function FlowPage({ params, searchParams }: { params: Promise<{ flow: string }>; searchParams: Promise<{ step?: string | string[] }> }) {
  const [route, query] = await Promise.all([params, searchParams]);
  const flow = findFlow(route.flow);
  const value = query.step ?? "0";
  if (!flow || typeof value !== "string" || !/^\d+$/.test(value)) notFound();
  const step = flow.steps[Number(value)];
  if (!step) notFound();
  const scene = screenScene(step.screenId);
  if (!scene) notFound();
  return <AppleMusicApp key={`${flow.id}:${value}`} initialScene={scene} />;
}
