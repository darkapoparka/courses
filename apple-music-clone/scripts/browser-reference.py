"""Same-candidate rendering and interaction checks for the frozen reference app.

Requires playwright==1.62.0 and a built REFERENCE_PREVIEW=1 server on port 3000.
HTTP/render success is not visual-parity approval. Every screenshot is an actual
browser render; originals are never substituted into the implementation region.
"""
from __future__ import annotations
import asyncio
import io
import json
import os
from pathlib import Path
import re
import struct
import wave
from playwright.async_api import async_playwright, expect

APP = Path(__file__).resolve().parents[1]
OUT = APP / '.parity-evidence/browser'
BASE = os.environ.get('REFERENCE_URL', 'http://127.0.0.1:3000')
ARCHIVE = json.loads((APP / 'reference/originals/flow-screen-map.json').read_text())
IDS = list(dict.fromkeys(step['screenId'] for flow in ARCHIVE['flows'] for step in flow['steps']))
BOXES = ['.music-sidebar', '.music-main', 'h1', '.feature-card .music-art', '.poster-card .music-art', '.song-art-button', '.floating-player', 'dialog[open]', '.album-header > .music-art', '.album-information', '.library-topbar', '.category-grid', '.account-scroll', '.account-inner', '.content-footer', '.capture-result', '.code-field', '.auth-primary']


def source(prefix):
    matches = [sid for sid in IDS if sid.startswith(prefix)]
    assert len(matches) == 1, prefix
    return matches[0]


async def ready(page, path='/'):
    response = await page.goto(BASE + path, wait_until='networkidle', timeout=30000)
    assert response and response.status == 200, f'{path}: HTTP {response.status if response else None}'
    await page.locator('[data-reference-ready="true"]').wait_for()
    await page.evaluate('document.fonts.ready')
    await page.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))')


async def capture(browser, sid, width=1440, height=903):
    context = await browser.new_context(viewport={'width': width, 'height': height}, locale='en-SG', timezone_id='Asia/Singapore', reduced_motion='reduce')
    page = await context.new_page()
    page.set_default_timeout(8000)
    errors, failures, bad_responses = [], [], []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('requestfailed', lambda request: failures.append(request.url))
    page.on('response', lambda response: bad_responses.append({'url': response.url, 'status': response.status}) if response.status >= 400 else None)
    row = {'screen': sid, 'width': width, 'height': height}
    try:
        await ready(page, '/screen/' + sid)
        row['boxes'] = await page.evaluate('''selectors => Object.fromEntries(selectors.map(selector => {
          const element = document.querySelector(selector); if (!element) return [selector, null];
          const r = element.getBoundingClientRect(); return [selector, {x:r.x,y:r.y,width:r.width,height:r.height}];
        }))''', BOXES)
        row['overflow'] = await page.evaluate('''() => ({document: document.documentElement.scrollWidth > innerWidth,
          main: document.querySelector('main').scrollWidth > document.querySelector('main').clientWidth + 1})''')
        row['scene'] = await page.locator('.music-app').get_attribute('data-scene')
        row['artworkCount'] = await page.locator('[data-art-source]').count()
        assert not errors, str(errors)
        assert not failures, str(failures)
        assert not bad_responses, str(bad_responses)
        assert not any(row['overflow'].values()), str(row['overflow'])
        row['status'] = 'pass'
    except Exception as error:
        row.update(status='fail', error=str(error))
    try:
        await page.screenshot(path=str(OUT / f'{sid}-{width}.png'), animations='disabled')
    except Exception as error:
        row.update(status='fail', screenshotError=str(error))
    row.update(errors=errors, failedRequests=failures, badResponses=bad_responses)
    print(f"SCREEN {sid[:8]} {width} {row['status']}", flush=True)
    await context.close()
    return row


async def flow_routes(request):
    rows = []
    for flow in ARCHIVE['flows']:
        slug = re.sub('[^a-z0-9]+', '-', flow['name'].lower()).strip('-')
        for index, step in enumerate(flow['steps']):
            path = f'/flows/{slug}?step={index}'
            response = await request.get(BASE + path)
            body = await response.text()
            ok = response.status == 200 and f'data-source="{step["screenId"]}"' in body
            rows.append({'flow': flow['id'], 'step': index, 'source': step['screenId'], 'path': path, 'httpStatus': response.status, 'status': 'pass' if ok else 'fail'})
    return rows


