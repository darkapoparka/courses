"""Regression checks for the local library controls."""
from playwright.async_api import expect
from browser_live_fidelity import start, record, source
from qa_identity import reference_viewport

async def checkpoint(page, journey, prefix, action, **options):
    viewport = reference_viewport(source(prefix))
    if page.viewport_size != viewport:
        await page.set_viewport_size(viewport)
        action += ' (viewport follows the original acquisition)'
    await record(page, journey, prefix, action, **options)

async def sorting(page, context):
    journey = 'c454fe86-sorting-songs'
    await start(page, '92589389')
    titles = page.locator('.library-song-table .table-song-title')
    ascending = await titles.all_text_contents()
    await checkpoint(page, journey, '92589389', 'Initial Songs table')
    opener = page.get_by_role('button', name='Sort Songs', exact=True)
    await opener.click()
    menu = page.get_by_role('menu', name='sort actions', exact=True)
    await expect(menu.get_by_role('menuitemradio', name='Title', exact=True)).to_have_attribute('aria-checked', 'true')
    await checkpoint(page, journey, '09b3600e', 'Open the sort control', move_pointer=False)
    box = await menu.bounding_box()
    assert box and abs(box['x'] - 1243) < 1 and abs(box['y'] - 14) < 1, box
    await menu.get_by_role('menuitemradio', name='Descending', exact=True).click()
    await expect(menu).to_have_count(0)
    assert await titles.all_text_contents() == list(reversed(ascending))
    await checkpoint(page, journey, '1d016f0f', 'Select Descending')
    await opener.press('Enter')
    await expect(menu.get_by_role('menuitemradio', name='Title', exact=True)).to_be_focused()
    await page.keyboard.press('End')
    await expect(menu.get_by_role('menuitemradio', name='Descending', exact=True)).to_be_focused()
    await page.keyboard.press('Escape')
    await expect(opener).to_be_focused()

async def pinning(page, context):
    journey = '22c4db47-pinning-song'
    await start(page, '92589389')
    await checkpoint(page, journey, '92589389', 'Initial Songs table')
    row = page.locator('.track-table-row').filter(has=page.get_by_role('button', name='stupid song', exact=True))
    opener = row.get_by_role('button', name='More actions for stupid song', exact=True)
    await opener.hover()
    hovered_opacity = await row.locator('.table-art-state').evaluate('(e)=>getComputedStyle(e).opacity')
    await checkpoint(page, journey, 'e9bee76d', 'Hover the song row overflow', move_pointer=False)
    await opener.click()
    menu = page.get_by_role('menu', name='track actions', exact=True)
    await checkpoint(page, journey, '3884ff64', 'Open the song overflow', move_pointer=False)
    box = await menu.bounding_box()
    assert box and box['x'] == 625 and box['y'] == 287, box
    assert hovered_opacity == '1', hovered_opacity
    await menu.get_by_role('menuitem', name='Pin Song', exact=True).click()
    pins = page.get_by_role('navigation', name='Pins', exact=True)
    await expect(pins.get_by_role('button', name='stupid song', exact=False)).to_be_visible()
    await checkpoint(page, journey, '06be9f09', 'Pin the song through its menu')
    await opener.click()
    await menu.get_by_role('menuitem', name='Unpin Song', exact=True).click()
    await expect(pins).to_have_count(0)
    await expect(row.get_by_role('button', name='Unfavourite stupid song', exact=True)).to_have_attribute('aria-pressed', 'true')

