"""Focused regressions for the demonstrated sidebar, library and menu defects."""
import json
import os
from pathlib import Path
from playwright.async_api import expect

BASE = os.environ.get('REFERENCE_URL', 'http://127.0.0.1:3000')
ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = json.loads((ROOT / 'reference/originals/flow-screen-map.json').read_text())
IDS = {s['screenId'] for f in ARCHIVE['flows'] for s in f['steps']}

def source(prefix):
    return next(s for s in IDS if s.startswith(prefix))

async def ready(page, path='/'):
    response = await page.goto(BASE + path, wait_until='networkidle')
    assert response and response.status == 200, (path, response.status if response else None)
    await page.locator('[data-reference-ready="true"]').wait_for()
    await page.evaluate('document.fonts.ready')

async def sidebar_and_rails(page, context):
    for width, height in [(1440,903), (1264,700), (1920,1080), (1024,768), (820,900), (390,844)]:
        await page.set_viewport_size({'width':width,'height':height})
        await ready(page)
        main = await page.locator('.music-main').bounding_box()
        first = await page.locator('.feature-card').first.bounding_box()
        rail = page.locator('.feature-rail .music-rail')
        assert main and first and first['x'] >= main['x'], (width, main, first)
        assert await rail.evaluate('(e)=>e.scrollLeft') == 0, width
        if width > 640:
            sidebar = await page.locator('.music-sidebar').bounding_box()
            assert sidebar and main['x'] >= sidebar['x'] + sidebar['width'], (width, main, sidebar)
            await page.locator('.feature-rail').hover()
            await page.get_by_role('button', name='Next Featured music', exact=True).click()
            await expect(page.get_by_role('button', name='Previous Featured music', exact=True)).to_be_enabled()
            assert await rail.evaluate('(e)=>e.scrollLeft') > 0
            await page.get_by_role('button', name='Previous Featured music', exact=True).click()
            await expect(page.get_by_role('button', name='Previous Featured music', exact=True, include_hidden=True)).to_be_disabled()
            assert await rail.evaluate('(e)=>e.scrollLeft') == 0
        assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth')

async def library_artists_and_videos(page, context):
    await ready(page, '/screen/' + source('0df0d2a2'))
    box = await page.locator('.library-artist-content .card-art-button').bounding_box()
    assert box and abs(box['x'] - 514) < 1 and abs(box['y'] - 111) < 1 and abs(box['width'] - 208) < 2, box
    await page.get_by_role('navigation', name='Library artists').get_by_role('button', name='Olivia Rodrigo', exact=False).click()
    assert await page.locator('.library-artist-content .media-card').count() == 2
    await page.get_by_role('button', name='Favourite Olivia Rodrigo', exact=True).click()
    await expect(page.get_by_role('button', name='Favourite Olivia Rodrigo', exact=True)).to_have_attribute('aria-pressed','false')
    await ready(page, '/screen/' + source('4e857921'))
    titles = await page.locator('.library-grid .card-title').all_text_contents()
    assert titles == ['Begged (Lyric Video)', 'BIRDS OF A FEATHER', 'You Need To Calm Down'], titles
    box = await page.locator('.library-grid .card-art-button').first.bounding_box()
    assert box and abs(box['width']/box['height'] - 16/9) < .02, box

async def playlist_suggestion_flow(page, context):
    await ready(page, '/screen/' + source('a573d1ab'))
    assert await page.locator('.track-table .table-song-title').all_text_contents() == ['stupid song','the cure','drivers license']
    await page.get_by_role('button', name='Add vampire to Emotional Songs', exact=True).click()
    assert await page.locator('.track-table .table-song-title').all_text_contents() == ['stupid song','the cure','drivers license','vampire']
    await expect(page.locator('.playlist-count')).to_have_text('4 songs, 16 minutes')
    await expect(page.get_by_role('button', name="Add Don't Start Now to Emotional Songs", exact=True)).to_be_visible()
    before = await page.locator('.playlist-suggestions .song-title').all_text_contents()
    await page.get_by_role('button', name='Refresh', exact=True).click()
    assert await page.locator('.playlist-suggestions .song-title').all_text_contents() != before
    await ready(page, '/screen/' + source('bde65d33'))
    assert await page.locator('.track-table .table-song-title').all_text_contents() == ['BIRDS OF A FEATHER','deja vu','WILDFLOWER','stupid song']

async def menu_flyout_and_dialog(page, context):
    await ready(page, '/?view=songs')
    opener = page.get_by_role('button', name='More actions for stupid song', exact=True)
    await opener.click()
    add = page.get_by_role('menuitem', name='Add to Playlist', exact=True)
    await add.focus()
    await page.keyboard.press('ArrowRight')
    await expect(page.get_by_role('menu', name='Add to playlist', exact=True)).to_be_visible()
    await expect(page.get_by_role('menuitem', name='New Playlist…', exact=True)).to_be_focused()
    await page.keyboard.press('ArrowLeft')
    await expect(add).to_be_focused()
    await page.keyboard.press('ArrowRight')
    await page.get_by_role('menuitem', name='New Playlist…', exact=True).click()
    box = await page.get_by_role('dialog').bounding_box()
    assert box and abs(box['width'] - 296) < 1 and abs(box['height'] - 246) < 1, box
    await expect(page.get_by_role('button', name='Create', exact=True)).to_be_disabled()
    await page.get_by_label('Playlist name', exact=True).fill('Fidelity test')
    await page.get_by_role('button', name='Create', exact=True).click()
    await page.get_by_role('navigation', name='Playlists', exact=True).get_by_role('button', name='Fidelity test', exact=True).click()
    assert await page.locator('.track-table .table-song-title').all_text_contents() == ['stupid song']
