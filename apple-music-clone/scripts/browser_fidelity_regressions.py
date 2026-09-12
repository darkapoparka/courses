"""Focused regressions for the demonstrated sidebar, library and menu defects."""
import json
import os
from pathlib import Path
from playwright.async_api import expect

BASE = os.environ.get('REFERENCE_URL', 'http://127.0.0.1:3000')
ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = json.loads((ROOT / 'reference/originals/flow-screen-map.json').read_text(encoding='utf-8'))
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
        scrollport = await page.locator('main').evaluate('(e)=>({width:e.getBoundingClientRect().width, client:e.clientWidth})')
        assert abs(scrollport['width'] - scrollport['client']) < 1, (width, scrollport)
        if width == 1440:
            art = await page.locator('.feature-card .music-art').first.bounding_box()
            assert art and art['width'] == 548 and art['height'] == 314, art
        # Hiding the platform scrollbar must not disable native keyboard/scroll access.
        await page.keyboard.press('Tab')
        await expect(page.get_by_role('link', name='Skip to content', exact=True)).to_be_focused()
        await page.keyboard.press('Enter')
        await expect(page.locator('main')).to_be_focused()
        await page.keyboard.press('PageDown')
        await page.wait_for_function('document.querySelector("main").scrollTop > 0')
        await page.keyboard.press('Control+Home')
        await page.wait_for_function('document.querySelector("main").scrollTop === 0')
        await page.mouse.move(width - 80, min(height - 120, 500))
        await page.mouse.wheel(0, 260)
        await page.wait_for_function('document.querySelector("main").scrollTop > 0')
        await page.keyboard.press('Control+Home')
        await page.wait_for_function('document.querySelector("main").scrollTop === 0')
        if width > 640:
            sidebar = await page.locator('.music-sidebar').bounding_box()
            assert sidebar and main['x'] >= sidebar['x'] + sidebar['width'], (width, main, sidebar)
            if width == 1440:
                assert sidebar == {'x': 8, 'y': 8, 'width': 232, 'height': 887}, sidebar
                navigation = page.get_by_role('navigation', name='Browse music', exact=True)
                for name, y in [('Search', 76), ('Home', 114), ('New', 152), ('Radio', 190)]:
                    row = navigation.get_by_role('button', name=name, exact=True)
                    box = await row.bounding_box()
                    assert box == {'x': 19, 'y': y, 'width': 209, 'height': 34}, (name, box)
                    assert (await row.locator('svg').bounding_box())['width'] == 19
                    assert (await row.locator('span').bounding_box())['x'] == 52
                material = await page.locator('.music-sidebar').evaluate('(e)=>({filter:getComputedStyle(e).backdropFilter, image:getComputedStyle(e).backgroundImage})')
                assert 'blur(16px)' in material['filter'], material
                assert material['image'] == 'none', material
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


