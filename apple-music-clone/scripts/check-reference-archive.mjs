import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Run without installing the application. Never alter the frozen source files.
const app = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const originals = join(app, 'reference/originals');
const evidence = join(app, '.parity-evidence');
const archive = JSON.parse(await readFile(join(originals, 'flow-screen-map.json'), 'utf8'));
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const seenFlows = new Set();
const screens = new Set();
let steps = 0;

function dimensions(bytes) {
  assert.equal(bytes.toString('ascii', 0, 4), 'RIFF', 'Invalid WebP RIFF header');
  assert.equal(bytes.toString('ascii', 8, 12), 'WEBP', 'Invalid WebP signature');
  const type = bytes.toString('ascii', 12, 16);
  if (type === 'VP8X') return [1 + bytes.readUIntLE(24, 3), 1 + bytes.readUIntLE(27, 3)];
  if (type === 'VP8 ') return [bytes.readUInt16LE(26) & 0x3fff, bytes.readUInt16LE(28) & 0x3fff];
  if (type === 'VP8L') {
    const bits = bytes.readUInt32LE(21);
    return [(bits & 0x3fff) + 1, ((bits >>> 14) & 0x3fff) + 1];
  }
  throw new Error(`Unsupported WebP chunk ${type}`);
}

assert.equal(archive.flows.length, 58, 'The frozen baseline contains 58 flows');
for (const flow of archive.flows) {
  assert.match(flow.id, uuid);
  assert.ok(!seenFlows.has(flow.id), `Duplicate flow ${flow.id}`);
  seenFlows.add(flow.id);
  assert.ok(flow.name && flow.steps.length, `Empty flow ${flow.id}`);
  for (const [index, step] of flow.steps.entries()) {
    assert.equal(step.step, index + 1, `Non-contiguous steps in ${flow.name}`);
    assert.match(step.screenId, uuid);
    assert.equal(step.highResolutionFile, `high-resolution/${step.screenId}.webp`);
    assert.equal(step.existingFile, `flows/${flow.id}/${String(index + 1).padStart(3, '0')}.webp`);
    await readFile(join(originals, step.existingFile));
    screens.add(step.screenId);
    steps += 1;
  }
}
assert.equal(steps, 218);
assert.equal(screens.size, 159);
assert.equal(archive.flowCount, seenFlows.size);
assert.equal(archive.stepCount, steps);
assert.equal(archive.distinctScreenCount, screens.size);
for (const folder of [originals, join(originals, 'high-resolution')]) {
  const ids = (await readdir(folder)).filter((name) => uuid.test(name.replace(/\.webp$/, '')) && name.endsWith('.webp'));
  assert.equal(ids.length, 159, `Unexpected screen count in ${folder}`);
  assert.deepEqual(new Set(ids.map((name) => name.slice(0, -5))), screens);
}

await mkdir(join(evidence, 'originals'), { recursive: true });
const files = [];
for (const id of [...screens].sort()) {
  for (const highResolution of [false, true]) {
    const relative = highResolution ? `high-resolution/${id}.webp` : `${id}.webp`;
    const bytes = await readFile(join(originals, relative));
    const [width, height] = dimensions(bytes);
    assert.equal(width, highResolution ? 3024 : 1440, `Unexpected source width: ${relative}`);
    assert.ok(height > 0);
    files.push({ path: relative, width, height, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
    if (!highResolution) await copyFile(join(originals, relative), join(evidence, 'originals', relative));
  }
}
const result = { commit: process.env.GITHUB_SHA ?? null, flows: seenFlows.size, steps, distinctScreens: screens.size, files };
await writeFile(join(evidence, 'archive-check.json'), `${JSON.stringify(result, null, 2)}\n`);
await copyFile(join(originals, 'flow-screen-map.json'), join(evidence, 'flow-screen-map.json'));
console.log(`Archive checks passed: ${seenFlows.size} flows, ${steps} steps, ${screens.size} identities, ${files.length} image variants.`);
console.log('This checks archive integrity, not UI fidelity. Original references remain unchanged.');
