"""Expanded player artwork, live anchoring and presentation regressions."""
from playwright.async_api import expect
from browser_live_fidelity import start, record, source

async def assert_anchor(page):
    trigger = await page.get_by_role('button', name='More song actions', exact=True).bounding_box()
    box = await page.get_by_role('menu', name='track actions', exact=True).bounding_box()
    assert trigger and box
    assert abs(box['y'] + box['height'] - round(trigger['y'] + trigger['height']/2)) <= 1, (trigger, box)
    assert box['x'] >= 8 and box['x'] + box['width'] <= page.viewport_size['width'] - 7, box
    assert box['y'] >= 8, box
    return box

async def clean_artwork(page, context):
    for prefix in ['ac05c6b8', '96711b04', '0c6da10e']:
        await start(page, prefix)
        art = page.locator('.expanded-left > .music-art')
        await expect(art).to_have_attribute('data-art-source', source('c939c9b8'))
        signature = '(e)=>[e.dataset.artSource, ...Array.from(e.querySelectorAll("[data-art-source]"), a=>[a.dataset.artSource,a.getAttribute("style")])]'
        before = await art.evaluate(signature)
        await expect(art.locator('.expanded-artwork-base > .music-art')).to_have_attribute('data-art-source', source('c939c9b8'))
        await expect(art.locator('.expanded-artwork-top > .music-art')).to_have_attribute('data-art-source', source(prefix))
        await expect(art.locator('.expanded-artwork-left > .music-art')).to_have_attribute('data-art-source', source(prefix))
        await record(page, 'expanded-clean-artwork-' + prefix, prefix, 'Clean artwork beneath the real menu')
        await page.keyboard.press('Escape')
        await expect(page.get_by_role('menu')).to_have_count(0)
        assert await art.evaluate(signature) == before
        await record(page, 'expanded-clean-artwork-' + prefix, prefix, 'Dismiss menu; no menu pixels remain in the album artwork')
        await page.get_by_role('button', name='More song actions', exact=True).click()
        await assert_anchor(page)
        assert await art.evaluate(signature) == before

async def library_resize(page, context):
    await start(page, 'c939c9b8')
    opener = page.get_by_role('button', name='More song actions', exact=True)
    await opener.click()
    menu = page.get_by_role('menu', name='track actions', exact=True)
    initial = await assert_anchor(page)
    await expect(menu.get_by_role('menuitem')).to_have_count(10)
    await menu.get_by_role('menuitem', name='Add to Library', exact=True).click()
    await expect(menu.get_by_role('menuitem', name='Pin Song', exact=True)).to_be_visible()
    await page.wait_for_timeout(50)
    grown = await assert_anchor(page)
    assert abs(grown['height'] - initial['height'] - 30.5) < 1, (initial, grown)
    remove = menu.get_by_role('menuitem', name='Delete from Library', exact=True)
    await expect(remove.locator('svg')).to_have_count(0)
    await expect(remove).to_be_focused()
    await record(page, 'expanded-menu-library-resize', 'c939c9b8', 'Add to Library grows the real menu upward without moving its bottom anchor')
    await remove.click()
    await expect(menu.get_by_role('menuitem', name='Pin Song', exact=True)).to_have_count(0)
    await page.wait_for_timeout(50)
    assert await assert_anchor(page) == initial
    await page.keyboard.press('Escape')
    await expect(opener).to_be_focused()
    await page.set_viewport_size({'width': 768, 'height': 903})
    await opener.click()
    await assert_anchor(page)

async def flyout_controls(page, context):
    await start(page, 'c939c9b8')
    await page.get_by_role('button', name='More song actions', exact=True).click()
    menu = page.get_by_role('menu', name='track actions', exact=True)
    trigger = menu.get_by_role('menuitem', name='Add to Playlist', exact=True)
    flyout = page.get_by_role('menu', name='Add to playlist', exact=True)
    await trigger.hover()
    await expect(flyout).to_be_visible()
    await menu.get_by_role('menuitem', name='Play Next', exact=True).hover()
    await expect(flyout).to_have_count(0)
    await trigger.focus()
    await trigger.press('ArrowRight')
    await expect(flyout.get_by_role('menuitem').first).to_be_focused()
    await page.keyboard.press('ArrowLeft')
    await expect(flyout).to_have_count(0)
    await expect(trigger).to_be_focused()
    await trigger.press('ArrowRight')
    await flyout.get_by_role('menuitem').first.click()
    await expect(page.get_by_role('dialog')).to_be_visible()
    await page.keyboard.press('Escape')
    await expect(page.get_by_role('dialog')).to_have_count(0)
    await expect(page.locator('.expanded-player')).to_be_visible()
    await record(page, 'expanded-flyout-controls', 'c939c9b8', 'Pointer dismissal, keyboard entry/return, create dialog and Escape preserve the player')

