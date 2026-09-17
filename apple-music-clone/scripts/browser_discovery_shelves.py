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


async def assert_release_overlays(cards, prefix):
    for index in range(5):
        overlay = cards.nth(index).locator('.reference-art-strip .music-art')
        await expect(overlay).to_have_count(1)
        source = await overlay.get_attribute('data-art-source')
        assert source and source.startswith(prefix), (prefix, index, source)
        if index in [1, 2, 3]:
            await expect(overlay).to_have_attribute('data-art-partial', 'true')
            mask = await overlay.evaluate('(e)=>getComputedStyle(e).maskImage')
            assert '76.1905%' in mask, (prefix, index, mask)
            if index == 1:
                assert '6.25%' in mask, mask
            elif index == 3:
                assert '93.2692%' in mask, mask
        else:
            await expect(overlay).not_to_have_attribute('data-art-partial', 'true')


async def assert_initial_release_edition(page):
    cards = page.locator('#new-this-week .media-card')
    assert await cards.evaluate_all('(els)=>els.map(e=>e.dataset.cardId)') == [
        'cover-9', 'cover-9', 'cover-5', 'cover-7', 'cover-7']
    partial = cards.nth(3).locator('.card-art-button > .music-art').first
    await expect(partial).to_have_attribute('data-art-partial', 'true')
    assert (await partial.get_attribute('data-art-source') or '').startswith('e72be564')
    await assert_release_overlays(cards, 'e72be564')


async def discovery_shelves(page, context):
    journey = 'new-square-artwork'
    await start(page, 'e72be564')
    await assert_initial_release_edition(page)
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
    await page.get_by_role("navigation", name="Browse music", exact=True).get_by_role("button", name="New", exact=True).click()
    await expect(page.get_by_role("heading", name="New", exact=True)).to_be_visible()
    await assert_initial_release_edition(page)
    for index in [0, 4]:
        strip = page.locator("#new-this-week .media-card").nth(index).locator(".reference-art-strip [data-art-source]")
        await expect(strip).to_have_count(1)
        edition = await strip.get_attribute("data-art-source")
        assert edition and edition.startswith("e72be564"), (index, edition)
    await record(page, journey, "e72be564", "Return through the actual New sidebar control; retain the current release edition")
    navigation = page.get_by_role("navigation", name="Browse music", exact=True)
    await navigation.get_by_role("button", name="Radio", exact=True).click()
    await expect(page.locator(".music-app")).to_have_attribute("data-scene", "radio")
    await navigation.get_by_role("button", name="New", exact=True).click()
    await expect(page.locator(".music-app")).to_have_attribute("data-scene", "new")
    await assert_initial_release_edition(page)
    for index in [0, 4]:
        strip = page.locator("#new-this-week .media-card").nth(index).locator(".reference-art-strip [data-art-source]")
        await expect(strip).to_have_count(1)
        assert (await strip.get_attribute("data-art-source") or "").startswith("e72be564")
    await record(page, journey, "e72be564", "Radio to New through real sidebar controls preserves current artwork")


CASES = [('discovery-native-square-artwork', discovery_shelves)]


async def current_release_editions(page, context):
    """Named-profile and listening states retain one reviewed release edition."""
    prefixes = [
        '4f611a9e', '54b01eab', '11803c64', 'c98f8b54', '1f9e170c',
        '9fbb38e1', 'afd02fa6', 'd83e96ba', 'ad689c37', 'fc5d84bd',
    ]
    expected_cards = ['cover-9', 'cover-1', 'cover-9', 'cover-5', 'cover-7']
    for prefix in prefixes:
        await start(page, prefix)
        cards = page.locator('#new-this-week .media-card')
        assert await cards.evaluate_all('(els)=>els.map(e=>e.dataset.cardId)') == expected_cards
        for index in [1, 2, 3]:
            art = cards.nth(index).locator('.card-art-button > .music-art').first
            source = await art.get_attribute('data-art-source')
            assert source and source.startswith('e757eb0f'), (prefix, index, source)
        await assert_release_overlays(cards, prefix)
        # The saved profile-menu fixture owns a dismiss layer. Close it through
        # the real keyboard path before exercising an unrelated player control.
        await page.keyboard.press('Escape')
        before = await page.locator('#new-this-week [data-art-source]').evaluate_all(
            '(els)=>els.map(e=>[e.dataset.artSource,e.getAttribute("style")])')
        await page.get_by_role('button', name='Volume', exact=True).click()
        await page.get_by_role('button', name='Volume', exact=True).click()
        after = await page.locator('#new-this-week [data-art-source]').evaluate_all(
            '(els)=>els.map(e=>[e.dataset.artSource,e.getAttribute("style")])')
        assert after == before, prefix
    await record(page, 'current-release-editions', 'fc5d84bd',
                 'Current release cover order and source-owned masked artwork fragments survive real Volume controls')


