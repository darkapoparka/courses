"""Real modal gestures, draft preservation and keyboard focus containment."""
from playwright.async_api import expect
from browser_live_fidelity import start, record

async def open_playlist(page):
    await start(page, 'c939c9b8')
    opener = page.get_by_role('button', name='More song actions', exact=True)
    await opener.click()
    await page.get_by_role('menuitem', name='Add to Playlist', exact=True).hover()
    await page.get_by_role('menuitem', name='New Playlist…', exact=True).click()
    dialog = page.get_by_role('dialog', name='New Playlist', exact=True)
    await expect(dialog).to_be_visible()
    return dialog, opener

async def modal_draft_gestures(page, context):
    dialog, opener = await open_playlist(page)
    title = dialog.get_by_label('Playlist name', exact=True)
    await title.fill('Preserved draft')
    box = await title.bounding_box()
    assert box
    await page.mouse.move(box['x'] + 45, box['y'] + 14)
    await page.mouse.down()
    await page.mouse.move(100, 100, steps=12)
    await page.mouse.up()
    await expect(dialog).to_be_visible()
    await expect(title).to_have_value('Preserved draft')
    await record(page, 'modal-draft-gestures', '55ae9e4c', 'Dragging a draft field onto the backdrop does not discard the draft; interaction regression, not exact-state acceptance')
    await page.mouse.click(100, 100)
    await expect(dialog).to_have_count(0)
    await expect(opener).to_be_focused()
    await opener.click()
    await page.get_by_role('menuitem', name='Add to Playlist', exact=True).hover()
    await page.get_by_role('menuitem', name='New Playlist…', exact=True).click()
    await expect(dialog).to_be_visible()
    await page.keyboard.press('Escape')
    await expect(dialog).to_have_count(0)
    await expect(opener).to_be_focused()

async def modal_focus_surface(page, context):
    for prefix in ['55ae9e4c', '67446c83', '3c1805b6', '3131018d', '32515da3']:
        await start(page, prefix)
        dialog = page.locator('dialog[open]')
        await expect(dialog).to_be_visible()
        assert await dialog.evaluate('(e)=>getComputedStyle(e).outlineStyle') == 'none'
        await record(page, 'modal-focus-surface-' + prefix, prefix, 'Cold modal entry has no extra native outer frame')
        for _ in range(10):
            await page.keyboard.press('Tab')
            assert await dialog.evaluate('(e)=>e.contains(document.activeElement)'), prefix
        for _ in range(10):
            await page.keyboard.press('Shift+Tab')
            assert await dialog.evaluate('(e)=>e.contains(document.activeElement)'), prefix

CASES = [('modal-draft-gestures', modal_draft_gestures),
         ('modal-focus-surface', modal_focus_surface)]
