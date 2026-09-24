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

async def wait_for_visual_assets(page):
    """Wait for visible CSS artwork to load and decode before evidence capture."""
    hero = page.locator('video[data-reference-hero-resource]')
    if await hero.count():
        await expect(hero).to_have_attribute('data-reference-hero-ready', 'true', timeout=30000)
        await expect(page.get_by_role('heading', name='Olivia Rodrigo', exact=True)).to_be_visible(timeout=30000)
        await expect(page.get_by_role('button', name='Nearby Concerts', exact=True)).to_be_visible(timeout=30000)
        await expect(page.get_by_role('button', name='More artist actions', exact=True)).to_be_visible(timeout=30000)
    await page.evaluate(r"""async () => {
      const visibleArtwork = [...document.querySelectorAll('.music-art')].filter(element => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      });
      const urls = new Set();
      for (const element of visibleArtwork) {
        const background = getComputedStyle(element).backgroundImage;
        for (const match of background.matchAll(/url\((['"]?)(.*?)\1\)/g)) {
          if (match[2]) urls.add(new URL(match[2], document.baseURI).href);
        }
      }
      await Promise.all([...urls].map(url => new Promise((resolve, reject) => {
        const image = new Image();
        const finish = async () => {
          try {
            if (image.decode) await image.decode();
            if (!image.naturalWidth || !image.naturalHeight) throw new Error(`Decoded artwork is empty: ${url}`);
            resolve();
          } catch (error) { reject(error); }
        };
        image.onload = finish;
        image.onerror = () => reject(new Error(`Artwork failed to load: ${url}`));
        image.src = url;
        if (image.complete) void finish();
      })));
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }""")

async def start(page, prefix):
    await page.set_viewport_size(reference_viewport(source(prefix)))
    response = await page.goto(BASE + '/screen/' + source(prefix), wait_until='networkidle')
    assert response and response.status == 200
    await page.locator('div[data-reference-ready="true"]:not(.music-app)').wait_for()
    await page.evaluate('document.fonts.ready')
    await wait_for_visual_assets(page)

async def record(page, journey, prefix, action, *, move_pointer=True, wait_for_network_idle=True):
    """Record an observed state; this does not grant visual acceptance."""
    path = OUT / journey
    path.mkdir(parents=True, exist_ok=True)
    if wait_for_network_idle:
        await page.wait_for_load_state('networkidle')
    sid = source(prefix)
    assert page.viewport_size == reference_viewport(sid), (journey, sid, page.viewport_size)
    if move_pointer:
        await page.mouse.move(page.viewport_size['width'] - 1, page.viewport_size['height'] - 1)
    await wait_for_visual_assets(page)
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

async def scroll_checkout_to(page, selector, top):
    host = page.locator('.checkout-scroll')
    target = page.locator(selector)
    await host.hover()
    for _ in range(20):
        current = await target.evaluate('(element) => element.getBoundingClientRect().top - element.closest(".checkout-scroll").getBoundingClientRect().top')
        difference = current - top
        if abs(difference) <= 1:
            return
        await page.mouse.wheel(0, max(-120, min(120, difference)))
        await page.wait_for_timeout(40)
    raise AssertionError(f'Wheel scrolling did not place {selector} at {top}px (last offset {current}px)')


async def album_copy_link(page, context):
    await context.grant_permissions(['clipboard-read', 'clipboard-write'])
    await start(page, 'b620e4ab')
    await page.get_by_role('button', name='Favourite stupid song', exact=True).hover()
    unavailable = page.locator('[role=row][data-unavailable=true]')
    assert await unavailable.count() == 4
    assert await unavailable.locator('.icon-button').count() == 0
    await record(page, '8c9a97bc-copy-album-link', 'b620e4ab', 'Initial album detail; hover the unsaved song star and omit unavailable-row menus', move_pointer=False)
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

