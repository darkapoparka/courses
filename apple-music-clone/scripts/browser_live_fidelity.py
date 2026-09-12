"""Real-control journeys. Captured routes are used only for the initial state."""
from hashlib import sha256
import json
import os
import re
from pathlib import Path
from playwright.async_api import expect
from qa_identity import APP

BASE = os.environ.get('REFERENCE_URL', 'http://127.0.0.1:3000')
OUT = Path(os.environ.get('REFERENCE_OUTPUT', APP / '.parity-evidence/browser')) / 'journeys'
ARCHIVE = json.loads((APP / 'reference/originals/flow-screen-map.json').read_text(encoding='utf-8'))
IDS = {step['screenId'] for flow in ARCHIVE['flows'] for step in flow['steps']}

def source(prefix):
    matches = [sid for sid in IDS if sid.startswith(prefix)]
    assert len(matches) == 1, prefix
    return matches[0]

async def start(page, prefix):
    response = await page.goto(BASE + '/screen/' + source(prefix), wait_until='networkidle')
    assert response and response.status == 200
    await page.locator('[data-reference-ready=true]').wait_for()
    await page.evaluate('document.fonts.ready')

async def record(page, journey, prefix, action):
    """Record an observed state; this does not grant visual acceptance."""
    path = OUT / journey
    path.mkdir(parents=True, exist_ok=True)
    await page.wait_for_load_state('networkidle')
    await page.mouse.move(1439, 902)
    sid = source(prefix)
    shot = path / f'{sid}.png'
    await page.screenshot(path=str(shot), animations='disabled')
    evidence = {'screen': sid, 'action': action, 'url': page.url,
                'viewport': page.viewport_size, 'renderSha256': sha256(shot.read_bytes()).hexdigest(),
                'sourceSha256': sha256((APP / 'reference/originals' / f'{sid}.webp').read_bytes()).hexdigest()}
    with (path / 'steps.jsonl').open('a', encoding='utf-8') as output:
        output.write(json.dumps(evidence, ensure_ascii=False) + '\n')

async def album_copy_link(page, context):
    await context.grant_permissions(['clipboard-read', 'clipboard-write'])
    await start(page, 'b620e4ab')
    await record(page, '8c9a97bc-copy-album-link', 'b620e4ab', 'Initial album detail')
    await page.get_by_role('button', name='More actions for you seem pretty sad for a girl so in love', exact=True).click()
    menu = page.get_by_role('menu', name='album actions', exact=True)
    await expect(menu.get_by_role('menuitem', name='Favourite', exact=True)).to_be_visible()
    box = await menu.bounding_box()
    assert box and abs(box['x'] - 1243) < 1 and abs(box['y'] - 22) < 1, box
    await record(page, '8c9a97bc-copy-album-link', 'ef86b595', 'Open album overflow')
    await menu.get_by_role('menuitem', name='Copy Link', exact=True).click()
    await expect(menu.get_by_role('menuitem', name='Link Copied', exact=True)).to_be_visible()
    link = await page.evaluate('navigator.clipboard.readText()')
    assert link.startswith(BASE + '/?view=album&category=') and 'track=' not in link, link
    await record(page, '8c9a97bc-copy-album-link', 'eca1baa1', 'Copy link; observe inline confirmation')
    await page.keyboard.press('Escape')
    await expect(menu).to_have_count(0)
    await expect(page.get_by_role('button', name='More actions for you seem pretty sad for a girl so in love', exact=True)).to_be_focused()

async def album_share_sheet(page, context):
    await start(page, 'b620e4ab')
    await record(page, '1319943e-share-album', 'b620e4ab', 'Initial album detail')
    opener = page.get_by_role('button', name='Share you seem pretty sad for a girl so in love', exact=True)
    await opener.click()
    menu = page.get_by_role('menu', name='share actions', exact=True)
    await expect(menu).to_have_class(re.compile('system-share-menu'))
    assert await menu.get_by_role('menuitem').all_text_contents() == ['Add to Reading List', 'AirDrop', 'Mail', 'Messages', 'Notes', 'Open in News', 'Reminders', 'Freeform', 'Journal', 'Copy', 'Edit Extensions…']
    box = await menu.bounding_box()
    assert box and abs(box['x'] - 1208) < 1 and abs(box['y'] - 38) < 1, box
    await record(page, '1319943e-share-album', '56c2e39a', 'Open album share sheet')
    await page.keyboard.press('Escape')
    await expect(menu).to_have_count(0)
    await expect(opener).to_be_focused()

