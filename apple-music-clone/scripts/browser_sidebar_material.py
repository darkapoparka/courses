"""Sidebar material must follow real carousel state, not an acquisition ID."""
from playwright.async_api import expect
from browser_live_fidelity import start, record


async def shell_state(page):
    return await page.evaluate('''() => {
      const pane = document.querySelector('.music-sidebar');
      const rail = document.querySelector('[data-rail="Featured music"] .music-rail');
      const style = getComputedStyle(pane);
      return {background: style.background, filter: style.backdropFilter,
        mainX: document.querySelector('main').getBoundingClientRect().x,
        railX: rail.getBoundingClientRect().x, scroll: rail.scrollLeft,
        artwork: [...document.querySelectorAll('main [data-art-source]')].map(e =>
          [e.dataset.artSource, e.getAttribute('style')]),
        songs: document.querySelector('.viral-grid').innerText};
    }''')


async def alpha_controls(page, context):
    await start(page, '54b01eab')
    await record(page, 'alpha-sidebar-controls', '54b01eab', 'Initial Alpha fixture')
    before = await shell_state(page)
    assert before['mainX'] == 0 and before['filter'] == 'blur(18px) saturate(1.15)', before
    selection = await page.locator('.sidebar-row[aria-current=page]').evaluate('(e)=>getComputedStyle(e).backgroundColor')
    assert selection.startswith('rgba('), selection
    arrow = await page.get_by_role('button', name='Previous Featured music', exact=True).bounding_box()
    assert arrow and arrow['x'] >= 240 and arrow['height'] == 50, arrow
    await page.get_by_role('button', name='Volume', exact=True).click()
    await expect(page.locator('.music-app')).not_to_have_attribute('data-source')
    await record(page, 'alpha-sidebar-controls', '54b01eab', 'Open Volume using the player')
    after = await shell_state(page)
    assert after == before, {'before': before, 'after': after}
    await page.get_by_role('button', name='Volume', exact=True).click()
    await page.get_by_role('button', name='Account menu', exact=True).click()
    await record(page, 'alpha-sidebar-controls', '54b01eab', 'Open account through the sidebar')
    assert await shell_state(page) == before
    await page.keyboard.press('Escape')
    await record(page, 'alpha-sidebar-controls', '54b01eab', 'Dismiss account with Escape')
    assert await shell_state(page) == before


async def discovery_carousel(page, context):
    await start(page, 'e72be564')
    await record(page, 'new-carousel-sidebar', 'e72be564', 'First recorded New state')
    next_page = page.get_by_role('button', name='Next Featured music', exact=True)
    await next_page.hover()
    await record(page, 'new-carousel-sidebar', '4f611a9e', 'Hover the actual Next control; preserve starting profile/artwork', move_pointer=False)
    await next_page.click()
    await expect(page.locator('.capture-discovery')).to_have_attribute('data-feature-scrolled', 'true')
    assert (await shell_state(page))['mainX'] == 0
    await next_page.click()
    await expect(page.locator('[data-rail="Featured music"] .feature-card').nth(4)).to_be_in_viewport()
    await record(page, 'new-carousel-sidebar', '54b01eab', 'Advance the actual featured carousel twice; retain starting catalog/profile')
    before = await shell_state(page)
    await page.get_by_role('button', name='Volume', exact=True).click()
    assert await shell_state(page) == before
    await page.get_by_role('button', name='Volume', exact=True).click()
    for selector, top, prefix in [('#essentials', 32, '8b03c9d0'), ('#coming-soon', 113, '706de500')]:
        box = await page.locator(selector).bounding_box()
        assert box
        # Respect native end-of-document clamping; image comparison must retain
        # the source's residual geometry instead of forcing an impossible offset.
        delta = round(box['y'] - top)
        target = await page.locator('main').evaluate('(e,d)=>Math.max(0,Math.min(e.scrollHeight-e.clientHeight,e.scrollTop+d))', delta)
        await page.mouse.move(1100, 650)
        await page.mouse.wheel(0, delta)
        await expect(page.locator('.capture-discovery')).not_to_have_attribute('data-feature-underlay')
        await page.wait_for_function('(target)=>Math.abs(document.querySelector("main").scrollTop-target)<1', arg=target)
        assert await page.locator('.music-sidebar').evaluate('(e)=>getComputedStyle(e).backgroundImage') == 'none'
        await record(page, 'new-carousel-sidebar', prefix, 'Scroll with the mouse wheel to ' + selector)
    await page.mouse.wheel(0, -10000)
    await page.wait_for_function('document.querySelector("main").scrollTop === 0')
    await expect(page.locator('.capture-discovery')).to_have_attribute('data-feature-underlay', 'true')
    previous = page.get_by_role('button', name='Previous Featured music', exact=True)
    await previous.click()
    await previous.click()
    await expect(page.locator('.capture-discovery')).not_to_have_attribute('data-feature-scrolled')
    assert (await shell_state(page))['mainX'] == 246
    await record(page, 'new-carousel-sidebar', 'e72be564', 'Return with the two actual Previous controls')
    await page.get_by_role('navigation', name='Browse music', exact=True).get_by_role('button', name='Radio', exact=True).click()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'radio')
    assert await page.locator('.music-sidebar').evaluate('(e)=>getComputedStyle(e).backgroundImage') == 'none'


CASES = [('alpha-sidebar-live-controls', alpha_controls),
         ('new-carousel-sidebar-material', discovery_carousel)]


async def home_underlay_scroll(page, context):
    await start(page, 'a917d88f')
    await record(page, 'home-sidebar-scroll', 'a917d88f', 'Initial Home state')
    await page.get_by_role('button', name='Next Top picks', exact=True).click()
    home = page.locator('.capture-home')
    pane = page.locator('.music-sidebar')
    await expect(home).to_have_attribute('data-home-underlay', 'true')
    before = await pane.evaluate('(e)=>getComputedStyle(e).background')
    await record(page, 'home-sidebar-scroll', 'd5173715', 'Advance Top picks through the real carousel')
    await page.mouse.move(1100, 650)
    await page.mouse.wheel(0, 950)
    await page.wait_for_function('document.querySelector("main").scrollTop > 900')
    await expect(home).not_to_have_attribute('data-home-underlay')
    assert await pane.evaluate('(e)=>getComputedStyle(e).backgroundImage') == 'none'
    await page.get_by_role('button', name='Volume', exact=True).click()
    assert await pane.evaluate('(e)=>getComputedStyle(e).backgroundImage') == 'none'
    await page.get_by_role('button', name='Volume', exact=True).click()
    await page.mouse.move(1100, 650)
    await page.mouse.wheel(0, -10000)
    await page.wait_for_function('document.querySelector("main").scrollTop === 0')
    await expect(home).to_have_attribute('data-home-underlay', 'true')
    assert await pane.evaluate('(e)=>getComputedStyle(e).background') == before
    await record(page, 'home-sidebar-scroll', 'd5173715', 'Return to the carousel with the mouse wheel')


CASES.append(('home-sidebar-visible-underlay', home_underlay_scroll))
