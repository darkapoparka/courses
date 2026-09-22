import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { isReviewedCover } from "../../../lib/cover-integrity.mjs";
import { coverResources, isCoverResource, type CoverResourceId } from "../../../lib/cover-resources";
import {
  artistHeroResources,
  isArtistHeroResource,
  type ArtistHeroResourceId,
} from "../../../lib/artist-hero-resources";
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
    const response = await fetch(resource.url, {
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) {
      throw new Error(`Cover provider HTTP ${response.status}`);
    }
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (!isReviewedCover(bytes, resource)) {
      throw new Error("Cover image differs from the reviewed content");
    }
    return bytes;
  })();
  coverCache.set(id, pending);
  try {
    return await pending;
  } catch (error) {
    coverCache.delete(id);
    throw error;
  }
}

const heroCache = new Map<ArtistHeroResourceId, Promise<Uint8Array>>();
async function cleanArtistHero(id: ArtistHeroResourceId): Promise<Uint8Array> {
  const existing = heroCache.get(id);
  if (existing) return existing;
  const pending = (async () => {
    const resource = artistHeroResources[id];
    const response = await fetch(resource.url, {
      cache: "no-store",
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok || !response.headers.get("content-type")?.startsWith("video/")) {
      throw new Error(`Artist hero provider HTTP ${response.status}`);
    }
    const bytes = new Uint8Array(await response.arrayBuffer());
    const digest = createHash("sha256").update(bytes).digest("hex");
    if (bytes.byteLength !== resource.byteLength || digest !== resource.sha256) {
      throw new Error("Artist hero differs from the reviewed provider bytes");
    }
    return bytes;
  })();
  heroCache.set(id, pending);
  try {
    return await pending;
  } catch (error) {
    heroCache.delete(id);
    throw error;
  }
}

type ParsedRange = { start: number; end: number } | "invalid" | null;
function parseRange(value: string | null, length: number): ParsedRange {
  if (!value) return null;
  const match = /^bytes=([0-9]*)-([0-9]*)$/.exec(value.trim());
  if (!match || (!match[1] && !match[2])) return "invalid";
  let start: number;
  let end: number;
  if (!match[1]) {
    const suffix = Number(match[2]);
    if (!Number.isSafeInteger(suffix) || suffix <= 0) return "invalid";
    start = Math.max(length - suffix, 0);
    end = length - 1;
  } else {
    start = Number(match[1]);
    end = match[2] ? Number(match[2]) : length - 1;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end)) return "invalid";
  }
  if (start < 0 || start >= length || end < start) return "invalid";
  return { start, end: Math.min(end, length - 1) };
}

function heroResponse(request: Request, id: ArtistHeroResourceId, bytes: Uint8Array) {
  const resource = artistHeroResources[id];
  const range = parseRange(request.headers.get("range"), bytes.byteLength);
  const common = {
    "Accept-Ranges": "bytes",
    "Cache-Control": "private, no-store",
    "Content-Type": resource.contentType,
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex, nofollow",
  };
  if (range === "invalid") {
    return new Response(null, {
      status: 416,
      headers: { ...common, "Content-Range": `bytes */${bytes.byteLength}` },
    });
  }
  if (range) {
    const body = new Uint8Array(bytes.slice(range.start, range.end + 1));
    return new Response(body, {
      status: 206,
      headers: {
        ...common,
        "Content-Length": String(body.byteLength),
        "Content-Range": `bytes ${range.start}-${range.end}/${bytes.byteLength}`,
      },
    });
  }
  return new Response(new Uint8Array(bytes), {
    headers: { ...common, "Content-Length": String(bytes.byteLength) },
  });
}

// Local comparison assets only. The archive is not a production public directory.
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const enabled =
    process.env.NODE_ENV !== "production" ||
    (process.env.REFERENCE_PREVIEW === "1" && process.env.VERCEL_ENV !== "production");
  if (!enabled) return new Response(null, { status: 404 });
  const { id } = await params;
  const providerCover = isCoverResource(id);
  const providerHero = isArtistHeroResource(id);
  if (!ids.has(id) && !providerCover && !providerHero) {
    return new Response(null, { status: 404 });
  }
  const highResolution = new URL(request.url).searchParams.get("resolution") === "high";
  const file = join(
    process.cwd(),
    "reference",
    "originals",
    ...(highResolution ? ["high-resolution"] : []),
    `${id}.webp`,
  );
  try {
    if (providerHero) {
      return heroResponse(request, id, await cleanArtistHero(id));
    }
    const bytes = providerCover ? await cleanCover(id) : await readFile(file);
    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch (error) {
    console.error(
      "Reference asset could not be read",
      id,
      error instanceof Error ? error.message : "Unknown error",
    );
    return new Response("Reference asset unavailable", { status: 503 });
  }
}
