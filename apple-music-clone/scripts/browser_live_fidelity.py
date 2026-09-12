"""Real-control journeys. Captured routes are used only for the initial state."""
from hashlib import sha256
import json
import os
import re
from pathlib import Path
from playwright.async_api import expect
from qa_identity import APP, reference_viewport

BASE = os.environ.get('REFERENCE_URL', 'http://127.0.0.1:3000')
OUT = Path(os.environ.get('REFERENCE_OUTPUT', APP / '.parity-evidence/browser')) / 'journeys'
ARCHIVE = json.loads((APP / 'reference/originals/flow-screen-map.json').read_text(encoding='utf-8'))
IDS = {step['screenId'] for flow in ARCHIVE['flows'] for step in flow['steps']}

def source(prefix):
    matches = [sid for sid in IDS if sid.startswith(prefix)]
    assert len(matches) == 1, prefix
    return matches[0]

async def start(page, prefix):
    await page.set_viewport_size(reference_viewport(source(prefix)))
    response = await page.goto(BASE + '/screen/' + source(prefix), wait_until='networkidle')
    assert response and response.status == 200
    await page.locator('[data-reference-ready=true]').wait_for()
    await page.evaluate('document.fonts.ready')

async def record(page, journey, prefix, action, *, move_pointer=True):
    """Record an observed state; this does not grant visual acceptance."""
    path = OUT / journey
    path.mkdir(parents=True, exist_ok=True)
    await page.wait_for_load_state('networkidle')
    sid = source(prefix)
    assert page.viewport_size == reference_viewport(sid), (journey, sid, page.viewport_size)
    if move_pointer:
        await page.mouse.move(page.viewport_size['width'] - 1, page.viewport_size['height'] - 1)
    log = path / 'steps.jsonl'
    ordinal = len(log.read_text(encoding='utf-8').splitlines()) + 1 if log.exists() else 1
    shot = path / f'{ordinal:02d}-{sid}.png'
    assert not shot.exists(), f'Refusing to overwrite journey evidence: {shot}'
    await page.screenshot(path=str(shot), animations='disabled')
    evidence = {'ordinal': ordinal, 'screenshot': shot.name, 'screen': sid, 'action': action, 'url': page.url,
                'viewport': page.viewport_size, 'renderSha256': sha256(shot.read_bytes()).hexdigest(),
                'sourceSha256': sha256((APP / 'reference/originals' / f'{sid}.webp').read_bytes()).hexdigest()}
    with (path / 'steps.jsonl').open('a', encoding='utf-8') as output:
        output.write(json.dumps(evidence, ensure_ascii=False) + '\n')

async def album_copy_link(page, context):
    await context.grant_permissions(['clipboard-read', 'clipboard-write'])
    await start(page, 'b620e4ab')
    await page.get_by_role('button', name='Favourite stupid song', exact=True).hover()
    await record(page, '8c9a97bc-copy-album-link', 'b620e4ab', 'Initial album detail; hover the unsaved song star', move_pointer=False)
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
    await page.get_by_role('button', name='Favourite stupid song', exact=True).hover()
    await record(page, '1319943e-share-album', 'b620e4ab', 'Initial album detail; hover the unsaved song star', move_pointer=False)
    opener = page.get_by_role('button', name='Share you seem pretty sad for a girl so in love', exact=True)
    await opener.click()
    menu = page.get_by_role('menu', name='share actions', exact=True)
    await expect(menu).to_have_class(re.compile('system-share-menu'))
    assert await menu.get_by_role('menuitem').all_text_contents() == ['Add to Reading List', 'AirDrop', 'Mail', 'Messages', 'Notes', 'Open in News', 'Reminders', 'Freeform', 'Journal', 'Copy', 'Edit Extensions…']
    box = await menu.bounding_box()
    assert box and abs(box['x'] - 1200) < 1 and abs(box['y'] - 38) < 1, box
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
    await expect(page.locator('.schedule-entry').first.locator('small')).to_have_text('LIVE · 08:00–10:00')
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


