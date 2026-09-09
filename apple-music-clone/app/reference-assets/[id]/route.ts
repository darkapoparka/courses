import { readFile } from "node:fs/promises";
import { join } from "node:path";
import archive from "../../../reference/originals/flow-screen-map.json";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ids = new Set(archive.flows.flatMap((flow) => flow.steps.map((step) => step.screenId)));

// Local comparison assets only. The archive is not a production public directory.
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const enabled = process.env.NODE_ENV !== "production" ||
    (process.env.REFERENCE_PREVIEW === "1" && process.env.VERCEL_ENV !== "production");
  if (!enabled) return new Response(null, { status: 404 });
  const { id } = await params;
  if (!ids.has(id)) return new Response(null, { status: 404 });
  const highResolution = new URL(request.url).searchParams.get("resolution") === "high";
  const file = join(process.cwd(), "reference", "originals", ...(highResolution ? ["high-resolution"] : []), `${id}.webp`);
  try {
    const bytes = await readFile(file);
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