async def album_description(page, context):
    await start(page, 'b620e4ab')
    await page.get_by_role('button', name='Favourite stupid song', exact=True).hover()
    await record(page, '91b7c60d-album-description', 'b620e4ab', 'Start at album detail with the recorded unsaved-song hover', move_pointer=False)
    await page.get_by_role('button', name='MORE', exact=True).click()
    body = page.get_by_label('Album editorial notes', exact=True)
    await expect(body).to_be_visible()
    assert await body.evaluate('(element) => element.scrollTop') == 0
    await record(page, '91b7c60d-album-description', '32515da3', 'Open the editorial dialog with the visible MORE control')
    await body.focus()
    await page.keyboard.press('Control+End')
    await page.wait_for_function('''() => {
      const element = document.querySelector('[aria-label="Album editorial notes"]');
      return element && element.scrollTop > 200 && Math.abs(element.scrollTop - (element.scrollHeight - element.clientHeight)) < 1;
    }''')
    await record(page, '91b7c60d-album-description', '9b43cccb', 'Scroll the live editorial article to its recorded end state')


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

async def radio_entry_journey(page, context):
    await start(page, 'e72be564')
    await expect(page.get_by_role('heading', name='New', exact=True)).to_be_visible()
    await record(page, 'e7c28ffc-radio-entry', 'e72be564', 'Start at New')
    await page.get_by_role('button', name='Radio', exact=True).click()
    await expect(page.get_by_role('heading', name='Radio', exact=True)).to_be_visible()
    await expect(page.locator('.radio-page')).to_have_attribute('data-edition', 'launch')
    await record(page, 'e7c28ffc-radio-entry', '4cb8f3aa', 'Open Radio from the sidebar')

    stations = page.locator('#radio-stations')
    await page.mouse.move(page.viewport_size['width'] - 300, page.viewport_size['height'] - 180)
    for _ in range(12):
        box = await stations.bounding_box()
        assert box, 'Top Stations section should remain in the live Radio page.'
        delta = box['y'] - 31
        if abs(delta) <= 2:
            break
        await page.mouse.wheel(0, delta)
        await page.wait_for_timeout(120)
    box = await stations.bounding_box()
    assert box and abs(box['y'] - 31) <= 2, f'Radio scroll should align Top Stations at the recorded y=31: {box}'
    await expect(page.get_by_role('heading', name='Top Stations', exact=True)).to_be_visible()
    await record(page, 'e7c28ffc-radio-entry', '0920d819', 'Scroll Radio until Top Stations reaches the recorded position')

async def radio_live_playback(page, context):
    await start(page, '4cb8f3aa')
    station = page.get_by_role('button', name='Listen to Apple Music Hits', exact=True)
    await expect(station).to_be_visible()
    await record(page, '868aa817-radio-live', '4cb8f3aa', 'Start on the Radio launch screen')

    await station.hover()
    await expect(page.locator('.radio-page')).to_have_attribute('data-edition', 'hits')
    await expect(station.locator('xpath=..')).to_have_attribute('data-selected', 'true')
    await record(page, '868aa817-radio-live', 'a9992e55', 'Hover Apple Music Hits to select the station', move_pointer=False)
    original_titles = await page.locator('.episode > div > button').all_text_contents()
    assert original_titles[1:3] == ['JÄY-Z: The Impact', 'JÄY-Z: The Playboy'], original_titles
    await station.click()
    await expect(page.locator('.now-playing')).to_contain_text('Gorgeous')
    await expect(page.get_by_role('button', name='Stop live radio', exact=True)).to_be_visible()
    assert await page.locator('.episode > div > button').all_text_contents() == original_titles
    await record(page, '868aa817-radio-live', '47a07865', 'Start listening to Apple Music Hits')
    await page.get_by_role('button', name='Expand Apple Music Hits', exact=True).click()
    await expect(page.locator('.expanded-player')).to_have_class(re.compile('radio-reference'))
    await expect(page.locator('.expanded-meta')).to_contain_text('Doja Cat — Vie — Apple Music Hits')
    art = page.locator('.expanded-left > .music-art')
    await expect(art).to_have_attribute('data-art-source', source('7bd2ef54'))
    await expect(page.get_by_role('button', name='Next station item', exact=True)).to_be_disabled()
    await expect(page.get_by_role('button', name='Previous station item', exact=True)).to_be_disabled()
    await record(page, '868aa817-radio-live', '7bd2ef54', 'Expand the playing station')
    lyrics = page.get_by_role('button', name='Show lyrics', exact=True)
    await expect(lyrics).to_have_attribute('aria-pressed', 'false')
    await lyrics.click()
    await expect(page.get_by_text('Lyrics are not included for this recording in the saved reference.', exact=True)).to_be_visible()
    await page.get_by_role('button', name='Hide lyrics', exact=True).click()
    await expect(page.get_by_text('Lyrics are not included for this recording in the saved reference.', exact=True)).not_to_be_visible()
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
    await page.locator('div[data-reference-ready="true"]:not(.music-app)').wait_for()
    song = page.get_by_role('button', name='Unfavourite stupid song', exact=True)
    await expect(song).to_have_attribute('aria-pressed', 'true')
    opener = page.get_by_role('button', name='More actions for you seem pretty sad for a girl so in love', exact=True)
    await opener.click()
    await page.get_by_role('menuitem', name='Favourite', exact=True).click()
    await expect(song).to_have_attribute('aria-pressed', 'true')
    await page.reload(wait_until='networkidle')
    await page.locator('div[data-reference-ready="true"]:not(.music-app)').wait_for()
    await opener.click()
    await expect(page.get_by_role('menuitem', name='Undo Favourite', exact=True)).to_be_visible()
    await page.get_by_role('menuitem', name='Undo Favourite', exact=True).click()
    await expect(song).to_have_attribute('aria-pressed', 'true')


