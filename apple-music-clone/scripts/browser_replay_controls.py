"""Replay journeys through live month, year, collection and history controls."""
from playwright.async_api import expect
from browser_live_fidelity import start, record

async def scroll_section(page, selector, target):
    await page.mouse.move(1300, 650)
    for _ in range(20):
        box = await page.locator(selector).bounding_box()
        assert box, selector
        delta = box['y'] - target
        if abs(delta) < 1:
            return
        await page.mouse.wheel(0, delta)
        await page.wait_for_timeout(70)
    raise AssertionError(f'{selector} did not reach its recorded scroll anchor')

async def replay_monthly(page, context):
    await start(page, '035569a0')
    await record(page, 'd303f5a7-replay-monthly', '035569a0', 'Start at recorded Search')
    await page.get_by_role('button', name='Replay Monthly', exact=True).click()
    await page.set_viewport_size({'width': 1440, 'height': 904})
    await expect(page.get_by_role('tab', name='Jul', exact=True)).to_have_attribute('aria-selected', 'true')
    await record(page, 'd303f5a7-replay-monthly', 'f3fc07c5', 'Open Replay from the visible Search category')
    entry = await page.evaluate('history.state.musicReferenceEntry')
    await page.get_by_role('tab', name='May', exact=True).click()
    assert entry and await page.evaluate('history.state.musicReferenceEntry') == entry
    await record(page, 'd303f5a7-replay-monthly', '3fed6760', 'Select May without replacing the history entry')
    for selector, target, prefix in [('#top-albums', 181, 'b67b8895'), ('#milestones', 205, '18225175'), ('#replay-year', 171, 'b0caf02f')]:
        await scroll_section(page, selector, target)
        if prefix == 'b67b8895':
            artwork = page.locator('#top-albums .music-art')
            boxes = await artwork.evaluate_all('(els)=>els.map(e=>{const r=e.getBoundingClientRect();return [r.x,r.y,r.width,r.height]})')
            assert boxes == [[286 + index * 227, 213, 208, 208] for index in range(5)], boxes
            sizes = await artwork.evaluate_all('(els)=>els.map(e=>parseFloat(getComputedStyle(e).backgroundSize))')
            assert all(abs(size - 1440 / 208 * 100) < .01 for size in sizes), sizes
        await record(page, 'd303f5a7-replay-monthly', prefix, 'Wheel-scroll to ' + selector)
    before = await page.locator('#music-main').evaluate('(e)=>e.scrollTop')
    player = await page.locator('.floating-player').inner_text()
    await page.get_by_role('navigation', name='Browse music').get_by_role('button', name='Search', exact=True).click()
    await page.go_back()
    await page.wait_for_function('(top)=>document.querySelector("#music-main").scrollTop === top', arg=before)
    assert await page.locator('.floating-player').inner_text() == player
    await record(page, 'd303f5a7-replay-monthly', 'b0caf02f', 'Search and browser Back restore the May scroll position and player')

async def replay_year_menu(page, context):
    await start(page, 'f3fc07c5')
    entry = await page.evaluate('history.state.musicReferenceEntry')
    await page.get_by_role('tab', name='May', exact=True).click()
    assert await page.evaluate('history.state.musicReferenceEntry') == entry
    await page.get_by_role('button', name='Up Next', exact=True).click()
    queue = page.get_by_role('complementary', name='Up Next queue')
    contents = await queue.inner_text()
    year = page.get_by_role('button', name='2026', exact=True)
    await year.click()
    choice = page.get_by_role('menuitemradio', name='2026', exact=True)
    await expect(choice).to_be_focused()
    await page.keyboard.press('ArrowDown')
    await expect(choice).to_be_focused()
    await page.keyboard.press('Escape')
    await expect(page.get_by_role('menu', name='Replay year')).to_have_count(0)
    await expect(year).to_be_focused()
    await expect(queue).to_be_visible()
    assert await queue.inner_text() == contents
    await year.press('Enter')
    await choice.press('Enter')
    await expect(year).to_be_focused()
    await expect(queue).to_be_visible()
    await page.get_by_role('button', name='Up Next', exact=True).click()
    may = page.get_by_role('tab', name='May', exact=True)
    await may.focus()
    await page.keyboard.press('End')
    await expect(page.get_by_role('tab', name='Jul', exact=True)).to_be_focused()
    await expect(page.get_by_role('tabpanel', name='Jul Replay')).to_be_visible()
    await page.keyboard.press('Home')
    await expect(page.get_by_role('tab', name='Jan', exact=True)).to_be_focused()
    assert await page.locator('[role=tab][tabindex="0"]').count() == 1
    assert await page.evaluate('history.state.musicReferenceEntry') == entry

async def replay_milestone_detail(page, context):
    await start(page, '18225175')
    await record(page, '7cb9228f-milestone-detail', '18225175', 'Start at the recorded May milestone shelf')
    rail = page.get_by_role('region', name='Recent milestones', exact=True)
    assert await rail.locator('button').count() == 10
    assert await rail.locator('strong').count() == 10
    await page.get_by_role('button', name='Next Recent milestones', exact=True).click()
    await page.wait_for_function("document.querySelector('#milestones .music-rail').scrollLeft > 0")
    await page.get_by_role('button', name='Previous Recent milestones', exact=True).click()
    await page.wait_for_function("document.querySelector('#milestones .music-rail').scrollLeft === 0")
    await page.get_by_role('button', name='Your Milestones', exact=True).click()
    await record(page, '7cb9228f-milestone-detail', 'cc18744f', 'Open the full milestone gallery')
    await page.locator('main button:has(.music-art)').first.click()
    await record(page, '7cb9228f-milestone-detail', 'b5d31893', 'Open the first visible milestone')
    await page.get_by_role('button', name='Back to milestones', exact=True).click()
    await expect(page.get_by_role('heading', name='Milestones', exact=True)).to_be_visible()
    await page.get_by_role('button', name='Back to Replay', exact=True).click()
    await expect(page.get_by_role('tab', name='May', exact=True)).to_have_attribute('aria-selected', 'true')
    assert await page.evaluate('Boolean(history.state.musicReferenceEntry)')

CASES = [('recorded-replay-monthly', replay_monthly),
         ('replay-year-menu-isolation', replay_year_menu),
         ('recorded-milestone-detail', replay_milestone_detail)]
