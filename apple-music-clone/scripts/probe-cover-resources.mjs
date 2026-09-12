import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { coverContentSha256, isReviewedCover } from '../lib/cover-integrity.mjs';

// Diagnostic evidence only: unknown provider encodings never become approved.
const app = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(app, '.parity-evidence', `provider-probe-${Date.now()}`);
const resources = JSON.parse(await readFile(resolve(app, 'lib/cover-resources.json'), 'utf8'));
await mkdir(output, { recursive: true });
const observations = [];
for (const [id, expected] of Object.entries(resources)) {
  const row = { id, expectedBytes: expected.bytes, expectedSha256: expected.sha256 };
  try {
    const url = new URL(expected.url);
    if (url.protocol !== 'https:' || url.hostname !== 'is1-ssl.mzstatic.com') throw new Error('Unapproved provider origin');
    const response = await fetch(url, { signal: AbortSignal.timeout(20000), redirect: 'error' });
    Object.assign(row, { status: response.status, contentType: response.headers.get('content-type'), etag: response.headers.get('etag') });
    if (!response.ok || !row.contentType?.startsWith('image/webp')) throw new Error('Provider did not return WebP artwork');
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.byteLength > 2_000_000) throw new Error('Unexpected artwork size');
    Object.assign(row, { bytes: bytes.byteLength, sha256: createHash('sha256').update(bytes).digest('hex') });
    row.contentSha256 = coverContentSha256(bytes);
    row.matchesOriginalEncoding = row.sha256 === expected.sha256;
    row.matches = isReviewedCover(bytes, expected);
    await writeFile(resolve(output, `${id}.webp`), bytes);
  } catch (error) { row.error = String(error); row.matches = false; }
  observations.push(row);
  console.log(JSON.stringify(row));
}
await writeFile(resolve(output, 'observations.json'), JSON.stringify(observations, null, 2), 'utf8');
process.exitCode = observations.every(row => row.matches) ? 0 : 1;
