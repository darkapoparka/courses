// Read-only checklist validation. Inventory counts do not prove visual parity.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const app = new URL('../', import.meta.url);
const archive = JSON.parse(await readFile(new URL('reference/originals/flow-screen-map.json', app), 'utf8'));
const tasks = (await readFile(new URL('../docs/tasks.md', app), 'utf8')).replace(/\r\n/g, '\n');
const screenIds = [...new Set(archive.flows.flatMap(flow => flow.steps.map(step => step.screenId)))];
const screenPrefixes = screenIds.map(id => id.slice(0, 8));
const flowPrefixes = archive.flows.map(flow => flow.id.slice(0, 8));
assert.equal(new Set(screenPrefixes).size, screenIds.length, 'Screen prefix collision');
assert.equal(new Set(flowPrefixes).size, archive.flows.length, 'Flow prefix collision');
function inspect(kind, expected) {
  const pattern = new RegExp('^\\s*- \\[([ x])\\] \\*\\*' + kind + '-([0-9a-f]{8}) — ', 'gm');
  const entries = [...tasks.matchAll(pattern)];
  assert.equal(entries.length, expected.length, `${kind}: incorrect checklist length`);
  assert.equal(new Set(entries.map(row => row[2])).size, expected.length, `${kind}: duplicate identity`);
  assert.deepEqual(entries.map(row => row[2]).sort(), [...expected].sort(), `${kind}: missing or foreign identities`);
  return entries.filter(row => row[1] === 'x').length;
}
const ui = inspect('UI', screenPrefixes);
const matched = inspect('MATCH', screenPrefixes);
const flows = inspect('FLOW', flowPrefixes);
for (const id of screenIds) {
  assert.ok(tasks.includes(`id="screen-${id.slice(0,8)}"`), `Missing anchor: ${id}`);
  assert.ok(tasks.includes(`reference/originals/${id}.webp`), `Missing reference: ${id}`);
  assert.ok(tasks.includes(`/screen/${id})`), `Missing live state: ${id}`);
}
for (const flow of archive.flows) {
  const start = tasks.indexOf(`**FLOW-${flow.id.slice(0,8)} — `);
  const end = tasks.indexOf('\n\n', start);
  const item = tasks.slice(start, end < 0 ? undefined : end);
  const actual = [...item.matchAll(/\[(\d+): ([0-9a-f]{8})\]\(#screen-([0-9a-f]{8})\)/g)];
  assert.deepEqual(actual.map(row => [Number(row[1]),row[2],row[3]]), flow.steps.map(step => [step.step,step.screenId.slice(0,8),step.screenId.slice(0,8)]), `Incorrect recorded order: ${flow.name}`);
}
console.log(`Checklist: ${fileURLToPath(new URL('../docs/tasks.md', app))}`);
console.log(`UI coded/rendered: ${ui}/${screenIds.length}`);
console.log(`Exact visual matches signed off: ${matched}/${screenIds.length}`);
console.log(`Full recorded flows signed off: ${flows}/${archive.flows.length}`);
console.log(`Ordered steps indexed: ${archive.flows.reduce((n,flow) => n + flow.steps.length,0)}`);
console.log('Inventory is complete. This validator does not establish visual or interaction acceptance.');