async def presentation_controls(page, context):
    for prefix, phase in [('c939c9b8','opening'), ('b3f29b6f','verse'), ('ac05c6b8','walk'), ('96711b04','bond'), ('0c6da10e','dream'), ('a4d30e7d','outro')]:
        await start(page, prefix)
        player = page.locator('.expanded-player')
        await expect(player).to_have_attribute('data-player-ambience', phase)
        background = await player.evaluate('(e)=>getComputedStyle(e).backgroundImage')
        if await page.get_by_role('menu').count():
            await page.keyboard.press('Escape')
        await page.get_by_role('button', name='More song actions', exact=True).click()
        await page.keyboard.press('Escape')
        assert await player.evaluate('(e)=>getComputedStyle(e).backgroundImage') == background
        assert await page.locator('.music-app').get_attribute('data-source') is None
        await page.get_by_role('button', name='Hide lyrics', exact=True).click()
        await expect(player).to_have_attribute('data-player-ambience', 'instrumental')
        await page.get_by_role('button', name='Show lyrics', exact=True).click()
        assert await player.evaluate('(e)=>getComputedStyle(e).backgroundImage') == background
        await record(page, 'expanded-presentation-' + prefix, prefix, 'Menu and lyric toggles preserve the playback-owned visual phase')
    await start(page, '96711b04')
    await page.keyboard.press('Escape')
    lyrics = page.get_by_label('Reference lyrics', exact=True)
    prior = lyrics.locator('li[data-before="true"]').last
    await expect(prior).to_have_attribute('inert', '')
    await expect(prior).to_have_css('visibility', 'hidden')
    await lyrics.hover()
    await page.mouse.wheel(0, -300)
    await expect(prior).not_to_have_attribute('inert', '')
    await expect(prior).to_have_css('visibility', 'visible')
    seek = page.get_by_role('slider', name='Playback position', exact=True)
    await seek.fill('54')
    await expect(page.locator('.expanded-player')).to_have_attribute('data-player-ambience', 'verse')
    await seek.fill('81')
    await expect(page.locator('.expanded-player')).to_have_attribute('data-player-ambience', 'bond')
    await expect(lyrics).to_have_attribute('data-following', 'true')
    await expect(lyrics.locator('li[data-before="true"]').last).to_have_attribute('inert', '')

CASES = [('expanded-clean-artwork', clean_artwork),
         ('expanded-menu-library-resize', library_resize),
         ('expanded-flyout-controls', flyout_controls),
         ('expanded-presentation-controls', presentation_controls)]


async def manual_reading(page, context):
    """A clock tick must not steal a manually browsed lyric viewport."""
    await start(page, 'c939c9b8')
    await page.get_by_role('button', name='Pause', exact=True).click()
    seek = page.get_by_role('slider', name='Playback position', exact=True)
    await seek.fill('79')
    await page.get_by_role('button', name='Play', exact=True).click()
    lyrics = page.get_by_label('Reference lyrics', exact=True)
    await lyrics.hover()
    await page.mouse.wheel(0, -220)
    await expect(lyrics).not_to_have_attribute('data-following', 'true')
    await page.wait_for_timeout(150)
    top = await lyrics.evaluate('(e)=>e.scrollTop')
    await expect(lyrics.locator('li').nth(17)).to_have_attribute('aria-current', 'true')
    await page.get_by_role('button', name='Pause', exact=True).click()
    await expect(lyrics).not_to_have_attribute('data-following', 'true')
    assert abs(await lyrics.evaluate('(e)=>e.scrollTop') - top) <= 1
    await record(page, 'expanded-manual-reading', '96711b04',
                 'Manual browsing survives a real playback anchor; regression, not archived FLOW acceptance')
    await seek.fill('83')
    await expect(lyrics).to_have_attribute('data-following', 'true')
    box = await lyrics.locator('li[aria-current="true"]').bounding_box()
    assert box and abs(box['y'] - 326) <= 1, box
    await expect(lyrics.locator('li[data-before="true"]').last).to_have_attribute('inert', '')

CASES.append(('expanded-manual-reading', manual_reading))


