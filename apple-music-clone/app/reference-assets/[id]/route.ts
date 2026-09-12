import { createHash } from "node:crypto";
import { coverResources, isCoverResource, type CoverResourceId } from "../../../lib/cover-resources";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import archive from "../../../reference/originals/flow-screen-map.json";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ids = new Set(archive.flows.flatMap((flow) => flow.steps.map((step) => step.screenId)));

const coverCache = new Map<CoverResourceId, Promise<Uint8Array>>();
async function cleanCover(id: CoverResourceId): Promise<Uint8Array> {
  const existing = coverCache.get(id);
  if (existing) return existing;
  const pending = (async () => {
    const resource = coverResources[id];
    const response = await fetch(resource.url, { cache: "no-store", signal: AbortSignal.timeout(15000) });
    if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) throw new Error(`Cover provider HTTP ${response.status}`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.byteLength !== resource.bytes || createHash("sha256").update(bytes).digest("hex") !== resource.sha256) throw new Error("Cover resource differs from the reviewed bytes");
    return bytes;
  })();
  coverCache.set(id, pending);
  try { return await pending; }
  catch (error) { coverCache.delete(id); throw error; }
}

// Local comparison assets only. The archive is not a production public directory.
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const enabled = process.env.NODE_ENV !== "production" ||
    (process.env.REFERENCE_PREVIEW === "1" && process.env.VERCEL_ENV !== "production");
  if (!enabled) return new Response(null, { status: 404 });
  const { id } = await params;
  const providerCover = isCoverResource(id);
  if (!ids.has(id) && !providerCover) return new Response(null, { status: 404 });
  const highResolution = new URL(request.url).searchParams.get("resolution") === "high";
  const file = join(process.cwd(), "reference", "originals", ...(highResolution ? ["high-resolution"] : []), `${id}.webp`);
  try {
    const bytes = isCoverResource(id) ? await cleanCover(id) : await readFile(file);
    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch (error) {
    console.error("Reference asset could not be read", id, error instanceof Error ? error.message : "Unknown error");
    return new Response("Reference asset unavailable", { status: 503 });
  }
}