async def run_case(browser, name, callback, mobile=False):
    context = await browser.new_context(viewport={'width': 390 if mobile else 1440, 'height': 844 if mobile else 903}, reduced_motion='reduce')
    page = await context.new_page()
    page.set_default_timeout(8000)
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    result = {'test': name}
    try:
        await callback(page, context)
        assert not errors, str(errors)
        result['status'] = 'pass'
    except Exception as error:
        result.update(status='fail', error=str(error))
    result['errors'] = errors
    await page.screenshot(path=str(OUT / f'test-{name}.png'), animations='disabled')
    print('TEST', name, result['status'], result.get('error', ''), flush=True)
    await context.close()
    return result


async def navigation(page, context):
    await ready(page)
    nav = page.get_by_role('navigation', name='Browse music', exact=True)
    await nav.get_by_role('button', name='Home', exact=True).click()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'home')
    await nav.get_by_role('button', name='Search', exact=True).click()
    await expect(page.get_by_label('Search Apple Music', exact=True)).to_be_visible()
    await page.go_back()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'home')
    await page.reload()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'home')


async def search(page, context):
    await ready(page, '/?view=search')
    field = page.get_by_label('Search Apple Music', exact=True)
    await field.fill('Olivia')
    await field.press('Enter')
    await expect(page.get_by_role('heading', name='Top Results', exact=True)).to_be_visible()
    assert await page.locator('.capture-result').count() == 6
    assert await page.locator('.capture-artist-rail > button').count() == 8
    await page.get_by_role('button', name='Your Library', exact=True).click()
    await expect(page.get_by_role('heading', name='Songs', exact=True)).to_be_visible()
    assert await page.locator('.library-result-songs .song-row').count() == 4
    await field.fill('no-match-uuid-1234')
    await field.press('Enter')
    await expect(page.get_by_role('heading', name='No results', exact=True)).to_be_visible()
    await page.get_by_role('button', name='Clear search', exact=True).click()
    await expect(field).to_have_value('')


async def library(page, context):
    await ready(page, '/?view=songs')
    await page.get_by_role('button', name='Unfavourite stupid song', exact=True).click()
    await expect(page.get_by_role('button', name='Favourite stupid song', exact=True)).to_have_attribute('aria-pressed', 'false')
    await page.reload()
    await page.locator('[data-reference-ready="true"]').wait_for()
    await expect(page.get_by_role('button', name='Favourite stupid song', exact=True)).to_have_attribute('aria-pressed', 'false')
    await page.get_by_role('button', name='More actions for stupid song', exact=True).click()
    await page.get_by_role('menuitem', name='Add to Playlist', exact=True).click()
    await page.get_by_role('menuitem', name='New Playlist…', exact=True).click()
    await page.get_by_label('Playlist name', exact=True).fill('Browser Test Playlist')
    await page.get_by_role('button', name='Create', exact=True).click()
    await page.get_by_role('navigation', name='Playlists', exact=True).get_by_role('button', name='Browser Test Playlist', exact=True).click()
    await expect(page.get_by_role('heading', name='Browser Test Playlist', exact=True)).to_be_visible()
    assert await page.locator('.track-table .track-table-row').count() == 1
    await page.reload()
    await page.locator('[data-reference-ready="true"]').wait_for()
    await expect(page.get_by_role('heading', name='Browser Test Playlist', exact=True)).to_be_visible()


async def queue(page, context):
    await ready(page)
    await page.get_by_role('button', name='Up Next', exact=True).click()
    await expect(page.get_by_role('complementary', name='Up Next queue')).to_be_visible()
    await page.get_by_role('button', name='Clear', exact=True).click()
    await expect(page.get_by_text('No upcoming songs', exact=True)).to_be_visible()
    await page.get_by_role('button', name='Close player panel').click()
    await page.get_by_role('button', name='More actions for stupid song', exact=True).click()
    await page.get_by_role('menuitem', name='Play Next', exact=True).click()
    await page.get_by_role('button', name='Up Next', exact=True).click()
    assert await page.locator('.queue-list .song-row').count() == 1


async def modal_safety(page, context):
    requests = []
    page.on('request', lambda request: requests.append(request) if request.method != 'GET' else None)
    await ready(page, '/?guest=1')
    await page.get_by_role('button', name='Sign In', exact=True).click()
    await page.get_by_label('Email address', exact=True).fill('not-a-preview@example.com')
    await page.get_by_role('button', name='Continue', exact=True).click()
    await expect(page.locator('dialog .form-error')).to_contain_text('Real email addresses are not accepted')
    await page.get_by_label('Email address', exact=True).fill('alex@example.test')
    await page.get_by_role('button', name='Continue', exact=True).click()
    await page.get_by_label('Verification code', exact=True).fill('000000')
    await page.get_by_role('button', name='Continue', exact=True).click()
    await expect(page.locator('dialog .form-error')).to_contain_text('123456')
    await page.get_by_label('Verification code', exact=True).fill('123456')
    await page.get_by_role('button', name='Continue', exact=True).click()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'new')
    await expect(page.locator('dialog[open]')).to_have_count(0)
    assert not requests, 'Preview authentication must not submit any network request.'