async def lyric_line_layout(page, context):
    """Saved lyric layout uses real words and keeps panel/mobile wrapping independent."""
    for prefix, first_line_words, sung in [
        ('c939c9b8', 6, 3), ('b3f29b6f', 8, 3), ('ac05c6b8', 5, 4),
        ('96711b04', 8, 7), ('0c6da10e', 9, None), ('55ae9e4c', 5, None), ('a4d30e7d', None, 1),
    ]:
        await start(page, prefix)
        current = page.locator('.lyric-viewport li[aria-current="true"]')
        words = current.locator('.lyric-word')
        rows = await words.evaluate_all('(els)=>els.map(e=>({top:e.getBoundingClientRect().top,unsung:e.dataset.unsung}))')
        assert rows
        if first_line_words:
            assert rows[first_line_words]['top'] - rows[0]['top'] == 48, (prefix, rows)
            assert rows[first_line_words - 1]['top'] == rows[0]['top'], (prefix, rows)
        else:
            assert all(row['top'] == rows[0]['top'] for row in rows), (prefix, rows)
        assert sum(row.get('unsung') == 'true' for row in rows) == (len(rows) - sung if sung else 0)
        await expect(current).to_have_css('letter-spacing', 'normal')
        await expect(current).to_have_css('margin-bottom', '46px')
        following_line = current.locator('xpath=following-sibling::li[1]')
        gap = '32px' if await following_line.locator('.expanded-lyric-break').count() else '46px'
        await expect(following_line).to_have_css('margin-bottom', gap)
        await record(page, 'expanded-lyric-line-layout-' + prefix, prefix,
                     'Recorded word wrapping, sung emphasis and distinct active/following gaps')
    await page.set_viewport_size({'width': 390, 'height': 844})
    await expect(page.locator('.expanded-lyric-break').first).to_have_css('display', 'none')
    assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth')
    await start(page, 'ee8db412')
    await expect(page.locator('.panel-lyric-viewport .lyric-word')).to_have_count(0)
    await expect(page.locator('.panel-lyric-viewport li[aria-current="true"]')).to_have_css('line-height', '27px')

CASES.append(('expanded-lyric-line-layout', lyric_line_layout))


async def artwork_timeline(page, context):
    """Seeking follows the artwork timeline, without resetting user state."""
    await start(page, 'c939c9b8')
    await page.get_by_role('button', name='Pause', exact=True).click()
    art = page.locator('.expanded-left > .music-art')
    for seconds, prefix, clean, highlight in [
        (54, 'b3f29b6f', 'b3f29b6f', None), (73, 'ac05c6b8', 'c939c9b8', 'walk'),
        (81, '96711b04', 'c939c9b8', 'bond'), (101, '0c6da10e', 'c939c9b8', 'dream'),
        (167, 'a4d30e7d', 'a4d30e7d', None),
    ]:
        await page.get_by_role('slider', name='Playback position', exact=True).fill(str(seconds))
        await expect(art).to_have_attribute('data-art-source', source(clean))
        assert await art.get_attribute('data-art-highlight') == highlight
        signature = await art.get_attribute('data-art-source')
        await page.get_by_role('button', name='Hide lyrics', exact=True).click()
        await expect(art).to_have_attribute('data-art-source', signature)
        assert await art.get_attribute('data-art-highlight') == highlight
        await page.get_by_role('button', name='Show lyrics', exact=True).click()
        await expect(art).to_have_attribute('data-art-source', signature)
        await expect(page.get_by_role('button', name='Play', exact=True)).to_be_visible()
        await record(page, 'expanded-artwork-timeline', prefix,
                     'Real seeking and lyric toggles retain playback artwork; regression, not archived FLOW acceptance')

CASES.append(('expanded-artwork-timeline', artwork_timeline))


async def bridge_lyric_following(page, context):
    """The bridge shows one preceding line; manual reading still reveals history."""
    await start(page, '55ae9e4c')
    lyrics = page.get_by_label('Reference lyrics', exact=True)
    await expect(lyrics).to_have_attribute('data-following', 'true')
    await expect(lyrics.locator('li').nth(22)).to_have_css('visibility', 'visible')
    await expect(lyrics.locator('li').nth(21)).to_have_css('visibility', 'hidden')
    await expect(lyrics.locator('li').nth(21)).to_have_attribute('inert', '')
    await record(page, 'bridge-lyric-following', '55ae9e4c', 'Captured bridge wrapping and one preceding line beneath the live playlist dialog')
    await page.keyboard.press('Escape')
    await expect(page.get_by_role('dialog')).to_have_count(0)
    await lyrics.hover()
    await page.mouse.wheel(0, -150)
    await expect(lyrics).not_to_have_attribute('data-following', 'true')
    await expect(lyrics.locator('li').nth(21)).to_have_css('visibility', 'visible')
    await page.get_by_role('slider', name='Playback position', exact=True).fill('111')
    await expect(lyrics).to_have_attribute('data-following', 'true')
    await expect(lyrics.locator('li').nth(21)).to_have_css('visibility', 'hidden')
    await expect(lyrics.locator('li').nth(22)).to_have_css('visibility', 'visible')
    current = lyrics.locator('li[aria-current="true"]')
    assert await current.evaluate('(e)=>e.getBoundingClientRect().y') == 326
    assert await current.locator('.lyric-word').nth(5).evaluate('(e)=>e.getBoundingClientRect().y') - await current.locator('.lyric-word').first.evaluate('(e)=>e.getBoundingClientRect().y') == 48

CASES.append(('bridge-lyric-following', bridge_lyric_following))
