"""Native-sized discovery artwork and clean, continuously reached chart fragments."""
from playwright.async_api import expect
from browser_live_fidelity import start, record


async def wheel_to(page, selector, top):
    box = await page.locator(selector).bounding_box()
    assert box, selector
    delta = round(box['y'] - top)
    target = await page.locator('main').evaluate(
        '(e,d)=>Math.max(0,Math.min(e.scrollHeight-e.clientHeight,e.scrollTop+d))', delta)
    await page.mouse.move(1100, 650)
    await page.mouse.wheel(0, delta)
    await page.wait_for_function(
        '(y)=>Math.abs(document.querySelector("main").scrollTop-y)<1', arg=target)


async def discovery_shelves(page, context):
    journey = 'new-square-artwork'
    await start(page, 'e72be564')
    await wheel_to(page, '#essentials', 32)
    await record(page, journey, '8b03c9d0', 'Wheel from New to the saved Essentials checkpoint')
    for selector in ['#essentials', '#daily-top', '#city-charts']:
        cards = page.locator(selector + ' .card-art-button')
        for index in range(5):
            box = await cards.nth(index).bounding_box()
            assert box and abs(box['x'] - (286 + index * 227)) < .05, (selector, index, box)
            assert abs(box['width'] - 208) < .05 and abs(box['height'] - 208) < .05, (selector, index, box)
    # Only these two source columns are wholly outside the captured player.
    upper = page.locator('.city-upper')
    for index in [0, 4]:
        box = await upper.nth(index).bounding_box()
        assert box and abs(box['height'] - 189) < .05, (index, box)
    for index in [1, 2, 3]:
        box = await upper.nth(index).bounding_box()
        assert box and abs(box['height'] - 119) < .05, (index, box)
    await wheel_to(page, '#coming-soon', 113)
    await record(page, journey, '706de500', 'Continue with the wheel to Coming Soon and More to Explore')
    cards = page.locator('#coming-soon .media-card')
    for index in range(5):
        await expect(cards.nth(index).locator('.explicit')).to_have_count(0 if index == 1 else 1)
        if index != 1:
            art = await cards.nth(index).locator('.card-art-button').bounding_box()
            badge = await cards.nth(index).locator('.explicit').bounding_box()
            assert art and badge and abs(badge['x'] + badge['width'] - art['x'] - art['width']) < .05
            assert badge['width'] == 10 and badge['height'] == 10
    await page.get_by_role('button', name='Volume', exact=True).click()
    await page.get_by_role('button', name='Volume', exact=True).click()
    await expect(page.locator('#coming-soon .explicit')).to_have_count(4)
    await page.locator('#more-to-explore').get_by_role('button', name='Concerts', exact=True).click()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'concerts')
    await expect(page.get_by_role('heading', name='Concerts', exact=True)).to_be_visible()


CASES = [('discovery-native-square-artwork', discovery_shelves)]


async def panel_release_geometry(page, context):
    # Two independent endpoint regressions, not a claim of a complete recorded flow.
    for prefix in ['ee8db412', '8f029018']:
        await start(page, prefix)
        cards = page.locator('#new-this-week .card-art-button')
        await record(page, 'panel-native-releases-' + prefix, prefix, 'Initial panel release geometry')
        for index in range(4):
            box = await cards.nth(index).bounding_box()
            assert box and abs(box['x'] - (286 + index * 212)) < .05, (prefix, index, box)
            assert abs(box['width'] - 193) < .05 and abs(box['height'] - 193) < .05, (prefix, index, box)
        await page.get_by_role('button', name='Volume', exact=True).click()
        await page.get_by_role('button', name='Volume', exact=True).click()
        for index in range(4):
            box = await cards.nth(index).bounding_box()
            assert box and abs(box['x'] - (286 + index * 212)) < .05, (prefix, index, box)
        await record(page, 'panel-native-releases-' + prefix, prefix, 'Release geometry retained after real Volume controls')


CASES.append(('panel-native-release-artwork', panel_release_geometry))


async def legacy_release_fragments(page, context):
    # Each initial screenshot has its own fifth release; controls must not swap it.
    for prefix in ['cf59e554', 'e5e8383f']:
        await start(page, prefix)
        cards = page.locator('#new-this-week .media-card')
        last = cards.nth(4).locator('.card-art-button > .music-art').first
        source = await last.get_attribute('data-art-source')
        assert source and source.startswith(prefix), (prefix, source)
        for index in [1, 2, 4]:
            await expect(cards.nth(index).locator('.card-art-button > .music-art').first).to_have_attribute('data-art-partial', 'true')
        second_mask = await cards.nth(1).locator('.reference-art-strip .music-art').evaluate('(e)=>getComputedStyle(e).maskImage')
        third_mask = await cards.nth(2).locator('.reference-art-strip .music-art').evaluate('(e)=>getComputedStyle(e).maskImage')
        assert '76.1905%' in second_mask and '6.25%' in second_mask, second_mask
        assert '76.1905%' in third_mask and '6.25%' not in third_mask, third_mask
        before = await page.locator('#new-this-week [data-art-source]').evaluate_all('(els)=>els.map(e=>[e.dataset.artSource,e.getAttribute("style")])')
        await record(page, 'legacy-release-fragments-' + prefix, prefix, 'Initial saved legacy release edition')
        await page.get_by_role('button', name='Volume', exact=True).click()
        await page.get_by_role('button', name='Volume', exact=True).click()
        after = await page.locator('#new-this-week [data-art-source]').evaluate_all('(els)=>els.map(e=>[e.dataset.artSource,e.getAttribute("style")])')
        assert after == before
        await record(page, 'legacy-release-fragments-' + prefix, prefix, 'Release edition preserved after real Volume controls')


CASES.append(('legacy-release-artwork-persistence', legacy_release_fragments))


async def legacy_panel_exit_artwork(page, context):
    await start(page, 'ee8db412')
    panel = page.get_by_role('complementary', name='Lyrics', exact=True)
    await expect(panel).to_be_visible()
    await page.get_by_role('button', name='Show lyrics', exact=True).click()
    await expect(panel).to_have_count(0)
    # The former panel source has lyric UI at these wide coordinates.
    # Use the unobstructed legacy shelf, not an image of those lyrics.
    last = page.locator('#new-this-week .media-card').nth(4).locator('.card-art-button > .music-art').first
    source = await last.get_attribute('data-art-source')
    assert source and source.startswith('cf59e554'), source
    await expect(last).to_have_attribute('data-art-partial', 'true')
    await page.get_by_role('button', name='Show lyrics', exact=True).click()
    await expect(panel).to_be_visible()
    box = await page.locator('#new-this-week .card-art-button').first.bounding_box()
    assert box and abs(box['width'] - 193) < .05, box
    await record(page, 'legacy-panel-exit-artwork', 'ee8db412', 'Close and reopen lyrics through the actual player; retain clean source regions')


CASES.append(('legacy-panel-exit-clean-artwork', legacy_panel_exit_artwork))