async def shuffle_toggle_journey(page, context):
    await start(page, '1f9e170c')
    player = page.locator('.floating-player')
    transport = player.locator('.transport')
    shuffle = transport.get_by_role('button', name='Shuffle', exact=True)
    repeat = transport.get_by_role('button', name='Repeat', exact=True)
    pause = transport.get_by_role('button', name='Pause', exact=True)
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'new')
    await expect(pause).to_be_visible()
    await expect(shuffle).to_have_attribute('aria-pressed', 'false')
    await expect(repeat).to_have_attribute('aria-pressed', 'false')
    title = await player.locator('.now-playing strong').text_content()
    await record(page, '0bb078b9-enable-shuffle', '1f9e170c', 'Initial playing state')
    await shuffle.click()
    await expect(shuffle).to_have_attribute('aria-pressed', 'true')
    await expect(repeat).to_have_attribute('aria-pressed', 'false')
    await expect(pause).to_be_visible()
    assert await player.locator('.now-playing strong').text_content() == title
    await record(page, '0bb078b9-enable-shuffle', 'cf59e554',
                 'Enable shuffle with the compact-player control')
    await shuffle.click()
    await expect(shuffle).to_have_attribute('aria-pressed', 'false')
    await expect(shuffle).to_be_focused()


async def repeat_toggle_journey(page, context):
    await start(page, '1f9e170c')
    player = page.locator('.floating-player')
    transport = player.locator('.transport')
    shuffle = transport.get_by_role('button', name='Shuffle', exact=True)
    repeat = transport.get_by_role('button', name='Repeat', exact=True)
    pause = transport.get_by_role('button', name='Pause', exact=True)
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'new')
    await expect(pause).to_be_visible()
    await expect(shuffle).to_have_attribute('aria-pressed', 'false')
    await expect(repeat).to_have_attribute('aria-pressed', 'false')
    title = await player.locator('.now-playing strong').text_content()
    await record(page, 'aa772c0f-repeat-song', '1f9e170c', 'Initial playing state')
    await repeat.click()
    await expect(repeat).to_have_attribute('aria-pressed', 'true')
    await expect(shuffle).to_have_attribute('aria-pressed', 'false')
    await expect(pause).to_be_visible()
    assert await player.locator('.now-playing strong').text_content() == title
    await record(page, 'aa772c0f-repeat-song', 'a229e38a',
                 'Enable repeat with the compact-player control')
    await repeat.click()
    await expect(repeat).to_have_attribute('aria-pressed', 'false')
    await expect(repeat).to_be_focused()