async def video_transport_and_focus(page, context):
    await ready(page, '/screen/' + source('a4afd6e6'))
    slider = page.get_by_role('slider', name='Video position', exact=True)
    await expect(slider).to_have_value('6')
    await page.get_by_role('button', name='Pause video', exact=True).click()
    await slider.fill('40')
    await expect(page.get_by_label('Elapsed video time', exact=True)).to_have_text('0:40')
    await page.get_by_role('button', name='Forward 10 seconds', exact=True).click()
    await expect(slider).to_have_value('50')
    await page.get_by_role('button', name='Back 10 seconds', exact=True).click()
    await expect(slider).to_have_value('40')
    await slider.fill('2')
    await page.get_by_role('button', name='Back 10 seconds', exact=True).click()
    await expect(slider).to_have_value('0')
    await slider.fill('223')
    await page.get_by_role('button', name='Forward 10 seconds', exact=True).click()
    await expect(slider).to_have_value('224')
    await page.get_by_role('slider', name='Video volume', exact=True).fill('0.25')
    await expect(page.get_by_role('slider', name='Video volume', exact=True)).to_have_value('0.25')
    assert await page.evaluate("document.querySelector('audio').paused"), 'Silent video controls must not start unrelated audio.'
    await page.get_by_role('button', name='Toggle video fullscreen', exact=True).click()
    await page.wait_for_function("document.fullscreenElement?.classList.contains('video-player')")
    await page.get_by_role('button', name='Toggle video fullscreen', exact=True).click()
    await page.wait_for_function('document.fullscreenElement === null')

    # Independently enter through a real artist-page control, not fixture jumps.
    await ready(page, '/screen/' + source('edae3407'))
    opener = page.get_by_role('button', name='Open Begged (Lyric Video)', exact=True)
    await opener.click()
    await expect(page.get_by_role('dialog', name='Video player', exact=True)).to_be_visible()
    assert await page.locator('.music-main').evaluate('(element) => element.inert')
    await page.get_by_role('button', name='Pause video', exact=True).click()
    await slider.fill('10')
    await page.get_by_role('button', name='Play video', exact=True).click()
    await expect(slider).not_to_have_value('10')
    await page.get_by_role('button', name='Pause video', exact=True).click()
    stopped = await slider.input_value()
    await page.wait_for_timeout(350)  # Verify the transport stays paused over a timer tick.
    await expect(slider).to_have_value(stopped)
    await page.get_by_role('button', name='Close video', exact=True).focus()
    await page.keyboard.press('Shift+Tab')
    await expect(page.get_by_role('button', name='Toggle video fullscreen', exact=True)).to_be_focused()
    await page.keyboard.press('Escape')
    await expect(page.get_by_role('dialog', name='Video player', exact=True)).to_have_count(0)
    assert not await page.locator('.music-main').evaluate('(element) => element.inert')
    await expect(opener).to_be_focused()


async def lyrics_panel_rail_geometry(page, context):
    await ready(page, '/screen/' + source('ee8db412'))

    async def check_geometry():
        await page.locator('.with-player-panel').wait_for()
        boxes = await page.locator('.feature-card .music-art').evaluate_all('(elements) => elements.slice(0, 2).map(element => element.getBoundingClientRect().toJSON())')
        assert len(boxes) == 2
        assert abs(boxes[0]['x'] - 286) < .01 and abs(boxes[0]['width'] - 406) < .01, boxes
        assert abs(boxes[0]['height'] - 233) < .01 and abs(boxes[1]['x'] - 710) < .01, boxes

    await check_geometry()
    toggle = page.get_by_role('button', name='Show lyrics', exact=True)
    await toggle.click()
    await expect(toggle).to_have_attribute('aria-pressed', 'false')
    await toggle.click()
    await expect(toggle).to_have_attribute('aria-pressed', 'true')
    await check_geometry()  # Still correct after fixture source identity is cleared.


async def article_scroll_state(page, context):
    # Cold production opens must wait until the dialog has a scrollable layout.
    for _ in range(3):
        await ready(page, '/screen/' + source('9b43cccb'))
        body = page.get_by_label('Album editorial notes', exact=True)
        await expect(body).to_be_visible()
        box = await body.evaluate('(element) => ({top: element.scrollTop, max: element.scrollHeight - element.clientHeight})')
        assert box['max'] > 200 and abs(box['top'] - box['max']) < 1, box

    await ready(page, '/screen/' + source('b620e4ab'))
    await page.get_by_role('button', name='MORE', exact=True).click()
    body = page.get_by_label('Album editorial notes', exact=True)
    await expect(body).to_be_visible()
    assert await body.evaluate('(element) => element.scrollTop') == 0
    await body.focus()
    await page.keyboard.press('Control+End')
    await page.wait_for_function('''() => {
      const element = document.querySelector('[aria-label="Album editorial notes"]');
      return element && element.scrollTop > 200 && Math.abs(element.scrollTop - (element.scrollHeight - element.clientHeight)) < 1;
    }''')
    await page.keyboard.press('Escape')
    await expect(body).to_have_count(0)
