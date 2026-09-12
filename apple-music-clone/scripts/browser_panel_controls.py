"""Bounded real-control regressions, not visual or full-flow sign-offs."""
from pathlib import Path
import json
import os
from playwright.async_api import expect
from browser_live_fidelity import start, record
from qa_identity import APP

OUT = Path(os.environ.get('REFERENCE_OUTPUT', APP / '.parity-evidence/browser'))

async def album_hover_state(page, context):
    await start(page, 'b620e4ab')
    star = page.get_by_role('table', name='Album songs').get_by_role('row').filter(
        has=page.get_by_role('button', name='stupid song', exact=True)).locator('button[aria-pressed]')
    await expect(star).to_have_attribute('aria-pressed', 'false')
    await expect(star.locator('svg')).to_be_visible()
    assert await star.locator('svg').evaluate('e=>getComputedStyle(e).fill') == 'none'
    await page.mouse.move(700, 310)
    await expect(star.locator('svg')).to_be_hidden()
    await star.hover()
    await expect(star.locator('svg')).to_be_visible()
    await record(page, 'album-hover-state', 'b620e4ab', 'Real hover shows an unsaved outline star', move_pointer=False)
    await star.click()
    await page.mouse.move(700, 310)
    await expect(star).to_have_attribute('aria-pressed', 'true')
    await expect(star.locator('svg')).to_be_visible()
    assert await star.locator('svg').evaluate('e=>getComputedStyle(e).fill') != 'none'
    await star.click()
    await page.mouse.move(700, 310)
    await expect(star).to_have_attribute('aria-pressed', 'false')
    await expect(star.locator('svg')).to_be_hidden()

async def lyrics_anchor_controls(page, context):
    await start(page, 'ee8db412')
    verses = page.locator('.panel-lyric-viewport li')
    await verses.nth(0).get_by_role('button').click()
    await expect(verses.nth(0)).to_have_attribute('aria-current', 'true')
    box = await verses.nth(0).bounding_box()
    assert box and abs(box['y'] - 191) < 1, box
    await page.screenshot(path=str(OUT / 'lyrics-first-verse-control.png'), animations='disabled')
    await verses.nth(2).get_by_role('button').click()
    await expect(verses.nth(2)).to_have_attribute('aria-current', 'true')
    box = await verses.nth(2).bounding_box()
    assert box and abs(box['y'] - 191) < 1, box
    await expect(page.locator('.lyrics-panel')).to_have_attribute('data-catalog', 'legacy')
    assert await verses.nth(2).evaluate('e=>getComputedStyle(e).lineHeight') == '27px'
    await record(page, 'lyrics-anchor-controls', 'ee8db412', 'Seek first verse and return to the captured verse using real lyric buttons')

async def queue_editions(page, context):
    await start(page, '8f029018')
    queue = page.get_by_role('complementary', name='Up Next queue')
    shelf = page.locator('.viral-grid .song-row').filter(has=page.get_by_role('button', name='YUKON', exact=True))
    queued = queue.locator('.song-row').filter(has=page.get_by_role('button', name='YUKON', exact=True))
    shelf_style = await shelf.locator('.music-art').get_attribute('style')
    queue_style = await queued.locator('.music-art').get_attribute('style')
    assert shelf_style != queue_style, 'Discovery and queue editions were incorrectly merged'
    await expect(queue.locator('.queue-list .song-row')).to_have_count(12)
    await expect(queue.get_by_role('button', name='I Knew It, I Knew You (From "Toy Story 5")', exact=True)).to_be_visible()
    await page.get_by_role('button', name='Volume', exact=True).click()
    await expect(page.get_by_role('slider', name='Volume level')).to_be_visible()
    await page.get_by_role('button', name='Volume', exact=True).click()
    assert await shelf.locator('.music-art').get_attribute('style') == shelf_style
    assert await queued.locator('.music-art').get_attribute('style') == queue_style
    await expect(queue).to_have_attribute('data-catalog', 'queue')
    await record(page, 'queue-edition-persistence', '8f029018', 'Toggle Volume; retain distinct discovery and queue artwork editions')

async def panel_entry(page, panel, target, journey):
    await start(page, '1f9e170c')
    before = await page.locator('.feature-caption > button').all_text_contents()
    assert len(before) >= 3 and before[0] == 'Top 100: Singapore', before
    await record(page, journey, '1f9e170c', 'Initial recorded listening state')
    await page.get_by_role('button', name=panel, exact=True).click()
    await expect(page.locator('.player-panel')).to_be_visible()
    assert await page.locator('.feature-caption > button').all_text_contents() == before
    await record(page, journey, target, 'Open panel from recorded start without replacing the current catalog or library; endpoint parity remains unapproved')
    observation = {'journey': journey, 'target': target, 'catalog': await page.locator('.capture-discovery').get_attribute('data-catalog'),
                   'features': before, 'queueRows': await page.locator('.queue-list .song-row').count(),
                   'visualAcceptance': False, 'remaining': 'Recorded endpoint uses a different catalog/library snapshot; inspect the continuous capture rather than treating the fixture render as this flow.'}
    (OUT / (journey + '-observation.json')).write_text(json.dumps(observation, indent=2), encoding='utf-8')

async def lyrics_entry(page, context):
    await panel_entry(page, 'Show lyrics', 'ee8db412', 'bc0ba8f1-lyrics-entry')

async def queue_entry(page, context):
    await panel_entry(page, 'Up Next', '8f029018', 'e0a0f93e-queue-entry')

CASES = [('album-hover-state', album_hover_state), ('lyrics-anchor-controls', lyrics_anchor_controls),
         ('queue-edition-persistence', queue_editions), ('lyrics-entry-session-integrity', lyrics_entry),
         ('queue-entry-session-integrity', queue_entry)]