async def password_signin(page, context):
    await ready(page, '/screen/' + source('6aa4a9d7'))
    await page.get_by_role('button', name='Sign in with password', exact=True).click()
    await expect(page.get_by_role('heading', name='Enter Your Password')).to_be_visible()
    await page.get_by_label('Preview password', exact=True).fill('not-the-preview-password')
    await page.get_by_role('button', name='Continue with preview password').click()
    await expect(page.locator('dialog .form-error')).to_contain_text('reference-preview')
    await page.get_by_label('Preview password', exact=True).fill('reference-preview')
    await page.get_by_role('button', name='Continue with preview password').click()
    await expect(page.locator('dialog[open]')).to_have_count(0)


async def passcode(page, context):
    await ready(page, '/screen/' + source('01f96377'))
    host = page.locator('.account-scroll')
    initial_scroll = await host.evaluate('(element) => element.scrollTop')
    await page.get_by_role('switch', name='Content Restrictions').click()
    await expect(page.get_by_role('dialog')).to_be_visible()
    assert abs(await host.evaluate('(element) => element.scrollTop') - initial_scroll) < 1
    box = await page.get_by_role('dialog').bounding_box()
    assert box and abs(box['x'] - 463) < 2 and abs(box['width'] - 762) < 1
    await page.get_by_label('Preview passcode', exact=True).fill('1234')
    await page.get_by_role('button', name='Continue', exact=True).click()
    await page.get_by_label('Confirm preview passcode', exact=True).fill('0000')
    await page.get_by_role('button', name='Continue', exact=True).click()
    await expect(page.locator('dialog .form-error')).to_contain_text('do not match')
    await page.get_by_label('Confirm preview passcode', exact=True).fill('1234')
    await page.get_by_role('button', name='Continue', exact=True).click()
    await page.get_by_label('Preview recovery email').fill('alex@example.test')
    await page.get_by_role('button', name='Continue', exact=True).click()
    await expect(page.get_by_role('heading', name='Passcode set', exact=True)).to_be_visible()
    await page.get_by_role('button', name='Done', exact=True).click()
    await expect(page.get_by_role('switch', name='Content Restrictions')).to_have_attribute('aria-checked', 'true')
    await page.get_by_label('Music and Podcasts rating').select_option('Explicit')
    await expect(page.get_by_label('Music and Podcasts rating')).to_have_value('Explicit')


async def checkout(page, context):
    requests = []
    page.on('request', lambda request: requests.append(request) if request.method != 'GET' else None)
    await ready(page, '/screen/' + source('51c79ae2'))
    assert await page.locator('.checkout-background').count() == 1
    assert await page.locator('.trial-banner').count() == 0
    await page.get_by_role('button', name='Use test card', exact=True).click()
    await expect(page.get_by_label('Fixed test card number')).to_have_value('4242 4242 4242 4242')
    assert await page.get_by_label('Fixed test card number').get_attribute('readonly') is not None
    await page.get_by_label('Preview street address').fill('Test address')
    await page.get_by_role('button', name='Confirm', exact=True).click()
    await page.get_by_role('button', name='Done', exact=True).click()
    await expect(page.locator('dialog[open]')).to_have_count(0)
    assert not requests, 'Checkout preview must not submit payment data.'


async def cancellation(page, context):
    await ready(page, '/?view=subscription')
    await page.get_by_role('button', name='Cancel Free Trial', exact=True).click()
    await page.get_by_role('button', name='Keep Subscription', exact=True).click()
    await expect(page.locator('dialog[open]')).to_have_count(0)
    await page.get_by_role('button', name='Cancel Free Trial', exact=True).click()
    await page.get_by_role('button', name='Cancel Subscription', exact=True).click()
    await expect(page.get_by_role('dialog', name='Subscription cancellation preview')).to_be_visible()
    await page.get_by_role('button', name='Done', exact=True).click()
    await expect(page.get_by_text('You have cancelled your subscription.', exact=True)).to_be_visible()
    await page.reload()
    await page.locator('[data-reference-ready="true"]').wait_for()
    await expect(page.get_by_text('You have cancelled your subscription.', exact=True)).to_be_visible()


