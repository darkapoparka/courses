import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { coverContentSha256, isReviewedCover } from '../lib/cover-integrity.mjs';

const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const comment = Buffer.from('455849464e00000049492a0008000000010069870400010000001a00000000000000010086920700320000002c000000000000004153434949000000', 'hex');
function chunk(kind, content) {
  const payload = Buffer.from(content);
  const header = Buffer.alloc(8);
  header.write(kind, 0, 'ascii');
  header.writeUInt32LE(payload.length, 4);
  return Buffer.concat([header, payload, Buffer.alloc(payload.length % 2)]);
}
function fixture() {
  // Synthetic payloads exercise integrity, not WebP decoding or visual parity.
  const bytes = Buffer.concat([Buffer.from('RIFF0000WEBP'), chunk('ICCP', 'colour-profile'),
    chunk('VP8 ', 'reviewed-pixels'), comment, Buffer.from('A'.repeat(26))]);
  bytes.writeUInt32LE(bytes.length - 8, 4);
  return bytes;
}
const approved = fixture();
const resource = { bytes: approved.length, sha256: digest(approved), contentSha256: coverContentSha256(approved) };

test('preserves the original reviewed encoding and caller bytes', () => {
  const original = Buffer.from(approved);
  assert.equal(isReviewedCover(approved, resource), true);
  coverContentSha256(approved);
  assert.deepEqual(approved, original);
});
test('accepts only a changed provider identifier with identical image content', () => {
  const changed = Buffer.from(approved);
  changed.fill('B', changed.length - 26);
  assert.notEqual(digest(changed), resource.sha256);
  assert.equal(coverContentSha256(changed), resource.contentSha256);
  assert.equal(isReviewedCover(changed, resource), true);
});
for (const target of ['reviewed-pixels', 'colour-profile']) {
  test(`rejects modified ${target}`, () => {
    const changed = Buffer.from(approved);
    changed[changed.indexOf(target)] ^= 1;
    assert.equal(isReviewedCover(changed, resource), false);
  });
}
test('rejects other EXIF changes, including an unreviewed orientation structure', () => {
  const changed = Buffer.from(approved);
  const entry = changed.length - 68; // First TIFF directory entry.
  changed.writeUInt16LE(0x0112, entry); // Orientation instead of ExifIFD.
  changed.writeUInt16LE(3, entry + 2);
  changed.writeUInt32LE(6, entry + 8); // Rotate 90 degrees.
  assert.throws(() => coverContentSha256(changed));
  assert.equal(isReviewedCover(changed, resource), false);
});
test('rejects non-ASCII, lowercase and non-base32 identifiers', () => {
  for (const value of [0xc1, 0x61, 0x31]) {
    const changed = Buffer.from(approved);
    changed[changed.length - 1] = value;
    assert.throws(() => coverContentSha256(changed));
    assert.equal(isReviewedCover(changed, resource), false);
  }
});
test('rejects a changed RIFF size instead of normalising it', () => {
  const changed = Buffer.from(approved);
  changed.writeUInt32LE(0, 4);
  assert.throws(() => coverContentSha256(changed));
  assert.equal(isReviewedCover(changed, resource), false);
});
test('rejects truncated, appended and unrelated data', () => {
  for (const changed of [approved.subarray(0, -1), Buffer.concat([approved, Buffer.of(0)]), Buffer.of(0)]) {
    assert.equal(isReviewedCover(changed, resource), false);
  }
});
test('requires an approved content digest for a different provider encoding', () => {
  const changed = Buffer.from(approved);
  changed.fill('C', changed.length - 26);
  assert.equal(isReviewedCover(changed, { ...resource, contentSha256: '0'.repeat(64) }), false);
});
