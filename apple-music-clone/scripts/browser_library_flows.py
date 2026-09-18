"""Complete recorded library journeys, using a fixture only for the first step."""
from playwright.async_api import expect
from browser_live_fidelity import start, record

async def begin(page, journey, prefix='e72be564'):
    await start(page, prefix)
    await record(page, journey, prefix, 'Initial recorded state')

async def navigate(page, name, scene, navigation='Music library'):
    await page.get_by_role('navigation', name=navigation, exact=True).get_by_role('button', name=name, exact=True).click()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', scene)
    playlists = page.get_by_role('navigation', name='Playlists', exact=True)
    await expect(playlists.get_by_role('button', name='Favourite Songs', exact=True)).to_be_visible()
    await expect(playlists.get_by_role('button', name='Emotional Songs', exact=True)).to_be_visible()

async def assert_library_topbar(page, expected_height):
    topbar = await page.locator('.library-topbar').bounding_box()
    title = await page.locator('.library-topbar > h1').bounding_box()
    sort = await page.locator('.library-topbar .library-sort').bounding_box()
    assert topbar and title and sort
    assert abs(topbar['height'] - expected_height) < .05, topbar
    assert abs((title['x'] + title['width'] / 2) - (topbar['x'] + topbar['width'] / 2 - 6)) < .05, (topbar, title)
    assert abs((title['y'] + title['height'] / 2) - 16.5) < .05, title
    assert abs((topbar['x'] + topbar['width']) - (sort['x'] + sort['width']) - 18) < .05, (topbar, sort)
    assert abs(sort['y'] - 6) < .05 and abs(sort['height'] - 22) < .05, sort

async def assert_search_toolbar(page, focused=False, at_bottom=False):
    search = page.locator('.capture-search')
    field = search.locator('.search-field')
    field_box = await field.bounding_box()
    assert field_box and abs(field_box['x'] - 590) < .05 and abs(field_box['y'] - 13) < .05, field_box
    assert abs(field_box['width'] - 508) < .05 and abs(field_box['height'] - 33) < .05, field_box
    glyph_box = await field.locator(':scope > svg').bounding_box()
    assert glyph_box and abs(glyph_box['x'] - 602) < .05 and abs(glyph_box['y'] - 22) < .05, glyph_box
    style = await field.evaluate('(e)=>{const s=getComputedStyle(e);return [s.backgroundColor,s.boxShadow]}')
    if focused:
        assert style == ['rgba(255, 255, 255, 0.94)',
                         'rgba(190, 91, 104, 0.78) 0px 0px 0px 4px, rgba(0, 0, 0, 0.12) 0px 8px 32px 0px'], style
        clear = field.get_by_role('button', name='Clear search', exact=True)
        clear_box = await clear.bounding_box()
        assert clear_box and abs(clear_box['x'] - 1064) < .05 and abs(clear_box['y'] - 18.5) < .05, clear_box
        clear_material = await clear.evaluate(
            "(e)=>{const p=getComputedStyle(e,'::before');return [p.width,p.height,p.borderRadius,p.backgroundColor]}")
        assert clear_material == ['13px', '13px', '50%', 'rgb(121, 121, 127)'], clear_material
        clear_icon = await clear.locator('svg').evaluate(
            '(e)=>{const s=getComputedStyle(e);return [s.width,s.height,s.color,s.strokeWidth]}')
        assert clear_icon == ['14px', '14px', 'rgb(255, 255, 255)', '2.8px'], clear_icon
    elif at_bottom:
        assert style == ['rgba(255, 255, 255, 0.93)',
                         'rgba(0, 0, 0, 0.07) 0px 8px 27px 0px, rgba(237, 237, 240, 0.47) 0px 0px 0px 1px'], style
    else:
        assert style == ['rgba(255, 255, 255, 0.94)',
                         'rgba(0, 0, 0, 0.12) 0px 8px 32px 0px, rgba(237, 237, 240, 0.2) 0px 0px 0px 1px'], style

async def assert_search_player(page):
    material = await page.locator('.floating-player').evaluate(
        '(e)=>{const s=getComputedStyle(e);return [s.backgroundColor,s.backdropFilter]}')
    assert material == ['rgba(249, 249, 251, 0.44)', 'blur(16px) saturate(1.4)'], material