async def local_media(page, context):
    await ready(page)
    await page.get_by_role('button', name='Play stupid song', exact=True).click()
    await expect(page.get_by_role('dialog', name='Play local media')).to_be_visible()
    audio = io.BytesIO()
    with wave.open(audio, 'wb') as output:
        output.setnchannels(1)
        output.setsampwidth(2)
        output.setframerate(8000)
        output.writeframes(struct.pack('<h', 0) * 8000 * 20)
    await page.get_by_label('Choose local media', exact=True).set_input_files({'name': 'owned-test-silence.wav', 'mimeType': 'audio/wav', 'buffer': audio.getvalue()})
    await page.wait_for_function("document.querySelector('audio').currentTime > 0")
    assert await page.evaluate("document.querySelector('audio').src.startsWith('blob:')")
    await page.get_by_role('button', name='Pause', exact=True).click()
    assert await page.evaluate("document.querySelector('audio').paused")
    await page.get_by_role('button', name='Expand stupid song', exact=True).click()
    await page.get_by_role('slider', name='Playback position').fill('7')
    assert 6.9 <= await page.evaluate("document.querySelector('audio').currentTime") <= 7.5
    await page.get_by_role('slider', name='Volume level').fill('0.25')
    assert await page.evaluate("document.querySelector('audio').volume") == .25


async def mobile_navigation(page, context):
    await ready(page)
    await page.get_by_role('button', name='Open navigation', exact=True).click()
    await page.get_by_role('navigation', name='Browse music', exact=True).get_by_role('button', name='Search', exact=True).click()
    await expect(page.get_by_label('Search Apple Music', exact=True)).to_be_visible()
    await expect(page.get_by_role('button', name='Open navigation')).to_have_attribute('aria-expanded', 'false')
    assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth')


async def strict_routes(page, context):
    for path in ['/screen/not-a-reference', '/flows/missing-flow', '/flows/new?step=9999', '/flows/new?step=-1', '/?view=not-a-page', '/reference-assets/not-a-reference']:
        response = await context.request.get(BASE + path)
        assert response.status == 404, f'{path}: expected 404, got {response.status}'
    for resolution in ['', '?resolution=high']:
        response = await context.request.get(BASE + '/reference-assets/' + IDS[0] + resolution)
        assert response.status == 200
        assert response.headers.get('content-type', '').startswith('image/webp')
        assert response.headers.get('cache-control') == 'private, no-store'


async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    result = {'commit': os.environ.get('GITHUB_SHA'), 'note': 'Rendering/functional coverage, not visual-parity acceptance.', 'screens': [], 'tests': [], 'flowRoutes': []}
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch()
        result['browser'] = browser.version
        request = await playwright.request.new_context()
        result['flowRoutes'] = await flow_routes(request)
        await request.dispose()
        semaphore = asyncio.Semaphore(3)
        async def bounded_capture(sid, width=1440, height=903):
            async with semaphore:
                return await capture(browser, sid, width, height)
        result['screens'] = await asyncio.gather(*(bounded_capture(sid) for sid in IDS))
        for prefix in ['e72be564', 'a917d88f', 'b620e4ab', '035569a0', '3131018d']:
            result['screens'].append(await bounded_capture(source(prefix), 390, 844))
        cases = [('navigation-history', navigation), ('scoped-search', search), ('library-playlists-persistence', library), ('queue-actions', queue), ('preview-form-validation', modal_safety), ('password-signin', password_signin), ('account-passcode', passcode), ('checkout-preview', checkout), ('cancellation-preview', cancellation), ('local-media-playback', local_media), ('strict-reference-routes', strict_routes)]
        for name, callback in cases:
            result['tests'].append(await run_case(browser, name, callback))
        result['tests'].append(await run_case(browser, 'mobile-navigation', mobile_navigation, mobile=True))
        await browser.close()
    (OUT / 'results.json').write_text(json.dumps(result, indent=2))
    failures = [row for row in [*result['screens'], *result['tests'], *result['flowRoutes']] if row['status'] != 'pass']
    print(f"Rendered {len(result['screens'])} states; checked {len(result['flowRoutes'])} flow routes; ran {len(result['tests'])} journeys; {len(failures)} failures.", flush=True)
    if failures:
        raise SystemExit(1)


if __name__ == '__main__':
    asyncio.run(main())