CASES.append(('current-release-artwork-persistence', current_release_editions))


async def localized_release_fragments(page, context):
    await start(page, 'be864051')
    cards = page.locator('#new-this-week .media-card')
    assert await cards.evaluate_all('(els)=>els.map(e=>e.dataset.cardId)') == [
        'cover-9', 'cover-4', 'cover-1', 'cover-5', 'cover-7']
    for index in [1, 2, 3]:
        source = await cards.nth(index).locator('.card-art-button > .music-art').first.get_attribute('data-art-source')
        assert source and source.startswith('e757eb0f'), (index, source)
    await assert_release_overlays(cards, 'be864051')
    before = await page.locator('#new-this-week [data-art-source]').evaluate_all(
        '(els)=>els.map(e=>[e.dataset.artSource,e.getAttribute("style")])')
    await page.get_by_role('button', name='Volume', exact=True).click()
    await page.get_by_role('button', name='Volume', exact=True).click()
    after = await page.locator('#new-this-week [data-art-source]').evaluate_all(
        '(els)=>els.map(e=>[e.dataset.artSource,e.getAttribute("style")])')
    assert after == before
    await record(page, 'localized-release-fragments', 'be864051',
                 'Localized release order and source-owned masked fragments survive real Volume controls')


CASES.append(('localized-release-artwork-persistence', localized_release_fragments))


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


async def legacy_player_material(page, context):
    prefixes = [
        'cf59e554', 'a229e38a', '6ac70c34', 'e4dad439', 'cbbdc344',
        '95ae6a8f', 'f2e44e3b', 'ffc18eb8', '3728aa07', 'e5e8383f',
        'e027fe6d',
    ]
    for prefix in prefixes:
        await start(page, prefix)
        player = page.locator('.floating-player')
        material = await player.evaluate('''(e)=>{const s=getComputedStyle(e);return [s.backgroundColor,s.backdropFilter]}''')
        assert material == ['rgba(249, 249, 251, 0.54)', 'blur(16px) saturate(1.8)'], (prefix, material)
        await page.get_by_role('button', name='Volume', exact=True).click()
        await page.get_by_role('button', name='Volume', exact=True).click()
        retained = await player.evaluate('''(e)=>{const s=getComputedStyle(e);return [s.backgroundColor,s.backdropFilter]}''')
        assert retained == material, (prefix, material, retained)
    await record(page, 'legacy-player-material', 'e027fe6d',
                 'Legacy catalog material survives real Volume controls')

    for prefix in ['e72be564', 'a917d88f']:
        await start(page, prefix)
        material = await page.locator('.floating-player').evaluate(
            '''(e)=>{const s=getComputedStyle(e);return [s.backgroundColor,s.backdropFilter]}''')
        assert material == ['rgba(249, 249, 251, 0.74)', 'blur(28px) saturate(1.4)'], (prefix, material)

    await start(page, 'ee8db412')
    panel_material = await page.locator('.floating-player').evaluate(
        '''(e)=>{const s=getComputedStyle(e);return [s.backgroundColor,s.backdropFilter]}''')
    assert panel_material != ['rgba(249, 249, 251, 0.54)', 'blur(16px) saturate(1.8)'], panel_material


CASES.append(('legacy-player-material', legacy_player_material))


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