async def artists(page, context):
    journey = '9decd1cd-artists'
    await begin(page, journey)
    await navigate(page, 'Artists', 'artists')
    await assert_library_topbar(page, 35)
    panel = page.locator('.library-artist-content')
    await expect(panel.get_by_role('heading')).to_contain_text('Ariana Grande')
    await expect(panel.locator('.media-card')).to_have_count(1)
    await record(page, journey, '0df0d2a2', 'Select Artists from the sidebar')
    await page.get_by_role('navigation', name='Library artists', exact=True).get_by_role('button', name='Olivia Rodrigo', exact=False).click()
    await expect(panel.get_by_role('heading')).to_contain_text('Olivia Rodrigo')
    await expect(panel.locator('.media-card')).to_have_count(2)
    await record(page, journey, '610af644', 'Select Olivia Rodrigo from the artist list')

async def albums(page, context):
    journey = '2797b86f-albums'
    await begin(page, journey)
    await navigate(page, 'Albums', 'albums')
    await assert_library_topbar(page, 45)
    await expect(page.locator('.library-grid .media-card')).to_have_count(6)
    await record(page, journey, '5d3db7ca', 'Select Albums from the sidebar')

async def songs(page, context):
    journey = '0e305ee9-songs'
    await begin(page, journey)
    await navigate(page, 'Songs', 'songs')
    await assert_library_topbar(page, 35)
    # The saved Songs original contains eight rows, not ten.
    assert await page.locator('.library-song-table .table-song-title').all_text_contents() == [
        'BIRDS OF A FEATHER', 'Cruel Summer', 'deja vu', 'jealousy, jealousy',
        'So Easy (To Fall In Love)', 'stupid song', "we can't be friends (wait for your love)", 'WILDFLOWER']
    await expect(page.get_by_role('table', name='Songs', exact=True)).to_be_visible()
    await expect(page.get_by_role('button', name='stupid song', exact=True)).to_be_visible()
    await record(page, journey, '92589389', 'Select Songs from the sidebar')

async def music_videos(page, context):
    journey = '51ec8869-music-videos'
    await begin(page, journey)
    await navigate(page, 'Music Videos', 'videos')
    await assert_library_topbar(page, 35)
    cards = page.locator('.library-grid .media-card')
    assert await cards.locator('.card-title').all_text_contents() == ['Begged (Lyric Video)', 'BIRDS OF A FEATHER', 'You Need To Calm Down']
    for card in await cards.all():
        box = await card.locator('.card-art-button').bounding_box()
        assert box and abs(box['width'] / box['height'] - 16 / 9) < .02, box
    await record(page, journey, '4e857921', 'Select Music Videos from the sidebar')

async def all_playlists(page, context):
    journey = 'b49a8505-all-playlists'
    await begin(page, journey)
    await navigate(page, 'All Playlists', 'playlists', 'Playlists')
    titles = page.locator('.library-grid .card-title')
    assert await titles.count() == 2
    assert [await titles.nth(index).evaluate('(e)=>e.firstChild?.textContent') for index in range(2)] == [
        'Emotional Songs', 'Favourite Songs']
    await expect(page.locator('.library-sort')).to_have_count(0)
    favourite_star = titles.nth(1).locator('.card-favourite-star')
    await expect(favourite_star).to_have_text('★')
    await expect(favourite_star).to_have_attribute('aria-hidden', 'true')
    star_box = await favourite_star.bounding_box()
    assert star_box and abs(star_box['x'] - 600.578125) < .05, star_box
    assert abs(star_box['y'] - 224.203125) < .05, star_box
    # Chromium's system star advance is 9.171875 px on Windows and 10 px on Ubuntu.
    assert min(abs(star_box['width'] - width) for width in (9.171875, 10)) < .05, star_box
    assert abs(star_box['height'] - 8) < .05, star_box
    star_style = await favourite_star.evaluate(
        '(e)=>{const s=getComputedStyle(e);return [s.fontSize,s.lineHeight,s.color,s.transform,s.marginLeft]}')
    assert star_style == [
        '11px', '8px', 'rgb(172, 8, 24)', 'matrix(1, 0, 0, 1, 0, -1)', '0px'], star_style
    await record(page, journey, '8a2a4241', 'Select All Playlists from the sidebar')

    player_signature = await page.locator('.floating-player').evaluate(
        '(e)=>[e.className,e.getAttribute("aria-label"),e.textContent]')
    emotional_art = page.locator('[data-card-id=emotional] .card-art-button')
    await emotional_art.hover()
    await expect(emotional_art.locator('.card-play')).to_have_css('opacity', '1')
    await emotional_art.click()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'playlist')
    await expect(page.get_by_role('heading', name='Emotional Songs', exact=True)).to_be_visible()
    await page.go_back(wait_until='networkidle')
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'playlists')
    assert await page.locator('.floating-player').evaluate(
        '(e)=>[e.className,e.getAttribute("aria-label"),e.textContent]') == player_signature

    favourite_title = page.locator('[data-card-id=favourites] .card-title')
    await favourite_title.click()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'favourites')
    await expect(page.get_by_role('heading', name='Favourite Songs', exact=False)).to_be_visible()
    await page.go_back(wait_until='networkidle')
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'playlists')
    await expect(page.locator('.library-sort')).to_have_count(0)
    await expect(page.locator('.card-favourite-star')).to_be_visible()
    assert await page.locator('.floating-player').evaluate(
        '(e)=>[e.className,e.getAttribute("aria-label"),e.textContent]') == player_signature

