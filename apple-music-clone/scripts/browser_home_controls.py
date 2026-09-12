"""Real Home carousel controls must follow remaining content, not a fixture."""
from playwright.async_api import expect
from browser_live_fidelity import start


async def settled_edges(page):
    # Native scroll moves before React commits the corresponding disabled state.
    await page.wait_for_function("""() => {
        const rail = document.querySelector('.poster-rail .music-rail');
        const buttons = document.querySelectorAll('.poster-rail .rail-arrows button');
        return buttons[0].disabled === (rail.scrollLeft <= 1)
            && buttons[1].disabled === (rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 1);
    }""")


async def home_carousel_boundaries(page, context):
    for width in [1440, 1264, 1024, 768]:
        await start(page, 'a917d88f')
        await page.set_viewport_size({'width': width, 'height': 903})
        rail = page.get_by_role('region', name='Top picks', exact=True)
        next_button = page.locator('.poster-rail button[aria-label="Next Top picks"]')
        previous = page.locator('.poster-rail button[aria-label="Previous Top picks"]')
        await settled_edges(page)
        await expect(previous).to_be_disabled()
        print('HOME WIDTH', width, flush=True)
        visits = []
        for _ in range(8):
            if await next_button.is_disabled():
                break
            await expect(next_button).to_be_visible()
            before = await rail.evaluate('(e)=>e.scrollLeft')
            await next_button.click()
            await page.wait_for_function('(old)=>document.querySelector(".poster-rail .music-rail").scrollLeft > old + 1', arg=before)
            await settled_edges(page)
            visits.append(await rail.evaluate('(e)=>e.scrollLeft'))
        await expect(next_button).to_be_disabled()
        assert visits, (width, 'The carousel never moved')
        remaining = await rail.evaluate('(e)=>e.scrollWidth-e.clientWidth-e.scrollLeft')
        assert remaining <= 1, (width, remaining)
        await expect(rail.locator('[data-card-id="discovery"]')).to_be_in_viewport()
        for _ in range(8):
            if await previous.is_disabled():
                break
            await expect(previous).to_be_visible()
            before = await rail.evaluate('(e)=>e.scrollLeft')
            await previous.click()
            await page.wait_for_function('(old)=>document.querySelector(".poster-rail .music-rail").scrollLeft < old - 1', arg=before)
            await settled_edges(page)
        await expect(previous).to_be_disabled()
        assert await rail.evaluate('(e)=>e.scrollLeft') == 0, width
        await expect(page.locator('.capture-home')).not_to_have_attribute('data-home-underlay')
        await expect(next_button).to_be_visible()
        assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth'), width


CASES = [('home-carousel-responsive-boundaries', home_carousel_boundaries)]