async def viral_artwork_controls(page, context):
    """A thumbnail is clean artwork; hover/play indicators are live controls."""
    await start(page, 'e72be564')
    play = page.get_by_role('button', name='Play Shabang', exact=True)
    artwork = play.locator('.music-art')
    overlay = play.locator('.art-play')
    clean_source = await artwork.get_attribute('data-art-source')
    assert clean_source and clean_source.startswith('54b01eab'), 'Do not restore the captured hover icon as cover art'
    await expect(overlay).not_to_be_visible()
    await play.hover()
    await expect(overlay).to_be_visible()
    await record(page, 'viral-artwork-controls', 'e72be564', 'Hover the real Shabang thumbnail control', move_pointer=False)
    await page.mouse.move(1100, 80)
    await expect(overlay).not_to_be_visible()
    await record(page, 'viral-artwork-controls', 'e72be564', 'Move away; the hover icon disappears from clean artwork')
    await play.click()
    await page.mouse.move(1100, 80)
    await expect(play.locator('.playing-bars')).to_be_visible()
    await expect(page.get_by_role('button', name='Pause', exact=True)).to_be_visible()
    assert await page.locator('audio').evaluate('(element) => element.paused'), 'Local UI preview must stay silent'
    await page.get_by_role('button', name='Volume', exact=True).click()
    await page.get_by_role('button', name='Volume', exact=True).click()
    assert await artwork.get_attribute('data-art-source') == clean_source
    await page.get_by_role('button', name='Pause', exact=True).click()
    await expect(play.locator('.playing-bars')).to_have_count(0)


CASES.append(('viral-artwork-live-controls', viral_artwork_controls))