async def playlist_detail(page, context):
    journey = 'c12bd09a-playlist-detail'
    await begin(page, journey, '8a2a4241')
    await page.locator('.library-grid').get_by_role('button', name='Emotional Songs', exact=True).first.click()
    await expect(page.get_by_role('heading', name='Emotional Songs', exact=True)).to_be_visible()
    assert await page.locator('.track-table .table-song-title').all_text_contents() == ['stupid song', 'the cure', 'drivers license']
    await expect(page.locator('.playlist-description')).to_have_text('just in case I wanna cry')
    await record(page, journey, 'a573d1ab', 'Open the Emotional Songs playlist card')

async def suggested_song(page, context):
    journey = '14785972-add-suggested-song'
    await begin(page, journey, 'a573d1ab')
    await page.get_by_role('button', name='Add vampire to Emotional Songs', exact=True).click()
    assert await page.locator('.track-table .table-song-title').all_text_contents() == ['stupid song', 'the cure', 'drivers license', 'vampire']
    await expect(page.locator('.playlist-count')).to_have_text('4 songs, 16 minutes')
    await expect(page.get_by_role('button', name='Add vampire to Emotional Songs', exact=True)).to_have_count(0)
    await record(page, journey, '5044abe5', 'Add vampire using the suggested-song control')

async def favourite_songs(page, context):
    journey = '6f857f3f-favourite-songs'
    await begin(page, journey, 'a917d88f')
    await navigate(page, 'Favourite Songs', 'favourites', 'Playlists')
    assert await page.locator('.track-table .table-song-title').all_text_contents() == ['BIRDS OF A FEATHER', 'deja vu', 'WILDFLOWER', 'stupid song']
    await expect(page.get_by_role('heading', name='Favourite Songs', exact=False)).to_be_visible()
    await record(page, journey, 'bde65d33', 'Open Favourite Songs from the sidebar')

