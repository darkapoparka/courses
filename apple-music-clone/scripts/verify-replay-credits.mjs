/** Real browser regression checks. Passing is not full visual-parity approval.
 * Use PLAYWRIGHT_MODULE for an existing installation and BROWSER_CDP to reuse
 * an agent-owned browser. Every check gets an isolated browser context. */
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const moduleName = process.env.PLAYWRIGHT_MODULE || '@playwright/test';
const { chromium, expect } = await import(isAbsolute(moduleName) ? pathToFileURL(moduleName).href : moduleName);
const browser = process.env.BROWSER_CDP ? await chromium.connectOverCDP(process.env.BROWSER_CDP) : await chromium.launch();
const base = process.env.REFERENCE_URL || 'http://127.0.0.1:3000';
const output = process.env.EVIDENCE_DIR || join(dirname(fileURLToPath(import.meta.url)), '../.parity-evidence/replay-credits');
await mkdir(output, { recursive: true });
const tests = [];
async function ready(page, route) {
  const response = await page.goto(base + route, { waitUntil: 'domcontentloaded' });
  assert.equal(response.status(), 200);
  await page.locator('[data-reference-ready="true"]').waitFor();
  await page.evaluate(() => document.fonts.ready);
}
async function test(name, run, width = 1440) {
  const context = await browser.newContext({ viewport: { width, height: width < 641 ? 844 : 904 }, reducedMotion: 'reduce' });
  const page = await context.newPage(); page.setDefaultTimeout(8000);
  const errors = []; page.on('pageerror', error => errors.push(String(error)));
  const result = { name, width, status: 'passed' };
  try { await run(page, context); assert.deepEqual(errors, []); }
  catch (error) { result.status = 'failed'; result.error = String(error); await page.screenshot({ path: join(output, name + '-error.png') }); }
  tests.push(result); console.log(name, result.status, result.error ?? '');
  await context.close();
}
await test('replay-month-switch-and-reload', async page => {
  await ready(page, '/?view=replay');
  await expect(page.getByRole('tabpanel')).toContainText('July Replay is still in progress');
  await page.getByRole('tab', { name: 'May', exact: true }).click();
  await expect(page.getByRole('tabpanel')).toContainText('3,834 minutes');
  await expect(page.getByRole('button', { name: '4. RÜFÜS DU SOL, 144 minutes', exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('tab', { name: 'May', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('tab', { name: 'May', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Jun', exact: true })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('not included');
  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: 'Jul', exact: true })).toBeFocused();
});
await test('replay-milestone-detail-and-return', async page => {
  await ready(page, '/?view=replay&month=May');
  await page.getByRole('button', { name: '500 Artists Played, reached 12 March', exact: true }).click();
  await expect(page.locator('main')).toContainText('Reached 12 March');
  await expect(page.getByRole('heading', { name: 'Artists Played', exact: true }).first()).toBeVisible();
  await page.getByRole('button', { name: 'Back to milestones', exact: true }).click();
  await page.getByRole('button', { name: '25,000 Minutes, in progress', exact: true }).click();
  await expect(page.locator('main')).toContainText('In Progress');
  await page.getByRole('button', { name: 'Back to milestones', exact: true }).click();
  await page.getByRole('button', { name: 'Back to Replay', exact: true }).click();
  await expect(page.getByRole('tabpanel')).toContainText('3,834 minutes');
});
await test('replay-song-queue-and-local-media-gate', async page => {
  await ready(page, '/?view=replay&month=May');
  await page.getByRole('button', { name: 'More actions for Repeat It', exact: true }).click();
  await page.getByRole('menuitem', { name: 'Play Next', exact: true }).click();
  await page.getByRole('button', { name: 'Up Next', exact: true }).click();
  await expect(page.locator('.player-panel')).toContainText('Repeat It');
  await page.getByRole('button', { name: 'Close player panel', exact: true }).focus();
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: 'Play Repeat It', exact: true }).click();
  await expect(page.locator('.floating-player')).toHaveAttribute('data-snapshot', 'true');
  assert.equal(await page.locator('audio').evaluate(audio => audio.paused), true);
  await page.keyboard.press('Shift+M');
  await expect(page.getByRole('dialog', { name: 'Play local media', exact: true })).toBeVisible();
});
await test('credits-content-favourite-and-lyrics', async page => {
  await ready(page, '/?view=credits&category=album-2');
  await expect(page.locator('main')).toContainText('Sterling Mitchell Laws');
  await expect(page.locator('main')).toContainText("Prash 'Engine-Earz' Mistry");
  const button = page.getByRole('button', { name: 'Favourite credited song', exact: true });
  const original = await button.getAttribute('aria-pressed');
  await button.click(); await expect(button).not.toHaveAttribute('aria-pressed', original);
  await page.getByRole('button', { name: 'View Full Lyrics', exact: true }).click();
  await expect(page.locator('.expanded-player')).toBeVisible();
  await page.getByRole('button', { name: 'Close expanded player', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'stupid song', exact: true })).toBeVisible();
});
await test('credits-do-not-substitute-another-recording', async page => {
  await ready(page, '/?view=credits&category=replay-1');
  await expect(page.getByRole('heading', { name: 'Repeat It', exact: true })).toBeVisible();
  await expect(page.locator('main')).toContainText('does not include credits for this song');
  await expect(page.locator('main')).not.toContainText('Sterling Mitchell Laws');
});
await test('artist-content-navigation-and-preference', async page => {
  await ready(page, '/?view=artist');
  await expect(page.getByRole('heading', { name: 'Artist Playlists', exact: true })).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'All Upcoming Concerts', exact: true })).toHaveCount(1);
  const favourite = page.getByRole('button', { name: 'Favourite Olivia Rodrigo', exact: true });
  const expected = await favourite.getAttribute('aria-pressed') === 'true' ? 'false' : 'true';
  await favourite.click(); await expect(favourite).toHaveAttribute('aria-pressed', expected);
  await page.reload(); await page.locator('[data-reference-ready="true"]').waitFor();
  await expect(favourite).toHaveAttribute('aria-pressed', expected);
  await page.getByRole('button', { name: 'Nearby Concerts', exact: true }).click();
  await expect(page.locator('.music-app')).toHaveAttribute('data-scene', 'nearby');
});
for (const width of [1264, 390]) await test(`containment-${width}`, async page => {
  await ready(page, '/');
  const main = page.locator('main');
  const rail = page.getByRole('region', { name: 'Featured music', exact: true });
  await rail.evaluate(el => { el.scrollLeft = el.scrollWidth; });
  await page.waitForTimeout(100);
  const geometry = await main.evaluate(el => ({ x: el.getBoundingClientRect().x, width: el.clientWidth, content: el.scrollWidth, left: el.scrollLeft, overflow: getComputedStyle(el).overflowX, document: document.documentElement.scrollWidth, viewport: innerWidth }));
  assert.equal(geometry.left, 0); assert.equal(geometry.width, geometry.content);
  assert.equal(geometry.document, geometry.viewport); assert.notEqual(geometry.overflow, 'visible');
  if (width > 640) assert.equal(geometry.x, 246);
  await ready(page, '/?view=replay&month=May');
  await expect(page.getByRole('button', { name: '1. ILLENIUM, 312 minutes', exact: true })).toBeVisible();
  assert.equal(await main.evaluate(el => el.scrollWidth <= el.clientWidth + 1), true);
}, width);
await writeFile(join(output, 'results.json'), JSON.stringify({ note: 'Behavior and containment checks; not full visual acceptance.', tests }, null, 2));
await browser.close();
process.exitCode = tests.some(test => test.status === 'failed') ? 1 : 0;