async def discovery_typography_symbols(page, context):
    """Lawful text compensation and live star geometry survive real navigation."""
    await start(page, 'e72be564')
    heading = page.locator('.capture-discovery:lang(en) > h1')
    heading_style = await heading.evaluate(
        '(e)=>{const s=getComputedStyle(e);return [s.fontSize,s.transform,s.transformOrigin]}')
    assert heading_style == ['33.25px', 'matrix(1, 0, 0, 0.97, -0.25, 3.5)', '0px 0px'], heading_style

    section = page.locator('.viral-hits-section')
    link = section.locator('.section-link')
    live_star = link.locator('svg').first
    await expect(live_star).to_have_count(1)
    box = await live_star.bounding_box()
    assert box and abs(box['width'] - 15) < .05 and abs(box['height'] - 15) < .05, box
    star_style = await live_star.evaluate(
        '(e)=>{const s=getComputedStyle(e);return [s.strokeWidth,s.transform]}')
    assert star_style == ['2.3px', 'matrix(1, 0, 0, 1, 0, -1)'], star_style

    link_style = await link.evaluate(
        '(e)=>{const s=getComputedStyle(e);return [s.gap,getComputedStyle(e.querySelector(".section-title-text")).transform,getComputedStyle(e.querySelector("svg")).color]}')
    assert link_style == ['4px', 'matrix(0.98, 0, 0, 1, 0, 0)', 'rgb(29, 29, 31)'], link_style

    caption = page.locator('.feature-caption').first
    caption_styles = await caption.evaluate('''(e)=>{
      const style = selector => getComputedStyle(e.querySelector(selector));
      return [style('small').transform, style('button').transform,
              style('span').color, style('span').transform];
    }''')
    assert caption_styles == [
        'matrix(1.05, 0, 0, 1.08, 0, -1)',
        'matrix(0.94, 0, 0, 1.03, 0, 1.5)',
        'rgb(115, 115, 115)',
        'matrix(1.02, 0, 0, 1, 0, -0.5)',
    ], caption_styles
    await record(page, 'discovery-typography-symbols', 'e72be564',
                 'Initial New typography and live viral-section star')

    await link.click()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'chart')
    chart_heading = page.locator('.chart-page > h1')
    chart_style = await chart_heading.evaluate(
        '(e)=>{const s=getComputedStyle(e);return [s.fontSize,s.lineHeight,s.gap]}')
    assert chart_style == ['33px', '41px', '6px'], chart_style
    chart_star = chart_heading.locator('svg').first
    chart_box = await chart_star.bounding_box()
    assert chart_box and abs(chart_box['width'] - 32.5) < .05, chart_box
    assert abs(chart_box['height'] - 32.5) < .05, chart_box
    chart_star_style = await chart_star.evaluate(
        '(e)=>{const s=getComputedStyle(e);return [s.strokeWidth,s.transform]}')
    assert chart_star_style == ['2.3px', 'matrix(1, 0, 0, 1, 0, -0.5)'], chart_star_style
    chart_table = page.locator('.chart-page > .chart-table')
    table_box = await chart_table.bounding_box()
    assert table_box and abs(table_box['x'] - 286) < .05, table_box
    assert abs(table_box['y'] - 97) < .05 and abs(table_box['width'] - 1116) < .05, table_box
    header = chart_table.locator('.track-table-head')
    header_box = await header.bounding_box()
    assert header_box and abs(header_box['height'] - 28) < .05, header_box
    header_transform = await header.locator(':scope > span').first.evaluate(
        '(e)=>getComputedStyle(e).transform')
    assert header_transform == 'matrix(1, 0, 0, 1, 0, -2)', header_transform
    header_cells = header.locator(':scope > span')
    assert await header_cells.count() == 4
    header_boxes = [await header_cells.nth(index).bounding_box() for index in range(4)]
    expected_columns = [292, 683.90625, 968.734375, 1309]
    assert all(header_boxes), header_boxes
    for box, expected_x in zip(header_boxes, expected_columns):
        assert abs(box['x'] - expected_x) < .05, (box, expected_x)

    first_row = chart_table.locator('.track-table-row').first
    row_box = await first_row.bounding_box()
    assert row_box and abs(row_box['y'] - 125) < .05, row_box
    assert abs(row_box['height'] - 51.5) < .05, row_box
    art_box = await first_row.locator('.table-art').bounding_box()
    assert art_box and abs(art_box['x'] - 292) < .05, art_box
    assert abs(art_box['width'] - 39) < .05 and abs(art_box['height'] - 39) < .05, art_box
    title_box = await first_row.locator('.table-song-title').bounding_box()
    assert title_box and abs(title_box['x'] - 342) < .05, title_box
    artist_box = await first_row.locator('.table-text-link').nth(0).bounding_box()
    album_box = await first_row.locator('.table-text-link').nth(1).bounding_box()
    time_box = await first_row.locator('.track-time').bounding_box()
    more_button_box = await first_row.locator(':scope > .icon-button').bounding_box()
    assert artist_box and abs(artist_box['x'] - expected_columns[1]) < .05, artist_box
    assert album_box and abs(album_box['x'] - expected_columns[2]) < .05, album_box
    assert time_box and abs(time_box['x'] - expected_columns[3]) < .05, time_box
    assert more_button_box and abs(more_button_box['x'] - 1356) < .05, more_button_box
    assert abs(more_button_box['width'] - 28) < .05, more_button_box

    favourite = chart_table.locator('.favourite-marker[aria-pressed=true]').first
    favourite_style = await favourite.evaluate(
        '(e)=>{const s=getComputedStyle(e);return [s.color,s.opacity]}')
    assert favourite_style == ['rgb(188, 0, 35)', '0.95'], favourite_style
    favourite_box = await favourite.locator('svg').bounding_box()
    assert favourite_box and abs(favourite_box['width'] - 9) < .05, favourite_box
    assert abs(favourite_box['height'] - 9) < .05, favourite_box
    row_styles = await first_row.evaluate('''(e)=>{
      const style = selector => getComputedStyle(e.querySelector(selector));
      return [style('.table-song-title').color, style('.table-text-link').color,
              style('.track-time').transform, style(':scope > .icon-button').color];
    }''')
    assert row_styles == [
        'rgb(41, 41, 43)', 'rgb(107, 107, 112)',
        'matrix(1, 0, 0, 1, 0, 1)', 'rgb(92, 92, 96)',
    ], row_styles
    more_box = await first_row.locator(':scope > .icon-button > svg').bounding_box()
    assert more_box and abs(more_box['width'] - 17) < .05, more_box
    rule_style = await first_row.evaluate(
        "(e)=>{const s=getComputedStyle(e,'::after');return [s.left,s.right,s.bottom,s.height,s.backgroundColor]}")
    assert rule_style == ['10px', '0px', '-1px', '1px', 'rgb(234, 234, 236)'], rule_style

    unavailable = chart_table.locator('.track-table-row[data-unavailable=true]')
    await expect(unavailable).to_have_count(1)
    await expect(unavailable.locator('.table-song-title')).to_be_disabled()
    await expect(unavailable.locator('.track-time')).to_be_empty()
    explicit = unavailable.locator('.explicit')
    explicit_box = await explicit.bounding_box()
    explicit_style = await explicit.evaluate(
        '(e)=>{const s=getComputedStyle(e);return [s.width,s.height,s.fontSize,s.lineHeight,s.borderRadius]}')
    assert explicit_box and abs(explicit_box['width'] - 9) < .05, explicit_box
    assert abs(explicit_box['height'] - 10) < .05, explicit_box
    assert explicit_style == ['9px', '10px', '7px', '10px', '2px'], explicit_style
    last_row_box = await chart_table.locator('.track-table-row').last.bounding_box()
    assert last_row_box and abs(last_row_box['y'] - 846) < .05, last_row_box
    assert abs(last_row_box['height'] - 51.5) < .05, last_row_box
    await record(page, 'discovery-typography-symbols', '8a234785',
                 'Open the chart through the real viral-section heading control')

    navigation = page.get_by_role('navigation', name='Browse music', exact=True)
    await navigation.get_by_role('button', name='New', exact=True).click()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'new')
    await expect(page.locator('.viral-hits-section .section-link svg').first).to_be_visible()
    await navigation.get_by_role('button', name='Home', exact=True).click()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'home')
    home_title = page.locator('.capture-home:lang(en) > .music-section:first-of-type .section-title-text')
    home_transform = await home_title.evaluate('(e)=>getComputedStyle(e).transform')
    assert home_transform == 'matrix(0.99, 0, 0, 1, -0.5, 0)', home_transform
    await record(page, 'discovery-typography-symbols', 'a917d88f',
                 'Navigate through the real Home control and retain lawful section typography')


    # Re-enter through visible controls before exercising the chart. The source-aligned
    # captures above remain idle; the assertions below prove the live path without
    # direct URL jumps, state injection or force clicks.
    await navigation.get_by_role('button', name='New', exact=True).click()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'new')
    await page.locator('.viral-hits-section .section-link').click()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'chart')
    chart_table = page.locator('.chart-page > .chart-table')
    first_row = chart_table.locator('.track-table-row').first
    player = page.locator('.now-playing')

    await first_row.get_by_role('button', name='Play drop dead', exact=True).click()
    await expect(page.get_by_role('button', name='Pause', exact=True)).to_be_visible()
    await expect(page.get_by_role('button', name='Expand drop dead', exact=True)).to_be_visible()
    await expect(player).to_contain_text('drop dead')
    assert await page.locator('audio').evaluate('(element)=>element.paused'), 'Reference preview must stay silent'

    favourite_control = first_row.get_by_role('button', name='Favourite drop dead', exact=True)
    await expect(favourite_control).to_have_attribute('aria-pressed', 'false')
    await favourite_control.click()
    unfavourite_control = first_row.get_by_role('button', name='Unfavourite drop dead', exact=True)
    await expect(unfavourite_control).to_have_attribute('aria-pressed', 'true')
    await unfavourite_control.click()
    await expect(favourite_control).to_have_attribute('aria-pressed', 'false')

    more = first_row.get_by_role('button', name='More actions for drop dead', exact=True)
    await more.click()
    menu = page.get_by_role('menu', name='track actions', exact=True)
    await expect(menu).to_be_visible()
    assert await menu.get_by_role('menuitem').all_text_contents() == [
        'Add to Library', 'Add to Playlist', 'Play Next', 'Play Last',
        'Create Station', 'Favourite', 'View Credits', 'Share',
        'Copy Link', 'Copy Embed Code',
    ]
    await page.keyboard.press('Escape')
    await expect(menu).to_have_count(0)
    await expect(more).to_be_focused()

    unavailable = chart_table.locator('.track-table-row[data-unavailable=true]')
    player_before = await player.get_attribute('aria-label')
    assert player_before == 'Expand drop dead', player_before
    await unavailable.get_by_role('button', name='Play Kiss It Better', exact=True).click()
    await expect(player).to_have_attribute('aria-label', player_before)
    await expect(player).to_contain_text('drop dead')

    await first_row.locator('.table-text-link').nth(0).click()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'artist')
    assert 'view=artist' in page.url, page.url
    await expect(page.locator('h1').first).to_have_text('Olivia Rodrigo')
    await expect(player).to_contain_text('drop dead')
    await page.go_back(wait_until='networkidle')
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'chart')
    await expect(player).to_contain_text('drop dead')

    chart_table = page.locator('.chart-page > .chart-table')
    await chart_table.locator('.track-table-row').first.locator('.table-text-link').nth(1).click()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'album')
    assert 'view=album' in page.url, page.url
    await expect(page.locator('h1').first).to_contain_text('you seem pretty sad for a girl so in love')
    await expect(player).to_contain_text('drop dead')
    await page.go_back(wait_until='networkidle')
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'chart')
    await expect(player).to_contain_text('drop dead')
    await page.get_by_role('button', name='Pause', exact=True).click()
    await expect(page.get_by_role('button', name='Play', exact=True)).to_be_visible()


CASES.append(('discovery-typography-symbols', discovery_typography_symbols))