CASES = [('recorded-shuffle-toggle', shuffle_toggle_journey),
         ('recorded-repeat-toggle', repeat_toggle_journey),
         ('recorded-album-copy-link', album_copy_link),
         ('recorded-album-description', album_description),
         ('recorded-album-share-sheet', album_share_sheet),
         ('recorded-radio-entry', radio_entry_journey),
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
    assert await page.locator('.music-sidebar').evaluate('(e)=>getComputedStyle(e).backdropFilter') == 'blur(18px) saturate(1.6)'
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

async def recorded_song_queue_entry(page, context):
    journey = 'e0a0f93e-song-queue-entry'
    await start(page, '1f9e170c')
    await record(page, journey, '1f9e170c', 'Start at the recorded New listening session')
    await page.get_by_role('button', name='Up Next', exact=True).click()
    queue = page.get_by_role('complementary', name='Up Next queue', exact=True)
    await expect(queue).to_be_visible()
    rows = queue.locator('.queue-list .song-row')
    observed = await rows.all_inner_texts()
    print(f'FLOW e0a0f93e current-session queue rows={len(observed)}: {json.dumps(observed, ensure_ascii=False)}', flush=True)
    assert len(observed) >= 14, observed
    assert any('I Knew It, I Knew You' in row for row in observed), observed
    assert any('Dracula (JENNIE Remix)' in row for row in observed), observed
    await expect(page.get_by_role('button', name='Expand stupid song', exact=True)).to_be_visible()
    await record(page, journey, '8f029018', 'Open Up Next through the live player control; preserve the 14-item starting-session queue')

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
        assert len(body) == item['bytes'], key
        # Independently pin every byte except the reviewed 26-byte UserComment.
        assert re.fullmatch(rb'[A-Z2-7]{26}', body[-26:]), key
        assert sha256(body[:-26] + bytes(26)).hexdigest() == item['contentSha256'], key
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

CASES += [('recorded-song-queue-entry', recorded_song_queue_entry),
          ('recorded-clear-queue', clear_recorded_queue),
          ('recorded-autoplay', recorded_autoplay),
          ('lyrics-catalog-persistence', lyrics_catalog_persistence),
          ('approved-preview-covers', approved_preview_covers)]


async def cancellation_sequence(page, context):
    journey = 'canceling-a-trial-continuous'
    await start(page, '44101453')
    await record(page, journey, '44101453', 'Start at recorded account settings')
    await page.get_by_role('button', name='Manage', exact=True).click()
    await record(page, journey, 'c0997fe5', 'Manage the local subscription')
    await page.get_by_role('button', name='Cancel Free Trial', exact=True).click()
    await record(page, journey, 'fd1c0c71', 'Open cancellation confirmation')
    await page.get_by_role('button', name='Cancel Subscription', exact=True).click()
    await expect(page.get_by_role('dialog', name='Subscription cancellation preview')).to_be_visible()
    await record(page, journey, '03157020', 'Confirm; preserve subscription details under the result dialog')
    await expect(page.locator('.subscription-details')).not_to_have_class('subscription-details cancelled')
    await expect(page.locator('.subscription-details strong')).to_have_text('You have subscribed through a free offer.')
    await page.get_by_role('button', name='Done', exact=True).click()
    await expect(page.get_by_text('You have cancelled your subscription.', exact=True)).to_be_visible()
    await expect(page.get_by_text('Only the local preview subscription changed. No external account was cancelled.', exact=True)).not_to_be_visible(timeout=6000)
    await record(page, journey, '603983c7', 'Dismiss success; reveal cancelled state after the local notice clears')
    # Frozen-reference sessions intentionally do not write browser storage.
    # The ordinary cancellation-preview case separately checks reload persistence.


CASES.append(('recorded-canceling-a-trial', cancellation_sequence))


async def starting_trial_sequence(page, context):
    journey = 'starting-a-trial-continuous-20260923'
    non_get_requests = []
    page.on('request', lambda request: non_get_requests.append(request) if request.method != 'GET' else None)
    await start(page, '51c79ae2')
    await expect(page.get_by_role('dialog', name='Payment Method')).to_be_visible()
    await expect(page.get_by_label('Fixed test card number', exact=True)).to_have_value('')
    await record(page, journey, '51c79ae2', 'Start at the empty local trial checkout')

    await page.get_by_label('Fixed test card number', exact=True).click()
    await expect(page.get_by_label('Fixed test card number', exact=True)).to_have_value('2235123456789000')
    await expect(page.get_by_label('Test expiry date', exact=True)).to_have_value('01/2030')
    await expect(page.get_by_label('Test security code', exact=True)).to_have_value('123')
    assert await page.get_by_label('Fixed test card number', exact=True).evaluate('(element) => getComputedStyle(element).outlineStyle') == 'none'
    await record(page, journey, 'b74d25cb', 'Select the built-in preview test card')

    await scroll_checkout_to(page, '#checkout-billing', 27)
    await record(page, journey, '94b9d90d', 'Scroll to the billing address section')

    street = page.get_by_label('Preview street address', exact=True)
    await street.fill('75 Ayer Rajah Crescent, #02-02')
    suggestion = page.get_by_role('button', name='75 Ayer Rajah Cres, Singapore', exact=True)
    await expect(suggestion).to_be_visible()
    await record(page, journey, 'a728c2af', 'Type the billing street and review its suggestion')

    await suggestion.click()
    await expect(street).to_have_value('75 Ayer Rajah Cres, JTC Launchpad@One-North, Blk 71, Singapore')
    assert await street.evaluate('(element) => document.activeElement !== element')
    await scroll_checkout_to(page, '#checkout-billing', 94)
    await record(page, journey, '06ea37ef', 'Choose the address suggestion and continue through the billing form')

    await scroll_checkout_to(page, '#checkout-confirm', 28)
    await record(page, journey, '5175a910', 'Scroll to the subscription confirmation details')

    await scroll_checkout_to(page, '.checkout-summary', -15)
    await expect(page.get_by_role('button', name='Confirm', exact=True)).to_be_visible()
    await record(page, journey, 'ecb33359', 'Scroll to the final confirmation controls')

    await page.get_by_role('button', name='Confirm', exact=True).click()
    await expect(page.get_by_role('button', name='Done', exact=True)).to_be_visible()
    await expect(page.locator('.checkout-tick')).to_be_visible()
    await expect(page.get_by_role('dialog', name='Payment Method')).to_be_visible()
    await expect(page.locator('.trial-banner')).to_be_visible()
    await expect(page.locator('.sidebar-footer > .profile-button')).to_be_visible()
    await page.wait_for_function('''() => {
      const host = document.querySelector('.checkout-scroll');
      const heading = document.querySelector('#checkout-confirm');
      return host && heading && Math.abs(heading.getBoundingClientRect().top - host.getBoundingClientRect().top - 28) < 1;
    }''')
    await record(page, journey, 'bf099ae2', 'Confirm only the local preview; review the completed state')

    await scroll_checkout_to(page, '.checkout-column > .auth-primary', 460)
    await expect(page.get_by_role('button', name='Done', exact=True)).to_be_visible()
    await page.get_by_role('button', name='Done', exact=True).click()
    await expect(page.get_by_role('dialog', name='Payment Method')).to_have_count(0)
    await expect(page.get_by_role('heading', name='New', exact=True)).to_be_visible()
    await expect(page.locator('.trial-banner')).to_have_count(0)
    await expect(page.get_by_text('SmithAlex', exact=True)).to_have_count(0)
    await record(page, journey, 'e72be564', 'Dismiss the confirmation and return to New')

    await page.get_by_role('button', name='Home', exact=True).click()
    await expect(page.get_by_role('heading', name='Home', exact=True)).to_be_visible()
    await expect(page.get_by_text('SmithAlex', exact=True)).to_be_visible()
    await record(page, journey, 'a917d88f', 'Open Home from the completed trial journey')

    assert not non_get_requests, 'The trial preview must not submit account or payment data.'


CASES.append(('recorded-starting-a-trial', starting_trial_sequence))