async def menu_input_modality(page, context):
    await start(page, 'b620e4ab')
    opener = page.get_by_role('button', name='Share you seem pretty sad for a girl so in love', exact=True)
    await opener.click()
    menu = page.get_by_role('menu', name='share actions', exact=True)
    first = menu.get_by_role('menuitem', name='Add to Reading List', exact=True)
    await expect(menu).to_be_focused()
    await expect(first).not_to_be_focused()
    await page.keyboard.press('ArrowUp')
    await expect(menu.get_by_role('menuitem', name='Edit Extensions…', exact=True)).to_be_focused()
    await page.keyboard.press('Home')
    await expect(first).to_be_focused()
    await page.keyboard.press('Escape')
    await expect(opener).to_be_focused()
    await opener.press('Enter')
    await expect(first).to_be_focused()
    await page.keyboard.press('ArrowDown')
    await expect(menu.get_by_role('menuitem', name='AirDrop', exact=True)).to_be_focused()
    await page.keyboard.press('Escape')
    await expect(opener).to_be_focused()

CASES.append(('menu-pointer-keyboard-modality', menu_input_modality))


async def home_rail_artwork_persistence(page, context):
    await start(page, 'a917d88f')
    rail = page.get_by_role('region', name='Top picks', exact=True)
    await page.get_by_role('button', name='Next Top picks', exact=True).click()
    await expect(page.locator('.capture-home')).to_have_attribute('data-home-scrolled', 'true')
    new_music = rail.get_by_role('button', name='New Music', exact=True)
    await expect(new_music.locator('[data-art-source]')).to_have_attribute('data-art-source', source('d5173715'))
    await expect(page.get_by_role('button', name='Next Top picks', exact=True, include_hidden=True)).to_be_disabled()
    assert abs((await new_music.bounding_box())['x'] - 286) < 1
    await record(page, 'home-artwork', 'd5173715', 'Next Top picks via the live carousel')
    await page.get_by_role('button', name='Volume', exact=True).click()
    assert await page.locator('.music-app').get_attribute('data-source') is None
    await expect(new_music.locator('[data-art-source]')).to_have_attribute('data-art-source', source('d5173715'))
    assert 'blur(16px)' in await page.locator('.music-sidebar').evaluate('(e)=>getComputedStyle(e).backdropFilter')
    await page.keyboard.press('Escape')
    await page.get_by_role('button', name='Previous Top picks', exact=True).click()
    await expect(page.locator('.capture-home')).not_to_have_attribute('data-home-scrolled', 'true')
    assert await rail.evaluate('(e)=>e.scrollLeft') == 0
    assert abs((await rail.get_by_role('button', name='Love', exact=True).bounding_box())['x'] - 286) < 1
    assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth')
    await page.get_by_role('button', name='Account menu', exact=True).click()
    await page.keyboard.press('Escape')
    await page.get_by_role('button', name='Next Top picks', exact=True).click()
    await expect(new_music.locator('[data-art-source]')).to_have_attribute('data-art-source', source('d5173715'))

CASES.append(('home-rail-artwork-persistence', home_rail_artwork_persistence))


async def clear_recorded_queue(page, context):
    await start(page, '8f029018')
    await record(page, '7f504621-clear-queue', '8f029018', 'Initial populated queue')
    queue = page.get_by_role('complementary', name='Up Next queue', exact=True)
    assert await queue.locator('.queue-list .song-row').count() == 12
    await queue.get_by_role('button', name='Clear', exact=True).click()
    await expect(queue.get_by_text('No upcoming songs', exact=True)).to_be_visible()
    await expect(queue.locator('.queue-list .song-row')).to_have_count(0)
    await expect(queue.get_by_role('button', name='Clear', exact=True)).to_have_count(0)
    await record(page, '7f504621-clear-queue', 'de48a956', 'Clear using the live queue control')

