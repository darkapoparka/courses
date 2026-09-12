import { createHash } from 'node:crypto';

// The reviewed WebPs have identical image and colour-profile data on Windows
// and CI. Only their provider-generated EXIF UserComment identifier differs.
// Keep every other byte pinned, including the exact EXIF structure.
const commentPrefix = Buffer.from('455849464e00000049492a0008000000010069870400010000001a00000000000000010086920700320000002c000000000000004153434949000000', 'hex');
const digest = bytes => createHash('sha256').update(bytes).digest('hex');

export function coverContentSha256(input) {
  const bytes = Buffer.from(input); // Do not modify the image returned to callers.
  const start = bytes.length - commentPrefix.length - 26;
  if (start < 12 || bytes.toString('latin1', 0, 4) !== 'RIFF' ||
      bytes.toString('latin1', 8, 12) !== 'WEBP' || bytes.readUInt32LE(4) !== bytes.length - 8 ||
      !bytes.subarray(start, start + commentPrefix.length).equals(commentPrefix) ||
      !/^[A-Z2-7]{26}$/.test(bytes.toString('latin1', bytes.length - 26))) {
    throw new Error('Unreviewed cover metadata structure');
  }
  bytes.fill(0, bytes.length - 26);
  return digest(bytes);
}

export function isReviewedCover(bytes, resource) {
  if (bytes.byteLength !== resource.bytes) return false;
  if (digest(bytes) === resource.sha256) return true;
  try { return coverContentSha256(bytes) === resource.contentSha256; }
  catch { return false; }
}