async def radio_schedule(page, context):
    await start(page, 'a9992e55')
    await record(page, '4239264b-radio-schedule', 'a9992e55', 'Initial selected Hits station')
    await page.get_by_role('button', name='Apple Music Hits options', exact=True).click()
    menu = page.get_by_role('menu', name='station actions', exact=True)
    assert await menu.get_by_role('menuitem').all_text_contents() == ['View Schedule', 'Share', 'Copy Link']
    await expect(page.locator('.radio-page')).to_have_attribute('data-edition', 'hits')
    box = await menu.bounding_box()
    assert box and abs(box['x'] - 618) < 2 and abs(box['y'] - 288) < 2, box
    await record(page, '4239264b-radio-schedule', '37575452', 'Open station overflow')
    await menu.get_by_role('menuitem', name='View Schedule', exact=True).click()
    await expect(page.get_by_role('heading', name='Music Hits Schedule', exact=False)).to_be_visible()
    assert await page.locator('.schedule-entry').count() == 13
    await record(page, '4239264b-radio-schedule', 'f49fce21', 'Open full station schedule')

async def radio_live_playback(page, context):
    # The first still in this flow has an older editorial catalog. This test
    # starts at the selected-station state; it is not full-flow sign-off.
    await start(page, 'a9992e55')
    original_titles = await page.locator('.episode > div > button').all_text_contents()
    await page.get_by_role('button', name='Listen to Apple Music Hits', exact=True).click()
    await expect(page.locator('.now-playing')).to_contain_text('Gorgeous')
    await expect(page.get_by_role('button', name='Stop live radio', exact=True)).to_be_visible()
    assert await page.locator('.episode > div > button').all_text_contents() == original_titles
    await record(page, 'radio-playback-segment', '47a07865', 'Start selected station')
    await page.get_by_role('button', name='Expand Apple Music Hits', exact=True).click()
    await expect(page.locator('.expanded-player')).to_have_class(re.compile('radio-reference'))
    await expect(page.locator('.expanded-meta')).to_contain_text('Doja Cat — Vie — Apple Music Hits')
    art = page.locator('.expanded-left > .music-art')
    await expect(art).to_have_attribute('data-art-source', source('7bd2ef54'))
    await expect(page.get_by_role('button', name='Next station item', exact=True)).to_be_disabled()
    await expect(page.get_by_role('button', name='Previous station item', exact=True)).to_be_disabled()
    await record(page, 'radio-playback-segment', '7bd2ef54', 'Expand the playing station')
    await page.get_by_role('button', name='Stop live radio', exact=True).click()
    await expect(page.get_by_role('button', name='Play live radio', exact=True)).to_be_visible()
    await page.get_by_role('button', name='Play live radio', exact=True).click()
    await expect(page.get_by_role('button', name='Stop live radio', exact=True)).to_be_visible()
    await page.get_by_role('button', name='Close expanded player', exact=True).click()
    await expect(page.locator('.now-playing')).to_contain_text('Gorgeous')
    await expect(page.locator('.radio-page')).to_have_attribute('data-edition', 'hits')
    assert await page.evaluate('document.querySelector("audio").paused'), 'Reference radio must not stream media'

async def expanded_menu_state(page, context):
    await start(page, 'c939c9b8')
    opener = page.get_by_role('button', name='More song actions', exact=True)
    await opener.click()
    await page.keyboard.press('Escape')
    await expect(page.locator('.expanded-player')).to_be_visible()
    await expect(page.get_by_role('menu')).to_have_count(0)
    await expect(opener).to_be_focused()
    await opener.click()
    await page.get_by_role('menuitem', name='Add to Library', exact=True).click()
    await expect(page.get_by_role('menuitem', name='Delete from Library', exact=True)).to_be_visible()
    await expect(page.get_by_role('menuitem', name='Pin Song', exact=True)).to_be_visible()
    await page.get_by_role('menuitem', name='Delete from Library', exact=True).click()
    await expect(page.get_by_role('menuitem', name='Add to Library', exact=True)).to_be_visible()
    await page.keyboard.press('Escape')
    await expect(page.locator('.expanded-player')).to_be_visible()

async def album_favourite_isolation(page, context):
    await page.goto(BASE + '/?view=album', wait_until='networkidle')
    await page.locator('[data-reference-ready=true]').wait_for()
    song = page.get_by_role('button', name='Unfavourite stupid song', exact=True)
    await expect(song).to_have_attribute('aria-pressed', 'true')
    opener = page.get_by_role('button', name='More actions for you seem pretty sad for a girl so in love', exact=True)
    await opener.click()
    await page.get_by_role('menuitem', name='Favourite', exact=True).click()
    await expect(song).to_have_attribute('aria-pressed', 'true')
    await page.reload(wait_until='networkidle')
    await page.locator('[data-reference-ready=true]').wait_for()
    await opener.click()
    await expect(page.get_by_role('menuitem', name='Undo Favourite', exact=True)).to_be_visible()
    await page.get_by_role('menuitem', name='Undo Favourite', exact=True).click()
    await expect(song).to_have_attribute('aria-pressed', 'true')

CASES = [('recorded-album-copy-link', album_copy_link),
         ('recorded-album-share-sheet', album_share_sheet),
         ('recorded-radio-schedule', radio_schedule),
         ('radio-live-playback', radio_live_playback),
         ('expanded-menu-state', expanded_menu_state),
         ('album-favourite-isolation', album_favourite_isolation)]