async def library_editor(page, context):
    journey = '8db5f5fe-edit-library-menus'
    await start(page, 'e72be564')
    await checkpoint(page, journey, 'e72be564', 'Initial New page')
    # The archive changes catalog/account snapshots after the first still.
    # Preserve the live snapshot rather than manufacturing that discontinuity.
    catalog = await page.locator('.capture-discovery').inner_text()
    playlists = await page.get_by_role('navigation', name='Playlists', exact=True).inner_text()
    label = page.locator('.library-section-label')
    await label.hover()
    await expect(label.get_by_role('button', name='Edit', exact=True)).to_have_css('opacity', '1')
    await expect(label.get_by_role('button', name='Edit', exact=True)).to_have_css('color', 'rgb(34, 34, 34)')
    await expect(page.get_by_role('button', name='Create playlist', exact=True)).to_have_css('opacity', '0')
    await checkpoint(page, journey, 'f2e44e3b', 'Hover Library to reveal Edit', move_pointer=False)
    await label.get_by_role('button', name='Edit', exact=True).click()
    await expect(page.get_by_role('checkbox')).to_have_count(6)
    await checkpoint(page, journey, 'ffc18eb8', 'Enter library editing')
    hidden = ['Recently Added', 'Albums', 'Made for You']
    for name in hidden:
        await page.get_by_role('checkbox', name='Show ' + name, exact=True).uncheck()
    await checkpoint(page, journey, '3728aa07', 'Hide Recently Added, Albums and Made for You')
    await label.get_by_role('button', name='Done', exact=True).click()
    navigation = page.get_by_role('navigation', name='Music library', exact=True)
    assert await navigation.get_by_role('button').all_text_contents() == ['Artists', 'Songs', 'Music Videos']
    await checkpoint(page, journey, 'e5e8383f', 'Finish library editing; retain the initial catalog/account snapshot')
    assert await page.locator('.capture-discovery').inner_text() == catalog
    assert await page.get_by_role('navigation', name='Playlists', exact=True).inner_text() == playlists
    await label.hover()
    await label.get_by_role('button', name='Edit', exact=True).click()
    for name in hidden:
        await expect(page.get_by_role('checkbox', name='Show ' + name, exact=True)).not_to_be_checked()
        await page.get_by_role('checkbox', name='Show ' + name, exact=True).check()
    await label.get_by_role('button', name='Done', exact=True).click()
    await expect(navigation.get_by_role('button')).to_have_count(6)

CASES = [('recorded-sorting-songs', sorting), ('recorded-pinning-song', pinning),
         ('recorded-library-editor', library_editor)]

async def preferences_persist(page, context):
    # Ordinary navigation, separate from frozen fixtures: storage is intentionally
    # isolated while viewing a source fixture, but must work in the live app.
    from browser_live_fidelity import BASE
    await page.goto(BASE + '/?view=songs', wait_until='networkidle')
    await page.locator('[data-reference-ready=true]').wait_for()
    await page.get_by_role('button', name='More actions for stupid song', exact=True).click()
    await page.get_by_role('menuitem', name='Pin Song', exact=True).click()
    label = page.locator('.library-section-label')
    await label.hover()
    await label.get_by_role('button', name='Edit', exact=True).click()
    await page.get_by_role('checkbox', name='Show Albums', exact=True).uncheck()
    await label.get_by_role('button', name='Done', exact=True).click()
    await page.get_by_role('button', name='Sort Songs', exact=True).click()
    await page.get_by_role('menuitemradio', name='Descending', exact=True).click()
    titles = await page.locator('.table-song-title').all_text_contents()
    await page.reload(wait_until='networkidle')
    await page.locator('[data-reference-ready=true]').wait_for()
    assert await page.locator('.table-song-title').all_text_contents() == titles
    await expect(page.get_by_role('navigation', name='Pins', exact=True).get_by_role('button', name='stupid song', exact=False)).to_be_visible()
    await expect(page.get_by_role('navigation', name='Music library', exact=True).get_by_role('button', name='Albums', exact=True)).to_have_count(0)
    await page.set_viewport_size({'width': 390, 'height': 844})
    await page.get_by_role('button', name='Sort Songs', exact=True).click()
    box = await page.get_by_role('menu', name='sort actions', exact=True).bounding_box()
    assert box and box['x'] >= 8 and box['x'] + box['width'] <= 382, box
    await page.keyboard.press('Escape')

CASES.append(('library-preferences-persistence', preferences_persist))