async def recorded_search(page, context):
    journey = '6c5d545e-search'
    await begin(page, journey)

    navigation = page.get_by_role('navigation', name='Browse music', exact=True)
    player = page.locator('.floating-player')
    player_signature = await player.evaluate(
        '(e)=>[e.className,e.getAttribute("aria-label"),e.textContent]')

    await navigation.get_by_role('button', name='Search', exact=True).click()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'search')
    await expect(page.get_by_role('heading', name='Recently Searched', exact=True)).to_be_visible()
    await expect(page.get_by_role('button', name='Apple Music', exact=True)).to_have_attribute('aria-pressed', 'true')
    await page.locator('.capture-search [data-art-source]').first.wait_for()
    await page.evaluate(r"""async () => {
      const urls = [...new Set([...document.querySelectorAll('.capture-search [data-art-source]')].map(element => {
        const match = getComputedStyle(element).backgroundImage.match(/url\(["']?(.*?)["']?\)/);
        return match?.[1];
      }).filter(Boolean))];
      await Promise.all(urls.map(url => new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = resolve; image.onerror = reject; image.src = url;
        if (image.complete) image.decode().then(resolve, reject);
      })));
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }""")
    playlists = page.get_by_role('navigation', name='Playlists', exact=True)
    assert await playlists.get_by_role('button').all_text_contents() == [
        'All Playlists', 'Favourite Songs', 'Emotional Songs']
    await assert_search_toolbar(page)
    await assert_search_player(page)
    await record(page, journey, '035569a0', 'Open Search through the visible sidebar control')

    main = page.locator('.music-main')
    await main.hover()
    await page.mouse.wheel(0, 5000)
    await page.wait_for_timeout(150)
    scroll = await main.evaluate('(e)=>[e.scrollTop,e.scrollHeight,e.clientHeight]')
    assert abs(scroll[0] - (scroll[1] - scroll[2])) < 1, scroll
    await expect(page.get_by_text('Mandopop', exact=True)).to_be_visible()
    classes = (await page.locator('.capture-search').get_attribute('class') or '').split()
    assert 'search-at-bottom' in classes, classes
    await assert_search_toolbar(page, at_bottom=True)
    await assert_search_player(page)
    await record(page, journey, '812ba627', 'Scroll the real Search surface to its recorded bottom state')

    await page.get_by_role('button', name='Your Library', exact=True).click()
    await expect(page.get_by_role('button', name='Your Library', exact=True)).to_have_attribute('aria-pressed', 'true')
    empty = page.locator('.capture-search > .empty-state')
    await expect(empty.locator(':scope > p')).to_have_text('Search in Library')
    classes = (await page.locator('.capture-search').get_attribute('class') or '').split()
    assert {'library-search-results', 'short-page', 'library-search-empty'}.issubset(classes), classes
    assert 'search-at-bottom' not in classes, classes
    assert await main.evaluate('(e)=>e.scrollTop') == 0
    assert await playlists.get_by_role('button').all_text_contents() == ['All Playlists']

    search_field = page.locator('.search-field')
    field_box = await search_field.bounding_box()
    assert field_box and abs(field_box['x'] - 590) < .05 and abs(field_box['y'] - 13) < .05, field_box
    assert abs(field_box['width'] - 508) < .05 and abs(field_box['height'] - 33) < .05, field_box
    glyph_box = await search_field.locator(':scope > svg').bounding_box()
    assert glyph_box and abs(glyph_box['x'] - 595) < .05 and abs(glyph_box['y'] - 22) < .05, glyph_box

    segmented = page.locator('.segmented')
    segmented_box = await segmented.bounding_box()
    assert segmented_box and abs(segmented_box['x'] + segmented_box['width'] - 1418) < .05, segmented_box
    assert abs(segmented_box['y'] - 12.5) < .05 and abs(segmented_box['height'] - 34) < .05, segmented_box
    assert 187 <= segmented_box['width'] <= 190.5, segmented_box

    svg_box = await empty.locator(':scope > svg').bounding_box()
    text_box = await empty.locator(':scope > p').bounding_box()
    assert svg_box and abs(svg_box['x'] - 822.0050048828125) < .06, svg_box
    assert abs(svg_box['y'] - 323.0050048828125) < .06 and abs(svg_box['width'] - 39.989990234375) < .06, svg_box
    assert text_box and abs(text_box['x'] + text_box['width'] / 2 - 844) < .06, text_box
    assert abs(text_box['y'] - 371.5) < .06 and abs(text_box['height'] - 22) < .06, text_box
    assert 107 <= text_box['width'] <= 112.5, text_box
    styles = await empty.evaluate("(e)=>{const svg=getComputedStyle(e.querySelector(':scope > svg'));const text=getComputedStyle(e.querySelector(':scope > p'));return [svg.color,svg.transform,text.fontSize,text.lineHeight,text.color,text.transform]}")
    assert styles == ['rgb(122, 122, 122)', 'matrix(1.29, 0, 0, 1.29, -2, -1.5)',
                      '14.25px', '22px', 'rgb(108, 108, 108)', 'matrix(1, 0, 0, 1, 0, -1.5)'], styles
    assert await player.evaluate(
        '(e)=>[e.className,e.getAttribute("aria-label"),e.textContent]') == player_signature
    await record(page, journey, '5b3ec96a', 'Switch to Your Library through the sticky real control')

    await page.get_by_role('button', name='Apple Music', exact=True).click()
    await expect(page.get_by_role('heading', name='Recently Searched', exact=True)).to_be_visible()
    assert await playlists.get_by_role('button').all_text_contents() == [
        'All Playlists', 'Favourite Songs', 'Emotional Songs']
    await page.get_by_role('button', name='Your Library', exact=True).click()
    await expect(empty.locator(':scope > p')).to_have_text('Search in Library')

    field = page.get_by_label('Search Apple Music', exact=True)
    await field.fill('Olivia')
    suggestions = page.get_by_role('listbox', name='Search suggestions', exact=True)
    await expect(suggestions).to_be_visible()
    await expect(field).to_have_attribute('aria-expanded', 'true')
    await field.press('Escape')
    await expect(suggestions).to_have_count(0)
    await expect(field).to_be_focused()
    await field.press('Enter')
    await expect(page.get_by_role('heading', name='Songs', exact=True)).to_be_visible()
    await expect(page.locator('.library-result-songs .song-row')).to_have_count(4)
    await expect(page.get_by_role('button', name='Clear search', exact=True)).to_have_count(0)
    await field.focus()
    await expect(page.get_by_role('button', name='Clear search', exact=True)).to_be_visible()
    await page.get_by_role('button', name='Clear search', exact=True).click()
    await expect(field).to_have_value('')
    await expect(empty.locator(':scope > p')).to_have_text('Search in Library')
    assert await playlists.get_by_role('button').all_text_contents() == ['All Playlists']
    assert await player.evaluate(
        '(e)=>[e.className,e.getAttribute("aria-label"),e.textContent]') == player_signature


