import { createHash } from "node:crypto";
import { mkdir, readFile, readFile as readExisting, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("J:/courses/apple-music-clone/reference/originals");
const sourceManifestPath = path.join(root, "parent-ui-elements-media-check.json");
const outputDir = path.join(root, "high-resolution");
const outputManifestPath = path.join(root, "high-resolution-manifest.json");

function readU24LE(buffer, offset) {
  return buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
}

function decodeWebpDimensions(buffer) {
  if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") {
    return { width: null, height: null, format: "not-webp" };
  }
  const chunk = buffer.toString("ascii", 12, 16);
  if (chunk === "VP8X") {
    return { width: 1 + readU24LE(buffer, 24), height: 1 + readU24LE(buffer, 27), format: "VP8X" };
  }
  if (chunk === "VP8L" && buffer[20] === 0x2f) {
    const width = 1 + (((buffer[22] & 0x3f) << 8) | buffer[21]);
    const height = 1 + (((buffer[25] & 0x0f) << 10) | (buffer[24] << 2) | ((buffer[23] & 0xc0) >> 6));
    return { width, height, format: "VP8L" };
  }
  if (chunk === "VP8 ") {
    const signature = Buffer.from([0x9d, 0x01, 0x2a]);
    const offset = buffer.indexOf(signature, 20);
    if (offset >= 0) {
      return { width: buffer.readUInt16LE(offset + 3) & 0x3fff, height: buffer.readUInt16LE(offset + 5) & 0x3fff, format: "VP8" };
    }
  }
  return { width: null, height: null, format: chunk };
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

async function fetchWithRetry(url, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 90_000);
    try {
      const response = await fetch(url, { signal: controller.signal, headers: { accept: "image/avif,image/webp,image/*,*/*;q=0.8" } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError;
}

const source = JSON.parse(await readFile(sourceManifestPath, "utf8"));
const entries = source.higherResolutionVariants.map((item) => ({
  id: item.id,
  expectedWidth: item.variants?.[0]?.width ?? null,
  sourceUrl: item.variants?.[0]?.url ?? null,
}));
await mkdir(outputDir, { recursive: true });

let prior = {};
try {
  prior = JSON.parse(await readFile(outputManifestPath, "utf8"));
} catch {}

const results = {};
for (let index = 0; index < entries.length; index += 4) {
  const batch = entries.slice(index, index + 4);
  const completed = await Promise.all(batch.map(async (entry) => {
    const file = `${entry.id}.webp`;
    const localPath = path.join(outputDir, file);
    try {
      let bytes;
      try {
        bytes = await readExisting(localPath);
        if (bytes.length < 32) throw new Error("existing file too small");
      } catch {
        bytes = await fetchWithRetry(entry.sourceUrl);
        await writeFile(localPath, bytes);
      }
      const decoded = decodeWebpDimensions(bytes);
      return [entry.id, {
        id: entry.id,
        file: `high-resolution/${file}`,
        sourceUrl: entry.sourceUrl,
        expectedWidth: entry.expectedWidth,
        bytes: bytes.length,
        sha256: sha256(bytes),
        width: decoded.width,
        height: decoded.height,
        format: decoded.format,
        status: decoded.width && decoded.height ? "verified" : "downloaded-undecoded",
      }];
    } catch (error) {
      return [entry.id, { id: entry.id, file: `high-resolution/${file}`, sourceUrl: entry.sourceUrl, expectedWidth: entry.expectedWidth, status: "error", error: String(error?.message ?? error) }];
    }
  }));
  for (const [id, result] of completed) results[id] = result;
  await writeFile(outputManifestPath, JSON.stringify({ capturedAt: new Date().toISOString(), sourceManifest: "parent-ui-elements-media-check.json", count: entries.length, entries: Object.values({ ...prior.entries?.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}), ...results }) }, null, 2), "utf8");
  console.log(`processed ${Math.min(index + batch.length, entries.length)}/${entries.length}`);
}

const finalManifest = JSON.parse(await readFile(outputManifestPath, "utf8"));
const statuses = finalManifest.entries.reduce((acc, item) => { acc[item.status] = (acc[item.status] ?? 0) + 1; return acc; }, {});
console.log(JSON.stringify({ count: finalManifest.count, statuses, verifiedWidths: finalManifest.entries.filter((item) => item.status === "verified").reduce((acc, item) => { acc[item.width] = (acc[item.width] ?? 0) + 1; return acc; }, {}) }));