async def recorded_autoplay(page, context):
    await start(page, '8f029018')
    await record(page, 'fc3dbfae-autoplay', '8f029018', 'Initial populated queue')
    queue = page.get_by_role('complementary', name='Up Next queue', exact=True)
    await queue.get_by_role('button', name='Autoplay', exact=True).click()
    await expect(queue.get_by_role('button', name='Autoplay', exact=True)).to_have_attribute('aria-pressed', 'true')
    await expect(queue.get_by_text('Similar music will keep playing', exact=True)).to_be_visible()
    assert await queue.locator('.autoplay-setting .song-row').count() == 3
    await expect(page.locator('.capture-discovery')).to_have_attribute('data-catalog', 'queue')
    await record(page, 'fc3dbfae-autoplay', '4811dde3', 'Enable autoplay with the real toggle')
    await queue.get_by_role('button', name='Autoplay', exact=True).click()
    await expect(queue.locator('.autoplay-setting')).to_have_count(0)

async def lyrics_catalog_persistence(page, context):
    await start(page, 'ee8db412')
    panel = page.get_by_role('complementary', name='Lyrics', exact=True)
    titles = await page.locator('.viral-grid .song-title').all_text_contents()
    covers = await page.locator('#new-this-week .card-art-button > .music-art').evaluate_all('(items)=>items.map(e=>[e.dataset.artSource,e.dataset.artPartial])')
    before = await panel.locator('[aria-current=true]').bounding_box()
    await page.get_by_role('button', name='Volume', exact=True).click()
    await page.keyboard.press('Escape')
    assert await page.locator('.music-app').get_attribute('data-source') is None
    await expect(panel).to_have_attribute('data-catalog', 'legacy')
    assert await page.locator('.viral-grid .song-title').all_text_contents() == titles
    assert 'blur(15px)' in await panel.evaluate('(e)=>getComputedStyle(e).backdropFilter')
    assert 'blur(24px)' in await page.locator('.floating-player').evaluate('(e)=>getComputedStyle(e).backdropFilter')
    await page.get_by_role('button', name='Show lyrics', exact=True).click()
    await expect(panel).to_have_count(0)
    await page.get_by_role('button', name='Show lyrics', exact=True).click()
    await expect(panel).to_be_visible()
    after = await panel.locator('[aria-current=true]').bounding_box()
    assert before and after and abs(before['y'] - after['y']) <= 1, (before, after)
    assert await page.locator('.viral-grid .song-title').all_text_contents() == titles
    assert await page.locator('#new-this-week .card-art-button > .music-art').evaluate_all('(items)=>items.map(e=>[e.dataset.artSource,e.dataset.artPartial])') == covers

async def approved_preview_covers(page, context):
    resources = json.loads((APP / 'lib/cover-resources.json').read_text(encoding='utf-8'))
    for key, item in resources.items():
        response = await context.request.get(BASE + '/reference-assets/' + key)
        assert response.status == 200, (key, response.status)
        body = await response.body()
        assert len(body) == item['bytes'] and sha256(body).hexdigest() == item['sha256'], key
        assert response.headers.get('cache-control') == 'private, no-store'
        assert response.headers.get('content-type', '').startswith('image/webp')
        assert response.headers.get('x-content-type-options') == 'nosniff'
    for key in ['cover-unknown', '__proto__', 'constructor']:
        response = await context.request.get(BASE + '/reference-assets/' + key)
        assert response.status == 404, (key, response.status)
    await start(page, 'ee8db412')
    art = page.locator('[data-art-source="cover-better-broken"]').first
    await expect(art).to_be_visible()
    assert await art.evaluate('(e)=>getComputedStyle(e).backgroundSize') == '100% 100%'
    assert 'NaN' not in (await art.get_attribute('style'))

CASES += [('recorded-clear-queue', clear_recorded_queue),
          ('recorded-autoplay', recorded_autoplay),
          ('lyrics-catalog-persistence', lyrics_catalog_persistence),
          ('approved-preview-covers', approved_preview_covers)]