async def searching_apple_music(page, context):
    journey = '638262c8-searching-apple-music'
    await start(page, '035569a0')
    await expect(page.get_by_role('heading', name='Recently Searched', exact=True)).to_be_visible()
    await assert_search_toolbar(page)
    await assert_search_player(page)
    player_signature = await page.locator('.floating-player').evaluate(
        '(e)=>[e.className,e.getAttribute("aria-label"),e.textContent]')
    await record(page, journey, '035569a0', 'Initial Apple Music Search surface')

    field = page.get_by_label('Search Apple Music', exact=True)
    await field.focus()
    await field.fill('olivia')
    suggestions = page.get_by_role('listbox', name='Search suggestions', exact=True)
    await expect(suggestions).to_be_visible()
    await expect(field).to_have_attribute('aria-expanded', 'true')
    classes = (await page.locator('.capture-search').get_attribute('class') or '').split()
    assert 'search-suggestions-open' in classes, classes
    await assert_search_toolbar(page, focused=True)
    suggestion_material = await suggestions.evaluate(
        '(e)=>{const s=getComputedStyle(e);return [s.backgroundColor,s.backdropFilter]}')
    assert suggestion_material == ['rgba(248, 247, 248, 0.75)', 'blur(36px) saturate(1.08)'], suggestion_material
    await assert_search_player(page)
    await record(page, journey, '4b515439', 'Type olivia into the real Search field', move_pointer=False)

    await field.press('Enter')
    await expect(page.get_by_role('heading', name='Top Results', exact=True)).to_be_visible()
    await expect(page.get_by_role('button', name='Clear search', exact=True)).to_have_count(0)
    album_result = page.locator('.capture-result').filter(has_text='you seem pretty sad for a girl so in love')
    await expect(album_result.locator('.explicit')).to_have_text('E')
    albums = page.locator('.capture-search .square-rail .music-rail')
    assert await albums.evaluate("e => getComputedStyle(e).gap") == "19px"
    boxes = await albums.locator('.media-card').evaluate_all(
        "items => items.map(e => [e.getBoundingClientRect().x, e.getBoundingClientRect().width, getComputedStyle(e).flexBasis])")
    assert boxes == [[286, 208, 'calc(20% - 15.2px)'], [513, 208, 'calc(20% - 15.2px)'],
                     [740, 208, 'calc(20% - 15.2px)'], [967, 208, 'calc(20% - 15.2px)'],
                     [1194, 208, 'calc(20% - 15.2px)']], boxes
    await assert_search_toolbar(page)
    await assert_search_player(page)
    await record(page, journey, 'e70094e3', 'Submit the query through the Search form')

    await page.get_by_role('button', name='Your Library', exact=True).click()
    await expect(page.get_by_role('button', name='Your Library', exact=True)).to_have_attribute('aria-pressed', 'true')
    await expect(page.get_by_role('heading', name='Songs', exact=True)).to_be_visible()
    await expect(page.locator('.library-result-songs .song-row')).to_have_count(4)
    await expect(page.get_by_role('button', name='Clear search', exact=True)).to_have_count(0)
    await assert_search_toolbar(page)
    await assert_search_player(page)
    assert await page.locator('.floating-player').evaluate(
        '(e)=>[e.className,e.getAttribute("aria-label"),e.textContent]') == player_signature
    await record(page, journey, 'bbb92581', 'Switch the submitted query to Your Library')

    await field.focus()
    await expect(page.get_by_role('button', name='Clear search', exact=True)).to_be_visible()
    await field.press('Escape')
    await expect(suggestions).to_have_count(0)
    await expect(field).to_be_focused()


CASES = [('recorded-library-artists', artists), ('recorded-library-albums', albums),
         ('recorded-library-songs', songs), ('recorded-library-videos', music_videos),
         ('recorded-all-playlists', all_playlists), ('recorded-playlist-detail', playlist_detail),
         ('recorded-suggested-song', suggested_song), ('recorded-favourite-songs', favourite_songs),
         ('recorded-search', recorded_search), ('recorded-searching-apple-music', searching_apple_music)]
